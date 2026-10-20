"use client";

import { useState } from "react";
import {
  AcaoLinha,
  Apagar,
  BOTAO_AZUL,
  BOTAO_CLARO,
  BOTAO_FORTE,
  CAMPO,
  Campo,
  CampoFigura,
  CampoLongo,
  Chip,
  Escolha,
} from "@/components/admin/campos";
import { PerguntasEditor } from "@/components/admin/perguntas-editor";
import { CheckIcon, ChevronDownIcon, CloseIcon, CopyIcon } from "@/components/ui/icons";
import {
  acharPalavra,
  cardsOrdenados,
  cardVazio,
  ensinadasAntes,
  gerarRevisao,
  novoId,
  perguntaPronta,
  TIPOS_FASE,
  type Banco,
  type Card,
  type Fase,
  type Palavra,
  type TipoCard,
  type TipoFase,
  type Trilha,
} from "@/lib/demo/banco";

/**
 * O rascunho de uma fase: trilha, tema, fase, palavras, cards e perguntas.
 *
 * Tudo junto porque é assim que o conteúdo é pensado — "a fase 2 de
 * Cumprimentos" —, e não tabela por tabela. Nada é gravado até salvar: quem
 * desiste no meio não deixa uma trilha vazia para trás.
 */
export type Rascunho = {
  /** `null` = criar uma trilha nova. */
  trilhaId: string | null;
  trilha: { nome: string; descricao: string; ordem: number; ativa: boolean };
  /** `null` = criar um tema novo. */
  temaId: string | null;
  tema: { titulo: string; ordem: number };
  fase: Fase;
  /** Palavras criadas aqui, que ainda não existem no banco. */
  palavrasNovas: Palavra[];
  /** A fase já existia? Então salvar atualiza em vez de criar. */
  existente: boolean;
};

const PASSOS = [
  "Trilha",
  "Tema",
  "Fase",
  "Palavras",
  "História",
  "Perguntas",
  "Revisão",
] as const;

export function FaseEditor({
  banco,
  rascunho,
  onMudar,
  onSalvar,
  onFechar,
  onFigura,
}: {
  banco: Banco;
  rascunho: Rascunho;
  onMudar: (r: Rascunho) => void;
  onSalvar: () => void;
  onFechar: () => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const [passo, setPasso] = useState(0);

  const { fase } = rascunho;
  const trilha = banco.trilhas.find((t) => t.id === rascunho.trilhaId);

  // O editor de perguntas precisa enxergar as palavras criadas aqui, que
  // ainda não estão no banco.
  const bancoDoRascunho: Banco = {
    ...banco,
    palavras: [...banco.palavras, ...rascunho.palavrasNovas],
  };

  const palavrasDaFase = fase.palavras
    .slice()
    .sort((a, b) => a.ordem - b.ordem)
    .map((l) => acharPalavra(bancoDoRascunho, l.palavraId))
    .filter((p): p is Palavra => Boolean(p));

  // Na revisão o que se cobra não são as palavras desta fase: são as que a
  // trilha ensinou antes dela.
  const revisadas = trilha ? ensinadasAntes(bancoDoRascunho, trilha, fase.id) : [];
  const palavrasDoQuiz = fase.tipo === "Revisao" ? revisadas : palavrasDaFase;

  function mexerFase(m: Partial<Fase>) {
    onMudar({ ...rascunho, fase: { ...fase, ...m } });
  }

  const caminho = [
    rascunho.trilha.nome.trim() || "Trilha sem nome",
    rascunho.tema.titulo.trim() || "Tema sem título",
  ].join(" / ");

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep-900/70 p-4 sm:p-8">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-start justify-between gap-4 border-b border-slate-200 p-6 pb-4">
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold text-slate-900">
              {rascunho.existente ? "Editar fase" : "Nova fase"}
              {fase.titulo.trim() ? `: ${fase.titulo}` : ""}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              Trilha, tema, palavras, história e perguntas da fase em um só lugar.
            </p>
          </div>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onFechar}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        <nav className="flex flex-wrap gap-1 border-b border-slate-200 px-6 py-3">
          {PASSOS.map((nome, i) => (
            <button
              key={nome}
              type="button"
              onClick={() => setPasso(i)}
              aria-current={passo === i}
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold transition
                          focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                            passo === i
                              ? "text-accent-600"
                              : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                          }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                  passo === i ? "bg-accent-500 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {i + 1}
              </span>
              {nome}
            </button>
          ))}
        </nav>

        <div className="max-h-[62vh] overflow-y-auto p-6">
          {passo === 0 && <PassoTrilha banco={banco} rascunho={rascunho} onMudar={onMudar} />}
          {passo === 1 && <PassoTema banco={banco} rascunho={rascunho} onMudar={onMudar} />}
          {passo === 2 && (
            <PassoFase
              caminho={caminho}
              fase={fase}
              podeRevisao={revisadas.length >= 2}
              onMudar={mexerFase}
              onFigura={onFigura}
            />
          )}
          {passo === 3 && (
            <PassoPalavras
              banco={bancoDoRascunho}
              rascunho={rascunho}
              palavras={palavrasDaFase}
              onMudar={onMudar}
            />
          )}
          {passo === 4 && (
            <PassoHistoria
              banco={bancoDoRascunho}
              fase={fase}
              palavras={palavrasDaFase}
              onMudar={mexerFase}
              onFigura={onFigura}
            />
          )}
          {passo === 5 && (
            <PassoPerguntas
              banco={bancoDoRascunho}
              trilha={trilha}
              fase={fase}
              palavras={palavrasDoQuiz}
              onMudar={mexerFase}
              onFigura={onFigura}
            />
          )}
          {passo === 6 && (
            <PassoRevisao
              banco={bancoDoRascunho}
              rascunho={rascunho}
              palavras={palavrasDaFase}
              palavrasDoQuiz={palavrasDoQuiz}
            />
          )}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 p-6 pt-4">
          <p className="text-[11px] text-slate-500">
            Rascunho: nada é gravado até você salvar a fase.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={passo === 0}
              onClick={() => setPasso((p) => Math.max(0, p - 1))}
              className={`${BOTAO_CLARO} border-transparent disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Voltar
            </button>

            {passo < PASSOS.length - 1 && (
              <button
                type="button"
                onClick={() => setPasso((p) => p + 1)}
                className={BOTAO_AZUL}
              >
                Próximo: {PASSOS[passo + 1]}
              </button>
            )}

            <button type="button" onClick={onSalvar} className={BOTAO_FORTE}>
              Salvar fase
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ───────────────────────────── 1 · Trilha ───────────────────────────── */

function PassoTrilha({
  banco,
  rascunho,
  onMudar,
}: {
  banco: Banco;
  rascunho: Rascunho;
  onMudar: (r: Rascunho) => void;
}) {
  return (
    <div>
      <Ajuda>
        Escolha a trilha onde a fase vai entrar, ou crie uma nova. A trilha organiza a jornada do
        aluno.
      </Ajuda>

      <Lista
        rotulo="Trilha"
        novo="+ Criar nova trilha"
        itens={banco.trilhas.map((t) => ({
          id: t.id,
          ordem: t.ordem,
          nome: t.nome.trim() || "Sem nome",
        }))}
        selecionado={rascunho.trilhaId}
        onEscolher={(id) => {
          const t = banco.trilhas.find((x) => x.id === id);
          onMudar({
            ...rascunho,
            trilhaId: id,
            trilha: t
              ? { nome: t.nome, descricao: t.descricao, ordem: t.ordem, ativa: t.ativa }
              : { nome: "", descricao: "", ordem: banco.trilhas.length + 1, ativa: true },
            // Trocar de trilha invalida o tema escolhido na anterior.
            temaId: null,
            tema: { titulo: "", ordem: 1 },
          });
        }}
      />

      <p className="mt-3 text-[11px] text-slate-500">
        {rascunho.trilhaId
          ? "Você está usando uma trilha existente. Se mudar os campos abaixo, ela será atualizada."
          : "Uma trilha nova será criada com os campos abaixo."}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Campo
          id="trilha-nome"
          rotulo="Nome"
          valor={rascunho.trilha.nome}
          placeholder="Primeiras palavras"
          onChange={(nome) => onMudar({ ...rascunho, trilha: { ...rascunho.trilha, nome } })}
        />
        <Campo
          id="trilha-ordem"
          rotulo="Ordem"
          valor={String(rascunho.trilha.ordem)}
          ajuda="A trilha abre quando o aluno termina a anterior."
          onChange={(v) =>
            onMudar({ ...rascunho, trilha: { ...rascunho.trilha, ordem: Number(v) || 1 } })
          }
        />
        <div className="sm:col-span-2">
          <CampoLongo
            id="trilha-descricao"
            rotulo="Descrição"
            valor={rascunho.trilha.descricao}
            placeholder="Cumprimentos e expressões básicas."
            onChange={(descricao) =>
              onMudar({ ...rascunho, trilha: { ...rascunho.trilha, descricao } })
            }
          />
        </div>

        <div>
          <span className="mb-1 block text-xs font-bold text-slate-600">Ativa</span>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                type="button"
                aria-pressed={rascunho.trilha.ativa === v}
                onClick={() =>
                  onMudar({ ...rascunho, trilha: { ...rascunho.trilha, ativa: v } })
                }
                className={`rounded-full px-4 py-1.5 text-xs font-bold transition
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-blue-600 ${
                              rascunho.trilha.ativa === v
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
              >
                {v ? "Sim" : "Não"}
              </button>
            ))}
          </div>
          <span className="mt-1 block text-[11px] text-slate-500">
            Inativas ficam ocultas para os alunos.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── 2 · Tema ───────────────────────────── */

function PassoTema({
  banco,
  rascunho,
  onMudar,
}: {
  banco: Banco;
  rascunho: Rascunho;
  onMudar: (r: Rascunho) => void;
}) {
  const trilha = banco.trilhas.find((t) => t.id === rascunho.trilhaId);
  const temas = trilha?.temas ?? [];

  return (
    <div>
      <Ajuda>
        Trilha: {rascunho.trilha.nome.trim() || "sem nome"}. Escolha um tema dela ou crie um novo.
      </Ajuda>

      <Lista
        rotulo="Tema"
        novo="+ Criar novo tema"
        itens={temas.map((t) => ({
          id: t.id,
          ordem: t.ordem,
          nome: t.titulo.trim() || "Sem título",
        }))}
        selecionado={rascunho.temaId}
        onEscolher={(id) => {
          const t = temas.find((x) => x.id === id);
          onMudar({
            ...rascunho,
            temaId: id,
            tema: t
              ? { titulo: t.titulo, ordem: t.ordem }
              : { titulo: "", ordem: temas.length + 1 },
          });
        }}
      />

      <p className="mt-3 text-[11px] text-slate-500">
        {rascunho.temaId
          ? "Você está usando um tema existente desta trilha."
          : "Um tema novo será criado nesta trilha."}
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Campo
          id="tema-titulo"
          rotulo="Título"
          valor={rascunho.tema.titulo}
          placeholder="Cumprimentos básicos"
          onChange={(titulo) => onMudar({ ...rascunho, tema: { ...rascunho.tema, titulo } })}
        />
        <Campo
          id="tema-ordem"
          rotulo="Ordem"
          valor={String(rascunho.tema.ordem)}
          onChange={(v) =>
            onMudar({ ...rascunho, tema: { ...rascunho.tema, ordem: Number(v) || 1 } })
          }
        />
      </div>
    </div>
  );
}

/* ───────────────────────────── 3 · Fase ───────────────────────────── */

function PassoFase({
  caminho,
  fase,
  podeRevisao,
  onMudar,
  onFigura,
}: {
  caminho: string;
  fase: Fase;
  podeRevisao: boolean;
  onMudar: (m: Partial<Fase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  return (
    <div>
      <Ajuda>
        {caminho}. A fase é a unidade do quiz: palavras, história e perguntas ficam ligadas a ela.
      </Ajuda>

      <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
        <Campo
          id="fase-titulo"
          rotulo="Título"
          valor={fase.titulo}
          placeholder="Um novo amigo"
          onChange={(titulo) => onMudar({ titulo })}
        />
        <Campo
          id="fase-ordem"
          rotulo="Ordem"
          valor={String(fase.ordem)}
          onChange={(v) => onMudar({ ordem: Number(v) || 1 })}
        />
      </div>

      <div className="mt-4">
        <CampoLongo
          id="fase-descricao"
          rotulo="Descrição"
          valor={fase.descricao}
          placeholder="Sofia conhece um menino que ainda não fala português."
          onChange={(descricao) => onMudar({ descricao })}
        />
      </div>

      <div className="mt-5">
        <span className="mb-2 block text-xs font-bold text-slate-600">Tipo da fase</span>
        <div className="grid gap-2 sm:grid-cols-3">
          {TIPOS_FASE.map(({ tipo, nome, resumo }) => (
            <Escolha
              key={tipo}
              nome={nome}
              resumo={resumo}
              ativo={fase.tipo === tipo}
              // A revisão se monta do que veio antes: numa trilha sem nada
              // antes dela, nasceria vazia.
              bloqueado={tipo === "Revisao" && !podeRevisao}
              motivo="Precisa de ao menos duas palavras ensinadas antes desta fase."
              onClick={() => onMudar({ tipo: tipo as TipoFase })}
            />
          ))}
        </div>
      </div>

      <div className="mt-5">
        <span className="mb-2 block text-xs font-bold text-slate-600">Imagem de capa</span>
        <div className="flex items-center gap-3">
          <CampoFigura
            imagem={fase.imagemCapa}
            rotulo="Imagem de capa da fase"
            tamanho="h-[88px] w-[156px]"
            onEscolher={(arquivo) => onFigura(arquivo, (imagemCapa) => onMudar({ imagemCapa }))}
          />
          <p className="text-xs text-slate-500">Opcional. Aparece no card da fase.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── 4 · Palavras ───────────────────────────── */

function PassoPalavras({
  banco,
  rascunho,
  palavras,
  onMudar,
}: {
  banco: Banco;
  rascunho: Rascunho;
  palavras: Palavra[];
  onMudar: (r: Rascunho) => void;
}) {
  const [busca, setBusca] = useState("");
  const [traducao, setTraducao] = useState("");

  const alvo = busca.trim().toLowerCase();
  const achadas = alvo
    ? banco.palavras
        .filter(
          (p) =>
            !rascunho.fase.palavras.some((l) => l.palavraId === p.id) &&
            (p.ingles.toLowerCase().includes(alvo) || p.traducao.toLowerCase().includes(alvo)),
        )
        .slice(0, 6)
    : [];

  function ligar(palavraId: string) {
    onMudar({
      ...rascunho,
      fase: {
        ...rascunho.fase,
        palavras: [
          ...rascunho.fase.palavras,
          { palavraId, ordem: rascunho.fase.palavras.length + 1 },
        ],
      },
    });
    setBusca("");
    setTraducao("");
  }

  function criar() {
    if (!busca.trim() || !traducao.trim()) return;
    const nova: Palavra = {
      id: novoId("pal"),
      ingles: busca.trim(),
      traducao: traducao.trim(),
    };
    onMudar({
      ...rascunho,
      palavrasNovas: [...rascunho.palavrasNovas, nova],
      fase: {
        ...rascunho.fase,
        palavras: [
          ...rascunho.fase.palavras,
          { palavraId: nova.id, ordem: rascunho.fase.palavras.length + 1 },
        ],
      },
    });
    setBusca("");
    setTraducao("");
  }

  function reordenar(lista: Palavra[]) {
    onMudar({
      ...rascunho,
      fase: {
        ...rascunho.fase,
        palavras: lista.map((p, i) => ({ palavraId: p.id, ordem: i + 1 })),
      },
    });
  }

  return (
    <div>
      <Ajuda>
        Busque no banco antes de criar. A mesma palavra pode estar em várias fases sem ser
        duplicada: aqui só criamos a ligação com a fase.
      </Ajuda>

      <label className="block">
        <span className="mb-1 block text-xs font-bold text-slate-600">Buscar ou criar palavra</span>
        <input
          className={CAMPO}
          value={busca}
          placeholder="Digite em inglês ou português"
          onChange={(e) => setBusca(e.target.value)}
        />
      </label>

      {achadas.length > 0 && (
        <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200">
          {achadas.map((p) => (
            <li key={p.id} className="flex items-center gap-3 px-3 py-2">
              <span className="min-w-0 flex-1 truncate text-sm">
                <strong className="font-extrabold text-slate-900">{p.ingles}</strong>{" "}
                <span className="text-slate-500">{p.traducao}</span>
              </span>
              <button type="button" onClick={() => ligar(p.id)} className={BOTAO_CLARO}>
                Usar nesta fase
              </button>
            </li>
          ))}
        </ul>
      )}

      {busca.trim() && achadas.length === 0 && (
        <div className="mt-2 flex flex-wrap items-end gap-3 rounded-xl border border-dashed border-slate-300 p-3">
          <p className="w-full text-xs text-slate-500">
            Nenhuma palavra no banco com “{busca.trim()}”. Diga o que ela quer dizer para criá-la.
          </p>
          <label className="flex-1">
            <span className="mb-1 block text-xs font-bold text-slate-600">Tradução</span>
            <input
              className={CAMPO}
              value={traducao}
              placeholder="olá"
              onChange={(e) => setTraducao(e.target.value)}
            />
          </label>
          <button
            type="button"
            disabled={!traducao.trim()}
            onClick={criar}
            className={`${BOTAO_AZUL} disabled:cursor-not-allowed disabled:opacity-50`}
          >
            Criar “{busca.trim()}”
          </button>
        </div>
      )}

      <h4 className="mt-6 text-sm font-extrabold text-slate-900">
        Palavras desta fase ({palavras.length})
      </h4>

      {palavras.length === 0 ? (
        <p className="mt-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Nenhuma ainda. Busque acima ou crie a primeira.
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {palavras.map((p, i) => (
            <li
              key={p.id}
              className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2"
            >
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[11px] font-extrabold text-blue-700">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm">
                <strong className="font-extrabold text-slate-900">{p.ingles}</strong>{" "}
                <span className="text-slate-500">{p.traducao}</span>
              </span>

              <AcaoLinha
                rotulo="Subir"
                desativado={i === 0}
                onClick={() => {
                  const lista = [...palavras];
                  [lista[i - 1], lista[i]] = [lista[i], lista[i - 1]];
                  reordenar(lista);
                }}
              >
                <ChevronDownIcon className="size-4 rotate-180" />
              </AcaoLinha>
              <AcaoLinha
                rotulo="Descer"
                desativado={i === palavras.length - 1}
                onClick={() => {
                  const lista = [...palavras];
                  [lista[i], lista[i + 1]] = [lista[i + 1], lista[i]];
                  reordenar(lista);
                }}
              >
                <ChevronDownIcon className="size-4" />
              </AcaoLinha>

              <button
                type="button"
                onClick={() => reordenar(palavras.filter((x) => x.id !== p.id))}
                className="rounded-full px-2.5 py-1 text-[11px] font-bold text-accent-600
                           transition hover:bg-accent-50 focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Tirar da fase
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────────────────────────── 5 · História ───────────────────────────── */

function PassoHistoria({
  banco,
  fase,
  palavras,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  fase: Fase;
  palavras: Palavra[];
  onMudar: (m: Partial<Fase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const cards = cardsOrdenados(fase);
  const [abertoId, setAbertoId] = useState<string | null>(null);

  function salvar(lista: Card[]) {
    onMudar({ cards: lista.map((c, i) => ({ ...c, ordem: i + 1 })) });
  }

  function mexer(id: string, m: Partial<Card>) {
    salvar(cards.map((c) => (c.id === id ? { ...c, ...m } : c)));
  }

  function adicionar(tipo: TipoCard) {
    const novo = cardVazio(tipo, cards.length + 1);
    salvar([...cards, novo]);
    setAbertoId(novo.id);
  }

  return (
    <div>
      <Ajuda>
        Monte a sequência de cards que o aluno vê antes das perguntas. Ao escolher a palavra
        relacionada, destaque e tradução são preenchidos com os dados dela.
      </Ajuda>

      <div className="flex flex-wrap gap-2">
        <button type="button" onClick={() => adicionar("Historia")} className={BOTAO_AZUL}>
          + Card de história
        </button>
        <button type="button" onClick={() => adicionar("Palavra")} className={BOTAO_CLARO}>
          + Card de palavra
        </button>
      </div>

      {cards.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Nenhum card. Sem eles a fase abre direto na primeira pergunta — é o certo para uma fase
          de diálogo, e o errado para uma de aprendizado.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {cards.map((card, i) => {
            const palavra = acharPalavra(banco, card.palavraId);
            const resumo =
              card.tipo === "Historia"
                ? [card.textoAntes, card.destaque, card.textoDepois].filter(Boolean).join(" ")
                : `${palavra?.ingles || card.destaque || "sem palavra"} = ${card.traducao || palavra?.traducao || "sem tradução"}`;

            return (
              <li key={card.id} className="rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 px-3 py-2">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[11px] font-extrabold text-slate-600">
                    {i + 1}
                  </span>
                  <Chip cor={card.tipo === "Historia" ? "azul" : "atencao"}>
                    {card.tipo === "Historia" ? "História" : "Palavra"}
                  </Chip>

                  <button
                    type="button"
                    onClick={() => setAbertoId(abertoId === card.id ? null : card.id)}
                    className="min-w-0 flex-1 truncate text-left text-sm text-slate-700
                               underline-offset-4 hover:underline focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {resumo.trim() || "Card vazio"}
                  </button>

                  <AcaoLinha
                    rotulo="Subir"
                    desativado={i === 0}
                    onClick={() => {
                      const lista = [...cards];
                      [lista[i - 1], lista[i]] = [lista[i], lista[i - 1]];
                      salvar(lista);
                    }}
                  >
                    <ChevronDownIcon className="size-4 rotate-180" />
                  </AcaoLinha>
                  <AcaoLinha
                    rotulo="Descer"
                    desativado={i === cards.length - 1}
                    onClick={() => {
                      const lista = [...cards];
                      [lista[i], lista[i + 1]] = [lista[i + 1], lista[i]];
                      salvar(lista);
                    }}
                  >
                    <ChevronDownIcon className="size-4" />
                  </AcaoLinha>
                  <AcaoLinha
                    rotulo="Duplicar"
                    onClick={() => salvar([...cards, { ...card, id: novoId("car") }])}
                  >
                    <CopyIcon className="size-4" />
                  </AcaoLinha>
                  <Apagar
                    oque={`card ${i + 1}`}
                    onClick={() => salvar(cards.filter((c) => c.id !== card.id))}
                  />
                </div>

                {abertoId === card.id && (
                  <div className="border-t border-slate-100 p-3">
                    {card.tipo === "Historia" ? (
                      <div className="flex flex-wrap items-start gap-3">
                        <CampoFigura
                          imagem={card.imagem}
                          rotulo={`Imagem do card ${i + 1}`}
                          tamanho="h-[88px] w-[120px]"
                          onEscolher={(a) => onFigura(a, (imagem) => mexer(card.id, { imagem }))}
                        />
                        <div className="grid min-w-[260px] flex-1 gap-3 sm:grid-cols-3">
                          <Campo
                            id={`antes-${card.id}`}
                            rotulo="Texto antes"
                            valor={card.textoAntes}
                            placeholder="Ele sorriu e acenou: —"
                            onChange={(textoAntes) => mexer(card.id, { textoAntes })}
                          />
                          <Campo
                            id={`destaque-${card.id}`}
                            rotulo="Destaque"
                            valor={card.destaque}
                            placeholder="Hello"
                            onChange={(destaque) => mexer(card.id, { destaque })}
                          />
                          <Campo
                            id={`depois-${card.id}`}
                            rotulo="Texto depois"
                            valor={card.textoDepois}
                            placeholder="!"
                            onChange={(textoDepois) => mexer(card.id, { textoDepois })}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap items-start gap-3">
                        <CampoFigura
                          imagem={card.imagem}
                          rotulo={`Imagem do card ${i + 1}`}
                          onEscolher={(a) => onFigura(a, (imagem) => mexer(card.id, { imagem }))}
                        />
                        <div className="grid min-w-[260px] flex-1 gap-3 sm:grid-cols-2">
                          <label className="block">
                            <span className="mb-1 block text-xs font-bold text-slate-600">
                              Palavra relacionada
                            </span>
                            <select
                              className={CAMPO}
                              value={card.palavraId ?? ""}
                              onChange={(e) => {
                                const p = palavras.find((x) => x.id === e.target.value);
                                mexer(card.id, {
                                  palavraId: p?.id ?? null,
                                  destaque: p?.ingles ?? card.destaque,
                                  traducao: p?.traducao ?? card.traducao,
                                });
                              }}
                            >
                              <option value="">Escolha uma palavra da fase</option>
                              {palavras.map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.ingles} — {p.traducao}
                                </option>
                              ))}
                            </select>
                          </label>
                          <Campo
                            id={`traducao-${card.id}`}
                            rotulo="Tradução mostrada"
                            valor={card.traducao}
                            placeholder="olá"
                            onChange={(traducao) => mexer(card.id, { traducao })}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

/* ───────────────────────────── 6 · Perguntas ───────────────────────────── */

function PassoPerguntas({
  banco,
  trilha,
  fase,
  palavras,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  trilha: Trilha | undefined;
  fase: Fase;
  palavras: Palavra[];
  onMudar: (m: Partial<Fase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  return (
    <div>
      <Ajuda>
        {fase.tipo === "Revisao"
          ? "A revisão repassa as palavras das fases anteriores, sempre por um caminho diferente do que as ensinou."
          : "Crie o quiz da fase usando as palavras da seção 4 e a história da seção 5. Tudo é gravado junto quando você salvar a fase."}
      </Ajuda>

      {fase.tipo === "Revisao" && trilha && palavras.length >= 2 && (
        <button
          type="button"
          onClick={() => onMudar({ perguntas: gerarRevisao(banco, trilha, fase) })}
          className={`${BOTAO_AZUL} mb-4`}
        >
          Gerar a revisão inteira ({palavras.length} palavras)
        </button>
      )}

      <PerguntasEditor
        banco={banco}
        fase={fase}
        palavras={palavras}
        onMudar={(perguntas) => onMudar({ perguntas })}
        onFigura={onFigura}
      />
    </div>
  );
}

/* ───────────────────────────── 7 · Revisão ───────────────────────────── */

function PassoRevisao({
  banco,
  rascunho,
  palavras,
  palavrasDoQuiz,
}: {
  banco: Banco;
  rascunho: Rascunho;
  palavras: Palavra[];
  palavrasDoQuiz: Palavra[];
}) {
  const { fase } = rascunho;
  const cards = cardsOrdenados(fase);
  const historia = cards.filter((c) => c.tipo === "Historia").length;
  const deSPalavra = cards.length - historia;
  const alternativas = fase.perguntas.reduce((s, p) => s + p.alternativas.length, 0);
  const corretas = fase.perguntas.filter((p) => p.alternativas.some((a) => a.correta)).length;

  const linhas: { tabela: string; estado: string; detalhe: string }[] = [
    {
      tabela: "Trilha",
      estado: rascunho.trilhaId ? "Usar existente" : "Criar",
      detalhe: `${rascunho.trilha.nome.trim() || "sem nome"}, ordem ${rascunho.trilha.ordem}`,
    },
    {
      tabela: "Tema",
      estado: rascunho.temaId ? "Usar existente" : "Criar",
      detalhe: `${rascunho.tema.titulo.trim() || "sem título"}, ordem ${rascunho.tema.ordem}`,
    },
    {
      tabela: "Fase",
      estado: rascunho.existente ? "Atualizar" : "Criar",
      detalhe: `${fase.titulo.trim() || "sem título"}, ${fase.tipo}, ordem ${fase.ordem}`,
    },
    {
      tabela: "Palavra",
      estado: rascunho.palavrasNovas.length
        ? `${rascunho.palavrasNovas.length} nova(s)`
        : "Nenhuma nova",
      detalhe: rascunho.palavrasNovas.length
        ? rascunho.palavrasNovas.map((p) => p.ingles).join(", ")
        : "Todas já existem no banco, nada é duplicado.",
    },
    {
      tabela: "FasePalavra",
      estado: `${palavras.length} ligações`,
      detalhe: palavras.map((p, i) => `${i + 1}. ${p.ingles}`).join("  ") || "—",
    },
    {
      tabela: "Card",
      estado: `${cards.length} cards`,
      detalhe: `${historia} de história e ${deSPalavra} de palavra, ordem de 1 a ${cards.length || 0}`,
    },
    {
      tabela: "Pergunta",
      estado: `${fase.perguntas.length} perguntas`,
      detalhe:
        fase.perguntas.map((p, i) => `${i + 1}. ${p.enunciado || "sem enunciado"}`).join("  ") ||
        "—",
    },
    {
      tabela: "Alternativa",
      estado: `${alternativas} alternativas`,
      detalhe: `Ligadas às perguntas acima, ${corretas} marcadas como corretas`,
    },
  ];

  const validacoes: { ok: boolean; texto: string }[] = [
    { ok: Boolean(rascunho.trilha.nome.trim()), texto: "Trilha preenchida" },
    { ok: Boolean(rascunho.tema.titulo.trim()), texto: "Tema preenchido" },
    { ok: Boolean(fase.titulo.trim() && fase.ordem > 0), texto: "Fase com título e ordem" },
    {
      ok: fase.tipo === "Revisao" ? palavrasDoQuiz.length >= 2 : palavras.length >= 1,
      texto:
        fase.tipo === "Revisao"
          ? "Pelo menos duas palavras ensinadas antes desta fase"
          : "Pelo menos uma palavra na fase",
    },
    {
      ok: fase.tipo === "Dialogo" || cards.length > 0,
      texto: "Cards da abertura em ordem",
    },
    {
      ok: fase.perguntas.length > 0 && fase.perguntas.every(perguntaPronta),
      texto: "Perguntas com enunciado, duas ou mais alternativas e uma correta",
    },
  ];

  return (
    <div>
      <Ajuda>
        Confira o que será gravado em cada tabela. Os relacionamentos e as ordens são criados
        automaticamente.
      </Ajuda>

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200">
        {linhas.map((l) => (
          <li key={l.tabela} className="grid gap-1 px-4 py-3 sm:grid-cols-[130px_150px_1fr]">
            <span className="text-sm font-extrabold text-slate-900">{l.tabela}</span>
            <span className="text-xs font-bold text-blue-700">{l.estado}</span>
            <span className="text-xs text-slate-500">{l.detalhe}</span>
          </li>
        ))}
      </ul>

      <h4 className="mt-6 text-sm font-extrabold text-slate-900">Validações</h4>
      <ul className="mt-2 space-y-1.5">
        {validacoes.map((v) => (
          <li key={v.texto} className="flex items-center gap-2 text-sm">
            <span
              className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                v.ok ? "bg-correct-50 text-correct-700" : "bg-accent-50 text-accent-600"
              }`}
            >
              {v.ok ? <CheckIcon className="size-3.5" /> : <CloseIcon className="size-3.5" />}
            </span>
            <span className={v.ok ? "text-slate-700" : "text-accent-600"}>{v.texto}</span>
          </li>
        ))}
      </ul>

      {banco.trilhas.length === 0 && (
        <p className="mt-4 text-xs text-slate-500">
          Esta será a primeira trilha do banco.
        </p>
      )}
    </div>
  );
}

/* ───────────────────────────── peças ───────────────────────────── */

function Ajuda({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-slate-600">{children}</p>;
}

/** A lista de escolher-ou-criar dos passos 1 e 2. */
function Lista({
  rotulo,
  novo,
  itens,
  selecionado,
  onEscolher,
}: {
  rotulo: string;
  novo: string;
  itens: { id: string; ordem: number; nome: string }[];
  selecionado: string | null;
  onEscolher: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="text-xs font-bold text-slate-600">{rotulo}</span>
        <button
          type="button"
          onClick={() => onEscolher(null)}
          className={`rounded-full px-3 py-1 text-xs font-bold transition focus-visible:outline-2
                      focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                        selecionado === null
                          ? "bg-blue-600 text-white"
                          : "text-blue-700 hover:bg-blue-50"
                      }`}
        >
          {novo}
        </button>
      </div>

      {itens.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
          Nada ainda. O primeiro será criado agora.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {[...itens]
            .sort((a, b) => a.ordem - b.ordem)
            .map((i) => (
              <li key={i.id}>
                <button
                  type="button"
                  aria-pressed={selecionado === i.id}
                  onClick={() => onEscolher(i.id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition
                              focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-blue-600 ${
                                selecionado === i.id
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                >
                  {i.ordem}. {i.nome}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
