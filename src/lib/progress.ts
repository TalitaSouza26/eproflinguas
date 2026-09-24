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

/**
 * Fases concluídas por trilha.
 *
 * Guardado como "trilha:n,trilha:n". Enquanto isto não existia, o progresso
 * era um número fixo em `tracks.ts` e o aluno voltava para a fase 2 depois de
 * toda conclusão — nunca chegava à revisão nem fechava a trilha.
 *
 * TODO: com banco, isto é uma contagem em `quiz_attempts` por trilha.
 */
export const PHASES_COOKIE = "linguas_fases";

export function parsePhases(raw: string | undefined): Record<string, number> {
  const mapa: Record<string, number> = {};

  for (const par of (raw ?? "").split(",")) {
    const [slug, n] = par.split(":");
    if (slug && Number(n) > 0) mapa[slug] = Number(n);
  }

  return mapa;
}

export async function phasesByTrack(): Promise<Record<string, number>> {
  const store = await cookies();
  return parsePhases(store.get(PHASES_COOKIE)?.value);
}

/** Marca a fase como concluída. Refazer uma fase antiga não faz o aluno voltar. */
export async function recordPhase(slug: string, phase: number): Promise<void> {
  const store = await cookies();
  const mapa = parsePhases(store.get(PHASES_COOKIE)?.value);
  mapa[slug] = Math.max(mapa[slug] ?? 0, phase);

  const valor = Object.entries(mapa)
    .map(([s, n]) => `${s}:${n}`)
    .join(",");

  store.set(PHASES_COOKIE, valor, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}
