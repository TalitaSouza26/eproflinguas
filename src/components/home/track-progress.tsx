import { BookIcon, LockIcon } from "@/components/ui/icons";
import { TRACKS, isUnlocked, progressOf } from "@/lib/tracks";

export function TrackProgress() {
  return (
    <section className="rounded-2xl border border-ink-100 bg-white px-6 py-6">
      <div className="flex items-start gap-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <BookIcon className="size-5" />
        </span>
        <div>
          <h2 className="text-lg font-extrabold text-deep-900">Progresso por trilha</h2>
          <p className="text-[13px] text-ink-500">
            Termine uma trilha para abrir a próxima.
          </p>
        </div>
      </div>

      <ul className="mt-5 space-y-3.5">
        {TRACKS.map((track, index) => {
          const unlocked = isUnlocked(index);
          const progress = progressOf(track);

          return (
            <li key={track.slug} className="flex items-center gap-3.5">
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${
                  unlocked ? "bg-blue-50 text-blue-600" : "bg-ink-100 text-ink-500"
                }`}
              >
                {unlocked ? <track.icon className="size-4" /> : <LockIcon className="size-4" />}
              </span>

              <span
                className={`w-32 shrink-0 truncate text-[13px] font-medium ${
                  unlocked ? "text-ink-700" : "text-ink-500"
                }`}
              >
                {track.title}
              </span>

              <div
                role="progressbar"
                aria-label={`Progresso na trilha ${track.title}`}
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
                className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-100"
              >
                <div className="h-full rounded-full bg-blue-500" style={{ width: `${progress}%` }} />
              </div>

              {/* Bloqueio é dito por palavra, não só pelo ícone e pela cor. */}
              <span className="w-24 shrink-0 text-right text-[13px] font-semibold text-ink-700">
                {unlocked ? (
                  `${track.completedPhases} de ${track.phases}`
                ) : (
                  <span className="text-ink-500">Bloqueada</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
