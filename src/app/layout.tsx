import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eProf Línguas",
  description: "Trilhas de inglês para o Ensino Fundamental.",
};

/**
 * Restaura o tema antes da primeira pintura. Sem isso a página pisca no tema
 * claro antes de virar azul.
 */
const RESTORE_THEME = `try{if(localStorage.getItem('linguas-tema')==='azul')document.documentElement.dataset.theme='azul'}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORE_THEME }} />
      </head>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
