import { redirect } from "next/navigation";
import { BuboWelcome } from "@/components/quiz/bubo-welcome";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";
import { phaseHref, studentProgress } from "@/lib/student";

/**
 * Entrada de estudo pelo menu.
 *
 * Quem já estudou vai direto para onde parou — não existe lista de quizzes, e
 * cair numa tela vazia seria pior. Quem é novo encontra o Bubo primeiro: a
 * criança precisa ser recebida antes de ver uma pergunta.
 *
 * TODO: quando houver escolha de trilha, esta rota vira a listagem.
 */
export default async function QuizzesPage() {
  const { current, phase, isNew } = await studentProgress();

  if (!isNew) redirect(phaseHref(current.slug, phase));

  return (
    <div className="relative isolate flex flex-1 items-center justify-center px-5 py-10">
      <WelcomeBackdrop />
      <BuboWelcome />
    </div>
  );
}
