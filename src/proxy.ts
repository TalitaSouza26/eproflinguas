import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DEV_AUTH_ENABLED, DEV_SESSION_COOKIE } from "@/lib/dev-auth";
import { SUPABASE_ANON_KEY, SUPABASE_CONFIGURED, SUPABASE_URL } from "@/lib/supabase/config";

const PUBLIC_ROUTES = ["/login", "/recuperar-senha"];

function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
}

/** Manda o visitante para onde ele pode estar, dado se há sessão ou não. */
function routeFor(request: NextRequest, hasSession: boolean) {
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);

  if (!hasSession && !isPublic) return "/login";
  if (hasSession && isPublic) return "/inicio";
  return null;
}

function redirectTo(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  return NextResponse.redirect(url);
}

/** Renova a sessão do Supabase a cada navegação e protege as rotas do aluno. */
export async function proxy(request: NextRequest) {
  // Sem Supabase configurado, a sessão é o cookie de desenvolvimento.
  if (DEV_AUTH_ENABLED) {
    const target = routeFor(request, request.cookies.has(DEV_SESSION_COOKIE));
    return target ? redirectTo(request, target) : NextResponse.next({ request });
  }

  // Deploy sem credenciais: ninguém tem sessão, mas o login ainda precisa
  // abrir. Sem isso o app inteiro responderia erro.
  if (!SUPABASE_CONFIGURED) {
    const target = routeFor(request, false);
    return target ? redirectTo(request, target) : NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL!, SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (toSet) => {
        for (const { name, value } of toSet) request.cookies.set(name, value);
        response = NextResponse.next({ request });
        for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const target = routeFor(request, Boolean(user));
  return target ? redirectTo(request, target) : response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|bubo|badges|quiz|illustrations|.*\.webp$).*)"],
};
