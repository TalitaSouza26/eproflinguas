import type { ComponentType } from "react";
import {
  AppleIcon,
  FamilyIcon,
  PaletteIcon,
  PawIcon,
  SchoolIcon,
  TalkIcon,
} from "@/components/ui/icons";

/**
 * Fonte única das trilhas.
 *
 * Home, insígnias e quiz leem daqui. Antes cada tela tinha a própria lista e
 * os percentuais da Home eram digitados à mão.
 *
 * Protótipo com as 6 trilhas do 1º–2º ano, na ordem obrigatória do currículo
 * (ver docs/curriculo.md). As trilhas "Verbos do dia a dia" e "Frases simples"
 * entram a partir do 3º–5º.
 *
 * TODO: `completedPhases` vem de `quiz_attempts` quando houver banco.
 */

export type Track = {
  slug: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  /** Fases da trilha nesta faixa escolar. */
  phases: number;
  /** Quantas o aluno já concluiu. */
  completedPhases: number;
};

const PHASES_PER_TRACK = 4;

const RAW: Omit<Track, "phases">[] = [
  // A primeira trilha é a porta de entrada: ensina a falar com alguém e, de
  // quebra, ensina o próprio quiz — errar ali não custa nada.
  {
    slug: "falando-com-pessoas",
    title: "Falando com pessoas",
    icon: TalkIcon,
    completedPhases: 4,
  },
  { slug: "casa-familia", title: "Casa e família", icon: FamilyIcon, completedPhases: 4 },
  { slug: "escola", title: "Escola", icon: SchoolIcon, completedPhases: 3 },
  { slug: "animais", title: "Animais", icon: PawIcon, completedPhases: 0 },
  { slug: "cores-numeros", title: "Cores e números", icon: PaletteIcon, completedPhases: 0 },
  { slug: "comida", title: "Comida", icon: AppleIcon, completedPhases: 0 },
];

export const TRACKS: Track[] = RAW.map((t) => ({ ...t, phases: PHASES_PER_TRACK }));

export function progressOf(track: Track): number {
  return Math.round((track.completedPhases / track.phases) * 100);
}

export function isComplete(track: Track): boolean {
  return track.completedPhases >= track.phases;
}

/**
 * A trilha só abre quando todas as anteriores estão completas. A primeira
 * está sempre aberta.
 */
export function isUnlocked(index: number): boolean {
  return TRACKS.slice(0, index).every(isComplete);
}

/** Trilha em que o aluno está: a primeira aberta que ainda não fechou. */
export const CURRENT_TRACK: Track =
  TRACKS.find((t, i) => isUnlocked(i) && !isComplete(t)) ?? TRACKS[0];

/** Número da próxima fase a jogar na trilha atual. */
export const CURRENT_PHASE = Math.min(CURRENT_TRACK.completedPhases + 1, CURRENT_TRACK.phases);

export function trackBySlug(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

/** A trilha seguinte na ordem, ou undefined se esta for a última. */
export function nextTrackOf(slug: string): Track | undefined {
  const index = TRACKS.findIndex((t) => t.slug === slug);
  return index < 0 ? undefined : TRACKS[index + 1];
}

/** Quantas fases faltam para fechar a trilha (e abrir a seguinte). */
export function remainingPhases(track: Track): number {
  return Math.max(0, track.phases - track.completedPhases);
}

/**
 * Frase de contexto mostrada no quiz: onde o aluno está e o que falta para
 * destravar a próxima trilha.
 */
export function trackContextLine(track: Track, phase?: number): string {
  const remaining = remainingPhases(track);
  const next = nextTrackOf(track.slug);

  // Na primeira fase da primeira trilha o aluno é novo: nada de cobrar o que
  // falta para destravar, ele ainda não sabe que existem trilhas.
  if (phase === 1 && track.slug === TRACKS[0].slug) return "Sua primeira fase. Vamos lá!";

  if (remaining === 0) return `Trilha ${track.title} concluída.`;
  if (!next) return `Última trilha da sua faixa · ${remaining === 1 ? "falta 1 quiz" : `faltam ${remaining} quizzes`} para concluir.`;

  const missing = remaining === 1 ? "Falta 1 quiz" : `Faltam ${remaining} quizzes`;
  return `${missing} para abrir a trilha ${next.title}.`;
}
