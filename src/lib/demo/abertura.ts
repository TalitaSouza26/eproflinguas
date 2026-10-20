import {
  aberturaEhGaleria,
  acharPalavra,
  cardsOrdenados,
  type Banco,
  type Fase,
} from "@/lib/demo/banco";
import type { Gallery } from "@/lib/quiz/galeria";
import type { Story, StoryBeat } from "@/lib/quiz/stories";

/**
 * Os cards da fase vistos como a tela que o aluno recebe.
 *
 * Mora aqui, e não dentro da tela do aluno, porque a prévia do admin mostra
 * exatamente isto. Duas conversões separadas acabariam discordando, e a
 * prévia passaria a mentir justamente sobre o que ela existe para conferir.
 */
export type Abertura =
  | { tipo: "galeria"; galeria: Gallery }
  | { tipo: "historia"; historia: Story }
  | null;

export function aberturaDaFase(
  banco: Banco,
  fase: Fase,
  contexto: { trilha: string; numero: number },
): Abertura {
  const cards = cardsOrdenados(fase);
  if (cards.length === 0) return null;

  const ingles = (palavraId: string | null, destaque: string) =>
    acharPalavra(banco, palavraId)?.ingles || destaque;
  const traducao = (palavraId: string | null, propria: string) =>
    propria || (acharPalavra(banco, palavraId)?.traducao ?? "");

  // Só cards de palavra, todos com figura: é a galeria "Olha e aprende".
  if (aberturaEhGaleria(fase)) {
    return {
      tipo: "galeria",
      galeria: {
        slug: "demo",
        phase: contexto.numero,
        title: fase.titulo || contexto.trilha,
        track: contexto.trilha,
        words: cards.map((c) => ({
          en: ingles(c.palavraId, c.destaque),
          pt: traducao(c.palavraId, c.traducao),
          image: c.imagem ?? "",
        })),
      },
    };
  }

  // Os cards viram as batidas da história, na mesma ordem: o de cena narra,
  // o de palavra para tudo e mostra o que ela quer dizer.
  const beats: StoryBeat[] = cards.map((c) =>
    c.tipo === "Historia"
      ? {
          kind: "narration" as const,
          text: (c.destaque
            ? `${c.textoAntes} *${c.destaque}* ${c.textoDepois}`
            : `${c.textoAntes} ${c.textoDepois}`
          )
            .replace(/\s+/g, " ")
            .trim(),
          ...(c.imagem ? { image: c.imagem } : {}),
        }
      : {
          kind: "lesson" as const,
          word: ingles(c.palavraId, c.destaque),
          meaning: traducao(c.palavraId, c.traducao),
        },
  );

  const novas = cards.filter((c) => c.tipo === "Palavra").length;

  return {
    tipo: "historia",
    historia: {
      slug: "demo",
      phase: contexto.numero,
      part: contexto.numero,
      title: fase.titulo || contexto.trilha,
      subtitle:
        fase.descricao.trim() || `${novas} ${novas === 1 ? "palavra nova" : "palavras novas"}.`,
      cover: fase.imagemCapa ?? cards.find((c) => c.imagem)?.imagem ?? "",
      beats,
    },
  };
}
