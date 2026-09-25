import type { ComponentType } from "react";
import {
  HomeIcon,
  QuizIcon,
  TrophyIcon,
} from "@/components/ui/icons";

export type NavItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

/**
 * Itens de navegação do aluno, na ordem em que aparecem no cabeçalho.
 *
 * Não estão aqui os três que vivem no canto do aluno, em ícone:
 * "Configurações", "Central de ajuda" e "Sair da conta". Nenhum deles é sobre
 * estudar — na faixa, competiam por atenção com Início e Quizzes, que é para
 * onde a criança precisa ir.
 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/inicio", label: "Início", icon: HomeIcon },
  { href: "/quizzes", label: "Quizzes", icon: QuizIcon },
  { href: "/conquistas", label: "Conquistas", icon: TrophyIcon },
];
