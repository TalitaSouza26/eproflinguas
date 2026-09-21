/**
 * Currículo do 1º–2º ano em forma de dados.
 *
 * É a origem do conteúdo do banco: o script `scripts/generate-seed.mjs` lê
 * daqui e escreve as fases, questões e alternativas em `supabase/seed.sql`.
 *
 * Regras que este arquivo precisa respeitar (ver docs/curriculo.md):
 * - nenhuma palavra se repete entre trilhas;
 * - nenhuma trilha tem duas palavras com a mesma tradução, senão a questão
 *   teria duas alternativas corretas;
 * - cada trilha tem dois blocos, e cada bloco vira duas fases: primeiro
 *   reconhecer pela imagem, depois compreender a palavra escrita.
 */

export type Word = {
  /** Palavra em inglês, como aparece no enunciado. */
  en: string;
  /** Tradução, usada como alternativa e no feedback. */
  pt: string;
  /** Imagem do item. Só existe para os itens já ilustrados. */
  image?: string;
};

export type CurriculumTrack = {
  slug: string;
  title: string;
  position: number;
  blocks: [Word[], Word[]];
};

export const CURRICULUM: CurriculumTrack[] = [
  {
    slug: "casa-familia",
    title: "Casa e família",
    position: 1,
    blocks: [
      [
        { en: "mother", pt: "mãe" },
        { en: "father", pt: "pai" },
        { en: "sister", pt: "irmã" },
        { en: "brother", pt: "irmão" },
        { en: "baby", pt: "bebê" },
        { en: "family", pt: "família" },
        { en: "house", pt: "casa", image: "/quiz/house.webp" },
        { en: "garden", pt: "jardim" },
      ],
      [
        { en: "door", pt: "porta" },
        { en: "window", pt: "janela" },
        { en: "bed", pt: "cama" },
        { en: "table", pt: "mesa" },
        { en: "chair", pt: "cadeira" },
        { en: "kitchen", pt: "cozinha" },
        { en: "bedroom", pt: "quarto" },
        { en: "sofa", pt: "sofá" },
      ],
    ],
  },
  {
    slug: "escola",
    title: "Escola",
    position: 2,
    blocks: [
      [
        { en: "school", pt: "escola" },
        { en: "classroom", pt: "sala de aula" },
        { en: "teacher", pt: "professor" },
        { en: "student", pt: "aluno" },
        { en: "friend", pt: "amigo" },
        { en: "desk", pt: "carteira" },
        { en: "board", pt: "quadro" },
        { en: "bag", pt: "mochila" },
      ],
      [
        { en: "book", pt: "livro" },
        { en: "notebook", pt: "caderno" },
        { en: "pen", pt: "caneta" },
        { en: "pencil", pt: "lápis" },
        { en: "eraser", pt: "borracha" },
        { en: "ruler", pt: "régua" },
        { en: "paper", pt: "papel" },
        { en: "scissors", pt: "tesoura" },
      ],
    ],
  },
  {
    slug: "animais",
    title: "Animais",
    position: 3,
    blocks: [
      [
        { en: "dog", pt: "cachorro", image: "/quiz/dog.webp" },
        { en: "cat", pt: "gato", image: "/quiz/cat.webp" },
        { en: "bird", pt: "pássaro" },
        { en: "fish", pt: "peixe" },
        { en: "cow", pt: "vaca" },
        { en: "horse", pt: "cavalo" },
        { en: "pig", pt: "porco" },
        { en: "duck", pt: "pato" },
      ],
      [
        { en: "rabbit", pt: "coelho" },
        { en: "mouse", pt: "rato" },
        { en: "sheep", pt: "ovelha" },
        { en: "frog", pt: "sapo" },
        { en: "bee", pt: "abelha" },
        { en: "ant", pt: "formiga" },
        { en: "butterfly", pt: "borboleta" },
        { en: "turtle", pt: "tartaruga" },
      ],
    ],
  },
  {
    slug: "cores-numeros",
    title: "Cores e números",
    position: 4,
    blocks: [
      [
        { en: "red", pt: "vermelho" },
        { en: "blue", pt: "azul" },
        { en: "green", pt: "verde" },
        { en: "yellow", pt: "amarelo" },
        { en: "black", pt: "preto" },
        { en: "white", pt: "branco" },
        { en: "orange", pt: "laranja" },
        { en: "pink", pt: "rosa" },
      ],
      // Exceção do currículo: 10 itens, porque de um a dez é uma unidade só.
      [
        { en: "one", pt: "um" },
        { en: "two", pt: "dois" },
        { en: "three", pt: "três" },
        { en: "four", pt: "quatro" },
        { en: "five", pt: "cinco" },
        { en: "six", pt: "seis" },
        { en: "seven", pt: "sete" },
        { en: "eight", pt: "oito" },
        { en: "nine", pt: "nove" },
        { en: "ten", pt: "dez" },
      ],
    ],
  },
  {
    slug: "comida",
    title: "Comida",
    position: 5,
    blocks: [
      [
        { en: "bread", pt: "pão" },
        { en: "rice", pt: "arroz" },
        { en: "egg", pt: "ovo" },
        { en: "meat", pt: "carne" },
        { en: "chicken", pt: "frango" },
        { en: "cheese", pt: "queijo" },
        { en: "soup", pt: "sopa" },
        { en: "cake", pt: "bolo" },
      ],
      [
        { en: "milk", pt: "leite" },
        { en: "water", pt: "água" },
        { en: "juice", pt: "suco" },
        { en: "apple", pt: "maçã" },
        { en: "banana", pt: "banana" },
        { en: "butter", pt: "manteiga" },
        { en: "sugar", pt: "açúcar" },
        { en: "salt", pt: "sal" },
      ],
    ],
  },
];

/** Nome da insígnia e formato de cada uma das 4 fases. */
export const PHASE_PLAN = [
  { number: 1, block: 0, format: "image_word", title: "Reconhecer — parte 1" },
  { number: 2, block: 1, format: "image_word", title: "Reconhecer — parte 2" },
  { number: 3, block: 0, format: "word_meaning", title: "Compreender — parte 1" },
  { number: 4, block: 1, format: "word_meaning", title: "Compreender — parte 2" },
] as const;
