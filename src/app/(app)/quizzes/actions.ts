"use server";

import { addQuizToday, recordPhase } from "@/lib/progress";

/**
 * Registra que o aluno terminou um quiz.
 *
 * Chamada pelo player no instante em que a última resposta é confirmada, antes
 * de ir para o resultado. É o que faz a missão do dia andar.
 */
export async function recordQuizDone(slug: string, phase: number) {
  await addQuizToday();
  await recordPhase(slug, phase);
}
