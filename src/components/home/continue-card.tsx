import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { CURRENT_TRACK } from "@/lib/tracks";

export function ContinueCard() {
  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#dde9fb] via-[#e8f2fd] to-[#f0f9ff] px-8 py-8">
      <div className="max-w-[24rem]">
        <h2 className="text-2xl font-extrabold text-deep-900">Continue sua trilha</h2>
        <p className="mt-1.5 font-semibold text-blue-600">Você está indo muito bem!</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-700">
          Retome de onde parou e siga conquistando novos conhecimentos.
        </p>

        <Link
          href={`/quizzes/${CURRENT_TRACK.slug}`}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-white
                     shadow-lg shadow-accent-500/25 transition hover:bg-accent-600
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600"
        >
          Continuar estudando
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <Image
        src="/illustrations/book.webp"
        alt=""
        width={1456}
        height={1092}
        priority
        className="pointer-events-none absolute right-2 top-1/2 hidden w-[19rem] -translate-y-1/2 [mask-image:linear-gradient(to_right,transparent,black_22%)] lg:block"
      />
    </section>
  );
}
