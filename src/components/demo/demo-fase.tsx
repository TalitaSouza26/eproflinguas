"use client";

import Link from "next/link";
import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { palavrasProntas, perguntasDa } from "@/lib/demo/trilha";
import { useDemoTrilha } from "@/lib/demo/use-demo-trilha";
import type { Gallery } from "@/lib/quiz/galeria";

/**
 * A trilha de demonstração rodando na tela do aluno.
 *
 * Usa os players de verdade — os mesmos componentes da galeria e do quiz do
 * produto. Uma imitação mentiria justamente sobre o que se quer conferir: se
 * o conteúdo montado no admin funciona de fato ali dentro.
 *
 * Fica num componente de navegador porque a trilha vive no `sessionStorage`:
 * o servidor não tem como saber que ela existe.
 */
export function DemoFase({ etapa }: { etapa: "galeria" | "quiz" }) {
  const trilha = useDemoTrilha();

  if (!trilha) {
    return (
      <div className="relative z-10 mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
        <h1 className="text-2xl font-extrabold text-deep-900">Nenhuma trilha de demonstração</h1>
        <p className="mt-2 text-ink-700">
          Ela vive só na aba em que foi montada. Se você recarregou numa aba nova ou
          fechou a anterior, é preciso montar de novo.
        </p>
        <Link
          href="/admin"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-accent-500 px-7 py-3.5
                     text-lg font-extrabold text-white transition hover:bg-accent-600
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Montar trilha
        </Link>
      </div>
    );
  }

  const palavras = palavrasProntas(trilha);

  if (etapa === "galeria") {
    const galeria: Gallery = {
      slug: "demo",
      phase: 1,
      title: trilha.nome,
      track: "Demonstração",
      words: palavras.map((p) => ({ en: p.en, pt: p.pt, image: p.imagem ?? "" })),
    };
    return <GalleryPlayer gallery={galeria} quizHref="/quizzes/demo/quiz" />;
  }

  return (
    <QuizPlayer
      trackSlug="demo"
      trackTitle={trilha.nome}
      phase={1}
      phases={1}
      context="Trilha de demonstração."
      questions={perguntasDa(trilha)}
    />
  );
}
