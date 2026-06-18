import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com o Guia de Suprimentos para Restaurantes. Dúvidas, sugestões ou parcerias — estamos aqui para ajudar.',
};

export default function FigmaContatoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-[rgba(0,0,0,0.5)]">
        <Link href="/figma" className="hover:text-[#db4444] transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">Contato</span>
      </nav>

      <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
        Contato
      </h1>
      <p className="mt-4 text-[rgba(0,0,0,0.5)]">
        Tem alguma dúvida, sugestão ou interesse em anunciar? Fale conosco!
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact Form */}
        <section className="lg:col-span-3 rounded-[4px] border border-[rgba(0,0,0,0.1)] bg-white p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#db4444]/10 text-[#db4444]">
              <svg
                className="h-5 w-5"
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
            </div>
            <div>
              <h2 className="text-lg font-semibold text-[#2f2e30]">
                Envie uma mensagem
              </h2>
              <p className="text-sm text-[rgba(0,0,0,0.5)]">
                Responderemos o mais rápido possível.
              </p>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-[#2f2e30]"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="mt-1.5 block w-full rounded-[4px] border border-[rgba(0,0,0,0.2)] px-4 py-3 text-[#2f2e30] placeholder:text-[rgba(0,0,0,0.3)] focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444]/20 focus:outline-none transition-shadow"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#2f2e30]"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1.5 block w-full rounded-[4px] border border-[rgba(0,0,0,0.2)] px-4 py-3 text-[#2f2e30] placeholder:text-[rgba(0,0,0,0.3)] focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444]/20 focus:outline-none transition-shadow"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="assunto"
                className="block text-sm font-medium text-[#2f2e30]"
              >
                Assunto
              </label>
              <select
                id="assunto"
                name="assunto"
                className="mt-1.5 block w-full rounded-[4px] border border-[rgba(0,0,0,0.2)] px-4 py-3 text-[#2f2e30] focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444]/20 focus:outline-none transition-shadow"
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre produtos</option>
                <option value="sugestao">Sugestão</option>
                <option value="parceria">Parceria ou publicidade</option>
                <option value="erro">Reportar erro</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="block text-sm font-medium text-[#2f2e30]"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                className="mt-1.5 block w-full rounded-[4px] border border-[rgba(0,0,0,0.2)] px-4 py-3 text-[#2f2e30] placeholder:text-[rgba(0,0,0,0.3)] focus:border-[#db4444] focus:ring-2 focus:ring-[#db4444]/20 focus:outline-none transition-shadow resize-y"
                placeholder="Escreva sua mensagem aqui..."
              />
            </div>

            <button
              type="submit"
              className="rounded-[4px] bg-[#db4444] hover:bg-[#e07575] text-white px-8 py-3 text-sm font-medium transition-colors"
            >
              Enviar Mensagem
            </button>
          </form>
        </section>

        {/* Contact Info Sidebar */}
        <aside className="lg:col-span-2 space-y-6">
          <div className="rounded-[4px] border border-[rgba(0,0,0,0.1)] bg-white p-6">
            <h3 className="text-lg font-semibold text-[#2f2e30] mb-4">
              Informações de Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#db4444]/10 text-[#db4444]">
                  <svg
                    className="h-4 w-4"
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
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2f2e30]">Telefone</p>
                  <p className="text-sm text-[rgba(0,0,0,0.5)]">
                    (11) 3000-0000
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#db4444]/10 text-[#db4444]">
                  <svg
                    className="h-4 w-4"
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
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2f2e30]">E-mail</p>
                  <p className="text-sm text-[rgba(0,0,0,0.5)]">
                    contato@guiadesuprimentos.com.br
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#db4444]/10 text-[#db4444]">
                  <svg
                    className="h-4 w-4"
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
                </div>
                <div>
                  <p className="text-sm font-medium text-[#2f2e30]">
                    Horário de Atendimento
                  </p>
                  <p className="text-sm text-[rgba(0,0,0,0.5)]">
                    Seg a Sex: 08h às 18h
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="rounded-[4px] bg-[#2f2e30] p-6">
            <h3 className="text-lg font-semibold text-[#fafafa] mb-2">
              Anuncie Conosco
            </h3>
            <p className="text-sm text-[rgba(250,250,250,0.7)]">
              Alcance donos de restaurantes e profissionais do setor de
              alimentação. Entre em contato para saber mais sobre nossas opções
              de publicidade.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
