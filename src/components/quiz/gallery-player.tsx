"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { QuizImage } from "@/components/quiz/quiz-image";
import { ArrowLeftIcon, ArrowRightIcon, PlayIcon, SpeakerIcon } from "@/components/ui/icons";
import type { Gallery } from "@/lib/quiz/galeria";

/**
 * A galeria "Olha e escuta" — a abertura das fases sem história.
 *
 * Um cartão por palavra: a figura grande, a palavra em inglês, o que ela quer
 * dizer e o botão de ouvir. A criança anda no próprio ritmo e pode voltar.
 *
 * A palavra em inglês é falada sozinha ao abrir cada cartão. É o contrário da
 * regra do resto do app, onde nada toca sem o aluno pedir — aqui vale porque a
 * criança já apertou "Começar" sabendo que vem som, e porque numa galeria de
 * vocabulário ouvir a palavra **é** o conteúdo: deixar isso a cargo de um
 * segundo toque faria metade das crianças passar batido pela pronúncia.
 */
export function GalleryPlayer({ gallery, quizHref }: { gallery: Gallery; quizHref: string }) {
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const total = gallery.words.length;
  const word = gallery.words[index];
  const isLast = index === total - 1;

  // A fala do cartão anterior precisa parar antes da próxima começar, senão as
  // duas se sobrepõem em quem avança rápido.
  const spoken = useRef<string | null>(null);

  useEffect(() => {
    if (!started) return;

    const synth = window.speechSynthesis;
    if (!synth || spoken.current === word.en) return;

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(word.en);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    synth.speak(utterance);
    spoken.current = word.en;
  }, [started, word.en]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function speak() {
    const synth = window.speechSynthesis;
    if (!synth) return;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(word.en);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    synth.speak(utterance);
  }

  if (!started) {
    return (
      <div className="relative z-10 w-full max-w-3xl">
        <header className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200 sm:text-sm">
            Fase {gallery.phase} · Casa e família
          </p>
          <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
            {gallery.title}
          </h1>
        </header>

        <div className="mt-6 flex flex-col items-center gap-2 sm:flex-row sm:justify-center sm:gap-0">
          <Image
            src="/bubo/bubo-boas-vindas.webp"
            alt=""
            width={795}
            height={1205}
            unoptimized
            priority
            className="animate-rise-in h-56 w-auto shrink-0 drop-shadow-2xl sm:h-[24rem]"
          />

          <div
            className="animate-rise-in w-full sm:ml-3 sm:w-[26rem]"
            style={{ animationDelay: "120ms" }}
          >
            <div className="relative rounded-3xl bg-white px-6 py-6 text-center shadow-2xl">
              <span
                aria-hidden
                className="absolute -top-2.5 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-sm bg-white
                           sm:-left-2 sm:top-[42%] sm:translate-x-0"
              />
              <p className="text-2xl font-extrabold leading-snug text-deep-900 sm:text-3xl">
                Olha e escuta!
              </p>
              <p className="mt-2 text-base text-ink-500">
                {total} palavras novas. Depois é a sua vez.
              </p>
            </div>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="animate-cta-call inline-flex w-full items-center justify-center gap-3 rounded-full
                           bg-accent-500 px-10 py-5 text-2xl font-extrabold text-white shadow-2xl
                           shadow-black/30 transition hover:bg-accent-600 focus-visible:outline-4
                           focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-14"
              >
                <PlayIcon className="size-7" />
                Começar
              </button>
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

  return (
    <div className="relative z-10 w-full max-w-xl">
      {/* Onde a criança está na galeria: um ponto por palavra, cheio no que
          ela já viu. Números seriam leitura; bolinhas, não. */}
      <div className="flex justify-center gap-2" role="presentation">
        {gallery.words.map((w, i) => (
          <span
            key={w.en}
            className={`h-2.5 rounded-full transition-all ${
              i === index ? "w-8 bg-accent-500" : i < index ? "w-2.5 bg-white/70" : "w-2.5 bg-white/25"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 rounded-[1.75rem] bg-white p-6 text-center shadow-2xl sm:p-8">
        <QuizImage
          src={word.image}
          alt=""
          word={word.pt}
          priority
          className="mx-auto h-56 w-auto object-contain sm:h-64"
        />

        <p className="mt-5 text-4xl font-extrabold text-deep-900 sm:text-5xl">{word.en}</p>
        <p className="mt-1 text-lg text-ink-500">{word.pt}</p>

        <button
          type="button"
          onClick={speak}
          aria-label={`Ouvir ${word.en} de novo`}
          className="mt-5 inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-50 px-6 py-3
                     text-lg font-bold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          <SpeakerIcon className="size-6" />
          Ouvir de novo
        </button>
      </div>

      {/* Voltar à esquerda, seguir à direita — a mesma mão que a história usa. */}
      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm
                     font-bold text-blue-100 transition hover:bg-white/10 disabled:invisible
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ArrowLeftIcon className="size-4" />
          Voltar
        </button>

        {isLast ? (
          <Link
            href={quizHref}
            className="animate-cta-call inline-flex items-center gap-3 rounded-full bg-accent-500 px-8 py-4
                       text-xl font-extrabold text-white shadow-2xl shadow-black/30 transition
                       hover:bg-accent-600 focus-visible:outline-4 focus-visible:outline-offset-4
                       focus-visible:outline-white"
          >
            <PlayIcon className="size-6" />
            Agora é a sua vez!
          </Link>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
            className="inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-8 py-4 text-xl
                       font-extrabold text-white shadow-lg shadow-black/20 transition hover:bg-accent-600
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Próxima
            <ArrowRightIcon className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
