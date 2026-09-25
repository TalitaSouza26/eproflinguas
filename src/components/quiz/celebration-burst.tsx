/** Raios curtos em volta, saindo do centro. */
const RAYS = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330];

/** Faíscas, em ângulos que não caem em cima dos raios. */
const SPARKS = [15, 75, 135, 225, 285, 345];

/**
 * Explosão suave atrás do mascote quando a trilha fecha.
 *
 * Decorativa e de vida curta: abre, some e não volta. A rotação fica no
 * elemento de fora porque a animação usa `transform` — no mesmo elemento, ela
 * apagaria o posicionamento e tudo colapsaria no centro.
 */
export function CelebrationBurst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="animate-burst-glow absolute size-56 rounded-full bg-accent-500/45 blur-3xl" />

      {RAYS.map((angle, i) => (
        <span
          key={`raio-${angle}`}
          className="absolute"
          style={{ transform: `rotate(${angle}deg) translateY(-6.5rem)` }}
        >
          <span
            className="animate-burst-ray block h-10 w-1.5 rounded-full bg-accent-500/70"
            style={{ animationDelay: `${120 + i * 35}ms` }}
          />
        </span>
      ))}

      {SPARKS.map((angle, i) => (
        <span
          key={`faisca-${angle}`}
          className="absolute"
          style={{ transform: `rotate(${angle}deg) translateY(-5rem)` }}
        >
          <span
            className="animate-burst-spark block size-2.5 rounded-full bg-[#ffb057]"
            style={{ animationDelay: `${260 + i * 70}ms` }}
          />
        </span>
      ))}
    </span>
  );
}
