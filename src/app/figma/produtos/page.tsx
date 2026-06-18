import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getAllProducts } from '@/lib/data';
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
      <nav className="mb-8 text-sm text-[rgba(0,0,0,0.5)]">
        <Link href="/figma" className="hover:text-[#db4444] transition-colors">
          Início
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-[#2f2e30]">Produtos</span>
      </nav>

      {/* Header */}
      <SectionEyebrow label="Catálogo" />
      <div className="flex items-end justify-between mt-6 mb-10">
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold text-[#2f2e30] tracking-[0.04em]">
            Todos os Produtos
          </h1>
          <p className="mt-2 text-sm text-[rgba(0,0,0,0.5)]">
            {products.length} produtos para o seu restaurante — compare e
            escolha com confiança.
          </p>
        </div>
      </div>

      {/* Category filter chips */}
      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/figma/produtos"
          className="rounded-[4px] bg-[#db4444] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#e07575] transition-colors"
        >
          Todos
        </Link>
        {allCategories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categorias/${cat.slug}`}
            className="rounded-[4px] border border-[rgba(0,0,0,0.2)] px-5 py-2.5 text-sm font-medium text-[#2f2e30] hover:border-[#db4444] hover:text-[#db4444] transition-colors"
          >
            {cat.icon} {cat.name}
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
            Nenhum produto encontrado.
          </p>
          <Link
            href="/figma"
            className="inline-block mt-4 text-sm font-medium text-[#db4444] hover:text-[#e07575] transition-colors"
          >
            Voltar ao início
          </Link>
        </div>
      )}
    </div>
  );
}
