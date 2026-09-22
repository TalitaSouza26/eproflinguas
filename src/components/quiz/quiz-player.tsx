"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChoiceCard, type ChoiceState } from "@/components/quiz/choice-card";
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
 * do 2º ano não lê a explicação em um segundo. O botão continua disponível
 * para quem quiser passar antes.
 */
const ADVANCE_DELAY = { correct: 1800, wrong: 4200 };

const CTA =
  "inline-flex items-center gap-2.5 rounded-full bg-accent-500 px-7 py-3.5 text-sm font-bold text-white " +
  "shadow-lg shadow-accent-500/25 transition hover:bg-accent-600 focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent-600";

export function QuizPlayer({
  title,
  context,
  questions,
}: {
  title: string;
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
  const correctCount = answers.filter((a) => a.correct).length;
  // Tópicos errados alimentam o "o que praticar mais" da tela de resultado.
  const weakTopics = [...new Set(answers.filter((a) => !a.correct).map((a) => a.topic))];

  function confirm() {
    if (!selected || confirmed) return;
    setConfirmed(true);
    setAnswers((prev) => [
      ...prev,
      {
        questionId: question.id,
        topic: question.topic,
        correct: selected === question.correctChoiceId,
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
    <div className="mx-auto w-full max-w-3xl px-6 py-8">
      <Link
        href="/inicio"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--on-bg-item)] transition hover:text-[var(--on-bg-strong)]
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <ArrowLeftIcon className="size-4" />
        Voltar
      </Link>

      <h2 className="mt-4 text-center text-3xl font-extrabold text-[var(--on-bg-strong)]">{title}</h2>
      <p className="mt-1.5 text-center text-sm text-[var(--on-bg-muted)]">{context}</p>

      {/* A barra mede posição no quiz, não desempenho: avança por questão concluída. */}
      <div className="mt-5 flex items-center gap-4">
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

      <section className="mt-5 rounded-3xl bg-white p-8 shadow-[0_18px_50px_-30px_rgba(15,34,71,0.4)]">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-ink-500">
          {FORMAT_INSTRUCTION[question.format]}
        </p>

        <h3 className="mt-2 flex items-center justify-center gap-3 text-center text-[26px] font-extrabold text-deep-900">
          {question.prompt}
          {question.audioText && (
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

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {question.choices.map((choice) => (
            <ChoiceCard
              key={choice.id}
              label={choice.label}
              state={stateFor(choice.id, { confirmed, selected, correctId: question.correctChoiceId })}
              disabled={confirmed}
              onSelect={() => setSelected(choice.id)}
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

        <div className="mt-6 flex justify-end border-t border-ink-100 pt-6">
          {!confirmed && (
            <button
              type="button"
              onClick={confirm}
              disabled={!selected}
              className={`${CTA} disabled:cursor-not-allowed disabled:bg-ink-300 disabled:shadow-none`}
            >
              Confirmar resposta
            </button>
          )}

          {confirmed && !isLast && (
            <button type="button" onClick={advance} className={CTA}>
              Continuar
              <ArrowRightIcon className="size-4" />
            </button>
          )}

          {confirmed && isLast && (
            <Link
              href={`/quizzes/resultado?acertos=${correctCount}&total=${total}&praticar=${encodeURIComponent(
                weakTopics.join(","),
              )}`}
              className={CTA}
            >
              Ver resultado
              <ArrowRightIcon className="size-4" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
