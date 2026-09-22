import type { Metadata } from "next";
import { ContinueCard } from "@/components/home/continue-card";
import { CurrentBadge } from "@/components/home/current-badge";
import { DailyMission } from "@/components/home/daily-mission";
import { RecentBadges } from "@/components/home/recent-badges";
import { TrackProgress } from "@/components/home/track-progress";
import { CURRENT_STUDENT } from "@/lib/home-data";

export const metadata: Metadata = { title: "Início — eProf Línguas" };

/**
 * Os blocos são filhos diretos da grade e só recebem posição explícita a
 * partir de `xl`. Assim a ordem empilhada no celular — patente logo abaixo do
 * card de continuar — difere da ordem em duas colunas sem duplicar nada.
 */
export default function InicioPage() {
  return (
    <div className="grid items-start gap-5 px-4 pb-10 pt-4 sm:gap-6 sm:px-8 xl:grid-cols-[1fr_19rem]">
      <div className="xl:col-start-1 xl:row-start-1">
        <h2 className="text-[28px] font-extrabold leading-tight text-[var(--on-bg-strong)]">
          Olá, {CURRENT_STUDENT.firstName}!
        </h2>
        <p className="mt-0.5 text-[15px] text-[var(--on-bg-accent)]">Pronto para aprender hoje?</p>
      </div>

      <div className="min-w-0 xl:col-start-1 xl:row-start-2">
        <ContinueCard />
      </div>

      <div className="min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-1">
        <CurrentBadge />
      </div>

      <div className="min-w-0 xl:col-start-1 xl:row-start-3">
        <DailyMission />
      </div>

      <div className="min-w-0 xl:col-start-1 xl:row-start-4">
        <TrackProgress />
      </div>

      <div className="min-w-0 xl:col-start-2 xl:row-span-2 xl:row-start-3">
        <RecentBadges />
      </div>
    </div>
  );
}
