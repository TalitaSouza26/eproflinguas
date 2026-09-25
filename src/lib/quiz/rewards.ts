import { INSIGNIAS, type Insignia } from "@/lib/insignias";
import { patenteFor, type Patente } from "@/lib/patente";
import type { StudentProgress } from "@/lib/student";

/**
 * O que a fase recém-concluída rendeu.
 *
 * As duas recompensas têm condição, e não aparecem em toda conclusão:
 *
 * - **Insígnia "Primeiro passo"**: só no primeiro quiz da vida do aluno.
 * - **Patente Bronze I**: só ao fechar a trilha "Primeiras palavras", que é
 *   justamente onde a contagem de palavras cruza o primeiro degrau.
 *
 * Antes as duas eram entregues sempre, e a comemoração perdia o sentido: um
 * prêmio que cai toda vez não é prêmio.
 *
 * TODO: as outras sete insígnias precisam das condições delas (sequência de
 * dias, fase sem erro, trilha completa). Cada uma vira uma checagem aqui.
 */

export const FIRST_INSIGNIA_ID = "primeiro-passo";

export type PhaseRewards = {
  insignia?: Insignia;
  patente?: Patente;
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

  const { current } = patenteFor(progress.words);

  return {
    insignia: firstEver ? INSIGNIAS.find((i) => i.id === FIRST_INSIGNIA_ID) : undefined,
    patente: trackJustDone && current ? current : undefined,
    words: progress.words,
  };
}
