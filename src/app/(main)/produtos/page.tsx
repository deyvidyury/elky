import type { Metadata } from 'next';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import type { Category } from '@/lib/categories';
import { ProductCard } from '@/components/ProductCard';
import { AdUnit } from '@/components/AdUnit';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Todos os Produtos',
  description:
    'Confira nossa lista completa de suprimentos e equipamentos para restaurantes: limpeza, cozinha, refrigeração, lavagem e utensílios.',
};

export default async function ProdutosPage() {
  const insforge = await createInsForgeServerClient();

  const { data: allProducts } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .order('name');

  const { data: categories } = await insforge.database
    .from('categories')
    .select('*')
    .order('name');

  const products = (allProducts ?? []) as Array<{
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

  const allCategories = (categories ?? []) as Category[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-brand-700 transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-brand-700">Produtos</span>
      </nav>

      <div className="mb-10">
        <h1 className="font-display text-3xl font-bold text-gray-900 sm:text-4xl">
          Todos os Produtos
        </h1>
        <p className="mt-3 text-gray-500">
          {products.length} produtos para o seu restaurante — compare e escolha
          com confiança.
        </p>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/produtos"
          className="rounded-full bg-brand-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brand-800 transition-colors"
        >
          Todos
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:border-brand-300 hover:text-brand-700 transition-colors"
          >
            {cat.icon} {cat.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      {/* Ad after every ~4 products */}
      <div className="mt-8">
        <AdUnit slot="produtos-listing-1" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(4, 8).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <div className="mt-8">
        <AdUnit slot="produtos-listing-2" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.slice(8).map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
