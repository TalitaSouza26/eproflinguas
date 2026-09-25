import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, PlayIcon } from "@/components/ui/icons";

/**
 * Abertura da fase de revisão.
 *
 * A revisão é a única fase sem história, e sem isto ela começava fria: a
 * criança caía direto numa pergunta, numa fase três vezes mais longa que as
 * outras e sem ninguém avisando que era revisão.
 *
 * Aqui o Bubo cumpre o mesmo papel que a história cumpre nas outras fases —
 * dizer o que vem — e a contagem de perguntas prepara para o tamanho.
 */
export function ReviewIntro({
  questions,
  quizHref,
}: {
  questions: number;
  quizHref: string;
}) {
  return (
    <div className="relative z-10 w-full max-w-4xl">
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200 sm:text-sm">
          Última fase da trilha
        </p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
          Revisão
        </h1>
      </header>

      <div className="mt-2 grid items-center gap-2 sm:mt-4 sm:grid-cols-[1.15fr_1fr] sm:gap-0">
        <Image
          src="/bubo/bubo-boas-vindas.webp"
          alt=""
          width={795}
          height={1205}
          unoptimized
          priority
          className="animate-rise-in mx-auto h-64 w-auto drop-shadow-2xl sm:h-[26rem]"
        />

        <div
          className="animate-rise-in sm:-ml-10 lg:-ml-14"
          style={{ animationDelay: "120ms" }}
        >
          <div className="relative rounded-3xl bg-white px-6 py-6 text-center shadow-2xl">
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-sm bg-white
                         sm:-left-2 sm:top-[42%] sm:translate-x-0"
            />

            <p className="text-2xl font-extrabold leading-snug text-deep-900 sm:text-3xl">
              Vamos revisar o que você aprendeu?
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link
              href={quizHref}
              className="animate-cta-call inline-flex w-full items-center justify-center gap-3 rounded-full
                         bg-accent-500 px-10 py-5 text-2xl font-extrabold text-white shadow-2xl
                         shadow-black/30 transition hover:bg-accent-600 focus-visible:outline-4
                         focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-14"
            >
              <PlayIcon className="size-7" />
              Começar
            </Link>

            <p className="mt-3 text-sm font-semibold text-blue-100">
              {questions} perguntas{" "}
              <span className="px-1 text-blue-300">•</span> tudo o que você já
              viu
            </p>
          </div>
        </div>
      </div>

      <p className="mt-6 text-center">
        <Link
          href={quizHref}
          className="text-sm font-semibold text-blue-200 underline-offset-4 transition hover:text-white
                     hover:underline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Ir direto para as perguntas
          <ArrowRightIcon className="ml-1.5 inline size-3.5" />
        </Link>
      </p>
    </div>
  );
}
