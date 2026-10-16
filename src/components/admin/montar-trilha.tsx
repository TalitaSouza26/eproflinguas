"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRightIcon, CheckIcon, CloseIcon, ReplayIcon } from "@/components/ui/icons";
import {
  gravarDemo,
  lerDemo,
  limparDemo,
  palavrasProntas,
  perguntasDa,
  reduzirImagem,
  TRILHA_VAZIA,
  type DemoPalavra,
  type DemoTrilha,
} from "@/lib/demo/trilha";

const CAMPO =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 " +
  "focus-visible:outline-blue-600";

const BOTAO =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold " +
  "transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

const vazia = (): DemoPalavra => ({ en: "", pt: "", imagem: null });

/**
 * Montar uma trilha e vê-la na tela do aluno.
 *
 * Demonstra o caminho, não guarda conteúdo: o que você monta vive na aba e
 * morre com ela. É a parte que vale provar antes de existir banco — se o
 * fluxo de montar está certo, guardar é detalhe depois.
 *
 * Tudo sai das palavras. Você não escreve pergunta: cadastra a palavra com a
 * figura, e o quiz é gerado — distrator da própria lista, resposta alternando
 * de posição. É a mesma receita da trilha "Casa e família".
 */
export function MontarTrilha() {
  const [trilha, setTrilha] = useState<DemoTrilha>(TRILHA_VAZIA);
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
       
      setTrilha({ nome: "", palavras: [vazia(), vazia(), vazia()] });
    }
  }, []);

  const prontas = palavrasProntas(trilha);
  const podePublicar = Boolean(trilha.nome.trim()) && prontas.length >= 2;

  function mexer(i: number, campo: keyof DemoPalavra, valor: string | null) {
    setTrilha((t) => ({
      ...t,
      palavras: t.palavras.map((p, j) => (j === i ? { ...p, [campo]: valor } : p)),
    }));
    setNoAr(false);
  }

  async function subirImagem(i: number, arquivo: File | undefined) {
    if (!arquivo) return;
    setErro(null);
    try {
      mexer(i, "imagem", await reduzirImagem(arquivo));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "não consegui usar essa imagem");
    }
  }

  function publicar() {
    gravarDemo({ nome: trilha.nome.trim(), palavras: prontas });
    setNoAr(true);
  }

  function apagar() {
    limparDemo();
    setTrilha({ nome: "", palavras: [vazia(), vazia(), vazia()] });
    setNoAr(false);
  }

  const perguntas = perguntasDa(trilha).length;

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
          <h2 className="text-base font-extrabold">1 · A trilha</h2>
          <p className="mt-1 text-sm text-slate-500">
            O nome que o aluno vê na lista de trilhas.
          </p>

          <label className="mt-4 block max-w-sm">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500">
              Nome
            </span>
            <input
              id="nome-trilha"
              className={CAMPO}
              value={trilha.nome}
              placeholder="Cores e números"
              onChange={(e) => {
                setTrilha((t) => ({ ...t, nome: e.target.value }));
                setNoAr(false);
              }}
            />
          </label>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-extrabold">2 · As palavras</h2>
          <p className="mt-1 text-sm text-slate-500">
            Palavra, tradução e figura. A figura é obrigatória: o quiz é de imagem, e
            quem responde ainda não lê. Mínimo de duas palavras.
          </p>

          <ul className="mt-5 space-y-3">
            {trilha.palavras.map((palavra, i) => {
              const completa = palavra.en.trim() && palavra.pt.trim() && palavra.imagem;
              return (
                <li
                  key={i}
                  className="grid items-center gap-3 rounded-lg border border-slate-200 p-3
                             sm:grid-cols-[88px_1fr_1fr_auto]"
                >
                  {/* A figura é o campo mais importante da linha, então ocupa
                      a primeira coluna e mostra o que foi escolhido. */}
                  <label className="relative block h-[88px] w-[88px] shrink-0 cursor-pointer overflow-hidden rounded-lg border border-dashed border-slate-300 bg-slate-50">
                    {palavra.imagem ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={palavra.imagem}
                        alt=""
                        className="absolute inset-0 size-full object-cover"
                      />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-semibold text-slate-400">
                        Escolher figura
                      </span>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      aria-label={`Figura da palavra ${i + 1}`}
                      onChange={(e) => subirImagem(i, e.target.files?.[0])}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Inglês
                    </span>
                    <input
                      id={`en-${i}`}
                      className={CAMPO}
                      value={palavra.en}
                      placeholder="Red"
                      onChange={(e) => mexer(i, "en", e.target.value)}
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                      Português
                    </span>
                    <input
                      id={`pt-${i}`}
                      className={CAMPO}
                      value={palavra.pt}
                      placeholder="vermelho"
                      onChange={(e) => mexer(i, "pt", e.target.value)}
                    />
                  </label>

                  <div className="flex items-center gap-2 justify-self-end">
                    {completa ? (
                      <CheckIcon className="size-5 text-emerald-600" />
                    ) : (
                      <span className="w-5" />
                    )}
                    <button
                      type="button"
                      aria-label={`Remover palavra ${i + 1}`}
                      onClick={() => {
                        setTrilha((t) => ({
                          ...t,
                          palavras: t.palavras.filter((_, j) => j !== i),
                        }));
                        setNoAr(false);
                      }}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    >
                      <CloseIcon className="size-4" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>

          {erro && <p className="mt-3 text-sm font-semibold text-red-700">{erro}</p>}

          <button
            type="button"
            onClick={() => setTrilha((t) => ({ ...t, palavras: [...t.palavras, vazia()] }))}
            className={`${BOTAO} mt-4 border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
          >
            Mais uma palavra
          </button>
        </section>

        <section className="mt-5 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-base font-extrabold">3 · O quiz</h2>
          <p className="mt-1 text-sm text-slate-500">
            Não se escreve pergunta aqui. Cada palavra pronta vira uma questão de imagem
            com duas alternativas, o distrator sai da própria lista e a resposta certa
            alterna de posição.
          </p>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            {perguntas > 0
              ? `${perguntas} ${perguntas === 1 ? "pergunta" : "perguntas"} a partir de ${prontas.length} palavras.`
              : "Complete ao menos duas palavras para o quiz existir."}
          </p>
        </section>

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
            <Link href="/inicio" className={`${BOTAO} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}>
              Ver na tela do aluno
              <ArrowRightIcon className="size-4" />
            </Link>
          )}

          <button
            type="button"
            onClick={apagar}
            className={`${BOTAO} ml-auto text-slate-500 hover:bg-slate-100 hover:text-slate-800`}
          >
            <ReplayIcon className="size-4" />
            Começar de novo
          </button>
        </div>

        {!podePublicar && (
          <p className="mt-3 text-sm text-slate-500">
            Falta {trilha.nome.trim() ? "" : "dar um nome à trilha"}
            {!trilha.nome.trim() && prontas.length < 2 ? " e " : ""}
            {prontas.length < 2 ? "completar duas palavras com figura" : ""}.
          </p>
        )}

        {noAr && (
          <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-emerald-700">
            <CheckIcon className="size-4" />
            No ar. A trilha aparece na tela de Início e dá para jogar.
          </p>
        )}
      </main>
    </div>
  );
}
