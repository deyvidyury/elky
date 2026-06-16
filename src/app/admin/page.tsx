import { createInsForgeServerClient } from '@/lib/insforge/server';
import { SignOutButton } from './SignOutButton';

export default async function AdminPage() {
  const insforge = await createInsForgeServerClient();
  const { data } = await insforge.auth.getCurrentUser();
  const user = data?.user ?? null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 sm:py-28">
      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        {user ? (
          <>
            <div className="flex items-center gap-4 mb-6">
              {user.profile?.avatar_url ? (
                <img
                  src={user.profile.avatar_url}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold text-lg">
                  {user.email?.charAt(0).toUpperCase() ?? '?'}
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">
                  {user.profile?.name ?? user.email}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">
              Painel Administrativo
            </h1>
            <p className="text-gray-500 mb-8">
              O painel de gerenciamento de conteúdo será implementado em breve.
              Aqui você poderá gerenciar produtos, categorias e páginas do site.
            </p>

            <SignOutButton />
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">
              Acesso Restrito
            </h1>
            <p className="text-gray-500 mb-8">
              Você precisa estar autenticado para acessar o painel
              administrativo.
            </p>
            <a
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-500 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-600 transition-colors shadow-sm"
            >
              Fazer Login
            </a>
          </>
        )}
      </div>
    </div>
  );
}
