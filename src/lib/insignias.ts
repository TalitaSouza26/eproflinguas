/**
 * Insígnias.
 *
 * Conquistas avulsas espalhadas pelo percurso, cada uma com sua condição.
 * Ganha-se uma vez e pronto — não têm níveis: quem sobe é a patente.
 *
 * As não conquistadas ficam visíveis, em cinza e com a condição à mostra, para
 * o aluno saber o que dá para perseguir.
 *
 * TODO: `earned` vem de `quiz_attempts` e `attempt_answers` quando houver
 * banco. Cada condição vira uma consulta.
 */

export type Insignia = {
  id: string;
  name: string;
  /** O que fazer para ganhar, em uma frase curta. */
  condition: string;
  image: string;
  earned: boolean;
  /** Quando foi conquistada. */
  earnedAt?: string;
};

export const INSIGNIAS: Insignia[] = [
  {
    id: "primeiro-passo",
    name: "Primeiro passo",
    condition: "Conclua seu primeiro quiz",
    image: "/badges/insignias/primeiro-passo.webp",
    earned: true,
    earnedAt: "12/09",
  },
  {
    id: "maratonista",
    name: "Maratonista",
    condition: "Aprenda 30 palavras em um dia",
    image: "/badges/categorias/_reserva-calendario.webp",
    earned: true,
    earnedAt: "15/09",
  },
  {
    id: "dois-dias",
    name: "De volta",
    condition: "Entre 2 dias seguidos",
    image: "/badges/insignias/de-volta.webp",
    earned: true,
    earnedAt: "16/09",
  },
  {
    id: "persistente",
    name: "Persistente",
    condition: "Refaça um quiz",
    image: "/badges/insignias/persistente.webp",
    earned: true,
    earnedAt: "20/09",
  },
  {
    id: "sem-erro",
    name: "Sem erro",
    condition: "Acerte as 10 questões de uma fase",
    image: "/badges/insignias/sem-erro.webp",
    earned: false,
  },
  {
    id: "fogo-aceso",
    name: "Fogo aceso",
    condition: "Estude 7 dias seguidos",
    image: "/badges/insignias/fogo-aceso.webp",
    earned: false,
  },
  {
    id: "trilha-completa",
    name: "Trilha completa",
    condition: "Termine todas as fases de uma trilha",
    image: "/badges/insignias/trilha-completa.webp",
    earned: false,
  },
  {
    id: "conversador",
    name: "Conversador",
    condition: "Conclua um quiz de diálogo",
    image: "/badges/insignias/conversador.webp",
    earned: false,
  },
];

export const EARNED_INSIGNIAS = INSIGNIAS.filter((i) => i.earned);
export const LOCKED_INSIGNIAS = INSIGNIAS.filter((i) => !i.earned);

/** A mais recente conquistada — é a que a tela de resultado entrega. */
export const LATEST_INSIGNIA: Insignia | undefined = EARNED_INSIGNIAS.at(-1);
