import { CASA_FAMILIA_PHASES, type Word } from "@/lib/quiz/casa-familia";

/**
 * A galeria "Olha e escuta".
 *
 * É o que abre uma fase que não tem história: os cartões das palavras novas,
 * uma por vez, figura grande e o áudio. Serve às trilhas de substantivo
 * concreto — casa, escola, animais, comida —, onde a figura já é a definição e
 * uma narrativa só adiaria a palavra.
 *
 * O contrato é o mesmo da história: a fase tem uma abertura, a abertura termina
 * mandando para o quiz. Só o miolo muda. Por isso a Home, o menu e o "continuar"
 * não sabem qual das duas existe — eles perguntam a `phaseHref`.
 */
export type Gallery = {
  slug: string;
  phase: number;
  /** Assunto do bloco, ex.: "A família". */
  title: string;
  words: Word[];
};

const GALLERIES: Gallery[] = CASA_FAMILIA_PHASES.map((fase, i) => ({
  slug: "casa-familia",
  phase: i + 1,
  title: fase.title,
  words: fase.words,
}));

export function galleryFor(slug: string, phase = 1): Gallery | undefined {
  return GALLERIES.find((g) => g.slug === slug && g.phase === phase);
}
