"use client";

import { useSyncExternalStore } from "react";
import { CHAVE_BANCO, EVENTO_DEMO, lerBanco, type Banco } from "@/lib/demo/banco";

/**
 * O conteúdo montado no admin, para quem só lê.
 *
 * `useSyncExternalStore` em vez de `useEffect` com `setState`: o conteúdo é
 * estado de fora do React — vive no `sessionStorage` — e este é o jeito de
 * assinar uma fonte externa sem provocar uma renderização em cascata.
 *
 * O instantâneo é guardado em cache porque a função precisa devolver sempre o
 * MESMO objeto enquanto nada mudar. Devolvendo um objeto novo a cada leitura,
 * o React entenderia que houve mudança e entraria em laço.
 */

let cacheTexto: string | null = null;
let cacheValor: Banco | null = null;

function instantaneo(): Banco | null {
  const texto = (() => {
    try {
      return window.sessionStorage.getItem(CHAVE_BANCO);
    } catch {
      return null;
    }
  })();

  if (texto !== cacheTexto) {
    cacheTexto = texto;
    cacheValor = lerBanco();
  }
  return cacheValor;
}

function assinar(aoMudar: () => void) {
  window.addEventListener(EVENTO_DEMO, aoMudar);
  // Montar conteúdo noutra aba da mesma sessão também avisa esta.
  window.addEventListener("storage", aoMudar);
  return () => {
    window.removeEventListener(EVENTO_DEMO, aoMudar);
    window.removeEventListener("storage", aoMudar);
  };
}

/** No servidor não há aba, logo não há conteúdo. */
const noServidor = () => null;

export function useBanco(): Banco | null {
  return useSyncExternalStore(assinar, instantaneo, noServidor);
}
