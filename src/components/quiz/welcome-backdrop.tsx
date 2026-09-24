import Image from "next/image";

/**
 * Fundo da apresentação do Bubo.
 *
 * Arte de escola e de jogo — controle, lápis, capelo, livro, régua, estrelas —
 * solta num degradê azul. Cobre a área inteira e fica atrás de tudo: a tela
 * tem um alvo só, que é o botão.
 *
 * `object-cover` em vez de esticar: a arte é larga e os desenhos vivem nas
 * bordas, então em tela estreita ela corta pelos lados em vez de deformar.
 */
export function WelcomeBackdrop() {
  return (
    <Image
      src="/brand/fundo-boas-vindas.webp"
      alt=""
      fill
      priority
      sizes="100vw"
      className="pointer-events-none -z-10 object-cover"
    />
  );
}
