import { products } from "./products";
import type { Product, CategorySlug } from "./categories";
import { getCategoryBySlug } from "./categories";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductBySlug(
  category: CategorySlug,
  slug: string
): Product | undefined {
  return products.find((p) => p.category === category && p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(
  product: Product,
  limit: number = 3
): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}

export function getCategoryName(categorySlug: CategorySlug): string {
  return getCategoryBySlug(categorySlug)?.name ?? categorySlug;
}
