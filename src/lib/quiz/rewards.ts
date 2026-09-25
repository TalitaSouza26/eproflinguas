import { CONQUISTAS, type Conquista } from "@/lib/conquistas";
import { divisaoFor, type Divisao } from "@/lib/divisao";
import type { StudentProgress } from "@/lib/student";

/**
 * O que a fase recém-concluída rendeu.
 *
 * As duas recompensas têm condição, e não aparecem em toda conclusão:
 *
 * - **Conquista "Primeiro passo"**: só no primeiro quiz da vida do aluno.
 * - **Divisão Bronze I**: só ao fechar a trilha "Primeiras palavras", que é
 *   justamente onde a contagem de palavras cruza o primeiro degrau.
 *
 * Antes as duas eram entregues sempre, e a comemoração perdia o sentido: um
 * prêmio que cai toda vez não é prêmio.
 *
 * TODO: as outras sete conquistas precisam das condições delas (sequência de
 * dias, fase sem erro, trilha completa). Cada uma vira uma checagem aqui.
 */

export const FIRST_CONQUISTA_ID = "primeiro-passo";

export type PhaseRewards = {
  conquista?: Conquista;
  divisao?: Divisao;
  /** Palavras aprendidas até aqui, para a frase da entrega. */
  words: number;
};

export function rewardsFor(
  progress: StudentProgress,
  playedTrack: { slug: string; phases: number; completedPhases: number },
  playedPhase: number,
): PhaseRewards {
  const firstEver = progress.totalPhases === 1;

  // A trilha fechou agora: o aluno estava na última fase dela e ela completou.
  const trackJustDone =
    playedPhase === playedTrack.phases && playedTrack.completedPhases >= playedTrack.phases;

  const { current } = divisaoFor(progress.words);

  return {
    conquista: firstEver ? CONQUISTAS.find((i) => i.id === FIRST_CONQUISTA_ID) : undefined,
    divisao: trackJustDone && current ? current : undefined,
    words: progress.words,
  };
}
