"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BOTAO, BOTAO_CLARO, Campo } from "@/components/admin/campos";
import { FaseEditor } from "@/components/admin/fase-editor";
import { ArrowRightIcon, CheckIcon, CloseIcon, ReplayIcon } from "@/components/ui/icons";
import {
  faseCompleta,
  faseVazia,
  gravarDemo,
  lerDemo,
  limparDemo,
  perguntasDaFase,
  reduzirImagem,
  TIPOS,
  TRILHA_VAZIA,
  type DemoFase,
  type DemoTrilha,
} from "@/lib/demo/trilha";

/**
 * Montar uma trilha e vê-la na tela do aluno.
 *
 * Demonstra o caminho, não guarda conteúdo: o que você monta vive na aba e
 * morre com ela. É a parte que vale provar antes de existir banco — se o
 * fluxo de montar está certo, guardar é detalhe depois.
 *
 * Nenhuma pergunta é digitada. Em qualquer tipo de fase, o quiz sai do
 * conteúdo: as palavras, as conversas, ou — na revisão — o que as fases
 * anteriores ensinaram.
 */
export function MontarTrilha() {
  const [trilha, setTrilha] = useState<DemoTrilha>(TRILHA_VAZIA);
  const [aberta, setAberta] = useState(0);
  const [noAr, setNoAr] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // O que já estiver na aba volta para a tela, para não perder o trabalho ao
  // ir ver o resultado no aluno e voltar.
  //
  // É leitura de armazenamento do navegador, que só existe depois de montar —
  // daí o efeito, e não um valor inicial: no servidor não há aba, e semear o
  // formulário com um valor diferente do que o servidor renderizou quebraria
  // a hidratação. Roda uma vez, sem cascata.
  useEffect(() => {
    const guardada = lerDemo();
    if (guardada) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única de sessionStorage no mount
      setTrilha(guardada);
      setNoAr(true);
    } else {
      setTrilha({ nome: "", fases: [faseVazia("galeria")] });
    }
  }, []);

  const prontas = trilha.fases.filter((_, i) => faseCompleta(trilha, i));
  const podePublicar = Boolean(trilha.nome.trim()) && prontas.length > 0;

  function mexer(mudanca: Partial<DemoTrilha>) {
    setTrilha((t) => ({ ...t, ...mudanca }));
    setNoAr(false);
  }

  function mexerFase(i: number, mudanca: Partial<DemoFase>) {
    mexer({ fases: trilha.fases.map((f, j) => (j === i ? { ...f, ...mudanca } : f)) });
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

  function publicar() {
    // Só o que rende pergunta vai para o aluno: fase meio digitada viraria
    // uma tela vazia no meio da trilha.
    gravarDemo({
      nome: trilha.nome.trim(),
      fases: trilha.fases.filter((_, i) => faseCompleta(trilha, i)),
    });
    setNoAr(true);
  }

  function recomecar() {
    limparDemo();
    setTrilha({ nome: "", fases: [faseVazia("galeria")] });
    setAberta(0);
    setNoAr(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">
              eProf Línguas · Admin
            </p>
            <h1 className="text-xl font-extrabold">Montar trilha</h1>
          </div>
          <Link
            href="/inicio"
            className="text-sm font-semibold text-blue-700 underline-offset-4 hover:underline"
          >
            Ver o aplicativo do aluno
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        {/* O aviso vem antes de tudo: quem monta precisa saber que não guarda,
            senão descobre fechando a aba depois de meia hora de trabalho. */}
        <p className="mb-7 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <strong className="font-bold">Demonstração.</strong> A trilha vive só nesta aba:
          fechou, acabou. Serve para ver o caminho funcionando, não para guardar conteúdo.
        </p>

        <section className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-extrabold">A trilha</h2>
          <p className="mt-1 text-sm text-slate-500">O nome que o aluno vê na lista de trilhas.</p>

          <div className="mt-4 max-w-sm">
            <Campo
              id="nome-trilha"
              rotulo="Nome"
              valor={trilha.nome}
              placeholder="Cores e números"
              onChange={(nome) => mexer({ nome })}
            />
          </div>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 p-6">
            <h2 className="text-base font-extrabold">As fases</h2>
            <p className="mt-1 text-sm text-slate-500">
              Na ordem em que o aluno percorre. Uma trilha costuma terminar numa fase de
              revisão.
            </p>
          </div>

          <ul>
            {trilha.fases.map((fase, i) => {
              const perguntas = perguntasDaFase(trilha, i).length;
              const nomeTipo = TIPOS.find((t) => t.tipo === fase.tipo)?.nome ?? fase.tipo;
              const estaAberta = aberta === i;

              return (
                <li key={i} className="border-b border-slate-200 last:border-b-0">
                  <div className="flex items-center gap-3 px-6 py-4">
                    <button
                      type="button"
                      aria-expanded={estaAberta}
                      onClick={() => setAberta(estaAberta ? -1 : i)}
                      className="flex flex-1 items-center gap-3 text-left focus-visible:outline-2
                                 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <span
                        className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
                          perguntas > 0
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm font-extrabold">
                        {fase.titulo.trim() || `Fase ${i + 1}`}
                      </span>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-slate-600">
                        {nomeTipo}
                      </span>
                      <span className="text-xs text-slate-500">
                        {perguntas > 0
                          ? `${perguntas} ${perguntas === 1 ? "pergunta" : "perguntas"}`
                          : "incompleta"}
                      </span>
                    </button>

                    {trilha.fases.length > 1 && (
                      <button
                        type="button"
                        aria-label={`Remover fase ${i + 1}`}
                        onClick={() => {
                          mexer({ fases: trilha.fases.filter((_, j) => j !== i) });
                          setAberta(0);
                        }}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        <CloseIcon className="size-4" />
                      </button>
                    )}
                  </div>

                  {estaAberta && (
                    <div className="px-6 pb-6">
                      <FaseEditor
                        fase={fase}
                        indice={i}
                        perguntas={perguntas}
                        onMudar={(m) => mexerFase(i, m)}
                        onFigura={comFigura}
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex flex-wrap gap-2 p-6">
            <button
              type="button"
              onClick={() => {
                mexer({ fases: [...trilha.fases, faseVazia("galeria")] });
                setAberta(trilha.fases.length);
              }}
              className={BOTAO_CLARO}
            >
              Mais uma fase
            </button>
            <button
              type="button"
              onClick={() => {
                mexer({ fases: [...trilha.fases, faseVazia("revisao")] });
                setAberta(trilha.fases.length);
              }}
              className={BOTAO_CLARO}
            >
              Fase de revisão no fim
            </button>
          </div>
        </section>

        {erro && <p className="mt-4 text-sm font-semibold text-red-700">{erro}</p>}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={publicar}
            disabled={!podePublicar}
            className={`${BOTAO} bg-blue-700 text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-300`}
          >
            {noAr ? "Atualizar no aplicativo" : "Pôr no aplicativo"}
          </button>

          {noAr && (
            <Link href="/quizzes/demo?fase=1" className={BOTAO_CLARO}>
              Jogar a trilha
              <ArrowRightIcon className="size-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={recomecar}
            className={`${BOTAO} ml-auto text-slate-500 hover:bg-slate-100 hover:text-slate-800`}
          >
            <ReplayIcon className="size-4" />
            Começar de novo
          </button>
        </div>

        {!podePublicar && (
          <p className="mt-3 text-sm text-slate-500">
            Falta {trilha.nome.trim() ? "" : "dar um nome à trilha"}
            {!trilha.nome.trim() && prontas.length === 0 ? " e " : ""}
            {prontas.length === 0 ? "completar ao menos uma fase" : ""}.
          </p>
        )}

        {noAr && (
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckIcon className="size-4" />
            No ar com {prontas.length} {prontas.length === 1 ? "fase" : "fases"}. A trilha aparece
            na tela de Início.
          </p>
        )}
      </main>
    </div>
  );
}
