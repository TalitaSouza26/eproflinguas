"use client";

import { CloseIcon } from "@/components/ui/icons";

/**
 * As peças de formulário do backoffice.
 *
 * Ficam juntas porque a tela de montar trilha repete muito: cinco listas
 * diferentes com a mesma linha de "campo, campo, apagar". Repetir a marcação
 * em cada editor faria elas divergirem no primeiro ajuste de espaçamento.
 */

export const CAMPO =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 " +
  "placeholder:text-slate-400 focus-visible:outline-2 focus-visible:outline-offset-1 " +
  "focus-visible:outline-blue-600";

export const BOTAO =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold " +
  "transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export const BOTAO_CLARO = `${BOTAO} border border-slate-300 bg-white text-slate-700 hover:bg-slate-50`;

export function Campo({
  id,
  rotulo,
  valor,
  placeholder,
  onChange,
}: {
  id: string;
  rotulo: string;
  valor: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold uppercase tracking-wide text-slate-500">
        {rotulo}
      </span>
      <input
        id={id}
        className={CAMPO}
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
      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <CloseIcon className="size-4" />
    </button>
  );
}

/**
 * O campo de figura: um quadrado que mostra o que foi escolhido.
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
      className={`relative block ${tamanho} shrink-0 cursor-pointer overflow-hidden rounded-lg
                  border border-dashed border-slate-300 bg-slate-50`}
    >
      {imagem ? (
        // eslint-disable-next-line @next/next/no-img-element -- data URL do admin, nunca otimizada
        <img src={imagem} alt="" className="absolute inset-0 size-full object-cover" />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center px-2 text-center text-[11px] font-semibold text-slate-400">
          Escolher figura
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

/** O cabeçalho de uma seção dentro do editor de fase. */
export function Secao({
  titulo,
  ajuda,
  children,
}: {
  titulo: string;
  ajuda: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 border-t border-slate-200 pt-5">
      <h4 className="text-sm font-extrabold text-slate-900">{titulo}</h4>
      <p className="mt-0.5 text-sm text-slate-500">{ajuda}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}
