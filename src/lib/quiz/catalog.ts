import { ANIMAIS_QUIZ } from "@/lib/quiz/animais";
import { GREETINGS_QUIZ } from "@/lib/quiz/greetings";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { QUESTIONS_PER_QUIZ } from "@/lib/quiz/types";

/**
 * Qual quiz cada trilha serve.
 *
 * As trilhas que ainda não têm questões próprias caem no quiz misto de
 * vocabulário — é protótipo. O que não pode é uma trilha servir o conteúdo de
 * outra: Escola perguntando o nome de animais foi o que motivou este mapa.
 *
 * TODO: com banco, o quiz vem da trilha e da fase, e este arquivo some.
 */
const BY_TRACK: Record<string, typeof SEED_QUIZ> = {
  [GREETINGS_QUIZ.slug]: GREETINGS_QUIZ,
  [ANIMAIS_QUIZ.slug]: ANIMAIS_QUIZ,
};

export function quizForTrack(slug: string) {
  const quiz = BY_TRACK[slug] ?? SEED_QUIZ;

  // Os arquivos guardam mais questões do que uma fase usa. Cortar aqui deixa
  // o excedente escrito para as fases seguintes, em vez de jogar fora.
  return { ...quiz, questions: quiz.questions.slice(0, QUESTIONS_PER_QUIZ) };
}
