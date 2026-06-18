import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com o Guia de Suprimentos para Restaurantes. Dúvidas, sugestões ou parcerias — estamos aqui para ajudar.',
};

export default function ContatoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Contato', href: '#' },
        ]}
      />

      <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
        Contato
      </h1>
      <p className="mt-4 text-gray-500">
        Tem alguma dúvida, sugestão ou interesse em anunciar? Fale conosco!
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-5">
        {/* Contact Form */}
        <section className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
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
              <h2 className="text-lg font-semibold text-gray-900">
                Envie uma mensagem
              </h2>
              <p className="text-sm text-gray-500">
                Responderemos o mais rápido possível.
              </p>
            </div>
          </div>

          <form className="space-y-5">
            <div>
              <label
                htmlFor="nome"
                className="block text-sm font-medium text-gray-700"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                className="mt-1.5 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-shadow"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1.5 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-shadow"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label
                htmlFor="assunto"
                className="block text-sm font-medium text-gray-700"
              >
                Assunto
              </label>
              <select
                id="assunto"
                name="assunto"
                className="mt-1.5 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-shadow"
              >
                <option value="">Selecione um assunto</option>
                <option value="duvida">Dúvida sobre produtos</option>
                <option value="sugestao">Sugestão de conteúdo</option>
                <option value="parceria">Parceria ou anúncio</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mensagem"
                className="block text-sm font-medium text-gray-700"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={5}
                className="mt-1.5 block w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 focus:outline-none transition-shadow"
                placeholder="Escreva sua mensagem aqui..."
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-brand-700 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-all"
            >
              Enviar Mensagem
            </button>

            <p className="text-xs text-gray-400">
              * Este formulário é estático. Em uma versão futura, será integrado
              a um serviço de envio de e-mails.
            </p>
          </form>
        </section>

        {/* Contact Info Sidebar */}
        <section className="lg:col-span-2 space-y-4">
          <div className="rounded-2xl border border-brand-200 bg-linear-to-br from-brand-50 to-white p-6">
            <h2 className="text-lg font-semibold text-brand-800 flex items-center gap-2">
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
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              Informações de Contato
            </h2>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-brand-600 mt-0.5"
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
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-500">
                    contato@guiadesuprimentos.com.br
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 shrink-0 text-brand-600 mt-0.5"
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
                <div>
                  <p className="text-sm font-medium text-gray-900">Horário</p>
                  <p className="text-sm text-gray-500">Seg a Sex, 9h às 18h</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-accent-200 bg-linear-to-br from-accent-50 to-white p-6">
            <h2 className="text-lg font-semibold text-accent-800 flex items-center gap-2">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Parcerias
            </h2>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Tem interesse em anunciar no Guia de Suprimentos? Entre em contato
              conosco para conhecer nossas opções de parceria e divulgação.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
