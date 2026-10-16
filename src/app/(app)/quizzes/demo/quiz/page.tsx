import type { Metadata } from "next";
import { DemoFase } from "@/components/demo/demo-fase";

export const metadata: Metadata = { title: "Demonstração — eProf Línguas" };

/** O quiz da fase. */
export default async function DemoQuizPage({
  searchParams,
}: {
  searchParams: Promise<{ trilha?: string; fase?: string }>;
}) {
  const { trilha, fase } = await searchParams;
  const numero = Number(fase) >= 1 ? Number(fase) : 1;

  return <DemoFase etapa="quiz" trilhaId={trilha ?? ""} fase={numero} />;
}
