import { INSIGNIAS, LATEST_INSIGNIA, type Insignia } from "@/lib/insignias";
import { CURRENT_PATENTE, PATENTES, WORDS_LEARNED, type Patente } from "@/lib/patente";


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


