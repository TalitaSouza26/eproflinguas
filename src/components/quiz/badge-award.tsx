import Image from "next/image";
import type { Insignia } from "@/lib/insignias";

/** Raios que saem de trás da insígnia. Decorativos e de vida curta. */
const RAYS = [0, 45, 90, 135, 180, 225, 270, 315];

/**
 * Entrega da insígnia na tela de resultado.
 *
 * A animação roda uma vez, dura menos de dois segundos e não se repete — a
 * especificação pede microinteração curta, não celebração longa. Quem tem
 * `prefers-reduced-motion` ligado vê direto o estado final.
 */
export function BadgeAward({ insignia }: { insignia: Insignia }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex items-center justify-center">
        <span
          aria-hidden
          className="animate-badge-glow absolute size-48 rounded-full bg-accent-500/40 blur-2xl"
        />

        {/* A rotação fica no elemento de fora porque a animação usa transform:
            se as duas estivessem no mesmo elemento, a animação apagaria o
            posicionamento e os raios colapsariam no centro. */}
        {RAYS.map((angle, i) => (
          <span
            key={angle}
            aria-hidden
            className="absolute"
            style={{ transform: `rotate(${angle}deg) translateY(-6.5rem)` }}
          >
            <span
              className="animate-badge-ray block h-10 w-1.5 rounded-full bg-accent-500/70"
              style={{ animationDelay: `${260 + i * 45}ms` }}
            />
          </span>
        ))}

        <Image
          src={insignia.image}
          unoptimized
          alt=""
          width={512}
          height={512}
          priority
          className="animate-badge-pop relative w-40"
        />
      </div>

      <p
        className="animate-rise-in mt-2 text-xs font-bold uppercase tracking-wide text-accent-600"
        style={{ animationDelay: "780ms" }}
      >
        Nova insígnia
      </p>
      <p
        className="animate-rise-in mt-1 text-xl font-extrabold text-deep-900"
        style={{ animationDelay: "900ms" }}
      >
        {insignia.name}
      </p>
      <p
        className="animate-rise-in mt-1 text-[13px] text-ink-700"
        style={{ animationDelay: "1020ms" }}
      >
        {insignia.condition}
      </p>
    </div>
  );
}
