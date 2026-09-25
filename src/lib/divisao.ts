/**
 * Divisão do aluno.
 *
 * Um trilho só, medido em palavras aprendidas. Conta como aprendida a
 * expressão ensinada numa fase concluída.
 *
 * A escada é uma lista ordenada de propósito: para acrescentar níveis basta
 * incluir itens no fim, sem tocar em nenhuma tela.
 *
 * ATENÇÃO: a Bronze I está em 9 palavras porque é o que a trilha "Primeiras
 * palavras" inteira ensina — a primeira divisão cai exatamente ao fechar a
 * primeira trilha. Os degraus seguintes (50, 100, 200, 400) foram pensados
 * quando uma trilha tinha 16 palavras de núcleo; com o conteúdo atual do
 * 1º–2º eles ficaram longe demais e precisam ser recalibrados.
 */

export type Divisao = {
  id: string;
  name: string;
  /** Palavras aprendidas necessárias para alcançar. */
  words: number;
  image: string;
  /**
   * Cores do metal da divisão, tiradas do próprio emblema.
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
    words: 9,
    image: "/badges/bronze-1.webp",
    tint: { from: "#a85d33", to: "#e8a878", soft: "#fbeee5", ink: "#7a3f1d" },
  },
  {
    id: "bronze-2",
    name: "Bronze II",
    words: 50,
    image: "/badges/bronze-2.webp",
    tint: { from: "#8d6a3f", to: "#f0cf9b", soft: "#fbf3e6", ink: "#6b4a22" },
  },
  {
    id: "prata",
    name: "Prata",
    words: 100,
    image: "/badges/prata.webp",
    tint: { from: "#6f7e96", to: "#dbe6f2", soft: "#f1f5fa", ink: "#3e4a5e" },
  },
  {
    id: "ouro",
    name: "Ouro",
    words: 200,
    image: "/badges/ouro.webp",
    tint: { from: "#c08a12", to: "#ffd87c", soft: "#fff6e0", ink: "#7a5406" },
  },
  {
    id: "diamante",
    name: "Diamante",
    words: 400,
    image: "/badges/diamante.webp",
    tint: { from: "#2f74cf", to: "#a6dcff", soft: "#eaf5ff", ink: "#1b3f70" },
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
