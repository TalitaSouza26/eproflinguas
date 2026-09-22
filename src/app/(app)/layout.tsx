import { signOut } from "@/app/(app)/actions";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-screen bg-[var(--shell-bg)]">
      <Sidebar signOutAction={signOut} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="min-w-0 flex-1 bg-gradient-to-b from-[var(--content-from)] to-[var(--content-to)]">
          {children}
        </main>
      </div>
    </div>
  );
}
