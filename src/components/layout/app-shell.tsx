"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

/**
 * Casca do aplicativo.
 *
 * No desktop o menu é uma coluna fixa. Abaixo de 1024px ele vira gaveta: sai
 * do fluxo, desliza por cima do conteúdo e escurece o fundo. O estado de
 * aberto vive aqui porque header e menu precisam dele.
 */
export function AppShell({
  signOutAction,
  devMode,
  children,
}: {
  signOutAction: () => Promise<void>;
  /** Modo protótipo: libera o atalho de recomeçar no menu. */
  devMode: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  // Esc fecha a gaveta: sair dela não pode depender de acertar o X.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="flex min-h-screen bg-[var(--sidebar-bg)]">
      {/* Fundo escuro só existe com a gaveta aberta, e só no mobile. */}
      {open && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      <Sidebar
        signOutAction={signOutAction}
        devMode={devMode}
        open={open}
        onNavigate={() => setOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setOpen(true)} menuOpen={open} />
        <main className="min-w-0 flex-1 bg-gradient-to-b from-[var(--content-from)] to-[var(--content-to)]">
          {children}
        </main>
      </div>
    </div>
  );
}
