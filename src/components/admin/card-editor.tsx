"use client";

import { BOTAO_AZUL, CAMPO, Campo, CampoFigura, Chip } from "@/components/admin/campos";
import { CloseIcon } from "@/components/ui/icons";
import { acharPalavra, type Banco, type Card, type Palavra } from "@/lib/demo/banco";

/**
 * Um card da abertura, aberto por inteiro.
 *
 * Ao contrário da fase, que é uma lista de coisas e por isso se edita no
 * lugar, o card é uma tela só do aluno. Numa tela à parte, a prévia cabe no
 * tamanho em que a criança vai ver — e é esse tamanho que diz se o texto é
 * longo demais ou se a figura some atrás da fala.
 */
export function CardEditor({
  banco,
  card,
  indice,
  palavras,
  onMudar,
  onFigura,
  onFechar,
}: {
  banco: Banco;
  card: Card;
  indice: number;
  palavras: Palavra[];
  onMudar: (m: Partial<Card>) => void;
  onFigura: (arquivo: File | undefined, aplicar: (dataUrl: string) => void) => void;
  onFechar: () => void;
}) {
  const palavra = acharPalavra(banco, card.palavraId);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-deep-900/70 p-4 sm:p-8">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-extrabold text-slate-600">
              {indice + 1}
            </span>
            <h3 className="text-lg font-extrabold text-slate-900">
              {card.tipo === "Historia" ? "Card de cena" : "Card de palavra"}
            </h3>
            <Chip cor={card.tipo === "Historia" ? "azul" : "atencao"}>
              {card.tipo === "Historia" ? "Cena" : "Palavra"}
            </Chip>
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
            <div>
              <span className="mb-1 block text-xs font-bold text-slate-600">Imagem</span>
              <div className="flex items-center gap-3">
                <CampoFigura
                  imagem={card.imagem}
                  rotulo={`Imagem do card ${indice + 1}`}
                  tamanho="h-[88px] w-[140px]"
                  onEscolher={(a) => onFigura(a, (imagem) => onMudar({ imagem }))}
                />
                <p className="text-xs text-slate-500">
                  {card.tipo === "Historia"
                    ? "A ilustração da cena. Sem ela, o aluno vê só o texto."
                    : "A figura da palavra. É ela que a revisão usa para cobrar de outro jeito."}
                </p>
              </div>
            </div>

            {card.tipo === "Historia" ? (
              <>
                {/* Também na cena: é a palavra que a cena ensina, e
                    escolhê-la poupa digitar o destaque de novo. */}
                <SelecionarPalavra
                  card={card}
                  palavras={palavras}
                  ajuda="A palavra que esta cena ensina. Escolher preenche o destaque."
                  onMudar={onMudar}
                />
                <Campo
                  id={`antes-${card.id}`}
                  rotulo="Texto antes"
                  valor={card.textoAntes}
                  placeholder="Ele sorriu e acenou: —"
                  onChange={(textoAntes) => onMudar({ textoAntes })}
                />
                <div className="grid gap-4 sm:grid-cols-[1fr_120px]">
                  <Campo
                    id={`destaque-${card.id}`}
                    rotulo="Destaque"
                    valor={card.destaque}
                    placeholder="Hello"
                    ajuda="A parte em inglês, realçada na cena."
                    onChange={(destaque) => onMudar({ destaque })}
                  />
                  <Campo
                    id={`depois-${card.id}`}
                    rotulo="Depois"
                    valor={card.textoDepois}
                    placeholder="!"
                    onChange={(textoDepois) => onMudar({ textoDepois })}
                  />
                </div>
              </>
            ) : (
              <>
                <SelecionarPalavra
                  card={card}
                  palavras={palavras}
                  ajuda="Escolher a palavra preenche o destaque e a tradução com os dados dela."
                  onMudar={onMudar}
                />

                <Campo
                  id={`traducao-${card.id}`}
                  rotulo="Tradução mostrada"
                  valor={card.traducao}
                  placeholder="olá"
                  onChange={(traducao) => onMudar({ traducao })}
                />
              </>
            )}
          </div>

          <PreviaGrande card={card} palavra={palavra} />
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

/** O card no tamanho em que o aluno vê. */
function PreviaGrande({ card, palavra }: { card: Card; palavra: Palavra | undefined }) {
  const ingles = palavra?.ingles || card.destaque;
  const traducao = card.traducao || palavra?.traducao || "";
  const temTexto = card.textoAntes || card.destaque || card.textoDepois;

  return (
    <aside className="h-fit rounded-2xl bg-deep-900 p-5">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-wide text-blue-200">
        Prévia do aluno
      </p>

      <div className="rounded-2xl bg-white p-4 shadow-2xl shadow-black/30">
        {card.imagem ? (
          // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
          <img src={card.imagem} alt="" className="mb-4 h-44 w-full rounded-xl object-cover" />
        ) : (
          <div className="mb-4 flex h-44 w-full items-center justify-center rounded-xl bg-slate-50 text-xs text-slate-400">
            sem figura
          </div>
        )}

        {card.tipo === "Historia" ? (
          <p className="text-base leading-relaxed text-ink-900">
            {temTexto ? (
              <>
                {card.textoAntes}{" "}
                {card.destaque && (
                  <strong className="font-extrabold text-accent-600">{card.destaque}</strong>
                )}{" "}
                {card.textoDepois}
              </>
            ) : (
              <span className="text-slate-400">O texto da cena aparece aqui.</span>
            )}
          </p>
        ) : (
          <div className="pb-2 text-center">
            <p className="text-[11px] font-bold uppercase tracking-wide text-accent-500">
              Palavra nova
            </p>
            <p className="mt-1 text-3xl font-extrabold text-deep-900">
              {ingles || <span className="text-slate-400">A palavra</span>}
            </p>
            <p className="mt-1 text-base text-ink-700">
              quer dizer{" "}
              <strong className="font-extrabold">
                {traducao || <span className="font-normal text-slate-400">…</span>}
              </strong>
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}

/**
 * A Palavra do banco a que este card se liga.
 *
 * Escolher preenche o destaque e a tradução: são os dados dela, e digitá-los
 * de novo só cria a chance de escrever diferente do que o banco guarda.
 */
function SelecionarPalavra({
  card,
  palavras,
  ajuda,
  onMudar,
}: {
  card: Card;
  palavras: Palavra[];
  ajuda: string;
  onMudar: (m: Partial<Card>) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-600">Palavra relacionada</span>
      <select
        className={CAMPO}
        value={card.palavraId ?? ""}
        onChange={(e) => {
          const p = palavras.find((x) => x.id === e.target.value);
          onMudar({
            palavraId: p?.id ?? null,
            destaque: p?.ingles ?? card.destaque,
            traducao: p?.traducao ?? card.traducao,
          });
        }}
      >
        <option value="">Nenhuma</option>
        {palavras.map((p) => (
          <option key={p.id} value={p.id}>
            {p.ingles} ({p.traducao})
          </option>
        ))}
      </select>
      <span className="mt-1 block text-[11px] text-slate-500">{ajuda}</span>
    </label>
  );
}
