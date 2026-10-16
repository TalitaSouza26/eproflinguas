import type { Metadata } from "next";
import { DemoFase } from "@/components/demo/demo-fase";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";

export const metadata: Metadata = { title: "Demonstração — eProf Línguas" };

/** A galeria da trilha montada no admin. */
export default function DemoGaleriaPage() {
  return (
    <div className="relative isolate flex flex-1 items-center justify-center px-5 py-10">
      <WelcomeBackdrop />
      <DemoFase etapa="galeria" />
    </div>
  );
}
