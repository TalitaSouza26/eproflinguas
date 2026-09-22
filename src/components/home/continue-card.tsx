import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { CURRENT_TRACK } from "@/lib/tracks";

export function ContinueCard() {
  return (
    <section className={`${BLUE_CARD} px-8 py-8`}>
      <CardBackdrop />

      <div className="relative max-w-[24rem]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
          Continue sua jornada
        </p>

        <h2 className="mt-2 text-[28px] font-extrabold leading-tight">Continue sua trilha</h2>
        <p className="mt-1.5 font-bold text-white">Você está indo muito bem!</p>
        <p className="mt-1.5 text-sm leading-relaxed text-blue-100">
          Retome de onde parou e siga conquistando novos conhecimentos.
        </p>

        <Link
          href={`/quizzes/${CURRENT_TRACK.slug}`}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold
                     text-white shadow-lg shadow-black/20 transition hover:bg-accent-600
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Continuar estudando
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <Image
        src="/illustrations/book.webp"
          unoptimized
        alt=""
        width={1456}
        height={1092}
        priority
        className="pointer-events-none absolute right-4 top-1/2 hidden w-[17rem] -translate-y-1/2 lg:block"
      />
    </section>
  );
}
