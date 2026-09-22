import type { Metadata } from "next";
import { ContinueCard } from "@/components/home/continue-card";
import { CurrentBadge } from "@/components/home/current-badge";
import { DailyMission } from "@/components/home/daily-mission";
import { TrackProgress } from "@/components/home/track-progress";
import { CURRENT_STUDENT } from "@/lib/home-data";

export const metadata: Metadata = { title: "Início — eProf Línguas" };

export default function InicioPage() {
  return (
    <div className="grid gap-6 px-8 pb-10 pt-4 xl:grid-cols-[1fr_19rem]">
      <div className="min-w-0 space-y-5">
        <div>
          <h2 className="text-[28px] font-extrabold leading-tight text-[var(--on-bg-strong)]">
            Olá, {CURRENT_STUDENT.firstName}!
          </h2>
          <p className="mt-0.5 text-[15px] text-[var(--on-bg-accent)]">Pronto para aprender hoje?</p>
        </div>

        <ContinueCard />
        <DailyMission />
        <TrackProgress />
      </div>

      <CurrentBadge />
    </div>
  );
}
