"use client";

import Image from "next/image";
import { useState } from "react";
import { BulbIcon } from "@/components/ui/icons";

/**
 * Figura de uma questão ou de um cartão da galeria.
 *
 * Existe por causa de uma coisa só: a trilha visual foi escrita antes das
 * figuras existirem. Sem isto, arquivo faltando vira o ícone de imagem
 * quebrada do navegador em cima de uma pergunta que a criança precisa
 * responder olhando — e a fase fica impossível sem ninguém entender por quê.
 *
 * No lugar entra uma moldura que diz o que falta. É andaime de protótipo: some
 * quando as 16 figuras chegarem.
 */
export function QuizImage({
  src,
  alt,
  word,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  /** Aparece no aviso quando a figura falta, para saber qual desenhar. */
  word: string;
  className?: string;
  priority?: boolean;
}) {
  const [missing, setMissing] = useState(false);

  if (missing) {
    return (
      <div
        role="img"
        aria-label={alt || `Figura de ${word} ainda não disponível`}
        className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed
                    border-ink-300 bg-ink-50 px-4 text-center ${className}`}
      >
        <BulbIcon className="size-8 text-ink-300" />
        <p className="text-xs font-bold uppercase tracking-wide text-ink-500">Figura de {word}</p>
        <p className="text-[11px] text-ink-500">ainda não desenhada</p>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={512}
      height={512}
      priority={priority}
      onError={() => setMissing(true)}
      className={className}
    />
  );
}
