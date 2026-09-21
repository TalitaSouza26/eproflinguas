import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DEV_AUTH_ENABLED, DEV_SESSION_COOKIE } from "@/lib/dev-auth";

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

/** Renova a sessão do Supabase a cada navegação e protege as rotas do aluno. */
export async function proxy(request: NextRequest) {
  // Sem Supabase configurado, a sessão é o cookie de desenvolvimento.
  if (DEV_AUTH_ENABLED) {
    const target = routeFor(request, request.cookies.has(DEV_SESSION_COOKIE));
    if (target) {
      const url = request.nextUrl.clone();
      url.pathname = target;
      return NextResponse.redirect(url);
    }
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          for (const { name, value } of toSet) request.cookies.set(name, value);
          response = NextResponse.next({ request });
          for (const { name, value, options } of toSet) response.cookies.set(name, value, options);
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const target = routeFor(request, Boolean(user));
  if (target) {
    const url = request.nextUrl.clone();
    url.pathname = target;
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|brand|bubo|.*\.webp$).*)"],
};
