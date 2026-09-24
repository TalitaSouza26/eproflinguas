import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Fase 1 da trilha "Falando com pessoas" — a primeira coisa que o aluno joga.
 *
 * Seis expressões, dez questões: a mesma fala volta em situações diferentes,
 * que é como cumprimento se aprende. Repetir "Good morning" em dois momentos
 * do dia não é a mesma questão duas vezes.
 *
 * A fase sobe de duas alternativas para três na metade. Duas é o que uma
 * criança de 6 anos consegue comparar de uma vez, mas duas para sempre seria
 * cara ou coroa: quem chuta acertaria metade da fase.
 *
 * A primeira é de graça de propósito. Como o quiz responde no toque, o aluno
 * precisa descobrir isso em algum lugar, e o melhor lugar é onde errar não
 * custa nada.
 *
 * TODO: sai daqui quando o banco entrar; passa exatamente pelas mesmas
 * validações que a saída da IA vai passar.
 */
const RAW: unknown[] = [
  {
    id: "g1",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "O Bubo chegou para falar com você. O que você responde?",
    speakerLine: "Hello!",
    audioText: "Hello",
    choices: [
      { id: "a", label: "Hello!" },
      { id: "b", label: "Goodbye!" },
    ],
    correctChoiceId: "a",
    explanation: "Hello é oi. Quando alguém diz Hello, você responde Hello.",
    hint: "Responda a mesma coisa que ele disse.",
  },
  {
    id: "g2",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Você chega na escola às sete da manhã e encontra a professora.",
    audioText: "Good morning",
    choices: [
      { id: "a", label: "Good night" },
      { id: "b", label: "Good morning" },
    ],
    correctChoiceId: "b",
    explanation: "Good morning é bom dia. Morning é a manhã.",
    hint: "Morning é parente de “manhã”: as duas começam com M.",
  },
  {
    id: "g3",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Sua colega te empresta o lápis dela.",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Please" },
      { id: "b", label: "Thank you" },
    ],
    correctChoiceId: "b",
    explanation: "Thank you é obrigado.",
    hint: "Você já ouviu em música: “thank you” fecha quase toda canção em inglês.",
  },
  {
    id: "g4",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "É depois do almoço e você encontra o seu amigo.",
    audioText: "Good afternoon",
    choices: [
      { id: "a", label: "Good morning" },
      { id: "b", label: "Good afternoon" },
      { id: "c", label: "Good night" },
    ],
    correctChoiceId: "b",
    explanation: "Good afternoon é boa tarde. Afternoon é depois (after) do meio-dia (noon).",
    hint: "Tem “after” dentro, que é depois: depois do meio-dia.",
  },
  {
    id: "g5",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Você quer pedir água para a sua mãe. Qual palavra deixa o pedido educado?",
    audioText: "Please",
    choices: [
      { id: "a", label: "Please" },
      { id: "b", label: "Thank you" },
      { id: "c", label: "Sorry" },
    ],
    correctChoiceId: "a",
    explanation: "Please é por favor.",
    hint: "É a palavra do “por favor” nos desenhos em inglês.",
  },
  {
    id: "g6",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Você esbarrou sem querer na sua colega.",
    audioText: "Sorry",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "Hello" },
      { id: "c", label: "Sorry" },
    ],
    correctChoiceId: "c",
    explanation: "Sorry é desculpa.",
    hint: "Começa com S e é o que se diz quando a gente pisa no pé de alguém.",
  },
  {
    id: "g7",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "A aula acabou e você está indo embora.",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Hello" },
      { id: "b", label: "Please" },
      { id: "c", label: "Goodbye" },
    ],
    correctChoiceId: "c",
    explanation: "Goodbye é tchau.",
    hint: "Tem “bye” dentro, que todo mundo já disse acenando.",
  },
  {
    id: "g8",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Você ajudou o Bubo e ele agradeceu. O que você responde?",
    speakerLine: "Thank you!",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Thank you!" },
      { id: "b", label: "Sorry!" },
      { id: "c", label: "Hello!" },
    ],
    correctChoiceId: "a",
    explanation: "Responder Thank you também funciona: os dois agradecem.",
    hint: "Ele agradeceu você. Agradeça de volta.",
  },
  {
    id: "g9",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "Está na hora de dormir e você se despede dos seus pais.",
    audioText: "Good night",
    choices: [
      { id: "a", label: "Good afternoon" },
      { id: "b", label: "Good night" },
      { id: "c", label: "Good morning" },
    ],
    correctChoiceId: "b",
    explanation: "Good night é boa noite, dita na hora de dormir.",
    hint: "Night é a noite: aparece em “good night” no fim dos desenhos.",
  },
  {
    id: "g10",
    format: "situation_reply",
    topic: "Falando com pessoas",
    prompt: "O Bubo se despede de você no fim do quiz. O que você responde?",
    speakerLine: "Goodbye!",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Good morning!" },
      { id: "b", label: "Goodbye!" },
      { id: "c", label: "Thank you!" },
    ],
    correctChoiceId: "b",
    explanation: "Goodbye responde Goodbye. Até a próxima fase!",
    hint: "Despedida se responde com despedida.",
  },
];

export const GREETINGS_QUESTIONS: Question[] = RAW.map((q) => questionSchema.parse(q));

export const GREETINGS_QUIZ = {
  slug: "falando-com-pessoas",
  title: "Falando com pessoas",
  questions: GREETINGS_QUESTIONS,
};
