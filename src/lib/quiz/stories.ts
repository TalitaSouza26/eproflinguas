/**
 * Histórias de abertura de trilha.
 *
 * Uma por trilha, não por fase: história combina com tema, e uma por fase
 * multiplicaria por quatro o custo de arte e de locução sem multiplicar o
 * aprendizado. O aluno vê quando a trilha abre.
 *
 * A história tem dois tipos de momento. O narrado leva a cena adiante; o de
 * ensino para tudo, mostra a palavra e pede que a criança repita em voz alta —
 * é o único lugar do produto onde ela **fala**, e nessa faixa produção oral
 * vem antes da leitura.
 *
 * Nem toda trilha tem história. Sem ela, a trilha abre direto na questão 1.
 *
 * TODO: as cenas ainda não têm ilustração. Cada `image` vira uma arte quando
 * o acervo existir, e a locução vira voz gravada.
 */

export type StoryBeat =
  | {
      kind: "narration";
      /** Português com os trechos em inglês entre asteriscos. */
      text: string;
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
 * Trilha "Primeiras palavras".
 *
 * A premissa faz o trabalho pesado: Ethan não fala português. O inglês não
 * aparece porque o app mandou, aparece porque é o único jeito de duas crianças
 * se entenderem — e isso uma criança de 6 anos entende de imediato.
 *
 * Ensina Hello, My name is, Good morning, Thank you, You're welcome e Goodbye.
 * "Good afternoon" e "Good night" ficam de fora de propósito: a cena é uma
 * manhã na escola, e enfiar as duas ali seria forçar. Elas aparecem nas fases.
 */
const NOVO_AMIGO: Story = {
  slug: "primeiras-palavras",
  number: 1,
  title: "Um novo amigo",
  subtitle: "Sofia vai aprender as primeiras frases em inglês junto com você.",
  cover: "/stories/novo-amigo-capa.webp",
  beats: [
    {
      kind: "narration",
      text: "Era uma manhã de aula quando Sofia chegou à escola. Perto da porta da sala, ela viu um menino que ainda não conhecia.",
    },
    {
      kind: "narration",
      text: "A professora contou que ele se chamava Ethan. Ele tinha vindo dos Estados Unidos e ainda estava aprendendo a falar português.",
    },
    {
      kind: "narration",
      text: "Sofia se aproximou e disse: — Oi! Meu nome é Sofia. Ethan sorriu e respondeu: — *Hello*, Sofia! *My name is* Ethan!",
    },
    { kind: "lesson", word: "Hello", meaning: "Oi, olá" },
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
    {
      kind: "narration",
      text: "Os dois conversaram até o sinal tocar. Ethan perguntou se podiam brincar juntos no recreio, e Sofia disse que sim. Ele ficou muito feliz: — *Thank you*, Sofia!",
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

const BY_TRACK: Record<string, Story> = { [NOVO_AMIGO.slug]: NOVO_AMIGO };

export function storyForTrack(slug: string): Story | undefined {
  return BY_TRACK[slug];
}

/** Quantas expressões a história ensina — os momentos de "repita comigo". */
export function phrasesInStory(story: Story): number {
  return story.beats.filter((b) => b.kind === "lesson").length;
}
