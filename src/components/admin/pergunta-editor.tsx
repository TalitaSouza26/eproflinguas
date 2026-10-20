"use client";

import { useState } from "react";
import {
  alternativaVazia,
  TIPOS_PERGUNTA,
  type Banco,
  type Palavra,
  type Pergunta,
} from "@/lib/demo/banco";
import {
  Apagar,
  BOTAO_AZUL,
  BOTAO_CLARO,
  CAMPO,
  Campo,
  CampoFigura,
  Chip,
} from "@/components/admin/campos";
import { CloseIcon } from "@/components/ui/icons";
import { acharPalavra, perguntaPronta } from "@/lib/demo/banco";

/**
 * Uma pergunta, aberta por inteiro.
 *
 * Mesma ideia do card: a pergunta é uma tela do aluno, e numa tela à parte
 * cabem os campos de um lado e a pergunta no tamanho em que a criança vai
 * ler do outro — com as alternativas clicáveis, que é o que diz se a certa
 * está marcada no lugar certo.
 */
export function PerguntaEditor({
  banco,
  pergunta,
  indice,
  total,
  palavras,
  onMudar,
  onFigura,
  onFechar,
}: {
  banco: Banco;
  pergunta: Pergunta;
  indice: number;
  total: number;
  palavras: Palavra[];
  onMudar: (m: Partial<Pergunta>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  onFechar: () => void;
}) {
  const ligada = acharPalavra(banco, pergunta.palavraId);

  function mexerAlternativa(id: string, m: Partial<{ texto: string; correta: boolean }>) {
    onMudar({
      alternativas: pergunta.alternativas.map((a) =>
        a.id === id
          ? { ...a, ...m }
          : // Uma correta só: marcar a nova desmarca a antiga.
            m.correta
            ? { ...a, correta: false }
            : a,
      ),
    });
  }

  const sobrando = palavras.filter(
    (p) => !pergunta.alternativas.some((a) => a.texto.trim() === p.ingles),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep-900/70 p-4 sm:p-8">
      <div className="w-full max-w-5xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-600">
              {indice + 1}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">
              Pergunta {indice + 1} de {total}
            </h3>
            {perguntaPronta(pergunta) ? (
              <Chip cor="ok">Pronta</Chip>
            ) : (
              <Chip cor="atencao">Ainda não chega ao aluno</Chip>
            )}
          </div>

          <button
            type="button"
            aria-label="Fechar"
            onClick={onFechar}
            className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <CloseIcon className="size-5" />
          </button>
        </header>

        <div className="grid gap-6 p-6 lg:grid-cols-[1fr_360px]">
          <div className="grid content-start gap-4">
            {/* O tipo primeiro: é ele que decide se o enunciado é uma palavra,
                um significado ou uma figura. */}
            <div>
              <span className="mb-1 block text-xs font-bold text-slate-600">Tipo da pergunta</span>
              <div className="grid gap-2 sm:grid-cols-3">
                {TIPOS_PERGUNTA.map(({ tipo, nome, resumo }) => (
                  <button
                    key={tipo}
                    type="button"
                    aria-pressed={pergunta.tipo === tipo}
                    title={resumo}
                    onClick={() => onMudar({ tipo })}
                    className={`rounded-xl border px-3 py-2 text-left text-xs font-bold transition
                                focus-visible:outline-2 focus-visible:outline-offset-2
                                focus-visible:outline-blue-600 ${
                                  pergunta.tipo === tipo
                                    ? "border-blue-600 bg-blue-50 text-blue-700"
                                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                }`}
                  >
                    {nome}
                  </button>
                ))}
              </div>
            </div>

            {pergunta.tipo === "IMAGEM_PARA_PALAVRA" && (
              <div className="flex items-center gap-3">
                <CampoFigura
                  imagem={pergunta.imagem}
                  rotulo="Imagem da pergunta"
                  tamanho="h-[88px] w-[140px]"
                  onEscolher={(arquivo) => onFigura(arquivo, (imagem) => onMudar({ imagem }))}
                />
                <p className="text-xs text-slate-500">
                  A figura é o enunciado: sem ela, esta pergunta não chega ao aluno.
                </p>
              </div>
            )}

            <Campo
              id={`enunciado-${pergunta.id}`}
              rotulo="Enunciado"
              valor={pergunta.enunciado}
              placeholder="Olá"
              onChange={(enunciado) => onMudar({ enunciado })}
            />

            <div>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-xs font-bold text-slate-600">Alternativas</span>
                <span className="text-[11px] text-slate-500">Marque a correta</span>
              </div>

              <ul className="space-y-2">
                {pergunta.alternativas.map((a, i) => (
                  <li key={a.id} className="flex items-center gap-2">
                    <button
                      type="button"
                      aria-pressed={a.correta}
                      aria-label={`Marcar a alternativa ${i + 1} como correta`}
                      onClick={() => mexerAlternativa(a.id, { correta: true })}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[11px]
                                  font-extrabold transition focus-visible:outline-2
                                  focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                    a.correta
                                      ? "bg-correct-600 text-white"
                                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                                  }`}
                    >
                      {String.fromCharCode(65 + i)}
                    </button>

                    <input
                      className={CAMPO}
                      value={a.texto}
                      aria-label={`Alternativa ${i + 1}`}
                      placeholder="Hello"
                      onChange={(e) => mexerAlternativa(a.id, { texto: e.target.value })}
                    />

                    <Apagar
                      oque={`alternativa ${i + 1}`}
                      onClick={() =>
                        onMudar({
                          alternativas: pergunta.alternativas.filter((x) => x.id !== a.id),
                        })
                      }
                    />
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  disabled={pergunta.alternativas.length >= 4}
                  onClick={() =>
                    onMudar({ alternativas: [...pergunta.alternativas, alternativaVazia(false)] })
                  }
                  className={`${BOTAO_CLARO} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  + Alternativa
                </button>

                {sobrando.length > 0 && (
                  <>
                    <span className="text-[11px] text-slate-500">ou use uma palavra da fase:</span>
                    {sobrando.slice(0, 4).map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        disabled={pergunta.alternativas.length >= 4}
                        onClick={() =>
                          onMudar({
                            alternativas: [
                              ...pergunta.alternativas,
                              { ...alternativaVazia(false), texto: p.ingles },
                            ],
                          })
                        }
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600
                                   transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50
                                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        + {p.ingles}
                      </button>
                    ))}
                  </>
                )}
              </div>
            </div>

            <Campo
              id={`dica-${pergunta.id}`}
              rotulo="Dica do Bubo"
              valor={pergunta.dica}
              placeholder="É a primeira palavra que o Ethan falou na história."
              ajuda="Aparece quando o aluno pede uma dica."
              onChange={(dica) => onMudar({ dica })}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                id={`acerto-${pergunta.id}`}
                rotulo="Feedback de acerto"
                valor={pergunta.feedbackAcerto}
                placeholder="Hello significa olá."
                onChange={(feedbackAcerto) => onMudar({ feedbackAcerto })}
              />
              <Campo
                id={`erro-${pergunta.id}`}
                rotulo="Feedback de erro"
                valor={pergunta.feedbackErro}
                placeholder="Quase! Hello significa olá."
                onChange={(feedbackErro) => onMudar({ feedbackErro })}
              />
            </div>

            <p className="text-[11px] text-slate-500">
              {ligada ? (
                <>
                  Ligada à palavra <strong className="font-bold">{ligada.ingles}</strong>.
                </>
              ) : (
                "Sem palavra ligada. Gerar a pergunta a partir de uma palavra faz essa ligação."
              )}
            </p>
          </div>

          <Previa pergunta={pergunta} indice={indice + 1} total={total} />
        </div>

        <footer className="flex items-center justify-between gap-3 border-t border-slate-200 p-5">
          <p className="text-[11px] text-slate-500">
            Gravado a cada tecla. Fechar não desfaz nada.
          </p>
          <button type="button" onClick={onFechar} className={BOTAO_AZUL}>
            Pronto
          </button>
        </footer>
      </div>
    </div>
  );
}

/** Como a pergunta chega ao aluno, no tamanho em que ela chega. */
function Previa({
  pergunta,
  indice,
  total,
}: {
  pergunta: Pergunta;
  indice: number;
  total: number;
}) {
  const [escolhida, setEscolhida] = useState<string | null>(null);
  const [dica, setDica] = useState(false);
  const alternativas = pergunta.alternativas.filter((a) => a.texto.trim());

  return (
    <aside className="h-fit rounded-2xl bg-deep-900 p-5 text-white">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-wide text-blue-200">
          Prévia do aluno
        </p>
        <button
          type="button"
          onClick={() => {
            setEscolhida(null);
            setDica(false);
          }}
          className="rounded-full px-2 py-1 text-[11px] font-bold text-blue-200 transition
                     hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-white"
        >
          Reiniciar
        </button>
      </div>

      <p className="mt-4 text-[11px] font-bold text-accent-500">
        Pergunta {indice} de {total}
      </p>

      {pergunta.tipo === "IMAGEM_PARA_PALAVRA" &&
        (pergunta.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
          <img
            src={pergunta.imagem}
            alt=""
            className="mt-2 h-36 w-full rounded-xl bg-white object-contain p-2"
          />
        ) : (
          <div className="mt-2 flex h-36 w-full items-center justify-center rounded-xl bg-white/10 text-xs text-blue-200">
            sem figura
          </div>
        ))}

      <p className="mt-2 text-2xl font-extrabold leading-snug">
        {pergunta.enunciado.trim() || <span className="text-blue-200">Sem enunciado</span>}
      </p>

      <ul className="mt-4 space-y-2">
        {alternativas.map((a) => {
          const marcada = escolhida === a.id;
          const cor = !marcada
            ? "bg-white text-slate-900"
            : a.correta
              ? "bg-correct-50 text-correct-700"
              : "bg-wrong-50 text-wrong-700";

          return (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setEscolhida(a.id)}
                className={`w-full rounded-full px-4 py-3 text-left text-base font-bold transition
                            focus-visible:outline-2 focus-visible:outline-offset-2
                            focus-visible:outline-white ${cor}`}
              >
                {a.texto}
              </button>
            </li>
          );
        })}
      </ul>

      {escolhida && (
        <p className="mt-3 text-sm leading-relaxed text-blue-100">
          {alternativas.find((a) => a.id === escolhida)?.correta
            ? pergunta.feedbackAcerto.trim() || "Sem feedback de acerto."
            : pergunta.feedbackErro.trim() || "Sem feedback de erro."}
        </p>
      )}

      <button
        type="button"
        onClick={() => setDica((d) => !d)}
        className="mt-4 w-full rounded-full bg-white/10 px-4 py-2.5 text-sm font-bold text-white
                   transition hover:bg-white/20 focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Pedir uma dica ao Bubo
      </button>

      {dica && (
        <p className="mt-2 text-sm leading-relaxed text-blue-100">
          {pergunta.dica.trim() || "Esta pergunta ainda não tem dica."}
        </p>
      )}
    </aside>
  );
}
