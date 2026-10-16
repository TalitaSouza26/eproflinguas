"use client";

import { useState } from "react";
import { BOTAO_CLARO, CAMPO, Campo } from "@/components/admin/campos";
import {
  geradasDaFase,
  palavrasProntas,
  perguntasDaFase,
  type AjustePergunta,
  type DemoFase,
  type DemoTrilha,
} from "@/lib/demo/trilha";

/**
 * As perguntas da fase: geradas, visíveis e retocáveis.
 *
 * Elas saem do conteúdo — as palavras, as conversas, o que a trilha já
 * ensinou. Isso acerta a maioria dos casos e é o que evita digitar quarenta
 * campos por fase. Mas nem sempre acerta: um enunciado que fica melhor com
 * outras palavras, uma explicação mais clara, um distrator fácil demais.
 *
 * Então em vez de escolher entre "tudo automático" e "tudo na mão", aqui se
 * vê o que foi gerado e se muda só o que precisa. O que você não toca
 * continua acompanhando o conteúdo: corrigiu a tradução de uma palavra, a
 * pergunta dela se corrige junto.
 */
export function QuizEditor({
  trilha,
  indice,
  onMudar,
}: {
  trilha: DemoTrilha;
  indice: number;
  onMudar: (mudanca: Partial<DemoFase>) => void;
}) {
  const [aberta, setAberta] = useState<string | null>(null);

  const fase = trilha.fases[indice];
  const geradas = geradasDaFase(trilha, indice);
  const valendo = perguntasDaFase(trilha, indice).length;

  // O distrator só pode ser palavra desta fase: alternativa de outro assunto
  // se resolve por eliminação, sem o aluno saber nada.
  const palavras = palavrasProntas(fase);

  function ajustar(chave: string, mudanca: Partial<AjustePergunta>) {
    onMudar({
      ajustes: { ...fase.ajustes, [chave]: { ...fase.ajustes?.[chave], ...mudanca } },
    });
  }

  function desfazer(chave: string) {
    const resto = { ...(fase.ajustes ?? {}) };
    delete resto[chave];
    onMudar({ ajustes: resto });
  }

  if (geradas.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        {fase.tipo === "revisao"
          ? "Nenhuma ainda: a revisão precisa de ao menos duas palavras ensinadas nas fases anteriores."
          : "Nenhuma ainda: falta completar o conteúdo acima."}
      </p>
    );
  }

  return (
    <>
      <p className="mb-3 text-sm font-semibold text-slate-700">
        {valendo} {valendo === 1 ? "pergunta" : "perguntas"}
        {valendo !== geradas.length && ` · ${geradas.length - valendo} fora do quiz`}
      </p>

      <ul className="space-y-2">
        {geradas.map((g) => {
          const ajuste = fase.ajustes?.[g.chave];
          const bruta = g.bruta as {
            prompt: string;
            choices: { id: string; label: string }[];
            correctChoiceId: string;
            explanation: string;
            hint?: string;
          };
          const certa = bruta.choices.find((c) => c.id === bruta.correctChoiceId);
          const errada = bruta.choices.find((c) => c.id !== bruta.correctChoiceId);
          const estaAberta = aberta === g.chave;
          const retocada = Boolean(ajuste && Object.keys(ajuste).length > 0);

          return (
            <li
              key={g.chave}
              className={`rounded-lg border ${
                ajuste?.fora ? "border-slate-200 bg-slate-50" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-3 p-3">
                <button
                  type="button"
                  aria-expanded={estaAberta}
                  onClick={() => setAberta(estaAberta ? null : g.chave)}
                  className="flex min-w-0 flex-1 items-center gap-3 text-left focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-sm font-semibold ${
                        ajuste?.fora ? "text-slate-400 line-through" : "text-slate-900"
                      }`}
                    >
                      {ajuste?.prompt?.trim() || bruta.prompt}
                    </span>
                    <span className="block truncate text-xs text-slate-500">
                      <span className="font-semibold text-emerald-700">{certa?.label}</span>
                      {" · "}
                      {ajuste?.distrator?.trim() || errada?.label}
                    </span>
                  </span>

                  {retocada && !ajuste?.fora && (
                    <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                      retocada
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => ajustar(g.chave, { fora: !ajuste?.fora })}
                  className="shrink-0 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-500
                             transition hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-2
                             focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  {ajuste?.fora ? "Pôr de volta" : "Tirar"}
                </button>
              </div>

              {estaAberta && (
                <div className="border-t border-slate-200 p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Campo
                      id={`prompt-${indice}-${g.chave}`}
                      rotulo="Enunciado"
                      valor={ajuste?.prompt ?? ""}
                      placeholder={bruta.prompt}
                      onChange={(prompt) => ajustar(g.chave, { prompt })}
                    />

                    <label className="block">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                        A alternativa errada
                      </span>
                      <select
                        id={`distrator-${indice}-${g.chave}`}
                        className={CAMPO}
                        value={ajuste?.distrator ?? ""}
                        onChange={(e) => ajustar(g.chave, { distrator: e.target.value })}
                      >
                        <option value="">{errada?.label} — escolhida pelo gerador</option>
                        {palavras
                          .filter((p) => p.en !== certa?.label)
                          .map((p) => (
                            <option key={p.en} value={p.en}>
                              {p.en}
                            </option>
                          ))}
                      </select>
                    </label>

                    <Campo
                      id={`explicacao-${indice}-${g.chave}`}
                      rotulo="Explicação depois de responder"
                      valor={ajuste?.explicacao ?? ""}
                      placeholder={bruta.explanation}
                      onChange={(explicacao) => ajustar(g.chave, { explicacao })}
                    />

                    <Campo
                      id={`dicaq-${indice}-${g.chave}`}
                      rotulo="Dica do Bubo"
                      valor={ajuste?.dica ?? ""}
                      placeholder={bruta.hint ?? "nenhuma"}
                      onChange={(dica) => ajustar(g.chave, { dica })}
                    />
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Campo em branco segue o gerador. A resposta certa não se edita aqui: ela é a
                    palavra, e muda mudando a palavra.
                  </p>

                  {retocada && (
                    <button
                      type="button"
                      onClick={() => desfazer(g.chave)}
                      className={`${BOTAO_CLARO} mt-3`}
                    >
                      Voltar ao gerado
                    </button>
                  )}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}
