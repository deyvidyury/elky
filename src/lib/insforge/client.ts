import { createBrowserClient } from '@insforge/sdk/ssr';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

export const insforge = createBrowserClient({ baseUrl, anonKey });
