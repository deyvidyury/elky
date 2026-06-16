import Link from 'next/link';
import { CATEGORIES } from '@/lib/categories';
import { getFeaturedProducts, getAllProducts } from '@/lib/product-utils';
import { FigmaProductCard } from '@/components/FigmaProductCard';

/** Red bar + label used as section eyebrow (e.g., "Today's", "This Month") */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-5 rounded-[2px] bg-[#db4444]" />
      <span className="text-sm font-semibold text-[#db4444]">{label}</span>
    </div>
  );
}

/** Service badge used at bottom */
function ServiceBadge({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className="flex items-center justify-center size-[80px] rounded-full bg-[#2f2e30]">
        <div className="flex items-center justify-center size-[58px] rounded-full bg-black text-white">
          {icon}
        </div>
      </div>
      <h4 className="text-lg font-semibold text-[#2f2e30] mt-2">{title}</h4>
      <p className="text-xs text-[rgba(0,0,0,0.5)] max-w-[240px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

const services = [
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
          d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
        />
      </svg>
    ),
    title: 'Entrega Rápida',
    description: 'Entrega gratuita para pedidos acima de R$ 500',
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
          d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    title: 'Suporte 24/7',
    description: 'Atendimento ao cliente 24 horas, 7 dias por semana',
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
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'Garantia de Qualidade',
    description: 'Produtos selecionados com garantia de satisfação',
  },
];

export default function FigmaHomePage() {
  const featured = getFeaturedProducts();
  const allProducts = getAllProducts();

  return (
    <>
      {/* ============================================
          HERO SECTION — sidebar categories + main hero
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6">
        <div className="flex gap-0 pt-10 pb-20">
          {/* Left sidebar — categories */}
          <aside className="hidden lg:flex flex-col gap-4 w-[217px] shrink-0 pt-2 border-r border-[rgba(0,0,0,0.1)] pr-4">
            {[
              ...CATEGORIES.map((c) => ({
                label: c.name,
                href: `/categorias/${c.slug}`,
                hasSub: c.slug === 'cozinha' || c.slug === 'lavagem',
              })),
              { label: 'Todos os Produtos', href: '/produtos', hasSub: false },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between text-sm text-[#2f2e30] hover:text-[#db4444] transition-colors"
              >
                {item.label}
                {item.hasSub && (
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </Link>
            ))}
          </aside>

          {/* Main hero */}
          <div className="flex-1 lg:pl-12 flex items-center bg-[#2f2e30] rounded-[4px] overflow-hidden min-h-[344px]">
            <div className="flex-1 px-8 lg:px-16 py-12">
              {/* Apple-style logo placeholder */}
              <div className="flex items-center gap-4 mb-5">
                <div className="size-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <span className="text-white text-xl font-bold">🍽️</span>
                </div>
                <span className="text-sm text-[#fafafa]">
                  Equipamentos Profissionais
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-semibold text-[#fafafa] leading-tight tracking-[0.04em] max-w-[340px]">
                Até 10% off em Pedidos
              </h1>

              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 mt-8 text-sm font-medium text-[#fafafa] group"
              >
                <span className="relative">
                  Comprar Agora
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#fafafa] group-hover:bg-[#db4444] transition-colors" />
                </span>
                <svg
                  className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              {/* Dots indicator */}
              <div className="flex items-center gap-3 mt-12">
                {[true, false, false, false, false].map((active, i) => (
                  <span
                    key={i}
                    className={`size-3 rounded-full border-2 transition-colors ${
                      active
                        ? 'bg-[#db4444] border-[#db4444]'
                        : 'bg-transparent border-[rgba(250,250,250,0.5)]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Hero image placeholder */}
            <div className="hidden md:block w-[496px] shrink-0">
              <div className="aspect-square bg-[#1a1a1a] flex items-center justify-center">
                {featured[0]?.image ? (
                  <img
                    src={featured[0].image}
                    alt={featured[0].name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-white/20 text-9xl">🍳</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FLASH SALES
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 pb-20">
        <SectionEyebrow label="Hoje" />
        <div className="flex items-end justify-between mt-6 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            Promoções Relâmpago
          </h2>
          {/* Arrow buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product cards row */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {featured.slice(0, 5).map((product, i) => (
            <FigmaProductCard
              key={product.slug}
              product={product}
              discountPercent={[40, 35, 30, 25, 20][i]}
              rating={5 - (i % 2) * 0.5}
              reviewCount={[88, 75, 99, 65, 120][i]}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center h-[56px] px-12 bg-[#db4444] hover:bg-[#e07575] text-white text-sm font-medium rounded-[4px] transition-colors"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[1170px] px-4 sm:px-6">
        <hr className="border-[rgba(0,0,0,0.1)]" />
      </div>

      {/* ============================================
          BROWSE BY CATEGORY
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 py-20">
        <SectionEyebrow label="Categorias" />
        <div className="flex items-end justify-between mt-6 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            Navegue por Categoria
          </h2>
          <div className="hidden sm:flex items-center gap-2">
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categorias/${cat.slug}`}
              className="flex flex-col items-center justify-center gap-4 border border-[rgba(0,0,0,0.1)] rounded-[4px] py-8 hover:bg-[#db4444] hover:text-white hover:border-[#db4444] transition-all group"
            >
              <span className="text-4xl group-hover:scale-110 transition-transform">
                {cat.icon}
              </span>
              <span className="text-sm font-medium text-center">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-[1170px] px-4 sm:px-6">
        <hr className="border-[rgba(0,0,0,0.1)]" />
      </div>

      {/* ============================================
          BEST SELLING PRODUCTS
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 py-20">
        <SectionEyebrow label="Este Mês" />
        <div className="flex items-end justify-between mt-6 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            Produtos Mais Vendidos
          </h2>
          <Link
            href="/produtos"
            className="hidden sm:inline-flex items-center justify-center h-[56px] px-12 bg-[#db4444] hover:bg-[#e07575] text-white text-sm font-medium rounded-[4px] transition-colors"
          >
            Ver Todos
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts.slice(0, 4).map((product, i) => (
            <FigmaProductCard
              key={product.slug}
              product={product}
              rating={4.5 + (i % 2) * 0.5}
              reviewCount={[65, 92, 78, 55][i]}
            />
          ))}
        </div>

        {/* Mobile "View All" */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center h-[56px] px-12 bg-[#db4444] hover:bg-[#e07575] text-white text-sm font-medium rounded-[4px] transition-colors"
          >
            Ver Todos
          </Link>
        </div>
      </section>

      {/* ============================================
          PROMO BANNER — dark background
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 pb-20">
        <div className="bg-[#2f2e30] rounded-[4px] overflow-hidden flex flex-col lg:flex-row items-center min-h-[500px]">
          {/* Text side */}
          <div className="flex-1 px-8 lg:px-16 py-16">
            <span className="text-sm font-medium text-[#00ff66]">
              Categorias
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-[#fafafa] leading-tight mt-8 max-w-[460px]">
              Equipe sua Cozinha com o Melhor
            </h2>
            <p className="text-sm text-[rgba(250,250,250,0.6)] mt-6 max-w-[400px] leading-relaxed">
              Fogões industriais, fritadeiras, chapas e bancadas de preparo.
              Tudo que você precisa para uma cozinha profissional de alto
              rendimento.
            </p>

            {/* Timer-style circles */}
            <div className="flex items-center gap-6 mt-8">
              {[
                { value: '23', label: 'Horas' },
                { value: '05', label: 'Dias' },
                { value: '59', label: 'Min' },
                { value: '35', label: 'Seg' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="size-[62px] rounded-full bg-white flex items-center justify-center">
                    <span className="text-lg font-bold text-[#2f2e30]">
                      {item.value}
                    </span>
                  </div>
                  <span className="text-[11px] text-[rgba(250,250,250,0.6)] mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/categorias/cozinha"
              className="inline-flex items-center justify-center h-[56px] px-12 bg-[#00ff66] hover:bg-[#00dd55] text-white text-sm font-medium rounded-[4px] mt-10 transition-colors"
            >
              Comprar Agora
            </Link>
          </div>

          {/* Image side */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative size-[330px] lg:size-[420px] rounded-full bg-[rgba(255,255,255,0.05)] flex items-center justify-center overflow-hidden">
              <span className="text-[160px] opacity-20">🍳</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          EXPLORE OUR PRODUCTS
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 pb-20">
        <SectionEyebrow label="Nossos Produtos" />
        <div className="flex items-end justify-between mt-6 mb-10">
          <h2 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            Explore Nossos Produtos
          </h2>
          <div className="hidden sm:flex items-center gap-2">
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button className="size-[46px] rounded-full bg-[#f5f5f5] hover:bg-[#db4444] hover:text-white text-[#2f2e30] flex items-center justify-center transition-colors">
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Product grid — 2 rows of 4 */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {allProducts.slice(0, 8).map((product, i) => (
            <FigmaProductCard
              key={product.slug}
              product={product}
              rating={4 + (i % 3) * 0.5}
              reviewCount={[55, 72, 88, 60, 95, 43, 67, 81][i]}
              discountPercent={i < 4 ? [25, 30, 20, 35][i] : undefined}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/produtos"
            className="inline-flex items-center justify-center h-[56px] px-12 bg-[#db4444] hover:bg-[#e07575] text-white text-sm font-medium rounded-[4px] transition-colors"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </section>

      {/* ============================================
          NEW ARRIVAL — featured showcase
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 pb-20">
        <SectionEyebrow label="Destaque" />
        <h2 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em] mt-6 mb-10">
          Novidades
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — large card */}
          <div className="bg-[#2f2e30] rounded-[4px] overflow-hidden relative min-h-[600px] flex flex-col justify-end p-8">
            {/* Product image placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              {allProducts[0]?.image ? (
                <img
                  src={allProducts[0].image}
                  alt=""
                  className="h-full w-full object-cover opacity-60"
                />
              ) : (
                <span className="text-[200px] opacity-15">🔪</span>
              )}
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-semibold text-[#fafafa]">
                {allProducts[0]?.name || 'Produto em Destaque'}
              </h3>
              <p className="text-sm text-[rgba(250,250,250,0.6)] mt-3 max-w-[300px] leading-relaxed">
                {allProducts[0]?.description ||
                  'Confira nossa seleção de produtos mais recentes.'}
              </p>
              <Link
                href={
                  allProducts[0]
                    ? `/produtos/${allProducts[0].category}/${allProducts[0].slug}`
                    : '/produtos'
                }
                className="inline-flex items-center gap-1 mt-6 text-sm font-medium text-[#fafafa] group"
              >
                <span className="relative">
                  Comprar Agora
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#fafafa] group-hover:bg-[#db4444] transition-colors" />
                </span>
              </Link>
            </div>
          </div>

          {/* Right — 2x2 grid */}
          <div className="grid grid-rows-2 gap-6">
            {/* Top right */}
            <div className="bg-[#2f2e30] rounded-[4px] overflow-hidden relative flex items-center p-8 min-h-[284px]">
              <div className="absolute right-0 top-0 bottom-0 w-[55%] flex items-center justify-center">
                {allProducts[1]?.image ? (
                  <img
                    src={allProducts[1].image}
                    alt=""
                    className="h-full w-full object-cover opacity-60"
                  />
                ) : (
                  <span className="text-[120px] opacity-15">🧹</span>
                )}
              </div>
              <div className="relative z-10 max-w-[55%]">
                <h3 className="text-2xl font-semibold text-[#fafafa]">
                  {allProducts[1]?.name || 'Coleções'}
                </h3>
                <p className="text-sm text-[rgba(250,250,250,0.6)] mt-2 leading-relaxed">
                  Produtos selecionados que trazem outro nível ao seu negócio.
                </p>
                <Link
                  href={
                    allProducts[1]
                      ? `/produtos/${allProducts[1].category}/${allProducts[1].slug}`
                      : '/produtos'
                  }
                  className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-[#fafafa] group"
                >
                  <span className="relative">
                    Comprar Agora
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#fafafa] group-hover:bg-[#db4444] transition-colors" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom 2 cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#2f2e30] rounded-[4px] overflow-hidden relative flex items-end p-6 min-h-[284px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[80px] opacity-15">❄️</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#fafafa]">
                    Refrigeração
                  </h3>
                  <p className="text-xs text-[rgba(250,250,250,0.6)] mt-1">
                    Freezers e câmaras frias
                  </p>
                  <Link
                    href="/categorias/refrigeracao"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#fafafa] group"
                  >
                    <span className="relative">
                      Ver Mais
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#fafafa] group-hover:bg-[#db4444] transition-colors" />
                    </span>
                  </Link>
                </div>
              </div>

              <div className="bg-[#2f2e30] rounded-[4px] overflow-hidden relative flex items-end p-6 min-h-[284px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[80px] opacity-15">🚿</span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#fafafa]">
                    Lavagem
                  </h3>
                  <p className="text-xs text-[rgba(250,250,250,0.6)] mt-1">
                    Lava-louças industrial
                  </p>
                  <Link
                    href="/categorias/lavagem"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-[#fafafa] group"
                  >
                    <span className="relative">
                      Ver Mais
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#fafafa] group-hover:bg-[#db4444] transition-colors" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES BAR
          ============================================ */}
      <section className="mx-auto max-w-[1170px] px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 py-16">
          {services.map((svc) => (
            <ServiceBadge key={svc.title} {...svc} />
          ))}
        </div>
      </section>
    </>
  );
}
