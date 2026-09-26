/**
 * Brasas que sobem atrás do emblema.
 *
 * Sete, e não quatro: com poucas dava para contá-las, e o olho seguia cada
 * uma em vez de ver fogo. Os atrasos são irregulares de propósito — em
 * intervalos iguais elas viravam uma fileira marchando.
 */
const EMBERS = [
  { left: "12%", delay: "0ms", size: "7px" },
  { left: "26%", delay: "500ms", size: "5px" },
  { left: "40%", delay: "1100ms", size: "9px" },
  { left: "54%", delay: "300ms", size: "6px" },
  { left: "68%", delay: "1600ms", size: "8px" },
  { left: "82%", delay: "900ms", size: "5px" },
  { left: "92%", delay: "2100ms", size: "7px" },
];

/**
 * Fogo atrás da divisão conquistada.
 *
 * Fica num componente só porque aparece em dois lugares — Home e Conquistas —
 * e o ritmo precisa ser o mesmo nos dois. Some para quem pede menos
 * movimento: é animação em laço, a que mais incomoda.
 */
export function DivisaoFlame({
  glowClass = "size-36",
  embers = true,
}: {
  glowClass?: string;
  /** Desligado em emblemas pequenos, onde as brasas saem do desenho. */
  embers?: boolean;
}) {
  return (
    <>
      {/* Dois halos, não um: o de baixo é largo e lento, e dá o calor que
          preenche o card; o de cima é menor, mais claro e pulsa mais rápido,
          e é ele que faz o fogo parecer vivo. Um halo só ou era fraco demais
          para se ver no azul, ou virava um borrão laranja parado. */}
      <span
        aria-hidden
        className={`animate-divisao-halo absolute rounded-full bg-accent-500 blur-3xl ${glowClass}`}
      />
      <span
        aria-hidden
        className={`animate-divisao-glow absolute scale-75 rounded-full bg-[#ffb057] blur-2xl ${glowClass}`}
      />
      {embers &&
        EMBERS.map(({ left, delay, size }) => (
          <span
            key={left}
            aria-hidden
            className="animate-ember absolute bottom-1 rounded-full bg-[#ffc074] shadow-[0_0_8px_2px_rgba(255,150,60,0.7)]"
            style={{ left, width: size, height: size, animationDelay: delay }}
          />
        ))}
    </>
  );
}
