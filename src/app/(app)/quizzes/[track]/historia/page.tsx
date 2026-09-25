import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { ReviewIntro } from "@/components/quiz/review-intro";
import { StoryPlayer } from "@/components/quiz/story-player";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";
import { quizForTrack } from "@/lib/quiz/catalog";
import { isReviewPhase, storyForTrack } from "@/lib/quiz/stories";
import { trackBySlug } from "@/lib/tracks";

export const metadata: Metadata = { title: "História — eProf Línguas" };

/**
 * A história que abre a trilha.
 *
 * Trilha sem história manda o aluno direto para a fase 1 — não existe tela
 * vazia nem ramo especial em quem chama.
 */
export default async function HistoriaPage({
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

  const phase = Number(fase) >= 1 ? Number(fase) : 1;
  const quizHref = `/quizzes/${slug}?fase=${phase}`;
  const story = storyForTrack(slug, phase);
  const revisao = isReviewPhase(slug, phase);

  if (!story && !revisao) redirect(quizHref);

  // Centralizado na vertical: o cartão é o único elemento da tela, e encostado
  // no topo ele deixava metade dela vazia.
  return (
    <div className="relative isolate flex min-h-[calc(100vh-5rem)] items-center justify-center px-5 py-10">
      <WelcomeBackdrop />

      {story ? (
        <StoryPlayer story={story} quizHref={quizHref} />
      ) : (
        <ReviewIntro
          questions={quizForTrack(slug, phase).questions.length}
          quizHref={quizHref}
        />
      )}
    </div>
  );
}
