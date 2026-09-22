import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { CURRENT_PHASE, trackBySlug, trackContextLine } from "@/lib/tracks";

export const metadata: Metadata = { title: "Quiz — eProf Línguas" };

export default async function QuizPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const track = trackBySlug(slug);

  if (!track) notFound();

  // TODO: as questões ainda são as mesmas para toda trilha. Quando a geração
  // por IA entrar, elas virão do léxico da trilha e da fase (docs/curriculo.md).
  return (
    <QuizPlayer
      trackTitle={track.title}
      phase={CURRENT_PHASE}
      phases={track.phases}
      context={trackContextLine(track)}
      questions={SEED_QUIZ.questions}
    />
  );
}
