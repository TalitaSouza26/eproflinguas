/**
 * Formas geométricas de fundo dos cards azuis: chevrons, riscos e círculos,
 * todos em opacidade baixa para dar textura sem disputar com a leitura.
 *
 * É SVG e não imagem: escala sem perder nitidez e não custa requisição.
 */
export function CardBackdrop({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 size-full ${className ?? ""}`}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 800 240"
      fill="none"
    >
      <g stroke="white" strokeOpacity="0.09" strokeWidth="2" strokeLinecap="round">
        <path d="M470 -20 L540 60 L470 140" />
        <path d="M520 20 L580 90 L520 160" />
        <path d="M60 210 L110 258 L60 306" />
      </g>

      <g fill="white" fillOpacity="0.06">
        <circle cx="700" cy="30" r="52" />
        <circle cx="120" cy="20" r="34" />
        <circle cx="330" cy="225" r="26" />
      </g>

      <g stroke="white" strokeOpacity="0.07" strokeWidth="14" strokeLinecap="round">
        <path d="M600 200 L660 140" />
        <path d="M645 235 L720 160" />
        <path d="M-10 120 L40 70" />
      </g>

      <g fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="2">
        <rect x="250" y="18" width="34" height="34" rx="8" transform="rotate(18 267 35)" />
        <rect x="415" y="175" width="26" height="26" rx="7" transform="rotate(-14 428 188)" />
      </g>
    </svg>
  );
}

/** Gradiente azul compartilhado pelos cards de destaque. */
export const BLUE_CARD =
  "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1c49cc] via-[#143a9e] to-[#0e2a72] text-white";
