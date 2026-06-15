import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { getFeaturedProducts } from '@/lib/product-utils';
import { ProductCard } from '@/components/ProductCard';
import { AdUnit } from '@/components/AdUnit';

const trustBadges = [
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Qualidade Garantida',
    description: 'Produtos selecionados das melhores marcas do mercado',
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
    title: 'Ampla Variedade',
    description: 'Todas as categorias para o seu restaurante em um só lugar',
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: 'Informação Rápida',
    description: 'Especificações detalhadas para você decidir com confiança',
  },
  {
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Melhor Custo-Benefício',
    description:
      'Compare preços e encontre as melhores opções para o seu negócio',
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero Section — inspired by Di Pratos professional layout */}
      <section className="relative bg-linear-to-br from-brand-900 via-brand-800 to-brand-700 text-white">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:py-28 lg:py-32 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="section-badge bg-accent-500/20 text-accent-300 border border-accent-500/30 mb-6">
              🍽️ Guia completo para restaurantes
            </span>
            <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Suprimentos para o seu{' '}
              <span className="text-accent-400">Restaurante</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed sm:text-xl">
              De papel toalha a equipamentos industriais — conheça os melhores
              produtos para manter seu restaurante funcionando com eficiência,
              economia e qualidade profissional.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/produtos"
                className="rounded-lg bg-accent-500 px-8 py-3.5 text-base font-semibold text-white hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/25"
              >
                Ver Todos os Produtos
              </Link>
              <Link
                href="#categorias"
                className="rounded-lg border-2 border-white/20 bg-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
              >
                Explorar Categorias
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar — inspired by Di Pratos */}
      <section className="relative -mt-10 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.title}
                className="group flex flex-col items-center rounded-xl bg-white p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl hover:border-brand-200 transition-all"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-brand-700 group-hover:bg-brand-100 group-hover:text-brand-800 transition-colors">
                  {badge.icon}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-gray-900">
                  {badge.title}
                </h3>
                <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categorias" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge mb-4">Categorias</span>
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Tudo que seu restaurante precisa
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              Navegue por nossas categorias e encontre exatamente o que precisa
              para manter seu estabelecimento funcionando com excelência.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorias/${cat.slug}`}
                className="group relative flex flex-col items-center rounded-2xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-3xl group-hover:bg-brand-100 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900 group-hover:text-brand-700 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-gray-500 text-center leading-relaxed line-clamp-3">
                  {cat.description}
                </p>
                <span className="mt-4 inline-flex items-center text-xs font-medium text-accent-600 group-hover:text-accent-700">
                  Ver produtos
                  <svg
                    className="ml-1 h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-badge mb-4">Destaques</span>
            <h2 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
              Produtos em Destaque
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500">
              Os itens mais procurados por donos de restaurantes, selecionados
              pela qualidade e custo-benefício.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          {/* Ad after first 3 featured products */}
          <div className="mt-8">
            <AdUnit slot="home-featured" />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(3).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/produtos"
              className="inline-flex items-center rounded-lg border-2 border-brand-700 bg-white px-8 py-3.5 text-base font-semibold text-brand-700 hover:bg-brand-700 hover:text-white transition-all"
            >
              Ver Mais Produtos
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-brand-900 text-white py-20 sm:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 20h40v1H0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="section-badge bg-accent-500/20 text-accent-300 border border-accent-500/30 mb-6">
            Comece Agora
          </span>
          <h2 className="font-display text-3xl font-bold sm:text-4xl lg:text-5xl">
            Pronto para equipar seu restaurante?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 leading-relaxed">
            Navegue por nossa seleção completa de suprimentos e equipamentos
            profissionais. Tudo que você precisa em um só lugar, com informações
            claras para a melhor decisão.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/produtos"
              className="rounded-lg bg-accent-500 px-10 py-4 text-base font-semibold text-white hover:bg-accent-400 transition-all shadow-lg shadow-accent-500/25"
            >
              Explorar Produtos
            </Link>
            <Link
              href="/contato"
              className="rounded-lg border-2 border-white/20 bg-white/10 px-10 py-4 text-base font-semibold text-white hover:bg-white/20 hover:border-white/30 transition-all backdrop-blur-sm"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
