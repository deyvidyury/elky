import { notFound } from 'next/navigation';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { CategoryForm } from '../../CategoryForm';

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const insforge = await createInsForgeServerClient();

  const { data: category } = await insforge.database
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Editar Categoria
      </h1>
      <CategoryForm
        mode="edit"
        category={
          category as {
            id: string;
            name: string;
            slug: string;
            description: string;
            icon: string;
          }
        }
      />
    </div>
  );
}
