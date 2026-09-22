import Image from "next/image";
import Link from "next/link";
import { EARNED_PROGRESS, TIER_STYLE } from "@/lib/badges";

/**
 * Insígnias conquistadas, na coluna lateral da Home.
 *
 * Empilhadas, uma por linha: a lista é curta e o nome da categoria não cabe
 * legível em miniatura lado a lado.
 */
export function RecentBadges() {
  if (EARNED_PROGRESS.length === 0) return null;

  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-5 py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-extrabold text-deep-900">Suas insígnias</h2>
        <Link
          href="/conquistas"
          className="text-[13px] font-semibold text-blue-600 transition hover:text-blue-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Ver todas
        </Link>
      </div>

      <ul className="space-y-1">
        {EARNED_PROGRESS.map(({ category, tier }) => {
          const style = tier ? TIER_STYLE[tier] : null;

          return (
            <li key={category.key}>
              <Link
                href={`/conquistas/${category.key}`}
                className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-blue-50/70
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <Image
                  src={category.image}
                  unoptimized
                  alt=""
                  width={512}
                  height={512}
                  className="w-11 shrink-0"
                />

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-bold text-deep-900">{category.name}</p>
                  <p className="truncate text-[11px] text-ink-500">{category.description}</p>
                </div>

                {style && (
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${style.chip} ${style.text}`}
                  >
                    {tier}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
