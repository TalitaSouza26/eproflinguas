"use client";

import { useEffect, useState } from "react";
import { SpeakerIcon } from "@/components/ui/icons";

/**
 * Botão de ouvir.
 *
 * Fala pelo sintetizador do próprio navegador. A voz é mediana, mas existe
 * hoje, em todo aparelho e sem custo — e para um aluno de 6 anos, que ainda
 * está sendo alfabetizado, ouvir não é enfeite: é o canal.
 *
 * Nada é tocado sozinho. Autoplay é bloqueado na primeira visita da maioria
 * dos navegadores, e som que começa sem aviso assusta quem está com o
 * aparelho no colo.
 *
 * TODO: trocar por áudio gravado. O sintetizador erra a prosódia do inglês
 * infantil e varia demais entre sistemas.
 */
export function SpeakButton({
  text,
  lang = "pt-BR",
  label,
  className = "",
}: {
  text: string;
  /** "pt-BR" para a instrução, "en-US" para a palavra ensinada. */
  lang?: string;
  /** Nome do botão para quem usa leitor de tela. */
  label: string;
  className?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  // Sair da tela no meio da fala deixaria o áudio tocando sobre a próxima.
  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  function speak() {
    const synth = typeof window === "undefined" ? undefined : window.speechSynthesis;
    if (!synth) return;

    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    // Devagar: criança pequena não acompanha a velocidade padrão.
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);

    setSpeaking(true);
    synth.speak(utterance);
  }

  return (
    <button
      type="button"
      onClick={speak}
      aria-label={label}
      className={`inline-flex items-center justify-center rounded-full transition
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white
                  ${speaking ? "animate-cta-call" : ""} ${className}`}
    >
      <SpeakerIcon className="size-7" />
    </button>
  );
}
