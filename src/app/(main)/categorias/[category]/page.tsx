import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import { ProductCard } from '@/components/ProductCard';
import { AdUnit } from '@/components/AdUnit';
import Link from 'next/link';

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

export default async function CategoriaPage({ params }: CategoryPageProps) {
  const { category } = await params;

  const cat = await getCategoryBySlug(category);

  if (!cat) {
    notFound();
  }

  const products = await getProductsByCategory(cat.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-700 transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/produtos"
          className="hover:text-brand-700 transition-colors"
        >
          Produtos
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-brand-700">{cat.name}</span>
      </nav>

      <div className="flex items-center gap-5 mb-10">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-4xl">
          {cat.icon}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            {cat.name}
          </h1>
          <p className="mt-2 text-gray-500 max-w-xl">{cat.description}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-8">
        <span className="font-semibold text-brand-700">{products.length}</span>{' '}
        produto{products.length !== 1 ? 's' : ''} encontrado
        {products.length !== 1 ? 's' : ''} nesta categoria.
      </p>

      {/* Product Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {products.length > 4 && (
            <>
              <div className="mt-8">
                <AdUnit slot={`categoria-${cat.slug}`} />
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.slice(4).map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-16 text-center">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium text-gray-600">
            Nenhum produto nesta categoria ainda.
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Estamos trabalhando para trazer mais produtos. Volte em breve!
          </p>
          <Link
            href="/produtos"
            className="mt-6 inline-flex items-center rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </div>
  );
}
