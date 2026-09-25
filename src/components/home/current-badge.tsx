import Image from "next/image";
import Link from "next/link";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PatenteFlame } from "@/components/ui/patente-flame";
import { patenteFor, PATENTES } from "@/lib/patente";
import { studentProgress } from "@/lib/student";

/** A patente do aluno e o quanto falta para a próxima, em palavras. */
export async function CurrentBadge() {
  const { words } = await studentProgress();
  const { current: CURRENT_PATENTE, next: NEXT_PATENTE, toNext: WORDS_TO_NEXT, percent: PATENTE_PERCENT } =
    patenteFor(words);
  const WORDS_LEARNED = words;
  const shown = CURRENT_PATENTE ?? PATENTES[0];

  return (
    <section className={`${BLUE_CARD} self-start px-6 py-6 text-center`}>
      <CardBackdrop />

      <div className="relative">
        {/* Sem patente conquistada o card muda de assunto: não há "atual"
            para mostrar, então ele aponta a próxima e o que ela custa. */}
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-200">
          {CURRENT_PATENTE ? "Patente atual" : "Próxima patente"}
        </p>

        {/* Só a patente conquistada pega fogo: a que falta fica apagada. */}
        <div className="relative mx-auto mt-3 flex h-32 w-32 items-center justify-center">
          {CURRENT_PATENTE && <PatenteFlame />}

          <Image
            src={shown.image}
            unoptimized
            alt=""
            width={512}
            height={512}
            className={`relative w-32 drop-shadow-lg ${
              CURRENT_PATENTE ? "" : "opacity-40 grayscale"
            }`}
          />
        </div>

        <p className="mt-3 text-xl font-extrabold">{shown.name}</p>
        <p className="mt-1 text-xs text-blue-100">
          {CURRENT_PATENTE
            ? `${WORDS_LEARNED} palavras aprendidas`
            : `Aprenda ${shown.words} palavras para conquistar`}
        </p>

        {NEXT_PATENTE ? (
          <>
            <div
              role="progressbar"
              aria-label={`Progresso para ${NEXT_PATENTE.name}`}
              aria-valuenow={PATENTE_PERCENT}
              aria-valuemin={0}
              aria-valuemax={100}
              className="mt-4 h-2 overflow-hidden rounded-full bg-white/20"
            >
              <div
                className="h-full rounded-full bg-accent-500"
                style={{ width: `${PATENTE_PERCENT}%` }}
              />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-blue-100">
              {CURRENT_PATENTE
                ? `Faltam ${WORDS_TO_NEXT} palavras para ${NEXT_PATENTE.name}.`
                : "Cada palavra que você acerta conta."}
            </p>
          </>
        ) : (
          <p className="mt-3 text-xs font-semibold text-blue-100">Patente máxima alcançada.</p>
        )}

        <Link
          href="/conquistas"
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold text-white
                     underline-offset-4 transition hover:underline focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Ver minhas patentes
          <ArrowRightIcon className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
