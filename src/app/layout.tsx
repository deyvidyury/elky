import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { HeaderSwitcher } from '@/components/HeaderSwitcher';
import { FooterSwitcher } from '@/components/FooterSwitcher';

export const metadata: Metadata = {
  title: {
    default:
      'Guia de Suprimentos para Restaurantes — Equipamentos, Limpeza e Mais',
    template: '%s | Guia de Suprimentos',
  },
  description:
    'Encontre os melhores suprimentos para o seu restaurante: papel toalha, sacos de lixo, desinfetantes, lava-louças industrial, máquina de gelo e equipamentos completos para o dia a dia.',
  metadataBase: new URL('https://site-elke.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Guia de Suprimentos para Restaurantes',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts: Inter (body), Playfair Display (headings), Poppins (figma body) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Google AdSense Script — loaded after hydration to avoid render-blocking */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <HeaderSwitcher />
        <main className="flex-1">{children}</main>
        <FooterSwitcher />
      </body>
    </html>
  );
}
