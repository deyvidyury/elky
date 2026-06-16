# Memory — Google OAuth Authentication

Last updated: 2026-06-16

## What was built

**Google OAuth authentication** using InsForge's SSR auth pattern. Sign-in via Google, user state shown in header, placeholder admin page at `/admin`.

Files created this session:

- `.env.local` — InsForge URL, anon key
- `src/lib/insforge/client.ts` — `createBrowserClient()` for Client Components
- `src/lib/insforge/server.ts` — `createServerClient()` for Server Components/Route Handlers
- `src/lib/insforge/actions.ts` — Server Actions: `initiateOAuth('google')`, `signOut()`
- `src/app/api/auth/callback/route.ts` — OAuth callback: exchange code, set cookies, redirect to `/admin`
- `src/app/api/auth/refresh/route.ts` — `createRefreshAuthRouter()` for token refresh
- `src/app/(auth)/sign-in/page.tsx` — Sign-in page with Google button, Suspense boundary, error states
- `src/app/admin/page.tsx` — Admin placeholder showing user info + sign-out
- `src/app/admin/SignOutButton.tsx` — Client sign-out form calling server action
- `src/components/AuthButton.tsx` — Header widget: loading skeleton → signed-in avatar+name → "Entrar" button
- `insforge.toml` — InsForge project config with allowed redirect URLs

Files modified this session:

- `next.config.ts` — Removed `output: "export"` (auth needs server runtime); added `allowedDevOrigins` for mobile dev access
- `src/lib/insforge/actions.ts` — Replaced hardcoded `NEXT_PUBLIC_APP_URL` with dynamic `Host` header for redirect URLs
- `src/app/api/auth/callback/route.ts` — All redirects now use dynamic `Host` header instead of `request.url`
- `src/components/Header.tsx` — Added `<AuthButton />` in CTA row
- `src/components/FigmaHeader.tsx` — Added `<AuthButton />` in icon row
- `package.json` — Added `@insforge/sdk` dependency

## Decisions made

- **SSR auth pattern**: `@insforge/sdk/ssr` with `createBrowserClient` + `createServerClient` + refresh route + OAuth callback route.
- **Dedicated sign-in page**: `/sign-in` with Suspense boundary wrapping `useSearchParams` for error display.
- **Post-sign-in redirect**: Always to `/admin` (placeholder, ready for future content management area).
- **Shared AuthButton**: One component used in both `Header` and `FigmaHeader`, maintains dual-theme architecture.
- **InsForge handles OAuth provider**: Google OAuth already enabled on InsForge backend.
- **Dynamic redirect URLs via Host header**: Both `initiateOAuth` and callback route read the `Host` header from the request to build redirect URLs. This auto-adapts to any domain (localhost, LAN IP, production Vercel URL) without env vars. Also reads `x-forwarded-proto` for correct HTTP/HTTPS in production behind proxies.
- **No middleware**: Skipped due to Next.js 15 type incompatibility; refresh route alone handles session renewal.

## Problems solved

- **`useSearchParams` build error**: Wrapped sign-in page in `<Suspense>` boundary.
- **`user_metadata` vs `profile`**: InsForge user type uses `profile.name`, `profile.avatar_url`.
- **`output: "export"` conflict**: Static export blocks API routes; removed since hosting on Vercel.
- **`allowedRedirectUrls` requires full path**: Added `/api/auth/callback` path explicitly in `insforge.toml`.
- **Mobile/phone cannot access dev server**: Three issues fixed:
  1. `allowedDevOrigins` in `next.config.ts` doesn't support wildcards — used exact IPs with ports (`"192.168.100.4:3000"`)
  2. `NEXT_PUBLIC_APP_URL=http://localhost:3000` hardcoded redirects to localhost — replaced with dynamic `Host` header
  3. InsForge backend missing LAN IP in allowed redirect URLs — added via `insforge.toml` → `npx @insforge/cli config apply`
- **Phone OAuth callback redirecting to localhost/admin**: Fixed by making callback route use `Host` header for all 3 redirect paths (success → `/admin`, errors → `/sign-in`).

## Current state

- **Build**: ✅ Passes — 35/35 pages compiled
- **Auth flow**: ✅ Working end-to-end on both localhost and LAN IP (phone)
- **Header**: AuthButton shows loading skeleton, signed-in avatar, or "Entrar" button
- **Admin page**: Shows user info when signed in, "Acesso Restrito" with login link when not
- **Sign-out**: Server action clears cookies, redirects to `/`
- **Wi-Fi IP**: `192.168.100.4` — phone accesses via `http://192.168.100.4:3000`

## Next session starts with

1. Build the actual admin content management area (products, categories CRUD)
2. Add database tables + RLS policies for admin-only access
3. Test auth flow with production Vercel URL after deployment

## Open questions

- Should the admin area use InsForge database directly or a custom API layer?
- Should non-admin users see the "Entrar" button or be hidden entirely?
- If Wi-Fi IP changes, `next.config.ts` and `insforge.toml` need updating (or remove those entries for dev simplicity)
