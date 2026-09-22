"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PatenteFlame } from "@/components/ui/patente-flame";
import type { Patente } from "@/lib/patente";

/**
 * Entrega da patente ao fim do quiz.
 *
 * O aluno clica em continuar e, antes de seguir, o emblema surge do fundo da
 * tela pegando fogo. A conquista interrompe o fluxo de propósito: subir de
 * patente é raro — algumas dezenas de palavras entre uma e outra — e passaria
 * batido se fosse só uma linha na tela de resultado.
 *
 * O botão de continuar dentro do modal é quem leva à trilha, então nada se
 * perde se o aluno fechar: ele volta ao resultado com os mesmos caminhos.
 */
export function PatenteAward({
  patente,
  words,
  href,
  className,
  children,
}: {
  patente: Patente;
  /** Palavras aprendidas até aqui, o que rendeu a patente. */
  words: number;
  /** Para onde seguir depois da comemoração. */
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const continueRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    // O foco vai para o único caminho adiante, e Esc volta ao resultado.
    continueRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="patente-award-title"
          className="animate-award-backdrop fixed inset-0 z-50 flex items-center justify-center overflow-y-auto
                     bg-deep-900/90 px-4 py-10 backdrop-blur-sm"
        >
          <div className="relative flex w-full max-w-md flex-col items-center text-center">
            <p
              className="animate-rise-in text-xs font-bold uppercase tracking-[0.2em] text-[#ffb057]"
              style={{ animationDelay: "900ms" }}
            >
              Nova patente
            </p>

            <div className="animate-award-emerge relative mt-5 flex items-center justify-center">
              <PatenteFlame glowClass="size-56" />
              <Image
                src={patente.image}
                alt=""
                width={512}
                height={512}
                unoptimized
                priority
                className="relative w-52 drop-shadow-[0_18px_40px_rgba(255,138,0,0.45)]"
              />
            </div>

            <h2
              id="patente-award-title"
              className="animate-rise-in mt-6 text-3xl font-extrabold text-white"
              style={{ animationDelay: "1150ms" }}
            >
              Parabéns!
            </h2>
            <p
              className="animate-rise-in mt-2 text-lg font-bold text-[#ffd8a8]"
              style={{ animationDelay: "1280ms" }}
            >
              Agora você é patente {patente.name}
            </p>
            <p
              className="animate-rise-in mt-1.5 text-sm text-blue-100"
              style={{ animationDelay: "1400ms" }}
            >
              {words} palavras aprendidas até aqui.
            </p>

            <Link
              ref={continueRef}
              href={href}
              className="animate-rise-in mt-8 inline-flex items-center justify-center gap-2.5 rounded-full
                         bg-accent-500 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-accent-500/30
                         transition hover:bg-accent-600 focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-white"
              style={{ animationDelay: "1520ms" }}
            >
              Continuar trilha
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
