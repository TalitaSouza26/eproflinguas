"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/components/layout/nav-items";
import { HelpIcon, LogoutIcon, ReplayIcon, SettingsIcon } from "@/components/ui/icons";
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

const CONFIGURACOES = {
  href: "/configuracoes",
  label: "Configurações",
  icon: SettingsIcon,
};

const AJUDA = { href: "/ajuda", label: "Central de ajuda", icon: HelpIcon };

/**
 * Atalho de demonstração, no lugar da ajuda.
 *
 * Zerar e repetir a primeira sessão é o que mais se faz com o protótipo, e o
 * progresso vive em cookies `httpOnly` que o navegador não deixa apagar — sem
 * atalho, cada demonstração vira uma ida a Configurações.
 *
 * Toma a vaga da ajuda porque ela hoje é uma página vazia. Quando o Supabase
 * entrar, este atalho some e a ajuda volta sozinha para cá.
 */
const ZERAR = {
  href: "/recomecar?primeiro=1",
  label: "Zerar o progresso e ver o primeiro acesso",
  icon: ReplayIcon,
};

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
export function Topbar({
  signOutAction,
  devMode,
}: {
  signOutAction: () => Promise<void>;
  /** Modo protótipo: troca a ajuda pelo atalho de zerar. */
  devMode: boolean;
}) {
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

          {/* As iniciais ficam atrás da foto, não no lugar dela: se a imagem
              não carregar, o círculo continua identificando o aluno em vez de
              virar um buraco no cabeçalho. */}
          <span className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-accent-500 text-sm font-bold text-white">
            {CURRENT_STUDENT.initials}
            <Image
              src={CURRENT_STUDENT.photo}
              alt={CURRENT_STUDENT.fullName}
              width={256}
              height={256}
              className="absolute inset-0 size-full object-cover"
            />
          </span>

          {/* Configurações, ajuda e sair moram aqui, em ícone: nenhum é sobre
              estudar. Sair fica por último, no extremo — encostado nos
              vizinhos, quem mira um acerta o outro, e as consequências são bem
              diferentes. */}
          <Link
            href={CONFIGURACOES.href}
            aria-label={CONFIGURACOES.label}
            aria-current={pathname.startsWith(CONFIGURACOES.href) ? "page" : undefined}
            title={CONFIGURACOES.label}
            className={`${CORNER_ICON} ${
              pathname.startsWith(CONFIGURACOES.href) ? CORNER_ON : CORNER_IDLE
            }`}
          >
            <CONFIGURACOES.icon className="size-5" />
          </Link>

          {devMode ? (
            // Âncora comum, não <Link>: a rota precisa responder de verdade
            // para apagar os cookies. Navegação do cliente não a executa.
            <a
              href={ZERAR.href}
              aria-label={ZERAR.label}
              title={ZERAR.label}
              className={`${CORNER_ICON} ${CORNER_IDLE}`}
            >
              <ZERAR.icon className="size-5" />
            </a>
          ) : (
            <Link
              href={AJUDA.href}
              aria-label={AJUDA.label}
              aria-current={pathname.startsWith(AJUDA.href) ? "page" : undefined}
              title={AJUDA.label}
              className={`${CORNER_ICON} ${
                pathname.startsWith(AJUDA.href) ? CORNER_ON : CORNER_IDLE
              }`}
            >
              <AJUDA.icon className="size-5" />
            </Link>
          )}

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
