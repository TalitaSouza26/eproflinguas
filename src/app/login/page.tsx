import Image from "next/image";
import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = { title: "Entrar — eProf Línguas" };

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.08fr_1fr]">
      {/* Coluna de marca: Bubo recebendo o aluno. Decorativa, escondida no mobile. */}
      <div className="relative hidden lg:block">
        <Image
          src="/bubo/bubo-classroom.webp"
          alt=""
          fill
          priority
          sizes="(min-width: 1024px) 55vw, 0px"
          className="object-cover object-[15%_center]"
        />
      </div>

      <div className="flex min-w-0 flex-col bg-ink-50 px-6 py-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-[26rem] rounded-3xl bg-white p-8 shadow-[0_18px_50px_-24px_rgba(15,34,71,0.35)] sm:p-10">
            <Image
              src="/brand/logo-linguas.webp"
              alt="eProf Línguas"
              width={560}
              height={190}
              priority
              className="mx-auto mb-8 h-auto w-56"
            />
            <LoginForm />
          </div>
        </div>

        <footer className="text-balance pt-8 text-center text-xs text-ink-500">
          eProf Línguas © 2024 – {new Date().getFullYear()} | Todos os direitos reservados
        </footer>
      </div>
    </main>
  );
}
