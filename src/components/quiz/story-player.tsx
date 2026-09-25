"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  PlayIcon,
} from "@/components/ui/icons";
import { partsInTrack, phrasesInStory, type Story } from "@/lib/quiz/stories";

/**
 * Moldura das ilustrações.
 *
 * Proporção fixa e `object-contain`: a arte entra inteira, nunca cortada, e
 * todos os cartões ficam com a mesma altura de imagem. As artes são 16:9, com
 * uma exceção mais larga que recebe uma faixa de fundo em vez de perder as
 * beiradas — que é onde estão as crianças.
 */
const MOLDURA =
  "relative aspect-[16/9] w-full overflow-hidden rounded-[1.4rem] bg-blue-50";

const TAMANHO = "(min-width: 1024px) 40rem, (min-width: 640px) 60vw, 100vw";

const CTA =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 px-7 py-4 text-lg font-extrabold " +
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
 * História de abertura da trilha, para ler.
 *
 * Não tem áudio. A narração era falada pelo sintetizador do navegador, que
 * erra a prosódia do inglês infantil e muda de voz a cada sistema — para uma
 * história inteira isso pesa mais do que ajuda. Sai daqui até haver voz
 * gravada; o que continua falando é a palavra nova, na galeria e no quiz.
 *
 * Cada cena espera o toque do aluno. Nada avança sozinho: quem lê devagar
 * precisa do tempo dele.
 *
 * A cena de ensino pedia "repita comigo" e o botão respondia "eu falei". Saiu
 * junto com o áudio: sem ouvir, a criança de 6 anos não tinha de onde tirar a
 * pronúncia — o pedido virava uma cobrança sem resposta. Repetir em voz alta
 * volta quando houver voz gravada.
 */
export function StoryPlayer({
  story,
  quizHref,
}: {
  story: Story;
  quizHref: string;
}) {
  // -1 é a capa; story.beats.length é o fim.
  const [index, setIndex] = useState(-1);
  const total = story.beats.length;
  const phrases = phrasesInStory(story);
  const parts = partsInTrack(story.slug);
  const beat = index >= 0 && index < total ? story.beats[index] : undefined;

  const next = useCallback(() => setIndex((i) => i + 1), []);
  const back = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  return (
    <div
      className={`relative z-10 flex w-full flex-col items-center gap-6 text-center ${
        index === -1 ? "max-w-4xl" : "max-w-2xl"
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
              <div className={MOLDURA}>
                <Image
                  src={story.cover}
                  alt=""
                  fill
                  priority
                  sizes={TAMANHO}
                  className="object-contain"
                />
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 text-left sm:py-8 sm:pl-4 sm:pr-8">
              {/* A história é uma só; o que muda é a parte. */}
              <p className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-blue-700">
                Parte {story.part} de {parts}
              </p>

              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-deep-900 sm:text-4xl">
                {story.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-ink-700">
                {story.subtitle}
              </p>

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
                  i === index
                    ? "w-6 bg-accent-500"
                    : i < index
                      ? "w-1.5 bg-white/70"
                      : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>

          <div className="relative w-full overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            {beat.kind === "narration" && beat.image && (
              <div className="p-3 pb-0 sm:p-4 sm:pb-0">
                <div className={MOLDURA}>
                  <Image
                    src={beat.image}
                    alt=""
                    fill
                    priority
                    sizes={TAMANHO}
                    className="object-contain"
                  />
                </div>
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

                  <p className="px-4 py-2 text-4xl font-extrabold text-deep-900 sm:text-5xl">
                    {beat.word}
                  </p>

                  <p className="text-lg text-ink-700">
                    quer dizer{" "}
                    <span className="font-bold text-deep-900">
                      {beat.meaning}
                    </span>
                  </p>
                </div>
              )}

              {/* Voltar e seguir. Nenhum dos dois troca de rótulo no meio da
                cena, então o card não muda de altura enquanto se lê. */}
              <div className="mt-7 flex flex-nowrap items-center justify-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={back}
                  disabled={index === 0}
                  aria-label="Voltar para a cena anterior"
                  className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full bg-ink-50
                           px-4 py-3.5 text-base font-bold text-ink-700 transition hover:bg-ink-100
                           disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2
                           focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:px-5"
                >
                  <ArrowLeftIcon className="size-5" />
                  Voltar
                </button>

                <button
                  type="button"
                  onClick={next}
                  className={`${CTA} shrink-0 whitespace-nowrap`}
                >
                  Continuar
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
            src="/bubo/bubo-sua-vez.webp"
            alt=""
            width={890}
            height={1206}
            unoptimized
            className="animate-rise-in h-72 w-auto drop-shadow-2xl sm:h-[26rem]"
          />
          <p className="animate-rise-in text-3xl font-extrabold text-white sm:text-4xl">
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
