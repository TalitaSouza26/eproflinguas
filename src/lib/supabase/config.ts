/**
 * O Supabase pode não estar configurado — é o caso de um deploy feito antes
 * das credenciais existirem. Sem esta checagem, `createServerClient` recebe
 * `undefined` e lança em toda requisição, derrubando até a tela de login.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const SUPABASE_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
