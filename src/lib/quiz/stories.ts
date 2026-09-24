/**
 * Histórias de abertura de fase.
 *
 * Uma por fase, não uma por trilha: a história apresenta três expressões e o
 * quiz da mesma fase cobra essas três. Em um bloco só, a criança ouvia seis
 * palavras de uma vez e ia responder sobre a primeira quatro cenas depois —
 * distância demais para quem tem 6 anos.
 *
 * A história tem dois tipos de momento. O narrado leva a cena adiante; o de
 * ensino para tudo, mostra a palavra e pede que a criança repita em voz alta —
 * é o único lugar do produto onde ela **fala**, e nessa faixa produção oral
 * vem antes da leitura.
 *
 * Nem toda fase tem história. Sem ela, a fase abre direto na questão 1.
 *
 * TODO: só a primeira cena tem ilustração. Cada `image` vira uma arte quando o
 * acervo existir, e a locução vira voz gravada.
 */

export type StoryBeat =
  | {
      kind: "narration";
      /** Português com os trechos em inglês entre asteriscos. */
      text: string;
      /** Ilustração da cena, quando existe. Sem ela, entra só o texto. */
      image?: string;
    }
  | {
      kind: "lesson";
      /** A palavra ou expressão ensinada. */
      word: string;
      /** O que ela quer dizer, em português. */
      meaning: string;
    };

export type Story = {
  slug: string;
  /** Fase da trilha a que esta história pertence. */
  phase: number;
  /** Posição da história na trilha, mostrada na capa. */
  number: number;
  title: string;
  /** Uma linha sobre o que vai acontecer, dita na capa. */
  subtitle: string;
  /** Ilustração da capa. A cena, não o mascote. */
  cover: string;
  beats: StoryBeat[];
};

/**
 * Trilha "Primeiras palavras", fase 1.
 *
 * A premissa faz o trabalho pesado: Ethan não fala português. O inglês não
 * aparece porque o app mandou, aparece porque é o único jeito de duas crianças
 * se entenderem — e isso uma criança de 6 anos entende de imediato.
 *
 * Abre no encontro, e não na Sofia chegando à escola: assim a primeira palavra
 * em inglês chega na primeira tela, em vez de depois de duas telas de texto.
 *
 * Ensina Hello, My name is e Good morning.
 */
const NOVO_AMIGO: Story = {
  slug: "primeiras-palavras",
  phase: 1,
  number: 1,
  title: "Um novo amigo",
  subtitle: "Sofia vai aprender as primeiras frases em inglês junto com você.",
  cover: "/stories/novo-amigo-capa.webp",
  beats: [
    {
      kind: "narration",
      text: "Era uma manhã de aula. Na porta da escola, Sofia viu um menino que ainda não conhecia. Ele sorriu e acenou: — *Hello*!",
      image: "/stories/novo-amigo-hello.webp",
    },
    { kind: "lesson", word: "Hello", meaning: "Oi, olá" },
    {
      kind: "narration",
      text: "A professora contou que ele se chamava Ethan. Ele tinha vindo dos Estados Unidos e ainda estava aprendendo a falar português.",
    },
    {
      kind: "narration",
      text: "Sofia se apresentou: — Oi! Meu nome é Sofia. E ele respondeu: — *My name is* Ethan!",
    },
    { kind: "lesson", word: "My name is…", meaning: "Meu nome é…" },
    {
      kind: "narration",
      text: "Como ainda era cedo, Ethan quis saber: — Como vocês falam... *Good morning*?",
    },
    { kind: "lesson", word: "Good morning", meaning: "Bom dia" },
    {
      kind: "narration",
      text: "— Ah! Você quer dizer bom dia! — respondeu Sofia. E Ethan repetiu, contente: — *Good morning*, Sofia!",
    },
  ],
};

/**
 * Trilha "Primeiras palavras", fase 2.
 *
 * Continua o mesmo dia: o recreio e a despedida. Ensina Thank you,
 * You're welcome e Goodbye.
 */
const ATE_AMANHA: Story = {
  slug: "primeiras-palavras",
  phase: 2,
  number: 2,
  title: "Até amanhã!",
  subtitle: "No recreio, Sofia e Ethan viram amigos de verdade.",
  cover: "/stories/novo-amigo-capa.webp",
  beats: [
    {
      kind: "narration",
      text: "Na hora do recreio, Ethan dividiu o lanche dele com a Sofia e perguntou se podiam brincar juntos. Ela disse que sim, e ele ficou muito feliz: — *Thank you*, Sofia!",
    },
    { kind: "lesson", word: "Thank you", meaning: "Obrigado, obrigada" },
    {
      kind: "narration",
      text: "Sofia já sabia o que responder: — *You're welcome*, Ethan!",
    },
    { kind: "lesson", word: "You're welcome", meaning: "De nada" },
    {
      kind: "narration",
      text: "O sinal tocou. Antes de correr para a carteira, Ethan acenou: — *Goodbye*, Sofia!",
    },
    { kind: "lesson", word: "Goodbye", meaning: "Tchau" },
    {
      kind: "narration",
      text: "Sofia acenou de volta: — *Goodbye*, Ethan! E assim, com um pouquinho de português e um pouquinho de inglês, Sofia fez um novo amigo.",
    },
  ],
};

const STORIES: Story[] = [NOVO_AMIGO, ATE_AMANHA];

export function storyForTrack(slug: string, phase = 1): Story | undefined {
  return STORIES.find((s) => s.slug === slug && s.phase === phase);
}

/** Quantas expressões a história ensina — os momentos de "repita comigo". */
export function phrasesInStory(story: Story): number {
  return story.beats.filter((b) => b.kind === "lesson").length;
}
