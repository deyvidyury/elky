'use server';

import { cookies, headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createAuthActions } from '@insforge/sdk/ssr';
import { createInsForgeServerClient } from '@/lib/insforge/server';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

async function getOrigin(): Promise<string> {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = headersList.get('x-forwarded-proto') || 'http';
  return `${protocol}://${host}`;
}

export async function initiateOAuth(provider: string) {
  const cookieStore = await cookies();
  const auth = createAuthActions({
    baseUrl,
    anonKey,
    cookies: cookieStore,
  });

  const origin = await getOrigin();

  const { data, error } = await auth.signInWithOAuth(provider, {
    redirectTo: `${origin}/api/auth/callback`,
    skipBrowserRedirect: true,
  });

  if (error || !data.url || !data.codeVerifier) {
    throw new Error(error?.message ?? 'OAuth init failed');
  }

  cookieStore.set('insforge_code_verifier', data.codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  redirect(data.url);
}

export async function signOut() {
  const cookieStore = await cookies();
  const auth = createAuthActions({
    baseUrl,
    anonKey,
    cookies: cookieStore,
  });
  await auth.signOut();
  redirect('/');
}

export async function createProduct(payload: Record<string, unknown>) {
  const insforge = await createInsForgeServerClient();
  const { data, error } = await insforge.database
    .from('products')
    .insert([payload])
    .select();

  if (error) return { success: false, error: error.message };
  // ponytail: RLS can silently block writes — validate data was returned
  if (!data || data.length === 0) return { success: false, error: 'Permissão negada. Verifique se você está autenticado como administrador.' };

  revalidatePath('/admin/produtos');
  return { success: true };
}

export async function updateProduct(
  productId: string,
  payload: Record<string, unknown>,
) {
  const insforge = await createInsForgeServerClient();
  const { data, error } = await insforge.database
    .from('products')
    .update(payload)
    .eq('id', productId)
    .select();

  if (error) return { success: false, error: error.message };
  // ponytail: RLS can silently block writes — validate data was returned
  if (!data || data.length === 0) return { success: false, error: 'Permissão negada. Verifique se você está autenticado como administrador.' };

  revalidatePath('/admin/produtos');
  return { success: true };
}

export async function createCategory(payload: Record<string, unknown>) {
  const insforge = await createInsForgeServerClient();
  const { data, error } = await insforge.database
    .from('categories')
    .insert([payload])
    .select();

  if (error) return { success: false, error: error.message };
  // ponytail: RLS can silently block writes
  if (!data || data.length === 0) return { success: false, error: 'Permissão negada. Verifique se você está autenticado como administrador.' };

  revalidatePath('/admin/categorias');
  return { success: true };
}

export async function updateCategory(
  categoryId: string,
  payload: Record<string, unknown>,
) {
  const insforge = await createInsForgeServerClient();
  const { data, error } = await insforge.database
    .from('categories')
    .update(payload)
    .eq('id', categoryId)
    .select();

  if (error) return { success: false, error: error.message };
  // ponytail: RLS can silently block writes
  if (!data || data.length === 0) return { success: false, error: 'Permissão negada. Verifique se você está autenticado como administrador.' };

  revalidatePath('/admin/categorias');
  return { success: true };
}
