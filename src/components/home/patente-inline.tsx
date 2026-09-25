import Image from "next/image";
import Link from "next/link";
import { PatenteFlame } from "@/components/ui/patente-flame";
import { patenteFor, PATENTES } from "@/lib/patente";
import { studentProgress } from "@/lib/student";

/**
 * Patente ao lado do nome, no celular.
 *
 * Abaixo de xl o card de patente sai da tela: empilhado, ele empurrava as
 * trilhas para longe da dobra. O emblema fica na linha da saudação, onde o
 * aluno vê em que pé está sem rolar, e o toque leva a Conquistas — que é onde
 * moram os detalhes que o card mostrava.
 */
export async function PatenteInline() {
  const { words } = await studentProgress();
  const { current: CURRENT_PATENTE } = patenteFor(words);
  const shown = CURRENT_PATENTE ?? PATENTES[0];

  return (
    <Link
      href="/conquistas"
      aria-label={`Patente ${shown.name}. Ver minhas patentes`}
      className="flex shrink-0 items-center gap-2.5 rounded-2xl px-1 py-1 transition
                 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2
                 focus-visible:outline-white xl:hidden"
    >
      {/* Sem brasas neste tamanho: a 48px elas passariam do emblema e virariam
          sujeira em cima do texto. Fica só o brilho, no mesmo ritmo do card. */}
      <span className="relative flex size-12 items-center justify-center">
        {CURRENT_PATENTE && <PatenteFlame glowClass="size-11" embers={false} />}

        <Image
          src={shown.image}
          unoptimized
          alt=""
          width={512}
          height={512}
          className={`relative w-12 drop-shadow ${CURRENT_PATENTE ? "" : "opacity-40 grayscale"}`}
        />
      </span>

      <span className="text-left">
        <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--on-bg-muted)]">
          Patente
        </span>
        <span className="block text-sm font-extrabold text-[var(--on-bg-strong)]">
          {CURRENT_PATENTE ? CURRENT_PATENTE.name : "Nenhuma"}
        </span>
      </span>
    </Link>
  );
}
