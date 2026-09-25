import { signOut } from "@/app/(app)/actions";
import { AppShell } from "@/components/layout/app-shell";
import { DEV_AUTH_ENABLED } from "@/lib/dev-auth";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <AppShell signOutAction={signOut} devMode={DEV_AUTH_ENABLED}>
      {children}
    </AppShell>
  );
}
