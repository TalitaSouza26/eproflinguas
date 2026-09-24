"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, PlayIcon, SpeakerIcon } from "@/components/ui/icons";
import { cancelSpeech, speakParts, splitBilingual } from "@/lib/speech";
import type { Story } from "@/lib/quiz/stories";

const CTA =
  "inline-flex items-center justify-center gap-3 rounded-full bg-accent-500 px-10 py-4 text-xl font-extrabold " +
  "text-white shadow-2xl shadow-black/30 transition hover:bg-accent-600 focus-visible:outline-4 " +
  "focus-visible:outline-offset-4 focus-visible:outline-white";

/** Pinta em laranja os trechos que estão em inglês. */
function Narration({ text }: { text: string }) {
  return (
    <p className="text-xl font-semibold leading-relaxed text-deep-900 sm:text-2xl sm:leading-relaxed">
      {text.split(/\*([^*]+)\*/g).map((piece, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-extrabold text-accent-600">
            {piece}
          </strong>
        ) : (
          piece
        ),
      )}
    </p>
  );
}

/**
 * História de abertura da trilha.
 *
 * Começa numa capa com um botão, e não tocando sozinha: o navegador bloqueia
 * áudio antes do primeiro toque, e som que começa sem aviso assusta quem está
 * com o aparelho no colo. Desse toque em diante tudo é automático.
 *
 * A cena narrada avança sozinha quando a fala termina. A de ensino não avança:
 * ela espera a criança repetir em voz alta, e só o toque dela segue.
 */
export function StoryPlayer({ story, quizHref }: { story: Story; quizHref: string }) {
  // -1 é a capa; story.beats.length é o fim.
  const [index, setIndex] = useState(-1);
  const total = story.beats.length;
  const beat = index >= 0 && index < total ? story.beats[index] : undefined;

  const next = useCallback(() => setIndex((i) => i + 1), []);

  // Cada cena fala ao entrar. A narrada segue sozinha no fim da fala; a de
  // ensino fica esperando, porque é a vez da criança.
  useEffect(() => {
    if (!beat) return;

    const parts =
      beat.kind === "narration"
        ? splitBilingual(beat.text)
        : [{ text: beat.word, lang: "en-US" as const }];

    return speakParts(parts, beat.kind === "narration" ? next : undefined);
  }, [beat, next]);

  useEffect(() => cancelSpeech, []);

  function repeatWord(word: string) {
    speakParts([{ text: word, lang: "en-US" }]);
  }

  return (
    <div className="relative z-10 flex w-full max-w-xl flex-col items-center gap-6 text-center">
      {/* Capa: o único toque que a história pede antes de tocar. */}
      {index === -1 && (
        <>
          <Image
            src="/bubo/bubo-boas-vindas.webp"
            alt=""
            width={346}
            height={539}
            unoptimized
            priority
            className="animate-rise-in h-56 w-auto drop-shadow-2xl"
          />

          <div className="animate-rise-in" style={{ animationDelay: "120ms" }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">História</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">{story.title}</h1>
            <p className="mt-2 text-base text-blue-100">{story.subtitle}</p>
          </div>

          <button type="button" onClick={next} className={`${CTA} animate-cta-call`}>
            <PlayIcon className="size-6" />
            Ouvir a história
          </button>
        </>
      )}

      {beat && (
        <>
          {/* Onde a história está, sem número: bolinhas bastam para quem não lê. */}
          <div className="flex items-center gap-1.5">
            {story.beats.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-accent-500" : i < index ? "w-1.5 bg-white/70" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          <div className="w-full rounded-3xl bg-white px-6 py-8 shadow-2xl sm:px-10">
            {beat.kind === "narration" ? (
              <Narration text={beat.text} />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
                  Palavra nova
                </p>

                <button
                  type="button"
                  onClick={() => repeatWord(beat.word)}
                  aria-label={`Ouvir ${beat.word} de novo`}
                  className="flex items-center gap-3 rounded-2xl px-4 py-2 text-4xl font-extrabold
                             text-deep-900 transition hover:bg-blue-50 focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:text-5xl"
                >
                  {beat.word}
                  <SpeakerIcon className="size-8 text-blue-600" />
                </button>

                <p className="text-lg text-ink-700">
                  quer dizer <span className="font-bold text-deep-900">{beat.meaning}</span>
                </p>

                <p className="mt-2 text-base font-bold text-accent-600">Repita comigo!</p>
              </div>
            )}
          </div>

          {/* A cena narrada anda sozinha; o botão fica para quem quiser passar
              antes, e é o único caminho na cena de ensino. */}
          <button type="button" onClick={next} className={CTA}>
            {beat.kind === "lesson" ? "Eu falei!" : "Continuar"}
            <ArrowRightIcon className="size-5" />
          </button>
        </>
      )}

      {index >= total && (
        <>
          <Image
            src="/bubo/bubo-boas-vindas.webp"
            alt=""
            width={346}
            height={539}
            unoptimized
            className="animate-rise-in h-56 w-auto drop-shadow-2xl"
          />
          <p className="animate-rise-in text-2xl font-extrabold text-white sm:text-3xl">
            Agora é a sua vez!
          </p>
          <Link href={quizHref} className={`${CTA} animate-cta-call`}>
            Começar o quiz
            <ArrowRightIcon className="size-5" />
          </Link>
        </>
      )}

      {/* Pular fica pequeno e por último: existe para quem já ouviu, não é o
          caminho que a tela sugere. */}
      {index < total && (
        <Link
          href={quizHref}
          className="text-sm font-semibold text-blue-200 underline-offset-4 transition hover:text-white
                     hover:underline focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Pular a história
        </Link>
      )}
    </div>
  );
}
