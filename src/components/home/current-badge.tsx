import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { BADGE_PLACEHOLDER, FIRST_GOAL, HIGHEST_BADGE, TOTAL_EARNED } from "@/lib/badges";

/**
 * Sem nenhuma insígnia, a Home mostra o primeiro objetivo em vez de um vazio:
 * a microprogressão do primeiro dia é o que puxa o aluno para o terceiro quiz.
 */
function FirstGoal() {
  const { category, nextThreshold } = FIRST_GOAL;
  const goal = nextThreshold ?? 1;

  return (
    <section className={`${BLUE_CARD} self-start px-6 py-6 text-center`}>
      <CardBackdrop />

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
          Seu primeiro objetivo
        </p>

        <Image
          src={BADGE_PLACEHOLDER}
          unoptimized
          alt=""
          width={512}
          height={512}
          className="mx-auto mt-3 w-20 opacity-45 grayscale"
        />

        <p className="mt-2 text-[15px] font-bold">
          {category.value} de {goal} quizzes concluídos
        </p>

        <div
          role="progressbar"
          aria-label="Progresso para a primeira insígnia"
          aria-valuenow={category.value}
          aria-valuemin={0}
          aria-valuemax={goal}
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/20"
        >
          <div
            className="h-full rounded-full bg-accent-500"
            style={{ width: `${((category.value / goal) * 100).toFixed(0)}%` }}
          />
        </div>

        <p className="mt-3 text-xs leading-relaxed text-blue-100">
          Complete {goal} quizzes para conquistar sua primeira insígnia.
        </p>
      </div>
    </section>
  );
}

export function CurrentBadge() {
  if (!HIGHEST_BADGE) return <FirstGoal />;

  const { category, tier, nextTier, remaining, percent } = HIGHEST_BADGE;

  return (
    <section className={`${BLUE_CARD} self-start px-6 py-6 text-center`}>
      <CardBackdrop />

      <div className="relative">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
          Patente atual
        </p>

        <Image
          src={category.image}
          unoptimized
          alt=""
          width={512}
          height={512}
          className="mx-auto mt-3 w-28 drop-shadow-lg"
        />

        {/* A patente é o próprio tier: não tem nome além de Bronze, Prata... */}
        <p className="mt-3 text-xl font-extrabold">{tier}</p>

        {nextTier ? (
          <>
            <div
              role="progressbar"
              aria-label={`Progresso para ${nextTier}`}
              aria-valuenow={percent}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
            >
              <div className="h-full rounded-full bg-accent-500" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-blue-100">
              Faltam {remaining} {category.unit} para {nextTier}.
            </p>
          </>
        ) : (
          <p className="mt-3 text-xs font-semibold text-blue-100">Tier máximo alcançado.</p>
        )}

        <Link
          href="/conquistas"
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white
                     underline-offset-4 transition hover:underline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ver as {TOTAL_EARNED} conquistas
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
