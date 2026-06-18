import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Saiba mais sobre o Guia de Suprimentos para Restaurantes — sua fonte de informação sobre equipamentos e materiais para o dia a dia do seu negócio.',
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Sobre', href: '#' },
        ]}
      />

      <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
        Sobre o Guia de Suprimentos
      </h1>

      <div className="mt-8 space-y-6 leading-relaxed text-gray-600">
        <p>
          Bem-vindo ao{' '}
          <strong className="text-brand-700">
            Guia de Suprimentos para Restaurantes
          </strong>
          ! Somos um portal independente dedicado a ajudar donos de
          restaurantes, chefs, gerentes e empreendedores do setor de alimentação
          a encontrar os melhores produtos e equipamentos para o dia a dia do
          seu negócio.
        </p>

        <div className="rounded-xl border border-brand-200 bg-linear-to-r from-brand-50 to-white p-6">
          <h2 className="text-xl font-semibold text-brand-800 flex items-center gap-2">
            <svg
              className="h-6 w-6 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Nossa Missão
          </h2>
          <p className="mt-3">
            Nosso objetivo é simples: reunir em um só lugar informações claras,
            atualizadas e úteis sobre todos os tipos de suprimentos que um
            restaurante precisa — desde itens básicos de limpeza, como papel
            toalha e sacos de lixo, até equipamentos industriais como
            lava-louças e máquinas de gelo.
          </p>
          <p className="mt-3">
            Acreditamos que a informação de qualidade ajuda os donos de
            restaurantes a tomar decisões melhores, economizar dinheiro e manter
            seus estabelecimentos funcionando com eficiência máxima.
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-900">
          O Que Oferecemos
        </h2>
        <ul className="list-disc pl-6 space-y-3">
          {[
            {
              title: 'Catálogo de produtos',
              desc: 'Imagens, descrições detalhadas e preços de referência de suprimentos e equipamentos para restaurantes.',
            },
            {
              title: 'Organização por categorias',
              desc: 'Limpeza, Cozinha, Refrigeração, Lavagem e Utensílios — encontre rapidamente o que precisa.',
            },
            {
              title: 'Especificações técnicas',
              desc: 'Informações detalhadas sobre cada produto para ajudar na comparação e escolha.',
            },
            {
              title: 'Conteúdo em português',
              desc: 'Todo o conteúdo é produzido em português do Brasil, pensado para o mercado brasileiro.',
            },
          ].map((item) => (
            <li key={item.title}>
              <strong className="text-gray-900">{item.title}:</strong>{' '}
              {item.desc}
            </li>
          ))}
        </ul>

        <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <svg
              className="h-6 w-6 text-brand-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Como Mantemos o Site
          </h2>
          <p className="mt-3">
            Este site é financiado por anúncios do Google AdSense. Isso
            significa que você pode ver anúncios enquanto navega pelas páginas.
            Esses anúncios nos ajudam a manter o site no ar, sempre com conteúdo
            gratuito e de qualidade para você.
          </p>
          <p className="mt-3">
            Nosso compromisso é com a transparência: todos os anúncios são
            claramente identificados, e não coletamos nenhuma informação pessoal
            além do que é estritamente necessário para o funcionamento dos
            anúncios (como cookies de publicidade).
          </p>
        </div>

        <div className="rounded-xl bg-accent-50 border border-accent-200 p-6">
          <h2 className="text-xl font-semibold text-accent-800 flex items-center gap-2">
            <svg
              className="h-6 w-6 text-accent-600"
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
            Contato
          </h2>
          <p className="mt-3">
            Tem alguma dúvida, sugestão ou quer anunciar conosco? Acesse nossa{' '}
            <Link
              href="/contato"
              className="text-accent-700 hover:text-accent-800 underline font-medium"
            >
              página de contato
            </Link>{' '}
            e envie sua mensagem. Teremos prazer em responder!
          </p>
        </div>
      </div>
    </div>
  );
}
