"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { HomeIcon, MenuIcon } from "@/components/ui/icons";
import { CURRENT_STUDENT } from "@/lib/home-data";

const FALLBACK = {
  label: "eProf Línguas",
  subtitle: "",
  icon: HomeIcon,
};

function pageFor(pathname: string) {
  return (
    NAV_ITEMS.find(({ href }) => pathname === href || pathname.startsWith(`${href}/`)) ?? FALLBACK
  );
}

export function Topbar({
  onMenuClick,
  menuOpen,
}: {
  onMenuClick: () => void;
  menuOpen: boolean;
}) {
  const { label, subtitle, icon: Icon } = pageFor(usePathname());

  return (
    <header className="flex items-center justify-between gap-3 border-b border-[var(--shell-border)] bg-[var(--shell-bg)] px-4 py-4 sm:px-8 sm:py-5">
      <div className="flex min-w-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          className="rounded-lg p-2 text-[var(--shell-title)] transition hover:bg-[var(--shell-hover)]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                     lg:hidden"
        >
          <MenuIcon className="size-6" />
        </button>

        <Icon className="hidden size-7 shrink-0 text-accent-500 sm:block" />

        <div className="min-w-0">
          <h1 className="truncate text-xl font-medium leading-tight text-[var(--shell-title)] sm:text-[28px]">
            {label}
          </h1>
          {subtitle && (
            <p className="hidden truncate text-sm text-[var(--shell-muted)] sm:block">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <div className="hidden sm:block">
          <ThemeSwitch />
        </div>

        <div className="flex items-center gap-3">
          {/* No mobile o nome sai e fica só o avatar, que já identifica. */}
          <div className="hidden text-right leading-tight md:block">
            <p className="text-[15px] font-bold text-[var(--shell-title)]">
              {CURRENT_STUDENT.fullName}
            </p>
            <p className="text-[13px] text-[var(--shell-muted)]">Aluno</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-accent-500 text-sm font-bold text-white sm:size-11">
            {CURRENT_STUDENT.initials}
          </span>
        </div>
      </div>
    </header>
  );
}
