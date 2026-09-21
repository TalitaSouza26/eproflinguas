import Image from "next/image";
import { BulbIcon } from "@/components/ui/icons";
import { BUBO_PANEL } from "@/lib/home-data";

export function BuboPanel() {
  return (
    <aside className="flex flex-col self-start rounded-2xl bg-[#e7f0fd] px-6 py-6">
      <h2 className="flex items-center gap-2.5 text-base font-extrabold text-deep-900">
        <span aria-hidden className="h-1 w-4 rounded-full bg-accent-500" />
        {BUBO_PANEL.title}
      </h2>
      <p className="mt-3 text-sm font-medium leading-relaxed text-deep-700">{BUBO_PANEL.message}</p>

      <Image
        src="/bubo/bubo-pointing.webp"
        alt="Bubo, o mascote do eProf Línguas"
        width={1080}
        height={1440}
        className="mx-auto mt-4 w-40"
      />

      <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#d7e6fb] px-4 py-3.5">
        <BulbIcon className="mt-0.5 size-5 shrink-0 text-accent-500" />
        <div>
          <p className="text-[13px] font-bold text-deep-900">{BUBO_PANEL.tipTitle}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-deep-700">{BUBO_PANEL.tip}</p>
        </div>
      </div>
    </aside>
  );
}
