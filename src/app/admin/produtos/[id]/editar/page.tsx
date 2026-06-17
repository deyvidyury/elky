import { notFound } from 'next/navigation';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { ProductForm } from '../../ProductForm';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insforge = await createInsForgeServerClient();

  const { data: product } = await insforge.database
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (!product) {
    notFound();
  }

  const { data: categories } = await insforge.database
    .from('categories')
    .select('id, name')
    .order('name');

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Editar Produto
      </h1>
      <ProductForm
        mode="edit"
        categories={(categories as Array<{ id: string; name: string }>) ?? []}
        product={
          product as {
            id: string;
            name: string;
            slug: string;
            category_id: string;
            price: string;
            description: string;
            image_key: string;
            image_url: string;
            specs: Record<string, string>;
            supplier: string | null;
            featured: boolean;
          }
        }
      />
    </div>
  );
}
