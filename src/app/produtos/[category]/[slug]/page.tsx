import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { ProductCard } from '@/components/ProductCard';
import { AdUnit } from '@/components/AdUnit';
import { Breadcrumb } from '@/components/Breadcrumb';

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

export default async function ProductPage({ params }: ProductPageProps) {
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
    .limit(3)
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Início', href: '/' },
          { label: 'Produtos', href: '/produtos' },
          {
            label: categoryName,
            href: `/categorias/${categorySlug}`,
          },
          { label: p.name, href: '#' },
        ]}
      />

      {/* Product Layout */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
          {/* Fallback */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-300">
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
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
              />
            </svg>
          </div>
          {p.image_url && (
            <img
              src={p.image_url}
              alt={p.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          {/* Category badge */}
          <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
            {categoryName}
          </span>
        </div>

        {/* Details */}
        <div>
          {/* Supplier */}
          {p.supplier && (
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide mb-3">
              {p.supplier}
            </p>
          )}
          <h1 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl leading-tight">
            {p.name}
          </h1>

          {/* Price */}
          <div className="mt-6 rounded-2xl bg-brand-50 border border-brand-100 p-5">
            <p className="text-xs text-brand-600 font-medium uppercase tracking-wide">
              Preço de referência
            </p>
            <p className="mt-1 text-4xl font-extrabold text-brand-700">
              {p.price}
            </p>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <svg
                className="h-5 w-5 text-brand-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
              Descrição
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">
              {p.description}
            </p>
          </div>

          {/* Ad mid-content */}
          <div className="mt-6">
            <AdUnit slot="produto-detalhe" />
          </div>

          {/* Specifications */}
          {p.specs && Object.keys(p.specs).length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Especificações Técnicas
              </h2>
              <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    {Object.entries(p.specs).map(([key, value], i) => (
                      <tr
                        key={key}
                        className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                      >
                        <td className="px-5 py-3.5 font-medium text-gray-700 w-1/3">
                          {key}
                        </td>
                        <td className="px-5 py-3.5 text-gray-500">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Supplier info */}
          {p.supplier && (
            <div className="mt-8 rounded-xl border border-brand-200 bg-linear-to-r from-brand-50 to-white p-5 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-800">
                  Fornecedor
                </p>
                <p className="text-sm text-brand-600 mt-0.5">{p.supplier}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-20">
          <div className="text-center mb-10">
            <span className="section-badge mb-4">Relacionados</span>
            <h2 className="font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Produtos Relacionados
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </section>
      )}

      {/* Ad at bottom */}
      <div className="mt-16">
        <AdUnit slot="produto-detalhe-bottom" />
      </div>
    </div>
  );
}
