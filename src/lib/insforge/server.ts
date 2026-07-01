import { cookies } from 'next/headers';
import { createServerClient } from '@insforge/sdk/ssr';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

export async function createInsForgeServerClient() {
  return createServerClient({
    baseUrl,
    anonKey,
    cookies: await cookies(),
  });
}
