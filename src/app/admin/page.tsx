import type { Metadata } from "next";
import { Painel } from "@/components/admin/painel";

export const metadata: Metadata = { title: "Trilhas — eProf Admin" };

/**
 * O backoffice de demonstração.
 *
 * Fora do grupo (app) de propósito: não tem o cabeçalho azul nem o gradiente
 * da tela do aluno. É ferramenta, e ferramenta de adulto — claro, denso, sem
 * botão gigante.
 */
export default function AdminPage() {
  return <Painel />;
}
