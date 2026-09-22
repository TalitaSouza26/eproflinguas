"use client";

import { useSyncExternalStore } from "react";

export const THEME_KEY = "linguas-tema";
type Theme = "original" | "azul";

const CHANGE_EVENT = "linguas:tema";

/**
 * A fonte da verdade é o atributo no <html>, não um estado do React: ele é
 * escrito antes da primeira pintura pelo script do layout, e os tokens de cor
 * do CSS leem dali. O componente só observa e escreve.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

function readTheme(): Theme {
  return document.documentElement.dataset.theme === "azul" ? "azul" : "original";
}

function applyTheme(next: Theme) {
  if (next === "azul") {
    document.documentElement.dataset.theme = "azul";
  } else {
    delete document.documentElement.dataset.theme;
  }

  try {
    localStorage.setItem(THEME_KEY, next);
  } catch {
    // Navegação privada ou armazenamento bloqueado: o tema vale só nesta sessão.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

const BASE =
  "rounded-full px-3 py-1.5 text-xs font-bold transition focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-blue-500";

/**
 * Troca o tema da aplicação inteira.
 *
 * O seletor vive em dois lugares de cor diferente — header e menu —, então
 * recebe de fora quais tokens usar.
 */
export function ThemeSwitch({ tone = "header" }: { tone?: "header" | "sidebar" }) {
  const item = tone === "sidebar" ? "var(--sidebar-item)" : "var(--shell-item)";
  const hover = tone === "sidebar" ? "var(--sidebar-hover)" : "var(--shell-hover)";
  const border = tone === "sidebar" ? "rgb(255 255 255 / 0.2)" : "var(--shell-border)";

  // No servidor não há DOM, então o valor inicial é sempre o tema claro.
  const theme = useSyncExternalStore(subscribe, readTheme, () => "original" as Theme);

  const button = (value: Theme, label: string) => (
    <button
      type="button"
      onClick={() => applyTheme(value)}
      aria-pressed={theme === value}
      className={`${BASE} ${
        theme === value
          ? "bg-blue-500 text-white"
          : "hover:bg-[var(--tone-hover)]"
      }`}
      style={theme === value ? undefined : { color: item, ["--tone-hover" as string]: hover }}
    >
      {label}
    </button>
  );

  return (
    <div
      role="group"
      aria-label="Tema da aplicação"
      className="flex items-center gap-1 rounded-full border p-1"
      style={{ borderColor: border }}
    >
      {button("azul", "Azul")}
      {button("original", "Original")}
    </div>
  );
}
