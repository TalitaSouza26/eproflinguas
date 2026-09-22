import { signOut } from "@/app/(app)/actions";
import { AppShell } from "@/components/layout/app-shell";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return <AppShell signOutAction={signOut}>{children}</AppShell>;
}
