import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";
import { galleryFor } from "@/lib/quiz/galeria";
import { trackBySlug } from "@/lib/tracks";

export const metadata: Metadata = { title: "Olha e escuta — eProf Línguas" };

/**
 * A galeria que abre uma fase sem história.
 *
 * Mesma forma da rota da história: fase sem galeria manda direto para o quiz,
 * em vez de mostrar uma tela vazia ou obrigar quem chama a saber a diferença.
 */
export default async function GaleriaPage({
  params,
  searchParams,
}: {
  params: Promise<{ track: string }>;
  searchParams: Promise<{ fase?: string }>;
}) {
  const { track: slug } = await params;
  const { fase } = await searchParams;

  if (!trackBySlug(slug)) notFound();

  const phase = Number(fase) >= 1 ? Number(fase) : 1;
  const quizHref = `/quizzes/${slug}?fase=${phase}`;
  const gallery = galleryFor(slug, phase);

  if (!gallery) redirect(quizHref);

  return (
    <div className="relative isolate flex flex-1 items-center justify-center px-5 py-10">
      <WelcomeBackdrop />
      <GalleryPlayer gallery={gallery} quizHref={quizHref} />
    </div>
  );
}
