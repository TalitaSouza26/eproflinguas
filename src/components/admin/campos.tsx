"use client";

import { CloseIcon } from "@/components/ui/icons";

/**
 * As peças de formulário do backoffice.
 *
 * Ficam juntas porque a tela de montar fase repete muito: várias listas
 * diferentes com a mesma linha de "campo, campo, apagar". Repetir a marcação
 * em cada editor faria elas divergirem no primeiro ajuste de espaçamento.
 */

export const CAMPO =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 " +
  "focus-visible:outline-blue-600";

export const BOTAO =
  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-bold " +
  "transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

/** A ação principal da tela. Laranja, uma por vez. */
export const BOTAO_FORTE = `${BOTAO} bg-accent-500 text-white hover:bg-accent-600`;
/** A ação de seguir adiante dentro do formulário. */
export const BOTAO_AZUL = `${BOTAO} bg-blue-600 text-white hover:bg-blue-700`;
/** Tudo o mais. */
export const BOTAO_CLARO = `${BOTAO} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;

/** A etiqueta de estado: tipo da fase, "Ativa", "Sem perguntas". */
export function Chip({
  children,
  cor = "neutro",
}: {
  children: React.ReactNode;
  cor?: "neutro" | "ok" | "atencao" | "azul" | "laranja";
}) {
  const cores = {
    neutro: "bg-slate-100 text-slate-600",
    ok: "bg-correct-50 text-correct-700",
    atencao: "bg-accent-50 text-accent-600",
    azul: "bg-blue-50 text-blue-700",
    laranja: "bg-accent-500 text-white",
  }[cor];

  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${cores}`}
    >
      {children}
    </span>
  );
}

export function Campo({
  id,
  rotulo,
  valor,
  placeholder,
  ajuda,
  onChange,
}: {
  id: string;
  rotulo: string;
  valor: string;
  placeholder?: string;
  ajuda?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-600">{rotulo}</span>
      <input
        id={id}
        className={CAMPO}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {ajuda && <span className="mt-1 block text-[11px] text-slate-500">{ajuda}</span>}
    </label>
  );
}

export function CampoLongo({
  id,
  rotulo,
  valor,
  placeholder,
  linhas = 2,
  onChange,
}: {
  id: string;
  rotulo: string;
  valor: string;
  placeholder?: string;
  linhas?: number;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-slate-600">{rotulo}</span>
      <textarea
        id={id}
        rows={linhas}
        className={`${CAMPO} resize-y`}
        value={valor}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

/** O botão de apagar uma linha de lista. */
export function Apagar({ oque, onClick }: { oque: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={`Remover ${oque}`}
      onClick={onClick}
      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-wrong-50 hover:text-wrong-600
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <CloseIcon className="size-4" />
    </button>
  );
}

/** Subir, descer, duplicar: as três ações de uma lista ordenada. */
export function AcaoLinha({
  rotulo,
  onClick,
  desativado,
  children,
}: {
  rotulo: string;
  onClick: () => void;
  desativado?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={rotulo}
      title={rotulo}
      disabled={desativado}
      onClick={onClick}
      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                 disabled:cursor-not-allowed disabled:opacity-30 focus-visible:outline-2
                 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      {children}
    </button>
  );
}

/**
 * O campo de figura: um retângulo que mostra o que foi escolhido.
 *
 * É clicável inteiro, e não um botão "procurar" ao lado de um nome de
 * arquivo: quem monta conteúdo precisa ver a figura, não ler o nome dela.
 */
export function CampoFigura({
  imagem,
  rotulo,
  tamanho = "size-[88px]",
  onEscolher,
}: {
  imagem: string | null;
  rotulo: string;
  tamanho?: string;
  onEscolher: (arquivo: File | undefined) => void;
}) {
  return (
    <label
      className={`relative block ${tamanho} shrink-0 cursor-pointer overflow-hidden rounded-xl
                  border border-dashed border-slate-300 bg-slate-50`}
    >
      {imagem ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
        <img src={imagem} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-semibold text-slate-400">
          Escolher imagem
        </span>
      )}
      <input
        type="file"
        accept="image/*"
        className="sr-only"
        aria-label={rotulo}
        onChange={(e) => onEscolher(e.target.files?.[0])}
      />
    </label>
  );
}

/** Um cartão de escolha: o tipo da fase, o tipo da pergunta. */
export function Escolha({
  nome,
  resumo,
  ativo,
  bloqueado,
  motivo,
  onClick,
}: {
  nome: string;
  resumo: string;
  ativo: boolean;
  bloqueado?: boolean;
  motivo?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={ativo}
      disabled={bloqueado}
      onClick={onClick}
      className={`rounded-xl border p-3 text-left transition focus-visible:outline-2
                  focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                    bloqueado
                      ? "cursor-not-allowed border-slate-200 bg-slate-50 opacity-60"
                      : ativo
                        ? "border-blue-600 bg-blue-50"
                        : "border-slate-200 bg-white hover:bg-slate-50"
                  }`}
    >
      <span className="block text-sm font-extrabold text-slate-900">{nome}</span>
      <span className="mt-0.5 block text-xs leading-relaxed text-slate-500">
        {bloqueado ? (motivo ?? resumo) : resumo}
      </span>
    </button>
  );
}
