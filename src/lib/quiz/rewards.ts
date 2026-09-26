import { CONQUISTAS, type Conquista } from "@/lib/conquistas";
import { divisaoFor, type Divisao } from "@/lib/divisao";
import { wordsOfPhase, type StudentProgress } from "@/lib/student";

/**
 * O que a fase recém-concluída rendeu.
 *
 * As duas recompensas têm condição, e não aparecem em toda conclusão:
 *
 * - **Conquista "Primeiro passo"**: só no primeiro quiz da vida do aluno.
 * - **Divisão**: só quando esta fase fez o aluno *cruzar* um degrau da escada.
 *
 * Antes as duas eram entregues sempre, e a comemoração perdia o sentido: um
 * prêmio que cai toda vez não é prêmio.
 *
 * A divisão era amarrada a "fechar a trilha", o que funcionava por acidente:
 * a Bronze I estava em 9 palavras e a primeira trilha ensina exatamente 9.
 * Comparar a divisão de antes com a de agora é a regra de verdade — vale para
 * qualquer degrau, em qualquer ponto da trilha, e não só para o primeiro.
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

  // Onde o aluno estava antes desta fase: o total de agora menos o que ela
  // ensinou. A fase de revisão não ensina nada, então não pode promover.
  const antes = progress.words - wordsOfPhase(playedTrack.slug, playedPhase);

  const { current } = divisaoFor(progress.words);
  const subiu = current && divisaoFor(antes).index !== divisaoFor(progress.words).index;

  return {
    conquista: firstEver ? CONQUISTAS.find((i) => i.id === FIRST_CONQUISTA_ID) : undefined,
    divisao: subiu ? current : undefined,
    words: progress.words,
  };
}
