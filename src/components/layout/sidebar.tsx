"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { ThemeSwitch } from "@/components/layout/theme-switch";
import { CloseIcon, LogoutIcon, ReplayIcon } from "@/components/ui/icons";

const ITEM_BASE =
  "flex items-center gap-3.5 rounded-xl px-4 py-3 text-[15px] transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500";

export function Sidebar({
  signOutAction,
  devMode,
  open,
  onNavigate,
}: {
  signOutAction: () => Promise<void>;
  /** Modo protótipo: mostra o atalho de recomeçar. */
  devMode: boolean;
  /** Só vale no mobile: no desktop o menu é sempre visível. */
  open: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      aria-label="Menu principal"
      className={`fixed inset-y-0 left-0 z-50 flex w-[272px] shrink-0 flex-col overflow-y-auto
                  bg-[var(--sidebar-bg)] [background-image:var(--sidebar-image)] px-4 py-7
                  transition-transform duration-300
                  lg:static lg:translate-x-0 ${open ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}
    >
      <div className="mb-8 flex items-start justify-between gap-2">
        <Link href="/inicio" onClick={onNavigate} className="block min-w-0 flex-1 px-3">
          <Image
            src="/brand/logo-linguas-azul.webp"
            alt="eProf Línguas"
            width={700}
            height={264}
            priority
            className="h-auto w-full"
          />
        </Link>

        <button
          type="button"
          onClick={onNavigate}
          aria-label="Fechar menu"
          className="rounded-lg p-2 text-[var(--sidebar-item)] transition hover:bg-[var(--sidebar-hover)]
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500
                     lg:hidden"
        >
          <CloseIcon className="size-5" />
        </button>
      </div>

      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? `${ITEM_BASE} bg-[var(--nav-active-bg)] font-semibold text-[var(--nav-active-fg)] shadow-[var(--nav-active-shadow)]`
                  : `${ITEM_BASE} text-[var(--sidebar-item)] hover:bg-[var(--sidebar-hover)]`
              }
            >
              <Icon
                className={
                  active
                    ? "size-[22px] text-[var(--nav-active-icon)]"
                    : "size-[22px] text-[var(--sidebar-muted)]"
                }
              />
              {label}
            </Link>
          );
        })}

        <form action={signOutAction}>
          <button
            type="submit"
            className={`${ITEM_BASE} w-full text-[var(--sidebar-item)] hover:bg-[var(--sidebar-hover)]`}
          >
            <LogoutIcon className="size-[22px] text-[var(--sidebar-muted)]" />
            Sair da conta
          </button>
        </form>
      </nav>

      {/* Atalho de demonstração: repetir a primeira sessão é o que mais se
          faz com o protótipo, e o progresso vive em cookies que o navegador
          não deixa apagar. Some quando o Supabase entrar. */}
      {devMode && (
        <a
          href="/recomecar"
          className="mt-6 inline-flex items-center gap-2 self-start rounded-full border border-white/20
                     px-3.5 py-2 text-xs font-semibold text-[var(--sidebar-item)] transition
                     hover:bg-[var(--sidebar-hover)] focus-visible:outline-2
                     focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <ReplayIcon className="size-4" />
          Recomeçar o protótipo
        </a>
      )}

      {/* No desktop o seletor vive no header; aqui ele acompanha a gaveta. */}
      <div className="mt-8 flex justify-center lg:hidden">
        <ThemeSwitch tone="sidebar" />
      </div>
    </aside>
  );
}
