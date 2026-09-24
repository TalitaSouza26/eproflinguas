import type { Metadata } from "next";
import Image from "next/image";
import { startJourney } from "@/app/bem-vindo/actions";
import { PlayIcon } from "@/components/ui/icons";

export const metadata: Metadata = { title: "Oi! — eProf Línguas" };

/**
 * A primeira tela da vida do aluno.
 *
 * Sem menu, sem trilhas, sem progresso: uma criança de 6 anos ainda está sendo
 * alfabetizada e não lê nada disso. O que existe aqui é o Bubo, uma frase e um
 * botão — um caminho só, e ele já está aberto.
 *
 * TODO: a fala precisa ser ouvida, não lida. O áudio entra aqui primeiro.
 */
export default function BemVindoPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-b
                     from-[#1c49cc] via-[#143a9e] to-[#0e2a72] px-5 py-10 text-center">
      <Image
        src="/brand/logo-linguas-azul.webp"
        alt="eProf Línguas"
        width={700}
        height={264}
        priority
        className="h-auto w-40 opacity-90"
      />

      {/* A fala vem antes do mascote: é ela que abre a conversa. */}
      <div className="animate-rise-in relative max-w-md rounded-3xl bg-white px-6 py-5 shadow-2xl">
        <p className="text-2xl font-extrabold leading-snug text-deep-900 sm:text-[28px]">
          Oi! Eu sou o Bubo.
          <br />
          Vamos aprender inglês?
        </p>

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
    </main>
  );
}
