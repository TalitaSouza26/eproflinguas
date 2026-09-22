"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { LogoutIcon } from "@/components/ui/icons";

const ITEM_BASE =
  "flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

export function Sidebar({ signOutAction }: { signOutAction: () => Promise<void> }) {
  const pathname = usePathname();

  return (
    <aside className="flex w-[272px] shrink-0 flex-col bg-[var(--shell-bg)] px-4 py-7">
      <Link href="/inicio" className="brand-logo mb-6 block px-4">
        <Image
          src="/brand/logo-linguas.webp"
          alt="eProf Línguas"
          width={560}
          height={190}
          priority
          className="h-auto w-full"
        />
      </Link>

      <span className="mx-1 mb-8 rounded-lg bg-accent-500 px-5 py-3 text-center text-xs font-bold tracking-wide text-white">
        PORTAL DO ALUNO
      </span>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? `${ITEM_BASE} bg-white font-semibold text-blue-600 shadow-[0_4px_14px_-6px_rgba(15,34,71,0.25)]`
                  : `${ITEM_BASE} text-[var(--shell-item)] hover:bg-[var(--shell-hover)]`
              }
            >
              <Icon
                className={active ? "size-[22px] text-accent-500" : "size-[22px] text-[var(--shell-muted)]"}
              />
              {label}
            </Link>
          );
        })}

        <form action={signOutAction}>
          <button
            type="submit"
            className={`${ITEM_BASE} w-full text-[var(--shell-item)] hover:bg-[var(--shell-hover)]`}
          >
            <LogoutIcon className="size-[22px] text-[var(--shell-muted)]" />
            Sair da conta
          </button>
        </form>
      </nav>
    </aside>
  );
}
