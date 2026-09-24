import Image from "next/image";
import Link from "next/link";
import { EARNED_INSIGNIAS, INSIGNIAS } from "@/lib/insignias";

/**
 * Insígnias conquistadas, na coluna lateral da Home.
 *
 * Empilhadas, uma por linha: a lista é curta e o nome não cabe legível em
 * miniatura lado a lado.
 */
/**
 * Insígnias conquistadas, na coluna lateral da Home.
 *
 * Empilhadas, uma por linha: a lista é curta e o nome não cabe legível em
 * miniatura lado a lado. Quem ainda não ganhou nenhuma vê as oito apagadas,
 * com a condição à mostra — é o cardápio do que dá para perseguir, e some
 * assim que a primeira cai.
 */
export function RecentBadges() {
  const shown = EARNED_INSIGNIAS.length > 0 ? EARNED_INSIGNIAS : INSIGNIAS;

  return (
    <section className="self-start rounded-2xl border border-ink-100 bg-white px-5 py-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-[15px] font-extrabold text-deep-900">Suas insígnias</h2>
        <Link
          href="/conquistas"
          className="text-[13px] font-semibold text-blue-600 transition hover:text-blue-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Ver todas
        </Link>
      </div>

      <ul className="space-y-3">
        {shown.map((insignia) => (
          <li key={insignia.id} className="flex items-center gap-3">
            <Image
              src={insignia.image}
              unoptimized
              alt=""
              width={512}
              height={512}
              className={`w-11 shrink-0 ${insignia.earned ? "" : "opacity-40 grayscale"}`}
            />

            {/* Sem a data: na Home o que importa é qual insígnia o aluno tem,
                não em que dia ela caiu. O histórico fica em Conquistas. */}
            <div className="min-w-0 flex-1">
              <p
                className={`truncate text-[13px] font-bold ${
                  insignia.earned ? "text-deep-900" : "text-ink-500"
                }`}
              >
                {insignia.name}
              </p>
              <p className="truncate text-[11px] text-ink-500">{insignia.condition}</p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-[11px] text-ink-500">
        {EARNED_INSIGNIAS.length} de {INSIGNIAS.length} conquistadas
      </p>
    </section>
  );
}
