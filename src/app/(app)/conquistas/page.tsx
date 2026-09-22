import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon, LockIcon, MedalIcon, TrophyIcon } from "@/components/ui/icons";
import { EARNED_INSIGNIAS, INSIGNIAS } from "@/lib/insignias";
import {
  CURRENT_INDEX,
  NEXT_PATENTE,
  PATENTES,
  PATENTE_PERCENT,
  WORDS_LEARNED,
  WORDS_TO_NEXT,
} from "@/lib/patente";

export const metadata: Metadata = { title: "Conquistas — eProf Línguas" };

/** A escada da patente: um trilho só, medido em palavras aprendidas. */
function PatenteLadder() {
  return (
    <section className="rounded-2xl border border-ink-100 bg-white px-6 py-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <TrophyIcon className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-deep-900">Sua patente</h2>
            <p className="text-[13px] text-ink-500">
              Sobe conforme você aprende palavras novas.
            </p>
          </div>
        </div>

        <p className="text-sm font-bold text-deep-900">
          {WORDS_LEARNED} palavras aprendidas
        </p>
      </div>

      {NEXT_PATENTE && (
        <>
          <div
            role="progressbar"
            aria-label={`Progresso para ${NEXT_PATENTE.name}`}
            aria-valuenow={PATENTE_PERCENT}
            aria-valuemin={0}
            aria-valuemax={100}
            className="mt-5 h-2.5 overflow-hidden rounded-full bg-ink-100"
          >
            <div
              className="h-full rounded-full bg-accent-500"
              style={{ width: `${PATENTE_PERCENT}%` }}
            />
          </div>
          <p className="mt-2 text-[13px] text-ink-700">
            Faltam <span className="font-bold text-deep-900">{WORDS_TO_NEXT}</span> palavras para{" "}
            {NEXT_PATENTE.name}.
          </p>
        </>
      )}

      <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {PATENTES.map((patente, i) => {
          const reached = i <= CURRENT_INDEX;
          const current = i === CURRENT_INDEX;

          return (
            <li
              key={patente.id}
              className={`flex flex-col items-center rounded-2xl border px-3 py-4 text-center ${
                current
                  ? "border-accent-500 bg-accent-50"
                  : reached
                    ? "border-ink-100 bg-white"
                    : "border-dashed border-ink-300 bg-ink-50"
              }`}
            >
              <Image
                src={patente.image}
                unoptimized
                alt=""
                width={512}
                height={512}
                className={`w-20 ${reached ? "" : "opacity-40 grayscale"}`}
              />

              <p
                className={`mt-2 text-[13px] font-bold ${
                  reached ? "text-deep-900" : "text-ink-500"
                }`}
              >
                {patente.name}
              </p>
              <p className="text-[11px] text-ink-500">{patente.words} palavras</p>

              {/* O estado é dito por palavra, não só pela cor da moldura. */}
              <p
                className={`mt-2 text-[11px] font-semibold ${
                  current ? "text-accent-600" : reached ? "text-correct-700" : "text-ink-500"
                }`}
              >
                {current ? "Você está aqui" : reached ? "Alcançada" : "Bloqueada"}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/** Coleção de insígnias: ganhas uma vez, sem níveis. */
function InsigniaGrid() {
  return (
    <section className="mt-5 rounded-2xl border border-ink-100 bg-white px-6 py-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-500">
            <MedalIcon className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-deep-900">Suas insígnias</h2>
            <p className="text-[13px] text-ink-500">
              Conquistas do percurso. Cada uma é ganha uma vez.
            </p>
          </div>
        </div>

        <p className="text-sm font-bold text-deep-900">
          {EARNED_INSIGNIAS.length} de {INSIGNIAS.length}
        </p>
      </div>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {INSIGNIAS.map((insignia) => (
          <li
            key={insignia.id}
            className={`flex flex-col items-center rounded-2xl border px-4 py-5 text-center ${
              insignia.earned
                ? "border-ink-100 bg-white"
                : "border-dashed border-ink-300 bg-ink-50"
            }`}
          >
            <Image
              src={insignia.image}
              unoptimized
              alt=""
              width={512}
              height={512}
              className={`w-20 ${insignia.earned ? "" : "opacity-40 grayscale"}`}
            />

            <p
              className={`mt-3 text-[14px] font-bold ${
                insignia.earned ? "text-deep-900" : "text-ink-500"
              }`}
            >
              {insignia.name}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-500">{insignia.condition}</p>

            {insignia.earned ? (
              <p className="mt-3 flex items-center gap-1.5 rounded-full bg-correct-50 px-3 py-1 text-[11px] font-semibold text-correct-700">
                <CheckIcon className="size-3.5" />
                Conquistada em {insignia.earnedAt}
              </p>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1 text-[11px] font-semibold text-ink-500">
                <LockIcon className="size-3.5" />
                Ainda não conquistada
              </p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ConquistasPage() {
  return (
    <div className="px-8 pb-10 pt-4">
      <PatenteLadder />
      <InsigniaGrid />
    </div>
  );
}
