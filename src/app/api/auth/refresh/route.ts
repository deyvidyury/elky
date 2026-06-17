import { createRefreshAuthRouter } from '@insforge/sdk/ssr';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

export const { POST } = createRefreshAuthRouter({ baseUrl, anonKey });
