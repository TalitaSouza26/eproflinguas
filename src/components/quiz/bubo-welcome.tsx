import Image from "next/image";
import { startJourney } from "@/app/bem-vindo/actions";
import { SpeakButton } from "@/components/quiz/speak-button";
import { PlayIcon } from "@/components/ui/icons";

export const WELCOME_LINE = "Oi! Eu sou o Bubo. Vamos aprender inglês?";

/**
 * O Bubo se apresenta.
 *
 * Aparece em toda porta de entrada do estudo de quem é novo — na primeira
 * abertura do app, no "Começar agora" da Home e no Quizzes do menu —, porque
 * nenhuma delas pode largar uma criança de 6 anos direto numa questão.
 *
 * A frase tem botão de ouvir do lado: ela ainda está sendo alfabetizada e não
 * lê nada disso.
 */
export function BuboWelcome() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      {/* A fala vem antes do mascote: é ela que abre a conversa. */}
      <div className="animate-rise-in relative max-w-md rounded-3xl bg-white px-6 py-5 shadow-2xl">
        <div className="flex items-center gap-4">
          <p className="text-2xl font-extrabold leading-snug text-deep-900 sm:text-[28px]">
            Oi! Eu sou o Bubo.
            <br />
            Vamos aprender inglês?
          </p>

          <SpeakButton
            text={WELCOME_LINE}
            label="Ouvir o Bubo"
            className="size-14 shrink-0 bg-blue-50 text-blue-600 hover:bg-blue-100
                       focus-visible:outline-blue-500"
          />
        </div>

        {/* Rabicho da bolha, apontando para o Bubo. */}
        <span
          aria-hidden
          className="absolute -bottom-2.5 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-sm bg-white"
        />
      </div>

      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="animate-patente-glow absolute size-52 rounded-full bg-accent-500/40 blur-3xl"
        />
        <Image
          src="/bubo/bubo-falando.webp"
          alt=""
          width={1122}
          height={1402}
          unoptimized
          priority
          className="animate-rise-in relative h-64 w-auto drop-shadow-2xl sm:h-72"
          style={{ animationDelay: "180ms" }}
        />
      </div>

      {/* Um botão só, do tamanho de uma mão pequena. */}
      <form action={startJourney}>
        <button
          type="submit"
          className="animate-cta-call inline-flex items-center gap-3 rounded-full bg-accent-500 px-12 py-5
                     text-2xl font-extrabold text-white shadow-2xl shadow-black/30 transition
                     hover:bg-accent-600 focus-visible:outline-4 focus-visible:outline-offset-4
                     focus-visible:outline-white"
        >
          <PlayIcon className="size-7" />
          Começar
        </button>
      </form>
    </div>
  );
}
