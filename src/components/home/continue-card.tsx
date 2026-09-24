import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { CURRENT_PHASE, CURRENT_TRACK, IS_NEW_STUDENT } from "@/lib/tracks";

/**
 * O card que abre a Home.
 *
 * Fala diferente com quem nunca estudou: "retome de onde parou" não faz
 * sentido para quem não parou em lugar nenhum, e prometer que ele está indo
 * muito bem antes da primeira questão é elogio vazio. Para o recém-chegado o
 * card dá boas-vindas e diz o nome da trilha que vai começar.
 */
const COPY = IS_NEW_STUDENT
  ? {
      eyebrow: "Bem-vindo ao eProf Línguas",
      title: "Vamos começar!",
      lead: "O Bubo vai te ensinar inglês.",
      body: `Sua primeira trilha é ${CURRENT_TRACK.title.toLowerCase()}. São ${CURRENT_TRACK.phases} fases, uma de cada vez.`,
      cta: "Começar agora",
    }
  : {
      eyebrow: "Continue sua jornada",
      title: "Continue sua trilha",
      lead: "Você está indo muito bem!",
      body: "Retome de onde parou e siga conquistando novos conhecimentos.",
      cta: "Continuar estudando",
    };

export function ContinueCard() {
  return (
    <section className={`${BLUE_CARD} px-8 py-8`}>
      <CardBackdrop />

      <div className="relative max-w-[24rem]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
          {COPY.eyebrow}
        </p>

        <h2 className="mt-2 text-[28px] font-extrabold leading-tight">{COPY.title}</h2>
        <p className="mt-1.5 font-bold text-white">{COPY.lead}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-blue-100">{COPY.body}</p>

        {/* O recém-chegado passa pelo Bubo antes da primeira pergunta; quem
            já estudou volta direto para onde parou. */}
        <Link
          href={IS_NEW_STUDENT ? "/quizzes" : `/quizzes/${CURRENT_TRACK.slug}?fase=${CURRENT_PHASE}`}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold
                     text-white shadow-lg shadow-black/20 transition hover:bg-accent-600
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {COPY.cta}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <Image
        src="/bubo/bubo-aceno.webp"
        unoptimized
        alt=""
        width={1122}
        height={1402}
        priority
        className="pointer-events-none absolute -bottom-2 right-8 hidden w-56 lg:block"
      />
    </section>
  );
}
