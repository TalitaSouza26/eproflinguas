/**
 * Conquistas.
 *
 * Conquistas avulsas espalhadas pelo percurso, cada uma com sua condição.
 * Ganha-se uma vez e pronto — não têm níveis: quem sobe é a divisao.
 *
 * As não conquistadas ficam visíveis, em cinza e com a condição à mostra, para
 * o aluno saber o que dá para perseguir.
 *
 * TODO: `earned` vem de `quiz_attempts` e `attempt_answers` quando houver
 * banco. Cada condição vira uma consulta.
 */

export type Conquista = {
  id: string;
  name: string;
  /** O que fazer para ganhar, em uma frase curta. */
  condition: string;
  image: string;
  earned: boolean;
  /** Quando foi conquistada. */
  earnedAt?: string;
};

export const CONQUISTAS: Conquista[] = [
  {
    id: "primeiro-passo",
    name: "Primeiro passo",
    condition: "Conclua seu primeiro quiz",
    image: "/badges/conquistas/primeiro-passo.webp",
    earned: false,
  },
  {
    id: "maratonista",
    name: "Maratonista",
    condition: "Aprenda 30 palavras em um dia",
    image: "/badges/conquistas/maratonista.webp",
    earned: false,
  },
  {
    id: "dois-dias",
    name: "De volta",
    condition: "Entre 2 dias seguidos",
    image: "/badges/conquistas/de-volta.webp",
    earned: false,
  },
  {
    id: "persistente",
    name: "Persistente",
    condition: "Refaça um quiz",
    image: "/badges/conquistas/persistente.webp",
    earned: false,
  },
  {
    id: "sem-erro",
    name: "Sem erro",
    condition: "Acerte as 10 questões de uma fase",
    image: "/badges/conquistas/sem-erro.webp",
    earned: false,
  },
  {
    id: "fogo-aceso",
    name: "Fogo aceso",
    condition: "Estude 7 dias seguidos",
    image: "/badges/conquistas/fogo-aceso.webp",
    earned: false,
  },
  {
    id: "trilha-completa",
    name: "Trilha completa",
    condition: "Termine todas as fases de uma trilha",
    image: "/badges/conquistas/trilha-completa.webp",
    earned: false,
  },
  {
    id: "conversador",
    name: "Conversador",
    condition: "Conclua um quiz de diálogo",
    image: "/badges/conquistas/conversador.webp",
    earned: false,
  },
];

/**
 * A coleção do aluno, dado o que ele já fez.
 *
 * Hoje só "Primeiro passo" tem condição implementada, e ela é a mais simples:
 * concluir o primeiro quiz. As outras sete continuam apagadas até as condições
 * delas existirem — ver o TODO em lib/quiz/rewards.
 */
export function conquistasFor(totalPhases: number): Conquista[] {
  return CONQUISTAS.map((i) =>
    i.id === "primeiro-passo" ? { ...i, earned: totalPhases >= 1 } : i,
  );
}
