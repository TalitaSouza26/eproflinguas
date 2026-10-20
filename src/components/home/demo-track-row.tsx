"use client";

import Link from "next/link";
import { BoltIcon } from "@/components/ui/icons";
import { fasesProntas, trilhaNoAr } from "@/lib/demo/banco";
import { useBanco } from "@/lib/demo/use-banco";

/**
 * As trilhas montadas no admin, na lista de trilhas da Início.
 *
 * Entram como linhas iguais às outras — é isso que prova que o conteúdo
 * montado chega inteiro na tela do aluno. O que as distingue é a etiqueta
 * "demonstração": sem ela, quem abrisse a tela depois não saberia por que
 * existe uma sétima trilha.
 *
 * Só aparecem as ativas, com nome e ao menos uma fase pronta: trilha pela
 * metade levaria a criança a uma tela vazia.
 */
export function DemoTrackRow() {
  const banco = useBanco();
  const trilhas = (banco?.trilhas ?? []).filter(trilhaNoAr);

  if (trilhas.length === 0) return null;

  return (
    <>
      {trilhas.map((trilha) => {
        const fases = fasesProntas(trilha);
        const tema = trilha.temas[0]?.titulo.trim() ?? "";

        return (
          <li key={trilha.id} className="flex items-center gap-3.5">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
              <BoltIcon className="size-4" />
            </span>

            <Link
              href={`/quizzes/demo?trilha=${trilha.id}&fase=1`}
              className="w-40 shrink-0 truncate text-[13px] font-semibold text-blue-600 underline-offset-4
                         hover:underline focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-blue-500"
            >
              {trilha.nome}
            </Link>

            <span className="flex-1 truncate text-[13px] text-ink-500">
              {fases} {fases === 1 ? "fase" : "fases"}
              {tema ? ` · ${tema}` : ""}
            </span>

            <span className="w-24 shrink-0 text-right text-[11px] font-bold uppercase tracking-wide text-accent-600">
              Demonstração
            </span>
          </li>
        );
      })}
    </>
  );
}
