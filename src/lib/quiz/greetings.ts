import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Trilha "Primeiras palavras" — as questões de cada fase.
 *
 * As fases 1 a 3 cobram **exatamente** as três expressões que a história da
 * mesma fase acabou de ensinar. Três e três: a pergunta vem logo depois da
 * cena, e não seis cenas depois.
 *
 * A fase 4 não tem história. É a revisão que fecha a trilha: as nove
 * expressões, uma questão cada. Sem história para dividir o tempo, cabem as
 * nove e o aluno sai tendo revisto tudo.
 *
 * O formato é significado em português → palavra em inglês, com duas
 * alternativas. Duas é o que uma criança de 6 anos compara de uma vez; o risco
 * de chute existe, e o que o compensa é a fase ser curta e a história vir
 * antes.
 *
 * O distrator sai sempre deste mesmo léxico e nunca tem a mesma tradução da
 * resposta — senão a questão teria duas alternativas defensáveis.
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
      { id: "b", label: "My name is…" },
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
      { id: "a", label: "Hello" },
      { id: "b", label: "Good morning" },
    ],
    correctChoiceId: "b",
    explanation: "Good morning significa bom dia.",
    hint: "Morning é a manhã: as duas começam com M.",
  },
];

/** Fase 2 — o que a história "No recreio" ensinou. */
const FASE_2: unknown[] = [
  {
    id: "p2q1",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Por favor",
    audioText: "Please",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "Please" },
    ],
    correctChoiceId: "b",
    explanation: "Please significa por favor.",
    hint: "É a palavra do “por favor” nos desenhos em inglês.",
  },
  {
    id: "p2q2",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Obrigado",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "You're welcome" },
    ],
    correctChoiceId: "a",
    explanation: "Thank you significa obrigado.",
    hint: "Você já ouviu em música: “thank you” fecha quase toda canção em inglês.",
  },
  {
    id: "p2q3",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "De nada",
    audioText: "You're welcome",
    choices: [
      { id: "a", label: "You're welcome" },
      { id: "b", label: "Please" },
    ],
    correctChoiceId: "a",
    explanation: "You're welcome significa de nada. É a resposta do obrigado.",
    hint: "Na história, foi isso que a Sofia respondeu ao “thank you”.",
  },
];

/** Fase 3 — o que a história "Até amanhã!" ensinou. */
const FASE_3: unknown[] = [
  {
    id: "p3q1",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Desculpa",
    audioText: "Sorry",
    choices: [
      { id: "a", label: "Sorry" },
      { id: "b", label: "Goodbye" },
    ],
    correctChoiceId: "a",
    explanation: "Sorry significa desculpa.",
    hint: "Começa com S e é o que se diz quando a gente pisa no pé de alguém.",
  },
  {
    id: "p3q2",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Tchau",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Good night" },
      { id: "b", label: "Goodbye" },
    ],
    correctChoiceId: "b",
    explanation: "Goodbye significa tchau.",
    hint: "Tem “bye” dentro, que todo mundo já disse acenando.",
  },
  {
    id: "p3q3",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Boa noite",
    audioText: "Good night",
    choices: [
      { id: "a", label: "Sorry" },
      { id: "b", label: "Good night" },
    ],
    correctChoiceId: "b",
    explanation: "Good night significa boa noite, na hora de dormir.",
    hint: "Night é a noite: aparece no fim dos desenhos, na hora de dormir.",
  },
];

/** Fase 4 — revisão das nove expressões da trilha. */
const REVISAO: unknown[] = [
  {
    id: "rvq1",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Olá",
    audioText: "Hello",
    choices: [
      { id: "a", label: "Hello" },
      { id: "b", label: "Thank you" },
    ],
    correctChoiceId: "a",
    explanation: "Hello significa olá.",
    hint: "É a primeira palavra que o Ethan falou na história.",
  },
  {
    id: "rvq2",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Meu nome é…",
    audioText: "My name is",
    choices: [
      { id: "a", label: "Good night" },
      { id: "b", label: "My name is…" },
    ],
    correctChoiceId: "b",
    explanation: "My name is significa meu nome é.",
    hint: "Tem a palavra “name” dentro, que parece com “nome”.",
  },
  {
    id: "rvq3",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Bom dia",
    audioText: "Good morning",
    choices: [
      { id: "a", label: "Good morning" },
      { id: "b", label: "Thank you" },
    ],
    correctChoiceId: "a",
    explanation: "Good morning significa bom dia.",
    hint: "Morning é a manhã: as duas começam com M.",
  },
  {
    id: "rvq4",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Por favor",
    audioText: "Please",
    choices: [
      { id: "a", label: "Good night" },
      { id: "b", label: "Please" },
    ],
    correctChoiceId: "b",
    explanation: "Please significa por favor.",
    hint: "É a palavra do “por favor” nos desenhos em inglês.",
  },
  {
    id: "rvq5",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Obrigado",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Please" },
      { id: "b", label: "Thank you" },
    ],
    correctChoiceId: "b",
    explanation: "Thank you significa obrigado.",
    hint: "Você já ouviu em música: “thank you” fecha quase toda canção em inglês.",
  },
  {
    id: "rvq6",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "De nada",
    audioText: "You're welcome",
    choices: [
      { id: "a", label: "You're welcome" },
      { id: "b", label: "Good night" },
    ],
    correctChoiceId: "a",
    explanation: "You're welcome significa de nada. É a resposta do obrigado.",
    hint: "Na história, foi isso que a Sofia respondeu ao “thank you”.",
  },
  {
    id: "rvq7",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Desculpa",
    audioText: "Sorry",
    choices: [
      { id: "a", label: "Sorry" },
      { id: "b", label: "Please" },
    ],
    correctChoiceId: "a",
    explanation: "Sorry significa desculpa.",
    hint: "Começa com S e é o que se diz quando a gente pisa no pé de alguém.",
  },
  {
    id: "rvq8",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Tchau",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Goodbye" },
      { id: "b", label: "Good night" },
    ],
    correctChoiceId: "a",
    explanation: "Goodbye significa tchau.",
    hint: "Tem “bye” dentro, que todo mundo já disse acenando.",
  },
  {
    id: "rvq9",
    format: "meaning_word",
    topic: "Primeiras palavras",
    prompt: "Boa noite",
    audioText: "Good night",
    choices: [
      { id: "a", label: "Good night" },
      { id: "b", label: "Please" },
    ],
    correctChoiceId: "a",
    explanation: "Good night significa boa noite, na hora de dormir.",
    hint: "Night é a noite: aparece no fim dos desenhos, na hora de dormir.",
  },
];

const FASES = [FASE_1, FASE_2, FASE_3, REVISAO];

export const GREETINGS_PHASES = FASES.map((fase, i) => ({
  slug: "primeiras-palavras",
  phase: i + 1,
  title: "Primeiras palavras",
  questions: fase.map((q) => questionSchema.parse(q)) as Question[],
}));
