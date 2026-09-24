import Image from "next/image";
import { startJourney } from "@/app/bem-vindo/actions";
import { SpeakButton } from "@/components/quiz/speak-button";
import { HeartIcon, PlayIcon } from "@/components/ui/icons";
import { quizForTrack } from "@/lib/quiz/catalog";
import { storyForTrack } from "@/lib/quiz/stories";
import { CURRENT_TRACK } from "@/lib/tracks";

export const WELCOME_LINE = "Oi! Eu sou o Bubo. Vamos aprender juntos?";

/**
 * O Bubo se apresenta.
 *
 * Aparece em toda porta de entrada do estudo de quem é novo — na primeira
 * abertura do app, no "Começar agora" da Home e no Quizzes do menu —, porque
 * nenhuma delas pode largar uma criança de 6 anos direto numa questão.
 *
 * A tela diz o nome da trilha, quantas perguntas vêm e que dá para errar sem
 * problema. Nada disso é para a criança, que ainda não lê: é para o adulto ao
 * lado, que precisa saber em quanto tempo isso acaba. Para ela vale o Bubo, o
 * botão de ouvir e o botão grande.
 */
export function BuboWelcome() {
  const questions = quizForTrack(CURRENT_TRACK.slug).questions.length;
  const hasStory = Boolean(storyForTrack(CURRENT_TRACK.slug));

  return (
    <div className="relative z-10 w-full max-w-5xl">
      <header className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200 sm:text-sm">
          Minha primeira trilha
        </p>
        <h1 className="mt-2 text-4xl font-extrabold leading-tight text-white drop-shadow sm:text-5xl">
          {CURRENT_TRACK.title}
        </h1>
      </header>

      <div className="mt-2 grid items-center gap-2 sm:mt-4 sm:grid-cols-[1.15fr_1fr] sm:gap-0">
        <Image
          src="/bubo/bubo-boas-vindas.webp"
          alt=""
          width={346}
          height={539}
          unoptimized
          priority
          className="animate-rise-in mx-auto h-72 w-auto drop-shadow-2xl sm:h-[30rem] lg:h-[34rem]"
        />

        {/* A fala encosta no Bubo: o recorte tem ar sobrando dos dois lados,
            então sem a margem negativa o rabicho ficaria apontando para o vazio. */}
        <div className="animate-rise-in sm:-ml-10 lg:-ml-14" style={{ animationDelay: "120ms" }}>
          {/* A fala sai na direção do Bubo: no empilhado o rabicho aponta para
              cima, e a partir de sm ele vira para a esquerda. */}
          <div className="relative rounded-3xl bg-white px-6 py-6 text-center shadow-2xl">
            <span
              aria-hidden
              className="absolute -top-2.5 left-1/2 size-5 -translate-x-1/2 rotate-45 rounded-sm bg-white
                         sm:-left-2 sm:top-[42%] sm:translate-x-0"
            />

            <p className="text-2xl font-extrabold leading-snug text-deep-900 sm:text-3xl">
              Oi! Eu sou o Bubo.
              <br />
              Vamos aprender juntos?
            </p>

            <SpeakButton
              text={WELCOME_LINE}
              label="Ouvir o Bubo"
              iconClassName="size-6"
              className="mt-4 gap-2.5 rounded-full bg-blue-50 px-6 py-3 text-lg font-bold text-blue-700
                         hover:bg-blue-100 focus-visible:outline-blue-500"
            >
              Ouvir
            </SpeakButton>
          </div>

          <form action={startJourney} className="mt-6 text-center">
            <button
              type="submit"
              className="animate-cta-call inline-flex w-full items-center justify-center gap-3 rounded-full
                         bg-accent-500 px-10 py-5 text-2xl font-extrabold text-white shadow-2xl
                         shadow-black/30 transition hover:bg-accent-600 focus-visible:outline-4
                         focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto sm:px-14"
            >
              <PlayIcon className="size-7" />
              Vamos começar
            </button>

            <p className="mt-3 text-sm font-semibold text-blue-100">
              {hasStory && (
                <>
                  História <span className="px-1 text-blue-300">+</span>
                </>
              )}
              {questions} perguntas <span className="px-1 text-blue-300">•</span> No seu ritmo
            </p>
          </form>
        </div>
      </div>

      {/* A promessa que tira o medo de errar, e que o quiz cumpre: nenhuma
          questão pune, e dá para refazer a fase quantas vezes quiser. */}
      <p className="mt-6 flex flex-col items-center gap-1.5 text-center text-sm italic text-blue-100">
        <HeartIcon className="size-6 not-italic" />
        Pode tentar de novo. Eu te ajudo!
      </p>
    </div>
  );
}
