import { faseVazia, type DemoCena, type DemoFase, type DemoTrilha } from "@/lib/demo/trilha";
import { quizForTrack } from "@/lib/quiz/catalog";
import { storyForTrack } from "@/lib/quiz/stories";
import { trackBySlug } from "@/lib/tracks";

/**
 * A trilha que já existe no produto, trazida para dentro do admin.
 *
 * O admin abre com ela montada. Serve de exemplo trabalhado: em vez de uma
 * tela em branco, quem chega vê uma trilha de verdade — com história, cenas,
 * palavras, dicas e revisão — e pode abrir cada fase para entender como se
 * preenche antes de criar a sua.
 *
 * É **derivada** do conteúdo de verdade, não digitada de novo. Se a história
 * mudar em `stories.ts`, o exemplo muda junto; uma cópia escrita à mão
 * discordaria do produto na primeira correção de texto.
 */

const TRILHA = "primeiras-palavras";

/** Separa a narração em "texto · palavra em destaque · texto". */
function partirCena(texto: string): Pick<DemoCena, "antes" | "palavra" | "depois"> {
  // `[\s\S]` em vez da bandeira `s`: o alvo de compilação deste projeto é
  // anterior a ela, e a narração pode ter quebra de linha.
  const m = /^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/.exec(texto);
  if (!m) return { antes: texto.trim(), palavra: "", depois: "" };
  return { antes: m[1].trim(), palavra: m[2].trim(), depois: m[3].trim() };
}

/**
 * A dica que o produto escreveu para aquela palavra.
 *
 * Busca pela alternativa correta, e não pelo enunciado: é a alternativa que
 * carrega a palavra em inglês nas questões desta trilha.
 */
function dicaDaPalavra(fase: number, palavra: string): string {
  const quiz = quizForTrack(TRILHA, fase);
  const q = quiz.questions.find((questao) => {
    const certa = questao.choices.find((c) => c.id === questao.correctChoiceId);
    return certa?.label === palavra;
  });
  return q?.hint ?? "";
}

function faseDaHistoria(fase: number): DemoFase | null {
  const historia = storyForTrack(TRILHA, fase);
  if (!historia) return null;

  const palavras = historia.beats
    .filter((b) => b.kind === "lesson")
    .map((b) => ({
      en: b.word,
      pt: b.meaning,
      imagem: null,
      dica: dicaDaPalavra(fase, b.word),
    }));

  // As batidas vêm em pares: a narração e, quando há, a palavra logo depois.
  // Aqui elas voltam a ser uma cena só, que é como se escreve no admin.
  const cenas: DemoCena[] = [];
  for (const beat of historia.beats) {
    if (beat.kind === "narration") {
      cenas.push({ ...partirCena(beat.text), imagem: beat.image ?? null });
    }
  }

  return {
    tipo: "historia",
    titulo: historia.title,
    subtitulo: historia.subtitle,
    capa: historia.cover,
    palavras,
    cenas,
    dialogos: [],
    ajustes: {},
  };
}

export function trilhaDeExemplo(): DemoTrilha | null {
  const track = trackBySlug(TRILHA);
  if (!track) return null;

  const fases: DemoFase[] = [];
  for (let fase = 1; fase <= track.phases; fase++) {
    const daHistoria = faseDaHistoria(fase);
    if (daHistoria) {
      fases.push(daHistoria);
      continue;
    }
    // A última fase da trilha não tem história: é a revisão.
    fases.push({ ...faseVazia("revisao"), titulo: "Revisão" });
  }

  if (fases.length === 0) return null;

  return {
    id: "exemplo-primeiras-palavras",
    nome: track.title,
    tema: "Cumprimentos",
    fases,
  };
}
