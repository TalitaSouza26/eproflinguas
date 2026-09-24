import { ANIMAIS_QUIZ } from "@/lib/quiz/animais";
import { GREETINGS_QUIZ } from "@/lib/quiz/greetings";
import { SEED_QUIZ } from "@/lib/quiz/seed";

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
  return BY_TRACK[slug] ?? SEED_QUIZ;
}
