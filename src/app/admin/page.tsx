import type { Metadata } from "next";
import { MontarTrilha } from "@/components/admin/montar-trilha";

export const metadata: Metadata = { title: "Montar trilha — eProf Admin" };

/**
 * O backoffice de demonstração.
 *
 * Fora do grupo (app) de propósito: não tem o cabeçalho azul nem o gradiente
 * da tela do aluno. É ferramenta, e ferramenta de adulto — claro, denso, sem
 * botão gigante.
 */
export default function AdminPage() {
  return <MontarTrilha />;
}
