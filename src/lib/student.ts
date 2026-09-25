import { hasStarted } from "@/lib/onboarding";
import { phasesByTrack } from "@/lib/progress";
import { quizForTrack } from "@/lib/quiz/catalog";
import { hasIntro, phrasesInStory, storyForTrack } from "@/lib/quiz/stories";
import { TRACKS, type Track } from "@/lib/tracks";

/**
 * Onde o aluno está, de verdade.
 *
 * `tracks.ts` descreve as trilhas; quem sabe o que já foi feito é o cookie. As
 * telas leem daqui para não dependerem de um progresso fixo no código — era
 * ele que prendia o aluno na fase 2.
 *
 * TODO: some quando o banco entrar; vira uma consulta por aluno.
 */

export type TrackProgress = Track & { completedPhases: number };

export type StudentProgress = {
  tracks: TrackProgress[];
  /** Fases concluídas somando todas as trilhas. */
  totalPhases: number;
  /** Expressões aprendidas: é isso que move a patente. */
  words: number;
  /** Trilha em que o aluno está: a primeira aberta que ainda não fechou. */
  current: TrackProgress;
  /** Próxima fase a jogar na trilha atual. */
  phase: number;
  /** Nenhuma fase concluída em trilha nenhuma. */
  isNew: boolean;
};

export async function studentProgress(): Promise<StudentProgress> {
  const feitas = await phasesByTrack();
  const tracks = TRACKS.map((t) => ({ ...t, completedPhases: feitas[t.slug] ?? 0 }));

  const complete = (t: TrackProgress) => t.completedPhases >= t.phases;
  const unlocked = (i: number) => tracks.slice(0, i).every(complete);

  const current = tracks.find((t, i) => unlocked(i) && !complete(t)) ?? tracks[tracks.length - 1];

  return {
    tracks,
    totalPhases: tracks.reduce((n, t) => n + t.completedPhases, 0),
    words: wordsLearned(tracks),
    current,
    phase: Math.min(current.completedPhases + 1, current.phases),
    isNew: tracks.every((t) => t.completedPhases === 0),
  };
}

/**
 * Quantas expressões o aluno aprendeu.
 *
 * Numa fase com história, são as que ela ensina — a fase de revisão repassa as
 * mesmas e não soma nada. Nas trilhas que ainda não têm história, cada questão
 * da fase vale uma palavra.
 */
function wordsLearned(tracks: TrackProgress[]): number {
  let total = 0;

  for (const track of tracks) {
    for (let phase = 1; phase <= track.completedPhases; phase++) {
      const story = storyForTrack(track.slug, phase);
      total += story
        ? phrasesInStory(story)
        : storyForTrack(track.slug, 1)
          ? 0 // fase de revisão de uma trilha com história: nada de novo
          : quizForTrack(track.slug, phase).questions.length;
    }
  }

  return total;
}

/**
 * Se o aluno ainda precisa conhecer o Bubo.
 *
 * Só quem nunca foi apresentado **e** nunca concluiu uma fase. Antes bastava
 * faltar a marca da apresentação, e aí quem chegasse ao quiz por link direto
 * era mandado para a tela de boas-vindas toda vez que abrisse a Home — mesmo
 * tendo terminado quizzes.
 */
export async function needsIntro(): Promise<boolean> {
  const [introduced, { isNew }] = await Promise.all([hasStarted(), studentProgress()]);
  return !introduced && isNew;
}

/**
 * Para onde mandar o aluno estudar: a história da fase, quando ela tem uma, ou
 * direto a primeira questão.
 */
export function phaseHref(slug: string, phase: number): string {
  return hasIntro(slug, phase)
    ? `/quizzes/${slug}/historia?fase=${phase}`
    : `/quizzes/${slug}?fase=${phase}`;
}
