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
 * TODO: falta a ilustração do fecho da fase 3. Cada `image` vira uma arte
 * quando ela existir, e a locução vira voz gravada.
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
      image: "/stories/novo-amigo-professora.webp",
    },
    {
      kind: "narration",
      text: "Sofia se apresentou: — Oi! Meu nome é Sofia. E ele respondeu: — *My name is* Ethan!",
      image: "/stories/novo-amigo-nome.webp",
    },
    { kind: "lesson", word: "My name is…", meaning: "Meu nome é…" },
    {
      kind: "narration",
      text: "Como ainda era cedo, Ethan quis saber: — Como vocês falam... *Good morning*?",
      image: "/stories/novo-amigo-bomdia.webp",
    },
    { kind: "lesson", word: "Good morning", meaning: "Bom dia" },
    {
      kind: "narration",
      text: "— Ah! Você quer dizer bom dia! — respondeu Sofia. E Ethan repetiu, contente: — *Good morning*, Sofia!",
      image: "/stories/novo-amigo-bom-dia-resposta.webp",
    },
  ],
};

/**
 * Fase 2 — o recreio.
 *
 * O trio é o da boa educação, e ele se encadeia sozinho: pedir, agradecer,
 * responder ao agradecimento. Ensina Please, Thank you e You're welcome.
 */
const NO_RECREIO: Story = {
  slug: "primeiras-palavras",
  phase: 2,
  number: 2,
  title: "No recreio",
  subtitle: "Ethan precisa de ajuda e Sofia aprende a ser educada em inglês.",
  cover: "/stories/recreio-brincar.webp",
  beats: [
    {
      kind: "narration",
      text: "No recreio, Ethan precisava de uma borracha. Ele apontou para a da Sofia e pediu: — *Please*?",
      image: "/stories/recreio-please.webp",
    },
    { kind: "lesson", word: "Please", meaning: "Por favor" },
    {
      kind: "narration",
      text: "Sofia emprestou na hora. Ethan sorriu e disse: — *Thank you*, Sofia!",
      image: "/stories/recreio-thank-you.webp",
    },
    { kind: "lesson", word: "Thank you", meaning: "Obrigado, obrigada" },
    {
      kind: "narration",
      text: "— De nada! — respondeu Sofia. Aí ela lembrou como se fala em inglês: — *You're welcome*!",
      image: "/stories/recreio-de-nada.webp",
    },
    { kind: "lesson", word: "You're welcome", meaning: "De nada" },
    {
      kind: "narration",
      text: "Os dois terminaram o dever juntos e ainda deu tempo de brincar antes do sinal.",
      image: "/stories/recreio-brincar.webp",
    },
  ],
};

/**
 * Fase 3 — o fim do dia.
 *
 * Fecha o dia inteiro: o esbarrão, a despedida na porta e a hora de dormir.
 * Ensina Sorry, Goodbye e Good night.
 */
const ATE_AMANHA: Story = {
  slug: "primeiras-palavras",
  phase: 3,
  number: 3,
  title: "Até amanhã!",
  subtitle: "O dia acaba, e Sofia se despede do novo amigo.",
  cover: "/stories/ate-amanha-goodbye.webp",
  beats: [
    {
      kind: "narration",
      text: "Correndo para a fila, Sofia esbarrou sem querer no Ethan. Ela parou na hora e disse: — *Sorry*!",
      image: "/stories/ate-amanha-sorry.webp",
    },
    { kind: "lesson", word: "Sorry", meaning: "Desculpa" },
    {
      kind: "narration",
      text: "— Tudo bem! — riu Ethan. O sinal tocou, e na porta da escola ele acenou: — *Goodbye*, Sofia!",
      image: "/stories/ate-amanha-goodbye.webp",
    },
    { kind: "lesson", word: "Goodbye", meaning: "Tchau" },
    {
      kind: "narration",
      text: "À noite, Sofia contou tudo para a mãe e aprendeu mais uma: em inglês, boa noite é *Good night*.",
      image: "/stories/ate-amanha-good-night.webp",
    },
    { kind: "lesson", word: "Good night", meaning: "Boa noite" },
    {
      kind: "narration",
      text: "E assim, com um pouquinho de português e um pouquinho de inglês, Sofia fez um novo amigo.",
    },
  ],
};

const STORIES: Story[] = [NOVO_AMIGO, NO_RECREIO, ATE_AMANHA];

export function storyForTrack(slug: string, phase = 1): Story | undefined {
  return STORIES.find((s) => s.slug === slug && s.phase === phase);
}

/**
 * A fase é a revisão que fecha uma trilha contada por histórias.
 *
 * Não tem história própria — ela repassa o que as outras ensinaram —, mas
 * também não pode começar fria: é a única em que a criança cairia direto numa
 * pergunta, e ainda por cima numa fase três vezes mais longa.
 */
export function isReviewPhase(slug: string, phase: number): boolean {
  return !storyForTrack(slug, phase) && Boolean(storyForTrack(slug, 1));
}

/** A fase abre com uma tela do Bubo antes do quiz. */
export function hasIntro(slug: string, phase: number): boolean {
  return Boolean(storyForTrack(slug, phase)) || isReviewPhase(slug, phase);
}

/** Quantas expressões a história ensina — os momentos de "repita comigo". */
export function phrasesInStory(story: Story): number {
  return story.beats.filter((b) => b.kind === "lesson").length;
}
