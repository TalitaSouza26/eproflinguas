import type { QuestionFormat } from "@/lib/quiz/types";

/** Faixas escolares que regem a dificuldade e os formatos de questão. */
export const GRADE_BANDS = ["1-2", "3-5", "6-7", "8-9"] as const;
export type GradeBand = (typeof GRADE_BANDS)[number];

/** Anos do Fundamental I e II aceitos no cadastro. */
export const SCHOOL_YEARS = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
export type SchoolYear = (typeof SCHOOL_YEARS)[number];

export function bandForYear(year: SchoolYear): GradeBand {
  if (year <= 2) return "1-2";
  if (year <= 5) return "3-5";
  if (year <= 7) return "6-7";
  return "8-9";
}

export const BAND_LABEL: Record<GradeBand, string> = {
  "1-2": "1º e 2º ano",
  "3-5": "3º ao 5º ano",
  "6-7": "6º e 7º ano",
  "8-9": "8º e 9º ano",
};

/** Diretriz de conteúdo por faixa, usada na UI e no prompt de geração. */
export const BAND_GUIDANCE: Record<GradeBand, string> = {
  "1-2": "Vocabulário mais simples: palavras concretas e de uso cotidiano.",
  "3-5": "Ampliação de vocabulário e combinação de formatos de questão.",
  "6-7": "Questões mais variadas, incluindo uso em contexto.",
  "8-9": "Mais peso em completar frase e interpretação de contexto.",
};

/** Formatos liberados por faixa. A UI suporta todos desde já. */
export const BAND_FORMATS: Record<GradeBand, readonly QuestionFormat[]> = {
  "1-2": ["word_meaning"],
  "3-5": ["word_meaning", "meaning_word"],
  "6-7": ["word_meaning", "meaning_word", "sentence_gap"],
  "8-9": ["word_meaning", "sentence_gap"],
};
