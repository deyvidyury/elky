import Link from 'next/link';
import type { Product } from '@/lib/categories';

interface FigmaProductCardProps {
  product: Product;
  /** Show discount badge with percentage */
  discountPercent?: number;
  /** Show rating stars */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: full }).map((_, i) => (
        <svg
          key={`full-${i}`}
          className="h-[14px] w-[14px] text-[#ffad33]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalf && (
        <svg
          className="h-[14px] w-[14px] text-[#ffad33]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfStar)"
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
          />
        </svg>
      )}
      {Array.from({ length: empty }).map((_, i) => (
        <svg
          key={`empty-${i}`}
          className="h-[14px] w-[14px] text-[#D1D5DB]"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function FigmaProductCard({
  product,
  discountPercent,
  rating = 5,
  reviewCount = 88,
}: FigmaProductCardProps) {
  const href = `/produtos/${product.category}/${product.slug}`;
  const originalPrice = discountPercent
    ? `R$ ${(parseFloat(product.price.replace('R$ ', '').replace(',', '.')) / (1 - discountPercent / 100)).toFixed(2).replace('.', ',')}`
    : undefined;

  return (
    <div className="group flex flex-col gap-4">
      {/* Image container */}
      <div className="relative bg-[#f5f5f5] rounded-[4px] overflow-hidden aspect-square">
        {/* Discount badge */}
        {discountPercent && (
          <div className="absolute top-3 left-3 z-10 bg-[#db4444] text-[#fafafa] text-xs px-3 py-1 rounded-[4px]">
            -{discountPercent}%
          </div>
        )}

        {/* Wishlist + Quick view icons */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="flex items-center justify-center size-[34px] rounded-full bg-white hover:bg-[#db4444] hover:text-white text-[#2f2e30] transition-colors shadow-sm"
            aria-label="Adicionar aos favoritos"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            className="flex items-center justify-center size-[34px] rounded-full bg-white hover:bg-[#db4444] hover:text-white text-[#2f2e30] transition-colors shadow-sm"
            aria-label="Visualização rápida"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>

        {/* Product image */}
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 h-full w-full object-contain p-6 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        )}

        {/* Add to cart button — appears on hover */}
        <div className="absolute bottom-0 inset-x-0 bg-black text-white text-center py-2.5 text-sm font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-200 cursor-pointer">
          Adicionar ao Carrinho
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <Link
          href={href}
          className="text-sm font-medium text-[#2f2e30] line-clamp-1 hover:text-[#db4444] transition-colors"
        >
          {product.name}
        </Link>

        {/* Price row */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-[#db4444]">
            {product.price}
          </span>
          {originalPrice && (
            <span className="text-sm text-[rgba(0,0,0,0.5)] line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <Stars rating={rating} />
          <span className="text-xs font-semibold text-[rgba(0,0,0,0.5)]">
            ({reviewCount})
          </span>
        </div>
      </div>
    </div>
  );
}
