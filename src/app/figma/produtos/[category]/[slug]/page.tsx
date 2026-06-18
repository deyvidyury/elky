import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProductsByCategory } from '@/lib/data';
import { FigmaProductCard } from '@/components/FigmaProductCard';

/** Format a "discounted" price for visual display */
function formatDiscountedPrice(price: string, discountPercent: number): string {
  const numeric = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
  if (isNaN(numeric)) return '';
  const original = numeric / (1 - discountPercent / 100);
  return `R$ ${original.toFixed(2).replace('.', ',')}`;
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

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: 'Produto não encontrado' };

  const desc = product.description.slice(0, 160);
  const imageUrl = product.image_url;

  return {
    title: `${product.name} — ${product.price}`,
    description: desc,
    openGraph: {
      title: product.name,
      description: desc,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function FigmaProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const categoryName = product.categories?.name ?? '';
  const categorySlug = product.categories?.slug ?? '';

  // Related products (same category, excluding current)
  const relatedProducts = await getProductsByCategory(product.category_id);
  const filtered = relatedProducts
    .filter((rp) => rp.id !== product.id)
    .slice(0, 4);

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image_url,
    offers: {
      '@type': 'Offer',
      price: product.price.replace(/\D/g, ''),
      priceCurrency: 'BRL',
    },
    category: categoryName,
  };

  return (
    <div className="mx-auto max-w-[1170px] px-4 py-16 sm:px-6">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
        {categorySlug && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/figma/categorias/${categorySlug}`}
              className="hover:text-figma-red transition-colors"
            >
              {categoryName}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="font-semibold text-figma-dark">{product.name}</span>
      </nav>

      {/* Product Detail — two columns */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center bg-figma-bg-secondary rounded-[4px] aspect-square">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full w-full object-contain p-8"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-figma-border/40">
              <svg
                className="h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          {product.featured && (
            <span className="inline-flex self-start rounded-[4px] bg-figma-red px-3 py-1 text-xs font-medium text-white mb-4">
              Destaque
            </span>
          )}

          <h1 className="text-3xl lg:text-4xl font-semibold text-figma-dark tracking-[0.04em]">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-figma-red">
              {product.price}
            </span>
            {product.price && (
              <span className="text-lg text-figma-price-original line-through">
                {formatDiscountedPrice(product.price, 10)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-figma-dark mb-3">
              Descrição
            </h2>
            <p className="text-sm text-figma-text-secondary leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Category */}
          {categoryName && (
            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm text-figma-text-muted">Categoria:</span>
              <Link
                href={`/figma/categorias/${categorySlug}`}
                className="text-sm font-medium text-figma-red hover:text-figma-red-hover transition-colors"
              >
                {categoryName}
              </Link>
            </div>
          )}

          {/* Supplier */}
          {product.supplier && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-figma-text-muted">Fornecedor:</span>
              <span className="text-sm font-medium text-figma-dark">
                {product.supplier}
              </span>
            </div>
          )}

          {/* Specs */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-figma-dark mb-4">
                Especificações
              </h2>
              <dl className="divide-y divide-figma-border border-t border-figma-border">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 text-sm">
                    <dt className="text-figma-text-muted">{key}</dt>
                    <dd className="font-medium text-figma-dark">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-[4px] bg-figma-red hover:bg-figma-red-hover text-white px-8 py-3 text-sm font-medium transition-colors">
              Solicitar Informações
            </button>
            <button className="rounded-[4px] border border-figma-border-strong hover:border-figma-red hover:text-figma-red text-figma-dark px-8 py-3 text-sm font-medium transition-colors">
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {filtered.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-5 rounded-[2px] bg-figma-red" />
            <span className="text-sm font-semibold text-figma-red">
              Relacionados
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-figma-dark tracking-[0.04em] mb-10">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((rp) => {
              const { rating, reviewCount } = ratingFromName(rp.name);
              return (
                <FigmaProductCard
                  key={rp.slug}
                  product={rp}
                  discountPercent={15}
                  rating={rating}
                  reviewCount={reviewCount}
                />
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
