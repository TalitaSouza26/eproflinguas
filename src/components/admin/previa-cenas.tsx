"use client";

import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { StoryPlayer } from "@/components/quiz/story-player";
import { CloseIcon } from "@/components/ui/icons";
import { aberturaDaFase } from "@/lib/demo/abertura";
import type { Banco, Fase } from "@/lib/demo/banco";

/**
 * As cenas da fase rodando como o aluno vê.
 *
 * Usa os players de verdade, não uma imitação: é a mesma conversão que a tela
 * do aluno faz. Uma reprodução escrita à parte passaria a discordar do
 * produto na primeira mudança, e a prévia mentiria sobre o que existe para
 * conferir.
 *
 * Ocupa a tela toda de propósito — a tela do aluno é assim, e uma miniatura
 * ao lado dos campos não diz se o texto cabe.
 */
export function PreviaCenas({
  banco,
  fase,
  trilha,
  numero,
  onFechar,
}: {
  banco: Banco;
  fase: Fase;
  trilha: string;
  numero: number;
  onFechar: () => void;
}) {
  const abertura = aberturaDaFase(banco, fase, { trilha, numero });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-deep-900">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-deep-900/90 px-6 py-3 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-200">
          Prévia · {fase.titulo.trim() || "fase sem título"}
        </p>
        <button
          type="button"
          onClick={onFechar}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm
                     font-bold text-white transition hover:bg-white/20 focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <CloseIcon className="size-4" />
          Fechar prévia
        </button>
      </div>

      {/* Os botões dos players levam ao quiz. Aqui não há quiz para onde ir:
          o clique fecha a prévia, em vez de navegar para lugar nenhum. */}
      <div
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-5 py-8"
        onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("a")) {
            e.preventDefault();
            onFechar();
          }
        }}
      >
        {abertura === null ? (
          <p className="max-w-sm rounded-2xl bg-white p-8 text-center text-sm text-slate-600">
            Esta fase ainda não tem cards. Crie uma cena ou um card de palavra para ver a
            abertura.
          </p>
        ) : abertura.tipo === "galeria" ? (
          <GalleryPlayer gallery={abertura.galeria} quizHref="#" />
        ) : (
          <StoryPlayer story={abertura.historia} quizHref="#" parts={numero} />
        )}
      </div>
    </div>
  );
}
