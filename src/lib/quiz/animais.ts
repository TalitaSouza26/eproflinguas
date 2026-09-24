import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Trilha "Animais" — fase 1.
 *
 * O léxico é o núcleo da trilha (docs/curriculo.md), e os distratores saem
 * todos dele: o aluno escolhe entre animais, nunca entre um animal e uma cor.
 *
 * A fase deveria ser `image_word` inteira, mas só existem duas imagens no
 * acervo. As outras oito rodam em `word_meaning` até as figuras chegarem.
 *
 * TODO: sai daqui quando o banco entrar.
 */
const RAW: unknown[] = [
  {
    id: "an1",
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
    hint: "Você já viu essa palavra em “hot dog”.",
  },
  {
    id: "an2",
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
    hint: "Tem três letras e começa com C.",
  },
  {
    id: "an3",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Bird",
    audioText: "bird",
    choices: [
      { id: "a", label: "Peixe" },
      { id: "b", label: "Pássaro" },
      { id: "c", label: "Coelho" },
      { id: "d", label: "Porco" },
    ],
    correctChoiceId: "b",
    explanation: "Bird significa pássaro.",
    hint: "Você já ouviu no nome do jogo “Angry Birds”.",
  },
  {
    id: "an4",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Fish",
    audioText: "fish",
    choices: [
      { id: "a", label: "Peixe" },
      { id: "b", label: "Pato" },
      { id: "c", label: "Vaca" },
      { id: "d", label: "Rato" },
    ],
    correctChoiceId: "a",
    explanation: "Fish significa peixe.",
    hint: "Está no nome do prato “fish and chips”.",
  },
  {
    id: "an5",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Cow",
    audioText: "cow",
    choices: [
      { id: "a", label: "Cavalo" },
      { id: "b", label: "Porco" },
      { id: "c", label: "Vaca" },
      { id: "d", label: "Gato" },
    ],
    correctChoiceId: "c",
    explanation: "Cow significa vaca.",
    hint: "Está dentro de “cowboy”, que é quem cuida do gado.",
  },
  {
    id: "an6",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Horse",
    audioText: "horse",
    choices: [
      { id: "a", label: "Cachorro" },
      { id: "b", label: "Cavalo" },
      { id: "c", label: "Pássaro" },
      { id: "d", label: "Coelho" },
    ],
    correctChoiceId: "b",
    explanation: "Horse significa cavalo.",
    hint: "Começa com H e tem cinco letras.",
  },
  {
    id: "an7",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Pig",
    audioText: "pig",
    choices: [
      { id: "a", label: "Pato" },
      { id: "b", label: "Rato" },
      { id: "c", label: "Peixe" },
      { id: "d", label: "Porco" },
    ],
    correctChoiceId: "d",
    explanation: "Pig significa porco.",
    hint: "Você já ouviu no nome da “Peppa Pig”.",
  },
  {
    id: "an8",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Duck",
    audioText: "duck",
    choices: [
      { id: "a", label: "Pato" },
      { id: "b", label: "Vaca" },
      { id: "c", label: "Cavalo" },
      { id: "d", label: "Gato" },
    ],
    correctChoiceId: "a",
    explanation: "Duck significa pato.",
    hint: "Você já ouviu no nome do “Donald Duck”.",
  },
  {
    id: "an9",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Rabbit",
    audioText: "rabbit",
    choices: [
      { id: "a", label: "Rato" },
      { id: "b", label: "Porco" },
      { id: "c", label: "Coelho" },
      { id: "d", label: "Pássaro" },
    ],
    correctChoiceId: "c",
    explanation: "Rabbit significa coelho.",
    hint: "Começa com R e tem seis letras.",
  },
  {
    id: "an10",
    format: "word_meaning",
    topic: "Animais",
    prompt: "Mouse",
    audioText: "mouse",
    choices: [
      { id: "a", label: "Cachorro" },
      { id: "b", label: "Rato" },
      { id: "c", label: "Peixe" },
      { id: "d", label: "Pato" },
    ],
    correctChoiceId: "b",
    explanation: "Mouse significa rato.",
    hint: "Você já ouviu no nome do “Mickey Mouse”.",
  },
];

export const ANIMAIS_QUESTIONS: Question[] = RAW.map((q) => questionSchema.parse(q));

export const ANIMAIS_QUIZ = {
  slug: "animais",
  title: "Animais",
  questions: ANIMAIS_QUESTIONS,
};
