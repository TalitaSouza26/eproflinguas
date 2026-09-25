import type { Metadata } from "next";
import { ArrowRightIcon, PlayIcon, ReplayIcon } from "@/components/ui/icons";
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
          <h2 className="mt-1.5 text-lg font-extrabold text-deep-900">Voltar para o começo</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
            Dois recomeços, porque são situações diferentes de demonstração.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="/recomecar"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-ink-100
                         bg-white px-6 py-3 text-sm font-bold text-ink-700 transition hover:border-blue-200
                         hover:text-deep-900 focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-blue-500"
            >
              <ReplayIcon className="size-4" />
              Zerar o progresso
              <ArrowRightIcon className="size-4" />
            </a>

            <a
              href="/recomecar?primeiro=1"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-ink-100
                         bg-white px-6 py-3 text-sm font-bold text-ink-700 transition hover:border-blue-200
                         hover:text-deep-900 focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-blue-500"
            >
              <PlayIcon className="size-4" />
              Simular primeiro acesso
              <ArrowRightIcon className="size-4" />
            </a>
          </div>

          <ul className="mt-4 space-y-1.5 text-[13px] leading-relaxed text-ink-500">
            <li>
              <span className="font-semibold text-deep-700">Zerar o progresso</span> — apaga fases e
              missão do dia e abre a Início com tudo em zero.
            </li>
            <li>
              <span className="font-semibold text-deep-700">Simular primeiro acesso</span> — apaga
              também a apresentação e abre na tela do Bubo, como um aluno que nunca entrou.
            </li>
          </ul>
        </section>
      )}
    </div>
  );
}
