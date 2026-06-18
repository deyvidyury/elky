import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Saiba mais sobre o Guia de Suprimentos para Restaurantes — sua fonte de informação sobre equipamentos e materiais para o dia a dia do seu negócio.',
};

export default function FigmaSobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Breadcrumb
        variant="figma"
        items={[
          { label: 'Início', href: '/figma' },
          { label: 'Sobre', href: '#' },
        ]}
      />

      <h1 className="text-3xl lg:text-4xl font-semibold text-figma-dark tracking-[0.04em]">
        Sobre o Guia de Suprimentos
      </h1>

      <div className="mt-8 space-y-6 leading-relaxed text-figma-text-secondary">
        <p>
          Bem-vindo ao{' '}
          <strong className="text-figma-dark">
            Guia de Suprimentos para Restaurantes
          </strong>
          ! Somos um portal independente dedicado a ajudar donos de
          restaurantes, chefs, gerentes e empreendedores do setor de alimentação
          a encontrar os melhores produtos e equipamentos para o dia a dia do
          seu negócio.
        </p>

        <div className="rounded-[4px] border border-figma-red/20 bg-figma-red/5 p-6">
          <h2 className="text-xl font-semibold text-figma-dark flex items-center gap-2">
            <svg
              className="h-6 w-6 text-figma-red"
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

        <h2 className="text-xl font-semibold text-figma-dark">
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
              <strong className="text-figma-dark">{item.title}:</strong>{' '}
              {item.desc}
            </li>
          ))}
        </ul>

        <div className="rounded-[4px] border border-figma-border bg-figma-bg-secondary p-6">
          <h2 className="text-xl font-semibold text-figma-dark flex items-center gap-2">
            <svg
              className="h-6 w-6 text-figma-red"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Quem Está Por Trás
          </h2>
          <p className="mt-3">
            Somos uma equipe apaixonada por gastronomia e tecnologia, unindo
            experiência no setor de food service com conhecimento em
            desenvolvimento web. Nosso compromisso é oferecer um guia confiável
            e sempre atualizado para quem vive o dia a dia de um restaurante.
          </p>
        </div>

        <div className="rounded-[4px] border border-figma-border bg-figma-bg-secondary p-6">
          <h2 className="text-xl font-semibold text-figma-dark flex items-center gap-2">
            <svg
              className="h-6 w-6 text-figma-red"
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
            Nosso Compromisso
          </h2>
          <ul className="mt-3 space-y-2">
            {[
              'Informações claras, objetivas e em português.',
              'Conteúdo atualizado regularmente.',
              'Sem viés comercial — não recebemos comissão de fabricantes.',
              'Transparência total sobre como o site é mantido.',
              'Respeito à privacidade dos visitantes (LGPD).',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <svg
                  className="h-5 w-5 mt-0.5 text-figma-red shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
