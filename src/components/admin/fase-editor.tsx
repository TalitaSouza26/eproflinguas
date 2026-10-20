"use client";

import { useState } from "react";
import {
  AcaoLinha,
  Apagar,
  BOTAO_AZUL,
  BOTAO_CLARO,
  CAMPO,
  Campo,
  CampoFigura,
  CampoLongo,
  Chip,
  Escolha,
} from "@/components/admin/campos";
import { PerguntasEditor } from "@/components/admin/perguntas-editor";
import { PreviaCenas } from "@/components/admin/previa-cenas";
import {
  CheckIcon,
  ChevronDownIcon,
  CloseIcon,
  CopyIcon,
  PlayIcon,
} from "@/components/ui/icons";
import {
  acharPalavra,
  cardsOrdenados,
  cardVazio,
  ensinadasAntes,
  gerarRevisao,
  novoId,
  palavrasDaFase as palavrasLigadas,
  perguntaPronta,
  TIPOS_FASE,
  type Banco,
  type Card,
  type Fase,
  type Palavra,
  type Tema,
  type TipoCard,
  type TipoFase,
  type Trilha,
} from "@/lib/demo/banco";

/**
 * As etapas de montar uma fase.
 *
 * Trilha e tema não estão aqui: a fase é criada dentro do tema a que ela
 * pertence, e os campos dos dois ficam na tela da trilha. Pedi-los de novo
 * aqui seria perguntar o que a pessoa acabou de responder ao clicar.
 */
const PASSOS = ["Fase", "Palavras", "Cenas", "Perguntas", "Revisão"] as const;

/**
 * O editor de uma fase, aberto dentro da linha dela.
 *
 * Não é um modal. A fase é um item de uma lista de fases, de um tema, de uma
 * trilha — e um modal apaga justamente esse contexto na hora em que ele mais
 * importa. Aberta no lugar, dá para ver a fase anterior enquanto se escreve a
 * seguinte.
 *
 * Grava a cada tecla, como o resto da tela. Não há rascunho nem "salvar":
 * salvar era o que o modal precisava para poder ser cancelado.
 */
export function FaseEditor({
  banco,
  trilha,
  tema,
  fase,
  onMudar,
  onNovaPalavra,
  onFigura,
}: {
  banco: Banco;
  trilha: Trilha;
  tema: Tema;
  fase: Fase;
  onMudar: (m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const [passo, setPasso] = useState(0);

  const palavras = palavrasLigadas(banco, fase);

  // Na revisão o que se cobra não são as palavras desta fase: são as que a
  // trilha ensinou antes dela.
  const revisadas = ensinadasAntes(banco, trilha, fase.id);
  const palavrasDoQuiz = fase.tipo === "Revisao" ? revisadas : palavras;

  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <nav className="flex flex-wrap gap-1 border-b border-slate-200 pb-3">
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
                            : "text-slate-500 hover:bg-slate-200 hover:text-slate-700"
                        }`}
          >
            <span
              className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                passo === i ? "bg-accent-500 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {i + 1}
            </span>
            {nome}
          </button>
        ))}
      </nav>

      <div className="pt-4">
        {passo === 0 && (
          <PassoFase
            fase={fase}
            podeRevisao={revisadas.length >= 2}
            onMudar={onMudar}
            onFigura={onFigura}
          />
        )}
        {passo === 1 && (
          <PassoPalavras
            banco={banco}
            fase={fase}
            palavras={palavras}
            onMudar={onMudar}
            onNovaPalavra={onNovaPalavra}
          />
        )}
        {passo === 2 && (
          <PassoHistoria
            banco={banco}
            fase={fase}
            trilhaNome={trilha.nome}
            palavras={palavras}
            onMudar={onMudar}
            onFigura={onFigura}
          />
        )}
        {passo === 3 && (
          <PassoPerguntas
            banco={banco}
            trilha={trilha}
            fase={fase}
            palavras={palavrasDoQuiz}
            onMudar={onMudar}
            onFigura={onFigura}
          />
        )}
        {passo === 4 && (
          <PassoRevisao
            trilha={trilha}
            tema={tema}
            fase={fase}
            palavras={palavras}
            palavrasDoQuiz={palavrasDoQuiz}
          />
        )}
      </div>
    </div>
  );
}

/* ───────────────────────────── 1 · Fase ───────────────────────────── */

function PassoFase({
  fase,
  podeRevisao,
  onMudar,
  onFigura,
}: {
  fase: Fase;
  podeRevisao: boolean;
  onMudar: (m: Partial<Fase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  return (
    <div>
      <Ajuda>
        A fase é a unidade do quiz: palavras, cenas e perguntas ficam ligadas a ela.
      </Ajuda>

      {/* O tipo vem primeiro porque é ele que decide o resto: uma revisão não
          se escreve, se monta do que veio antes, e um diálogo nem abertura
          tem. Escolher depois de escrever é escrever para jogar fora. */}
      <div>
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

      {/* A capa grande, e ao lado dela os campos da fase em coluna. */}
      <div className="mt-5 flex flex-wrap items-start gap-5">
        <div className="shrink-0">
          <span className="mb-1 block text-xs font-bold text-slate-600">Imagem de capa</span>
          <CampoFigura
            imagem={fase.imagemCapa}
            rotulo="Imagem de capa da fase"
            tamanho="h-[188px] w-[280px] max-w-full"
            onEscolher={(arquivo) => onFigura(arquivo, (imagemCapa) => onMudar({ imagemCapa }))}
          />
          <span className="mt-1 block text-[11px] text-slate-500">
            Opcional. Aparece no card da fase.
          </span>
        </div>

        <div className="grid min-w-[280px] flex-1 gap-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_100px]">
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
          <CampoLongo
            id="fase-descricao"
            rotulo="Descrição"
            valor={fase.descricao}
            linhas={5}
            placeholder="Sofia conhece um menino que ainda não fala português."
            onChange={(descricao) => onMudar({ descricao })}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── 2 · Palavras ───────────────────────────── */

function PassoPalavras({
  banco,
  fase,
  palavras,
  onMudar,
  onNovaPalavra,
}: {
  banco: Banco;
  fase: Fase;
  palavras: Palavra[];
  onMudar: (m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
}) {
  const [busca, setBusca] = useState("");
  const [traducao, setTraducao] = useState("");

  const alvo = busca.trim().toLowerCase();
  const achadas = alvo
    ? banco.palavras
        .filter(
          (p) =>
            !fase.palavras.some((l) => l.palavraId === p.id) &&
            (p.ingles.toLowerCase().includes(alvo) || p.traducao.toLowerCase().includes(alvo)),
        )
        .slice(0, 6)
    : [];

  function ligar(palavraId: string) {
    onMudar({
      palavras: [...fase.palavras, { palavraId, ordem: fase.palavras.length + 1 }],
    });
    setBusca("");
    setTraducao("");
  }

  function criar() {
    if (!busca.trim() || !traducao.trim()) return;
    const nova: Palavra = { id: novoId("pal"), ingles: busca.trim(), traducao: traducao.trim() };
    // A Palavra é global: nasce no banco, e a fase só guarda a ligação.
    onNovaPalavra(nova);
    ligar(nova.id);
  }

  function reordenar(lista: Palavra[]) {
    onMudar({ palavras: lista.map((p, i) => ({ palavraId: p.id, ordem: i + 1 })) });
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
        <ul className="mt-2 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
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
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2"
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

              {/* Tira a palavra desta fase. A Palavra em si continua no
                  banco, para as outras fases que a usam. */}
              <Apagar
                oque={`${p.ingles} desta fase`}
                onClick={() => reordenar(palavras.filter((x) => x.id !== p.id))}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────────────────────────── 3 · Cenas ───────────────────────────── */

function PassoHistoria({
  banco,
  fase,
  trilhaNome,
  palavras,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  fase: Fase;
  trilhaNome: string;
  palavras: Palavra[];
  onMudar: (m: Partial<Fase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const cards = cardsOrdenados(fase);
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const [previa, setPrevia] = useState(false);

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

      <div className="flex flex-wrap items-center gap-2">
        <button type="button" onClick={() => adicionar("Historia")} className={BOTAO_AZUL}>
          + Card de cena
        </button>
        <button type="button" onClick={() => adicionar("Palavra")} className={BOTAO_CLARO}>
          + Card de palavra
        </button>

        {/* A prévia é da sequência inteira, e não de um card: é assim que
            o aluno recebe, uma tela depois da outra. */}
        {cards.length > 0 && (
          <button
            type="button"
            onClick={() => setPrevia(true)}
            className={BOTAO_CLARO + " ml-auto"}
          >
            <PlayIcon className="size-4" />
            Ver como o aluno vê
          </button>
        )}
      </div>

      {previa && (
        <PreviaCenas
          banco={banco}
          fase={fase}
          trilha={trilhaNome}
          numero={fase.ordem}
          onFechar={() => setPrevia(false)}
        />
      )}

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
                    {card.tipo === "Historia" ? "Cena" : "Palavra"}
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
                  <div className="border-t border-slate-100 bg-slate-50/60 p-4">
                    {/* Campos e prévia num quadro só, com a mesma altura: a
                        prévia solta ao lado virava um retângulo escuro
                        flutuando num mar de espaço vazio. */}
                    <div className="grid max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white lg:grid-cols-[1fr_240px]">
                      <div className="grid grid-cols-[96px_1fr] content-start gap-3 p-4">
                        <CampoFigura
                          imagem={card.imagem}
                          rotulo={`Imagem do card ${i + 1}`}
                          tamanho="size-[96px]"
                          onEscolher={(a) => onFigura(a, (imagem) => mexer(card.id, { imagem }))}
                        />

                        {card.tipo === "Historia" ? (
                          <div className="grid content-start gap-3">
                            <Campo
                              id={`antes-${card.id}`}
                              rotulo="Texto antes"
                              valor={card.textoAntes}
                              placeholder="Ele sorriu e acenou: —"
                              onChange={(textoAntes) => mexer(card.id, { textoAntes })}
                            />
                            <div className="grid grid-cols-[1fr_96px] gap-3">
                              <Campo
                                id={`destaque-${card.id}`}
                                rotulo="Destaque"
                                valor={card.destaque}
                                placeholder="Hello"
                                onChange={(destaque) => mexer(card.id, { destaque })}
                              />
                              <Campo
                                id={`depois-${card.id}`}
                                rotulo="Depois"
                                valor={card.textoDepois}
                                placeholder="!"
                                onChange={(textoDepois) => mexer(card.id, { textoDepois })}
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="grid content-start gap-3">
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
                        )}
                      </div>

                      <PreviaDoCard
                        card={card}
                        palavra={acharPalavra(banco, card.palavraId)}
                      />
                    </div>
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

/* ───────────────────────────── 4 · Perguntas ───────────────────────────── */

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
          : "Crie o quiz da fase usando as palavras e as cenas dos passos anteriores. Tudo é gravado junto quando você salvar a fase."}
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

/* ───────────────────────────── 5 · Revisão ───────────────────────────── */

function PassoRevisao({
  trilha,
  tema,
  fase,
  palavras,
  palavrasDoQuiz,
}: {
  trilha: Trilha;
  tema: Tema;
  fase: Fase;
  palavras: Palavra[];
  palavrasDoQuiz: Palavra[];
}) {
  const cards = cardsOrdenados(fase);
  const cenas = cards.filter((c) => c.tipo === "Historia").length;
  const dePalavra = cards.length - cenas;
  const alternativas = fase.perguntas.reduce((s, p) => s + p.alternativas.length, 0);
  const corretas = fase.perguntas.filter((p) => p.alternativas.some((a) => a.correta)).length;

  const linhas: { tabela: string; estado: string; detalhe: string }[] = [
    {
      tabela: "Trilha",
      estado: trilha.ativa ? "Ativa" : "Inativa",
      detalhe: `${trilha.nome.trim() || "sem nome"}, ordem ${trilha.ordem}`,
    },
    {
      tabela: "Tema",
      estado: `Ordem ${tema.ordem}`,
      detalhe: tema.titulo.trim() || "sem título",
    },
    {
      tabela: "Fase",
      estado: fase.tipo,
      detalhe: `${fase.titulo.trim() || "sem título"}, ordem ${fase.ordem}`,
    },
    {
      tabela: "FasePalavra",
      estado: `${palavras.length} ligações`,
      detalhe: palavras.map((p, i) => `${i + 1}. ${p.ingles}`).join("  ") || "—",
    },
    {
      tabela: "Card",
      estado: `${cards.length} cards`,
      detalhe: `${cenas} de cena e ${dePalavra} de palavra, ordem de 1 a ${cards.length || 0}`,
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
      detalhe: `Ligadas às perguntas acima, ${corretas} com uma correta marcada`,
    },
  ];

  const validacoes: { ok: boolean; texto: string }[] = [
    { ok: Boolean(trilha.nome.trim()), texto: "Trilha preenchida" },
    { ok: Boolean(tema.titulo.trim()), texto: "Tema preenchido" },
    { ok: Boolean(fase.titulo.trim() && fase.ordem > 0), texto: "Fase com título e ordem" },
    {
      ok: fase.tipo === "Revisao" ? palavrasDoQuiz.length >= 2 : palavras.length >= 1,
      texto:
        fase.tipo === "Revisao"
          ? "Pelo menos duas palavras ensinadas antes desta fase"
          : "Pelo menos uma palavra na fase",
    },
    { ok: fase.tipo === "Dialogo" || cards.length > 0, texto: "Cards da abertura em ordem" },
    {
      ok: fase.perguntas.length > 0 && fase.perguntas.every(perguntaPronta),
      texto: "Perguntas com enunciado, duas ou mais alternativas e uma correta",
    },
  ];

  return (
    <div>
      <Ajuda>
        O que esta fase ocupa em cada tabela. Os relacionamentos e as ordens são criados
        automaticamente.
      </Ajuda>

      <ul className="divide-y divide-slate-100 rounded-xl border border-slate-200 bg-white">
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
    </div>
  );
}

/* ───────────────────────────── peças ───────────────────────────── */

function Ajuda({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 text-sm leading-relaxed text-slate-600">{children}</p>;
}

/**
 * Como este card chega ao aluno.
 *
 * Os mesmos campos montam duas telas bem diferentes: a cena é texto com uma
 * palavra em destaque, e o card de palavra para tudo para mostrar a figura, a
 * palavra e o que ela quer dizer. Lendo só os campos não dá para saber qual
 * das duas vai sair.
 *
 * É um card de cada vez. A sequência inteira, que é como o aluno recebe, está
 * no botão "Ver como o aluno vê".
 */
function PreviaDoCard({ card, palavra }: { card: Card; palavra: Palavra | undefined }) {
  const ingles = palavra?.ingles || card.destaque;
  const traducao = card.traducao || palavra?.traducao || "";
  const temTexto = card.textoAntes || card.destaque || card.textoDepois;

  return (
    <aside className="border-t border-slate-200 bg-deep-900 p-3 lg:border-l lg:border-t-0">
      <p className="text-[11px] font-bold uppercase tracking-wide text-blue-200">Prévia</p>

      <div className="mt-2 rounded-xl bg-white p-3 text-slate-900">
        {card.imagem && (
          // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
          <img src={card.imagem} alt="" className="mb-2 h-24 w-full rounded-lg object-cover" />
        )}

        {card.tipo === "Historia" ? (
          <p className="text-sm leading-relaxed">
            {temTexto ? (
              <>
                {card.textoAntes}{" "}
                {card.destaque && (
                  <strong className="font-extrabold text-accent-600">{card.destaque}</strong>
                )}{" "}
                {card.textoDepois}
              </>
            ) : (
              <span className="text-slate-400">O texto da cena aparece aqui.</span>
            )}
          </p>
        ) : (
          <div className="py-2 text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-accent-500">
              Palavra nova
            </p>
            <p className="mt-1 text-xl font-extrabold text-deep-900">
              {ingles || <span className="text-slate-400">A palavra</span>}
            </p>
            <p className="mt-0.5 text-sm text-ink-700">
              {traducao || <span className="text-slate-400">o que ela quer dizer</span>}
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
