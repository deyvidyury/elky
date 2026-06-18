# Memory — Phase 1 Complete: Shared Data Core

Last updated: 2026-06-17

## What was built

- **`src/lib/data.ts`** — shared data-fetching core with three functions:
  - `getCategories()` — all categories, ordered by name
  - `getFeaturedProducts(limit?)` — featured products with joined category
  - `getAllProducts(limit?)` — all products with joined category, optional limit
- **`src/app/page.tsx`** — updated to import from `lib/data` instead of calling InsForge directly. Removed `createInsForgeServerClient` import, `Category` import, and verbose inline type casts
- **`src/app/figma/page.tsx`** — updated to import from `lib/data`. Replaced three direct InsForge queries with `getCategories()` + `getFeaturedProducts(4)` + `getAllProducts(8)`
- **`context/progress-tracker.md`** — Phase 1 marked complete (6/6 tasks ✅)

## Decisions made

- All three functions use `createInsForgeServerClient()` internally — server-only, safe for Server Components
- Functions return empty arrays on error (with console.error log) rather than throwing — pages degrade gracefully if DB is unreachable
- `Product` type from `categories.ts` already includes optional `categories?` join field — reused without creating new types

## Problems solved

- None encountered — straightforward extraction of duplicated InsForge query patterns into shared functions

## Current state

- Phase 1 complete ✅ — build passes, 18/18 pages generated
- Phase 2–5 still ⬜ (22 tasks remaining)
- Same DB state: 5 categories, 20 products, admin user `deyvidyury@gmail.com`
- Admin CRUD still not tested in browser
- All architectural decisions from planning session still hold

## Next session starts with

1. Run `/remember restore`
2. Read `context/build-plan.md` and `context/progress-tracker.md`
3. Start Phase 2 — create `src/app/(main)/layout.tsx`, move all main pages into `(main)/`, clean up root layout
4. Key files to work with:
   - `src/app/layout.tsx` (root — remove HeaderSwitcher/FooterSwitcher)
   - `src/app/page.tsx` → `src/app/(main)/page.tsx`
   - `src/app/produtos/` → `src/app/(main)/produtos/`
   - `src/app/categorias/` → `src/app/(main)/categorias/`
   - `src/app/sobre/` → `src/app/(main)/sobre/`
   - `src/app/contato/` → `src/app/(main)/contato/`
   - `src/app/politica-de-privacidade/` → `src/app/(main)/politica-de-privacidade/`
   - `src/app/termos-de-uso/` → `src/app/(main)/termos-de-uso/`
5. Verify with `npm run build`

## Open questions

- None
