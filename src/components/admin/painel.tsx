"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Apagar, BOTAO_CLARO, BOTAO_FORTE, Campo, Chip } from "@/components/admin/campos";
import { FaseEditor } from "@/components/admin/fase-editor";
import { PerguntasEditor } from "@/components/admin/perguntas-editor";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  LogoutIcon,
  ReplayIcon,
} from "@/components/ui/icons";
import {
  BANCO_VAZIO,
  ensinadasAntes,
  faseCompleta,
  faseVazia,
  fasesDaTrilha,
  gravarBanco,
  lerBanco,
  limparBanco,
  palavrasDaFase,
  perguntasProntas,
  reduzirImagem,
  TIPOS_FASE,
  temaVazio,
  trilhaVazia,
  trilhaNoAr,
  type Banco,
  type Fase,
  type Palavra,
  type Tema,
  type Trilha,
} from "@/lib/demo/banco";
import { bancoDeExemplo } from "@/lib/demo/semente";

/**
 * O backoffice de demonstração.
 *
 * Duas abas, como o desenvolvedor desenhou: "Montar trilhas", onde a fase é
 * montada com a trilha, o tema, as palavras e os cards, e "Perguntas", onde
 * se escolhe uma fase pronta e se escreve o quiz dela.
 *
 * Os campos são os do banco que já está montado — nada foi inventado aqui.
 * O que não existe é o banco: o conteúdo vive na aba e morre com ela. O que
 * se quer provar é o caminho de montar, não guardar.
 */
export function Painel() {
  const [banco, setBanco] = useState<Banco>(BANCO_VAZIO);
  const [aba, setAba] = useState<"trilhas" | "perguntas">("trilhas");
  const [faseAberta, setFaseAberta] = useState<string | null>(null);
  const [temaAberto, setTemaAberto] = useState<string | null>(null);
  const [faseDasPerguntas, setFaseDasPerguntas] = useState<string | null>(null);
  const [trilhaAberta, setTrilhaAberta] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  // O que já estiver na aba volta para a tela. Aba limpa abre com a trilha
  // que o produto já tem, como exemplo trabalhado — tela em branco não ensina
  // a preencher nada.
  //
  // É leitura de armazenamento do navegador, que só existe depois de montar —
  // daí o efeito, e não um valor inicial: no servidor não há aba, e semear com
  // outro valor quebraria a hidratação. Roda uma vez, sem cascata.
  useEffect(() => {
    const guardado = lerBanco();
    if (guardado) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única de sessionStorage no mount
      setBanco(guardado);
      return;
    }

    const exemplo = bancoDeExemplo() ?? BANCO_VAZIO;
    setBanco(exemplo);
    gravarBanco(exemplo);
  }, []);

  /** Grava na hora: num protótipo, "salvar" é só mais um passo para esquecer. */
  function guardar(novo: Banco) {
    setBanco(novo);
    gravarBanco(novo);
  }

  async function comFigura(arquivo: File | undefined, aplicar: (dataUrl: string) => void) {
    if (!arquivo) return;
    setErro(null);
    try {
      aplicar(await reduzirImagem(arquivo));
    } catch (e) {
      setErro(e instanceof Error ? e.message : "não consegui usar essa imagem");
    }
  }

  /* ─────────────── trilha, tema e fase ─────────────── */

  /**
   * Mexe numa fase da trilha aberta.
   *
   * Grava na hora, como o resto da tela: a fase é editada no lugar onde ela
   * mora, e não num rascunho que precisa ser salvo.
   */
  function mexerFase(temaId: string, faseId: string, mudanca: Partial<Fase>) {
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilhaAberta
          ? t
          : {
              ...t,
              temas: t.temas.map((tema) =>
                tema.id !== temaId
                  ? tema
                  : {
                      ...tema,
                      fases: tema.fases.map((f) => (f.id === faseId ? { ...f, ...mudanca } : f)),
                    },
              ),
            },
      ),
    });
  }

  function novaFase(trilha: Trilha, tema: Tema) {
    const nova = faseVazia(tema.fases.length + 1);
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilha.id
          ? t
          : {
              ...t,
              temas: t.temas.map((x) =>
                x.id === tema.id ? { ...x, fases: [...x.fases, nova] } : x,
              ),
            },
      ),
    });
    setFaseAberta(nova.id);
  }

  function apagarFase(trilhaId: string, temaId: string, faseId: string) {
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilhaId
          ? t
          : {
              ...t,
              temas: t.temas.map((tema) =>
                tema.id !== temaId
                  ? tema
                  : { ...tema, fases: tema.fases.filter((f) => f.id !== faseId) },
              ),
            },
      ),
    });
  }

  /** Mexe num tema da trilha aberta. Só ela tem tema à vista. */
  function mexerTema(temaId: string, mudanca: Partial<Tema>) {
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilhaAberta
          ? t
          : { ...t, temas: t.temas.map((tema) => (tema.id === temaId ? { ...tema, ...mudanca } : tema)) },
      ),
    });
  }

  function apagarTema(temaId: string) {
    guardar({
      ...banco,
      trilhas: banco.trilhas.map((t) =>
        t.id !== trilhaAberta ? t : { ...t, temas: t.temas.filter((tema) => tema.id !== temaId) },
      ),
    });
  }

  return (
    <div className="min-h-screen bg-deep-900 pb-16 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-3">
          <Link href="/inicio" className="shrink-0">
            <Image
              src="/brand/logo-linguas.webp"
              alt="eProf Línguas"
              width={700}
              height={264}
              priority
              className="h-8 w-auto"
            />
          </Link>

          <nav className="flex flex-1 justify-center gap-1">
            {(
              [
                ["trilhas", "Montar trilhas"],
                ["perguntas", "Perguntas"],
              ] as const
            ).map(([id, nome]) => (
              <button
                key={id}
                type="button"
                onClick={() => setAba(id)}
                aria-current={aba === id}
                className={`rounded-full px-4 py-1.5 text-sm font-bold transition
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                              aba === id
                                ? "bg-white text-deep-900"
                                : "text-blue-100 hover:bg-white/10"
                            }`}
              >
                {nome}
              </button>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <Chip cor="laranja">Admin</Chip>
            <Link
              href="/inicio"
              aria-label="Voltar ao aplicativo do aluno"
              title="Voltar ao aplicativo do aluno"
              className="rounded-full p-2 text-blue-100 transition hover:bg-white/10
                         focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <LogoutIcon className="size-5" />
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {erro && (
          <p className="mb-4 rounded-xl bg-wrong-50 px-4 py-2 text-sm font-semibold text-wrong-700">
            {erro}
          </p>
        )}

        {aba === "trilhas" ? (
          <MontarTrilhas
            banco={banco}
            onNovaFase={novaFase}
            onApagarFase={apagarFase}
            onMudarFase={mexerFase}
            onNovaPalavra={(palavra) =>
              guardar({ ...banco, palavras: [...banco.palavras, palavra] })
            }
            onFigura={comFigura}
            faseAberta={faseAberta}
            onAbrirFase={setFaseAberta}
            temaAberto={temaAberto}
            onAbrirTema={setTemaAberto}
            onNovaTrilha={() => {
              const nova = trilhaVazia(banco.trilhas.length + 1);
              guardar({ ...banco, trilhas: [...banco.trilhas, nova] });
              setTrilhaAberta(nova.id);
            }}
            onMudarTrilha={(id, mudanca) =>
              guardar({
                ...banco,
                trilhas: banco.trilhas.map((t) => (t.id === id ? { ...t, ...mudanca } : t)),
              })
            }
            onNovoTema={(trilha) => {
              const novo = temaVazio(trilha.temas.length + 1);
              guardar({
                ...banco,
                trilhas: banco.trilhas.map((t) =>
                  t.id === trilha.id ? { ...t, temas: [...t.temas, novo] } : t,
                ),
              });
              // Tema recém-criado abre nos próprios campos: sem título, não
              // há o que mostrar fechado.
              setTemaAberto(novo.id);
            }}
            onMudarTema={(temaId, mudanca) => mexerTema(temaId, mudanca)}
            onApagarTema={(temaId) => apagarTema(temaId)}
            trilhaAberta={trilhaAberta}
            onAbrirTrilha={setTrilhaAberta}
            onLimpar={() => {
              limparBanco();
              setBanco(BANCO_VAZIO);
              setTrilhaAberta(null);
            }}
            onExemplo={() => {
              const exemplo = bancoDeExemplo();
              if (!exemplo) return;
              guardar({
                trilhas: [...banco.trilhas, ...exemplo.trilhas],
                palavras: [...banco.palavras, ...exemplo.palavras],
              });
            }}
          />
        ) : (
          <AbaPerguntas
            banco={banco}
            faseId={faseDasPerguntas}
            onEscolherFase={setFaseDasPerguntas}
            onMudar={(trilhaId, temaId, faseId, perguntas) =>
              guardar({
                ...banco,
                trilhas: banco.trilhas.map((t) =>
                  t.id !== trilhaId
                    ? t
                    : {
                        ...t,
                        temas: t.temas.map((tema) =>
                          tema.id !== temaId
                            ? tema
                            : {
                                ...tema,
                                fases: tema.fases.map((f) =>
                                  f.id === faseId ? { ...f, perguntas } : f,
                                ),
                              },
                        ),
                      },
                ),
              })
            }
            onFigura={comFigura}
          />
        )}
      </main>

    </div>
  );
}

/* ───────────────────────── aba Montar trilhas ───────────────────────── */

function MontarTrilhas({
  banco,
  onNovaFase,
  onApagarFase,
  onMudarFase,
  onNovaPalavra,
  onFigura,
  faseAberta,
  onAbrirFase,
  temaAberto,
  onAbrirTema,
  onNovaTrilha,
  onMudarTrilha,
  onMudarTema,
  onApagarTema,
  onNovoTema,
  onLimpar,
  onExemplo,
  trilhaAberta,
  onAbrirTrilha,
}: {
  banco: Banco;
  onNovaFase: (trilha: Trilha, tema: Tema) => void;
  onApagarFase: (trilhaId: string, temaId: string, faseId: string) => void;
  onMudarFase: (temaId: string, faseId: string, m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  faseAberta: string | null;
  onAbrirFase: (id: string | null) => void;
  temaAberto: string | null;
  onAbrirTema: (id: string | null) => void;
  onNovaTrilha: () => void;
  onMudarTrilha: (id: string, mudanca: Partial<Trilha>) => void;
  onMudarTema: (temaId: string, m: Partial<Tema>) => void;
  onApagarTema: (temaId: string) => void;
  onNovoTema: (trilha: Trilha) => void;
  onLimpar: () => void;
  onExemplo: () => void;
  trilhaAberta: string | null;
  onAbrirTrilha: (id: string | null) => void;
}) {
  const trilha = banco.trilhas.find((t) => t.id === trilhaAberta);

  // Dentro de uma trilha: o nome dela no topo, e abaixo os temas com as fases.
  if (trilha) {
    return (
      <TrilhaAberta
        banco={banco}
        trilha={trilha}
        onVoltar={() => onAbrirTrilha(null)}
        onNovaFase={onNovaFase}
        onApagarFase={onApagarFase}
        onMudarFase={onMudarFase}
        onNovaPalavra={onNovaPalavra}
        onFigura={onFigura}
        faseAberta={faseAberta}
        onAbrirFase={onAbrirFase}
        temaAberto={temaAberto}
        onAbrirTema={onAbrirTema}
        onMudarTrilha={(m) => onMudarTrilha(trilha.id, m)}
        onMudarTema={onMudarTema}
        onApagarTema={onApagarTema}
        onNovoTema={onNovoTema}
      />
    );
  }

  return (
    <>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold">Trilhas</h1>
          <p className="mt-1 text-sm leading-relaxed text-blue-100">
            Abra uma trilha para ver os temas e as fases dela. As perguntas ficam na aba
            Perguntas.
          </p>
        </div>

        <button type="button" onClick={onNovaTrilha} className={BOTAO_FORTE}>
          + Nova trilha
        </button>
      </div>

      {banco.trilhas.length === 0 ? (
        <div className="mt-6 rounded-2xl bg-white p-8 text-center text-slate-600">
          <p className="text-sm">
            Nenhuma trilha ainda. Crie a primeira — ou traga a trilha que o produto já tem, para
            usar de exemplo.
          </p>
          <button type="button" onClick={onExemplo} className={`${BOTAO_CLARO} mt-4`}>
            Trazer a trilha do produto
          </button>
        </div>
      ) : (
        <ul className="mt-6 space-y-3">
          {[...banco.trilhas]
            .sort((a, b) => a.ordem - b.ordem)
            .map((trilha) => (
              <LinhaTrilha key={trilha.id} trilha={trilha} onAbrir={() => onAbrirTrilha(trilha.id)} />
            ))}
        </ul>
      )}

      {banco.trilhas.length > 0 && (
        <p className="mt-8">
          <button
            type="button"
            onClick={onLimpar}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-200
                       underline-offset-4 hover:underline focus-visible:outline-2
                       focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <ReplayIcon className="size-4" />
            Apagar tudo e começar de novo
          </button>
        </p>
      )}
    </>
  );
}

/** Uma trilha na lista: o bastante para reconhecê-la e saber se está de pé. */
function LinhaTrilha({ trilha, onAbrir }: { trilha: Trilha; onAbrir: () => void }) {
  const fases = fasesDaTrilha(trilha);
  const pendentes = fases.filter(({ fase }) => !faseCompleta(fase)).length;

  return (
    <li>
      <button
        type="button"
        onClick={onAbrir}
        className="flex w-full items-center gap-4 rounded-2xl bg-white p-5 text-left text-slate-900
                   transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-white"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-50 text-sm font-extrabold text-accent-600">
          {trilha.ordem}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-2">
            <strong className="text-lg font-extrabold">{trilha.nome.trim() || "Sem nome"}</strong>
            {trilha.ativa ? <Chip cor="ok">Ativa</Chip> : <Chip>Inativa</Chip>}
          </span>
          <span className="mt-0.5 block truncate text-xs text-slate-500">
            {trilha.descricao.trim() || "Sem descrição"}
          </span>
          <span className="mt-1 block text-[11px] text-slate-500">
            {trilha.temas.length} {trilha.temas.length === 1 ? "tema" : "temas"} · {fases.length}{" "}
            {fases.length === 1 ? "fase" : "fases"}
            {pendentes > 0 && `, ${pendentes} pendentes`}
          </span>
        </span>

        <ArrowRightIcon className="size-5 shrink-0 text-slate-400" />
      </button>
    </li>
  );
}

/**
 * A trilha aberta.
 *
 * Em cima, a trilha. Abaixo, um bloco por tema, e dentro de cada tema as
 * fases dele — com o botão de criar fase ali mesmo, no tema a que ela vai
 * pertencer. Criar fase de fora obrigaria a escolher o tema num segundo
 * momento, que é justamente o que esta tela já responde.
 */
function TrilhaAberta({
  banco,
  trilha,
  onVoltar,
  onNovaFase,
  onApagarFase,
  onMudarFase,
  onNovaPalavra,
  onFigura,
  faseAberta,
  onAbrirFase,
  temaAberto,
  onAbrirTema,
  onMudarTrilha,
  onMudarTema,
  onApagarTema,
  onNovoTema,
}: {
  banco: Banco;
  trilha: Trilha;
  onVoltar: () => void;
  onNovaFase: (trilha: Trilha, tema: Tema) => void;
  onApagarFase: (trilhaId: string, temaId: string, faseId: string) => void;
  onMudarFase: (temaId: string, faseId: string, m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  faseAberta: string | null;
  onAbrirFase: (id: string | null) => void;
  temaAberto: string | null;
  onAbrirTema: (id: string | null) => void;
  onMudarTrilha: (m: Partial<Trilha>) => void;
  onMudarTema: (temaId: string, m: Partial<Tema>) => void;
  onApagarTema: (temaId: string) => void;
  onNovoTema: (trilha: Trilha) => void;
}) {
  const temas = [...trilha.temas].sort((a, b) => a.ordem - b.ordem);

  return (
    <>
      <button
        type="button"
        onClick={onVoltar}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-200
                   underline-offset-4 hover:underline focus-visible:outline-2
                   focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <ArrowLeftIcon className="size-4" />
        Trilhas
      </button>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold">{trilha.nome.trim() || "Sem nome"}</h1>

        {trilhaNoAr(trilha) && (
          <Link
            href={`/quizzes/demo?trilha=${trilha.id}&fase=1`}
            className="text-xs font-bold text-blue-200 underline-offset-4 hover:underline"
          >
            Jogar esta trilha
          </Link>
        )}
      </div>

      {/* A trilha */}
      <section className="mt-5 rounded-2xl bg-white p-5 text-slate-900">
        <h2 className="text-base font-extrabold">A trilha</h2>
        <p className="mt-0.5 text-sm text-slate-500">
          O nome aparece na lista de trilhas do aluno. Inativa fica oculta para ele.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_120px_120px]">
          <Campo
            id="trilha-nome"
            rotulo="Nome"
            valor={trilha.nome}
            placeholder="Cores e números"
            onChange={(nome) => onMudarTrilha({ nome })}
          />
          <Campo
            id="trilha-ordem"
            rotulo="Ordem"
            valor={String(trilha.ordem)}
            onChange={(v) => onMudarTrilha({ ordem: Number(v) || 1 })}
          />
          <div>
            <span className="mb-1 block text-xs font-bold text-slate-600">Ativa</span>
            <div className="flex gap-2">
              {[true, false].map((v) => (
                <button
                  key={String(v)}
                  type="button"
                  aria-pressed={trilha.ativa === v}
                  onClick={() => onMudarTrilha({ ativa: v })}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition
                              focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-blue-600 ${
                                trilha.ativa === v
                                  ? "bg-blue-600 text-white"
                                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                >
                  {v ? "Sim" : "Não"}
                </button>
              ))}
            </div>
          </div>
          <div className="sm:col-span-3">
            <Campo
              id="trilha-descricao"
              rotulo="Descrição"
              valor={trilha.descricao}
              placeholder="Cumprimentos e expressões básicas."
              onChange={(descricao) => onMudarTrilha({ descricao })}
            />
          </div>
        </div>
      </section>

      {/* Os temas, cada um com as suas fases dentro. Fechados, cabem todos
          na tela — que é o que responde "o que tem nesta trilha". */}
      <section className="mt-7">
        <h2 className="text-lg font-extrabold">Temas</h2>
        <p className="mt-0.5 text-sm text-blue-100">
          Na ordem em que o aluno percorre. Abra um tema para ver as fases dele.
        </p>

        <div className="mt-3 space-y-3">
          {temas.map((tema) => (
            <BlocoTema
              key={tema.id}
              banco={banco}
              trilha={trilha}
              tema={tema}
              aberto={temaAberto === tema.id}
              onAbrir={() => onAbrirTema(temaAberto === tema.id ? null : tema.id)}
              onNovaFase={() => onNovaFase(trilha, tema)}
              onApagarFase={(faseId) => onApagarFase(trilha.id, tema.id, faseId)}
              onMudarFase={(faseId, m) => onMudarFase(tema.id, faseId, m)}
              onNovaPalavra={onNovaPalavra}
              onFigura={onFigura}
              faseAberta={faseAberta}
              onAbrirFase={onAbrirFase}
              onMudarTema={(m) => onMudarTema(tema.id, m)}
              onApagarTema={() => onApagarTema(tema.id)}
            />
          ))}

          <button
            type="button"
            onClick={() => onNovoTema(trilha)}
            className="w-full rounded-2xl border border-dashed border-white/25 py-4 text-sm
                       font-bold text-blue-100 transition hover:border-white/50 hover:bg-white/5
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            + Novo tema
            {temas.length === 0 && (
              <span className="mt-1 block text-xs font-normal text-blue-200">
                As fases ficam dentro de um tema. Crie o primeiro para começar.
              </span>
            )}
          </button>
        </div>
      </section>
    </>
  );
}

/** Um tema da trilha, com as fases dele. */
function BlocoTema({
  banco,
  trilha,
  tema,
  aberto,
  onAbrir,
  onNovaFase,
  onApagarFase,
  onMudarFase,
  onNovaPalavra,
  onFigura,
  faseAberta,
  onAbrirFase,
  onMudarTema,
  onApagarTema,
}: {
  banco: Banco;
  trilha: Trilha;
  tema: Tema;
  aberto: boolean;
  onAbrir: () => void;
  onNovaFase: () => void;
  onApagarFase: (faseId: string) => void;
  onMudarFase: (faseId: string, m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  faseAberta: string | null;
  onAbrirFase: (id: string | null) => void;
  onMudarTema: (m: Partial<Tema>) => void;
  onApagarTema: () => void;
}) {
  const fases = [...tema.fases].sort((a, b) => a.ordem - b.ordem);
  const pendentes = fases.filter((f) => !faseCompleta(f)).length;

  return (
    <section className="rounded-2xl bg-white text-slate-900">
      <header className="flex flex-wrap items-center gap-3 p-5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-extrabold text-blue-700">
          {tema.ordem}
        </span>

        <button
          type="button"
          onClick={onAbrir}
          aria-expanded={aberto}
          className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-blue-600"
        >
          <span className="block truncate text-base font-extrabold">
            {tema.titulo.trim() || "Tema sem título"}
          </span>
          <span className="mt-0.5 block text-xs text-slate-500">
            {fases.length} {fases.length === 1 ? "fase" : "fases"}
            {pendentes > 0 && `, ${pendentes} ${pendentes === 1 ? "pendente" : "pendentes"}`}
          </span>
        </button>

        <button
          type="button"
          aria-label={aberto ? "Fechar o tema" : `Abrir o tema ${tema.titulo || tema.ordem}`}
          onClick={onAbrir}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ChevronDownIcon className={`size-4 transition ${aberto ? "rotate-180" : ""}`} />
        </button>

        <Apagar oque={`tema ${tema.titulo || tema.ordem}`} onClick={onApagarTema} />
      </header>

      {aberto && (
        <>
          <div className="grid gap-4 border-t border-slate-200 p-5 sm:grid-cols-[1fr_120px]">
            <Campo
              id={`tema-titulo-${tema.id}`}
              rotulo="Título"
              valor={tema.titulo}
              placeholder="Cumprimentos básicos"
              onChange={(titulo) => onMudarTema({ titulo })}
            />
            <Campo
              id={`tema-ordem-${tema.id}`}
              rotulo="Ordem"
              valor={String(tema.ordem)}
              onChange={(v) => onMudarTema({ ordem: Number(v) || 1 })}
            />
          </div>

          {fases.length === 0 ? (
            <p className="border-t border-slate-200 p-5 text-sm text-slate-500">
              Nenhuma fase neste tema ainda.
            </p>
          ) : (
            <ul className="divide-y divide-slate-100 border-t border-slate-200">
              {fases.map((fase) => (
                <LinhaFase
                  key={fase.id}
                  banco={banco}
                  trilha={trilha}
                  tema={tema}
                  fase={fase}
                  aberta={faseAberta === fase.id}
                  onAbrir={() => onAbrirFase(faseAberta === fase.id ? null : fase.id)}
                  onMudar={(m) => onMudarFase(fase.id, m)}
                  onNovaPalavra={onNovaPalavra}
                  onFigura={onFigura}
                  onApagar={() => onApagarFase(fase.id)}
                />
              ))}
            </ul>
          )}

          <div className="p-5 pt-4">
            <button type="button" onClick={onNovaFase} className={BOTAO_CLARO}>
              + Nova fase neste tema
            </button>
          </div>
        </>
      )}
    </section>
  );
}

/**
 * Uma fase na lista do tema.
 *
 * Clicar abre a fase ali mesmo, com as etapas dela em abas. Era um modal, e
 * um modal apaga o contexto — a trilha, o tema, as outras fases — justamente
 * na hora de escrever a fase seguinte.
 */
function LinhaFase({
  banco,
  trilha,
  tema,
  fase,
  aberta,
  onAbrir,
  onMudar,
  onNovaPalavra,
  onFigura,
  onApagar,
}: {
  banco: Banco;
  trilha: Trilha;
  tema: Tema;
  fase: Fase;
  aberta: boolean;
  onAbrir: () => void;
  onMudar: (m: Partial<Fase>) => void;
  onNovaPalavra: (palavra: Palavra) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  onApagar: () => void;
}) {
  const perguntas = perguntasProntas(fase).length;
  const nomeTipo = TIPOS_FASE.find((t) => t.tipo === fase.tipo)?.nome ?? fase.tipo;

  // A revisão não tem palavras próprias: ela repassa as das fases anteriores.
  const palavras =
    fase.tipo === "Revisao"
      ? ensinadasAntes(banco, trilha, fase.id).length
      : palavrasDaFase(banco, fase).length;

  return (
    <li className={aberta ? "bg-slate-50/60" : undefined}>
      <div className="flex flex-wrap items-center gap-3 px-5 py-4">
        <span
          className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold ${
            perguntas > 0 ? "bg-correct-50 text-correct-700" : "bg-slate-100 text-slate-500"
          }`}
        >
          {fase.ordem}
        </span>

        <button
          type="button"
          onClick={onAbrir}
          aria-expanded={aberta}
          className="min-w-0 flex-1 text-left focus-visible:outline-2 focus-visible:outline-offset-2
                     focus-visible:outline-blue-600"
        >
          <span className="block truncate text-sm font-extrabold">
            {fase.titulo.trim() || "Sem título"}
          </span>
          <span className="block truncate text-xs text-slate-500">
            {fase.descricao.trim() || "Sem descrição"}
          </span>
        </button>

        <Chip cor={fase.tipo === "Revisao" ? "atencao" : "azul"}>{nomeTipo}</Chip>

        <span className="w-44 shrink-0 text-right text-xs text-slate-500">
          {palavras} {palavras === 1 ? "palavra" : "palavras"} ·{" "}
          {perguntas > 0 ? (
            <>
              {perguntas} {perguntas === 1 ? "pergunta" : "perguntas"}
            </>
          ) : (
            <span className="font-bold text-accent-600">sem perguntas</span>
          )}
        </span>

        <button
          type="button"
          aria-label={aberta ? "Fechar a fase" : `Abrir a fase ${fase.titulo || fase.ordem}`}
          onClick={onAbrir}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <ChevronDownIcon className={`size-4 transition ${aberta ? "rotate-180" : ""}`} />
        </button>

        <Apagar oque={`fase ${fase.ordem}`} onClick={onApagar} />
      </div>

      {aberta && (
        <div className="px-5 pb-5">
          <FaseEditor
            banco={banco}
            trilha={trilha}
            tema={tema}
            fase={fase}
            onMudar={onMudar}
            onNovaPalavra={onNovaPalavra}
            onFigura={onFigura}
          />
        </div>
      )}
    </li>
  );
}


/* ───────────────────────── aba Perguntas ───────────────────────── */

function AbaPerguntas({
  banco,
  faseId,
  onEscolherFase,
  onMudar,
  onFigura,
}: {
  banco: Banco;
  faseId: string | null;
  onEscolherFase: (id: string) => void;
  onMudar: (
    trilhaId: string,
    temaId: string,
    faseId: string,
    perguntas: Fase["perguntas"],
  ) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
}) {
  // Na ordem em que o aluno percorre, e não na ordem em que foram salvas:
  // salvar uma fase a joga para o fim da lista do tema.
  const todas = [...banco.trilhas]
    .sort((a, b) => a.ordem - b.ordem)
    .flatMap((trilha) =>
      fasesDaTrilha(trilha).map(({ fase, tema }) => ({ trilha, tema, fase })),
    );

  const atual = todas.find((x) => x.fase.id === faseId) ?? todas[0];

  if (!atual) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center text-sm text-slate-600">
        Nenhuma fase montada ainda. Vá a “Montar trilhas” e crie a primeira.
      </div>
    );
  }

  const palavras = palavrasDaFase(banco, atual.fase);
  const revisadas = ensinadasAntes(banco, atual.trilha, atual.fase.id);
  const doQuiz = atual.fase.tipo === "Revisao" ? revisadas : palavras;

  return (
    <>
      <h1 className="text-3xl font-extrabold">Perguntas</h1>
      <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100">
        Escolha uma fase montada e crie as perguntas a partir das palavras e das cenas dela.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[260px_1fr]">
        <nav className="h-fit rounded-2xl bg-white p-3">
          <p className="px-2 pb-2 text-xs font-bold text-slate-600">Fase</p>
          <ul className="space-y-1">
            {todas.map(({ fase, trilha }) => (
              <li key={fase.id}>
                <button
                  type="button"
                  onClick={() => onEscolherFase(fase.id)}
                  aria-current={fase.id === atual.fase.id}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition
                              focus-visible:outline-2 focus-visible:outline-offset-2
                              focus-visible:outline-blue-600 ${
                                fase.id === atual.fase.id
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-700 hover:bg-slate-50"
                              }`}
                >
                  <span className="block truncate">
                    Fase {fase.ordem}: {fase.titulo.trim() || "Sem título"}
                  </span>
                  <span className="block truncate text-[11px] font-normal text-slate-500">
                    {trilha.nome} · {fase.perguntas.length}{" "}
                    {fase.perguntas.length === 1 ? "pergunta" : "perguntas"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <section className="rounded-2xl bg-white p-5 text-slate-900">
          <header className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
            <Chip cor={atual.fase.tipo === "Revisao" ? "atencao" : "azul"}>
              {TIPOS_FASE.find((t) => t.tipo === atual.fase.tipo)?.nome}
            </Chip>
            <span className="text-xs text-slate-500">
              {doQuiz.length} palavras · {atual.fase.cards.length} cards
            </span>
            <ul className="flex w-full flex-wrap gap-1.5">
              {doQuiz.map((p) => (
                <li key={p.id} className="text-[11px] text-slate-600">
                  <strong className="font-extrabold">{p.ingles}</strong> {p.traducao}
                </li>
              ))}
            </ul>
          </header>

          <div className="pt-4">
            <PerguntasEditor
              banco={banco}
              fase={atual.fase}
              palavras={doQuiz}
              onMudar={(perguntas) =>
                onMudar(atual.trilha.id, atual.tema.id, atual.fase.id, perguntas)
              }
              onFigura={onFigura}
            />
          </div>

          <p className="mt-5 border-t border-slate-200 pt-4 text-[11px] text-slate-500">
            Ao salvar: {atual.fase.perguntas.length} registros em Pergunta e{" "}
            {atual.fase.perguntas.reduce((s, p) => s + p.alternativas.length, 0)} registros em
            Alternativa, ligados à fase {atual.fase.titulo.trim() || "sem título"}.
          </p>
        </section>
      </div>
    </>
  );
}
