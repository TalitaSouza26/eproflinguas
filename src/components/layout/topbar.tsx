"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { HomeIcon } from "@/components/ui/icons";
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

export function Topbar() {
  const { label, subtitle, icon: Icon } = pageFor(usePathname());

  return (
    <header className="flex items-center justify-between gap-4 border-b border-ink-100 bg-ink-50 px-8 py-5">
      <div className="flex min-w-0 items-center gap-4">
        <Icon className="size-7 shrink-0 text-accent-500" />
        <div className="min-w-0">
          <h1 className="truncate text-[28px] font-medium leading-tight text-deep-900">{label}</h1>
          {subtitle && <p className="truncate text-sm text-ink-500">{subtitle}</p>}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="text-right leading-tight">
          <p className="text-[15px] font-bold text-deep-900">{CURRENT_STUDENT.fullName}</p>
          <p className="text-[13px] text-ink-500">Aluno</p>
        </div>
        <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-accent-500 text-sm font-bold text-white">
          {CURRENT_STUDENT.initials}
        </span>
      </div>
    </header>
  );
}
