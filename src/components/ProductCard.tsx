import Link from 'next/link';
import type { Product } from '@/lib/categories';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const href = `/produtos/${product.category}/${product.slug}`;

  return (
    <Link
      href={href}
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden hover:border-brand-300 hover:shadow-xl transition-all hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-4/3 bg-gray-100 overflow-hidden">
        {/* Featured badge */}
        {product.featured && (
          <span className="absolute top-3 left-3 z-10 inline-flex items-center rounded-full bg-accent-500 px-2.5 py-0.5 text-xs font-semibold text-white shadow-sm">
            Destaque
          </span>
        )}
        {/* Category badge */}
        <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-xs font-medium text-gray-700 shadow-sm">
          {product.category}
        </span>

        {/* Fallback icon */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <svg
            className="h-16 w-16"
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
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Supplier */}
        {product.supplier && (
          <p className="text-xs font-medium text-brand-600 mb-1 uppercase tracking-wide">
            {product.supplier}
          </p>
        )}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-700 transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1 leading-relaxed">
          {product.description}
        </p>

        {/* Price — inspired by Rebal's dual pricing */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-baseline justify-between">
            <div>
              <p className="text-xs text-gray-400">A partir de</p>
              <span className="text-2xl font-bold text-brand-700">
                {product.price}
              </span>
            </div>
            <span className="inline-flex items-center justify-center rounded-full bg-brand-50 p-2 text-brand-600 group-hover:bg-brand-100 transition-colors">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
