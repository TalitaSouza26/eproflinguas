import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { BadgeAward } from "@/components/quiz/badge-award";
import { PatenteAward } from "@/components/quiz/patente-award";
import { AWARDED_INSIGNIA, AWARDED_PATENTE, AWARDED_WORDS } from "@/lib/quiz/rewards";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { CURRENT_TRACK } from "@/lib/tracks";

export const metadata: Metadata = { title: "Resultado — eProf Línguas" };

const CTA_PRIMARY =
  "inline-flex items-center justify-center gap-2.5 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-bold " +
  "text-white shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent-600";

const CTA_SECONDARY =
  "inline-flex items-center justify-center rounded-full border-2 border-ink-100 bg-white px-7 py-3.5 text-sm " +
  "font-bold text-ink-700 transition hover:border-blue-200 hover:text-deep-900 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-blue-500";

/** Mensagem do Bubo pela faixa de acerto. Sem punição em nenhuma delas. */
function buboMessage(correct: number, total: number) {
  const ratio = total > 0 ? correct / total : 0;
  if (ratio >= 0.9) return "Excelente! Você dominou essas palavras.";
  if (ratio >= 0.7) return "Muito bom! Você está no caminho certo.";
  if (ratio >= 0.4) return "Bom trabalho! Com mais uma rodada você fixa essas palavras.";
  return "Você chegou até o fim, e isso já é aprendizado. Vamos praticar mais um pouco?";
}

function toInt(value: string | undefined, fallback: number) {
  const n = Number(value);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : fallback;
}

export default async function ResultadoPage({
  searchParams,
}: {
  searchParams: Promise<{ acertos?: string; total?: string }>;
}) {
  const sp = await searchParams;
  const total = toInt(sp.total, SEED_QUIZ.questions.length);
  const correct = Math.min(toInt(sp.acertos, 0), total);

  // A insígnia conquistada assume o lugar do Bubo: o prêmio é o que o aluno
  // deve ver primeiro. O que a fase rendeu vem de lib/quiz/rewards.
  const badge = AWARDED_INSIGNIA;
  const patente = AWARDED_PATENTE;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-3xl bg-white px-5 py-8 sm:px-8 sm:py-10 text-center shadow-[0_18px_50px_-30px_rgba(15,34,71,0.4)]">
        {badge ? (
          <BadgeAward insignia={badge} />
        ) : (
          <Image
            src="/bubo/bubo-pointing.webp"
            alt="Bubo, o mascote do eProf Línguas"
            width={1122}
            height={1402}
            unoptimized
            priority
            className="mx-auto w-32"
          />
        )}

        {/* Separa o prêmio do balanço da fase: são dois assuntos, e sem a
            linha "Conclua seu primeiro quiz" parecia legenda do título. */}
        <hr className="mt-6 border-t border-ink-100" />

        <h2 className="mt-6 text-2xl font-extrabold text-deep-900">Quiz concluído!</h2>
        <p className="mt-1.5 text-[15px] text-ink-700">{buboMessage(correct, total)}</p>

        {/* O destaque é quanto o aluno acertou, não uma nota ou posição. */}
        <p className="mt-7 flex items-center justify-center gap-3 text-[40px] font-extrabold leading-none text-correct-600">
          <span className="flex size-10 items-center justify-center rounded-full bg-correct-50">
            <CheckIcon className="size-6" />
          </span>
          {correct} de {total}
        </p>
        <p className="mt-2 text-sm font-medium text-ink-500">respostas corretas</p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {patente ? (
            <PatenteAward
              patente={patente}
              words={AWARDED_WORDS}
              href={`/quizzes/${CURRENT_TRACK.slug}`}
              className={CTA_PRIMARY}
            >
              Continuar trilha
              <ArrowRightIcon className="size-4" />
            </PatenteAward>
          ) : (
            <Link href={`/quizzes/${CURRENT_TRACK.slug}`} className={CTA_PRIMARY}>
              Continuar trilha
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
          <Link href={`/quizzes/${CURRENT_TRACK.slug}`} className={CTA_SECONDARY}>
            Refazer quiz
          </Link>
          <Link href="/inicio" className={CTA_SECONDARY}>
            Voltar ao início
          </Link>
        </div>
      </section>
    </div>
  );
}
