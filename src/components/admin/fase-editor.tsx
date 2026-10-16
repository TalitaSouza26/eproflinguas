"use client";

import { Apagar, BOTAO_CLARO, Campo, CampoFigura, Secao } from "@/components/admin/campos";
import {
  cenaVazia,
  dialogoVazio,
  palavraVazia,
  palavrasProntas,
  TIPOS,
  type DemoFase,
  type TipoFase,
} from "@/lib/demo/trilha";

/**
 * O editor de uma fase.
 *
 * O tipo vem primeiro e decide o resto da tela: cada jeito de ensinar pede
 * campos diferentes, e mostrar todos de uma vez transformaria o formulário
 * num questionário sobre o que não se vai preencher.
 *
 * A revisão não tem campos de propósito — ela se monta do que as fases
 * anteriores ensinaram.
 */
export function FaseEditor({
  fase,
  indice,
  perguntas,
  onMudar,
  onFigura,
}: {
  fase: DemoFase;
  indice: number;
  /** Quantas perguntas esta fase já rende, contadas pelo gerador. */
  perguntas: number;
  onMudar: (mudanca: Partial<DemoFase>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  const palavras = palavrasProntas(fase);

  function trocarTipo(tipo: TipoFase) {
    onMudar({
      tipo,
      palavras: tipo === "revisao" || tipo === "dialogo" ? [] : fase.palavras,
      cenas: tipo === "historia" ? fase.cenas : [],
      dialogos: tipo === "dialogo" ? (fase.dialogos.length ? fase.dialogos : [dialogoVazio()]) : [],
    });
  }

  return (
    <div>
      <Secao titulo="Como esta fase ensina" ajuda="O tipo decide o que a fase pede e o que o aluno vê antes do quiz.">
        <div className="grid gap-2 sm:grid-cols-2">
          {TIPOS.map(({ tipo, nome, resumo }) => {
            const ativo = fase.tipo === tipo;
            return (
              <button
                key={tipo}
                type="button"
                aria-pressed={ativo}
                onClick={() => trocarTipo(tipo)}
                className={`rounded-lg border p-3 text-left transition focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                              ativo
                                ? "border-blue-600 bg-blue-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
              >
                <span className="block text-sm font-extrabold text-slate-900">{nome}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">{resumo}</span>
              </button>
            );
          })}
        </div>
      </Secao>

      <Secao titulo="Título da fase" ajuda="Aparece na abertura, acima do conteúdo.">
        <div className="max-w-sm">
          <Campo
            id={`titulo-${indice}`}
            rotulo="Título"
            valor={fase.titulo}
            placeholder={fase.tipo === "revisao" ? "Revisão" : "A família"}
            onChange={(titulo) => onMudar({ titulo })}
          />
        </div>
      </Secao>

      {(fase.tipo === "galeria" || fase.tipo === "historia") && (
        <Secao
          titulo="As palavras"
          ajuda={
            fase.tipo === "galeria"
              ? "Palavra, tradução e figura. A figura é obrigatória: o quiz da galeria é de imagem."
              : "Palavra e tradução. A figura é opcional aqui — se existir, a revisão usa ela para cobrar de outro jeito."
          }
        >
          <ul className="space-y-3">
            {fase.palavras.map((palavra, i) => (
              <li
                key={i}
                className="grid items-center gap-3 rounded-lg border border-slate-200 p-3 sm:grid-cols-[88px_1fr_1fr_auto]"
              >
                <CampoFigura
                  imagem={palavra.imagem}
                  rotulo={`Figura da palavra ${i + 1}`}
                  onEscolher={(arquivo) =>
                    onFigura(arquivo, (imagem) =>
                      onMudar({
                        palavras: fase.palavras.map((p, j) => (j === i ? { ...p, imagem } : p)),
                      }),
                    )
                  }
                />
                <Campo
                  id={`en-${indice}-${i}`}
                  rotulo="Inglês"
                  valor={palavra.en}
                  placeholder="Red"
                  onChange={(en) =>
                    onMudar({ palavras: fase.palavras.map((p, j) => (j === i ? { ...p, en } : p)) })
                  }
                />
                <Campo
                  id={`pt-${indice}-${i}`}
                  rotulo="Português"
                  valor={palavra.pt}
                  placeholder="vermelho"
                  onChange={(pt) =>
                    onMudar({ palavras: fase.palavras.map((p, j) => (j === i ? { ...p, pt } : p)) })
                  }
                />
                <div className="justify-self-end">
                  <Apagar
                    oque={`palavra ${i + 1}`}
                    onClick={() => onMudar({ palavras: fase.palavras.filter((_, j) => j !== i) })}
                  />
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onMudar({ palavras: [...fase.palavras, palavraVazia()] })}
            className={`${BOTAO_CLARO} mt-3`}
          >
            Mais uma palavra
          </button>
        </Secao>
      )}

      {fase.tipo === "historia" && (
        <Secao
          titulo="As cenas"
          ajuda="Cada cena é um texto com uma palavra em destaque. A palavra vem da lista acima, para o quiz nunca cobrar o que a história não ensinou."
        >
          {palavras.length === 0 ? (
            <p className="text-sm text-slate-500">
              Complete uma palavra acima para poder destacá-la numa cena.
            </p>
          ) : (
            <>
              <ul className="space-y-3">
                {fase.cenas.map((cena, i) => (
                  <li key={i} className="rounded-lg border border-slate-200 p-3">
                    <div className="flex items-start gap-3">
                      <CampoFigura
                        imagem={cena.imagem}
                        rotulo={`Figura da cena ${i + 1}`}
                        tamanho="h-[88px] w-[120px]"
                        onEscolher={(arquivo) =>
                          onFigura(arquivo, (imagem) =>
                            onMudar({
                              cenas: fase.cenas.map((c, j) => (j === i ? { ...c, imagem } : c)),
                            }),
                          )
                        }
                      />

                      <div className="grid flex-1 gap-3 sm:grid-cols-3">
                        <Campo
                          id={`antes-${indice}-${i}`}
                          rotulo="Texto antes"
                          valor={cena.antes}
                          placeholder="Ele sorriu e acenou: —"
                          onChange={(antes) =>
                            onMudar({ cenas: fase.cenas.map((c, j) => (j === i ? { ...c, antes } : c)) })
                          }
                        />

                        <label className="block">
                          <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
                            Palavra em destaque
                          </span>
                          <select
                            id={`palavra-${indice}-${i}`}
                            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm
                                       focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-600"
                            value={cena.palavra}
                            onChange={(e) =>
                              onMudar({
                                cenas: fase.cenas.map((c, j) =>
                                  j === i ? { ...c, palavra: e.target.value } : c,
                                ),
                              })
                            }
                          >
                            <option value="">escolha…</option>
                            {palavras.map((p) => (
                              <option key={p.en} value={p.en}>
                                {p.en}
                              </option>
                            ))}
                          </select>
                        </label>

                        <Campo
                          id={`depois-${indice}-${i}`}
                          rotulo="Texto depois"
                          valor={cena.depois}
                          placeholder="!"
                          onChange={(depois) =>
                            onMudar({ cenas: fase.cenas.map((c, j) => (j === i ? { ...c, depois } : c)) })
                          }
                        />
                      </div>

                      <Apagar
                        oque={`cena ${i + 1}`}
                        onClick={() => onMudar({ cenas: fase.cenas.filter((_, j) => j !== i) })}
                      />
                    </div>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => onMudar({ cenas: [...fase.cenas, cenaVazia()] })}
                className={`${BOTAO_CLARO} mt-3`}
              >
                Mais uma cena
              </button>
            </>
          )}
        </Secao>
      )}

      {fase.tipo === "dialogo" && (
        <Secao
          titulo="As conversas"
          ajuda="Alguém fala com o aluno e ele escolhe o que responder. O distrator precisa ser uma fala de verdade — algo absurdo se resolve por eliminação."
        >
          <ul className="space-y-3">
            {fase.dialogos.map((dialogo, i) => (
              <li key={i} className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start gap-3">
                  <div className="grid flex-1 gap-3">
                    <Campo
                      id={`situacao-${indice}-${i}`}
                      rotulo="A situação, em português"
                      valor={dialogo.situacao}
                      placeholder="Um menino novo quer saber de onde você é."
                      onChange={(situacao) =>
                        onMudar({
                          dialogos: fase.dialogos.map((d, j) => (j === i ? { ...d, situacao } : d)),
                        })
                      }
                    />

                    <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                      <Campo
                        id={`quem-${indice}-${i}`}
                        rotulo="Quem fala"
                        valor={dialogo.quemFala}
                        placeholder="Ethan"
                        onChange={(quemFala) =>
                          onMudar({
                            dialogos: fase.dialogos.map((d, j) => (j === i ? { ...d, quemFala } : d)),
                          })
                        }
                      />
                      <Campo
                        id={`diz-${indice}-${i}`}
                        rotulo="O que ele diz, em inglês"
                        valor={dialogo.oQueDiz}
                        placeholder="Where are you from?"
                        onChange={(oQueDiz) =>
                          onMudar({
                            dialogos: fase.dialogos.map((d, j) => (j === i ? { ...d, oQueDiz } : d)),
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Campo
                        id={`resposta-${indice}-${i}`}
                        rotulo="A resposta certa"
                        valor={dialogo.resposta}
                        placeholder="I am from Brazil."
                        onChange={(resposta) =>
                          onMudar({
                            dialogos: fase.dialogos.map((d, j) => (j === i ? { ...d, resposta } : d)),
                          })
                        }
                      />
                      <Campo
                        id={`distrator-${indice}-${i}`}
                        rotulo="A outra alternativa"
                        valor={dialogo.distrator}
                        placeholder="My name is Sofia."
                        onChange={(distrator) =>
                          onMudar({
                            dialogos: fase.dialogos.map((d, j) => (j === i ? { ...d, distrator } : d)),
                          })
                        }
                      />
                    </div>
                  </div>

                  <Apagar
                    oque={`conversa ${i + 1}`}
                    onClick={() => onMudar({ dialogos: fase.dialogos.filter((_, j) => j !== i) })}
                  />
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => onMudar({ dialogos: [...fase.dialogos, dialogoVazio()] })}
            className={`${BOTAO_CLARO} mt-3`}
          >
            Mais uma conversa
          </button>
        </Secao>
      )}

      <Secao
        titulo="O quiz"
        ajuda={
          fase.tipo === "revisao"
            ? "Não se escreve. A revisão repassa tudo que as fases anteriores ensinaram, sempre por um caminho diferente do que ensinou: quem aprendeu pela figura é cobrado por texto, e vice-versa."
            : "Não se escreve. Sai do conteúdo acima, com o distrator vindo da própria lista e a resposta alternando de posição."
        }
      >
        <p className="text-sm font-semibold text-slate-700">
          {perguntas > 0
            ? `${perguntas} ${perguntas === 1 ? "pergunta" : "perguntas"}.`
            : fase.tipo === "revisao"
              ? "Nenhuma ainda: a revisão precisa de ao menos duas palavras ensinadas antes dela."
              : "Nenhuma ainda: falta completar o conteúdo acima."}
        </p>
      </Secao>
    </div>
  );
}
