"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { signIn, type LoginState } from "@/app/login/actions";
import { formatCpf } from "@/lib/cpf";
import { ArrowRightIcon, EyeIcon, EyeOffIcon, KeyIcon, SpinnerIcon, UserIcon } from "@/components/ui/icons";

const fieldClass =
  "w-full rounded-full bg-ink-50 border border-ink-100 py-3.5 pl-12 pr-4 text-ink-900 placeholder:text-ink-500 " +
  "outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group relative flex w-full items-center justify-center gap-3 rounded-full bg-accent-500 py-3.5 text-base font-bold
                 text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-accent-600 disabled:opacity-70"
    >
      {pending ? "Entrando…" : "Acessar"}
      <span className="flex size-7 items-center justify-center rounded-full border-2 border-white/80">
        {pending ? <SpinnerIcon className="size-4 animate-spin" /> : <ArrowRightIcon className="size-4" />}
      </span>
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(signIn, { error: null });
  const [cpf, setCpf] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="space-y-3" noValidate>
      <div>
        <label htmlFor="cpf" className="sr-only">
          CPF
        </label>
        <div className="relative">
          <UserIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-accent-500" />
          <input
            id="cpf"
            name="cpf"
            inputMode="numeric"
            autoComplete="username"
            placeholder="000.000.000-00"
            value={cpf}
            onChange={(e) => setCpf(formatCpf(e.target.value))}
            maxLength={14}
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">
          Senha
        </label>
        <div className="relative">
          <KeyIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-accent-500" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Sua senha"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          aria-pressed={showPassword}
          className="flex items-center gap-2 rounded-md px-1 py-1 text-sm font-semibold text-accent-600 transition hover:text-accent-500
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
        >
          {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
          {showPassword ? "Ocultar senha" : "Visualizar senha"}
        </button>
      </div>

      {state.error && (
        <p role="alert" className="rounded-xl bg-wrong-50 px-4 py-3 text-sm font-medium text-wrong-700">
          {state.error}
        </p>
      )}

      <div className="pt-1">
        <SubmitButton />
      </div>

      <div className="pt-3 text-center text-sm">
        <Link
          href="/recuperar-senha"
          className="block font-medium text-deep-700 underline-offset-4 hover:underline"
        >
          Esqueceu sua senha?
        </Link>
      </div>
    </form>
  );
}
