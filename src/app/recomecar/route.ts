import { NextResponse, type NextRequest } from "next/server";
import { DEV_AUTH_ENABLED } from "@/lib/dev-auth";
import { ONBOARDING_COOKIE } from "@/lib/onboarding";
import { PHASES_COOKIE, QUIZZES_COOKIE } from "@/lib/progress";

/**
 * Volta o protótipo ao estado de aluno novo.
 *
 * Existe porque demonstrar o produto é repetir a primeira sessão, e tudo que
 * o aluno já fez — ter sido apresentado, as fases concluídas, os quizzes de
 * hoje — fica em cookies `httpOnly`, que o navegador não deixa apagar.
 *
 * Apagar **todas** elas é o ponto: faltar uma deixa o protótipo num meio
 * termo, com a trilha fechada e o aluno sem poder refazê-la.
 *
 * É rota, e não página, porque no Next só um route handler ou uma server
 * action pode escrever cookie; uma página que tentasse apagar não faria nada.
 *
 * Só responde no modo protótipo. Com Supabase configurado ela devolve o aluno
 * para a Home sem apagar nada: aí o progresso é de verdade.
 */
export function GET(request: NextRequest) {
  // Vai direto para a apresentação, e não para a Home: se a Home vier de
  // cache, o aluno veria o progresso antigo e pensaria que nada foi apagado.
  const destino = new URL(DEV_AUTH_ENABLED ? "/bem-vindo" : "/inicio", request.url);
  const response = NextResponse.redirect(destino);

  if (DEV_AUTH_ENABLED) {
    for (const cookie of [ONBOARDING_COOKIE, PHASES_COOKIE, QUIZZES_COOKIE]) {
      // Caminho e validade explícitos: um apagamento sem `path` pode virar um
      // segundo cookie no caminho da rota, deixando o original de pé.
      response.cookies.set(cookie, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
      });
    }
  }

  // Sem isto, um proxy ou o próprio navegador pode servir a resposta anterior
  // e o apagamento nunca chega.
  response.headers.set("Cache-Control", "no-store, max-age=0");

  return response;
}
