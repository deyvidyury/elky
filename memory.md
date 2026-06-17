# Memory — Admin Mobile Responsiveness & Sidebar

Last updated: 2026-06-17

## What was built

### Admin mobile sidebar (new component)

- **`src/components/AdminSidebar.tsx`** — Client component replacing the inline sidebar in the admin layout. Mobile: fixed top bar with hamburger, sidebar slides in as overlay with backdrop. Auto-closes on route change, Escape key, or backdrop tap. Body scroll locked while open. Desktop: static sidebar unchanged. Active nav item highlighted.

### Layout refactor

- **`src/app/admin/layout.tsx`** — Stripped to server-side auth check only, delegates all UI to `AdminSidebar`. Fixed `isAdmin` to boolean (was `boolean | null`).
- **`src/components/HeaderSwitcher.tsx`** — Returns `null` on `/admin` routes so the main site header does not render on admin pages.
- **`src/components/FooterSwitcher.tsx`** — Returns `null` on `/admin` routes.

### Mobile fixes across the project

- **`src/components/AuthButton.tsx`** — Removed `hidden sm:` from the Admin link. Now visible on all screen sizes.
- **`src/app/admin/produtos/page.tsx`** — Table wrapper: `overflow-hidden` -> `overflow-x-auto` for horizontal scroll.
- **`src/app/admin/categorias/page.tsx`** — Same table fix.
- **`AGENTS.md`** — Updated Tailwind CSS guidance from v3.4 to v4 with `@tailwindcss/postcss`.

### Previously built (from prior sessions)

**Auth fix:** Root layout fetches user server-side via `createInsForgeServerClient()` and propagates `serverUser` through `HeaderSwitcher` -> `Header`/`FigmaHeader` -> `AuthButton`. Auth button no longer flashes wrong state.

**Complete admin CRUD panel with InsForge backend:**

- Database: `categories` and `products` tables with RLS policies (public SELECT, admin-only write)
- Storage: `product-images` bucket (public read, admin-only write)
- Admin pages: Dashboard, CRUD for categories and products with image upload and dynamic specs
- Public pages updated to query InsForge DB directly
- Old hardcoded data files deleted

## Decisions made

- **Server-side auth for headers**: Root layout fetches user server-side, propagates as props. More reliable than client-side cookie reading.
- **Admin sidebar as client component**: Uses `useState` for open/close, `usePathname` for route-aware auto-close.
- **Main header/footer hidden on admin routes**: Via pathname check in switchers returning `null` for `/admin*`. Cleaner than z-index hacks.
- **Sidebar animation**: `fixed` + `translate-x` transition on mobile, `static` on desktop. No layout shift.
- **Authorization**: JWT-based RLS using `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`.
- **Tailwind v4 confirmed**: Project uses Tailwind CSS v4 with `@tailwindcss/postcss`.

## Problems solved

- **Admin sidebar invisible on mobile**: Original layout had static `w-64` sidebar with no collapse. Created `AdminSidebar` with hamburger drawer.
- **Main site header covering admin mobile bar**: Header had `sticky top-0 z-50`, admin bar had `z-30`. Fixed by hiding header on admin routes via `HeaderSwitcher`.
- **Admin button hidden on mobile**: `AuthButton` had `hidden sm:inline-flex` on the admin link.
- **TypeScript error**: `isAdmin` was `boolean | null`, `AdminSidebar` expected `boolean`. Fixed with `!!()`.
- **Table overflow on mobile**: Tables now have `overflow-x-auto`.
- **Auth button always showing "Entrar"** (prior session): `createBrowserClient` unreliable for cookie reading. Fixed with server-side fetch.

## Current state

- Build passes ✅
- Admin fully responsive: hamburger drawer on mobile, static sidebar on desktop
- Mobile admin top bar: hamburger (left), "Admin" title (center), home icon (right)
- Auth button shows "Admin" link on all screen sizes when logged in as admin
- Tables scroll horizontally on narrow screens
- Admin CRUD pages built but NOT yet tested in browser
- Admin user: `deyvidyury@gmail.com` with `metadata.role = "admin"`
- 5 categories, 20 products in DB; images still on Unsplash URLs

## Next session starts with

- `npm run dev`, sign in with Google OAuth, verify: admin button on home page, navigate to /admin, test sidebar toggle on mobile
- Test admin CRUD end-to-end (create/edit/delete categories and products)
- Migrate product images from Unsplash to InsForge Storage
- Deploy to Vercel

## Open questions

- Should the admin panel have additional features (order tracking, analytics)?
- Do we need a public Storage bucket RLS policy for image uploads?
- Admin role assignment for the friend's account when they create it
