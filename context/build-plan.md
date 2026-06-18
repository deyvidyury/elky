# Build Plan — Dual Frontend Architecture

Last updated: 2026-06-17

## What we are building

Two logical frontends inside the same Next.js project. A shared data-fetching core in `lib/data.ts`. The main frontend lives under a `(main)` route group with `Header` + `Footer`. The figma frontend stays under `/figma/*` with `FigmaHeader` + `FigmaFooter`. Every page that exists in one frontend exists in the other — same data, different design system. A footer link on each lets you switch.

## Language we agreed on

- **Core**: shared server functions in `lib/data.ts` — `getCategories()`, `getFeaturedProducts(limit?)`, `getAllProducts(limit?)`
- **Frontend**: a design system — the main one (brand colors, trust badges, ProductCard) and the figma one (dark theme, red accents, FigmaProductCard, SectionEyebrow)
- **Parity**: every page in one frontend must exist in the other, pulling from the same data core
- **Transition link**: subtle footer link, not in main nav

## Decisions made

- Route groups over separate projects — no new package.json, no monorepo overhead
- Figma stays at `/figma/*` — route groups don't change URLs
- Layout per frontend — no more HeaderSwitcher/FooterSwitcher
- Shared data layer in `lib/data.ts` — both frontends import from here
- Phase-by-phase build — validate each step before moving on

## Phases

### Phase 1 — Shared Data Core

Create `src/lib/data.ts` with three functions extracted from both pages. No layout changes yet.

- `getCategories()` → `Category[]`
- `getFeaturedProducts(limit?)` → products with joined category
- `getAllProducts(limit?)` → products with joined category

Then update both `page.tsx` (main) and `figma/page.tsx` to import from `lib/data` instead of calling InsForge directly.

**Verify**: `npm run build` — both homepages still work identically.

### Phase 2 — Main Route Group

- Create `src/app/(main)/layout.tsx` — renders `Header` + `{children}` + `Footer`
- Move these into `src/app/(main)/`:
  - `page.tsx`
  - `produtos/`
  - `categorias/`
  - `sobre/`
  - `contato/`
  - `politica-de-privacidade/`
  - `termos-de-uso/`
- Update root `layout.tsx` — remove `HeaderSwitcher` and `FooterSwitcher` imports, keep only metadata + `<html>` + `<body>` + `{children}`

**Verify**: `npm run build` — main site routes work, Header/Footer appear correctly.

### Phase 3 — Figma Layout Cleanup

- Update `figma/layout.tsx` to render `FigmaHeader` + `{children}` + `FigmaFooter` (currently it only renders `{children}`)
- Delete `HeaderSwitcher.tsx` and `FooterSwitcher.tsx` (no longer needed)
- Root layout already clean from Phase 2

**Verify**: `npm run build` — `/figma` renders with FigmaHeader/FigmaFooter, no stray imports.

### Phase 4 — Transition Links

- Add "Ver design alternativo" → `/figma` in `Footer.tsx`
- Add "Ver design principal" → `/` in `FigmaFooter.tsx`

**Verify**: navigate between the two from the footer.

### Phase 5 — Figma Secondary Pages

Create these under `figma/`, each using `FigmaProductCard`, the dark theme, and `SectionEyebrow`:

| Page                    | Route                               | Data source                           |
| ----------------------- | ----------------------------------- | ------------------------------------- |
| Produtos (listing)      | `/figma/produtos`                   | `getAllProducts()`                    |
| Categoria               | `/figma/categorias/[category]`      | `getCategories()` + filtered products |
| Produto (detail)        | `/figma/produtos/[category]/[slug]` | single product from InsForge          |
| Sobre                   | `/figma/sobre`                      | static content                        |
| Contato                 | `/figma/contato`                    | static content                        |
| Política de Privacidade | `/figma/politica-de-privacidade`    | static content                        |
| Termos de Uso           | `/figma/termos-de-uso`              | static content                        |

Static pages (sobre, contato, etc.) mirror their main counterparts with figma styling. Product pages get the figma treatment: dark cards, red accent CTAs, `SectionEyebrow` section headers.

**Verify**: full build, navigate all figma routes.
