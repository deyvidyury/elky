import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from '@/lib/data';
import { FigmaProductCard } from '@/components/FigmaProductCard';

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

/** Red bar + label used as section eyebrow */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-5 rounded-[2px] bg-figma-red" />
      <span className="text-sm font-semibold text-figma-red">{label}</span>
    </div>
  );
}

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await getCategoryBySlug(category);

  if (!cat) return { title: 'Categoria não encontrada' };

  return {
    title: `${cat.name} — Suprimentos para Restaurantes`,
    description: cat.description,
  };
}

export default async function FigmaCategoriaPage({
  params,
}: CategoryPageProps) {
  const { category } = await params;

  const cat = await getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const products = await getProductsByCategory(cat.id);
  const allCategories = await getCategories();

  return (
    <div className="mx-auto max-w-[1170px] px-4 py-16 sm:px-6">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-figma-text-muted">
        <Link href="/figma" className="hover:text-figma-red transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/figma/produtos"
          className="hover:text-figma-red transition-colors"
        >
          Produtos
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-figma-dark">{cat.name}</span>
      </nav>

      {/* Header */}
      <SectionEyebrow label="Categoria" />
      <div className="flex items-center gap-5 mt-6 mb-10">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[4px] bg-figma-bg-secondary text-4xl">
          {cat.icon}
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-figma-dark tracking-[0.04em]">
            {cat.name}
          </h1>
          <p className="mt-2 text-sm text-figma-text-muted max-w-xl">
            {cat.description}
          </p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/figma/produtos"
          className="rounded-[4px] border border-figma-border-strong px-5 py-2.5 text-sm font-medium text-figma-dark hover:border-figma-red hover:text-figma-red transition-colors"
        >
          Todos
        </Link>
        {allCategories.map((catItem) => (
          <Link
            key={catItem.slug}
            href={`/figma/categorias/${catItem.slug}`}
            className={`rounded-[4px] px-5 py-2.5 text-sm font-medium transition-colors ${
              catItem.slug === category
                ? 'bg-figma-red text-white hover:bg-figma-red-hover'
                : 'border border-figma-border-strong text-figma-dark hover:border-figma-red hover:text-figma-red'
            }`}
          >
            {catItem.icon} {catItem.name}
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
            Nenhum produto encontrado nesta categoria.
          </p>
          <Link
            href="/figma/produtos"
            className="inline-block mt-4 text-sm font-medium text-figma-red hover:text-figma-red-hover transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </div>
  );
}
