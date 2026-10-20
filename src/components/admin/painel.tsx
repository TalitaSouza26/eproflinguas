"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Apagar, BOTAO_CLARO, BOTAO_FORTE, Chip } from "@/components/admin/campos";
import { FaseEditor, type Rascunho } from "@/components/admin/fase-editor";
import { PerguntasEditor } from "@/components/admin/perguntas-editor";
import { ChevronDownIcon, LogoutIcon, ReplayIcon } from "@/components/ui/icons";
import {
  BANCO_VAZIO,
  contagem,
  ensinadasAntes,
  faseCompleta,
  faseVazia,
  fasesDaTrilha,
  gravarBanco,
  lerBanco,
  limparBanco,
  novoId,
  palavrasDaFase,
  perguntasOrdenadas,
  perguntaPronta,
  reduzirImagem,
  TIPOS_FASE,
  temaVazio,
  trilhaNoAr,
  type Banco,
  type Fase,
  type Palavra,
  type Tema,
  type Trilha,
} from "@/lib/demo/banco";
import { bancoDeExemplo } from "@/lib/demo/semente";

/**
 * O backoffice de demonstração.
 *
 * Duas abas, como o desenvolvedor desenhou: "Montar trilhas", onde a fase é
 * montada com a trilha, o tema, as palavras e os cards, e "Perguntas", onde
 * se escolhe uma fase pronta e se escreve o quiz dela.
 *
 * Os campos são os do banco que já está montado — nada foi inventado aqui.
 * O que não existe é o banco: o conteúdo vive na aba e morre com ela. O que
 * se quer provar é o caminho de montar, não guardar.
 */
export function Painel() {
  const [banco, setBanco] = useState<Banco>(BANCO_VAZIO);
  const [aba, setAba] = useState<"trilhas" | "perguntas">("trilhas");
  const [rascunho, setRascunho] = useState<Rascunho | null>(null);
  const [faseDasPerguntas, setFaseDasPerguntas] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // O que já estiver na aba volta para a tela. Aba limpa abre com a trilha
  // que o produto já tem, como exemplo trabalhado — tela em branco não ensina
  // a preencher nada.
  //
  // É leitura de armazenamento do navegador, que só existe depois de montar —
  // daí o efeito, e não um valor inicial: no servidor não há aba, e semear com
  // outro valor quebraria a hidratação. Roda uma vez, sem cascata.
  useEffect(() => {
    const guardado = lerBanco();
    if (guardado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única de sessionStorage no mount
      setBanco(guardado);
      return;
    }

    const exemplo = bancoDeExemplo() ?? BANCO_VAZIO;
    setBanco(exemplo);
    gravarBanco(exemplo);
  }, []);

  /** Grava na hora: num protótipo, "salvar" é só mais um passo para esquecer. */
  function guardar(novo: Banco) {
    setBanco(novo);
    gravarBanco(novo);
  }

  async function comFigura(arquivo: File | undefined, aplicar: (dataUrl: string) => void) {
    if (!arquivo) return;
    setErro(null);
    try {
      aplicar(await reduzirImagem(arquivo));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "não consegui usar essa imagem");
    }
  }

  /* ─────────────── abrir o editor de fase ─────────────── */

  function novaFase(trilha?: Trilha, tema?: Tema) {
    const ordem = tema ? tema.fases.length + 1 : 1;
    setRascunho({
      trilhaId: trilha?.id ?? null,
      trilha: trilha
        ? { nome: trilha.nome, descricao: trilha.descricao, ordem: trilha.ordem, ativa: trilha.ativa }
        : { nome: "", descricao: "", ordem: banco.trilhas.length + 1, ativa: true },
      temaId: tema?.id ?? null,
      tema: tema
        ? { titulo: tema.titulo, ordem: tema.ordem }
        : { titulo: "", ordem: (trilha?.temas.length ?? 0) + 1 },
      fase: faseVazia(ordem),
      palavrasNovas: [],
      existente: false,
    });
  }

  function editarFase(trilha: Trilha, tema: Tema, fase: Fase) {
    setRascunho({
      trilhaId: trilha.id,
      trilha: { nome: trilha.nome, descricao: trilha.descricao, ordem: trilha.ordem, ativa: trilha.ativa },
      temaId: tema.id,
      tema: { titulo: tema.titulo, ordem: tema.ordem },
      fase: structuredClone(fase),
      palavrasNovas: [],
      existente: true,
    });
  }

  /** Grava o rascunho: cria o que não existe, atualiza o que existe. */
  function salvarRascunho() {
    if (!rascunho) return;

    const palavras = [...banco.palavras, ...rascunho.palavrasNovas];

    const trilhaId = rascunho.trilhaId ?? novoId("tri");
    const temaId = rascunho.temaId ?? novoId("tem");

    const trilhas = [...banco.trilhas];
    let iTrilha = trilhas.findIndex((t) => t.id === trilhaId);

    if (iTrilha < 0) {
      trilhas.push({ id: trilhaId, ...rascunho.trilha, temas: [] });
      iTrilha = trilhas.length - 1;
    } else {
      trilhas[iTrilha] = { ...trilhas[iTrilha], ...rascunho.trilha };
    }

    const temas = [...trilhas[iTrilha].temas];
    let iTema = temas.findIndex((t) => t.id === temaId);

    if (iTema < 0) {
      temas.push({ id: temaId, ...rascunho.tema, fases: [] });
      iTema = temas.length - 1;
    } else {
      temas[iTema] = { ...temas[iTema], ...rascunho.tema };
    }

    // A fase pode ter mudado de tema: tira de onde estava antes.
    const fases = temas[iTema].fases.filter((f) => f.id !== rascunho.fase.id);
    fases.push(rascunho.fase);
    temas[iTema] = { ...temas[iTema], fases };

    for (let j = 0; j < temas.length; j++) {
      if (j === iTema) continue;
      temas[j] = { ...temas[j], fases: temas[j].fases.filter((f) => f.id !== rascunho.fase.id) };
    }

    trilhas[iTrilha] = { ...trilhas[iTrilha], temas };

    guardar({ trilhas, palavras });
    setRascunho(null);
  }

  function apagarFase(trilhaId: string, temaId: string, faseId: string) {
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilhaId
          ? t
          : {
              ...t,
              temas: t.temas.map((tema) =>
                tema.id !== temaId
                  ? tema
                  : { ...tema, fases: tema.fases.filter((f) => f.id !== faseId) },
              ),
            },
      ),
    });
  }

  const n = contagem(banco);

  return (
    <div className="min-h-screen bg-deep-900 pb-16 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <Link href="/inicio" className="shrink-0">
            <Image
              src="/brand/logo-linguas.webp"
              alt="eProf Línguas"
              width={700}
              height={264}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="flex flex-1 justify-center gap-1">
            {(
              [
                ["trilhas", "Montar trilhas"],
                ["perguntas", "Perguntas"],
              ] as const
            ).map(([id, nome]) => (
              <button
                key={id}
                type="button"
                onClick={() => setAba(id)}
                aria-current={aba === id}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                              aba === id
                                ? "bg-white text-deep-900"
                                : "text-blue-100 hover:bg-white/10"
                            }`}
              >
                {nome}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Chip cor="laranja">Admin</Chip>
            <Link
              href="/inicio"
              aria-label="Voltar ao aplicativo do aluno"
              title="Voltar ao aplicativo do aluno"
              className="rounded-full p-2 text-blue-100 transition hover:bg-white/10
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <LogoutIcon className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {erro && (
          <p className="mb-4 rounded-xl bg-wrong-50 px-4 py-2 text-sm font-semibold text-wrong-700">
            {erro}
          </p>
        )}

        {aba === "trilhas" ? (
          <MontarTrilhas
            banco={banco}
            contagem={n}
            onNovaFase={novaFase}
            onEditarFase={editarFase}
            onApagarFase={apagarFase}
            onNovoTema={(trilha) =>
              guardar({
                ...banco,
                trilhas: banco.trilhas.map((t) =>
                  t.id === trilha.id
                    ? { ...t, temas: [...t.temas, temaVazio(t.temas.length + 1)] }
                    : t,
                ),
              })
            }
            onPerguntas={(faseId) => {
              setFaseDasPerguntas(faseId);
              setAba("perguntas");
            }}
            onLimpar={() => {
              limparBanco();
              setBanco(BANCO_VAZIO);
            }}
            onExemplo={() => {
              const exemplo = bancoDeExemplo();
              if (!exemplo) return;
              guardar({
                trilhas: [...banco.trilhas, ...exemplo.trilhas],
                palavras: [...banco.palavras, ...exemplo.palavras],
              });
            }}
          />
        ) : (
          <AbaPerguntas
            banco={banco}
            faseId={faseDasPerguntas}
            onEscolherFase={setFaseDasPerguntas}
            onMudar={(trilhaId, temaId, faseId, perguntas) =>
              guardar({
                ...banco,
                trilhas: banco.trilhas.map((t) =>
                  t.id !== trilhaId
                    ? t
                    : {
                        ...t,
                        temas: t.temas.map((tema) =>
                          tema.id !== temaId
                            ? tema
                            : {
                                ...tema,
                                fases: tema.fases.map((f) =>
                                  f.id === faseId ? { ...f, perguntas } : f,
                                ),
                              },
                        ),
                      },
                ),
              })
            }
            onFigura={comFigura}
          />
        )}
      </main>

      {rascunho && (
        <FaseEditor
          banco={banco}
          rascunho={rascunho}
          onMudar={setRascunho}
          onSalvar={salvarRascunho}
          onFechar={() => setRascunho(null)}
          onFigura={comFigura}
        />
      )}
    </div>
  );
}

/* ───────────────────────── aba Montar trilhas ───────────────────────── */

function MontarTrilhas({
  banco,
  contagem: n,
  onNovaFase,
  onEditarFase,
  onApagarFase,
  onNovoTema,
  onPerguntas,
  onLimpar,
  onExemplo,
}: {
  banco: Banco;
  contagem: ReturnType<typeof contagem>;
  onNovaFase: (trilha?: Trilha, tema?: Tema) => void;
  onEditarFase: (trilha: Trilha, tema: Tema, fase: Fase) => void;
  onApagarFase: (trilhaId: string, temaId: string, faseId: string) => void;
  onNovoTema: (trilha: Trilha) => void;
  onPerguntas: (faseId: string) => void;
  onLimpar: () => void;
  onExemplo: () => void;
}) {
  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold">Montar trilhas</h1>
          <p className="mt-1 text-sm leading-relaxed text-blue-100">
            Cada fase reúne as palavras e os cards da história que o aluno vê antes do quiz. As
            perguntas ficam na aba Perguntas.
          </p>
          <p className="mt-2 text-xs font-bold text-accent-500">
            No banco: {n.fases} fases, {n.palavras} palavras, {n.cards} cards, {n.perguntas}{" "}
            perguntas e {n.alternativas} alternativas.
          </p>
        </div>

        <button type="button" onClick={() => onNovaFase()} className={BOTAO_FORTE}>
          + Nova fase
        </button>
      </div>

      {banco.trilhas.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-8 text-center text-slate-600">
          <p className="text-sm">
            Nenhuma trilha ainda. Comece por uma fase — ou traga a trilha que o produto já tem,
            para usar de exemplo.
          </p>
          <button type="button" onClick={onExemplo} className={`${BOTAO_CLARO} mt-4`}>
            Trazer a trilha do produto
          </button>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {[...banco.trilhas]
            .sort((a, b) => a.ordem - b.ordem)
            .map((trilha) => (
              <CartaoTrilha
                key={trilha.id}
                banco={banco}
                trilha={trilha}
                onNovaFase={onNovaFase}
                onEditarFase={onEditarFase}
                onApagarFase={onApagarFase}
                onNovoTema={onNovoTema}
                onPerguntas={onPerguntas}
              />
            ))}
        </ul>
      )}

      {banco.trilhas.length > 0 && (
        <p className="mt-8">
          <button
            type="button"
            onClick={onLimpar}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-200
                       underline-offset-4 hover:underline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ReplayIcon className="size-4" />
            Apagar tudo e começar de novo
          </button>
        </p>
      )}
    </>
  );
}

function CartaoTrilha({
  banco,
  trilha,
  onNovaFase,
  onEditarFase,
  onApagarFase,
  onNovoTema,
  onPerguntas,
}: {
  banco: Banco;
  trilha: Trilha;
  onNovaFase: (trilha?: Trilha, tema?: Tema) => void;
  onEditarFase: (trilha: Trilha, tema: Tema, fase: Fase) => void;
  onApagarFase: (trilhaId: string, temaId: string, faseId: string) => void;
  onNovoTema: (trilha: Trilha) => void;
  onPerguntas: (faseId: string) => void;
}) {
  const todas = fasesDaTrilha(trilha);

  return (
    <li className="rounded-2xl bg-white p-5 text-slate-900">
      <header className="flex flex-wrap items-center gap-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-extrabold text-accent-600">
          {trilha.ordem}
        </span>
        <h2 className="text-lg font-extrabold">{trilha.nome.trim() || "Sem nome"}</h2>
        {trilha.ativa ? <Chip cor="ok">Ativa</Chip> : <Chip>Inativa</Chip>}
        <span className="text-xs text-slate-500">
          ({trilha.temas.length} {trilha.temas.length === 1 ? "tema" : "temas"}, {todas.length}{" "}
          {todas.length === 1 ? "fase" : "fases"})
        </span>

        <span className="ml-auto flex items-center gap-2">
          {trilhaNoAr(trilha) && (
            <Link
              href={`/quizzes/demo?trilha=${trilha.id}&fase=1`}
              className="text-xs font-bold text-blue-700 underline-offset-4 hover:underline"
            >
              Jogar esta trilha
            </Link>
          )}
          <button type="button" onClick={() => onNovoTema(trilha)} className={BOTAO_CLARO}>
            + Tema
          </button>
        </span>
      </header>

      {trilha.descricao.trim() && (
        <p className="mt-1 pl-11 text-xs text-slate-500">{trilha.descricao}</p>
      )}

      {trilha.temas.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs text-slate-500">
          Nenhum tema. Crie um para pendurar as fases.
        </p>
      ) : (
        [...trilha.temas]
          .sort((a, b) => a.ordem - b.ordem)
          .map((tema) => (
            <BlocoTema
              key={tema.id}
              banco={banco}
              trilha={trilha}
              tema={tema}
              onNovaFase={onNovaFase}
              onEditarFase={onEditarFase}
              onApagarFase={onApagarFase}
              onPerguntas={onPerguntas}
            />
          ))
      )}
    </li>
  );
}

function BlocoTema({
  banco,
  trilha,
  tema,
  onNovaFase,
  onEditarFase,
  onApagarFase,
  onPerguntas,
}: {
  banco: Banco;
  trilha: Trilha;
  tema: Tema;
  onNovaFase: (trilha?: Trilha, tema?: Tema) => void;
  onEditarFase: (trilha: Trilha, tema: Tema, fase: Fase) => void;
  onApagarFase: (trilhaId: string, temaId: string, faseId: string) => void;
  onPerguntas: (faseId: string) => void;
}) {
  const [aberto, setAberto] = useState(true);
  const fases = [...tema.fases].sort((a, b) => a.ordem - b.ordem);
  const pendentes = fases.filter((f) => !faseCompleta(f)).length;

  return (
    <section className="mt-4 rounded-xl bg-slate-50 p-4">
      <header className="flex flex-wrap items-center gap-3">
        <h3 className="text-sm text-slate-500">
          Tema {tema.ordem}:{" "}
          <strong className="font-extrabold text-slate-900">
            {tema.titulo.trim() || "Sem título"}
          </strong>
        </h3>
        <button
          type="button"
          onClick={() => onNovaFase(trilha, tema)}
          className={`${BOTAO_CLARO} ml-auto`}
        >
          + Fase neste tema
        </button>
      </header>

      {fases.length > 0 && (
        <button
          type="button"
          onClick={() => setAberto((a) => !a)}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-slate-600
                     underline-offset-4 hover:underline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ChevronDownIcon className={`size-4 transition ${aberto ? "" : "-rotate-90"}`} />
          {aberto ? "Ver menos" : "Ver mais…"}
          <span className="font-normal text-slate-500">
            ({fases.length} {fases.length === 1 ? "fase" : "fases"}
            {pendentes > 0 && `, ${pendentes} pendentes`})
          </span>
        </button>
      )}

      {aberto && fases.length > 0 && (
        <ul className="mt-3 space-y-2">
          {fases.map((fase) => (
            <LinhaFase
              key={fase.id}
              banco={banco}
              trilha={trilha}
              tema={tema}
              fase={fase}
              onEditar={() => onEditarFase(trilha, tema, fase)}
              onApagar={() => onApagarFase(trilha.id, tema.id, fase.id)}
              onPerguntas={() => onPerguntas(fase.id)}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

function LinhaFase({
  banco,
  trilha,
  tema,
  fase,
  onEditar,
  onApagar,
  onPerguntas,
}: {
  banco: Banco;
  trilha: Trilha;
  tema: Tema;
  fase: Fase;
  onEditar: () => void;
  onApagar: () => void;
  onPerguntas: () => void;
}) {
  const palavras = palavrasDaFase(banco, fase);
  const cards = fase.cards.length;
  const perguntas = fase.perguntas.length;
  const nomeTipo = TIPOS_FASE.find((t) => t.tipo === fase.tipo)?.nome ?? fase.tipo;

  const revisadas = fase.tipo === "Revisao" ? ensinadasAntes(banco, trilha, fase.id).length : 0;
  const semPalavras = fase.tipo === "Revisao" ? revisadas < 2 : palavras.length === 0;

  return (
    <li className="rounded-xl bg-white p-3">
      <div className="flex flex-wrap items-start gap-3">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-extrabold text-slate-600">
          {fase.ordem}
        </span>

        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-2">
            <strong className="text-sm font-extrabold text-slate-900">
              Fase {fase.ordem}: {fase.titulo.trim() || "Sem título"}
            </strong>
            <Chip cor={fase.tipo === "Revisao" ? "atencao" : "azul"}>{nomeTipo}</Chip>
          </p>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            {fase.descricao.trim() || "Sem descrição"}
          </p>

          {palavras.length > 0 && (
            <ul className="mt-1.5 flex flex-wrap gap-1.5">
              {palavras.slice(0, 6).map((p: Palavra) => (
                <li
                  key={p.id}
                  className="rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-700"
                >
                  {p.ingles}
                </li>
              ))}
            </ul>
          )}

          <p className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            <span>
              {fase.tipo === "Revisao" ? `${revisadas} palavras revisadas` : `${palavras.length} palavras`}{" "}
              · {cards} cards da história · {perguntas}{" "}
              {perguntas === 1 ? "pergunta" : "perguntas"}
            </span>

            {faseCompleta(fase) && !semPalavras ? (
              <Chip cor="ok">Pronta para o aluno</Chip>
            ) : (
              <>
                {semPalavras && <Chip cor="atencao">Sem palavras</Chip>}
                {fase.tipo !== "Dialogo" && cards === 0 && <Chip cor="atencao">Sem história</Chip>}
                {perguntas === 0 && <Chip cor="atencao">Sem perguntas</Chip>}
                {perguntas > 0 && !perguntasOrdenadas(fase).every(perguntaPronta) && (
                  <Chip cor="atencao">Perguntas incompletas</Chip>
                )}
              </>
            )}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={onEditar} className={BOTAO_CLARO}>
            Editar fase
          </button>
          <button
            type="button"
            onClick={onPerguntas}
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2
                       text-sm font-bold text-white transition hover:bg-blue-700
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Perguntas
          </button>
          <Apagar oque={`fase ${fase.ordem} de ${tema.titulo || "este tema"}`} onClick={onApagar} />
        </div>
      </div>
    </li>
  );
}

/* ───────────────────────── aba Perguntas ───────────────────────── */

function AbaPerguntas({
  banco,
  faseId,
  onEscolherFase,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  faseId: string | null;
  onEscolherFase: (id: string) => void;
  onMudar: (
    trilhaId: string,
    temaId: string,
    faseId: string,
    perguntas: Fase["perguntas"],
  ) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  // Na ordem em que o aluno percorre, e não na ordem em que foram salvas:
  // salvar uma fase a joga para o fim da lista do tema.
  const todas = [...banco.trilhas]
    .sort((a, b) => a.ordem - b.ordem)
    .flatMap((trilha) =>
      fasesDaTrilha(trilha).map(({ fase, tema }) => ({ trilha, tema, fase })),
    );

  const atual = todas.find((x) => x.fase.id === faseId) ?? todas[0];

  if (!atual) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-600">
        Nenhuma fase montada ainda. Vá a “Montar trilhas” e crie a primeira.
      </div>
    );
  }

  const palavras = palavrasDaFase(banco, atual.fase);
  const revisadas = ensinadasAntes(banco, atual.trilha, atual.fase.id);
  const doQuiz = atual.fase.tipo === "Revisao" ? revisadas : palavras;

  return (
    <>
      <h1 className="text-3xl font-extrabold">Perguntas</h1>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100">
        Escolha uma fase montada e crie as perguntas a partir das palavras e da história dela.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
        <nav className="h-fit rounded-2xl bg-white p-3">
          <p className="px-2 pb-2 text-xs font-bold text-slate-600">Fase</p>
          <ul className="space-y-1">
            {todas.map(({ fase, trilha }) => (
              <li key={fase.id}>
                <button
                  type="button"
                  onClick={() => onEscolherFase(fase.id)}
                  aria-current={fase.id === atual.fase.id}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition
                              focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-blue-600 ${
                                fase.id === atual.fase.id
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                >
                  <span className="block truncate">
                    Fase {fase.ordem}: {fase.titulo.trim() || "Sem título"}
                  </span>
                  <span className="block truncate text-[11px] font-normal text-slate-500">
                    {trilha.nome} · {fase.perguntas.length}{" "}
                    {fase.perguntas.length === 1 ? "pergunta" : "perguntas"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="rounded-2xl bg-white p-5 text-slate-900">
          <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            <Chip cor={atual.fase.tipo === "Revisao" ? "atencao" : "azul"}>
              {TIPOS_FASE.find((t) => t.tipo === atual.fase.tipo)?.nome}
            </Chip>
            <span className="text-xs text-slate-500">
              {doQuiz.length} palavras · {atual.fase.cards.length} cards da história
            </span>
            <ul className="flex w-full flex-wrap gap-1.5">
              {doQuiz.map((p) => (
                <li key={p.id} className="text-[11px] text-slate-600">
                  <strong className="font-extrabold">{p.ingles}</strong> {p.traducao}
                </li>
              ))}
            </ul>
          </header>

          <div className="pt-4">
            <PerguntasEditor
              banco={banco}
              fase={atual.fase}
              palavras={doQuiz}
              onMudar={(perguntas) =>
                onMudar(atual.trilha.id, atual.tema.id, atual.fase.id, perguntas)
              }
              onFigura={onFigura}
            />
          </div>

          <p className="mt-5 border-t border-slate-200 pt-4 text-[11px] text-slate-500">
            Ao salvar: {atual.fase.perguntas.length} registros em Pergunta e{" "}
            {atual.fase.perguntas.reduce((s, p) => s + p.alternativas.length, 0)} registros em
            Alternativa, ligados à fase {atual.fase.titulo.trim() || "sem título"}.
          </p>
        </section>
      </div>
    </>
  );
}
