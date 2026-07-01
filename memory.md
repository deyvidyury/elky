# Memory — RLS Fix + AI Description Persistence

Last updated: 2026-07-01

## What was built

- **Fixed AI-generated description persistence**: descriptions generated via `/api/generate-description` now correctly save to the database when clicking "Salvar Alterações".

## Decisions made

- **`public.is_admin()` SECURITY DEFINER function**: InsForge's JWT does NOT include `user_metadata`, `app_metadata`, or `metadata` claims. Instead of checking JWT claims in RLS, a database function looks up `auth.users.metadata ->> 'role'` by the JWT's `sub` (user ID). This is the only reliable way to do role-based RLS in InsForge.
- **Server actions must validate `data`, not just `error`**: PostgREST returns `{ data: [], error: null }` when RLS silently blocks a write. All server actions now check `if (!data || data.length === 0)`.
- **Server client gets explicit credentials**: `createInsForgeServerClient()` now passes `baseUrl` and `anonKey` explicitly instead of relying on `process.env` resolution inside the SDK.

## Problems solved

- **RLS policies checked wrong JWT path**: original policies used `auth.jwt() -> 'app_metadata' ->> 'role'` which was never set. Tried `user_metadata` and `metadata` — neither exist in InsForge's JWT. Solved with `public.is_admin()` database function.
- **Silent write failures**: server actions treated `error === null` as success, but RLS-blocked writes return no error — just empty data. Now properly validated.
- See `/memories/repo/insforge-rls.md` for full technical details.

## Files modified this session

- `src/lib/insforge/server.ts` — explicit `baseUrl`/`anonKey`
- `src/lib/insforge/actions.ts` — data validation in all 4 actions (createProduct, updateProduct, createCategory, updateCategory)
- `public.products` RLS — uses `public.is_admin()`
- `public.categories` RLS — uses `public.is_admin()`
- `public.is_admin()` — new SECURITY DEFINER function

## Current state

- Phase 1–6: ✅ Complete
- AI description generation: ✅ working
- AI description persistence: ✅ working (fixed this session)
- Admin auth + RLS: ✅ working (fixed this session)
- Build passing: 24/24 pages

## Next session starts with

1. Run `/remember restore`
2. Consider: deployment to Vercel, additional features, or next phase

## Open questions

- Does the `<!-- ADSENSE -->` placement in product detail pages need a corresponding UI update?
- Should the `is_admin()` function pattern be applied to any other tables?
