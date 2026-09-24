import type { Metadata } from "next";
import Image from "next/image";
import { BuboWelcome } from "@/components/quiz/bubo-welcome";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";

export const metadata: Metadata = { title: "Oi! — eProf Línguas" };

/**
 * A primeira tela da vida do aluno.
 *
 * Sem menu, sem trilhas, sem progresso: uma criança de 6 anos ainda está sendo
 * alfabetizada e não lê nada disso. O que existe aqui é o Bubo, uma frase e um
 * botão — um caminho só, e ele já está aberto.
 */
export default function BemVindoPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center gap-6
                     bg-gradient-to-b from-[#1c49cc] via-[#143a9e] to-[#0e2a72] px-5 py-10">
      <WelcomeBackdrop />

      <Image
        src="/brand/logo-linguas-azul.webp"
        alt="eProf Línguas"
        width={700}
        height={264}
        priority
        className="h-auto w-40 opacity-90"
      />

      <BuboWelcome />
    </main>
  );
}
