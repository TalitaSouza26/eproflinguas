"use client";

import { useSyncExternalStore } from "react";
import { EVENTO_DEMO, lerDemo, type DemoTrilha } from "@/lib/demo/trilha";

/**
 * A trilha de demonstração, para quem só lê.
 *
 * `useSyncExternalStore` em vez de `useEffect` com `setState`: a trilha é
 * estado de fora do React — vive no `sessionStorage` — e este é o jeito de
 * assinar uma fonte externa sem provocar uma renderização em cascata.
 *
 * O instantâneo é guardado em cache porque a função precisa devolver sempre o
 * MESMO objeto enquanto nada mudar. Devolvendo um objeto novo a cada leitura,
 * o React entenderia que houve mudança e entraria em laço.
 */

let cacheTexto: string | null = null;
let cacheValor: DemoTrilha | null = null;

function instantaneo(): DemoTrilha | null {
  const texto = (() => {
    try {
      return window.sessionStorage.getItem("eprof-demo-trilha");
    } catch {
      return null;
    }
  })();

  if (texto !== cacheTexto) {
    cacheTexto = texto;
    cacheValor = lerDemo();
  }
  return cacheValor;
}

function assinar(aoMudar: () => void) {
  window.addEventListener(EVENTO_DEMO, aoMudar);
  // Montar a trilha noutra aba da mesma sessão também avisa esta.
  window.addEventListener("storage", aoMudar);
  return () => {
    window.removeEventListener(EVENTO_DEMO, aoMudar);
    window.removeEventListener("storage", aoMudar);
  };
}

/** No servidor não há aba, logo não há trilha. */
const noServidor = () => null;

export function useDemoTrilha(): DemoTrilha | null {
  return useSyncExternalStore(assinar, instantaneo, noServidor);
}
