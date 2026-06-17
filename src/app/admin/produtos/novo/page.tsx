import { createInsForgeServerClient } from '@/lib/insforge/server';
import { ProductForm } from '../ProductForm';

export default async function NewProductPage() {
  const insforge = await createInsForgeServerClient();
  const { data: categories } = await insforge.database
    .from('categories')
    .select('id, name')
    .order('name');

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Novo Produto
      </h1>
      <ProductForm
        mode="create"
        categories={(categories as Array<{ id: string; name: string }>) ?? []}
      />
    </div>
  );
}
