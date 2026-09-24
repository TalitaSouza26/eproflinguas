import { cookies } from "next/headers";

/**
 * Quantos quizzes o aluno terminou hoje.
 *
 * Guardado em cookie com a data junto: virou o dia, a contagem zera sozinha,
 * sem nenhuma rotina de limpeza. É o bastante para a missão diária funcionar
 * de verdade no protótipo — antes ela era um número fixo que nunca andava.
 *
 * TODO: com banco, isto é uma contagem em `quiz_attempts` por dia, e passa a
 * valer entre aparelhos.
 */
export const QUIZZES_COOKIE = "linguas_quizzes_hoje";

function hoje(): string {
  return new Date().toISOString().slice(0, 10);
}

/** Lê "AAAA-MM-DD:N" e devolve N, ou 0 se for de outro dia. */
export function parseQuizzesToday(raw: string | undefined): number {
  const [dia, n] = (raw ?? "").split(":");
  return dia === hoje() ? Math.max(0, Number(n) || 0) : 0;
}

export async function quizzesToday(): Promise<number> {
  const store = await cookies();
  return parseQuizzesToday(store.get(QUIZZES_COOKIE)?.value);
}

export async function addQuizToday(): Promise<number> {
  const store = await cookies();
  const total = parseQuizzesToday(store.get(QUIZZES_COOKIE)?.value) + 1;

  store.set(QUIZZES_COOKIE, `${hoje()}:${total}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 2,
  });

  return total;
}
