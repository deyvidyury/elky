import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { FigmaProductCard } from '@/components/FigmaProductCard';

interface ProductPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const insforge = await createInsForgeServerClient();

  const { data: product } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .single();

  if (!product) return { title: 'Produto não encontrado' };

  const p = product as Record<string, unknown>;
  const desc = String(p.description ?? '').slice(0, 160);
  const imageUrl = String(p.image_url ?? '');

  return {
    title: `${p.name} — ${p.price}`,
    description: desc,
    openGraph: {
      title: String(p.name),
      description: desc,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function FigmaProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const insforge = await createInsForgeServerClient();

  const { data: product } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .single();

  if (!product) {
    notFound();
  }

  const p = product as {
    id: string;
    slug: string;
    name: string;
    category_id: string;
    price: string;
    image_url: string;
    image_key: string;
    description: string;
    specs: Record<string, string>;
    supplier: string | null;
    featured: boolean;
    categories: { id: string; name: string; slug: string } | null;
  };

  const categoryName = p.categories?.name ?? '';
  const categorySlug = p.categories?.slug ?? '';

  // Related products (same category, excluding current)
  const { data: related } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('category_id', p.category_id)
    .neq('id', p.id)
    .limit(4)
    .order('name');

  const relatedProducts = (related ?? []) as (typeof p)[];

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: p.description,
    image: p.image_url,
    offers: {
      '@type': 'Offer',
      price: p.price.replace(/\D/g, ''),
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
      <nav className="mb-8 text-sm text-[rgba(0,0,0,0.5)]">
        <Link href="/figma" className="hover:text-[#db4444] transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/figma/produtos"
          className="hover:text-[#db4444] transition-colors"
        >
          Produtos
        </Link>
        {categorySlug && (
          <>
            <span className="mx-2">/</span>
            <Link
              href={`/categorias/${categorySlug}`}
              className="hover:text-[#db4444] transition-colors"
            >
              {categoryName}
            </Link>
          </>
        )}
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">{p.name}</span>
      </nav>

      {/* Product Detail — two columns */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="flex items-center justify-center bg-[#f5f5f5] rounded-[4px] aspect-square">
          {p.image_url ? (
            <img
              src={p.image_url}
              alt={p.name}
              className="h-full w-full object-contain p-8"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-[rgba(0,0,0,0.2)]">
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
          {p.featured && (
            <span className="inline-flex self-start rounded-[4px] bg-[#db4444] px-3 py-1 text-xs font-medium text-white mb-4">
              Destaque
            </span>
          )}

          <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            {p.name}
          </h1>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-3xl font-semibold text-[#db4444]">
              {p.price}
            </span>
            {p.price && (
              <span className="text-lg text-[rgba(0,0,0,0.4)] line-through">
                {formatDiscountedPrice(p.price, 10)}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-[#2f2e30] mb-3">
              Descrição
            </h2>
            <p className="text-sm text-[rgba(0,0,0,0.6)] leading-relaxed">
              {p.description}
            </p>
          </div>

          {/* Category */}
          {categoryName && (
            <div className="mt-6 flex items-center gap-2">
              <span className="text-sm text-[rgba(0,0,0,0.5)]">Categoria:</span>
              <Link
                href={`/categorias/${categorySlug}`}
                className="text-sm font-medium text-[#db4444] hover:text-[#e07575] transition-colors"
              >
                {categoryName}
              </Link>
            </div>
          )}

          {/* Supplier */}
          {p.supplier && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-sm text-[rgba(0,0,0,0.5)]">
                Fornecedor:
              </span>
              <span className="text-sm font-medium text-[#2f2e30]">
                {p.supplier}
              </span>
            </div>
          )}

          {/* Specs */}
          {p.specs && Object.keys(p.specs).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-[#2f2e30] mb-4">
                Especificações
              </h2>
              <dl className="divide-y divide-[rgba(0,0,0,0.1)] border-t border-[rgba(0,0,0,0.1)]">
                {Object.entries(p.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 text-sm">
                    <dt className="text-[rgba(0,0,0,0.5)]">{key}</dt>
                    <dd className="font-medium text-[#2f2e30]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-[4px] bg-[#db4444] hover:bg-[#e07575] text-white px-8 py-3 text-sm font-medium transition-colors">
              Solicitar Informações
            </button>
            <button className="rounded-[4px] border border-[rgba(0,0,0,0.2)] hover:border-[#db4444] hover:text-[#db4444] text-[#2f2e30] px-8 py-3 text-sm font-medium transition-colors">
              Adicionar aos Favoritos
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-10 w-5 rounded-[2px] bg-[#db4444]" />
            <span className="text-sm font-semibold text-[#db4444]">
              Relacionados
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-semibold text-[#2f2e30] tracking-[0.04em] mb-10">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rp) => (
              <FigmaProductCard
                key={rp.slug}
                product={rp}
                discountPercent={15}
                rating={4.5}
                reviewCount={88}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/** Format a "discounted" price for visual display */
function formatDiscountedPrice(price: string, discountPercent: number): string {
  const numeric = parseFloat(price.replace(/[^\d,]/g, '').replace(',', '.'));
  if (isNaN(numeric)) return '';
  const original = numeric / (1 - discountPercent / 100);
  return `R$ ${original.toFixed(2).replace('.', ',')}`;
}
