import { ChartIcon, DocumentIcon, FlameIcon, TrendUpIcon } from "@/components/ui/icons";
import { PROGRESS_STATS } from "@/lib/home-data";

const SHOWN = ["quizzes", "streak"] as const;

const ICON = {
  quizzes: DocumentIcon,
  streak: FlameIcon,
} as const;

const TONE = {
  quizzes: "bg-blue-50 text-blue-600",
  streak: "bg-accent-50 text-accent-500",
} as const;

/** Os dois números que o aluno acompanha no dia a dia, na coluna lateral. */
export function QuickStats() {
  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-6 py-5">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <ChartIcon className="size-4.5" />
        </span>
        <h2 className="text-[15px] font-extrabold text-deep-900">Seu progresso</h2>
      </div>

      <ul className="space-y-4">
        {SHOWN.map((key) => {
          const stat = PROGRESS_STATS.find((s) => s.key === key);
          if (!stat) return null;

          const Icon = ICON[key];

          return (
            <li key={key} className="flex items-start gap-3.5">
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${TONE[key]}`}
              >
                <Icon className="size-5" />
              </span>

              <div className="min-w-0">
                <p className="text-xl font-extrabold leading-none text-deep-900">{stat.value}</p>
                <p className="mt-1.5 text-[13px] leading-tight text-ink-700">{stat.label}</p>
                <p className="mt-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-correct-600">
                  <TrendUpIcon className="size-3.5" />
                  {stat.delta}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
