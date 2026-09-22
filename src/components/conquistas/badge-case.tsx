import Image from "next/image";
import Link from "next/link";
import { LockIcon } from "@/components/ui/icons";
import { ALL_PROGRESS, TIER_STYLE } from "@/lib/badges";

/**
 * Mostruário das insígnias.
 *
 * A prateleira vem antes das cartas de progresso porque a primeira pergunta
 * do aluno é "o que eu tenho?", não "quanto falta?". As bloqueadas continuam
 * visíveis, em cinza: esconder o que falta tira o motivo de continuar.
 */
export function BadgeCase() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {ALL_PROGRESS.map(({ category, tier, tierIndex }) => {
        const earned = tierIndex >= 0;
        const style = tier ? TIER_STYLE[tier] : null;

        return (
          <li key={category.key}>
            <Link
              href={`/conquistas/${category.key}`}
              className="flex h-full flex-col items-center rounded-2xl px-3 py-4 text-center transition
                         hover:bg-blue-50/70 focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-blue-500"
            >
              <span className="relative">
                <Image
                  src={category.image}
          unoptimized
                  alt=""
                  width={512}
                  height={512}
                  className={`w-24 ${earned ? "" : "opacity-35 grayscale"}`}
                />
                {!earned && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/90 text-ink-500 shadow-sm">
                      <LockIcon className="size-4" />
                    </span>
                  </span>
                )}
              </span>

              <span
                className={`mt-2 text-[13px] font-bold leading-tight ${
                  earned ? "text-deep-900" : "text-ink-500"
                }`}
              >
                {category.name}
              </span>

              {/* O tier vem por escrito; a cor do selo é só reforço. */}
              {earned ? (
                <span
                  className={`mt-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style!.chip} ${style!.text}`}
                >
                  {tier}
                </span>
              ) : (
                <span className="mt-1.5 text-[11px] font-semibold text-ink-500">Bloqueada</span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
