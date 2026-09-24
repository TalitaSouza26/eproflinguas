import Link from "next/link";
import { ArrowRightIcon, CheckIcon, FlameIcon, TargetIcon } from "@/components/ui/icons";
import { DAILY_MISSION, missionProgress } from "@/lib/daily-mission";
import { quizzesToday } from "@/lib/progress";
import { CURRENT_PHASE, CURRENT_TRACK } from "@/lib/tracks";

export async function DailyMission() {
  // A contagem é real: cada quiz terminado hoje entra aqui.
  const mission = { ...DAILY_MISSION, done: await quizzesToday() };
  const { done, complete, percent } = missionProgress(mission);

  return (
    <section className="rounded-2xl border border-ink-100 bg-white px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${
              complete ? "bg-correct-50 text-correct-600" : "bg-accent-50 text-accent-500"
            }`}
          >
            {complete ? <CheckIcon className="size-5" /> : <TargetIcon className="size-5" />}
          </span>

          <div>
            <h2 className="text-[15px] font-extrabold text-deep-900">{mission.title}</h2>
            <p className="text-[13px] text-ink-500">
              {complete ? "Missão cumprida! Volte amanhã para a próxima." : mission.description}
            </p>
          </div>
        </div>

        {/* O número aparece por extenso: a barra sozinha não diz quanto falta. */}
        <p className="text-sm font-bold text-deep-900">
          {done} de {mission.goal}
        </p>
      </div>

      <div
        role="progressbar"
        aria-label="Progresso da missão do dia"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={mission.goal}
        className="mt-4 h-2.5 overflow-hidden rounded-full bg-ink-100"
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ${
            complete ? "bg-correct-600" : "bg-accent-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-1.5 text-xs font-medium text-ink-500">
          <FlameIcon className="size-4 text-accent-500" />
          {mission.reward}
        </p>

        {!complete && (
          <Link
            href={`/quizzes/${CURRENT_TRACK.slug}/historia?fase=${CURRENT_PHASE}`}
            className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600
                       transition hover:text-blue-700 focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-blue-500"
          >
            Fazer agora
            <ArrowRightIcon className="size-3.5" />
          </Link>
        )}
      </div>
    </section>
  );
}
