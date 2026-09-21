import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "@/lib/supabase/config";

export async function createClient() {
  if (!SUPABASE_CONFIGURED) {
    throw new Error(
      "Supabase não configurado: defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }

  const cookieStore = await cookies();

  return createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (toSet) => {
        try {
          for (const { name, value, options } of toSet) {
            cookieStore.set(name, value, options);
          }
        } catch {
          // Chamado de um Server Component: o proxy renova a sessão.
        }
      },
    },
  });
}
