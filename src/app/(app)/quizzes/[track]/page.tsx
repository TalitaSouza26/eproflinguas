import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { GREETINGS_QUIZ } from "@/lib/quiz/greetings";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { CURRENT_PHASE, trackBySlug, trackContextLine } from "@/lib/tracks";

export const metadata: Metadata = { title: "Quiz — eProf Línguas" };

export default async function QuizPage({
  params,
  searchParams,
}: {
  params: Promise<{ track: string }>;
  searchParams: Promise<{ fase?: string }>;
}) {
  const { track: slug } = await params;
  const { fase } = await searchParams;
  const track = trackBySlug(slug);

  if (!track) notFound();

  // `?fase=N` abre uma fase específica — é assim que a tela de boas-vindas
  // manda o recém-chegado para a fase 1. Sem o parâmetro, vale onde o aluno
  // parou.
  const asked = Number(fase);
  const phase =
    Number.isInteger(asked) && asked >= 1 && asked <= track.phases ? asked : CURRENT_PHASE;

  // A trilha de entrada tem questões próprias; as outras ainda dividem o
  // mesmo quiz de vocabulário.
  // TODO: com banco, todas vêm do léxico da trilha e da fase (docs/curriculo.md).
  const quiz = slug === GREETINGS_QUIZ.slug ? GREETINGS_QUIZ : SEED_QUIZ;

  return (
    <QuizPlayer
      trackTitle={track.title}
      phase={phase}
      phases={track.phases}
      context={trackContextLine(track, phase)}
      questions={quiz.questions}
    />
  );
}
