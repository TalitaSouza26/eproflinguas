import { redirect } from "next/navigation";
import { BuboWelcome } from "@/components/quiz/bubo-welcome";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";
import { CURRENT_TRACK, IS_NEW_STUDENT } from "@/lib/tracks";

/**
 * Entrada de estudo pelo menu.
 *
 * Quem já estudou vai direto para onde parou — não existe lista de quizzes, e
 * cair numa tela vazia seria pior. Quem é novo encontra o Bubo primeiro: a
 * criança precisa ser recebida antes de ver uma pergunta.
 *
 * TODO: quando houver escolha de trilha, esta rota vira a listagem.
 */
export default function QuizzesPage() {
  if (!IS_NEW_STUDENT) redirect(`/quizzes/${CURRENT_TRACK.slug}`);

  return (
    <div className="relative isolate flex min-h-[calc(100vh-5rem)] justify-center px-5 pb-10 pt-6 sm:pt-8">
      <WelcomeBackdrop />
      <BuboWelcome />
    </div>
  );
}
