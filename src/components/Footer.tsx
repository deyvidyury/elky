import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-brand-900 text-white mt-auto">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-500 text-white text-base font-bold">
                GS
              </div>
              <span className="text-xl font-bold tracking-tight">
                Guia de Suprimentos
              </span>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Tudo que seu restaurante precisa no dia a dia — de papel toalha a
              equipamentos industriais. Informações claras e atualizadas para
              donos de restaurantes, chefs e empreendedores.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              {[
                {
                  label: 'Facebook',
                  icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
                {
                  label: 'Instagram',
                  icon: 'M16 4H8a4 4 0 00-4 4v8a4 4 0 004 4h8a4 4 0 004-4V8a4 4 0 00-4-4zm-4 11a3 3 0 110-6 3 3 0 010 6zm3.5-6.5a1 1 0 110-2 1 1 0 010 2z',
                },
                {
                  label: 'YouTube',
                  icon: 'M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 1.96A29.94 29.94 0 001 11.75a29.94 29.94 0 00.46 5.33 2.78 2.78 0 001.94 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-1.96 29.94 29.94 0 00.46-5.33 29.94 29.94 0 00-.46-5.33z',
                },
                {
                  label: 'WhatsApp',
                  icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z',
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-800 hover:bg-accent-500 transition-colors"
                >
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Categorias
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Limpeza', href: '/categorias/limpeza' },
                { label: 'Cozinha', href: '/categorias/cozinha' },
                { label: 'Refrigeração', href: '/categorias/refrigeracao' },
                { label: 'Lavagem', href: '/categorias/lavagem' },
                { label: 'Utensílios', href: '/categorias/utensilios' },
                { label: 'Todos os Produtos', href: '/produtos' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-accent-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Institucional
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Sobre Nós', href: '/sobre' },
                { label: 'Contato', href: '/contato' },
                { label: 'Termos de Uso', href: '/termos-de-uso' },
                {
                  label: 'Política de Privacidade',
                  href: '/politica-de-privacidade',
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-accent-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-400 mb-4">
              Atendimento
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (11) 3000-0000
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                contato@guiadesuprimentos.com.br
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-accent-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Seg a Sex: 08h às 18h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-brand-800 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Guia de Suprimentos para
              Restaurantes. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="/figma"
                className="text-xs text-gray-500 hover:text-accent-300 transition-colors"
              >
                Ver design alternativo
              </Link>
              <span className="text-gray-600">·</span>
              <p className="text-xs text-gray-500">
                Este site utiliza cookies e exibe anúncios. Ao navegar, você
                concorda com nossa{' '}
                <Link
                  href="/politica-de-privacidade"
                  className="underline hover:text-accent-300 transition-colors"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
