import { ChartIcon, DocumentIcon, FlameIcon, TargetIcon, TrendUpIcon } from "@/components/ui/icons";
import { PROGRESS_STATS, type Stat } from "@/lib/home-data";

const STAT_ICON = {
  quizzes: DocumentIcon,
  accuracy: TargetIcon,
  streak: FlameIcon,
} as const;

const TONE: Record<Stat["tone"], string> = {
  blue: "bg-blue-50 text-blue-600",
  deep: "bg-deep-50 text-deep-500",
  accent: "bg-accent-50 text-accent-500",
};

function StatTile({ stat }: { stat: Stat }) {
  const Icon = STAT_ICON[stat.key as keyof typeof STAT_ICON] ?? DocumentIcon;

  return (
    <div className="flex flex-1 items-start gap-3.5 rounded-2xl border border-ink-100 bg-white px-4 py-4">
      <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${TONE[stat.tone]}`}>
        <Icon className="size-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xl font-extrabold leading-none text-deep-900">{stat.value}</p>
        <p className="mt-1.5 text-[13px] leading-tight text-ink-700">{stat.label}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-correct-600">
          <TrendUpIcon className="size-3.5" />
          {stat.delta}
        </p>
      </div>
    </div>
  );
}

export function ProgressSummary() {
  return (
    <section className="rounded-2xl border border-ink-100 bg-white px-6 py-6">
      <div className="flex items-start gap-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ChartIcon className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-deep-900">Seu progresso</h2>
          <p className="text-[13px] text-ink-500">
            Veja como você está evoluindo na sua jornada de aprendizado.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        {PROGRESS_STATS.map((stat) => (
          <StatTile key={stat.key} stat={stat} />
        ))}
      </div>
    </section>
  );
}
