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
 * Aqui fica só a descrição das trilhas. Quanto o aluno já fez vive em
 * lib/student.ts, que lê o progresso real — trocar isso por números fixos foi
 * o que prendia o aluno na fase 2.
 */

export type Track = {
  slug: string;
  title: string;
  icon: ComponentType<{ className?: string }>;
  /** Fases da trilha nesta faixa escolar. */
  phases: number;
};

const PHASES_PER_TRACK = 4;

const RAW: Omit<Track, "phases">[] = [
  // A primeira trilha é a porta de entrada: ensina a falar com alguém e, de
  // quebra, ensina o próprio quiz — errar ali não custa nada.
  { slug: "primeiras-palavras", title: "Primeiras palavras", icon: TalkIcon },
  { slug: "casa-familia", title: "Casa e família", icon: FamilyIcon },
  { slug: "escola", title: "Escola", icon: SchoolIcon },
  { slug: "animais", title: "Animais", icon: PawIcon },
  { slug: "cores-numeros", title: "Cores e números", icon: PaletteIcon },
  { slug: "comida", title: "Comida", icon: AppleIcon },
];

export const TRACKS: Track[] = RAW.map((t) => ({ ...t, phases: PHASES_PER_TRACK }));

export function progressOf(track: { phases: number; completedPhases: number }): number {
  return Math.round((track.completedPhases / track.phases) * 100);
}

export function trackBySlug(slug: string): Track | undefined {
  return TRACKS.find((t) => t.slug === slug);
}

/** A trilha seguinte na ordem, ou undefined se esta for a última. */
export function nextTrackOf(slug: string): Track | undefined {
  const index = TRACKS.findIndex((t) => t.slug === slug);
  return index < 0 ? undefined : TRACKS[index + 1];
}

/**
 * Frase de contexto mostrada no quiz: onde o aluno está na trilha.
 *
 * Recebe as fases concluídas de fora porque quem sabe disso é o progresso do
 * aluno, não a descrição da trilha.
 */
export function trackContextLine(track: Track, phase: number, completedPhases: number): string {
  const remaining = Math.max(0, track.phases - completedPhases);
  const next = nextTrackOf(track.slug);

  // Na primeira fase da primeira trilha o aluno é novo: nada de cobrar o que
  // falta para destravar, ele ainda não sabe que existem trilhas.
  if (phase === 1 && track.slug === TRACKS[0].slug) return "Sua primeira fase. Vamos lá!";

  if (remaining === 0) return `Trilha ${track.title} concluída.`;
  if (!next) return `Última trilha da sua faixa · ${remaining === 1 ? "falta 1 quiz" : `faltam ${remaining} quizzes`} para concluir.`;

  const missing = remaining === 1 ? "Falta 1 quiz" : `Faltam ${remaining} quizzes`;
  return `${missing} para abrir a trilha ${next.title}.`;
}
