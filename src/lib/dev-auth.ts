/**
 * Sessão de desenvolvimento.
 *
 * Enquanto o projeto Supabase não está configurado, o login confere a senha
 * contra um valor fixo e grava um cookie, em vez de autenticar de verdade.
 * Isso permite percorrer as telas do aluno sem banco. Só vale fora de
 * produção: mesmo que a variável esteja ligada por engano num deploy,
 * `NODE_ENV` derruba o atalho.
 */
export const DEV_AUTH_ENABLED =
  process.env.NODE_ENV !== "production" && process.env.LINGUAS_DEV_BYPASS_AUTH === "1";

export const DEV_SESSION_COOKIE = "linguas_dev_session";

/** Senha aceita enquanto o login roda em modo de desenvolvimento. */
export const DEV_PASSWORD = process.env.LINGUAS_DEV_PASSWORD || "12345";
