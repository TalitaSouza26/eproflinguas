"use client";

import Link from "next/link";
import { BoltIcon } from "@/components/ui/icons";
import { palavrasProntas } from "@/lib/demo/trilha";
import { useDemoTrilha } from "@/lib/demo/use-demo-trilha";

/**
 * A trilha de demonstração na lista de trilhas da Início.
 *
 * Entra como mais uma linha, com a mesma forma das outras — é isso que prova
 * que o conteúdo montado no admin chega inteiro na tela do aluno. O que a
 * distingue é a etiqueta "demonstração": sem ela, quem abrisse a tela depois
 * não saberia por que existe uma sétima trilha.
 */
export function DemoTrackRow() {
  const trilha = useDemoTrilha();
  if (!trilha) return null;

  const nome = trilha.nome;
  const palavras = palavrasProntas(trilha).length;

  return (
    <li className="flex items-center gap-3.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600">
        <BoltIcon className="size-4" />
      </span>

      <Link
        href="/quizzes/demo"
        className="w-40 shrink-0 truncate text-[13px] font-semibold text-blue-600 underline-offset-4
                   hover:underline focus-visible:outline-2 focus-visible:outline-offset-2
                   focus-visible:outline-blue-500"
      >
        {nome}
      </Link>

      <span className="flex-1 text-[13px] text-ink-500">
        {palavras} {palavras === 1 ? "palavra" : "palavras"} · montada no admin
      </span>

      <span className="w-24 shrink-0 text-right text-[11px] font-bold uppercase tracking-wide text-accent-600">
        Demonstração
      </span>
    </li>
  );
}
