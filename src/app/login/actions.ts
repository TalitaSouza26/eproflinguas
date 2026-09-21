"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { cpfToAuthEmail, isValidCpf, onlyDigits } from "@/lib/cpf";
import { DEV_AUTH_ENABLED, DEV_PASSWORD, DEV_SESSION_COOKIE } from "@/lib/dev-auth";
import { SUPABASE_CONFIGURED } from "@/lib/supabase/config";

export type LoginState = { error: string | null };

export async function signIn(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const cpf = onlyDigits(String(formData.get("cpf") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (DEV_AUTH_ENABLED) {
    // Em desenvolvimento qualquer CPF serve: o que importa é percorrer as telas.
    // A validação de dígito verificador só vale no caminho real, abaixo.
    if (!cpf) return { error: "Digite seu CPF." };
    if (password !== DEV_PASSWORD) return { error: "CPF ou senha incorretos." };

    const cookieStore = await cookies();
    cookieStore.set(DEV_SESSION_COOKIE, cpf, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    redirect("/inicio");
  }

  if (!isValidCpf(cpf)) return { error: "CPF inválido. Confira os números digitados." };
  if (!password) return { error: "Digite sua senha." };

  if (!SUPABASE_CONFIGURED) {
    return { error: "Login indisponível no momento. Tente novamente mais tarde." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: cpfToAuthEmail(cpf),
    password,
  });

  // Mensagem genérica de propósito: não revela se o CPF existe na base.
  if (error) return { error: "CPF ou senha incorretos." };

  redirect("/inicio");
}
