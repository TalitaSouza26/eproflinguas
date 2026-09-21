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
    format: "image_word",
    topic: "Animais",
    prompt: "What animal is this?",
    promptTranslation: "Qual animal é este?",
    imageUrl: "/quiz/dog.webp",
    audioText: "dog",
    choices: [
      { id: "a", label: "Cat" },
      { id: "b", label: "Dog" },
      { id: "c", label: "Bird" },
      { id: "d", label: "Fish" },
    ],
    correctChoiceId: "b",
    explanation: "Dog significa cachorro.",
    hint: "Pense no animal que late e abana o rabo.",
  },
  {
    id: "q2",
    format: "image_word",
    topic: "Animais",
    prompt: "What animal is this?",
    promptTranslation: "Qual animal é este?",
    imageUrl: "/quiz/cat.webp",
    audioText: "cat",
    choices: [
      { id: "a", label: "Dog" },
      { id: "b", label: "Horse" },
      { id: "c", label: "Cat" },
      { id: "d", label: "Cow" },
    ],
    correctChoiceId: "c",
    explanation: "Cat significa gato.",
    hint: "É o animal que mia.",
  },
  {
    id: "q3",
    format: "image_word",
    topic: "Casa",
    prompt: "What is this?",
    promptTranslation: "O que é isto?",
    imageUrl: "/quiz/house.webp",
    audioText: "house",
    choices: [
      { id: "a", label: "School" },
      { id: "b", label: "House" },
      { id: "c", label: "Car" },
      { id: "d", label: "Tree" },
    ],
    correctChoiceId: "b",
    explanation: "House significa casa.",
    hint: "Pense no lugar onde uma família mora.",
  },
  {
    id: "q4",
    format: "image_word",
    topic: "Natureza",
    prompt: "What is this?",
    promptTranslation: "O que é isto?",
    imageUrl: "/quiz/flower.webp",
    audioText: "flower",
    choices: [
      { id: "a", label: "Tree" },
      { id: "b", label: "Grass" },
      { id: "c", label: "Flower" },
      { id: "d", label: "Leaf" },
    ],
    correctChoiceId: "c",
    explanation: "Flower significa flor.",
    hint: "Nasce no jardim e tem pétalas coloridas.",
  },
  {
    id: "q5",
    format: "word_meaning",
    topic: "Cores",
    prompt: "Blue",
    audioText: "blue",
    choices: [
      { id: "a", label: "Verde" },
      { id: "b", label: "Azul" },
      { id: "c", label: "Amarelo" },
      { id: "d", label: "Vermelho" },
    ],
    correctChoiceId: "b",
    explanation: "Blue significa azul.",
    hint: "É a cor do céu em dia limpo.",
  },
  {
    id: "q6",
    format: "word_meaning",
    topic: "Escola",
    prompt: "Teacher",
    audioText: "teacher",
    choices: [
      { id: "a", label: "Aluno" },
      { id: "b", label: "Diretor" },
      { id: "c", label: "Professor" },
      { id: "d", label: "Colega" },
    ],
    correctChoiceId: "c",
    explanation: "Teacher significa professor.",
    hint: "É quem dá a aula.",
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
    hint: "É o que se come no café da manhã com manteiga.",
  },
  {
    id: "q9",
    format: "word_meaning",
    topic: "Rotina",
    prompt: "To sleep",
    audioText: "to sleep",
    choices: [
      { id: "a", label: "Comer" },
      { id: "b", label: "Correr" },
      { id: "c", label: "Estudar" },
      { id: "d", label: "Dormir" },
    ],
    correctChoiceId: "d",
    explanation: "To sleep significa dormir.",
    hint: "É o que você faz à noite, na cama.",
  },
  {
    id: "q10",
    format: "word_meaning",
    topic: "Números",
    prompt: "Seven",
    audioText: "seven",
    choices: [
      { id: "a", label: "Cinco" },
      { id: "b", label: "Sete" },
      { id: "c", label: "Seis" },
      { id: "d", label: "Nove" },
    ],
    correctChoiceId: "b",
    explanation: "Seven significa sete.",
    hint: "É o número de dias da semana.",
  },
];

/** Valida na carga: a saída da IA passará exatamente por aqui. */
export const SEED_QUESTIONS: Question[] = RAW.map((q) => questionSchema.parse(q));

export const SEED_QUIZ = {
  slug: "vocabulario",
  title: "Quiz de Vocabulário",
  questions: SEED_QUESTIONS,
};
