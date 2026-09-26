/**
 * Divisão do aluno.
 *
 * Um trilho só, medido em palavras aprendidas. Conta como aprendida a
 * expressão ensinada numa fase concluída.
 *
 * A escada é uma lista ordenada de propósito: para acrescentar níveis basta
 * incluir itens no fim, sem tocar em nenhuma tela.
 *
 * ATENÇÃO: a Bronze I está em 3 palavras porque é o que a primeira fase
 * ensina — ela cai junto com a conquista "Primeiro passo", no fim do primeiro
 * quiz. É de propósito: a escada precisa dar sinal de vida logo, senão o aluno
 * passa a trilha inteira vendo um emblema apagado.
 *
 * Os degraus seguintes (50, 100, 200, 400) foram pensados quando uma trilha
 * tinha 16 palavras de núcleo; com o conteúdo atual do 1º–2º eles ficaram
 * longe demais e precisam ser recalibrados.
 */

export type Divisao = {
  id: string;
  name: string;
  /** Palavras aprendidas necessárias para alcançar. */
  words: number;
  image: string;
  /**
   * Cores do metal da divisão, amostradas do próprio emblema.
   *
   * A escada é uma fileira de cinco cards, e sem isso todos ficam iguais —
   * o aluno precisa distinguir onde está de relance, não lendo o nome.
   */
  tint: {
    /** Traço mais escuro: fios, bordas. */
    from: string;
    /** Brilho, usado no halo atrás do emblema. */
    to: string;
    /** Fundo pálido de selo e etiqueta. */
    soft: string;
    /** Texto sobre o fundo pálido. */
    ink: string;
  };
};

export const DIVISOES: Divisao[] = [
  {
    id: "bronze-1",
    name: "Bronze I",
    words: 3,
    image: "/badges/bronze-1-v2.webp",
    tint: { from: "#c25a1c", to: "#f0a05c", soft: "#fdefe4", ink: "#8a3c10" },
  },
  {
    id: "bronze-2",
    name: "Bronze II",
    words: 50,
    image: "/badges/bronze-2-v2.webp",
    tint: { from: "#a84818", to: "#e08a48", soft: "#fbece1", ink: "#7a3210" },
  },
  {
    id: "prata",
    name: "Prata",
    words: 100,
    image: "/badges/prata-v2.webp",
    tint: { from: "#7a8ba8", to: "#dfe6f4", soft: "#f2f5fb", ink: "#44506a" },
  },
  {
    id: "ouro",
    name: "Ouro",
    words: 200,
    image: "/badges/ouro-v2.webp",
    tint: { from: "#d99a00", to: "#ffd848", soft: "#fff6dc", ink: "#8a6100" },
  },
  {
    id: "diamante",
    name: "Diamante",
    words: 400,
    image: "/badges/diamante-v2.webp",
    tint: { from: "#0060f0", to: "#bfe9ff", soft: "#e9f6ff", ink: "#12406f" },
  },
];

export type DivisaoStanding = {
  /** Índice da divisão atual, ou -1 se ainda não alcançou a primeira. */
  index: number;
  current: Divisao | null;
  next: Divisao | null;
  /** Palavras que faltam para a próxima. */
  toNext: number;
  /** Avanço dentro da divisão atual, de 0 a 100. */
  percent: number;
};

/** Onde o aluno está na escada, dado quanto ele já aprendeu. */
export function divisaoFor(words: number): DivisaoStanding {
  const index = DIVISOES.reduce((found, p, i) => (words >= p.words ? i : found), -1);
  const current = index >= 0 ? DIVISOES[index] : null;
  const next = DIVISOES[index + 1] ?? null;

  if (!next) return { index, current, next, toNext: 0, percent: 100 };

  const floor = current?.words ?? 0;
  const span = next.words - floor;

  return {
    index,
    current,
    next,
    toNext: Math.max(0, next.words - words),
    percent: span > 0 ? Math.min(100, Math.round(((words - floor) / span) * 100)) : 0,
  };
}
