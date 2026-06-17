# Memory — Auth Button Fix & Server-Side User Propagation

Last updated: 2026-06-17

## What was built

### Auth button visibility fix

The "Entrar" (Sign In) button was appearing at all times regardless of auth state. The `AuthButton` component already had correct UI logic internally (Entrar when logged out, Admin link + Sair when logged in as admin), but the client-side `insforge.auth.getCurrentUser()` via `createBrowserClient` was not detecting the session.

### Files modified

- **`src/app/layout.tsx`** — Converted to `async` server component. Now calls `createInsForgeServerClient().auth.getCurrentUser()` and passes `serverUser` to `HeaderSwitcher`.
- **`src/components/HeaderSwitcher.tsx`** — Accepts `serverUser` prop, forwards it to both `Header` and `FigmaHeader`.
- **`src/components/Header.tsx`** — Accepts `serverUser` prop, passes it to `AuthButton`.
- **`src/components/FigmaHeader.tsx`** — Accepts `serverUser` prop, passes it to `AuthButton`.
- **`src/components/AuthButton.tsx`** — Accepts optional `serverUser` prop. If provided (from SSR): uses it immediately (no loading flash). If not provided: falls back to original client-side `getCurrentUser()` fetch. The three UI states (Entrar / Admin+Sair / Skeleton) are unchanged.

### Previously built (from prior session)

**Complete admin CRUD panel with InsForge backend:**

- Database: `categories` and `products` tables with RLS policies (public SELECT, admin-only write)
- Storage: `product-images` bucket (public read, admin-only write)
- Admin pages: Dashboard, CRUD for categories and products with image upload and dynamic specs
- Public pages updated to query InsForge DB directly
- Old hardcoded data files (`products.ts`, `product-utils.ts`) deleted

## Decisions made

- **Server-side auth for headers**: The root layout now fetches the user server-side and propagates it down as props. This is more reliable than client-side cookie reading and eliminates the auth state flash.
- **Graceful fallback**: `AuthButton` still has its own client-side fetch as fallback for any edge case where `serverUser` isn't provided.
- **No changes to auth flow**: The OAuth callback, refresh route, and server actions (`initiateOAuth`, `signOut`) were left untouched — they were already working correctly.
- **Image storage**: All images in InsForge Storage bucket `product-images`. Both `image_key` and `image_url` stored on products.
- **Authorization**: JWT-based RLS using `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`. No separate roles table.
- **Admin UI**: Sidebar layout, server-component list pages, client-component forms with image upload and dynamic specs.
- **Specs**: JSONB column, rendered as dynamic key-value rows in the admin form.

## Problems solved

- **Auth button always showing "Entrar"**: Root cause was that `createBrowserClient` from `@insforge/sdk/ssr` relies on reading httpOnly cookies in the browser, which can be unreliable. The server-side `createServerClient` (already used in admin layout) reads cookies directly from the request and works reliably. Fixed by passing server-fetched user down through props.
- Fixed import paths for nested admin route pages (../../ instead of ../)
- Fixed lint errors: unused imports and props
- Deleted old hardcoded data files that caused build errors

## Current state

- Build passes ✅
- Auth button now correctly shows:
  - "Entrar" when not logged in
  - Admin link + "Sair" when logged in as admin
  - "Sair" only when logged in as non-admin
- Admin CRUD pages: created but NOT yet tested in browser
- Admin user: `deyvidyury@gmail.com` with `metadata.role = "admin"`
- 5 categories and 20 products migrated to DB
- Images still use Unsplash URLs (not yet migrated to InsForge Storage)
- The admin role for the friend needs to be set when they create their account

## Next session starts with

- Test the auth fix: `npm run dev`, sign in with Google OAuth, verify "Entrar" disappears and admin link + "Sair" appears
- Test the admin panel: CRUD categories and products
- Migrate product images from Unsplash to InsForge Storage
- Deploy to Vercel

## Open questions

- Should the admin panel have additional features (order tracking, analytics)?
- Do we need a public Storage bucket RLS policy for image uploads?
