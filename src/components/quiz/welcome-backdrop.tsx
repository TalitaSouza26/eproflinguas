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
 *
 * O número no nome do arquivo é proposital: trocar só o conteúdo mantinha a
 * URL, e o cache do navegador e o do otimizador continuavam servindo a arte
 * antiga. Arte nova entra com nome novo.
 */
export function WelcomeBackdrop() {
  return (
    <Image
      src="/brand/fundo-estudo-2.webp"
      alt=""
      fill
      priority
      sizes="100vw"
      className="pointer-events-none -z-10 object-cover"
    />
  );
}
