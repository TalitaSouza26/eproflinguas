import {
  novoId,
  type Alternativa,
  type Banco,
  type Card,
  type Fase,
  type Palavra,
  type Pergunta,
  type TipoPergunta,
  type Trilha,
} from "@/lib/demo/banco";
import { quizForTrack } from "@/lib/quiz/catalog";
import { storyForTrack } from "@/lib/quiz/stories";
import { trackBySlug } from "@/lib/tracks";

/**
 * A trilha que já existe no produto, trazida para dentro do admin.
 *
 * O admin abre com ela montada. Serve de exemplo trabalhado: em vez de uma
 * tela em branco, quem chega vê uma trilha de verdade — com tema, fases,
 * palavras, cards e perguntas — e pode abrir cada parte para entender como se
 * preenche antes de criar a sua.
 *
 * É **derivada** do conteúdo de verdade, não digitada de novo. Se a história
 * mudar em `stories.ts`, o exemplo muda junto; uma cópia escrita à mão
 * discordaria do produto na primeira correção de texto.
 */

const TRILHA = "primeiras-palavras";

/** Separa a narração em "texto · destaque · texto". */
function partirCena(texto: string): Pick<Card, "textoAntes" | "destaque" | "textoDepois"> {
  // `[\s\S]` em vez da bandeira `s`: o alvo de compilação deste projeto é
  // anterior a ela, e a narração pode ter quebra de linha.
  const m = /^([\s\S]*?)\*([^*]+)\*([\s\S]*)$/.exec(texto);
  if (!m) return { textoAntes: texto.trim(), destaque: "", textoDepois: "" };
  return { textoAntes: m[1].trim(), destaque: m[2].trim(), textoDepois: m[3].trim() };
}

/**
 * Duas grafias da mesma palavra.
 *
 * A cena marca "My name is" e a palavra ensinada é "My name is…", com
 * reticências. São a mesma expressão, e tratá-las como duas criaria uma
 * entrada repetida no banco de palavras.
 */
export function mesmaPalavra(a: string, b: string): boolean {
  const limpa = (x: string) =>
    x
      .trim()
      .toLowerCase()
      .replace(/[….,!?;:]+$/u, "")
      .trim();
  return limpa(a) === limpa(b) && limpa(a) !== "";
}

/** O catálogo global de palavras, criado sob demanda. */
function dicionario() {
  const palavras: Palavra[] = [];

  return {
    palavras,
    pegar(ingles: string, traducao: string): Palavra {
      const achada = palavras.find((p) => mesmaPalavra(p.ingles, ingles));
      if (achada) {
        if (!achada.traducao && traducao) achada.traducao = traducao;
        return achada;
      }
      const nova = { id: novoId("pal"), ingles: ingles.trim(), traducao: traducao.trim() };
      palavras.push(nova);
      return nova;
    },
    porIngles(ingles: string): Palavra | undefined {
      return palavras.find((p) => mesmaPalavra(p.ingles, ingles));
    },
  };
}

/** O formato do quiz do produto, dito com os tipos do banco. */
const TIPO_POR_FORMATO: Record<string, TipoPergunta> = {
  meaning_word: "TRADUCAO_PARA_INGLES",
  word_meaning: "SIGNIFICADO_EM_PORTUGUES",
  image_word: "IMAGEM_PARA_PALAVRA",
  situation_reply: "TRADUCAO_PARA_INGLES",
};

/** As perguntas que o produto já escreveu para aquela fase. */
function perguntasDaFase(fase: number, dic: ReturnType<typeof dicionario>): Pergunta[] {
  const quiz = quizForTrack(TRILHA, fase);

  return quiz.questions.map((q, i) => {
    const alternativas: Alternativa[] = q.choices.map((c) => ({
      id: novoId("alt"),
      texto: c.label,
      correta: c.id === q.correctChoiceId,
    }));

    const certa = q.choices.find((c) => c.id === q.correctChoiceId);
    const palavra = certa ? dic.porIngles(certa.label) : undefined;

    return {
      id: novoId("per"),
      palavraId: palavra?.id ?? null,
      tipo: TIPO_POR_FORMATO[q.format] ?? "TRADUCAO_PARA_INGLES",
      imagem: "imageUrl" in q ? q.imageUrl : null,
      ordem: i + 1,
      enunciado: q.prompt,
      dica: q.hint ?? "",
      feedbackAcerto: q.explanation,
      feedbackErro: `Quase! ${q.explanation}`,
      alternativas,
    };
  });
}

function faseDaHistoria(numero: number, dic: ReturnType<typeof dicionario>): Fase | null {
  const historia = storyForTrack(TRILHA, numero);
  if (!historia) return null;

  const cards: Card[] = [];
  const ligacoes: { palavraId: string; ordem: number }[] = [];

  for (const beat of historia.beats) {
    if (beat.kind === "narration") {
      cards.push({
        id: novoId("car"),
        tipo: "Historia",
        ordem: cards.length + 1,
        imagem: beat.image ?? null,
        ...partirCena(beat.text),
        palavraId: null,
        traducao: "",
      });
      continue;
    }

    const palavra = dic.pegar(beat.word, beat.meaning);
    if (!ligacoes.some((l) => l.palavraId === palavra.id)) {
      ligacoes.push({ palavraId: palavra.id, ordem: ligacoes.length + 1 });
    }

    cards.push({
      id: novoId("car"),
      tipo: "Palavra",
      ordem: cards.length + 1,
      imagem: null,
      textoAntes: "",
      destaque: palavra.ingles,
      textoDepois: "",
      palavraId: palavra.id,
      traducao: palavra.traducao,
    });
  }

  return {
    id: novoId("fas"),
    ordem: numero,
    // A história tem um título só, e cada fase conta uma parte dela: sem a
    // parte no nome, as três fases ficariam com o mesmo título na lista.
    titulo: `${historia.title} — parte ${historia.part}`,
    descricao: historia.subtitle,
    imagemCapa: historia.cover,
    tipo: "Aprendizado",
    palavras: ligacoes,
    cards,
    // As perguntas vêm depois dos cards: elas se ligam às palavras que as
    // cenas acabaram de criar.
    perguntas: perguntasDaFase(numero, dic),
  };
}

export function bancoDeExemplo(): Banco | null {
  const track = trackBySlug(TRILHA);
  if (!track) return null;

  const dic = dicionario();
  const fases: Fase[] = [];

  for (let numero = 1; numero <= track.phases; numero++) {
    const comHistoria = faseDaHistoria(numero, dic);
    if (comHistoria) {
      fases.push(comHistoria);
      continue;
    }

    // A última fase da trilha não tem história: é a revisão.
    fases.push({
      id: novoId("fas"),
      ordem: numero,
      titulo: "Revisão: primeiras palavras",
      descricao: "Repassa as nove expressões da trilha.",
      imagemCapa: null,
      tipo: "Revisao",
      palavras: [],
      cards: [],
      perguntas: perguntasDaFase(numero, dic),
    });
  }

  if (fases.length === 0) return null;

  const trilha: Trilha = {
    id: "exemplo-primeiras-palavras",
    nome: track.title,
    ordem: 1,
    descricao: "Cumprimentos e expressões básicas.",
    ativa: true,
    temas: [{ id: novoId("tem"), titulo: "Cumprimentos básicos", ordem: 1, fases }],
  };

  return { trilhas: [trilha], palavras: dic.palavras };
}
