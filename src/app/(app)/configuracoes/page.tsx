import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, ReplayIcon } from "@/components/ui/icons";
import { DEV_AUTH_ENABLED } from "@/lib/dev-auth";
import { studentProgress } from "@/lib/student";

export const metadata: Metadata = { title: "Configurações — eProf Línguas" };

/**
 * Configurações.
 *
 * Por ora só o que o protótipo precisa: ver onde o aluno está e poder voltar
 * ao começo. Demonstrar o produto é repetir a primeira sessão, e o progresso
 * fica em cookies que o navegador não deixa apagar — sem um botão aqui, a
 * única saída era decorar uma URL.
 */
export default async function ConfiguracoesPage() {
  const { tracks, current, phase, isNew } = await studentProgress();
  const doneTracks = tracks.filter((t) => t.completedPhases >= t.phases).length;

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <section className="rounded-2xl border border-ink-100 bg-white px-6 py-6">
        <h2 className="text-lg font-extrabold text-deep-900">Seu progresso</h2>

        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Trilha atual</dt>
            <dd className="font-semibold text-deep-900">{current.title}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Fase</dt>
            <dd className="font-semibold text-deep-900">
              {isNew ? "Ainda não começou" : `${phase} de ${current.phases}`}
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-ink-500">Trilhas concluídas</dt>
            <dd className="font-semibold text-deep-900">
              {doneTracks} de {tracks.length}
            </dd>
          </div>
        </dl>
      </section>

      {DEV_AUTH_ENABLED && (
        <section className="mt-5 rounded-2xl border border-ink-100 bg-white px-6 py-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-600">
            Protótipo
          </p>
          <h2 className="mt-1.5 text-lg font-extrabold text-deep-900">Recomeçar do zero</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
            Apaga tudo o que foi feito — as fases concluídas, os quizzes de hoje e a apresentação
            do Bubo — e devolve a aplicação ao estado de um aluno que nunca entrou. Serve para
            mostrar a primeira sessão de novo.
          </p>

          <Link
            href="/recomecar"
            className="mt-5 inline-flex items-center gap-2.5 rounded-full border-2 border-ink-100 bg-white
                       px-6 py-3 text-sm font-bold text-ink-700 transition hover:border-blue-200
                       hover:text-deep-900 focus-visible:outline-2 focus-visible:outline-offset-2
                       focus-visible:outline-blue-500"
          >
            <ReplayIcon className="size-4" />
            Recomeçar o protótipo
            <ArrowRightIcon className="size-4" />
          </Link>
        </section>
      )}
    </div>
  );
}
