"use server";

import { addQuizToday } from "@/lib/progress";

/**
 * Registra que o aluno terminou um quiz.
 *
 * Chamada pelo player no instante em que a última resposta é confirmada, antes
 * de ir para o resultado. É o que faz a missão do dia andar.
 */
export async function recordQuizDone() {
  await addQuizToday();
}
