import { INSIGNIAS, LATEST_INSIGNIA, type Insignia } from "@/lib/insignias";
import { CURRENT_PATENTE, PATENTES, WORDS_LEARNED, type Patente } from "@/lib/patente";
import { CURRENT_TRACK } from "@/lib/tracks";

/**
 * O que a fase recém-concluída rendeu.
 *
 * Enquanto não há banco, a tela de resultado simula: quem terminou um quiz
 * ganhou a primeira insígnia que ainda faltava e alcançou a primeira patente
 * que ainda não tinha. É o que o protótipo precisa mostrar — a comemoração é
 * metade do produto, e com o aluno zerado não sobraria nada para entregar.
 *
 * TODO: com banco, comparar o estado antes e depois da tentativa. A insígnia
 * só aparece se a condição dela virou verdadeira agora, e a patente só se a
 * contagem de palavras cruzou a faixa nesta fase.
 */

/** A insígnia entregue nesta conclusão. */
export const AWARDED_INSIGNIA: Insignia | undefined =
  INSIGNIAS.find((i) => !i.earned) ?? LATEST_INSIGNIA;

/** A patente alcançada nesta conclusão. */
export const AWARDED_PATENTE: Patente | undefined =
  CURRENT_PATENTE === null
    ? PATENTES[0]
    : PATENTES[PATENTES.indexOf(CURRENT_PATENTE) + 1] ?? CURRENT_PATENTE;

/** Palavras aprendidas contando esta fase, para a frase da entrega. */
export const AWARDED_WORDS = Math.max(WORDS_LEARNED, AWARDED_PATENTE?.words ?? 0);

/**
 * Fases concluídas na trilha, contando a que o aluno acabou de terminar.
 *
 * Mesma simulação das outras recompensas: a tentativa ainda não é gravada em
 * lugar nenhum, então o resultado soma um à contagem do mock para o aluno ver
 * a barra andar por causa do que ele fez agora.
 */
export const TRACK_PHASES_DONE = Math.min(
  CURRENT_TRACK.completedPhases + 1,
  CURRENT_TRACK.phases,
);

export const TRACK_PHASES_LEFT = CURRENT_TRACK.phases - TRACK_PHASES_DONE;

/** Para onde "Continuar trilha" leva: a história da fase seguinte. */
export const NEXT_PHASE_PATH = `/quizzes/${CURRENT_TRACK.slug}/historia?fase=${Math.min(
  TRACK_PHASES_DONE + 1,
  CURRENT_TRACK.phases,
)}`;
