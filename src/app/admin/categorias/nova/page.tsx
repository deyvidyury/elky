import { CategoryForm } from '../CategoryForm';

export default function NewCategoryPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Nova Categoria
      </h1>
      <CategoryForm mode="create" />
    </div>
  );
}
