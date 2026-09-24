/** Estrelas de quatro pontas, espalhadas pelos dois lados. */
const STARS = [
  { x: 84, y: 285, r: 26 },
  { x: 402, y: 792, r: 22 },
  { x: 1200, y: 292, r: 26 },
  { x: 1524, y: 742, r: 24 },
];

/** Bolhas cheias: quebram o vazio sem virar desenho. */
const BUBBLES = [
  { cx: 100, cy: 570, r: 38, o: 0.14 },
  { cx: 1113, cy: 224, r: 18, o: 0.16 },
  { cx: 1489, cy: 310, r: 50, o: 0.14 },
  { cx: 1115, cy: 766, r: 15, o: 0.18 },
];

function star({ x, y, r }: { x: number; y: number; r: number }) {
  // Quatro pontas com a cintura puxada para dentro, em vez de um losango.
  const w = r * 0.34;
  return `M${x} ${y - r} C${x + w} ${y - w} ${x + w} ${y - w} ${x + r} ${y} C${x + w} ${y + w} ${x + w} ${y + w} ${x} ${y + r} C${x - w} ${y + w} ${x - w} ${y + w} ${x - r} ${y} C${x - w} ${y - w} ${x - w} ${y - w} ${x} ${y - r}Z`;
}

/**
 * Fundo da apresentação do Bubo.
 *
 * Azul da marca com um ciano subindo do canto inferior direito e morrendo
 * antes do meio — a parte clara fica longe do mascote, que é laranja e
 * precisa de fundo escuro para destacar.
 *
 * Os elementos de escola e de jogo ficam nas beiradas, em opacidade baixa: a
 * tela tem um alvo só, que é o botão. É tudo CSS e SVG, então escala em
 * qualquer tamanho, muda de cor sem reexportar arquivo e não pesa download.
 */
export function WelcomeBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a45bd] via-[#153a9e] to-[#102c78]" />

      {/* O ciano é um brilho de canto, não uma faixa: perde força antes do
          centro para não clarear o fundo atrás do Bubo. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 92% at 100% 100%, rgba(34,211,238,0.72) 0%, rgba(34,211,238,0.4) 22%, rgba(34,211,238,0.14) 42%, rgba(34,211,238,0) 64%)",
        }}
      />

      <svg
        className="absolute inset-0 size-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1600 980"
        fill="none"
      >
        <g stroke="white" strokeOpacity="0.16" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round">
          {/* Controle de videogame. */}
          <g transform="rotate(-8 205 175)">
            <path d="M150 140 h110 a42 42 0 0 1 42 42 v14 a34 34 0 0 1 -60 22 l-12 -14 h-50 l-12 14 a34 34 0 0 1 -60 -22 v-14 a42 42 0 0 1 42 -42 Z" />
            <path d="M140 178 h34 M157 161 v34" />
            <circle cx="248" cy="164" r="6" fill="white" fillOpacity="0.16" stroke="none" />
            <circle cx="266" cy="182" r="6" fill="white" fillOpacity="0.16" stroke="none" />
            <circle cx="230" cy="182" r="6" fill="white" fillOpacity="0.16" stroke="none" />
          </g>

          {/* Lápis. */}
          <g transform="rotate(30 330 415)">
            <path d="M310 348 h44 v112 h-44 Z" />
            <path d="M310 460 l22 34 l22 -34" />
            <path d="M310 372 h44" />
          </g>

          {/* Capelo. */}
          <g transform="rotate(-6 256 566)">
            <path d="M176 556 L256 522 L336 556 L256 590 Z" />
            <path d="M206 570 v30 c0 14 100 14 100 0 v-30" />
            <path d="M330 558 v44" />
            <circle cx="330" cy="612" r="9" />
          </g>

          {/* Livro aberto. */}
          <g transform="rotate(-10 1316 470)">
            <path d="M1236 432 c34 -20 74 -20 80 0 c6 -20 46 -20 80 0 v78 c-34 -20 -74 -20 -80 0 c-6 -20 -46 -20 -80 0 Z" />
            <path d="M1316 432 v78" />
          </g>

          {/* Régua. */}
          <g transform="rotate(-28 1352 682)">
            <rect x="1272" y="660" width="160" height="44" rx="8" />
            <path d="M1298 660 v14 M1324 660 v22 M1350 660 v14 M1376 660 v22 M1402 660 v14" />
          </g>

          {/* Coração de pixel: o contorno segue a escadinha de uma grade de
              7 por 6, para ler como pixel art e não como coração arredondado. */}
          <g transform="translate(1246 110)">
            <path d="M14 0 H42 V14 H56 V0 H84 V14 H98 V42 H84 V56 H70 V70 H56 V84 H42 V70 H28 V56 H14 V42 H0 V14 H14 Z" />
          </g>

          {/* Formas soltas. */}
          <circle cx="390" cy="200" r="22" />
          <rect x="102" y="382" width="48" height="48" rx="12" transform="rotate(-14 126 406)" />
          <rect x="1506" y="516" width="48" height="48" rx="12" transform="rotate(12 1530 540)" />
          <path d="M256 700 L306 700 L281 652 Z" />
          <path d="M1470 190 L1522 190 L1496 142 Z" />
          <path d="M56 880 A140 140 0 0 1 216 892" />
          <path d="M1348 934 A120 120 0 0 1 1588 934" />
        </g>

        <g fill="white">
          {STARS.map((s) => (
            <path key={`${s.x}-${s.y}`} d={star(s)} fillOpacity="0.2" />
          ))}
          {BUBBLES.map((b) => (
            <circle key={`${b.cx}-${b.cy}`} cx={b.cx} cy={b.cy} r={b.r} fillOpacity={b.o} />
          ))}

          <text
            x="1300"
            y="272"
            transform="rotate(-8 1300 272)"
            fontSize="62"
            fontWeight="700"
            fillOpacity="0.2"
          >
            hello
          </text>
        </g>
      </svg>
    </div>
  );
}
