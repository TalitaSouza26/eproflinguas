import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * Trilha "Casa e família" — a trilha visual.
 *
 * Proposta diferente da "Primeiras palavras" de propósito: lá o aluno **ouve
 * uma história** e depois responde; aqui ele **olha e escuta**, e não há texto
 * nenhum para ler no enunciado.
 *
 * O motivo é o conteúdo, não variedade por variedade. Cumprimento não se
 * desenha — "olá" não tem figura —, então aquela trilha precisa de narrativa.
 * Já mãe, porta e cama são coisas do mundo: a figura é a definição, e enfiar
 * uma história no meio só atrasaria a criança até a palavra.
 *
 * Como funciona a fase:
 *
 * 1. **Galeria "Olha e aprende"** — as 4 palavras novas, uma por cartão, com a
 *    figura grande. É o que substitui a história.
 * 2. **Quiz** — 5 questões, todas `image_word` com duas alternativas: quatro
 *    das palavras novas e uma retomando a fase anterior.
 *
 * Tudo `image_word` porque uma criança de 6 anos ainda não lê: se o enunciado
 * fosse a palavra em português, a questão viraria um teste de leitura em vez
 * de um teste de inglês. O que a criança precisa interpretar é a figura — a
 * frase acima dela é sempre a mesma, em todas as questões da trilha, e as duas
 * alternativas ganham sentido pela figura.
 *
 * As 16 palavras são o núcleo da trilha em docs/curriculo.md, reagrupadas em
 * quatro blocos de quatro: quatro por fase é o que cabe numa sessão dessa
 * idade, e cada bloco fecha um assunto inteiro (a família, a casa, os cômodos,
 * os móveis) em vez de cortar um assunto ao meio.
 *
 * TODO: sai daqui quando o banco entrar.
 */

export type Word = {
  /** A palavra em inglês, como aparece no cartão e na alternativa. */
  en: string;
  pt: string;
  /** Figura da palavra. A mesma serve à galeria e à questão. */
  image: string;
  /** Apoio opcional do Bubo dentro da questão. */
  hint?: string;
};

export type Phase = {
  /** Assunto do bloco, mostrado na abertura da galeria. */
  title: string;
  words: Word[];
};

const img = (name: string) => `/quiz/casa-familia/${name}.webp`;

export const CASA_FAMILIA_PHASES: Phase[] = [
  {
    title: "A família",
    words: [
      { en: "Mother", pt: "mãe", image: img("mother"), hint: "Parece com “mamãe”: as duas começam com M." },
      { en: "Father", pt: "pai", image: img("father"), hint: "Está dentro de “Father’s Day”, o Dia dos Pais." },
      { en: "Sister", pt: "irmã", image: img("sister") },
      { en: "Brother", pt: "irmão", image: img("brother"), hint: "Irmão e brother terminam parecido quando a gente fala." },
    ],
  },
  {
    title: "A casa",
    words: [
      // A única figura desta trilha que já existe no acervo.
      { en: "House", pt: "casa", image: "/quiz/house.webp", hint: "Você já viu em “Full House”." },
      { en: "Family", pt: "família", image: img("family"), hint: "É quase igual em português: family, família." },
      { en: "Garden", pt: "quintal", image: img("garden") },
      { en: "Baby", pt: "bebê", image: img("baby"), hint: "Todo mundo já ouviu essa: baby, bebê." },
    ],
  },
  {
    title: "Os cômodos",
    words: [
      { en: "Kitchen", pt: "cozinha", image: img("kitchen") },
      { en: "Bedroom", pt: "quarto", image: img("bedroom"), hint: "Tem “bed”, que é cama, lá dentro." },
      { en: "Door", pt: "porta", image: img("door") },
      { en: "Window", pt: "janela", image: img("window") },
    ],
  },
  {
    title: "Os móveis",
    words: [
      { en: "Bed", pt: "cama", image: img("bed"), hint: "Três letras, e você viu no “bedroom”." },
      { en: "Table", pt: "mesa", image: img("table") },
      { en: "Chair", pt: "cadeira", image: img("chair") },
      { en: "Sofa", pt: "sofá", image: img("sofa"), hint: "É quase igual em português: sofa, sofá." },
    ],
  },
];

/**
 * Monta a questão de uma palavra.
 *
 * O distrator sai sempre do mesmo bloco: o aluno escolhe entre duas coisas da
 * casa, nunca entre uma cadeira e um cachorro — o que tornaria a questão fácil
 * por eliminação, sem ele ter aprendido nada.
 *
 * A resposta certa alterna entre a primeira e a segunda alternativa. Sempre na
 * mesma posição, a criança aprende a posição em vez da palavra.
 */
function question(id: string, word: Word, distractor: Word, correctFirst: boolean): unknown {
  const correct = { id: "a", label: word.en };
  const wrong = { id: "b", label: distractor.en };

  return {
    id,
    format: "image_word",
    topic: "Casa e família",
    prompt: "What is this?",
    promptTranslation: "O que é isto?",
    imageUrl: word.image,
    choices: correctFirst ? [correct, wrong] : [wrong, correct],
    correctChoiceId: "a",
    explanation: `${word.en} significa ${word.pt}.`,
    ...(word.hint ? { hint: word.hint } : {}),
  };
}

/**
 * As 5 questões de uma fase: as 4 palavras novas e uma da fase anterior.
 *
 * A retomada existe porque sem ela cada fase seria uma ilha — a criança
 * aprenderia "mother" e nunca mais veria a palavra até a próxima trilha. Na
 * fase 1 não há anterior, então a quinta questão repete a primeira palavra com
 * o outro distrator.
 */
function questionsFor(index: number): unknown[] {
  const { words } = CASA_FAMILIA_PHASES[index];
  const previous = CASA_FAMILIA_PHASES[index - 1]?.words;

  const novas = words.map((word, i) =>
    question(`cf${index + 1}q${i + 1}`, word, words[(i + 1) % words.length], i % 2 === 0),
  );

  const retomada = previous
    ? question(`cf${index + 1}q5`, previous[0], previous[2], false)
    : question(`cf${index + 1}q5`, words[0], words[2], false);

  return [...novas, retomada];
}

export const CASA_FAMILIA_QUIZZES = CASA_FAMILIA_PHASES.map((fase, i) => ({
  slug: "casa-familia",
  phase: i + 1,
  title: "Casa e família",
  questions: questionsFor(i).map((q) => questionSchema.parse(q)) as Question[],
}));
