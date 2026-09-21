"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DEV_AUTH_ENABLED, DEV_SESSION_COOKIE } from "@/lib/dev-auth";

export async function signOut() {
  if (DEV_AUTH_ENABLED) {
    const cookieStore = await cookies();
    cookieStore.delete(DEV_SESSION_COOKIE);
  } else {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/login");
}
