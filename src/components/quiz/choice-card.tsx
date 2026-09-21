"use client";

import { CheckIcon, CloseIcon } from "@/components/ui/icons";

export type ChoiceState = "default" | "selected" | "correct" | "incorrect" | "muted";

const STYLES: Record<ChoiceState, string> = {
  default: "border-ink-100 bg-white text-ink-900 hover:border-blue-200 hover:bg-blue-50/60",
  selected: "border-blue-500 bg-blue-50 text-deep-900",
  correct: "border-correct-600 bg-correct-50 text-correct-700",
  incorrect: "border-wrong-600 bg-wrong-50 text-wrong-700",
  muted: "border-ink-100 bg-white text-ink-500",
};

/**
 * Alternativa do quiz. O card inteiro é clicável e o estado nunca é
 * comunicado só por cor: acerto leva ✓ e erro leva ×.
 */
export function ChoiceCard({
  label,
  state,
  disabled,
  onSelect,
}: {
  label: string;
  state: ChoiceState;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={state === "selected"}
      className={`flex w-full items-center justify-between gap-3 rounded-2xl border-2 px-5 py-4 text-left text-[15px]
                  font-semibold transition disabled:cursor-default
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${STYLES[state]}`}
    >
      <span className="min-w-0 flex-1 text-center">{label}</span>

      {state === "selected" && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
          <CheckIcon className="size-3.5" />
        </span>
      )}
      {state === "correct" && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-correct-600 text-white">
          <CheckIcon className="size-3.5" />
          <span className="sr-only">Resposta correta</span>
        </span>
      )}
      {state === "incorrect" && (
        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-wrong-600 text-white">
          <CloseIcon className="size-3.5" />
          <span className="sr-only">Resposta incorreta</span>
        </span>
      )}
    </button>
  );
}
