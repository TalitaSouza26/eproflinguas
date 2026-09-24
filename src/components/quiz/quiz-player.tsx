"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChoiceCard, type ChoiceState } from "@/components/quiz/choice-card";
import { BLUE_CARD, CardBackdrop } from "@/components/ui/card-backdrop";
import { ArrowLeftIcon, ArrowRightIcon, BulbIcon, SpeakerIcon } from "@/components/ui/icons";
import { FORMAT_INSTRUCTION, type Question } from "@/lib/quiz/types";

type Answer = { questionId: string; topic: string; correct: boolean };

function stateFor(
  choiceId: string,
  { confirmed, selected, correctId }: { confirmed: boolean; selected: string | null; correctId: string },
): ChoiceState {
  if (!confirmed) return selected === choiceId ? "selected" : "default";
  if (choiceId === correctId) return "correct";
  if (choiceId === selected) return "incorrect";
  return "muted";
}

/**
 * Quanto tempo o feedback fica na tela antes de avançar sozinho.
 *
 * O erro ganha mais que o dobro: é ali que está o aprendizado, e uma criança
 * do 2º ano não lê a explicação em um segundo.
 */
const ADVANCE_DELAY = { correct: 1800, wrong: 4200 };

const CTA =
  "inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-bold text-white " +
  "shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent-600";

export function QuizPlayer({
  trackTitle,
  phase,
  phases,
  context,
  questions,
}: {
  trackTitle: string;
  /** Fase atual e total de fases da trilha. */
  phase: number;
  phases: number;
  /** Onde o aluno está na trilha e o que falta para abrir a próxima. */
  context: string;
  questions: Question[];
}) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const question = questions[index];
  const total = questions.length;
  const isLast = index === total - 1;
  const isCorrect = confirmed && selected === question.correctChoiceId;
  const isSituation = question.format === "situation_reply";
  const correctCount = answers.filter((a) => a.correct).length;

  /**
    * Tocar na alternativa já responde.
    *
    * Não há passo de confirmar: para a criança que sabe a palavra, o botão era
    * só um clique a mais entre ela e a resposta. Em troca, a escolha é
    * definitiva no toque — por isso o card da alternativa é grande e bem
    * separado dos vizinhos.
    */
  function answer(choiceId: string) {
    if (confirmed) return;

    setSelected(choiceId);
    setConfirmed(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        topic: question.topic,
        correct: choiceId === question.correctChoiceId,
      },
    ]);
  }

  // Só mexe em setters de estado, então é estável e o efeito abaixo não
  // reinicia o cronômetro a cada render.
  const advance = useCallback(() => {
    setIndex((i) => i + 1);
    setSelected(null);
    setConfirmed(false);
    setHintOpen(false);
  }, []);

  // Depois de confirmar, a próxima questão entra sozinha.
  useEffect(() => {
    if (!confirmed || isLast) return;

    const delay = isCorrect ? ADVANCE_DELAY.correct : ADVANCE_DELAY.wrong;
    const timer = setTimeout(advance, delay);
    return () => clearTimeout(timer);
  }, [confirmed, isCorrect, isLast, advance]);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
      {/* Faixa da fase: onde o aluno está, com a saída sempre à vista. */}
      <header className={`${BLUE_CARD} px-6 py-5`}>
        <CardBackdrop />

        <div className="relative flex items-center justify-between gap-4">
          <div className="min-w-0">
            <Link
              href="/inicio"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em]
                         text-blue-200 transition hover:text-white focus-visible:outline-2
                         focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <ArrowLeftIcon className="size-4" />
              Fase {phase} de {phases}
            </Link>

            <h2 className="mt-1 truncate text-2xl font-extrabold">{trackTitle}</h2>
          </div>

          <span className="shrink-0 rounded-full border border-white/25 px-4 py-2 text-xs font-bold">
            {index + 1} de {total}
          </span>
        </div>
      </header>

      <p className="mt-3 text-center text-sm text-[var(--on-bg-muted)]">{context}</p>

      {/* A barra mede posição no quiz, não desempenho: avança por questão concluída. */}
      <div className="mt-3 flex items-center gap-4">
        <div
          role="progressbar"
          aria-label="Progresso no quiz"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          className="h-2.5 flex-1 overflow-hidden rounded-full bg-ink-100"
        >
          <div
            className="h-full rounded-full bg-accent-500 transition-[width] duration-300"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
        <span className="shrink-0 text-sm font-semibold text-[var(--on-bg-item)]">
          Pergunta {index + 1} de {total}
        </span>
      </div>

      <section className="mt-5 rounded-3xl bg-white p-5 sm:p-8 shadow-[0_18px_50px_-30px_rgba(15,34,71,0.4)]">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-500">
          {FORMAT_INSTRUCTION[question.format]}
        </p>

        {/* Em situation_reply o enunciado é a situação, em português. Não pode
            entrar no corpo de uma palavra em inglês: o que o aluno tem de ler
            com atenção ali é a cena, e o que ele decora está nas alternativas. */}
        <h3
          className={`mt-2 flex items-center justify-center gap-3 text-center font-extrabold text-deep-900 ${
            isSituation ? "text-lg leading-snug sm:text-xl" : "text-[26px]"
          }`}
        >
          {question.prompt}
          {question.audioText && !isSituation && (
            <button
              type="button"
              aria-label={`Ouvir a pronúncia de ${question.audioText}`}
              className="shrink-0 rounded-full p-1.5 text-blue-600 transition hover:bg-blue-50
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              <SpeakerIcon className="size-5" />
            </button>
          )}
        </h3>

        {question.promptTranslation && (
          <p className="mt-1 text-center text-base text-ink-500">{question.promptTranslation}</p>
        )}

        {/* A fala da outra pessoa vem numa bolha: é ela que o aluno responde,
            e ver quem falou é metade do enunciado. */}
        {isSituation && question.speakerLine && (
          <div className="mx-auto mt-5 flex max-w-md items-center gap-3 rounded-2xl bg-blue-50 px-4 py-3">
            <Image
              src="/bubo/bubo-falando.webp"
              alt="Bubo"
              width={1122}
              height={1402}
              unoptimized
              className="h-20 w-auto shrink-0 object-contain"
            />
            <p className="flex items-center gap-2 text-xl font-extrabold text-deep-900">
              “{question.speakerLine}”
              {question.audioText && (
                <button
                  type="button"
                  aria-label={`Ouvir a pronúncia de ${question.audioText}`}
                  className="shrink-0 rounded-full p-1.5 text-blue-600 transition hover:bg-white
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  <SpeakerIcon className="size-5" />
                </button>
              )}
            </p>
          </div>
        )}

        {question.format === "image_word" && (
          <Image
            src={question.imageUrl}
            alt=""
            width={512}
            height={512}
            priority
            className="mx-auto mt-4 h-48 w-auto object-contain"
          />
        )}

        {/* A grade acompanha a quantidade: duas ou quatro em pares, três lado
            a lado. Sobrar meia coluna faria a última alternativa parecer
            diferente das outras. */}
        <div
          className={`mt-6 grid gap-3 ${
            question.choices.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {question.choices.map((choice) => (
            <ChoiceCard
              key={choice.id}
              label={choice.label}
              state={stateFor(choice.id, { confirmed, selected, correctId: question.correctChoiceId })}
              disabled={confirmed}
              onSelect={() => answer(choice.id)}
            />
          ))}
        </div>

        {/* Dica: opcional, acionada pelo aluno, e sai de cena depois de confirmar. */}
        {!confirmed && question.hint && (
          <div className="mt-4">
            {hintOpen ? (
              <p className="flex items-start gap-3 rounded-2xl bg-blue-50 px-4 py-3 text-sm text-deep-700">
                <BulbIcon className="mt-0.5 size-5 shrink-0 text-accent-500" />
                <span>
                  <span className="font-bold text-deep-900">Dica do Bubo: </span>
                  {question.hint}
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={() => setHintOpen(true)}
                className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-blue-600
                           transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2
                           focus-visible:outline-blue-500"
              >
                <BulbIcon className="size-5 text-accent-500" />
                Pedir uma dica ao Bubo
              </button>
            )}
          </div>
        )}

        {confirmed && (
          <p
            role="status"
            className={`mt-4 rounded-2xl px-4 py-3.5 text-sm font-semibold ${
              isCorrect ? "bg-correct-50 text-correct-700" : "bg-wrong-50 text-wrong-700"
            }`}
          >
            {isCorrect ? "Muito bem! " : "Quase! "}
            <span className="font-medium">{question.explanation}</span>
          </p>
        )}

        {/* O rodapé só existe depois de responder: antes disso não há nada
            para o aluno acionar, e uma faixa vazia só empurraria a pergunta
            para cima da dobra. */}
        {confirmed && (
          <div className="mt-6 flex justify-end border-t border-ink-100 pt-6">
            {/* A barra mostra quanto falta em vez de deixar o aluno esperando
                no escuro, e dá lugar ao CTA na última questão. */}
            {!isLast && (
              <div className="flex w-full flex-col items-end gap-2">
                <p className="text-[13px] font-semibold text-ink-500">Próxima pergunta…</p>
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-ink-100">
                  <div
                    className="animate-advance h-full rounded-full bg-accent-500"
                    style={{
                      animationDuration: `${isCorrect ? ADVANCE_DELAY.correct : ADVANCE_DELAY.wrong}ms`,
                    }}
                  />
                </div>
              </div>
            )}

            {isLast && (
              <Link href={`/quizzes/resultado?acertos=${correctCount}&total=${total}`} className={CTA}>
                Ver resultado
                <ArrowRightIcon className="size-4" />
              </Link>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
