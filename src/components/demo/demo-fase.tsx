"use client";

import Link from "next/link";
import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { ReviewIntro } from "@/components/quiz/review-intro";
import { StoryPlayer } from "@/components/quiz/story-player";
import {
  acharTrilha,
  cenasProntas,
  mesmaPalavra,
  palavrasProntas,
  perguntasDaFase,
} from "@/lib/demo/trilha";
import { useDemoDados } from "@/lib/demo/use-demo-dados";
import type { Gallery } from "@/lib/quiz/galeria";
import type { Story, StoryBeat } from "@/lib/quiz/stories";

/**
 * Uma fase da trilha montada no admin, rodando na tela do aluno.
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
  const dados = useDemoDados();
  const trilha = acharTrilha(dados, trilhaId);

  if (!trilha) return <SemTrilha />;

  const i = fase - 1;
  const atual = trilha.fases[i];
  if (!atual) return <SemTrilha />;

  const total = trilha.fases.length;
  const quizHref = `/quizzes/demo/quiz?trilha=${trilha.id}&fase=${fase}`;
  const perguntas = perguntasDaFase(trilha, i);

  // O diálogo não tem abertura: a conversa já é o conteúdo.
  if (etapa === "quiz" || atual.tipo === "dialogo") {
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

  if (atual.tipo === "galeria") {
    const galeria: Gallery = {
      slug: "demo",
      phase: fase,
      title: atual.titulo || trilha.nome,
      track: trilha.nome,
      words: palavrasProntas(atual).map((p) => ({ en: p.en, pt: p.pt, image: p.imagem ?? "" })),
    };
    return <GalleryPlayer gallery={galeria} quizHref={quizHref} />;
  }

  if (atual.tipo === "historia") {
    const palavras = palavrasProntas(atual);
    // A cena pode marcar "My name is" e o dicionário guardar "My name is…":
    // é a mesma expressão, com a pontuação da frase colada.
    const significado = (en: string) => palavras.find((p) => mesmaPalavra(p.en, en))?.pt ?? "";
    const cenas = cenasProntas(atual);

    // Cada cena vira duas batidas: a narração, com a palavra entre asteriscos
    // como o player espera, e a tela da palavra nova logo depois.
    // Uma palavra só é apresentada na primeira vez que aparece. A história
    // real marca "Good morning" em duas cenas, e ensiná-la duas vezes faria
    // a mesma tela de palavra nova surgir repetida.
    const jaEnsinadas: string[] = [];

    const beats: StoryBeat[] = cenas.flatMap((c) => {
      const narracao = {
        kind: "narration" as const,
        text: (c.palavra ? `${c.antes} *${c.palavra}* ${c.depois}` : `${c.antes} ${c.depois}`)
          .replace(/\s+/g, " ")
          .trim(),
        ...(c.imagem ? { image: c.imagem } : {}),
      };

      // Cena sem palavra em destaque é só narração — é o caso da que abre e
      // da que fecha uma parte da história, nas histórias que já existem.
      if (!c.palavra) return [narracao];

      if (jaEnsinadas.some((j) => mesmaPalavra(j, c.palavra))) return [narracao];
      jaEnsinadas.push(c.palavra);

      const guardada = palavras.find((p) => mesmaPalavra(p.en, c.palavra));
      return [
        narracao,
        {
          kind: "lesson" as const,
          // Mostra a grafia do dicionário, que é a completa.
          word: guardada?.en ?? c.palavra,
          meaning: significado(c.palavra),
        },
      ];
    });

    const historia: Story = {
      slug: "demo",
      phase: fase,
      part: fase,
      title: atual.titulo || trilha.nome,
      subtitle:
        atual.subtitulo.trim() ||
        `${palavras.length} ${palavras.length === 1 ? "palavra nova" : "palavras novas"}.`,
      cover: atual.capa ?? cenas.find((c) => c.imagem)?.imagem ?? "",
      beats,
    };

    return <StoryPlayer story={historia} quizHref={quizHref} parts={total} />;
  }

  return <ReviewIntro questions={perguntas.length} quizHref={quizHref} />;
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
