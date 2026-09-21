import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, CheckIcon, LockIcon } from "@/components/ui/icons";
import { TIERS, TIER_STYLE, badgeImage, progressByKey } from "@/lib/badges";

export const metadata: Metadata = { title: "Insígnia — eProf Línguas" };

export default async function CategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria } = await params;
  const progress = progressByKey(categoria);

  if (!progress) notFound();

  const { category, tierIndex } = progress;

  return (
    <div className="mx-auto w-full max-w-5xl px-8 pb-10 pt-4">
      <Link
        href="/conquistas"
        className="inline-flex items-center gap-2 text-sm font-semibold text-ink-700 transition
                   hover:text-deep-900 focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-blue-500"
      >
        <ArrowLeftIcon className="size-4" />
        Conquistas
      </Link>

      <header className="mt-4">
        <h2 className="text-2xl font-extrabold text-deep-900">{category.name}</h2>
        <p className="mt-0.5 text-[15px] text-ink-500">{category.description}</p>
        <p className="mt-3 text-[15px] text-ink-700">
          <span className="font-bold text-deep-900">
            {category.value} {category.unit}
          </span>
          {progress.nextTier
            ? ` — faltam ${progress.remaining} para ${progress.nextTier}`
            : " — tier máximo alcançado"}
        </p>
      </header>

      {/* Os cinco escudos, inclusive os que ainda faltam: ver o prêmio é
          metade da motivação, e o cadeado sozinho não mostra nada. */}
      <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {TIERS.map((tier, i) => {
          const earned = i <= tierIndex;
          const style = TIER_STYLE[tier];
          const missing = Math.max(0, category.thresholds[i] - category.value);

          return (
            <li
              key={tier}
              className={`flex flex-col items-center rounded-2xl border px-4 py-6 text-center ${
                earned ? "border-ink-100 bg-white" : "border-dashed border-ink-300 bg-ink-50"
              }`}
            >
              <Image
                src={badgeImage(tier)}
                alt=""
                width={512}
                height={512}
                className={`w-28 ${earned ? "" : "opacity-45 grayscale"}`}
              />

              <p
                className={`mt-3 rounded-full px-3 py-1 text-xs font-bold ${
                  earned ? `${style.chip} ${style.text}` : "bg-ink-100 text-ink-500"
                }`}
              >
                {tier}
              </p>

              <p className="mt-2 text-[13px] text-ink-500">
                {category.thresholds[i]} {category.unit}
              </p>

              {earned ? (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-correct-700">
                  <CheckIcon className="size-3.5" />
                  Conquistada
                </p>
              ) : (
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-ink-500">
                  <LockIcon className="size-3.5" />
                  Faltam {missing}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      {!category.available && (
        <p className="mt-6 rounded-xl bg-ink-50 px-4 py-3 text-sm text-ink-500">
          {category.unavailableReason}
        </p>
      )}
    </div>
  );
}
