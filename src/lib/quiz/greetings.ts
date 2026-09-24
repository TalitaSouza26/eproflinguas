import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Trilha "Primeiras palavras" — as questões de cada fase.
 *
 * Cada fase cobra **exatamente** as três expressões que a história da mesma
 * fase acabou de ensinar. Três e três, não seis de uma vez: assim a pergunta
 * vem logo depois da cena, e não quatro cenas depois.
 *
 * O formato é significado em português → palavra em inglês, com duas
 * alternativas. Duas é o que uma criança de 6 anos compara de uma vez; o risco
 * de chute é real, e o que o compensa é a fase ser curta e a história vir
 * antes.
 *
 * TODO: sai daqui quando o banco entrar; passa exatamente pelas mesmas
 * validações que a saída da IA vai passar.
 */

/** Fase 1 — o que a história "Um novo amigo" ensinou. */
const FASE_1: unknown[] = [
  {
    id: "p1q1",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Olá",
    audioText: "Hello",
    choices: [
      { id: "a", label: "Hello" },
      { id: "b", label: "Goodbye" },
    ],
    correctChoiceId: "a",
    explanation: "Hello significa olá.",
    hint: "É a primeira palavra que o Ethan falou na história.",
  },
  {
    id: "p1q2",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Meu nome é…",
    audioText: "My name is",
    choices: [
      { id: "a", label: "Good morning" },
      { id: "b", label: "My name is…" },
    ],
    correctChoiceId: "b",
    explanation: "My name is significa meu nome é.",
    hint: "Tem a palavra “name” dentro, que parece com “nome”.",
  },
  {
    id: "p1q3",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Bom dia",
    audioText: "Good morning",
    choices: [
      { id: "a", label: "Good morning" },
      { id: "b", label: "Hello" },
    ],
    correctChoiceId: "a",
    explanation: "Good morning significa bom dia.",
    hint: "Morning é a manhã: as duas começam com M.",
  },
];

/** Fase 2 — o que a história "Até amanhã!" ensinou. */
const FASE_2: unknown[] = [
  {
    id: "p2q1",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Obrigado",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "Goodbye" },
    ],
    correctChoiceId: "a",
    explanation: "Thank you significa obrigado.",
    hint: "Você já ouviu em música: “thank you” fecha quase toda canção em inglês.",
  },
  {
    id: "p2q2",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "De nada",
    audioText: "You're welcome",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "You're welcome" },
    ],
    correctChoiceId: "b",
    explanation: "You're welcome significa de nada. É a resposta do obrigado.",
    hint: "Na história, foi isso que a Sofia respondeu quando o Ethan agradeceu.",
  },
  {
    id: "p2q3",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Tchau",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Goodbye" },
      { id: "b", label: "My name is…" },
    ],
    correctChoiceId: "a",
    explanation: "Goodbye significa tchau.",
    hint: "Tem “bye” dentro, que todo mundo já disse acenando.",
  },
];

const FASES = [FASE_1, FASE_2];

export const GREETINGS_PHASES = FASES.map((fase, i) => ({
  slug: "primeiras-palavras",
  phase: i + 1,
  title: "Primeiras palavras",
  questions: fase.map((q) => questionSchema.parse(q)) as Question[],
}));
