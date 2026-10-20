"use client";

import { useState } from "react";
import {
  AcaoLinha,
  Apagar,
  BOTAO_CLARO,
  CAMPO,
  Campo,
  CampoFigura,
  Chip,
} from "@/components/admin/campos";
import { ChevronDownIcon, CopyIcon } from "@/components/ui/icons";
import {
  acharPalavra,
  alternativaVazia,
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
 * O editor das perguntas de uma fase.
 *
 * Vive em dois lugares — no passo 6 de "Editar fase" e na aba Perguntas —,
 * porque é a mesma coisa sendo feita: o que muda é só por onde se chega.
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
  const [abertaId, setAbertaId] = useState<string | null>(perguntas[0]?.id ?? null);
  const aberta = perguntas.find((p) => p.id === abertaId) ?? perguntas[0];

  function reordenar(lista: Pergunta[]) {
    onMudar(lista.map((p, i) => ({ ...p, ordem: i + 1 })));
  }

  function mexer(id: string, mudanca: Partial<Pergunta>) {
    onMudar(perguntas.map((p) => (p.id === id ? { ...p, ...mudanca } : p)));
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

  const total = perguntas.length;
  const alternativas = perguntas.reduce((s, p) => s + p.alternativas.length, 0);

  return (
    <div>
      {palavras.length >= 2 && (
        <section className="rounded-xl bg-blue-50 p-4">
          <h4 className="text-sm font-extrabold text-slate-900">Criar a partir das palavras</h4>
          <p className="mt-0.5 text-xs text-slate-600">
            Gera enunciado, dica, feedbacks e alternativas usando as palavras e a história da
            fase. Depois é só revisar.
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
                      {jaTem ? "Já tem pergunta. Gerar outra" : `Gerar pergunta (${palavra.traducao})`}
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
          {total} {total === 1 ? "pergunta" : "perguntas"} e {alternativas}{" "}
          {alternativas === 1 ? "alternativa" : "alternativas"}
        </p>
      </div>

      <ul className="mt-2 flex flex-wrap gap-2">
        {perguntas.map((p, i) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => setAbertaId(p.id)}
              className={`flex max-w-[260px] items-center gap-2 rounded-full px-3 py-1.5 text-xs
                          font-semibold transition focus-visible:outline-2
                          focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                            p.id === aberta?.id
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          }`}
            >
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold ${
                  p.id === aberta?.id
                    ? "bg-white/25"
                    : perguntaPronta(p)
                      ? "bg-correct-50 text-correct-700"
                      : "bg-accent-50 text-accent-600"
                }`}
              >
                {i + 1}
              </span>
              <span className="truncate">{p.enunciado.trim() || "Sem enunciado"}</span>
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={() => {
              const nova = perguntaVazia(perguntas.length + 1);
              onMudar([...perguntas, nova]);
              setAbertaId(nova.id);
            }}
            className="rounded-full border border-dashed border-slate-300 px-3 py-1.5 text-xs
                       font-semibold text-slate-600 transition hover:bg-slate-50
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            + Adicionar pergunta
          </button>
        </li>
      </ul>

      {!aberta ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
          Nenhuma pergunta ainda. Gere a partir de uma palavra acima, ou adicione uma à mão.
        </p>
      ) : (
        <div className="mt-4 grid gap-5 lg:grid-cols-[1fr_320px]">
          <UmaPergunta
            banco={banco}
            pergunta={aberta}
            indice={perguntas.findIndex((p) => p.id === aberta.id)}
            palavras={palavras}
            onMudar={(m) => mexer(aberta.id, m)}
            onFigura={onFigura}
            onMover={(passo) => {
              const i = perguntas.findIndex((p) => p.id === aberta.id);
              const j = i + passo;
              if (j < 0 || j >= perguntas.length) return;
              const lista = [...perguntas];
              [lista[i], lista[j]] = [lista[j], lista[i]];
              reordenar(lista);
            }}
            onDuplicar={() => {
              const copia: Pergunta = {
                ...aberta,
                id: novoId("per"),
                ordem: perguntas.length + 1,
                alternativas: aberta.alternativas.map((a) => ({ ...a, id: novoId("alt") })),
              };
              onMudar([...perguntas, copia]);
              setAbertaId(copia.id);
            }}
            onApagar={() => {
              const resto = perguntas.filter((p) => p.id !== aberta.id);
              reordenar(resto);
              setAbertaId(resto[0]?.id ?? null);
            }}
          />

          <Previa
            pergunta={aberta}
            indice={perguntas.findIndex((p) => p.id === aberta.id) + 1}
            total={total}
          />
        </div>
      )}
    </div>
  );
}

function UmaPergunta({
  banco,
  pergunta,
  indice,
  palavras,
  onMudar,
  onFigura,
  onMover,
  onDuplicar,
  onApagar,
}: {
  banco: Banco;
  pergunta: Pergunta;
  indice: number;
  palavras: Palavra[];
  onMudar: (m: Partial<Pergunta>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  onMover: (passo: number) => void;
  onDuplicar: () => void;
  onApagar: () => void;
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

  return (
    <section className="rounded-xl border border-slate-200 p-4">
      <header className="flex items-center justify-between gap-2">
        <h5 className="text-sm font-extrabold text-slate-900">Pergunta {indice + 1}</h5>
        <div className="flex items-center gap-0.5">
          <AcaoLinha rotulo="Subir" onClick={() => onMover(-1)}>
            <ChevronDownIcon className="size-4 rotate-180" />
          </AcaoLinha>
          <AcaoLinha rotulo="Descer" onClick={() => onMover(1)}>
            <ChevronDownIcon className="size-4" />
          </AcaoLinha>
          <AcaoLinha rotulo="Duplicar" onClick={onDuplicar}>
            <CopyIcon className="size-4" />
          </AcaoLinha>
          <Apagar oque={`pergunta ${indice + 1}`} onClick={onApagar} />
        </div>
      </header>

      <div className="mt-3 grid gap-3">
        <Campo
          id={`enunciado-${pergunta.id}`}
          rotulo="Enunciado"
          valor={pergunta.enunciado}
          placeholder="Qual é a palavra em inglês para “Olá”?"
          onChange={(enunciado) => onMudar({ enunciado })}
        />

        <div>
          <span className="mb-1 block text-xs font-bold text-slate-600">Tipo da pergunta</span>
          <div className="grid gap-2 sm:grid-cols-3">
            {TIPOS_PERGUNTA.map(({ tipo, nome }) => (
              <button
                key={tipo}
                type="button"
                aria-pressed={pergunta.tipo === tipo}
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
              onEscolher={(arquivo) => onFigura(arquivo, (imagem) => onMudar({ imagem }))}
            />
            <p className="text-xs text-slate-500">
              A figura é o enunciado: sem ela, esta pergunta não chega ao aluno.
            </p>
          </div>
        )}

        <Campo
          id={`dica-${pergunta.id}`}
          rotulo="Dica"
          valor={pergunta.dica}
          placeholder="Pense na primeira palavra usada por Ethan."
          ajuda="Aparece quando o aluno pede uma dica ao Bubo."
          onChange={(dica) => onMudar({ dica })}
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
                  onClick={() => mexerAlternativa(a.id, { correta: true })}
                  className={`flex w-[86px] shrink-0 items-center justify-center gap-1 rounded-full px-2 py-1.5
                              text-[11px] font-bold transition focus-visible:outline-2
                              focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                                a.correta
                                  ? "bg-correct-50 text-correct-700"
                                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                              }`}
                >
                  {a.correta ? "Correta" : String.fromCharCode(65 + i)}
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
              + Adicionar alternativa
            </button>

            {palavras.length > 0 && (
              <>
                <span className="text-[11px] text-slate-500">ou use uma palavra da fase:</span>
                {palavras
                  .filter((p) => !pergunta.alternativas.some((a) => a.texto.trim() === p.ingles))
                  .slice(0, 4)
                  .map((p) => (
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

        <div className="grid gap-3 sm:grid-cols-2">
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
    </section>
  );
}

/** Como a pergunta chega ao aluno. */
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
  const alternativas = pergunta.alternativas.filter((a) => a.texto.trim());
  const [dica, setDica] = useState(false);

  return (
    <aside className="h-fit rounded-xl bg-deep-900 p-4 text-white">
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

      <p className="mt-3 text-[11px] font-bold text-accent-500">
        Pergunta {indice} de {total}
      </p>

      {pergunta.tipo === "IMAGEM_PARA_PALAVRA" && pergunta.imagem && (
        // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
        <img
          src={pergunta.imagem}
          alt=""
          className="mt-2 h-28 w-full rounded-xl bg-white object-contain"
        />
      )}

      <p className="mt-2 text-lg font-extrabold leading-snug">
        {pergunta.enunciado.trim() || "Sem enunciado"}
      </p>

      <ul className="mt-3 space-y-2">
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
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm font-bold transition
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
        <p className="mt-3 text-xs leading-relaxed text-blue-100">
          {alternativas.find((a) => a.id === escolhida)?.correta
            ? pergunta.feedbackAcerto.trim() || "Sem feedback de acerto."
            : pergunta.feedbackErro.trim() || "Sem feedback de erro."}
        </p>
      )}

      <button
        type="button"
        onClick={() => setDica((d) => !d)}
        className="mt-3 w-full rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white
                   transition hover:bg-white/20 focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        Pedir uma dica ao Bubo
      </button>

      {dica && (
        <p className="mt-2 text-xs leading-relaxed text-blue-100">
          {pergunta.dica.trim() || "Esta pergunta ainda não tem dica."}
        </p>
      )}

      {!perguntaPronta(pergunta) && (
        <p className="mt-3">
          <Chip cor="atencao">Ainda não chega ao aluno</Chip>
        </p>
      )}
    </aside>
  );
}
