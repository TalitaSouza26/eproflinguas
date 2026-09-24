import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { quizForTrack } from "@/lib/quiz/catalog";
import { studentProgress } from "@/lib/student";
import { trackBySlug, trackContextLine } from "@/lib/tracks";

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
  const { tracks, phase: currentPhase } = await studentProgress();
  const done = tracks.find((t) => t.slug === slug)?.completedPhases ?? 0;

  const asked = Number(fase);
  const valid = Number.isInteger(asked) && asked >= 1 && asked <= track.phases;
  const phase = valid ? asked : currentPhase;

  const quiz = quizForTrack(slug, phase);

  return (
    <QuizPlayer
      trackSlug={track.slug}
      trackTitle={track.title}
      phase={phase}
      phases={track.phases}
      context={trackContextLine(track, phase, done)}
      questions={quiz.questions}
    />
  );
}
