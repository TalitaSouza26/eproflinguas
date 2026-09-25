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
  "situation_reply", // situação em português -> o que se diz em inglês
] as const;

export type QuestionFormat = (typeof QUESTION_FORMATS)[number];

/**
 * Quantas alternativas uma questão pode ter.
 *
 * Deixou de ser fixo em 4 por causa do 1º–2º ano: quatro textos em inglês são
 * ruído para quem ainda está sendo alfabetizado. Duas alternativas, porém, são
 * cara ou coroa — quem chuta acerta metade —, então a fase sobe para três
 * depois que o aluno pegou o jeito.
 */
export const MIN_CHOICES = 2;
export const MAX_CHOICES = 4;

/** Padrão das faixas que já leem. */
export const CHOICES_PER_QUESTION = MAX_CHOICES;
/**
 * Questões por fase.
 *
 * Cinco, não dez: no 1º–2º a sessão tem história antes do quiz, e atenção
 * sustentada aos 6 anos é de cinco a sete minutos. Dez perguntas depois de uma
 * história terminariam com a criança cansada — o pior jeito de terminar.
 *
 * TODO: vira um valor por faixa escolar. Das faixas que leem em diante, dez.
 */
export const QUESTIONS_PER_QUIZ = 5;

export const choiceSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1).max(80),
});

const baseQuestion = z.object({
  id: z.string().min(1),
  /** Tema da questão. Guardado na resposta para relatórios futuros. */
  topic: z.string().min(1).max(40),
  choices: z.array(choiceSchema).min(MIN_CHOICES).max(MAX_CHOICES),
  correctChoiceId: z.string().min(1),
  /** Frase curta mostrada no feedback, ex.: "House significa casa." */
  explanation: z.string().min(1).max(140),
  /** Apoio opcional do Bubo, disponível antes de confirmar. */
  hint: z.string().max(140).optional(),
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
    /**
     * Situação → o que se diz.
     *
     * Existe porque cumprimento não é substantivo desenhável: um sol na tela
     * poderia ser "sun", "day" ou "morning", e a questão teria mais de uma
     * resposta defensável. Aqui o enunciado é a situação, em português, e a
     * resposta é a fala em inglês.
     */
    baseQuestion.extend({
      format: z.literal("situation_reply"),
      /** A situação, em português. */
      prompt: z.string().min(1).max(160),
      /** O que a outra pessoa disse, quando a situação é uma conversa. */
      speakerLine: z.string().min(1).max(80).optional(),
      /** Quem falou. Sem isso, quem aparece na bolha é o Bubo. */
      speaker: z.string().min(1).max(20).optional(),
    }),
  ])
  .refine((q) => q.choices.some((c) => c.id === q.correctChoiceId), {
    message: "correctChoiceId precisa apontar para uma alternativa existente",
  })
  .refine(
    (q) => new Set(q.choices.map((c) => c.label.trim().toLowerCase())).size === q.choices.length,
    { message: "as alternativas não podem se repetir" },
  );

export type Question = z.infer<typeof questionSchema>;

/** Enunciado curto por formato, para o cabeçalho da questão. */
export const FORMAT_INSTRUCTION: Record<QuestionFormat, string> = {
  word_meaning: "O que significa esta palavra?",
  meaning_word: "Qual é a palavra em inglês?",
  sentence_gap: "Complete a frase.",
  image_word: "Qual palavra representa a imagem?",
  situation_reply: "O que você diz?",
};
