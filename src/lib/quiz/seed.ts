import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Quiz de exemplo.
 *
 * TODO: substituir pela geração por IA (rota de servidor + cache em
 * `generated_questions`). As questões abaixo existem só para montar a tela e
 * passam pelas mesmas validações que a saída da IA vai passar.
 */
const RAW: unknown[] = [
  {
    id: "q1",
    format: "word_meaning",
    topic: "Escola",
    prompt: "Book",
    choices: [
      { id: "a", label: "Caderno" },
      { id: "b", label: "Livro" },
      { id: "c", label: "Mochila" },
      { id: "d", label: "Lápis" },
    ],
    correctChoiceId: "b",
    explanation: "Book significa livro.",
    hint: "Está dentro de “Facebook” e de “notebook”.",
  },
  {
    id: "q2",
    format: "word_meaning",
    topic: "Escola",
    prompt: "Pencil",
    choices: [
      { id: "a", label: "Borracha" },
      { id: "b", label: "Régua" },
      { id: "c", label: "Lápis" },
      { id: "d", label: "Caneta" },
    ],
    correctChoiceId: "c",
    explanation: "Pencil significa lápis.",
    hint: "Parece com “pincel” e começa com P.",
  },
  {
    id: "q3",
    format: "image_word",
    topic: "Casa",
    prompt: "What is this?",
    promptTranslation: "O que é isto?",
    imageUrl: "/quiz/house.webp",
    choices: [
      { id: "a", label: "School" },
      { id: "b", label: "House" },
      { id: "c", label: "Car" },
      { id: "d", label: "Tree" },
    ],
    correctChoiceId: "b",
    explanation: "House significa casa.",
    hint: "Começa com H e tem cinco letras.",
  },
  {
    id: "q4",
    format: "image_word",
    topic: "Natureza",
    prompt: "What is this?",
    promptTranslation: "O que é isto?",
    imageUrl: "/quiz/flower.webp",
    choices: [
      { id: "a", label: "Tree" },
      { id: "b", label: "Grass" },
      { id: "c", label: "Flower" },
      { id: "d", label: "Leaf" },
    ],
    correctChoiceId: "c",
    explanation: "Flower significa flor.",
    hint: "Parece com “flor” e começa com F.",
  },
  {
    id: "q5",
    format: "word_meaning",
    topic: "Cores",
    prompt: "Blue",
    choices: [
      { id: "a", label: "Verde" },
      { id: "b", label: "Azul" },
      { id: "c", label: "Amarelo" },
      { id: "d", label: "Vermelho" },
    ],
    correctChoiceId: "b",
    explanation: "Blue significa azul.",
    hint: "Você já ouviu em “blue jeans”.",
  },
  {
    id: "q6",
    format: "word_meaning",
    topic: "Escola",
    prompt: "Teacher",
    choices: [
      { id: "a", label: "Aluno" },
      { id: "b", label: "Diretor" },
      { id: "c", label: "Professor" },
      { id: "d", label: "Colega" },
    ],
    correctChoiceId: "c",
    explanation: "Teacher significa professor.",
    hint: "Vem de “to teach”, que é ensinar.",
  },
  {
    id: "q7",
    format: "meaning_word",
    topic: "Família",
    prompt: "Mãe",
    choices: [
      { id: "a", label: "Sister" },
      { id: "b", label: "Aunt" },
      { id: "c", label: "Mother" },
      { id: "d", label: "Daughter" },
    ],
    correctChoiceId: "c",
    explanation: "Mãe em inglês é mother.",
    hint: "Começa com a mesma letra de mamãe.",
  },
  {
    id: "q8",
    format: "meaning_word",
    topic: "Comida",
    prompt: "Pão",
    choices: [
      { id: "a", label: "Bread" },
      { id: "b", label: "Butter" },
      { id: "c", label: "Cheese" },
      { id: "d", label: "Milk" },
    ],
    correctChoiceId: "a",
    explanation: "Pão em inglês é bread.",
    hint: "Começa com B e tem cinco letras.",
  },
  {
    id: "q9",
    format: "word_meaning",
    topic: "Rotina",
    prompt: "To sleep",
    choices: [
      { id: "a", label: "Comer" },
      { id: "b", label: "Correr" },
      { id: "c", label: "Estudar" },
      { id: "d", label: "Dormir" },
    ],
    correctChoiceId: "d",
    explanation: "To sleep significa dormir.",
    hint: "Está em “sleeping bag”, o saco de dormir.",
  },
  {
    id: "q10",
    format: "word_meaning",
    topic: "Números",
    prompt: "Seven",
    choices: [
      { id: "a", label: "Cinco" },
      { id: "b", label: "Sete" },
      { id: "c", label: "Seis" },
      { id: "d", label: "Nove" },
    ],
    correctChoiceId: "b",
    explanation: "Seven significa sete.",
    hint: "Parece com “sete” e começa com S.",
  },
];

/** Valida na carga: a saída da IA passará exatamente por aqui. */
export const SEED_QUESTIONS: Question[] = RAW.map((q) => questionSchema.parse(q));

export const SEED_QUIZ = {
  slug: "vocabulario",
  title: "Quiz de Vocabulário",
  questions: SEED_QUESTIONS,
};
