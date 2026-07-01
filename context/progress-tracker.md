# Progress Tracker — Dual Frontend Architecture

Last updated: 2026-07-01

## Legend

- ⬜ Not started
- 🔄 In progress
- ✅ Complete
- ❌ Blocked

---

## Phase 1 — Shared Data Core ✅

| #   | Task                                               | Status |
| --- | -------------------------------------------------- | ------ |
| 1.1 | Create `src/lib/data.ts` with `getCategories()`    | ✅     |
| 1.2 | Add `getFeaturedProducts(limit?)` to `lib/data.ts` | ✅     |
| 1.3 | Add `getAllProducts(limit?)` to `lib/data.ts`      | ✅     |
| 1.4 | Update main `page.tsx` to import from `lib/data`   | ✅     |
| 1.5 | Update `figma/page.tsx` to import from `lib/data`  | ✅     |
| 1.6 | Verify: `npm run build`                            | ✅     |

## Phase 2 — Main Route Group ✅

| #    | Task                                                            | Status |
| ---- | --------------------------------------------------------------- | ------ |
| 2.1  | Create `src/app/(main)/layout.tsx` (Header + children + Footer) | ✅     |
| 2.2  | Move `page.tsx` into `(main)/`                                  | ✅     |
| 2.3  | Move `produtos/` into `(main)/`                                 | ✅     |
| 2.4  | Move `categorias/` into `(main)/`                               | ✅     |
| 2.5  | Move `sobre/` into `(main)/`                                    | ✅     |
| 2.6  | Move `contato/` into `(main)/`                                  | ✅     |
| 2.7  | Move `politica-de-privacidade/` into `(main)/`                  | ✅     |
| 2.8  | Move `termos-de-uso/` into `(main)/`                            | ✅     |
| 2.9  | Update root `layout.tsx` — remove HeaderSwitcher/FooterSwitcher | ✅     |
| 2.10 | Verify: `npm run build` — main routes work                      | ✅     |

## Phase 3 — Figma Layout Cleanup ✅

| #   | Task                                                                     | Status |
| --- | ------------------------------------------------------------------------ | ------ |
| 3.1 | Update `figma/layout.tsx` to render FigmaHeader + children + FigmaFooter | ✅     |
| 3.2 | Delete `HeaderSwitcher.tsx`                                              | ✅     |
| 3.3 | Delete `FooterSwitcher.tsx`                                              | ✅     |
| 3.4 | Verify: `npm run build` — /figma renders with correct header/footer      | ✅     |

## Phase 4 — Transition Links ✅

| #   | Task                                                    | Status |
| --- | ------------------------------------------------------- | ------ |
| 4.1 | Add "Ver design alternativo" → `/figma` in `Footer.tsx` | ✅     |
| 4.2 | Add "Ver design principal" → `/` in `FigmaFooter.tsx`   | ✅     |
| 4.3 | Verify: navigate between frontends via footer           | ✅     |

## Phase 5 — Figma Secondary Pages ✅

| #   | Task                                                         | Status |
| --- | ------------------------------------------------------------ | ------ |
| 5.1 | Create `/figma/produtos/page.tsx` (listing)                  | ✅     |
| 5.2 | Create `/figma/categorias/[category]/page.tsx`               | ✅     |
| 5.3 | Create `/figma/produtos/[category]/[slug]/page.tsx` (detail) | ✅     |
| 5.4 | Create `/figma/sobre/page.tsx`                               | ✅     |
| 5.5 | Create `/figma/contato/page.tsx`                             | ✅     |
| 5.6 | Create `/figma/politica-de-privacidade/page.tsx`             | ✅     |
| 5.7 | Create `/figma/termos-de-uso/page.tsx`                       | ✅     |
| 5.8 | Verify: full build, navigate all figma routes                | ✅     |

## Phase 6 — Polish & Fixes

| #   | Task                                                                                                                                        | Status |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| 6.1 | Figma header: remove Wishlist (heart) and Cart icons/buttons from navbar (`FigmaHeader.tsx`)                                                | ✅     |
| 6.2 | Admin sidebar "Home" links should return to previous frontend (main `/` or figma `/figma`) instead of always `/`                            | ✅     |
| 6.3 | Product form: add AI button next to description field that generates a professional, commercial description based on already-entered fields | ⬜     |
