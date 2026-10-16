import type { Metadata } from "next";
import { DemoFase } from "@/components/demo/demo-fase";
import { WelcomeBackdrop } from "@/components/quiz/welcome-backdrop";

export const metadata: Metadata = { title: "Demonstração — eProf Línguas" };

/** A abertura da fase: galeria, história ou revisão. Diálogo vai direto ao quiz. */
export default async function DemoAberturaPage({
  searchParams,
}: {
  searchParams: Promise<{ trilha?: string; fase?: string }>;
}) {
  const { trilha, fase } = await searchParams;
  const numero = Number(fase) >= 1 ? Number(fase) : 1;

  return (
    <div className="relative isolate flex flex-1 items-center justify-center px-5 py-10">
      <WelcomeBackdrop />
      <DemoFase etapa="abertura" trilhaId={trilha ?? ""} fase={numero} />
    </div>
  );
}
