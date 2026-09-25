"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  PauseIcon,
  PlayIcon,
  ReplayIcon,
  SpeakerIcon,
} from "@/components/ui/icons";
import { cancelSpeech, speakParts, splitBilingual, togglePause } from "@/lib/speech";
import { phrasesInStory, type Story } from "@/lib/quiz/stories";

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
          <strong
            key={i}
            className="mx-0.5 inline-block rounded-xl bg-blue-100 px-2.5 py-0.5 font-extrabold text-blue-800"
          >
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
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = story.beats.length;
  const phrases = phrasesInStory(story);
  const beat = index >= 0 && index < total ? story.beats[index] : undefined;

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  // A palavra sai sem as reticências: o sintetizador lê "My name is…" como
  // uma frase interrompida.
  const spoken = (word: string) => word.replace(/…/g, "");

  const partsFor = useCallback(
    (b: NonNullable<typeof beat>) =>
      b.kind === "narration"
        ? splitBilingual(b.text)
        : // O convite vem falado, e não só escrito na tela: é a criança que
          // ainda não lê que mais precisa saber que agora é a vez dela.
          [
            { text: "Repita comigo:", lang: "pt-BR" as const },
            { text: spoken(b.word), lang: "en-US" as const },
          ],
    [],
  );

  // Cada cena fala ao entrar e depois espera. Avançar é sempre do aluno: um
  // avanço automático tiraria dele o "ouvir de novo", que é o botão que mais
  // importa para quem ainda está pegando o som das palavras.
  useEffect(() => {
    if (!beat) return;

    setPlaying(true);
    setPaused(false);
    const stop = speakParts(partsFor(beat), () => setPlaying(false));

    return () => {
      stop();
      setPlaying(false);
    };
  }, [beat, partsFor]);

  /** Um botão só para as três situações: tocando, pausado e parado. */
  function playPause() {
    if (!beat) return;

    if (playing) {
      setPaused(togglePause());
      return;
    }

    setPlaying(true);
    setPaused(false);
    speakParts(partsFor(beat), () => setPlaying(false));
  }

  useEffect(() => cancelSpeech, []);

  return (
    <div
      className={`relative z-10 flex w-full flex-col items-center gap-6 text-center ${
        index === -1 ? "max-w-4xl" : "max-w-xl"
      }`}
    >
      {/* Capa: um cartão com a cena e o convite. É o único toque que a
          história pede antes de tocar — daí em diante ela anda sozinha. */}
      {index === -1 && (
        <div className="relative w-full">
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-2xl sm:grid-cols-[1.15fr_1fr]">
            {/* A cena fica emoldurada, com o branco do cartão em volta — ela
                não encosta na borda nem é cortada pelo canto arredondado. */}
            <div className="p-3 sm:p-4">
              <Image
                src={story.cover}
                alt=""
                width={1672}
                height={941}
                priority
                className="h-44 w-full rounded-[1.4rem] object-cover sm:h-full"
              />
            </div>

            <div className="px-6 pb-6 pt-2 text-left sm:py-8 sm:pl-4 sm:pr-8">
              <p className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                História {story.number}
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-deep-900 sm:text-4xl">
                {story.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-ink-700">{story.subtitle}</p>

              {/* O que a criança leva daqui, contado pelas próprias cenas de
                  ensino em vez de escrito à mão. */}
              <p className="mt-5 inline-flex items-center gap-2.5 rounded-2xl bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700">
                <BookIcon className="size-5" />
                {phrases} frases em inglês
              </p>

              <button
                type="button"
                onClick={next}
                className={`${CTA} animate-cta-call mt-5 w-full`}
              >
                <PlayIcon className="size-6" />
                Começar a história
              </button>
            </div>
          </div>

          {/* O Bubo espia do canto: quem conta a história é ele, mas a cena é
              da Sofia e do Ethan. */}
          <Image
            src="/bubo/bubo-leitura-oculos.webp"
            alt=""
            width={947}
            height={1181}
            unoptimized
            className="pointer-events-none absolute -bottom-10 -left-12 hidden h-36 w-auto drop-shadow-2xl sm:block lg:-bottom-12 lg:-left-20 lg:h-48"
          />
        </div>
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

          <div className="relative w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            {beat.kind === "narration" && beat.image && (
              <div className="p-3 pb-0 sm:p-4 sm:pb-0">
                <Image
                  src={beat.image}
                  alt=""
                  width={2000}
                  height={727}
                  priority
                  className="h-44 w-full rounded-[1.4rem] object-cover sm:h-56"
                />
              </div>
            )}

            <div className="px-6 py-7 sm:px-10">
            {beat.kind === "narration" ? (
              <Narration text={beat.text} />
            ) : (
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent-600">
                  Palavra nova
                </p>

                <button
                  type="button"
                  onClick={() => speakParts([{ text: spoken(beat.word), lang: "en-US" }])}
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

            {/* Voltar, ouvir e seguir — nessa ordem, que é a do tempo: a cena
                que passou, a que está tocando, a próxima. */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={back}
                disabled={index === 0}
                aria-label="Voltar para a cena anterior"
                className="inline-flex items-center gap-2 rounded-full bg-ink-50 px-5 py-3.5 text-base
                           font-bold text-ink-700 transition hover:bg-ink-100 disabled:cursor-not-allowed
                           disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-blue-500"
              >
                <ArrowLeftIcon className="size-5" />
                Voltar
              </button>

              <button
                type="button"
                onClick={playPause}
                className="inline-flex items-center gap-2.5 rounded-full bg-blue-50 px-6 py-3.5 text-base
                           font-bold text-blue-700 transition hover:bg-blue-100 focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                {playing && !paused ? (
                  <>
                    <PauseIcon className="size-5" />
                    Pausar
                  </>
                ) : (
                  <>
                    <ReplayIcon className="size-5" />
                    {paused ? "Retomar" : "Ouvir de novo"}
                  </>
                )}
              </button>

              <button type="button" onClick={next} className={CTA}>
                {beat.kind === "lesson" ? "Eu falei!" : "Continuar"}
                <ArrowRightIcon className="size-5" />
              </button>
            </div>
            </div>
          </div>
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
