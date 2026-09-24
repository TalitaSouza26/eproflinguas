import { ANIMAIS_QUIZ } from "@/lib/quiz/animais";
import { GREETINGS_PHASES } from "@/lib/quiz/greetings";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { QUESTIONS_PER_QUIZ } from "@/lib/quiz/types";

/**
 * Qual quiz cada trilha serve, e em cada fase.
 *
 * "Primeiras palavras" tem um conjunto por fase, casado com a história da
 * mesma fase. As outras ainda têm um conjunto só, cortado no tamanho da faixa
 * — é protótipo. O que não pode é uma trilha servir o conteúdo de outra:
 * Escola perguntando o nome do gato foi o que motivou este mapa.
 *
 * TODO: com banco, o quiz vem da trilha e da fase, e este arquivo some.
 */
const BY_PHASE: Record<string, typeof GREETINGS_PHASES> = {
  "primeiras-palavras": GREETINGS_PHASES,
};

const BY_TRACK: Record<string, typeof SEED_QUIZ> = {
  [ANIMAIS_QUIZ.slug]: ANIMAIS_QUIZ,
};

export function quizForTrack(slug: string, phase = 1) {
  const fases = BY_PHASE[slug];
  if (fases) return fases[phase - 1] ?? fases[0];

  const quiz = BY_TRACK[slug] ?? SEED_QUIZ;

  // Os arquivos sem fase guardam mais questões do que uma fase usa. Cortar
  // aqui deixa o excedente escrito, em vez de jogar fora.
  return { ...quiz, questions: quiz.questions.slice(0, QUESTIONS_PER_QUIZ) };
}
