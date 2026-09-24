import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Fase 1 da trilha "Primeiras palavras" — o quiz que vem logo depois da
 * história "Um novo amigo".
 *
 * Cobra **exatamente** as seis expressões que a história ensinou: Hello,
 * My name is, Good morning, Thank you, You're welcome e Goodbye. Nem uma a
 * mais. Antes ele pedia Please, Sorry, Good afternoon e Good night, que a
 * história nunca mostrou — e aí a criança saía de uma aula para uma prova de
 * outro assunto.
 *
 * As cenas continuam a história, com a Sofia e o Ethan. Metade é conversa: o
 * Ethan fala e o aluno responde por ela. É o mesmo mundo, e não uma lista de
 * situações abstratas com gente sem nome.
 *
 * A fase usa as cinco primeiras da lista (ver QUESTIONS_PER_QUIZ); as outras
 * cinco ficam escritas esperando a fase 2. Por isso a ordem importa: as cinco
 * de cima cobrem uma expressão cada — Hello, Good morning, Thank you,
 * You're welcome e Goodbye. "My name is" fica para a fase seguinte, por ser
 * frase e não palavra solta.
 *
 * A fase sobe de duas alternativas para três na metade. Duas é o que uma
 * criança de 6 anos compara de uma vez, mas duas para sempre seria cara ou
 * coroa: quem chuta acertaria metade da fase.
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
    topic: "Primeiras palavras",
    prompt: "O Ethan chegou perto da Sofia. O que ela responde?",
    speaker: "Ethan",
    speakerLine: "Hello!",
    audioText: "Hello",
    choices: [
      { id: "a", label: "Hello!" },
      { id: "b", label: "Goodbye!" },
    ],
    correctChoiceId: "a",
    explanation: "Hello é oi. Foi assim que eles se conheceram na história.",
    hint: "Responda a mesma coisa que ele disse.",
  },
  {
    id: "g2",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "É de manhã e a Sofia encontra o Ethan no portão da escola.",
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
    id: "g5",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "No recreio, o Ethan divide o lanche dele com a Sofia.",
    audioText: "Thank you",
    choices: [
      { id: "a", label: "Thank you" },
      { id: "b", label: "Good morning" },
      { id: "c", label: "My name is Sofia" },
    ],
    correctChoiceId: "a",
    explanation: "Thank you é obrigada.",
    hint: "Você já ouviu em música: “thank you” fecha quase toda canção em inglês.",
  },
  {
    id: "g6",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "A Sofia emprestou a borracha dela. O Ethan agradeceu. O que ela responde?",
    speaker: "Ethan",
    speakerLine: "Thank you!",
    audioText: "You're welcome",
    choices: [
      { id: "a", label: "Hello!" },
      { id: "b", label: "You're welcome!" },
      { id: "c", label: "Good morning!" },
    ],
    correctChoiceId: "b",
    explanation: "You're welcome é de nada. É o que se responde a um obrigado.",
    hint: "Na história, foi isso que a Sofia respondeu quando ele agradeceu.",
  },
  {
    id: "g7",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "O sinal tocou. O Ethan vai para a carteira dele e acena.",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Good morning" },
      { id: "b", label: "Hello" },
      { id: "c", label: "Goodbye" },
    ],
    correctChoiceId: "c",
    explanation: "Goodbye é tchau.",
    hint: "Tem “bye” dentro, que todo mundo já disse acenando.",
  },
  {
    id: "g3",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "O Ethan cumprimentou a Sofia. O que ela responde?",
    speaker: "Ethan",
    speakerLine: "Good morning!",
    audioText: "Good morning",
    choices: [
      { id: "a", label: "Good morning!" },
      { id: "b", label: "Thank you!" },
    ],
    correctChoiceId: "a",
    explanation: "Bom dia se responde com bom dia: Good morning!",
    hint: "Na história, o Ethan disse isso e a Sofia devolveu igual.",
  },
  {
    id: "g4",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "A Sofia quer dizer o nome dela para o Ethan.",
    audioText: "My name is Sofia",
    choices: [
      { id: "a", label: "Thank you, Sofia" },
      { id: "b", label: "My name is Sofia" },
      { id: "c", label: "Goodbye, Sofia" },
    ],
    correctChoiceId: "b",
    explanation: "My name is quer dizer meu nome é.",
    hint: "Tem a palavra “name” dentro, que parece com “nome”.",
  },
  {
    id: "g8",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "O Ethan está indo embora. O que a Sofia responde?",
    speaker: "Ethan",
    speakerLine: "Goodbye!",
    audioText: "Goodbye",
    choices: [
      { id: "a", label: "Goodbye!" },
      { id: "b", label: "Good morning!" },
      { id: "c", label: "You're welcome!" },
    ],
    correctChoiceId: "a",
    explanation: "Despedida se responde com despedida: Goodbye!",
    hint: "Ele está se despedindo. Faça o mesmo.",
  },
  {
    id: "g9",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "No dia seguinte, a Sofia vê o Ethan de longe e acena para ele.",
    audioText: "Hello",
    choices: [
      { id: "a", label: "Goodbye" },
      { id: "b", label: "Hello" },
      { id: "c", label: "Thank you" },
    ],
    correctChoiceId: "b",
    explanation: "Hello é oi, para quando você chega ou encontra alguém.",
    hint: "É a primeira palavra que o Ethan falou na história.",
  },
  {
    id: "g10",
    format: "situation_reply",
    topic: "Primeiras palavras",
    prompt: "A Sofia ajudou o Ethan a achar a sala. O que ela responde para ele?",
    speaker: "Ethan",
    speakerLine: "Thank you, Sofia!",
    audioText: "You're welcome",
    choices: [
      { id: "a", label: "My name is Sofia!" },
      { id: "b", label: "Good morning!" },
      { id: "c", label: "You're welcome!" },
    ],
    correctChoiceId: "c",
    explanation: "You're welcome é de nada. Agora vocês já sabem conversar!",
    hint: "É o par do “thank you”: um agradece, o outro responde.",
  },
];

export const GREETINGS_QUESTIONS: Question[] = RAW.map((q) => questionSchema.parse(q));

export const GREETINGS_QUIZ = {
  slug: "primeiras-palavras",
  title: "Primeiras palavras",
  questions: GREETINGS_QUESTIONS,
};
