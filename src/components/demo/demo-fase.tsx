"use client";

import Link from "next/link";
import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { ReviewIntro } from "@/components/quiz/review-intro";
import { StoryPlayer } from "@/components/quiz/story-player";
import {
  aberturaEhGaleria,
  acharPalavra,
  acharTrilha,
  cardsOrdenados,
  faseCompleta,
  faseTemAbertura,
  fasesDaTrilha,
  perguntasParaOQuiz,
} from "@/lib/demo/banco";
import { useBanco } from "@/lib/demo/use-banco";
import type { Gallery } from "@/lib/quiz/galeria";
import type { Story, StoryBeat } from "@/lib/quiz/stories";

/**
 * Uma fase montada no admin, rodando na tela do aluno.
 *
 * Usa os players de verdade — galeria, história, revisão e quiz são os mesmos
 * componentes do produto. Uma imitação mentiria justamente sobre o que se
 * quer conferir: se o conteúdo montado funciona de fato ali dentro.
 *
 * Fica num componente de navegador porque o conteúdo vive no
 * `sessionStorage`: o servidor não tem como saber que ele existe.
 */
export function DemoFase({
  etapa,
  trilhaId,
  fase,
}: {
  etapa: "abertura" | "quiz";
  trilhaId: string;
  fase: number;
}) {
  const banco = useBanco();
  const trilha = acharTrilha(banco, trilhaId);

  if (!banco || !trilha) return <SemTrilha />;

  // Só as fases que rendem pergunta. Uma fase recém-criada no admin existe
  // desde o primeiro clique, e sem este filtro o aluno cairia num quiz vazio.
  const todas = fasesDaTrilha(trilha).filter(({ fase }) => faseCompleta(fase));
  const atual = todas[fase - 1]?.fase;
  if (!atual) return <SemTrilha />;

  const total = todas.length;
  const quizHref = `/quizzes/demo/quiz?trilha=${trilha.id}&fase=${fase}`;
  const perguntas = perguntasParaOQuiz(banco, atual);

  if (etapa === "quiz" || !faseTemAbertura(atual)) {
    // Sem cards e sem ser diálogo, a fase ainda abre com o Bubo: é o caso da
    // revisão, a única em que a criança cairia direto numa pergunta.
    if (etapa === "abertura" && atual.tipo !== "Dialogo") {
      return <ReviewIntro questions={perguntas.length} quizHref={quizHref} />;
    }

    return (
      <QuizPlayer
        trackSlug="demo"
        trackTitle={trilha.nome}
        phase={fase}
        phases={total}
        context={contexto(fase, total)}
        questions={perguntas}
      />
    );
  }

  const cards = cardsOrdenados(atual);

  // Só cards de palavra, todos com figura: é a galeria "Olha e aprende".
  if (aberturaEhGaleria(atual)) {
    const galeria: Gallery = {
      slug: "demo",
      phase: fase,
      title: atual.titulo || trilha.nome,
      track: trilha.nome,
      words: cards.map((c) => ({
        en: acharPalavra(banco, c.palavraId)?.ingles ?? c.destaque,
        pt: c.traducao || (acharPalavra(banco, c.palavraId)?.traducao ?? ""),
        image: c.imagem ?? "",
      })),
    };
    return <GalleryPlayer gallery={galeria} quizHref={quizHref} />;
  }

  // Os cards viram as batidas da história, na mesma ordem: o de história
  // narra, o de palavra para tudo e mostra o que ela quer dizer.
  const beats: StoryBeat[] = cards.map((c) =>
    c.tipo === "Historia"
      ? {
          kind: "narration" as const,
          text: (c.destaque
            ? `${c.textoAntes} *${c.destaque}* ${c.textoDepois}`
            : `${c.textoAntes} ${c.textoDepois}`
          )
            .replace(/\s+/g, " ")
            .trim(),
          ...(c.imagem ? { image: c.imagem } : {}),
        }
      : {
          kind: "lesson" as const,
          word: acharPalavra(banco, c.palavraId)?.ingles || c.destaque,
          meaning: c.traducao || (acharPalavra(banco, c.palavraId)?.traducao ?? ""),
        },
  );

  const novas = cards.filter((c) => c.tipo === "Palavra").length;

  const historia: Story = {
    slug: "demo",
    phase: fase,
    part: fase,
    title: atual.titulo || trilha.nome,
    subtitle:
      atual.descricao.trim() || `${novas} ${novas === 1 ? "palavra nova" : "palavras novas"}.`,
    cover: atual.imagemCapa ?? cards.find((c) => c.imagem)?.imagem ?? "",
    beats,
  };

  return <StoryPlayer story={historia} quizHref={quizHref} parts={total} />;
}

function contexto(fase: number, total: number): string {
  const faltam = total - fase;
  if (faltam <= 0) return "Última fase desta trilha.";
  if (faltam === 1) return "Falta 1 fase nesta trilha.";
  return `Faltam ${faltam} fases nesta trilha.`;
}

function SemTrilha() {
  return (
    <div className="relative z-10 mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl">
      <h1 className="text-2xl font-extrabold text-deep-900">Trilha não encontrada</h1>
      <p className="mt-2 text-ink-700">
        O conteúdo do admin vive só na aba em que foi montado. Se você recarregou numa aba nova
        ou fechou a anterior, é preciso montar de novo.
      </p>
      <Link
        href="/admin"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-accent-500 px-7 py-3.5
                   text-lg font-extrabold text-white transition hover:bg-accent-600
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        Ir ao admin
      </Link>
    </div>
  );
}
