"use client";

import { useState } from "react";
import { AcaoLinha, Apagar, BOTAO_CLARO, Chip } from "@/components/admin/campos";
import { PerguntaEditor } from "@/components/admin/pergunta-editor";
import { ChevronDownIcon, CopyIcon } from "@/components/ui/icons";
import {
  gerarPergunta,
  novoId,
  perguntaPronta,
  perguntasOrdenadas,
  perguntaVazia,
  TIPOS_PERGUNTA,
  type Banco,
  type Fase,
  type Palavra,
  type Pergunta,
} from "@/lib/demo/banco";

/**
 * As perguntas de uma fase.
 *
 * Uma lista de linhas, como as cenas: cada pergunta é uma tela do aluno, e se
 * abre por inteiro quando se clica nela. Empilhar o editor inteiro embaixo da
 * lista fazia a tela crescer a cada pergunta escrita.
 *
 * Cada pergunta é um registro: as geradas a partir das palavras entram
 * preenchidas e dali em diante são suas, iguais às digitadas à mão. Não há
 * pergunta que se refaz sozinha pelas costas de quem escreveu.
 */
export function PerguntasEditor({
  banco,
  fase,
  palavras,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  fase: Fase;
  /** As palavras disponíveis: as da fase, ou as revisadas numa fase de revisão. */
  palavras: Palavra[];
  onMudar: (perguntas: Pergunta[]) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const perguntas = perguntasOrdenadas(fase);
  const [abertaId, setAbertaId] = useState<string | null>(null);
  const aberta = perguntas.find((p) => p.id === abertaId);

  function salvar(lista: Pergunta[]) {
    onMudar(lista.map((p, i) => ({ ...p, ordem: i + 1 })));
  }

  function gerar(palavraId: string) {
    const nova = gerarPergunta(banco, fase, palavraId, {
      ordem: perguntas.length + 1,
      inverter: fase.tipo === "Revisao",
      vizinhas: palavras,
    });
    if (!nova) return;
    onMudar([...perguntas, nova]);
    setAbertaId(nova.id);
  }

  const alternativas = perguntas.reduce((s, p) => s + p.alternativas.length, 0);

  return (
    <div>
      {palavras.length >= 2 && (
        <section className="rounded-xl bg-blue-50 p-4">
          <h4 className="text-sm font-extrabold text-slate-900">Criar a partir das palavras</h4>
          <p className="mt-0.5 text-xs text-slate-600">
            Gera enunciado, dica, feedbacks e alternativas usando as palavras e as cenas da fase.
            Depois é só revisar.
          </p>

          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {palavras.map((palavra) => {
              const jaTem = perguntas.some((p) => p.palavraId === palavra.id);
              return (
                <li key={palavra.id}>
                  <button
                    type="button"
                    onClick={() => gerar(palavra.id)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-3 text-left
                               transition hover:border-blue-400 focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    <span className="block truncate text-sm font-extrabold text-slate-900">
                      {palavra.ingles}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-slate-500">
                      {jaTem
                        ? "Já tem pergunta. Gerar outra"
                        : `Gerar pergunta (${palavra.traducao})`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="mt-5 flex items-baseline justify-between gap-3">
        <h4 className="text-sm font-extrabold text-slate-900">Perguntas desta fase</h4>
        <p className="text-xs text-slate-500">
          {perguntas.length} {perguntas.length === 1 ? "pergunta" : "perguntas"} e {alternativas}{" "}
          {alternativas === 1 ? "alternativa" : "alternativas"}
        </p>
      </div>

      {perguntas.length === 0 ? (
        <p className="mt-2 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Nenhuma pergunta ainda. Gere a partir de uma palavra acima, ou adicione uma à mão.
        </p>
      ) : (
        <ul className="mt-2 space-y-2">
          {perguntas.map((p, i) => {
            const nomeTipo = TIPOS_PERGUNTA.find((t) => t.tipo === p.tipo)?.nome ?? p.tipo;
            const comTexto = p.alternativas.filter((a) => a.texto.trim()).length;

            return (
              <li key={p.id} className="rounded-xl border border-slate-200">
                <div className="flex items-center gap-3 px-3 py-2">
                  <span
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold ${
                      perguntaPronta(p)
                        ? "bg-correct-50 text-correct-700"
                        : "bg-accent-50 text-accent-600"
                    }`}
                  >
                    {i + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => setAbertaId(p.id)}
                    className="min-w-0 flex-1 truncate text-left text-sm text-slate-700
                               underline-offset-4 hover:underline focus-visible:outline-2
                               focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                  >
                    {p.enunciado.trim() || "Sem enunciado"}
                  </button>

                  <Chip>{nomeTipo}</Chip>

                  <span className="w-28 shrink-0 text-right text-[11px] text-slate-500">
                    {comTexto} {comTexto === 1 ? "alternativa" : "alternativas"}
                  </span>

                  <AcaoLinha
                    rotulo="Subir"
                    desativado={i === 0}
                    onClick={() => {
                      const lista = [...perguntas];
                      [lista[i - 1], lista[i]] = [lista[i], lista[i - 1]];
                      salvar(lista);
                    }}
                  >
                    <ChevronDownIcon className="size-4 rotate-180" />
                  </AcaoLinha>
                  <AcaoLinha
                    rotulo="Descer"
                    desativado={i === perguntas.length - 1}
                    onClick={() => {
                      const lista = [...perguntas];
                      [lista[i], lista[i + 1]] = [lista[i + 1], lista[i]];
                      salvar(lista);
                    }}
                  >
                    <ChevronDownIcon className="size-4" />
                  </AcaoLinha>
                  <AcaoLinha
                    rotulo="Duplicar"
                    onClick={() =>
                      salvar([
                        ...perguntas,
                        {
                          ...p,
                          id: novoId("per"),
                          alternativas: p.alternativas.map((a) => ({ ...a, id: novoId("alt") })),
                        },
                      ])
                    }
                  >
                    <CopyIcon className="size-4" />
                  </AcaoLinha>
                  <Apagar
                    oque={`pergunta ${i + 1}`}
                    onClick={() => salvar(perguntas.filter((x) => x.id !== p.id))}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <button
        type="button"
        onClick={() => {
          const nova = perguntaVazia(perguntas.length + 1);
          onMudar([...perguntas, nova]);
          setAbertaId(nova.id);
        }}
        className={`${BOTAO_CLARO} mt-3`}
      >
        + Adicionar pergunta
      </button>

      {aberta && (
        <PerguntaEditor
          banco={banco}
          pergunta={aberta}
          indice={perguntas.findIndex((p) => p.id === aberta.id)}
          total={perguntas.length}
          palavras={palavras}
          onMudar={(m) =>
            onMudar(perguntas.map((p) => (p.id === aberta.id ? { ...p, ...m } : p)))
          }
          onFigura={onFigura}
          onFechar={() => setAbertaId(null)}
        />
      )}
    </div>
  );
}
