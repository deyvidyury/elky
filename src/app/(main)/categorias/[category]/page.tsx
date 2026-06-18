import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createInsForgeServerClient } from '@/lib/insforge/server';
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
  const insforge = await createInsForgeServerClient();

  const { data: cat } = await insforge.database
    .from('categories')
    .select('*')
    .eq('slug', category)
    .single();

  if (!cat) return { title: 'Categoria não encontrada' };

  return {
    title: `${(cat as { name: string }).name} — Suprimentos para Restaurantes`,
    description: (cat as { description: string }).description,
  };
}

export default async function CategoriaPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const insforge = await createInsForgeServerClient();

  const { data: cat } = await insforge.database
    .from('categories')
    .select('*')
    .eq('slug', category)
    .single();

  if (!cat) {
    notFound();
  }

  const c = cat as {
    id: string;
    slug: string;
    name: string;
    description: string;
    icon: string;
  };

  const { data: catProducts } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('category_id', c.id)
    .order('name');

  const products = (catProducts ?? []) as Array<{
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
  }>;

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
          {c.icon}
        </div>
        <div>
          <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
            {c.name}
          </h1>
          <p className="mt-2 text-gray-500 max-w-xl">{c.description}</p>
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
                <AdUnit slot={`categoria-${c.slug}`} />
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
