import { createInsForgeServerClient } from '@/lib/insforge/server';
import Link from 'next/link';

export default async function AdminPage() {
  const insforge = await createInsForgeServerClient();

  const { count: productCount } = await insforge.database
    .from('products')
    .select('*', { count: 'exact', head: true });

  const { count: categoryCount } = await insforge.database
    .from('categories')
    .select('*', { count: 'exact', head: true });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/produtos"
          className="rounded-xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {productCount ?? 0}
              </p>
              <p className="text-sm text-gray-500">Produtos</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/categorias"
          className="rounded-xl border border-gray-200 bg-white p-6 hover:border-brand-300 hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100 text-accent-700">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">
                {categoryCount ?? 0}
              </p>
              <p className="text-sm text-gray-500">Categorias</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
