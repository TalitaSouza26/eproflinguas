import type { ComponentType } from "react";
import {
  HelpIcon,
  HomeIcon,
  QuizIcon,
  SettingsIcon,
  TrophyIcon,
} from "@/components/ui/icons";

export type NavItem = {
  href: string;
  label: string;
  /** Linha de apoio exibida abaixo do título no cabeçalho. */
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
};

/** Itens de navegação do aluno. "Sair da conta" é um botão, não um link. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/inicio", label: "Início", subtitle: "Sua jornada de aprendizado", icon: HomeIcon },
  { href: "/quizzes", label: "Quizzes", subtitle: "Escolha uma trilha para praticar", icon: QuizIcon },
  { href: "/conquistas", label: "Conquistas", subtitle: "Seus marcos de aprendizado", icon: TrophyIcon },
  { href: "/ajuda", label: "Central de ajuda", subtitle: "Tire suas dúvidas", icon: HelpIcon },
  { href: "/configuracoes", label: "Configurações", subtitle: "Sua conta e preferências", icon: SettingsIcon },
];
