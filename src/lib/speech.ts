/**
 * Fala do Bubo.
 *
 * Um trecho de narração é bilíngue: português com a palavra em inglês dentro.
 * Ler tudo com voz portuguesa estragaria justamente a parte que interessa —
 * "Good morning" sairia "góóds morníngui" —, então o texto é quebrado nos
 * marcadores e cada pedaço é falado na língua dele.
 *
 * O marcador é o asterisco: "Ele disse: *Good morning*!".
 *
 * TODO: trocar por áudio gravado. Entonação de história é o que o
 * sintetizador faz pior, e narração é onde isso mais aparece.
 */

export type SpeechPart = { text: string; lang: "pt-BR" | "en-US" };

/** Quebra o texto nos trechos em inglês marcados com asterisco. */
export function splitBilingual(text: string): SpeechPart[] {
  return text
    .split(/\*([^*]+)\*/g)
    .map((piece, i) => ({ text: piece, lang: i % 2 === 1 ? ("en-US" as const) : ("pt-BR" as const) }))
    .filter((p) => p.text.trim().length > 0);
}

export function cancelSpeech() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}

/**
 * Fala os pedaços em sequência e avisa no fim.
 *
 * Devolve uma função de cancelamento: sair da cena no meio da fala deixaria
 * o áudio tocando por cima da próxima.
 */
export function speakParts(parts: SpeechPart[], onEnd?: () => void): () => void {
  const synth = typeof window === "undefined" ? undefined : window.speechSynthesis;

  if (!synth || parts.length === 0) {
    // Sem sintetizador a cena não pode ficar presa esperando um fim que não vem.
    onEnd?.();
    return () => {};
  }

  let cancelled = false;
  synth.cancel();

  parts.forEach((part, i) => {
    const utterance = new SpeechSynthesisUtterance(part.text);
    utterance.lang = part.lang;
    // Devagar: é história para criança pequena, e a palavra nova precisa
    // chegar separada do resto da frase.
    utterance.rate = part.lang === "en-US" ? 0.75 : 0.95;

    if (i === parts.length - 1) {
      utterance.onend = () => {
        if (!cancelled) onEnd?.();
      };
      utterance.onerror = () => {
        if (!cancelled) onEnd?.();
      };
    }

    synth.speak(utterance);
  });

  return () => {
    cancelled = true;
    synth.cancel();
  };
}
