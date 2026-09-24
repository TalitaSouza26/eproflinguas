"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FIRST_QUIZ_PATH, ONBOARDING_COOKIE } from "@/lib/onboarding";

/** Marca que o aluno já foi apresentado e o leva direto para a questão 1. */
export async function startJourney() {
  const store = await cookies();
  store.set(ONBOARDING_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  redirect(FIRST_QUIZ_PATH);
}
