# Memory — Phase 2 Complete: Main Route Group

Last updated: 2026-06-17

## What was built

- **`src/app/(main)/layout.tsx`** — Main route group layout. Renders `Header` + `<main>` + `Footer`. Fetches user server-side and passes `serverUser` to Header. No more HeaderSwitcher.
- **Moved 7 pages into `(main)/` route group**: `page.tsx`, `produtos/`, `categorias/`, `sobre/`, `contato/`, `politica-de-privacidade/`, `termos-de-uso/`
- **Updated root `layout.tsx`** — removed `HeaderSwitcher`, `FooterSwitcher`, `createInsForgeServerClient`, and user fetching. Now only the HTML shell: `<html>`, `<head>` with fonts, `<body>` with `{children}`. No longer an async component.
- **`HeaderSwitcher.tsx` and `FooterSwitcher.tsx`** still exist but are no longer imported anywhere.

## Decisions made

- Auth fetching moved from root layout to `(main)/layout.tsx` — each route group layout is responsible for its own header data
- Root layout is now a pure shell — no data fetching, no conditional rendering
- `(main)/layout.tsx` mirrors the pattern that `admin/layout.tsx` already used: fetch user, render header with it

## Problems solved

- None encountered — straightforward file moves and layout restructuring

## Current state

- Phase 1 ✅ — Shared data core
- Phase 2 ✅ — Main route group (build passes, 18/18 pages)
- Phase 3–5 still ⬜ (12 tasks remaining)
- `HeaderSwitcher.tsx` and `FooterSwitcher.tsx` still exist — to be deleted in Phase 3
- Figma layout still renders only `{children}` — to be updated in Phase 3
- All URLs unchanged (route groups don't affect URLs)

## Next session starts with

1. Run `/remember restore`
2. Read `context/build-plan.md` and `context/progress-tracker.md`
3. Start Phase 3 — update `figma/layout.tsx` to render FigmaHeader + FigmaFooter, delete HeaderSwitcher.tsx and FooterSwitcher.tsx
4. Verify with `npm run build`

## Open questions

- None
