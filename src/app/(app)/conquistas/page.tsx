import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon, LockIcon, MedalIcon } from "@/components/ui/icons";
import {
  ALL_PROGRESS,
  TIERS,
  TIER_STYLE,
  TOTAL_CATEGORIES,
  TOTAL_EARNED,
  badgeImage,
  type CategoryProgress,
} from "@/lib/badges";

export const metadata: Metadata = { title: "Conquistas — eProf Línguas" };

/**
 * A jornada da categoria em cinco degraus.
 *
 * Substitui a barra de percentual: antes havia duas medidas na mesma carta —
 * uma do avanço dentro do tier, outra da posição na escada — e ninguém
 * percebia que eram coisas diferentes. Aqui a escada é a única leitura, e o
 * estado de cada degrau é dito por forma (✓ / número / cadeado), não por cor.
 */
function TierSteps({ progress }: { progress: CategoryProgress }) {
  const { category, tierIndex } = progress;

  return (
    <ol className="mt-5 flex items-start gap-1">
      {TIERS.map((tier, i) => {
        const done = i < tierIndex;
        const current = i === tierIndex;
        const style = TIER_STYLE[tier];

        return (
          <li key={tier} className="flex flex-1 flex-col items-center gap-1.5 text-center">
            <div className="flex w-full items-center">
              <span className={`h-0.5 flex-1 ${i === 0 ? "bg-transparent" : done || current ? "bg-accent-500" : "bg-ink-100"}`} />
              <span
                className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                  done
                    ? "bg-accent-500 text-white"
                    : current
                      ? `${style.chip} ${style.text} ring-2 ring-accent-500`
                      : "bg-ink-100 text-ink-500"
                }`}
              >
                {done ? <CheckIcon className="size-3.5" /> : current ? i + 1 : <LockIcon className="size-3.5" />}
              </span>
              <span className={`h-0.5 flex-1 ${i === TIERS.length - 1 ? "bg-transparent" : done ? "bg-accent-500" : "bg-ink-100"}`} />
            </div>

            <span
              className={`text-[10px] font-semibold leading-tight ${
                done || current ? "text-deep-900" : "text-ink-500"
              }`}
            >
              {tier}
            </span>
            <span className="text-[10px] text-ink-500">{category.thresholds[i]}</span>
          </li>
        );
      })}
    </ol>
  );
}

function CategoryCard({ progress }: { progress: CategoryProgress }) {
  const { category, tier, tierIndex, nextTier, remaining, nextThreshold } = progress;
  const earned = tierIndex >= 0;
  const style = tier ? TIER_STYLE[tier] : null;

  return (
    <li className="rounded-2xl border border-ink-100 bg-white px-6 py-6 transition hover:border-blue-200">
      <div className="flex items-start gap-4">
        <Image
          src={badgeImage(tier)}
          alt=""
          width={512}
          height={512}
          className={`w-24 shrink-0 ${earned ? "" : "opacity-40 grayscale"}`}
        />

        <div className="min-w-0 flex-1">
          <p className={`text-[15px] font-bold ${earned ? "text-deep-900" : "text-ink-500"}`}>
            {category.name}
          </p>
          <p className="text-xs text-ink-500">{category.description}</p>

          {earned ? (
            <p className="mt-2 text-xs text-ink-500">
              Você está em{" "}
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${style!.chip} ${style!.text}`}>
                {tier}
              </span>
            </p>
          ) : (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1 text-xs font-semibold text-ink-500">
              <LockIcon className="size-3.5" />
              Ainda não conquistada
            </p>
          )}
        </div>
      </div>

      {/* Uma frase única diz onde está e quanto falta, na unidade da categoria. */}
      {category.available ? (
        <p className="mt-4 text-[13px] text-ink-700">
          <span className="font-bold text-deep-900">
            {category.value} de {nextThreshold ?? category.value}
          </span>{" "}
          {category.unit}
          {nextTier ? (
            <>
              {" "}
              — faltam <span className="font-bold text-deep-900">{remaining}</span> para{" "}
              {nextTier}
            </>
          ) : (
            " — tier máximo alcançado"
          )}
        </p>
      ) : (
        <p className="mt-4 rounded-xl bg-ink-50 px-3.5 py-2.5 text-xs text-ink-500">
          {category.unavailableReason}
        </p>
      )}

      <TierSteps progress={progress} />

      {/* O aluno precisa poder ver o escudo que ainda não conquistou:
          na escada acima os tiers futuros são só cadeado. */}
      <Link
        href={`/conquistas/${category.key}`}
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600
                   transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-blue-500"
      >
        Ver as insígnias de {category.name}
        <ArrowRightIcon className="size-3.5" />
      </Link>
    </li>
  );
}

export default function ConquistasPage() {
  return (
    <div className="px-8 pb-10 pt-4">
      <section className="rounded-2xl border border-ink-100 bg-white px-6 py-6">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-500">
            <MedalIcon className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-deep-900">Suas insígnias</h2>
            <p className="text-[13px] text-ink-500">
              Cada categoria mede uma coisa diferente e sobe sozinha por cinco níveis: Bronze I,
              Bronze II, Prata, Ouro e Diamante.
            </p>
            <p className="mt-2 text-[13px] font-semibold text-deep-900">
              Você já conquistou insígnia em {TOTAL_EARNED} das {TOTAL_CATEGORIES} categorias.
            </p>
          </div>
        </div>
      </section>

      <ul className="mt-5 grid gap-4 xl:grid-cols-2">
        {ALL_PROGRESS.map((progress) => (
          <CategoryCard key={progress.category.key} progress={progress} />
        ))}
      </ul>
    </div>
  );
}
