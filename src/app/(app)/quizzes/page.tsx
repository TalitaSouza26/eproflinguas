import { redirect } from "next/navigation";
import { CURRENT_TRACK } from "@/lib/tracks";

/**
 * Não existe lista de quizzes ainda: a entrada do menu leva direto ao quiz
 * atual do aluno, para nunca cair numa tela vazia.
 *
 * TODO: quando houver trilhas de verdade, esta rota vira a listagem e o
 * "Voltar" do quiz deve apontar para cá de novo.
 */
export default function QuizzesPage() {
  redirect(`/quizzes/${CURRENT_TRACK.slug}`);
}
