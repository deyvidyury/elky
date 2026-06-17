import Link from 'next/link';
import { createInsForgeServerClient } from '@/lib/insforge/server';
import { DeleteCategoryButton } from './DeleteCategoryButton';

export default async function AdminCategoriesPage() {
  const insforge = await createInsForgeServerClient();
  const { data: categories } = await insforge.database
    .from('categories')
    .select('*')
    .order('name');

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Categorias
        </h1>
        <Link
          href="/admin/categorias/nova"
          className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Nova Categoria
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-x-auto">
        {categories && categories.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                  Ícone
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(
                categories as Array<{
                  id: string;
                  name: string;
                  slug: string;
                  icon: string;
                }>
              ).map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/50">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {cat.name}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                      {cat.slug}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg">{cat.icon}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/categorias/${cat.id}/editar`}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        Editar
                      </Link>
                      <DeleteCategoryButton
                        categoryId={cat.id}
                        categoryName={cat.name}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            Nenhuma categoria encontrada.
          </div>
        )}
      </div>
    </div>
  );
}
