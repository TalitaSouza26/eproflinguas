import { NextResponse, type NextRequest } from "next/server";
import { DEV_AUTH_ENABLED } from "@/lib/dev-auth";
import { ONBOARDING_COOKIE } from "@/lib/onboarding";
import { QUIZZES_COOKIE } from "@/lib/progress";

/**
 * Volta o protótipo ao estado de aluno novo.
 *
 * Existe porque demonstrar o produto é repetir a primeira sessão, e as marcas
 * de "já começou" e de "quizzes de hoje" ficam em cookies `httpOnly` — não dá
 * para apagar pelo navegador.
 *
 * É rota, e não página, porque no Next só um route handler ou uma server
 * action pode escrever cookie; uma página que tentasse apagar não faria nada.
 *
 * Só responde no modo protótipo. Com Supabase configurado ela devolve o aluno
 * para a Home sem apagar nada: aí o progresso é de verdade.
 */
export function GET(request: NextRequest) {
  const destino = new URL("/inicio", request.url);
  const response = NextResponse.redirect(destino);

  if (DEV_AUTH_ENABLED) {
    response.cookies.delete(ONBOARDING_COOKIE);
    response.cookies.delete(QUIZZES_COOKIE);
  }

  return response;
}
