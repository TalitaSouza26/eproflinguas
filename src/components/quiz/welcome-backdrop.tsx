/**
 * Fundo da apresentação do Bubo.
 *
 * Formas de escola e de jogo — lápis, livro, régua, estrelas, um direcional e
 * botões de controle — soltas atrás do mascote. Opacidade baixa de propósito:
 * a tela tem um único alvo, que é o botão, e o fundo não pode disputar com
 * ele. É SVG para escalar em qualquer tamanho sem custar requisição.
 */
export function WelcomeBackdrop() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full"
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 600"
      fill="none"
    >
      {/* Geometria solta: círculos, quadrados girados e triângulos. */}
      <g stroke="white" strokeOpacity="0.1" strokeWidth="2">
        <circle cx="96" cy="108" r="46" />
        <circle cx="712" cy="454" r="60" />
        <rect x="628" y="76" width="66" height="66" rx="14" transform="rotate(18 661 109)" />
        <rect x="112" y="452" width="52" height="52" rx="12" transform="rotate(-12 138 478)" />
        <path d="M232 92 L262 146 L202 146 Z" strokeLinejoin="round" />
        <path d="M566 528 L592 574 L540 574 Z" strokeLinejoin="round" />
      </g>

      <g fill="white" fillOpacity="0.06">
        <circle cx="366" cy="60" r="30" />
        <circle cx="46" cy="300" r="22" />
        <circle cx="760" cy="196" r="26" />
      </g>

      {/* Lápis apontando para cima. */}
      <g stroke="white" strokeOpacity="0.11" strokeWidth="2" strokeLinejoin="round">
        <g transform="rotate(22 176 236)">
          <path d="M168 220 h18 v62 h-18 Z" />
          <path d="M168 282 l9 18 l9 -18" />
          <path d="M168 232 h18" />
        </g>
      </g>

      {/* Livro aberto. */}
      <g stroke="white" strokeOpacity="0.11" strokeWidth="2" strokeLinejoin="round">
        <g transform="rotate(-14 646 300)">
          <path d="M604 286 c18 -10 40 -10 42 0 c2 -10 24 -10 42 0 v42 c-18 -10 -40 -10 -42 0 c-2 -10 -24 -10 -42 0 Z" />
          <path d="M646 286 v42" />
        </g>
      </g>

      {/* Régua. */}
      <g stroke="white" strokeOpacity="0.09" strokeWidth="2" strokeLinejoin="round">
        <g transform="rotate(-32 300 512)">
          <rect x="258" y="500" width="84" height="24" rx="5" />
          <path d="M272 500 v8 M286 500 v12 M300 500 v8 M314 500 v12 M328 500 v8" />
        </g>
      </g>

      {/* Direcional e botões: o lado jogo. */}
      <g stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeLinejoin="round">
        <path d="M470 168 h16 v-16 h16 v16 h16 v16 h-16 v16 h-16 v-16 h-16 Z" />
      </g>
      <g fill="white" fillOpacity="0.08">
        <circle cx="560" cy="160" r="9" />
        <circle cx="584" cy="184" r="9" />
      </g>

      {/* Estrelas de quatro pontas. */}
      <g fill="white" fillOpacity="0.09">
        <path d="M300 372 c6 -22 8 -24 30 -30 c-22 -6 -24 -8 -30 -30 c-6 22 -8 24 -30 30 c22 6 24 8 30 30 Z" />
        <path d="M676 606 c4 -15 6 -17 21 -21 c-15 -4 -17 -6 -21 -21 c-4 15 -6 17 -21 21 c15 4 17 6 21 21 Z" />
        <path d="M84 196 c3 -12 5 -14 17 -17 c-12 -3 -14 -5 -17 -17 c-3 12 -5 14 -17 17 c12 3 14 5 17 17 Z" />
      </g>

      {/* Pontilhado, como papel quadriculado. */}
      <g fill="white" fillOpacity="0.09">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2, 3, 4].map((col) => (
            <circle key={`${row}-${col}`} cx={432 + col * 22} cy={452 + row * 22} r="2.5" />
          )),
        )}
      </g>
    </svg>
  );
}
