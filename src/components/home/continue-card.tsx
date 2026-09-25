import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/ui/icons";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { phaseHref, studentProgress } from "@/lib/student";

/**
 * O card que abre a Home.
 *
 * Fala diferente com quem nunca estudou: "retome de onde parou" não faz
 * sentido para quem não parou em lugar nenhum, e prometer que ele está indo
 * muito bem antes da primeira questão é elogio vazio. Para o recém-chegado o
 * card dá boas-vindas e diz o nome da trilha que vai começar.
 */
export async function ContinueCard() {
  const { current, phase, isNew } = await studentProgress();
  const done = current.completedPhases;

  const COPY = isNew
    ? {
        eyebrow: "Bem-vindo ao eProf Línguas",
        title: "Vamos começar!",
        lead: "O Bubo vai te ensinar inglês.",
        body: `Sua primeira trilha é ${current.title.toLowerCase()}. São ${current.phases} fases, uma de cada vez.`,
        cta: "Começar agora",
      }
    : {
        eyebrow: "Continue sua jornada",
        title: "Continue sua trilha",
        lead: "Você está indo muito bem!",
        body: `Você está na fase ${phase} de ${current.phases} da trilha ${current.title.toLowerCase()}.`,
        cta: "Continuar estudando",
      };

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

        {/* O avanço na trilha, para quem sai no meio e volta depois: a frase
            diz onde ele está, a barra mostra o quanto já andou. Não aparece
            para o recém-chegado, que não tem nada a mostrar ainda. */}
        {!isNew && (
          <div className="mt-4 flex items-center gap-3">
            <div
              role="progressbar"
              aria-label={`Progresso na trilha ${current.title}`}
              aria-valuenow={done}
              aria-valuemin={0}
              aria-valuemax={current.phases}
              className="h-2.5 flex-1 overflow-hidden rounded-full bg-white/20"
            >
              <div
                className="h-full rounded-full bg-accent-500 transition-[width] duration-500"
                style={{ width: `${(done / current.phases) * 100}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-bold text-blue-100">
              {done} de {current.phases} fases
            </span>
          </div>
        )}

        {/* O recém-chegado passa pelo Bubo antes da primeira pergunta; quem
            já estudou volta direto para onde parou. */}
        <Link
          href={isNew ? "/quizzes" : phaseHref(current.slug, phase)}
          className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold
                     text-white shadow-lg shadow-black/20 transition hover:bg-accent-600
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {COPY.cta}
          <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      {/* O Bubo encosta no canto e sai pela base do card, que corta o que
          passa. É busto, não corpo inteiro: numa faixa larga e baixa como
          esta, o rosto aparece grande — no corpo inteiro ele caberia na
          altura e o rosto ficaria do tamanho de um polegar.

          A altura é percentual e o pé passa da base de propósito: o card muda
          de altura entre o aluno novo e o que já tem barra de progresso, e o
          que sobra tem de sair por baixo — cortar o capelo em cima ficava
          claramente errado. */}
      <Image
        src="/bubo/bubo-bust-aceno.webp"
        unoptimized
        alt=""
        width={1013}
        height={1257}
        priority
        className="pointer-events-none absolute -bottom-6 right-4 hidden h-[108%] w-auto lg:block xl:right-10"
      />
    </section>
  );
}
