/** Brasas que sobem atrás do emblema. Decorativas e escalonadas. */
const EMBERS = [
  { left: "18%", delay: "0ms", size: "6px" },
  { left: "38%", delay: "700ms", size: "4px" },
  { left: "62%", delay: "1300ms", size: "7px" },
  { left: "80%", delay: "1900ms", size: "5px" },
];

/**
 * Fogo atrás da patente conquistada.
 *
 * Fica num componente só porque aparece em dois lugares — Home e Conquistas —
 * e o ritmo precisa ser o mesmo nos dois. Some para quem pede menos
 * movimento: é animação em laço, a que mais incomoda.
 */
export function PatenteFlame({
  glowClass = "size-28",
  embers = true,
}: {
  glowClass?: string;
  /** Desligado em emblemas pequenos, onde as brasas saem do desenho. */
  embers?: boolean;
}) {
  return (
    <>
      <span
        aria-hidden
        className={`animate-patente-glow absolute rounded-full bg-accent-500 blur-2xl ${glowClass}`}
      />
      {embers &&
        EMBERS.map(({ left, delay, size }) => (
          <span
            key={left}
            aria-hidden
            className="animate-ember absolute bottom-2 rounded-full bg-[#ffb057]"
            style={{ left, width: size, height: size, animationDelay: delay }}
          />
        ))}
    </>
  );
}
