'use server';

import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createAuthActions } from '@insforge/sdk/ssr';

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
