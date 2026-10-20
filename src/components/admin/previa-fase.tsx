"use client";

import { useState } from "react";
import { GalleryPlayer } from "@/components/quiz/gallery-player";
import { QuizPlayer } from "@/components/quiz/quiz-player";
import { ReviewIntro } from "@/components/quiz/review-intro";
import { StoryPlayer } from "@/components/quiz/story-player";
import { CloseIcon } from "@/components/ui/icons";
import { aberturaDaFase } from "@/lib/demo/abertura";
import { perguntasParaOQuiz, type Banco, type Fase } from "@/lib/demo/banco";

/**
 * A fase inteira rodando como o aluno vê: a abertura e o quiz.
 *
 * Usa os players de verdade, não uma imitação: é a mesma conversão que a tela
 * do aluno faz. Uma reprodução escrita à parte passaria a discordar do
 * produto na primeira mudança, e a prévia mentiria sobre o que ela existe
 * para conferir.
 *
 * Ocupa a tela toda de propósito — a tela do aluno é assim, e uma miniatura
 * ao lado dos campos não diz se o texto cabe.
 */
export function PreviaFase({
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
  const perguntas = perguntasParaOQuiz(banco, fase);

  // Sem abertura, a prévia já começa no quiz: é o caso do diálogo, e o de uma
  // fase cujos cards ainda não existem.
  const [etapa, setEtapa] = useState<"abertura" | "quiz">(
    abertura || fase.tipo !== "Dialogo" ? "abertura" : "quiz",
  );

  const temQuiz = perguntas.length > 0;

  /** O que os botões do player fazem aqui: seguir para o quiz, ou fechar. */
  function adiante() {
    if (etapa === "abertura" && temQuiz) {
      setEtapa("quiz");
      return;
    }
    onFechar();
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-deep-900">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-deep-900/90 px-6 py-3 backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-wide text-blue-200">
          Prévia · {fase.titulo.trim() || "fase sem título"}
          <span className="ml-2 font-normal text-blue-300">
            {etapa === "abertura"
              ? temQuiz
                ? "abertura, e depois o quiz"
                : "abertura"
              : `quiz · ${perguntas.length} ${perguntas.length === 1 ? "pergunta" : "perguntas"}`}
          </span>
        </p>

        <div className="flex items-center gap-2">
          {etapa === "quiz" && abertura && (
            <button
              type="button"
              onClick={() => setEtapa("abertura")}
              className="rounded-full px-3 py-2 text-sm font-bold text-blue-200 transition
                         hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-white"
            >
              Voltar à abertura
            </button>
          )}
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
      </div>

      {/* Os botões dos players são links para a próxima tela da trilha. Aqui
          eles levam ao quiz desta mesma fase, ou fecham a prévia no fim. */}
      <div
        className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-5 py-8"
        onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("a")) {
            e.preventDefault();
            adiante();
          }
        }}
      >
        {etapa === "quiz" ? (
          temQuiz ? (
            <QuizPlayer
              trackSlug="demo"
              trackTitle={trilha}
              phase={numero}
              phases={numero}
              context="Prévia: nada aqui conta para o progresso."
              questions={perguntas}
              aoTerminar={onFechar}
            />
          ) : (
            <Aviso>
              Esta fase ainda não tem pergunta pronta. Uma pergunta chega ao aluno com enunciado,
              duas alternativas e uma correta marcada.
            </Aviso>
          )
        ) : abertura === null ? (
          // Sem cards, a fase ainda abre com o Bubo — é o caso da revisão.
          <ReviewIntro questions={perguntas.length} quizHref="#" />
        ) : abertura.tipo === "galeria" ? (
          <GalleryPlayer gallery={abertura.galeria} quizHref="#" />
        ) : (
          <StoryPlayer story={abertura.historia} quizHref="#" parts={numero} />
        )}
      </div>
    </div>
  );
}

function Aviso({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-sm rounded-2xl bg-white p-8 text-center text-sm text-slate-600">
      {children}
    </p>
  );
}
