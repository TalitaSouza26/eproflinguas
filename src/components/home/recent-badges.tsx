import Image from "next/image";
import Link from "next/link";
import { conquistasFor } from "@/lib/conquistas";
import { studentProgress } from "@/lib/student";

/**
 * Conquistas conquistadas, na coluna lateral da Home.
 *
 * Empilhadas, uma por linha: a lista é curta e o nome não cabe legível em
 * miniatura lado a lado.
 */
/**
 * Conquistas conquistadas, na coluna lateral da Home.
 *
 * Empilhadas, uma por linha: a lista é curta e o nome não cabe legível em
 * miniatura lado a lado.
 *
 * Aparecem sempre as oito, conquistadas ou não. A apagada ao lado da
 * conquistada é o que mostra à criança o que ainda dá para perseguir — some a
 * lista e a conquista vira um item solto, sem tamanho.
 */
export async function RecentBadges() {
  const { totalPhases } = await studentProgress();
  const conquistas = conquistasFor(totalPhases);
  const earned = conquistas.filter((i) => i.earned);

  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-5 py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-extrabold text-deep-900">Suas conquistas</h2>
        <Link
          href="/conquistas"
          className="text-[13px] font-semibold text-blue-600 transition hover:text-blue-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Ver todas
        </Link>
      </div>

      <ul className="space-y-3">
        {conquistas.map((conquista) => (
          <li key={conquista.id} className="flex items-center gap-3">
            <Image
              src={conquista.image}
              unoptimized
              alt=""
              width={512}
              height={512}
              className={`w-11 shrink-0 ${conquista.earned ? "" : "opacity-40 grayscale"}`}
            />

            {/* Sem a data: na Home o que importa é qual conquista o aluno tem,
                não em que dia ela caiu. O histórico fica em Conquistas. */}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-[13px] font-bold ${
                  conquista.earned ? "text-deep-900" : "text-ink-500"
                }`}
              >
                {conquista.name}
              </p>
              <p className="truncate text-[11px] text-ink-500">{conquista.condition}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-[11px] text-ink-500">
        {earned.length} de {conquistas.length} conquistadas
      </p>
    </section>
  );
}
