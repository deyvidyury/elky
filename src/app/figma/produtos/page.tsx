import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getAllProducts } from '@/lib/data';
import { FigmaProductCard } from '@/components/FigmaProductCard';

/** Red bar + label used as section eyebrow */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-5 rounded-[2px] bg-figma-red" />
      <span className="text-sm font-semibold text-figma-red">{label}</span>
    </div>
  );
}

/** Deterministic pseudo-random rating based on product name */
function ratingFromName(name: string): { rating: number; reviewCount: number } {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  const rating = 3.5 + Math.abs(hash % 16) / 10;
  const reviewCount = 10 + Math.abs(hash % 191);
  return { rating: Math.round(rating * 10) / 10, reviewCount };
}

export const metadata: Metadata = {
  title: 'Todos os Produtos',
  description:
    'Confira nossa lista completa de suprimentos e equipamentos para restaurantes: limpeza, cozinha, refrigeração, lavagem e utensílios.',
};

export default async function FigmaProdutosPage() {
  const allCategories = await getCategories();
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-[1170px] px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-figma-text-muted">
        <Link href="/figma" className="hover:text-figma-red transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-figma-dark">Produtos</span>
      </nav>

      {/* Header */}
      <SectionEyebrow label="Catálogo" />
      <div className="flex items-end justify-between mt-6 mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-figma-dark tracking-[0.04em]">
            Todos os Produtos
          </h1>
          <p className="mt-2 text-sm text-figma-text-muted">
            {products.length} produtos para o seu restaurante — compare e
            escolha com confiança.
          </p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/figma/produtos"
          className="rounded-[4px] bg-figma-red px-5 py-2.5 text-sm font-medium text-white hover:bg-figma-red-hover transition-colors"
        >
          Todos
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/figma/categorias/${cat.slug}`}
            className="rounded-[4px] border border-figma-border-strong px-5 py-2.5 text-sm font-medium text-figma-dark hover:border-figma-red hover:text-figma-red transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const { rating, reviewCount } = ratingFromName(product.name);
          return (
            <FigmaProductCard
              key={product.slug}
              product={product}
              discountPercent={15}
              rating={rating}
              reviewCount={reviewCount}
            />
          );
        })}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-figma-text-muted">
            Nenhum produto encontrado.
          </p>
          <Link
            href="/figma"
            className="inline-block mt-4 text-sm font-medium text-figma-red hover:text-figma-red-hover transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      )}
    </div>
  );
}
