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
 * Onde a primeira sessão acontece: fase 1 da trilha de entrada.
 *
 * A fase vai explícita na URL porque o mock desta trilha está concluído, para
 * a Home poder demonstrar um aluno adiantado. Sem isso o recém-chegado cairia
 * na fase 4.
 */
export const FIRST_QUIZ_PATH = "/quizzes/falando-com-pessoas?fase=1";

export async function hasStarted(): Promise<boolean> {
  const store = await cookies();
  return store.has(ONBOARDING_COOKIE);
}
