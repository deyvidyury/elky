# Memory — Phase 3 Complete: Figma Layout Cleanup

Last updated: 2026-06-18

## What was built

- **Updated `src/app/figma/layout.tsx`** — Now fetches user server-side and renders `FigmaHeader` + `<main>` + `FigmaFooter`, mirroring the `(main)/layout.tsx` pattern exactly.
- **Deleted `HeaderSwitcher.tsx`** — No longer imported anywhere. Each route group now owns its own header.
- **Deleted `FooterSwitcher.tsx`** — Same reason, no longer needed.

## Decisions made

- Figma layout now does server-side auth fetching the same way main layout does — consistent pattern across route groups
- No more switcher components in the project — each route group layout is self-contained

## Problems solved

- None encountered — straightforward layout update and file deletion

## Current state

- Phase 1 ✅ — Shared data core
- Phase 2 ✅ — Main route group
- Phase 3 ✅ — Figma layout cleanup (build passes, 18/18 pages)
- Phase 4–5 still ⬜ (11 tasks remaining)
- All three route group layouts are now clean:
  - Root layout: pure HTML shell
  - `(main)/layout.tsx`: Header + children + Footer (with serverUser)
  - `figma/layout.tsx`: FigmaHeader + children + FigmaFooter (with serverUser)
  - `admin/layout.tsx`: AdminSidebar + children (auth guard)

## Next session starts with

1. Run `/remember restore`
2. Phase 4 — Transition Links: add "Ver design alternativo" link in Footer.tsx, "Ver design principal" link in FigmaFooter.tsx

## Open questions

- None
