import type { Metadata } from "next";
import { DemoFase } from "@/components/demo/demo-fase";

export const metadata: Metadata = { title: "Demonstração — eProf Línguas" };

/** O quiz da trilha montada no admin. */
export default function DemoQuizPage() {
  return <DemoFase etapa="quiz" />;
}
