import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import {
  BADGE_PLACEHOLDER,
  FIRST_GOAL,
  HIGHEST_BADGE,
  TIER_STYLE,
  TOTAL_EARNED,
  badgeImage,
} from "@/lib/badges";

/**
 * Sem nenhuma insígnia, a Home mostra o primeiro objetivo em vez de um vazio:
 * a microprogressão do primeiro dia é o que puxa o aluno para o terceiro quiz.
 */
function FirstGoal() {
  const { category, nextThreshold } = FIRST_GOAL;

  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-6 py-6 text-center">
      <p className="flex items-center justify-center gap-2.5 text-sm font-extrabold text-deep-900">
        <span aria-hidden className="h-1 w-4 rounded-full bg-accent-500" />
        Seu primeiro objetivo
      </p>

      <Image
        src={BADGE_PLACEHOLDER}
        alt=""
        width={512}
        height={512}
        className="mx-auto mt-3 w-20 opacity-40 grayscale"
      />

      <p className="mt-2 text-[15px] font-bold text-deep-900">
        {category.value} de {nextThreshold} quizzes concluídos
      </p>

      <div
        role="progressbar"
        aria-label="Progresso para a primeira insígnia"
        aria-valuenow={category.value}
        aria-valuemin={0}
        aria-valuemax={nextThreshold ?? 0}
        className="mt-3 h-2.5 overflow-hidden rounded-full bg-ink-100"
      >
        <div
          className="h-full rounded-full bg-accent-500"
          style={{ width: `${((category.value / (nextThreshold ?? 1)) * 100).toFixed(0)}%` }}
        />
      </div>

      <p className="mt-3 text-xs leading-relaxed text-ink-500">
        Complete {nextThreshold} quizzes para conquistar sua primeira insígnia.
      </p>
    </section>
  );
}

export function CurrentBadge() {
  if (!HIGHEST_BADGE) return <FirstGoal />;

  const { category, tier, nextTier, remaining, percent } = HIGHEST_BADGE;
  const style = TIER_STYLE[tier!];

  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-6 py-6 text-center">
      <p className="flex items-center justify-center gap-2.5 text-sm font-extrabold text-deep-900">
        <span aria-hidden className="h-1 w-4 rounded-full bg-accent-500" />
        Insígnia atual
      </p>

      <Image
        src={badgeImage(tier)}
        alt=""
        width={512}
        height={512}
        className="mx-auto mt-3 w-28"
      />

      <p className="mt-2 text-[15px] font-bold text-deep-900">{category.name}</p>
      {/* O tier é dito por extenso, não só pela cor do selo. */}
      <p
        className={`mt-1.5 inline-block rounded-full px-3 py-1 text-xs font-bold ${style.chip} ${style.text}`}
      >
        {tier}
      </p>

      {nextTier ? (
        <>
          <div
            role="progressbar"
            aria-label={`Progresso para ${nextTier}`}
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-4 h-2 overflow-hidden rounded-full bg-ink-100"
          >
            <div className="h-full rounded-full bg-accent-500" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-2 text-xs leading-relaxed text-ink-500">
            Faltam {remaining} {category.unit} para {nextTier}.
          </p>
        </>
      ) : (
        <p className="mt-3 text-xs font-semibold text-ink-500">Tier máximo alcançado.</p>
      )}

      <Link
        href="/conquistas"
        className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600
                   transition hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-blue-500"
      >
        Ver as {TOTAL_EARNED} conquistas
        <ArrowRightIcon className="size-3.5" />
      </Link>
    </section>
  );
}
