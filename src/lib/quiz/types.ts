import { z } from "zod";

/**
 * Formatos de questão. A tela de quiz é construída sobre este union para que
 * novos formatos entrem sem reescrever o fluxo.
 */
export const QUESTION_FORMATS = [
  "word_meaning", // palavra em inglês -> significado em português
  "meaning_word", // significado em português -> palavra em inglês
  "sentence_gap", // completar a lacuna na frase
  "image_word", // imagem -> palavra
] as const;

export type QuestionFormat = (typeof QUESTION_FORMATS)[number];

export const CHOICES_PER_QUESTION = 4;
export const QUESTIONS_PER_QUIZ = 10;

export const choiceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(80),
});

const baseQuestion = z.object({
  id: z.string().min(1),
  /** Tema da questão, usado no resultado para apontar o que praticar mais. */
  topic: z.string().min(1).max(40),
  choices: z.array(choiceSchema).length(CHOICES_PER_QUESTION),
  correctChoiceId: z.string().min(1),
  /** Frase curta mostrada no feedback, ex.: "House significa casa." */
  explanation: z.string().min(1).max(140),
  /** Apoio opcional do Bubo, disponível antes de confirmar. */
  hint: z.string().max(140).optional(),
  /** Palavra/frase em inglês que o botão de áudio pronuncia, quando houver. */
  audioText: z.string().max(140).optional(),
  /** Tradução do enunciado, exibida abaixo dele. */
  promptTranslation: z.string().max(120).optional(),
});

/** Caminho local (/quiz/dog.webp) ou URL absoluta. */
const imagePath = z
  .string()
  .refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), "informe um caminho ou URL de imagem");

export const questionSchema = z
  .discriminatedUnion("format", [
    baseQuestion.extend({
      format: z.literal("word_meaning"),
      prompt: z.string().min(1).max(60), // a palavra em inglês
    }),
    baseQuestion.extend({
      format: z.literal("meaning_word"),
      prompt: z.string().min(1).max(60), // o significado em português
    }),
    baseQuestion.extend({
      format: z.literal("sentence_gap"),
      /** Frase com a lacuna marcada por "___". */
      prompt: z.string().min(1).max(160).regex(/___/, "a frase precisa conter ___"),
    }),
    baseQuestion.extend({
      format: z.literal("image_word"),
      prompt: z.string().min(1).max(60),
      imageUrl: imagePath,
    }),
  ])
  .refine((q) => q.choices.some((c) => c.id === q.correctChoiceId), {
    message: "correctChoiceId precisa apontar para uma alternativa existente",
  })
  .refine(
    (q) => new Set(q.choices.map((c) => c.label.trim().toLowerCase())).size === CHOICES_PER_QUESTION,
    { message: "as alternativas não podem se repetir" },
  );

export type Question = z.infer<typeof questionSchema>;

/** Enunciado curto por formato, para o cabeçalho da questão. */
export const FORMAT_INSTRUCTION: Record<QuestionFormat, string> = {
  word_meaning: "O que significa esta palavra?",
  meaning_word: "Qual é a palavra em inglês?",
  sentence_gap: "Complete a frase.",
  image_word: "Qual palavra representa a imagem?",
};
