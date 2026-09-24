/**
 * Patente do aluno.
 *
 * Um trilho só, medido em palavras aprendidas. Conta como aprendida a palavra
 * que o aluno acertou pelo menos uma vez numa fase concluída.
 *
 * A escada é uma lista ordenada de propósito: para acrescentar níveis basta
 * incluir itens no fim, sem tocar em nenhuma tela.
 *
 * TODO: `WORDS_LEARNED` vem de `attempt_answers` quando houver banco.
 */

export type Patente = {
  id: string;
  name: string;
  /** Palavras aprendidas necessárias para alcançar. */
  words: number;
  image: string;
  /**
   * Cores do metal da patente, tiradas do próprio emblema.
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

export const PATENTES: Patente[] = [
  {
    id: "bronze-1",
    name: "Bronze I",
    words: 20,
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

/**
 * Quantas palavras o aluno já aprendeu.
 *
 * Zero: o aluno do protótipo está chegando agora. Com isso não há patente
 * conquistada, e as telas mostram a Bronze I apagada com o que falta para
 * acendê-la.
 */
export const WORDS_LEARNED = 0;

/** Índice da patente atual, ou -1 se ainda não alcançou a primeira. */
export const CURRENT_INDEX = PATENTES.reduce(
  (found, patente, i) => (WORDS_LEARNED >= patente.words ? i : found),
  -1,
);

export const CURRENT_PATENTE: Patente | null =
  CURRENT_INDEX >= 0 ? PATENTES[CURRENT_INDEX] : null;

export const NEXT_PATENTE: Patente | null = PATENTES[CURRENT_INDEX + 1] ?? null;

/** Palavras que faltam para a próxima patente. */
export const WORDS_TO_NEXT = NEXT_PATENTE ? Math.max(0, NEXT_PATENTE.words - WORDS_LEARNED) : 0;

/** Avanço dentro da patente atual, de 0 a 100. */
export const PATENTE_PERCENT = (() => {
  if (!NEXT_PATENTE) return 100;
  const floor = CURRENT_PATENTE?.words ?? 0;
  const span = NEXT_PATENTE.words - floor;
  return span > 0 ? Math.min(100, Math.round(((WORDS_LEARNED - floor) / span) * 100)) : 0;
})();
