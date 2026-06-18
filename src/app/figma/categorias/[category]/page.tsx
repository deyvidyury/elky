import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { getCategories } from '@/lib/data';
import { FigmaProductCard } from '@/components/FigmaProductCard';

/** Red bar + label used as section eyebrow */
function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-10 w-5 rounded-[2px] bg-[#db4444]" />
      <span className="text-sm font-semibold text-[#db4444]">{label}</span>
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

export default async function FigmaCategoriaPage({
  params,
}: CategoryPageProps) {
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

  const allCategories = await getCategories();

  return (
    <div className="mx-auto max-w-[1170px] px-4 py-16 sm:px-6">
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
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">{c.name}</span>
      </nav>

      {/* Header */}
      <SectionEyebrow label="Categoria" />
      <div className="flex items-center gap-5 mt-6 mb-10">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[4px] bg-[#f5f5f5] text-4xl">
          {c.icon}
        </div>
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            {c.name}
          </h1>
          <p className="mt-2 text-sm text-[rgba(0,0,0,0.5)] max-w-xl">
            {c.description}
          </p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/figma/produtos"
          className="rounded-[4px] border border-[rgba(0,0,0,0.2)] px-5 py-2.5 text-sm font-medium text-[#2f2e30] hover:border-[#db4444] hover:text-[#db4444] transition-colors"
        >
          Todos
        </Link>
        {allCategories.map((catItem) => (
          <Link
            key={catItem.slug}
            href={`/categorias/${catItem.slug}`}
            className={`rounded-[4px] px-5 py-2.5 text-sm font-medium transition-colors ${
              catItem.slug === category
                ? 'bg-[#db4444] text-white hover:bg-[#e07575]'
                : 'border border-[rgba(0,0,0,0.2)] text-[#2f2e30] hover:border-[#db4444] hover:text-[#db4444]'
            }`}
          >
            {catItem.icon} {catItem.name}
          </Link>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <FigmaProductCard
            key={product.slug}
            product={product}
            discountPercent={15}
            rating={4.5}
            reviewCount={88}
          />
        ))}
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-[rgba(0,0,0,0.5)]">
            Nenhum produto encontrado nesta categoria.
          </p>
          <Link
            href="/figma/produtos"
            className="inline-block mt-4 text-sm font-medium text-[#db4444] hover:text-[#e07575] transition-colors"
          >
            Ver todos os produtos
          </Link>
        </div>
      )}
    </div>
  );
}
