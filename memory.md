# Memory — Phase 6.1 + 6.2 Complete

Last updated: 2026-07-01

## What was built

- **6.1 — Remove Wishlist & Cart from FigmaHeader** ✅
  - Removed Wishlist (heart) and Cart buttons from `FigmaHeader.tsx`
- **6.2 — AdminSidebar smart home link** ✅
  - `AuthButton.tsx`: detects `/figma` path via `usePathname()`, appends `?from=/figma` to Admin link
  - `AdminSidebar.tsx`: reads `from` search param via `useSearchParams()`, falls back to `/`
  - Both home links (mobile top bar + sidebar "Ir para o site") use the dynamic href

## Decisions made

- Query param approach (`?from=`) over referrer/cookie — simplest, stateless, no storage

## Problems solved

- `npm run dev` issue from last session resolved (user confirmed)
- `useSearchParams()` in `AdminSidebar` works without explicit Suspense boundary in Next.js 15.5

## Current state

- Phase 1–5: ✅ Complete
- Phase 6.1: ✅ Complete
- Phase 6.2: ✅ Complete
- Phase 6.3: ⬜ Not started
- Build passing: 23/23 pages, zero errors

## Next session starts with

1. Run `/remember restore`
2. Pick up 6.3 — Add AI button to ProductForm description field

## Open questions

- For 6.3: should the AI description generation use OpenRouter directly or go through an InsForge edge function?
