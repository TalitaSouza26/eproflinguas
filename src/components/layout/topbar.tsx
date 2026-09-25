"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { HelpIcon, LogoutIcon, SettingsIcon } from "@/components/ui/icons";
import { CURRENT_STUDENT } from "@/lib/home-data";

/**
 * Ícones do canto do aluno.
 *
 * Acendem quando são a página aberta, do mesmo jeito que os itens da faixa: o
 * ícone sozinho já é pouca pista, e sem isso não dá para saber onde se está
 * depois de clicar nele.
 */
const CORNER_ICON =
  "rounded-xl p-2.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "focus-visible:outline-blue-500";

const CORNER_IDLE =
  "text-[var(--shell-muted)] hover:bg-[var(--shell-hover)] hover:text-[var(--shell-title)]";

const CORNER_ON = "bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)]";

const CORNER_LINKS = [
  { href: "/configuracoes", label: "Configurações", icon: SettingsIcon },
  { href: "/ajuda", label: "Central de ajuda", icon: HelpIcon },
];

const ITEM_BASE =
  "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 sm:px-4";

/**
 * Os três destinos do estudo.
 *
 * Existem duas vezes no cabeçalho, em lugares diferentes conforme a largura —
 * daí serem um componente e não marcação repetida. Só um dos dois aparece de
 * cada vez.
 */
function NavLinks({ pathname }: { pathname: string }) {
  return (
    <ul className="flex items-center gap-1">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={active ? "page" : undefined}
              className={
                active
                  ? `${ITEM_BASE} bg-[var(--nav-active-bg)] text-[var(--nav-active-fg)] shadow-[var(--nav-active-shadow)]`
                  : `${ITEM_BASE} text-[var(--shell-item)] hover:bg-[var(--shell-hover)]`
              }
            >
              <Icon
                className={`size-5 ${active ? "text-[var(--nav-active-icon)]" : "text-[var(--shell-muted)]"}`}
              />
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * A casca inteira num cabeçalho só.
 *
 * Havia uma coluna lateral fixa no desktop que virava gaveta no celular. Saiu:
 * ela custava 272px de largura em toda tela, e o conteúdo que mais precisa de
 * espaço — o card do quiz com o Bubo ao lado — era justamente quem pagava.
 *
 * De `lg` para cima é uma faixa só: logo à esquerda, navegação no meio, aluno
 * à direita. O meio é o centro do cabeçalho, não o meio do que sobra entre os
 * dois — por isso a navegação sai do fluxo em vez de ser mais um item do flex:
 * logo e canto do aluno têm larguras diferentes, e centrar "o que sobra"
 * deixaria a navegação visivelmente torta.
 *
 * Abaixo disso ela desce para uma segunda faixa, centrada do mesmo jeito.
 *
 * O título da página saiu junto com o menu lateral. Ele dizia "Início" logo
 * acima de um menu onde "Início" já estava aceso: o item ativo faz esse
 * trabalho agora.
 */
export function Topbar({ signOutAction }: { signOutAction: () => Promise<void> }) {
  const pathname = usePathname();

  return (
    <header className="border-b border-[var(--shell-border)] bg-[var(--shell-bg)]">
      <div className="relative flex items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-4">
        <Link
          href="/inicio"
          className="block shrink-0 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4
                     focus-visible:outline-blue-500"
        >
          <Image
            src="/brand/logo-linguas-azul.webp"
            alt="eProf Línguas"
            width={700}
            height={264}
            priority
            className="h-9 w-auto sm:h-11"
          />
        </Link>

        <nav
          aria-label="Menu principal"
          className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
        >
          <NavLinks pathname={pathname} />
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* O nome só aparece quando sobra largura. O menu fica no meio
              fixo do cabeçalho, então é o canto que precisa caber — e o avatar
              sozinho já identifica quem está estudando. */}
          <div className="hidden text-right leading-tight xl:block">
            <p className="text-[15px] font-bold text-[var(--shell-title)]">
              {CURRENT_STUDENT.fullName}
            </p>
            <p className="text-[13px] text-[var(--shell-muted)]">Aluno</p>
          </div>

          <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-accent-500 text-sm font-bold text-white">
            {CURRENT_STUDENT.initials}
          </span>

          {/* Configurações, ajuda e sair moram aqui, em ícone: nenhum é sobre
              estudar. Sair fica por último, no extremo — encostado nos
              vizinhos, quem mira um acerta o outro, e as consequências são bem
              diferentes. */}
          {CORNER_LINKS.map(({ href, label, icon: Icon }) => {
            const open = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={open ? "page" : undefined}
                title={label}
                className={`${CORNER_ICON} ${open ? CORNER_ON : CORNER_IDLE}`}
              >
                <Icon className="size-5" />
              </Link>
            );
          })}

          <form action={signOutAction}>
            <button
              type="submit"
              aria-label="Sair da conta"
              title="Sair da conta"
              className={`${CORNER_ICON} ${CORNER_IDLE}`}
            >
              <LogoutIcon className="size-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Abaixo de lg a navegação vira faixa própria, centrada também. Em
          375px não há meio onde caber ao lado do logo, e escondê-la atrás de
          um botão traria de volta a gaveta que acabamos de tirar. */}
      <nav
        aria-label="Menu principal"
        className="overflow-x-auto px-2 pb-2 sm:px-6 sm:pb-3 lg:hidden"
      >
        <div className="flex justify-center">
          <NavLinks pathname={pathname} />
        </div>
      </nav>
    </header>
  );
}
