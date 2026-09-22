import { SUPABASE_CONFIGURED } from "@/lib/supabase/config";

/**
 * Sessão de desenvolvimento.
 *
 * Enquanto o projeto Supabase não está configurado, o login confere a senha
 * contra um valor fixo e grava um cookie, em vez de autenticar de verdade.
 * Isso permite percorrer as telas do aluno sem banco — inclusive no protótipo
 * publicado, que é como o produto é mostrado antes de existir banco.
 *
 * O atalho se desarma sozinho: no dia em que as chaves do Supabase entrarem no
 * ambiente, o login real assume mesmo que a variável continue ligada por
 * esquecimento. Por isso o corte não é mais `NODE_ENV` — era ele que deixava o
 * protótipo publicado sem nenhuma forma de entrar.
 */
export const DEV_AUTH_ENABLED =
  !SUPABASE_CONFIGURED && process.env.LINGUAS_DEV_BYPASS_AUTH === "1";

export const DEV_SESSION_COOKIE = "linguas_dev_session";

/** Senha aceita enquanto o login roda em modo de desenvolvimento. */
export const DEV_PASSWORD = process.env.LINGUAS_DEV_PASSWORD || "12345";
