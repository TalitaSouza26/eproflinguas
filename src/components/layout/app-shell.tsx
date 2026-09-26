import { Topbar } from "@/components/layout/topbar";

/**
 * Casca do aplicativo: cabeçalho em cima, conteúdo embaixo.
 *
 * Não há mais estado aqui. Enquanto existia coluna lateral, ela virava gaveta
 * no celular e este componente guardava o "aberto" porque header e menu
 * precisavam dele — junto com o fundo escuro, o Esc para fechar e o foco. Com
 * a navegação no cabeçalho, nada disso existe.
 */
export function AppShell({
  signOutAction,
  devMode,
  children,
}: {
  signOutAction: () => Promise<void>;
  /** Modo protótipo: libera o atalho de zerar no cabeçalho. */
  devMode: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--shell-bg)]">
      <Topbar signOutAction={signOutAction} devMode={devMode} />

      {/* Coluna flex: as telas que ocupam a altura inteira pedem `flex-1`
          aqui dentro, em vez de descontarem a altura do cabeçalho na mão. */}
      <main className="flex min-w-0 flex-1 flex-col bg-gradient-to-b from-[var(--content-from)] to-[var(--content-to)]">
        {children}
      </main>
    </div>
  );
}
