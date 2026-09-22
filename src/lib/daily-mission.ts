/**
 * Missão do dia.
 *
 * Uma meta pequena, alcançável numa sessão, que se renova todo dia. Serve
 * para dar ao aluno um motivo concreto para abrir o app hoje — diferente das
 * insígnias, que medem acúmulo ao longo de semanas.
 *
 * A meta é deliberadamente baixa: uma missão que não se cumpre vira lembrete
 * de fracasso, e é o oposto do que ela existe para fazer.
 *
 * TODO: `done` vem de `quiz_attempts` do dia corrente quando houver banco, e
 * a missão passa a ser sorteada entre alguns tipos (concluir fases, acertar
 * N questões, manter a sequência).
 */

export type DailyMission = {
  title: string;
  /** O que fazer, em uma frase. */
  description: string;
  /** Quanto já foi feito hoje e a meta. */
  done: number;
  goal: number;
  /** O que o aluno ganha ao cumprir. */
  reward: string;
};

export const DAILY_MISSION: DailyMission = {
  title: "Missão do dia",
  description: "Complete 2 quizzes hoje",
  done: 1,
  goal: 2,
  reward: "Mantém sua sequência de dias",
};

export function missionProgress(mission: DailyMission) {
  const done = Math.min(mission.done, mission.goal);
  return {
    done,
    complete: done >= mission.goal,
    percent: mission.goal > 0 ? Math.round((done / mission.goal) * 100) : 0,
  };
}
