import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { GREETINGS_QUIZ } from "@/lib/quiz/greetings";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { CURRENT_PHASE, trackBySlug, trackContextLine } from "@/lib/tracks";

export const metadata: Metadata = { title: "Quiz — eProf Línguas" };

export default async function QuizPage({ params }: { params: Promise<{ track: string }> }) {
  const { track: slug } = await params;
  const track = trackBySlug(slug);

  if (!track) notFound();

  // A trilha de entrada tem questões próprias; as outras ainda dividem o
  // mesmo quiz de vocabulário.
  // TODO: com banco, todas vêm do léxico da trilha e da fase (docs/curriculo.md).
  const quiz = slug === GREETINGS_QUIZ.slug ? GREETINGS_QUIZ : SEED_QUIZ;

  return (
    <QuizPlayer
      trackTitle={track.title}
      phase={CURRENT_PHASE}
      phases={track.phases}
      context={trackContextLine(track)}
      questions={quiz.questions}
    />
  );
}
