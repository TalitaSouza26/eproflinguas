import { questionSchema, type Question } from "@/lib/quiz/types";

/**
 * A trilha de demonstração, montada no /admin.
 *
 * Vive no `sessionStorage` do navegador e morre quando a aba fecha. É de
 * propósito: o que se quer provar aqui é o caminho — montar uma trilha e vê-la
 * funcionando na tela do aluno —, não guardar conteúdo. Banco entra depois, e
 * guardar agora em arquivo ou cookie seria construir a parte que vai ser
 * jogada fora.
 *
 * Só existe uma por vez. Duas trilhas demo não ensinariam nada a mais e
 * dobrariam a tela do admin.
 */

const CHAVE = "eprof-demo-trilha";

/** Avisa as telas abertas que a trilha mudou, sem precisar recarregar. */
export const EVENTO_DEMO = "eprof:demo-trilha";

/**
 * Os quatro jeitos de uma fase ensinar.
 *
 * São os que o produto já sabe desenhar — não há um quinto escondido. A
 * revisão é o único que não recebe conteúdo: ela se monta do que veio antes.
 */
export type TipoFase = "galeria" | "historia" | "dialogo" | "revisao";

export const TIPOS: { tipo: TipoFase; nome: string; resumo: string }[] = [
  {
    tipo: "galeria",
    nome: "Galeria",
    resumo: "Cartões com figura, palavra e tradução. Para coisa que se desenha.",
  },
  {
    tipo: "historia",
    nome: "História",
    resumo: "Cenas com texto e uma palavra em destaque. Para o que só faz sentido numa situação.",
  },
  {
    tipo: "dialogo",
    nome: "Diálogo",
    resumo: "Alguém fala com o aluno e ele escolhe o que responder. Sem abertura.",
  },
  {
    tipo: "revisao",
    nome: "Revisão",
    resumo: "Gerada: repassa o que a trilha ensinou, sempre por outro caminho.",
  },
];

export type DemoPalavra = {
  en: string;
  pt: string;
  /** Obrigatória na galeria, opcional na história. */
  imagem: string | null;
  /** O apoio que o aluno pede ao Bubo. Opcional. */
  dica: string;
};

/**
 * Uma cena da história: texto, uma palavra em destaque, texto.
 *
 * A palavra é opcional. As histórias do produto têm cenas que só narram — a
 * que abre a parte e a que fecha —, e obrigar uma palavra em cada cena
 * tornaria metade delas impossível de escrever aqui.
 */
export type DemoCena = {
  antes: string;
  /** A palavra em inglês destacada, do léxico da fase. Vazio = cena só de narração. */
  palavra: string;
  depois: string;
  imagem: string | null;
};

export type DemoDialogo = {
  /** A situação, em português: o enunciado que o aluno lê. */
  situacao: string;
  quemFala: string;
  /** O que a outra pessoa diz, em inglês. */
  oQueDiz: string;
  /** A resposta certa, em inglês. */
  resposta: string;
  /** A outra alternativa — uma fala real, não um absurdo. */
  distrator: string;
  /** O apoio que o aluno pede ao Bubo. Opcional. */
  dica: string;
};

/**
 * O que você mudou numa pergunta gerada.
 *
 * As perguntas saem do conteúdo, e isso resolve a maioria dos casos — mas
 * não todos: um enunciado que fica melhor com outras palavras, uma
 * explicação mais clara, um distrator que ficou fácil demais. Em vez de
 * largar a geração e passar a digitar tudo, guarda-se só a diferença.
 *
 * A chave é o assunto da pergunta (a palavra, ou a fala da conversa) e não
 * a posição: assim reordenar o conteúdo não embaralha os ajustes.
 */
export type AjustePergunta = {
  prompt?: string;
  explicacao?: string;
  dica?: string;
  /** A alternativa errada, escolhida entre as palavras da fase. */
  distrator?: string;
  /** Tirada do quiz, sem apagar o conteúdo que a gerou. */
  fora?: boolean;
};

export type DemoFase = {
  tipo: TipoFase;
  titulo: string;
  /** Só na história: o que acontece nesta parte, dito na capa. */
  subtitulo: string;
  /** Só na história: a ilustração da capa. A cena, não o mascote. */
  capa: string | null;
  palavras: DemoPalavra[];
  cenas: DemoCena[];
  dialogos: DemoDialogo[];
  /** Os retoques nas perguntas geradas, por assunto. */
  ajustes: Record<string, AjustePergunta>;
};

export type DemoTrilha = {
  /** Identidade estável: o nome muda, os links não podem quebrar. */
  id: string;
  nome: string;
  /** O assunto da trilha, como "Cores" ou "Escola". Aparece na lista. */
  tema: string;
  fases: DemoFase[];
};

/** Tudo que foi montado no admin. */
export type DemoDados = { trilhas: DemoTrilha[] };

export const palavraVazia = (): DemoPalavra => ({ en: "", pt: "", imagem: null, dica: "" });
export const cenaVazia = (): DemoCena => ({ antes: "", palavra: "", depois: "", imagem: null });
export const dialogoVazio = (): DemoDialogo => ({
  situacao: "",
  quemFala: "",
  oQueDiz: "",
  resposta: "",
  distrator: "",
  dica: "",
});

export const faseVazia = (tipo: TipoFase = "galeria"): DemoFase => ({
  tipo,
  titulo: "",
  subtitulo: "",
  capa: null,
  palavras: tipo === "revisao" || tipo === "dialogo" ? [] : [palavraVazia(), palavraVazia()],
  cenas: [],
  dialogos: tipo === "dialogo" ? [dialogoVazio()] : [],
  ajustes: {},
});

export const SEM_NADA: DemoDados = { trilhas: [] };

export function trilhaVazia(): DemoTrilha {
  return {
    id: `t${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`,
    nome: "",
    tema: "",
    fases: [faseVazia("galeria")],
  };
}

/**
 * O que está completo o bastante para virar conteúdo.
 *
 * A galeria exige figura porque o quiz dela é de imagem: sem a figura não há
 * pergunta. A história não exige, porque ali a palavra é ensinada pelo texto
 * da cena — a figura, quando existe, só entra na revisão.
 */
export function palavrasProntas(fase: DemoFase): DemoPalavra[] {
  const lista = fase.tipo === "historia" ? palavrasDaHistoria(fase) : fase.palavras;
  return lista.filter((p) => p.en.trim() && p.pt.trim() && (fase.tipo !== "galeria" || p.imagem));
}

/**
 * As palavras que a história ensina, na ordem em que aparecem.
 *
 * Saem das cenas, não da lista: é a cena que ensina, e a lista é só onde a
 * tradução e a dica ficam guardadas. Assim uma palavra que você tirou da
 * história para de ser cobrada no quiz sem precisar apagá-la da lista — e se
 * você a trouxer de volta, a tradução ainda está lá.
 */
/**
 * Duas grafias da mesma palavra.
 *
 * A história real marca "My name is" na cena e ensina "My name is…", com
 * reticências. São a mesma expressão, e tratá-las como duas criaria uma
 * entrada vazia no dicionário. Compara sem maiúsculas e sem a pontuação do
 * fim, que é enfeite da frase e não parte da palavra.
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

export function palavrasDaHistoria(fase: DemoFase): DemoPalavra[] {
  const vistas = new Set<string>();
  const saida: DemoPalavra[] = [];

  for (const cena of fase.cenas) {
    const en = cena.palavra.trim();
    if (!en || [...vistas].some((v) => mesmaPalavra(v, en))) continue;
    vistas.add(en);

    // A entrada guardada ganha: ela tem a grafia completa, a tradução e a dica.
    const guardada = fase.palavras.find((p) => mesmaPalavra(p.en, en));
    saida.push(guardada ?? { en, pt: "", imagem: null, dica: "" });
  }

  return saida;
}

export function cenasProntas(fase: DemoFase): DemoCena[] {
  return fase.cenas.filter((c) => c.antes.trim() || c.depois.trim() || c.palavra.trim());
}

export function dialogosProntos(fase: DemoFase): DemoDialogo[] {
  return fase.dialogos.filter(
    (d) => d.situacao.trim() && d.oQueDiz.trim() && d.resposta.trim() && d.distrator.trim(),
  );
}

/** Uma fase está pronta quando rende ao menos uma pergunta. */
export function faseCompleta(trilha: DemoTrilha, i: number): boolean {
  return perguntasDaFase(trilha, i).length > 0;
}

/** Quantas fases da trilha já rendem conteúdo. */
export function fasesProntas(trilha: DemoTrilha): number {
  return trilha.fases.filter((_, i) => faseCompleta(trilha, i)).length;
}

/** Uma trilha chega ao aluno quando tem nome e ao menos uma fase pronta. */
export function trilhaNoAr(trilha: DemoTrilha): boolean {
  return Boolean(trilha.nome.trim()) && fasesProntas(trilha) > 0;
}

export function acharTrilha(dados: DemoDados | null, id: string): DemoTrilha | undefined {
  return dados?.trilhas.find((t) => t.id === id);
}

export function lerDemo(): DemoDados | null {
  if (typeof window === "undefined") return null;

  try {
    const bruto = window.sessionStorage.getItem(CHAVE);
    if (!bruto) return null;

    const dados = JSON.parse(bruto) as DemoDados;
    // Um storage de outra versão não pode derrubar a tela do aluno.
    if (!Array.isArray(dados?.trilhas)) return null;
    return dados;
  } catch {
    return null;
  }
}

export function gravarDemo(dados: DemoDados): void {
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify(dados));
  } catch {
    // Aba anônima, armazenamento cheio ou bloqueado: a trilha vale só até
    // sair desta tela, que ainda é mais do que nada.
  }
  window.dispatchEvent(new Event(EVENTO_DEMO));
}

/**
 * Esvazia o conteúdo — gravando vazio, não apagando a chave.
 *
 * Apagar a chave faria a próxima leitura devolver "nada guardado", e o admin
 * semearia a trilha de exemplo outra vez: apagar não apagaria nada.
 */
export function limparDemo(): void {
  gravarDemo({ trilhas: [] });
}

/** Uma pergunta gerada, com o assunto que a identifica entre as suas. */
export type Gerada = { chave: string; bruta: Record<string, unknown> };

/** A resposta certa alterna de posição: fixa, a criança decora o lugar. */
function duasAlternativas(certa: string, errada: string, indice: number) {
  const a = { id: "a", label: certa };
  const b = { id: "b", label: errada };
  return indice % 2 === 0 ? [a, b] : [b, a];
}

/** O par da palavra dentro da própria lista — nunca um distrator de outro assunto. */
function vizinha<T>(lista: T[], i: number): T {
  return lista[(i + 1) % lista.length];
}

function daGaleria(fase: DemoFase, prefixo: string, anterior?: DemoFase): Gerada[] {
  const palavras = palavrasProntas(fase);
  if (palavras.length < 2) return [];

  const perguntas: Gerada[] = palavras.map((p, i) => ({
    chave: p.en,
    bruta: {
      id: `${prefixo}-g${i + 1}`,
      format: "image_word",
      topic: fase.titulo || "Demonstração",
      prompt: "What is this?",
      promptTranslation: "O que é isto?",
      imageUrl: p.imagem,
      choices: duasAlternativas(p.en, vizinha(palavras, i).en, i),
      correctChoiceId: i % 2 === 0 ? "a" : "b",
      explanation: `${p.en} significa ${p.pt}.`,
      ...(p.dica.trim() ? { hint: p.dica.trim() } : {}),
    },
  }));

  // Uma retomada da fase anterior, no fim.
  //
  // Sem ela cada fase vira uma ilha: a criança aprende quatro palavras e só
  // as reencontra na revisão, três fases depois. É o que a trilha "Casa e
  // família" já faz à mão, e o gerador não fazia.
  const antigas = anterior ? palavrasProntas(anterior) : [];
  if (antigas.length >= 2) {
    const alvo = antigas[0];
    const outra = antigas[1];
    perguntas.push({
      chave: `retomada:${alvo.en}`,
      bruta: {
        id: `${prefixo}-g0`,
        format: "image_word",
        topic: fase.titulo || "Demonstração",
        prompt: "What is this?",
        promptTranslation: "O que é isto?",
        imageUrl: alvo.imagem,
        choices: duasAlternativas(alvo.en, outra.en, palavras.length),
        correctChoiceId: palavras.length % 2 === 0 ? "a" : "b",
        explanation: `${alvo.en} significa ${alvo.pt}.`,
        ...(alvo.dica.trim() ? { hint: alvo.dica.trim() } : {}),
      },
    });
  }

  return perguntas;
}

function daHistoria(fase: DemoFase, prefixo: string): Gerada[] {
  const palavras = palavrasProntas(fase);
  if (palavras.length < 2) return [];

  // A história ensina pelo texto, então o quiz dela cobra por texto também:
  // o significado em português e o aluno escolhe a palavra em inglês.
  return palavras.map((p, i) => ({
    chave: p.en,
    bruta: {
      id: `${prefixo}-h${i + 1}`,
      format: "meaning_word",
      topic: fase.titulo || "Demonstração",
      prompt: p.pt,
      choices: duasAlternativas(p.en, vizinha(palavras, i).en, i),
      correctChoiceId: i % 2 === 0 ? "a" : "b",
      explanation: `${p.en} significa ${p.pt}.`,
      ...(p.dica.trim() ? { hint: p.dica.trim() } : {}),
    },
  }));
}

function doDialogo(fase: DemoFase, prefixo: string): Gerada[] {
  return dialogosProntos(fase).map((d, i) => ({
    chave: d.oQueDiz,
    bruta: {
      id: `${prefixo}-d${i + 1}`,
      format: "situation_reply",
      topic: fase.titulo || "Demonstração",
      prompt: d.situacao,
      speakerLine: d.oQueDiz,
      ...(d.quemFala.trim() ? { speaker: d.quemFala.trim() } : {}),
      choices: duasAlternativas(d.resposta, d.distrator, i),
      correctChoiceId: i % 2 === 0 ? "a" : "b",
      explanation: `Responde-se “${d.resposta}”.`,
      ...(d.dica.trim() ? { hint: d.dica.trim() } : {}),
    },
  }));
}

/**
 * A revisão, gerada do que a trilha ensinou.
 *
 * A regra é uma: cada palavra volta **num formato diferente do que a ensinou**.
 * Quem aprendeu pela figura é cobrado por texto; quem aprendeu pelo texto é
 * cobrado pela figura, quando ela existe. Repetir a mesma pergunta do mesmo
 * jeito não é revisar — é repetir, e foi o que a revisão escrita à mão acabou
 * virando.
 *
 * Por isso ela não se escreve: muda uma palavra da trilha e a revisão
 * acompanha sozinha.
 */
function daRevisao(trilha: DemoTrilha, ate: number, prefixo: string): Gerada[] {
  const ensinadas: { palavra: DemoPalavra; porFigura: boolean }[] = [];

  for (const fase of trilha.fases.slice(0, ate)) {
    if (fase.tipo !== "galeria" && fase.tipo !== "historia") continue;
    for (const palavra of palavrasProntas(fase)) {
      ensinadas.push({ palavra, porFigura: fase.tipo === "galeria" });
    }
  }

  if (ensinadas.length < 2) return [];

  return ensinadas.map(({ palavra, porFigura }, i) => {
    const outra = vizinha(ensinadas, i).palavra;
    const base = {
      id: `${prefixo}-r${i + 1}`,
      topic: "Revisão",
      explanation: `${palavra.en} significa ${palavra.pt}.`,
      ...(palavra.dica.trim() ? { hint: palavra.dica.trim() } : {}),
    };

    // Ensinada pela figura: agora vem por texto.
    if (porFigura) {
      return {
        chave: palavra.en,
        bruta: {
          ...base,
          format: "meaning_word",
          prompt: palavra.pt,
          choices: duasAlternativas(palavra.en, outra.en, i),
          correctChoiceId: i % 2 === 0 ? "a" : "b",
        },
      };
    }

    // Ensinada pelo texto: volta pela figura, quando houver uma.
    if (palavra.imagem) {
      return {
        chave: palavra.en,
        bruta: {
          ...base,
          format: "image_word",
          prompt: "What is this?",
          promptTranslation: "O que é isto?",
          imageUrl: palavra.imagem,
          choices: duasAlternativas(palavra.en, outra.en, i),
          correctChoiceId: i % 2 === 0 ? "a" : "b",
        },
      };
    }

    // Sem figura, inverte o sentido da pergunta: palavra → significado.
    return {
      chave: palavra.en,
      bruta: {
        ...base,
        format: "word_meaning",
        prompt: palavra.en,
        choices: duasAlternativas(palavra.pt, outra.pt, i),
        correctChoiceId: i % 2 === 0 ? "a" : "b",
      },
    };
  });
}

/**
 * Aplica o que você mudou numa pergunta gerada.
 *
 * Trocar o distrator mexe na alternativa errada sem tocar na certa nem na
 * posição dela: a alternância continua valendo.
 */
function comAjuste(g: Gerada, ajuste: AjustePergunta | undefined): Record<string, unknown> {
  if (!ajuste) return g.bruta;

  const bruta = { ...g.bruta };

  if (ajuste.prompt?.trim()) bruta.prompt = ajuste.prompt.trim();
  if (ajuste.explicacao?.trim()) bruta.explanation = ajuste.explicacao.trim();
  if (ajuste.dica?.trim()) bruta.hint = ajuste.dica.trim();

  if (ajuste.distrator?.trim()) {
    const certa = bruta.correctChoiceId as string;
    bruta.choices = (bruta.choices as { id: string; label: string }[]).map((c) =>
      c.id === certa ? c : { ...c, label: ajuste.distrator!.trim() },
    );
  }

  return bruta;
}

/** As perguntas que uma fase rende, com assunto e tudo — para o editor. */
export function geradasDaFase(trilha: DemoTrilha, i: number): Gerada[] {
  const fase = trilha.fases[i];
  if (!fase) return [];

  const prefixo = `demo${i + 1}`;
  const anterior = trilha.fases[i - 1];

  return fase.tipo === "galeria"
    ? daGaleria(fase, prefixo, anterior)
    : fase.tipo === "historia"
      ? daHistoria(fase, prefixo)
      : fase.tipo === "dialogo"
        ? doDialogo(fase, prefixo)
        : daRevisao(trilha, i, prefixo);
}

/** As perguntas de uma fase. Nenhuma é digitada: todas saem do conteúdo. */
export function perguntasDaFase(trilha: DemoTrilha, i: number): Question[] {
  const fase = trilha.fases[i];
  if (!fase) return [];

  // Conteúdo meio digitado não pode derrubar a tela do aluno: o que não passa
  // na validação do produto simplesmente não vira pergunta.
  return geradasDaFase(trilha, i).flatMap((g) => {
    const ajuste = fase.ajustes?.[g.chave];
    if (ajuste?.fora) return [];

    const r = questionSchema.safeParse(comAjuste(g, ajuste));
    return r.success ? [r.data] : [];
  });
}

/** A fase tem uma tela antes do quiz? O diálogo vai direto às perguntas. */
export function faseTemAbertura(fase: DemoFase): boolean {
  return fase.tipo !== "dialogo";
}

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
