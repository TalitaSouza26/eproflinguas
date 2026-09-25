import { NextResponse, type NextRequest } from "next/server";
import { DEV_AUTH_ENABLED } from "@/lib/dev-auth";
import { ONBOARDING_COOKIE } from "@/lib/onboarding";
import { PHASES_COOKIE, QUIZZES_COOKIE } from "@/lib/progress";

/**
 * Volta o protótipo para trás. Existe porque demonstrar o produto é repetir a
 * mesma sessão, e o que o aluno fez vive em cookies `httpOnly` que o navegador
 * não deixa apagar.
 *
 * São dois recomeços, e a diferença importa:
 *
 * - **Sem parâmetro**: zera o progresso e devolve para a Início. A marca de
 *   "já foi apresentado" fica, senão a Home rebateria na hora para a tela do
 *   Bubo — aluno sem progresso e sem apresentação é recém-chegado.
 * - **`?primeiro=1`**: apaga também a apresentação e leva para a tela do Bubo.
 *   É o primeiro acesso de verdade.
 *
 * Só responde no modo protótipo. Com Supabase configurado devolve para a
 * Início sem apagar nada: aí o progresso é de aluno de verdade.
 */
export function GET(request: NextRequest) {
  const primeiroAcesso = request.nextUrl.searchParams.get("primeiro") === "1";
  const simulando = DEV_AUTH_ENABLED && primeiroAcesso;

  const destino = new URL(simulando ? "/bem-vindo" : "/inicio", request.url);
  const response = NextResponse.redirect(destino);

  if (DEV_AUTH_ENABLED) {
    const apagar = [PHASES_COOKIE, QUIZZES_COOKIE];
    if (primeiroAcesso) apagar.push(ONBOARDING_COOKIE);

    for (const cookie of apagar) {
      // Caminho e validade explícitos: um apagamento sem `path` pode virar um
      // segundo cookie no caminho da rota, deixando o original de pé.
      response.cookies.set(cookie, "", { path: "/", maxAge: 0, expires: new Date(0) });
    }
  }

  // Sem isto, um proxy ou o próprio navegador pode servir a resposta anterior
  // e o apagamento nunca chega.
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
