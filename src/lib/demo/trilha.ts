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

export type DemoPalavra = {
  /** A palavra em inglês, como aparece no cartão e na alternativa. */
  en: string;
  pt: string;
  /** A figura, já reduzida, como data URL. Sem figura a palavra não entra no quiz. */
  imagem: string | null;
};

export type DemoTrilha = {
  nome: string;
  palavras: DemoPalavra[];
};

export const TRILHA_VAZIA: DemoTrilha = { nome: "", palavras: [] };

/** Só palavras completas viram conteúdo: as outras são rascunho de digitação. */
export function palavrasProntas(trilha: DemoTrilha): DemoPalavra[] {
  return trilha.palavras.filter((p) => p.en.trim() && p.pt.trim() && p.imagem);
}

export function lerDemo(): DemoTrilha | null {
  if (typeof window === "undefined") return null;

  try {
    const bruto = window.sessionStorage.getItem(CHAVE);
    if (!bruto) return null;

    const dados = JSON.parse(bruto) as DemoTrilha;
    // Um storage de outra versão não pode derrubar a tela do aluno.
    if (!dados?.nome || !Array.isArray(dados.palavras)) return null;
    return dados;
  } catch {
    return null;
  }
}

export function gravarDemo(trilha: DemoTrilha): void {
  try {
    window.sessionStorage.setItem(CHAVE, JSON.stringify(trilha));
  } catch {
    // Aba anônima, armazenamento cheio ou bloqueado: a trilha vale só até
    // sair desta tela, que ainda é mais do que nada.
  }
  window.dispatchEvent(new Event(EVENTO_DEMO));
}

export function limparDemo(): void {
  try {
    window.sessionStorage.removeItem(CHAVE);
  } catch {
    // Nada a fazer: já não havia o que apagar.
  }
  window.dispatchEvent(new Event(EVENTO_DEMO));
}

/**
 * As perguntas saem das palavras, não da digitação.
 *
 * Mesma receita da trilha "Casa e família": uma questão de imagem por palavra,
 * o distrator vindo da própria lista — o aluno escolhe entre duas coisas do
 * mesmo assunto, nunca entre um sofá e um cachorro — e a resposta certa
 * alternando de posição, senão a criança decora o lugar em vez da palavra.
 */
export function perguntasDa(trilha: DemoTrilha): Question[] {
  const palavras = palavrasProntas(trilha);
  if (palavras.length < 2) return [];

  return palavras.map((palavra, i) => {
    const distrator = palavras[(i + 1) % palavras.length];
    const certa = { id: "a", label: palavra.en };
    const errada = { id: "b", label: distrator.en };

    return questionSchema.parse({
      id: `demo-q${i + 1}`,
      format: "image_word",
      topic: trilha.nome || "Demonstração",
      prompt: "What is this?",
      promptTranslation: "O que é isto?",
      imageUrl: palavra.imagem,
      choices: i % 2 === 0 ? [certa, errada] : [errada, certa],
      correctChoiceId: "a",
      explanation: `${palavra.en} significa ${palavra.pt}.`,
    });
  });
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
