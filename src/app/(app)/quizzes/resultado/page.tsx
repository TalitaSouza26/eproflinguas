import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/icons";
import { BadgeAward } from "@/components/quiz/badge-award";
import { CelebrationBurst } from "@/components/quiz/celebration-burst";
import { PatenteAward } from "@/components/quiz/patente-award";
import { rewardsFor } from "@/lib/quiz/rewards";
import { phaseHref, studentProgress } from "@/lib/student";
import { SEED_QUIZ } from "@/lib/quiz/seed";
import { nextTrackOf } from "@/lib/tracks";

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
  searchParams: Promise<{ acertos?: string; total?: string; trilha?: string; fase?: string }>;
}) {
  const sp = await searchParams;
  const total = toInt(sp.total, SEED_QUIZ.questions.length);
  const correct = Math.min(toInt(sp.acertos, 0), total);

  // A tela fala da trilha que o aluno acabou de jogar, e não da atual: ao
  // fechar a última fase, a atual já virou a trilha seguinte. O player manda
  // a origem na URL.
  const { tracks, current: currentTrack } = await studentProgress();

  const track = tracks.find((t) => t.slug === sp.trilha) ?? currentTrack;
  const playedPhase = toInt(sp.fase, 1);

  // A insígnia conquistada assume o lugar do Bubo: o prêmio é o que o aluno
  // deve ver primeiro. As duas recompensas têm condição — ver lib/quiz/rewards.
  const progress = await studentProgress();
  const { insignia: badge, patente, words } = rewardsFor(progress, track, playedPhase);

  const done = track.completedPhases;
  const left = track.phases - done;
  const nextTrack = nextTrackOf(track.slug);
  const trackDone = left === 0;

  const continueHref = trackDone
    ? nextTrack
      ? phaseHref(nextTrack.slug, 1)
      : "/inicio"
    : phaseHref(track.slug, done + 1);

  const trackLine = trackDone
    ? nextTrack
      ? `Trilha concluída! A trilha ${nextTrack.title} está aberta.`
      : "Trilha concluída!"
    : `${left === 1 ? "Falta 1 fase" : `Faltam ${left} fases`} para terminar esta trilha.`;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10">
      <section className="rounded-3xl bg-white px-5 py-8 sm:px-8 sm:py-10 text-center shadow-[0_18px_50px_-30px_rgba(15,34,71,0.4)]">
        {/* Fechar a trilha é o maior acontecimento da tela, e ganha o Bubo
            comemorando. Depois vem a insígnia, quando a fase rendeu uma. */}
        {trackDone ? (
          <div className="relative mx-auto flex w-40 items-center justify-center">
            <CelebrationBurst />
            <Image
              src="/bubo/bubo-comemorando.webp"
              alt=""
              width={905}
              height={1201}
              unoptimized
              priority
              className="animate-badge-pop relative w-40"
            />
          </div>
        ) : badge ? (
          <BadgeAward insignia={badge} />
        ) : (
          <Image
            src="/bubo/bubo-quiz-feito.webp"
            alt="Bubo, o mascote do eProf Línguas"
            width={773}
            height={1184}
            unoptimized
            priority
            className="animate-badge-pop mx-auto w-36"
          />
        )}

        {/* Separa o prêmio do balanço da fase: são dois assuntos, e sem a
            linha "Conclua seu primeiro quiz" parecia legenda do título. */}
        <hr className="mt-6 border-t border-ink-100" />

        <h2 className="mt-6 text-2xl font-extrabold text-deep-900">
          {trackDone ? `Trilha ${track.title} concluída!` : "Quiz concluído!"}
        </h2>
        <p className="mt-1.5 text-[15px] text-ink-700">
          {trackDone
            ? "Você aprendeu todas as palavras desta trilha. O Bubo está orgulhoso!"
            : buboMessage(correct, total)}
        </p>

        {/* O destaque é quanto o aluno acertou, não uma nota ou posição. */}
        <p className="mt-7 flex items-center justify-center gap-3 text-[40px] font-extrabold leading-none text-correct-600">
          <span className="flex size-10 items-center justify-center rounded-full bg-correct-50">
            <CheckIcon className="size-6" />
          </span>
          {correct} de {total}
        </p>
        <p className="mt-2 text-sm font-medium text-ink-500">respostas corretas</p>

        {/* Onde essa fase deixou o aluno na trilha. O placar fala da fase; esta
            barra fala do caminho, que é o que decide se ele volta amanhã. */}
        <div className="mt-8 rounded-2xl bg-blue-50 px-5 py-4 text-left">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-sm font-bold text-deep-900">{track.title}</p>
            <p className="text-[13px] font-semibold text-deep-700">
              {done} de {track.phases} fases
            </p>
          </div>

          <div
            role="progressbar"
            aria-label={`Progresso na trilha ${track.title}`}
            aria-valuenow={done}
            aria-valuemin={0}
            aria-valuemax={track.phases}
            className="mt-3 h-2.5 overflow-hidden rounded-full bg-white"
          >
            <div
              className="h-full rounded-full bg-accent-500"
              style={{ width: `${(done / track.phases) * 100}%` }}
            />
          </div>

          <p className="mt-2.5 text-[13px] text-ink-700">{trackLine}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {patente ? (
            <PatenteAward
              patente={patente}
              words={words}
              href={continueHref}
              className={CTA_PRIMARY}
            >
              Continuar trilha
              <ArrowRightIcon className="size-4" />
            </PatenteAward>
          ) : (
            <Link href={continueHref} className={CTA_PRIMARY}>
              Continuar trilha
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
          <Link href={`/quizzes/${track.slug}?fase=${playedPhase}`} className={CTA_SECONDARY}>
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
