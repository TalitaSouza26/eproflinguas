/**
 * Dados de exemplo da tela inicial.
 *
 * TODO: substituir por consultas ao Supabase (`students`, `quiz_attempts`,
 * `tracks`) quando o banco estiver configurado. Os números abaixo são fictícios
 * e servem só para montar o layout.
 */

export const CURRENT_STUDENT = {
  firstName: "João",
  fullName: "João Souza",
  /** Usadas quando a foto não carrega. */
  initials: "JS",
  photo: "/alunos/joao.webp",
};

export type Stat = {
  key: string;
  value: string;
  label: string;
  delta: string;
  tone: "blue" | "deep" | "accent";
};

export const PROGRESS_STATS: Stat[] = [
  { key: "quizzes", value: "24", label: "Quizzes concluídos", delta: "+6 esta semana", tone: "blue" },
  { key: "accuracy", value: "87%", label: "Taxa média de acerto", delta: "+12% desde o início", tone: "deep" },
  { key: "streak", value: "7", label: "Dias em sequência", delta: "Você está indo bem", tone: "accent" },
];

export const BUBO_PANEL = {
  title: "Bubo está orgulhoso!",
  message: "Você tem mantido uma ótima consistência nos estudos. Continue assim!",
  tipTitle: "Dica do Bubo",
  tip: "Estudar um pouco todos os dias faz toda a diferença!",
};
