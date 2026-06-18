import { createInsForgeServerClient } from '@/lib/insforge/server';
import type { Category, Product } from '@/lib/categories';

/**
 * Fetch all categories, ordered by name.
 * Used by both main and figma frontends.
 */
export async function getCategories(): Promise<Category[]> {
  const insforge = await createInsForgeServerClient();

  const { data, error } = await insforge.database
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    console.error('getCategories error:', error);
    return [];
  }

  return (data ?? []) as Category[];
}

/**
 * Fetch featured products with their joined category, limited by optional count.
 * Ordered by name.
 */
export async function getFeaturedProducts(limit?: number): Promise<Product[]> {
  const insforge = await createInsForgeServerClient();

  let query = insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('featured', true)
    .order('name');

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('getFeaturedProducts error:', error);
    return [];
  }

  return (data ?? []) as Product[];
}

/**
 * Fetch all products with their joined category, limited by optional count.
 * Ordered by name.
 */
export async function getAllProducts(limit?: number): Promise<Product[]> {
  const insforge = await createInsForgeServerClient();

  let query = insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .order('name');

  if (limit !== undefined) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('getAllProducts error:', error);
    return [];
  }

  return (data ?? []) as Product[];
}

/**
 * Fetch a single category by its slug.
 * Returns null if not found.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  const insforge = await createInsForgeServerClient();

  const { data, error } = await insforge.database
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('getCategoryBySlug error:', error);
    return null;
  }

  return (data ?? null) as Category | null;
}

/**
 * Fetch a single product by its slug, with joined category.
 * Returns null if not found.
 */
export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const insforge = await createInsForgeServerClient();

  const { data, error } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('getProductBySlug error:', error);
    return null;
  }

  return (data ?? null) as Product | null;
}

/**
 * Fetch all products in a given category, with joined category data.
 * Ordered by name.
 */
export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  const insforge = await createInsForgeServerClient();

  const { data, error } = await insforge.database
    .from('products')
    .select('*, categories(id, name, slug)')
    .eq('category_id', categoryId)
    .order('name');

  if (error) {
    console.error('getProductsByCategory error:', error);
    return [];
  }

  return (data ?? []) as Product[];
}
