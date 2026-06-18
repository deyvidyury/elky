import Link from 'next/link';

export function FigmaFooter() {
  return (
    <footer className="bg-[#2f2e30] text-[#fafafa] mt-auto">
      <div className="mx-auto max-w-[1170px] px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/figma" className="text-2xl font-bold tracking-tight">
              Guia de Suprimentos
            </Link>
            <p className="mt-4 text-sm text-[rgba(250,250,250,0.7)] leading-relaxed max-w-xs">
              Tudo que seu restaurante precisa no dia a dia — de papel toalha a
              equipamentos industriais.
            </p>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs font-medium text-[rgba(250,250,250,0.5)] mb-3">
                RECEBA NOVIDADES
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="bg-[#2f2e30] border border-[rgba(250,250,250,0.2)] rounded-md px-4 py-2.5 text-sm text-[#fafafa] placeholder:text-[rgba(250,250,250,0.3)] outline-none focus:border-[#db4444] transition-colors w-full max-w-[200px]"
                />
                <button className="bg-[#db4444] hover:bg-[#e07575] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors shrink-0">
                  Enviar
                </button>
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Categorias</h3>
            <ul className="space-y-3">
              {[
                { label: 'Limpeza', href: '/categorias/limpeza' },
                { label: 'Cozinha', href: '/categorias/cozinha' },
                { label: 'Refrigeração', href: '/categorias/refrigeracao' },
                { label: 'Lavagem', href: '/categorias/lavagem' },
                { label: 'Utensílios', href: '/categorias/utensilios' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[rgba(250,250,250,0.7)] hover:text-[#db4444] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Institucional</h3>
            <ul className="space-y-3">
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
                    className="text-sm text-[rgba(250,250,250,0.7)] hover:text-[#db4444] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Atendimento */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Atendimento</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-[rgba(250,250,250,0.7)]">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-[#db4444]"
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
              <li className="flex items-start gap-2 text-sm text-[rgba(250,250,250,0.7)]">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-[#db4444]"
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
              <li className="flex items-start gap-2 text-sm text-[rgba(250,250,250,0.7)]">
                <svg
                  className="h-4 w-4 mt-0.5 shrink-0 text-[#db4444]"
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

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[rgba(250,250,250,0.1)] text-center">
          <p className="text-xs text-[rgba(250,250,250,0.4)]">
            &copy; {new Date().getFullYear()} Guia de Suprimentos para
            Restaurantes. Todos os direitos reservados.
          </p>
          <Link
            href="/"
            className="inline-block mt-2 text-xs text-[rgba(250,250,250,0.4)] hover:text-[#db4444] transition-colors"
          >
            Ver design principal
          </Link>
        </div>
      </div>
    </footer>
  );
}
