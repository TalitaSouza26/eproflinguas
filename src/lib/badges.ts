/**
 * Insígnias por categoria e tier.
 *
 * Não existe um "nível geral": cada categoria mede uma coisa diferente e sobe
 * de tier de forma independente. Um aluno pode estar em Ouro de Vocabulário e
 * ainda não ter Bronze I de Conversação — isso dá mais sensação de progresso
 * do que uma barra única.
 *
 * Bronze I é de propósito muito acessível: a primeira conquista precisa
 * acontecer nos primeiros dias, senão o aluno desiste antes de sentir mérito.
 *
 * TODO: `value` de cada categoria vem hoje de um mock. Com banco, sai de
 * `quiz_attempts` (quizzes concluídos, acertos, datas) e `attempt_answers`
 * (palavras acertadas).
 */

export const TIERS = ["Bronze I", "Bronze II", "Prata", "Ouro", "Diamante"] as const;
export type Tier = (typeof TIERS)[number];

/** Cor de cada tier. O nome sempre aparece junto — nunca só a cor. */
export const TIER_STYLE: Record<Tier, { ring: string; text: string; chip: string }> = {
  "Bronze I": { ring: "ring-[#c98a52]", text: "text-[#a2652f]", chip: "bg-[#f6e7d8]" },
  "Bronze II": { ring: "ring-[#b9763c]", text: "text-[#8d5320]", chip: "bg-[#f1dcc6]" },
  Prata: { ring: "ring-[#9aa7b8]", text: "text-[#5c6b7f]", chip: "bg-[#e8edf4]" },
  Ouro: { ring: "ring-[#e0a71b]", text: "text-[#9c710a]", chip: "bg-[#fbeec4]" },
  Diamante: { ring: "ring-[#4bb3d4]", text: "text-[#1d7f9e]", chip: "bg-[#d8f0f8]" },
};

export type Category = {
  key: string;
  name: string;
  /** Arte da categoria. O símbolo identifica o que ela mede. */
  image: string;
  /** O que a categoria mede, em uma linha. */
  description: string;
  /** Unidade contada, usada nas frases de progresso. */
  unit: string;
  /** Meta de cada tier, na ordem de TIERS. */
  thresholds: [number, number, number, number, number];
  /** Quanto o aluno já acumulou. */
  value: number;
  /** Falso enquanto não existe conteúdo que alimente a métrica. */
  available: boolean;
  unavailableReason?: string;
};

/**
 * Metas por categoria.
 *
 * A escada de "Iniciante" (3, 7, 15, 30, 60) veio do produto. As outras
 * seguem a mesma curva, ajustadas à unidade de cada uma, e são um chute
 * informado — vale revisar.
 */
export const CATEGORIES: Category[] = [
  {
    key: "iniciante",
    name: "Iniciante",
    image: "/badges/categorias/iniciante.webp",
    description: "Quizzes concluídos",
    unit: "quizzes concluídos",
    thresholds: [3, 7, 15, 30, 60],
    value: 18,
    available: true,
  },
  {
    key: "avancando",
    name: "Avançando",
    image: "/badges/categorias/avancando.webp",
    description: "Dias seguidos estudando",
    unit: "dias seguidos",
    thresholds: [3, 7, 14, 30, 60],
    value: 8,
    available: true,
  },
  {
    key: "foguete",
    name: "Rápido como foguete",
    image: "/badges/categorias/foguete.webp",
    description: "Quizzes com 80% ou mais de acerto",
    unit: "quizzes com 80%+",
    thresholds: [3, 7, 15, 30, 60],
    value: 4,
    available: true,
  },
  {
    key: "vocabulario",
    name: "Vocabulário",
    image: "/badges/categorias/vocabulario.webp",
    description: "Palavras aprendidas",
    // Conta como aprendida a palavra acertada ao menos uma vez em fase concluída.
    unit: "palavras aprendidas",
    thresholds: [20, 50, 100, 200, 400],
    value: 240,
    available: true,
  },
  {
    key: "conversacao",
    name: "Conversação",
    image: "/badges/categorias/conversacao.webp",
    description: "Quizzes de diálogo",
    unit: "quizzes de diálogo",
    thresholds: [3, 7, 15, 30, 60],
    value: 0,
    available: false,
    unavailableReason: "Os quizzes de diálogo ainda estão sendo preparados.",
  },
];

/** Selo neutro, usado onde ainda não há arte do tier. */
export const BADGE_PLACEHOLDER = "/badges/insignia-padrao.webp";

/**
 * Arte de cada tier, com o nome gravado na imagem.
 *
 * Usada só na tela de detalhe, onde os cinco tiers aparecem lado a lado e a
 * comparação entre eles é o assunto. Nas demais telas vale a arte da
 * categoria, porque ali o que identifica é o que ela mede — o tier vai por
 * escrito.
 *
 * TODO: falta a arte do Diamante no mesmo estilo.
 */
const TIER_IMAGE: Partial<Record<Tier, string>> = {
  "Bronze I": "/badges/bronze-1.webp",
  "Bronze II": "/badges/bronze-2.webp",
  Prata: "/badges/prata.webp",
  Ouro: "/badges/ouro.webp",
};

export function badgeImage(tier: Tier | null): string {
  return (tier && TIER_IMAGE[tier]) || BADGE_PLACEHOLDER;
}


export type CategoryProgress = {
  category: Category;
  /** Índice do tier atual em TIERS, ou -1 se ainda não conquistou nenhum. */
  tierIndex: number;
  tier: Tier | null;
  /** Meta do próximo tier, ou null se já está em Diamante. */
  nextThreshold: number | null;
  nextTier: Tier | null;
  /** Quanto falta para o próximo tier. */
  remaining: number;
  /** Percentual dentro do tier atual, de 0 a 100. */
  percent: number;
};

export function progressOf(category: Category): CategoryProgress {
  const { thresholds, value } = category;

  let tierIndex = -1;
  for (let i = 0; i < thresholds.length; i++) {
    if (value >= thresholds[i]) tierIndex = i;
  }

  const isMax = tierIndex === thresholds.length - 1;
  const nextThreshold = isMax ? null : thresholds[tierIndex + 1];
  const floor = tierIndex < 0 ? 0 : thresholds[tierIndex];

  const percent =
    nextThreshold === null
      ? 100
      : Math.min(100, Math.round(((value - floor) / (nextThreshold - floor)) * 100));

  return {
    category,
    tierIndex,
    tier: tierIndex < 0 ? null : TIERS[tierIndex],
    nextThreshold,
    nextTier: isMax ? null : TIERS[tierIndex + 1],
    remaining: nextThreshold === null ? 0 : Math.max(0, nextThreshold - value),
    percent,
  };
}

export const ALL_PROGRESS: CategoryProgress[] = CATEGORIES.map(progressOf);

export const EARNED_PROGRESS = ALL_PROGRESS.filter((p) => p.tierIndex >= 0);

/** Insígnia de maior tier — é a que a Home destaca. */
export const HIGHEST_BADGE: CategoryProgress | undefined = [...EARNED_PROGRESS].sort(
  (a, b) => b.tierIndex - a.tierIndex,
)[0];

/**
 * Enquanto o aluno não tem nenhuma insígnia, a Home mostra o primeiro
 * objetivo em vez de um espaço vazio.
 */
export const FIRST_GOAL: CategoryProgress = ALL_PROGRESS[0];

export const TOTAL_EARNED = EARNED_PROGRESS.length;
export const TOTAL_CATEGORIES = CATEGORIES.length;

export function progressByKey(key: string): CategoryProgress | undefined {
  return ALL_PROGRESS.find((p) => p.category.key === key);
}
