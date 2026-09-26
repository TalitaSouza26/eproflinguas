import { hasStarted } from "@/lib/onboarding";
import { phasesByTrack } from "@/lib/progress";
import { quizForTrack } from "@/lib/quiz/catalog";
import { galleryFor } from "@/lib/quiz/galeria";
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
  /** Expressões aprendidas: é isso que move a divisao. */
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
 * Quem sabe disso é a abertura da fase, não o quiz: é ela que apresenta as
 * palavras novas. A história diz quantas ensinou, a galeria tem um cartão por
 * palavra, e a fase de revisão não apresenta nada — repassa o que as outras já
 * ensinaram.
 *
 * Contar as questões seria mais simples e estaria errado: uma fase de "Casa e
 * família" tem cinco questões para quatro palavras novas, porque a quinta
 * retoma a fase anterior. O aluno ganharia uma palavra que não existe.
 *
 * Só as trilhas que ainda não têm abertura caem no contador por questão.
 */

/** O que uma fase ensina de novo. */
export function wordsOfPhase(slug: string, phase: number): number {
  const story = storyForTrack(slug, phase);
  if (story) return phrasesInStory(story);

  const gallery = galleryFor(slug, phase);
  if (gallery) return gallery.words.length;

  // Fase de revisão de uma trilha com abertura: repassa, não ensina.
  if (storyForTrack(slug, 1) || galleryFor(slug, 1)) return 0;

  return quizForTrack(slug, phase).questions.length;
}

function wordsLearned(tracks: TrackProgress[]): number {
  let total = 0;

  for (const track of tracks) {
    for (let phase = 1; phase <= track.completedPhases; phase++) {
      total += wordsOfPhase(track.slug, phase);
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
 * Para onde mandar o aluno estudar.
 *
 * Uma fase pode abrir de três jeitos: com a história da trilha narrada, com a
 * galeria "Olha e aprende" das trilhas visuais, ou direto na primeira questão.
 * Quem chama nunca precisa saber qual — Home, menu e "continuar" perguntam
 * aqui e seguem o link.
 */
export function phaseHref(slug: string, phase: number): string {
  if (hasIntro(slug, phase)) return `/quizzes/${slug}/historia?fase=${phase}`;
  if (galleryFor(slug, phase)) return `/quizzes/${slug}/galeria?fase=${phase}`;
  return `/quizzes/${slug}?fase=${phase}`;
}
