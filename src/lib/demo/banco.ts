import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * O conteúdo do admin, com os campos do banco que já está montado.
 *
 * Os nomes aqui são os do documento de estrutura do desenvolvedor — Trilha,
 * Tema, Fase, Palavra, FasePalavra, Card, Pergunta, Alternativa —, e os
 * campos de cada um são exatamente os de lá. Nada foi inventado nem
 * renomeado: o que muda daqui para a aplicação final é onde isso é gravado,
 * não o que é gravado.
 *
 * Aqui vive no `sessionStorage` e morre quando a aba fecha. É de propósito: o
 * que se quer provar é o caminho — montar uma fase e vê-la funcionando na
 * tela do aluno —, não guardar conteúdo.
 */

const CHAVE = "eprof-demo-banco";

/** Avisa as telas abertas que o conteúdo mudou, sem precisar recarregar. */
export const EVENTO_DEMO = "eprof:demo-banco";

/** Identificador local. No banco quem dá é o banco. */
export function novoId(prefixo: string): string {
  return `${prefixo}_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

/* ───────────────────────────── as tabelas ───────────────────────────── */

/** Palavra é global: a mesma vale em várias fases, sem ser duplicada. */
export type Palavra = {
  id: string;
  ingles: string;
  traducao: string;
};

/** A ligação entre uma Palavra e uma Fase. Nome técnico, invisível ao admin. */
export type FasePalavra = {
  palavraId: string;
  ordem: number;
};

export type TipoCard = "Historia" | "Palavra";

/**
 * Um card da abertura: a cena da história ou a palavra apresentada.
 *
 * O card de história tem o texto com uma parte em destaque; o de palavra tem
 * a figura, a palavra e a tradução. Os dois campos de texto existem nos dois,
 * porque é uma tabela só.
 */
export type Card = {
  id: string;
  tipo: TipoCard;
  ordem: number;
  imagem: string | null;
  textoAntes: string;
  destaque: string;
  textoDepois: string;
  /** A Palavra relacionada. Preenche destaque e tradução. */
  palavraId: string | null;
  traducao: string;
};

export type Alternativa = {
  id: string;
  texto: string;
  correta: boolean;
};

export type TipoPergunta =
  | "TRADUCAO_PARA_INGLES"
  | "SIGNIFICADO_EM_PORTUGUES"
  | "IMAGEM_PARA_PALAVRA";

export const TIPOS_PERGUNTA: { tipo: TipoPergunta; nome: string; resumo: string }[] = [
  {
    tipo: "TRADUCAO_PARA_INGLES",
    nome: "Tradução para inglês",
    resumo: "O enunciado vem em português e as alternativas em inglês.",
  },
  {
    tipo: "SIGNIFICADO_EM_PORTUGUES",
    nome: "Significado em português",
    resumo: "O enunciado é a palavra em inglês e as alternativas em português.",
  },
  {
    tipo: "IMAGEM_PARA_PALAVRA",
    nome: "Imagem para palavra",
    resumo: "A figura é o enunciado e as alternativas são as palavras em inglês.",
  },
];

export type Pergunta = {
  id: string;
  /** A Palavra que a pergunta cobra. */
  palavraId: string | null;
  tipo: TipoPergunta;
  imagem: string | null;
  ordem: number;
  enunciado: string;
  dica: string;
  feedbackAcerto: string;
  feedbackErro: string;
  alternativas: Alternativa[];
};

export type TipoFase = "Aprendizado" | "Revisao" | "Dialogo";

export const TIPOS_FASE: { tipo: TipoFase; nome: string; resumo: string }[] = [
  { tipo: "Aprendizado", nome: "Aprendizado", resumo: "Apresenta palavras novas." },
  { tipo: "Revisao", nome: "Revisão", resumo: "Reaproveita palavras de fases anteriores." },
  { tipo: "Dialogo", nome: "Diálogo", resumo: "Pratica as palavras em uma conversa." },
];

export type Fase = {
  id: string;
  ordem: number;
  titulo: string;
  descricao: string;
  imagemCapa: string | null;
  tipo: TipoFase;
  palavras: FasePalavra[];
  cards: Card[];
  perguntas: Pergunta[];
};

export type Tema = {
  id: string;
  titulo: string;
  ordem: number;
  fases: Fase[];
};

export type Trilha = {
  id: string;
  nome: string;
  ordem: number;
  descricao: string;
  ativa: boolean;
  temas: Tema[];
};

/** Tudo que foi montado. As Palavras ficam fora das trilhas: são globais. */
export type Banco = {
  trilhas: Trilha[];
  palavras: Palavra[];
};

export const BANCO_VAZIO: Banco = { trilhas: [], palavras: [] };

/* ───────────────────────────── construtores ───────────────────────────── */

export function trilhaVazia(ordem: number): Trilha {
  return { id: novoId("tri"), nome: "", ordem, descricao: "", ativa: true, temas: [] };
}

export function temaVazio(ordem: number): Tema {
  return { id: novoId("tem"), titulo: "", ordem, fases: [] };
}

export function faseVazia(ordem: number, tipo: TipoFase = "Aprendizado"): Fase {
  return {
    id: novoId("fas"),
    ordem,
    titulo: "",
    descricao: "",
    imagemCapa: null,
    tipo,
    palavras: [],
    cards: [],
    perguntas: [],
  };
}

export function cardVazio(tipo: TipoCard, ordem: number): Card {
  return {
    id: novoId("car"),
    tipo,
    ordem,
    imagem: null,
    textoAntes: "",
    destaque: "",
    textoDepois: "",
    palavraId: null,
    traducao: "",
  };
}

export function perguntaVazia(ordem: number): Pergunta {
  return {
    id: novoId("per"),
    palavraId: null,
    tipo: "TRADUCAO_PARA_INGLES",
    imagem: null,
    ordem,
    enunciado: "",
    dica: "",
    feedbackAcerto: "",
    feedbackErro: "",
    alternativas: [alternativaVazia(true), alternativaVazia(false)],
  };
}

export function alternativaVazia(correta: boolean): Alternativa {
  return { id: novoId("alt"), texto: "", correta };
}

/* ───────────────────────────── leitura ───────────────────────────── */

export function acharTrilha(banco: Banco | null, id: string): Trilha | undefined {
  return banco?.trilhas.find((t) => t.id === id);
}

export function acharPalavra(banco: Banco | null, id: string | null): Palavra | undefined {
  if (!id) return undefined;
  return banco?.palavras.find((p) => p.id === id);
}

/** As fases de uma trilha, na ordem em que o aluno percorre. */
export function fasesDaTrilha(trilha: Trilha): { fase: Fase; tema: Tema }[] {
  return [...trilha.temas]
    .sort((a, b) => a.ordem - b.ordem)
    .flatMap((tema) =>
      [...tema.fases].sort((a, b) => a.ordem - b.ordem).map((fase) => ({ fase, tema })),
    );
}

/** As Palavras ligadas a uma fase, na ordem da ligação. */
export function palavrasDaFase(banco: Banco, fase: Fase): Palavra[] {
  return [...fase.palavras]
    .sort((a, b) => a.ordem - b.ordem)
    .map((l) => banco.palavras.find((p) => p.id === l.palavraId))
    .filter((p): p is Palavra => Boolean(p));
}

export function cardsOrdenados(fase: Fase): Card[] {
  return [...fase.cards].sort((a, b) => a.ordem - b.ordem);
}

export function perguntasOrdenadas(fase: Fase): Pergunta[] {
  return [...fase.perguntas].sort((a, b) => a.ordem - b.ordem);
}

/**
 * Uma pergunta chega ao aluno quando tem enunciado, duas alternativas com
 * texto e exatamente uma marcada como correta.
 */
export function perguntaPronta(p: Pergunta): boolean {
  const comTexto = p.alternativas.filter((a) => a.texto.trim());
  return (
    Boolean(p.enunciado.trim()) &&
    comTexto.length >= 2 &&
    comTexto.filter((a) => a.correta).length === 1 &&
    (p.tipo !== "IMAGEM_PARA_PALAVRA" || Boolean(p.imagem))
  );
}

export function perguntasProntas(fase: Fase): Pergunta[] {
  return perguntasOrdenadas(fase).filter(perguntaPronta);
}

/** Uma fase está pronta quando rende ao menos uma pergunta. */
export function faseCompleta(fase: Fase): boolean {
  return perguntasProntas(fase).length > 0;
}

/** Uma trilha chega ao aluno quando está ativa, tem nome e uma fase pronta. */
export function trilhaNoAr(trilha: Trilha): boolean {
  return (
    trilha.ativa &&
    Boolean(trilha.nome.trim()) &&
    fasesDaTrilha(trilha).some(({ fase }) => faseCompleta(fase))
  );
}

export function fasesProntas(trilha: Trilha): number {
  return fasesDaTrilha(trilha).filter(({ fase }) => faseCompleta(fase)).length;
}

/** Quantos registros o conteúdo montado daria no banco. Vai no topo da tela. */
export function contagem(banco: Banco) {
  let fases = 0;
  let cards = 0;
  let perguntas = 0;
  let alternativas = 0;

  for (const trilha of banco.trilhas) {
    for (const { fase } of fasesDaTrilha(trilha)) {
      fases += 1;
      cards += fase.cards.length;
      perguntas += fase.perguntas.length;
      for (const p of fase.perguntas) alternativas += p.alternativas.length;
    }
  }

  return { fases, palavras: banco.palavras.length, cards, perguntas, alternativas };
}

/**
 * As Palavras que a trilha ensinou antes de certa fase.
 *
 * É o que a revisão tem para repassar. Fase de diálogo não conta: ali se
 * treina uma resposta inteira, não a palavra isolada.
 */
export function ensinadasAntes(banco: Banco, trilha: Trilha, faseId: string): Palavra[] {
  const todas = fasesDaTrilha(trilha);
  const i = todas.findIndex(({ fase }) => fase.id === faseId);
  const ate = i < 0 ? todas.length : i;

  const saida: Palavra[] = [];
  for (const { fase } of todas.slice(0, ate)) {
    if (fase.tipo !== "Aprendizado") continue;
    for (const palavra of palavrasDaFase(banco, fase)) {
      if (!saida.some((p) => p.id === palavra.id)) saida.push(palavra);
    }
  }
  return saida;
}

/**
 * A revisão só existe depois de haver o que revisar.
 *
 * Duas palavras é o mínimo: com uma só não há nem a outra alternativa.
 */
export function podeRevisar(banco: Banco, trilha: Trilha, faseId: string): boolean {
  return ensinadasAntes(banco, trilha, faseId).length >= 2;
}

/* ───────────────────────── a figura de uma palavra ───────────────────────── */

/**
 * A figura que a fase guarda para uma palavra.
 *
 * Mora no Card de palavra — é lá que a imagem existe no banco. A Palavra em
 * si não tem campo de figura, e é por isso que a mesma palavra pode aparecer
 * com uma ilustração numa fase e outra noutra.
 */
export function figuraDaPalavra(fase: Fase, palavraId: string | null): string | null {
  if (!palavraId) return null;
  return (
    fase.cards.find((c) => c.tipo === "Palavra" && c.palavraId === palavraId && c.imagem)?.imagem ??
    null
  );
}

/* ───────────────────────── gerar perguntas ───────────────────────── */

/**
 * Monta uma pergunta a partir de uma palavra da fase.
 *
 * Havendo figura, cobra pela figura; não havendo, pelo significado. O
 * distrator sai das outras palavras da própria fase — nunca de outro assunto,
 * que se resolveria por eliminação.
 *
 * O resultado é um registro comum, que fica gravado e pode ser editado. Não é
 * uma pergunta "automática" que se refaz sozinha: depois de gerada, ela é sua.
 */
export function gerarPergunta(
  banco: Banco,
  fase: Fase,
  palavraId: string,
  opcoes: { ordem: number; inverter?: boolean; vizinhas?: Palavra[] } = { ordem: 1 },
): Pergunta | null {
  const palavra = acharPalavra(banco, palavraId);
  if (!palavra) return null;

  const pool = (opcoes.vizinhas ?? palavrasDaFase(banco, fase)).filter((p) => p.id !== palavra.id);
  const outra = pool[0];
  if (!outra) return null;

  const figura = figuraDaPalavra(fase, palavra.id);

  // A regra da revisão: a palavra volta por um caminho diferente do que a
  // ensinou. Repetir a mesma pergunta do mesmo jeito não é revisar.
  const tipo: TipoPergunta = opcoes.inverter
    ? figura
      ? "TRADUCAO_PARA_INGLES"
      : "SIGNIFICADO_EM_PORTUGUES"
    : figura
      ? "IMAGEM_PARA_PALAVRA"
      : "TRADUCAO_PARA_INGLES";

  const emIngles = tipo !== "SIGNIFICADO_EM_PORTUGUES";
  const certa = emIngles ? palavra.ingles : palavra.traducao;
  const errada = emIngles ? outra.ingles : outra.traducao;

  const enunciado =
    tipo === "IMAGEM_PARA_PALAVRA"
      ? "O que é isto?"
      : tipo === "TRADUCAO_PARA_INGLES"
        ? palavra.traducao
        : palavra.ingles;

  // A correta alterna de lado para que a resposta não seja sempre a primeira.
  const par = [
    { id: novoId("alt"), texto: certa, correta: true },
    { id: novoId("alt"), texto: errada, correta: false },
  ];

  return {
    id: novoId("per"),
    palavraId: palavra.id,
    tipo,
    imagem: tipo === "IMAGEM_PARA_PALAVRA" ? figura : null,
    ordem: opcoes.ordem,
    enunciado,
    dica: "",
    feedbackAcerto: `${palavra.ingles} significa ${palavra.traducao}.`,
    feedbackErro: `Quase! ${palavra.ingles} significa ${palavra.traducao}.`,
    alternativas: opcoes.ordem % 2 === 0 ? [par[1], par[0]] : par,
  };
}

/** As perguntas de uma revisão, montadas do que as fases anteriores ensinaram. */
export function gerarRevisao(banco: Banco, trilha: Trilha, fase: Fase): Pergunta[] {
  const ensinadas = ensinadasAntes(banco, trilha, fase.id);
  if (ensinadas.length < 2) return [];

  // A figura, quando existe, está no Card de palavra da fase que ensinou.
  const comFiguras: Fase = {
    ...fase,
    cards: fasesDaTrilha(trilha).flatMap(({ fase: f }) =>
      f.cards.filter((c) => c.tipo === "Palavra" && c.imagem),
    ),
  };

  return ensinadas
    .map((palavra, i) =>
      gerarPergunta(banco, comFiguras, palavra.id, {
        ordem: i + 1,
        inverter: true,
        vizinhas: ensinadas,
      }),
    )
    .filter((p): p is Pergunta => Boolean(p));
}

/* ───────────────────────── para a tela do aluno ───────────────────────── */

/**
 * Traduz as Perguntas da fase para o formato que o quiz do produto entende.
 *
 * É só apresentação: nenhum campo novo entra aqui. A fase de diálogo usa o
 * formato de situação porque ali o enunciado é uma cena de conversa, não uma
 * palavra solta — o banco não tem campo de interlocutor, então quem fala é o
 * Bubo.
 */
export function perguntasParaOQuiz(banco: Banco, fase: Fase): Question[] {
  return perguntasProntas(fase).flatMap((p) => {
    const alternativas = p.alternativas.filter((a) => a.texto.trim()).slice(0, 4);
    const certa = alternativas.find((a) => a.correta);
    if (!certa) return [];

    const base = {
      id: p.id,
      topic: (fase.titulo.trim() || "Demonstração").slice(0, 40),
      choices: alternativas.map((a) => ({ id: a.id, label: a.texto.trim() })),
      correctChoiceId: certa.id,
      explanation: (p.feedbackAcerto.trim() || "Muito bem!").slice(0, 140),
      ...(p.dica.trim() ? { hint: p.dica.trim().slice(0, 140) } : {}),
    };

    const bruta =
      fase.tipo === "Dialogo"
        ? { ...base, format: "situation_reply", prompt: p.enunciado.trim().slice(0, 160) }
        : p.tipo === "IMAGEM_PARA_PALAVRA"
          ? {
              ...base,
              format: "image_word",
              prompt: p.enunciado.trim().slice(0, 60),
              imageUrl: p.imagem,
            }
          : {
              ...base,
              format: p.tipo === "TRADUCAO_PARA_INGLES" ? "meaning_word" : "word_meaning",
              prompt: p.enunciado.trim().slice(0, 60),
            };

    // Conteúdo meio preenchido não pode derrubar a tela do aluno.
    const r = questionSchema.safeParse(bruta);
    return r.success ? [r.data] : [];
  });
}

/** A fase tem uma tela antes do quiz? O diálogo vai direto às perguntas. */
export function faseTemAbertura(fase: Fase): boolean {
  return fase.tipo !== "Dialogo" && fase.cards.length > 0;
}

/** Abertura só com cards de palavra e figura: é a galeria "Olha e aprende". */
export function aberturaEhGaleria(fase: Fase): boolean {
  const cards = cardsOrdenados(fase);
  return cards.length > 0 && cards.every((c) => c.tipo === "Palavra" && Boolean(c.imagem));
}

/* ───────────────────────── armazenamento ───────────────────────── */

export function lerBanco(): Banco | null {
  if (typeof window === "undefined") return null;

  try {
    const bruto = window.sessionStorage.getItem(CHAVE);
    if (!bruto) return null;

    const dados = JSON.parse(bruto) as Banco;
    // Um storage de outra versão não pode derrubar a tela do aluno.
    if (!Array.isArray(dados?.trilhas) || !Array.isArray(dados?.palavras)) return null;
    return dados;
  } catch {
    return null;
  }
}

export function gravarBanco(banco: Banco): void {
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify(banco));
  } catch {
    // Aba anônima, armazenamento cheio ou bloqueado: o conteúdo vale só até
    // sair desta tela, que ainda é mais do que nada.
  }
  window.dispatchEvent(new Event(EVENTO_DEMO));
}

/**
 * Esvazia o conteúdo — gravando vazio, não apagando a chave.
 *
 * Apagar a chave faria a próxima leitura devolver "nada guardado", e o admin
 * semearia o exemplo outra vez: apagar não apagaria nada.
 */
export function limparBanco(): void {
  gravarBanco(BANCO_VAZIO);
}

export const CHAVE_BANCO = CHAVE;

/* ───────────────────────── figuras ───────────────────────── */

/**
 * Reduz a figura antes de guardar.
 *
 * O `sessionStorage` tem alguns megabytes no total, e uma foto de celular
 * sozinha estoura isso. 512px é mais do que o quiz mostra, e o JPEG a 80%
 * deixa cada figura na casa das dezenas de kB.
 */
export function reduzirImagem(arquivo: File, lado = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();
    leitor.onerror = () => reject(new Error("não consegui ler o arquivo"));
    leitor.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("o arquivo não é uma imagem"));
      img.onload = () => {
        const escala = Math.min(1, lado / Math.max(img.width, img.height));
        const w = Math.round(img.width * escala);
        const h = Math.round(img.height * escala);

        const tela = document.createElement("canvas");
        tela.width = w;
        tela.height = h;

        const ctx = tela.getContext("2d");
        if (!ctx) return reject(new Error("este navegador não desenha canvas"));

        // Fundo branco: PNG com transparência viraria preto ao virar JPEG.
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);

        resolve(tela.toDataURL("image/jpeg", 0.8));
      };
      img.src = String(leitor.result);
    };
    leitor.readAsDataURL(arquivo);
  });
}
