import { cookies } from "next/headers";

/**
 * Primeira vez do aluno.
 *
 * Marca gravada quando ele toca em "Começar" na tela de boas-vindas. Enquanto
 * não existe, entrar na aplicação leva para lá — a criança de 6 anos não
 * escolhe trilha nem fase na primeira sessão, só começa.
 *
 * TODO: vira `onboarded_at` na tabela do aluno quando houver banco. Em cookie,
 * trocar de aparelho faz a tela aparecer de novo; com banco, não.
 */
export const ONBOARDING_COOKIE = "linguas_comecou";

/**
 * Onde a primeira sessão acontece: a história que abre a trilha de entrada,
 * que por sua vez emenda na fase 1.
 *
 * A fase vai explícita na URL para o recém-chegado nunca cair no meio da
 * trilha, seja qual for o estado do mock.
 */
export const FIRST_QUIZ_PATH = "/quizzes/primeiras-palavras/historia?fase=1";

/** Caminho da fase atual, para quem já começou. */
export function phasePath(slug: string, phase: number) {
  return `/quizzes/${slug}/historia?fase=${phase}`;
}

export async function hasStarted(): Promise<boolean> {
  const store = await cookies();
  return store.has(ONBOARDING_COOKIE);
}
