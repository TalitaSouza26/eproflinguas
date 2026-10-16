"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BOTAO, BOTAO_CLARO, Campo } from "@/components/admin/campos";
import { FaseEditor } from "@/components/admin/fase-editor";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ReplayIcon } from "@/components/ui/icons";
import {
  faseVazia,
  fasesProntas,
  gravarDemo,
  lerDemo,
  limparDemo,
  perguntasDaFase,
  reduzirImagem,
  SEM_NADA,
  TIPOS,
  trilhaNoAr,
  trilhaVazia,
  type DemoDados,
  type DemoTrilha,
} from "@/lib/demo/trilha";

/**
 * O backoffice de demonstração.
 *
 * Três níveis, como se navega conteúdo: a lista de trilhas, as fases de uma
 * trilha, e o editor de uma fase. Empilhar tudo numa tela só parecia mais
 * direto e não é — com três trilhas de quatro fases já não se acha nada.
 *
 * Nada é gravado: o conteúdo vive na aba e morre com ela. O que se quer
 * provar aqui é o caminho de montar, não guardar.
 */
export function Painel() {
  const [dados, setDados] = useState<DemoDados>(SEM_NADA);
  const [trilhaAberta, setTrilhaAberta] = useState<string | null>(null);
  const [faseAberta, setFaseAberta] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // O que já estiver na aba volta para a tela. É leitura de armazenamento do
  // navegador, que só existe depois de montar — daí o efeito, e não um valor
  // inicial: no servidor não há aba, e semear com outro valor quebraria a
  // hidratação. Roda uma vez, sem cascata.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única de sessionStorage no mount
    setDados(lerDemo() ?? SEM_NADA);
  }, []);

  /** Grava na hora: num protótipo, "salvar" é só mais um passo para esquecer. */
  function guardar(novos: DemoDados) {
    setDados(novos);
    gravarDemo(novos);
  }

  function mexerTrilha(id: string, mudanca: Partial<DemoTrilha>) {
    guardar({
      trilhas: dados.trilhas.map((t) => (t.id === id ? { ...t, ...mudanca } : t)),
    });
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

  const trilha = dados.trilhas.find((t) => t.id === trilhaAberta);
  const fase = trilha && faseAberta !== null ? trilha.fases[faseAberta] : undefined;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              eProf Línguas · Admin
            </p>
            {/* O caminho percorrido, clicável: é como se volta de nível. */}
            <h1 className="flex flex-wrap items-center gap-2 text-xl font-extrabold">
              <button
                type="button"
                onClick={() => {
                  setTrilhaAberta(null);
                  setFaseAberta(null);
                }}
                className="underline-offset-4 hover:underline focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Trilhas
              </button>
              {trilha && (
                <>
                  <span className="text-slate-300">/</span>
                  <button
                    type="button"
                    onClick={() => setFaseAberta(null)}
                    className="underline-offset-4 hover:underline focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {trilha.nome.trim() || "Sem nome"}
                  </button>
                </>
              )}
              {fase && faseAberta !== null && (
                <>
                  <span className="text-slate-300">/</span>
                  <span className="text-slate-500">
                    {fase.titulo.trim() || `Fase ${faseAberta + 1}`}
                  </span>
                </>
              )}
            </h1>
          </div>

          <Link
            href="/inicio"
            className="shrink-0 text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
          >
            Ver o aplicativo do aluno
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <p className="mb-7 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong className="font-bold">Demonstração.</strong> O conteúdo vive só nesta aba:
          fechou, acabou. Serve para ver o caminho funcionando, não para guardar conteúdo.
        </p>

        {erro && <p className="mb-4 text-sm font-semibold text-red-700">{erro}</p>}

        {!trilha && (
          <ListaTrilhas
            dados={dados}
            onAbrir={setTrilhaAberta}
            onNova={() => {
              const nova = trilhaVazia();
              guardar({ trilhas: [...dados.trilhas, nova] });
              setTrilhaAberta(nova.id);
            }}
            onApagar={(id) => guardar({ trilhas: dados.trilhas.filter((t) => t.id !== id) })}
            onLimparTudo={() => {
              limparDemo();
              setDados(SEM_NADA);
              setTrilhaAberta(null);
            }}
          />
        )}

        {trilha && faseAberta === null && (
          <Fases
            trilha={trilha}
            onMudar={(m) => mexerTrilha(trilha.id, m)}
            onAbrirFase={setFaseAberta}
          />
        )}

        {trilha && fase && faseAberta !== null && (
          <section className="rounded-xl border border-slate-200 bg-white p-6">
            <button
              type="button"
              onClick={() => setFaseAberta(null)}
              className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-blue-700
                         underline-offset-4 hover:underline focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              <ArrowLeftIcon className="size-4" />
              Voltar às fases de {trilha.nome.trim() || "esta trilha"}
            </button>

            <FaseEditor
              fase={fase}
              indice={faseAberta}
              perguntas={perguntasDaFase(trilha, faseAberta).length}
              onMudar={(m) =>
                mexerTrilha(trilha.id, {
                  fases: trilha.fases.map((f, j) => (j === faseAberta ? { ...f, ...m } : f)),
                })
              }
              onFigura={comFigura}
            />
          </section>
        )}
      </main>
    </div>
  );
}

/** Nível 1: todas as trilhas montadas. */
function ListaTrilhas({
  dados,
  onAbrir,
  onNova,
  onApagar,
  onLimparTudo,
}: {
  dados: DemoDados;
  onAbrir: (id: string) => void;
  onNova: () => void;
  onApagar: (id: string) => void;
  onLimparTudo: () => void;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-6">
        <div>
          <h2 className="text-base font-extrabold">Trilhas</h2>
          <p className="mt-1 text-sm text-slate-500">
            Cada trilha tem um tema e uma sequência de fases. Clique para ver as fases dela.
          </p>
        </div>
        <button type="button" onClick={onNova} className={`${BOTAO} shrink-0 bg-blue-700 text-white hover:bg-blue-800`}>
          Nova trilha
        </button>
      </div>

      {dados.trilhas.length === 0 ? (
        <p className="p-6 text-sm text-slate-500">
          Nenhuma trilha ainda. Comece por uma — depois você acrescenta as fases dentro dela.
        </p>
      ) : (
        <ul>
          {dados.trilhas.map((t) => {
            const prontas = fasesProntas(t);
            return (
              <li key={t.id} className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 last:border-b-0">
                <button
                  type="button"
                  onClick={() => onAbrir(t.id)}
                  className="flex flex-1 items-center gap-3 text-left focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                      trilhaNoAr(t) ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {prontas}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-extrabold">
                      {t.nome.trim() || "Sem nome"}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      {t.tema.trim() ? `Tema · ${t.tema}` : "Sem tema"} ·{" "}
                      {t.fases.length} {t.fases.length === 1 ? "fase" : "fases"}
                      {prontas < t.fases.length && `, ${t.fases.length - prontas} incompleta(s)`}
                    </span>
                  </span>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                      trilhaNoAr(t) ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {trilhaNoAr(t) ? "No aplicativo" : "Incompleta"}
                  </span>
                  <ArrowRightIcon className="size-4 shrink-0 text-slate-400" />
                </button>

                <button
                  type="button"
                  aria-label={`Apagar trilha ${t.nome || "sem nome"}`}
                  onClick={() => onApagar(t.id)}
                  className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <CloseIcon className="size-4" />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      {dados.trilhas.length > 0 && (
        <div className="p-6">
          <button
            type="button"
            onClick={onLimparTudo}
            className={`${BOTAO} text-slate-500 hover:bg-slate-100 hover:text-slate-800`}
          >
            <ReplayIcon className="size-4" />
            Apagar tudo e começar de novo
          </button>
        </div>
      )}
    </section>
  );
}

/** Nível 2: as fases de uma trilha. */
function Fases({
  trilha,
  onMudar,
  onAbrirFase,
}: {
  trilha: DemoTrilha;
  onMudar: (m: Partial<DemoTrilha>) => void;
  onAbrirFase: (i: number) => void;
}) {
  return (
    <>
      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-extrabold">A trilha</h2>
        <p className="mt-1 text-sm text-slate-500">
          O nome aparece na lista de trilhas do aluno. O tema é só para você se organizar aqui.
        </p>

        <div className="mt-4 grid max-w-xl gap-4 sm:grid-cols-2">
          <Campo
            id="nome-trilha"
            rotulo="Nome"
            valor={trilha.nome}
            placeholder="Cores e números"
            onChange={(nome) => onMudar({ nome })}
          />
          <Campo
            id="tema-trilha"
            rotulo="Tema"
            valor={trilha.tema}
            placeholder="Cores"
            onChange={(tema) => onMudar({ tema })}
          />
        </div>
      </section>

      <section className="mt-5 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-base font-extrabold">As fases desta trilha</h2>
          <p className="mt-1 text-sm text-slate-500">
            Na ordem em que o aluno percorre. Clique numa fase para montar o conteúdo dela.
          </p>
        </div>

        {trilha.fases.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">Nenhuma fase ainda.</p>
        ) : (
          <ul>
            {trilha.fases.map((fase, i) => {
              const perguntas = perguntasDaFase(trilha, i).length;
              const nomeTipo = TIPOS.find((t) => t.tipo === fase.tipo)?.nome ?? fase.tipo;

              return (
                <li key={i} className="flex items-center gap-3 border-b border-slate-200 px-6 py-4 last:border-b-0">
                  <button
                    type="button"
                    onClick={() => onAbrirFase(i)}
                    className="flex flex-1 items-center gap-3 text-left focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <span
                      className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                        perguntas > 0 ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 truncate text-sm font-extrabold">
                      {fase.titulo.trim() || `Fase ${i + 1}`}
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      {nomeTipo}
                    </span>
                    <span className="w-28 shrink-0 text-right text-xs text-slate-500">
                      {perguntas > 0
                        ? `${perguntas} ${perguntas === 1 ? "pergunta" : "perguntas"}`
                        : "incompleta"}
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 text-slate-400" />
                  </button>

                  <button
                    type="button"
                    aria-label={`Remover fase ${i + 1}`}
                    onClick={() => onMudar({ fases: trilha.fases.filter((_, j) => j !== i) })}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <CloseIcon className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 p-6">
          <button
            type="button"
            onClick={() => {
              onMudar({ fases: [...trilha.fases, faseVazia("galeria")] });
              onAbrirFase(trilha.fases.length);
            }}
            className={BOTAO_CLARO}
          >
            Nova fase
          </button>
          <button
            type="button"
            onClick={() => {
              onMudar({ fases: [...trilha.fases, faseVazia("revisao")] });
              onAbrirFase(trilha.fases.length);
            }}
            className={BOTAO_CLARO}
          >
            Fase de revisão no fim
          </button>
        </div>
      </section>

      {trilhaNoAr(trilha) && (
        <p className="mt-5">
          <Link href={`/quizzes/demo?trilha=${trilha.id}&fase=1`} className={BOTAO_CLARO}>
            Jogar esta trilha
            <ArrowRightIcon className="size-4" />
          </Link>
        </p>
      )}
    </>
  );
}
