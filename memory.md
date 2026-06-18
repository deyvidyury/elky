# Memory — Phase 6 Planning & TODO Creation

Last updated: 2026-06-18

## What was built

- **Phase 6 — Polish & Fixes** added to `context/progress-tracker.md` with 3 tasks:
  - 6.1: Remove Wishlist (heart) and Cart icons/buttons from FigmaHeader navbar — catalog site, not e-commerce
  - 6.2: Admin sidebar "Home" links return to the frontend the user came from (`/` or `/figma`) instead of always `/` — needs query param or referrer tracking in `AdminSidebar.tsx`
  - 6.3: Add AI button next to description field in product form (`ProductForm.tsx`) that generates a professional, commercial description from already-entered fields — will likely use InsForge's OpenRouter AI integration

## Decisions made

- These 3 tasks grouped as Phase 6 — "Polish & Fixes" — following the existing phase structure in progress-tracker.md
- No implementation done yet — purely planning/specification

## Problems solved

- Identified the two hardcoded `href="/"` locations in `AdminSidebar.tsx`: mobile top bar home icon and sidebar "Ir para o site" link
- Identified the Wishlist and Cart sections in `FigmaHeader.tsx` that need removal

## Current state

- Phase 1–5: ✅ Complete
- Phase 6: 3 tasks planned, none started
- Build was working previously (23/23 pages, zero errors)
- `npm run dev` is failing with exit code 1 — needs investigation next session

## Next session starts with

1. Run `/remember restore`
2. Investigate why `npm run dev` is failing (exit code 1)
3. Pick up Phase 6 tasks — 6.1 (remove heart/cart from FigmaHeader) is the quickest win

## Open questions

- What caused the `npm run dev` failure? Console logs needed
- For 6.2: preferred approach for tracking which frontend the admin came from? Query param vs. referrer vs. cookie?
- For 6.3: should the AI description generation use OpenRouter directly or go through an InsForge edge function?
