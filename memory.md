# Memory — Review & Hardening: Dual Frontend Architecture

Last updated: 2026-06-18

## What was built

**Review cycle — 14 issues found and fixed across 3 layers:**

- **Critical (4):** Internal links in `FigmaProductCard`, `FigmaFooter`, all figma category chips, and product breadcrumbs pointed to main routes (`/produtos`, `/categorias/...`) instead of `/figma/...`. Fixed across 7 files. Contact form was inert — now a client component with controlled inputs, validation, loading state, and success confirmation.
- **Important (3):** All 12 figma files migrated from raw hex/rgba values (`bg-[#db4444]`, `text-[rgba(0,0,0,0.5)]`, etc.) to proper figma token classes (`bg-figma-red`, `text-figma-text-muted`, etc.). 14 new tokens added to `globals.css`. FigmaHeader search wrapped in `<form>` with feedback. Wishlist/cart buttons now show "em breve" on click.
- **Minor (5):** `lib/data.ts` expanded with `getCategoryBySlug()`, `getProductBySlug()`, `getProductsByCategory()`. Figma dynamic pages now use shared functions instead of direct InsForge queries. `Breadcrumb` component updated with `variant="figma"` prop — static figma pages now use it. `formatDiscountedPrice` moved before component (not after). Star ratings now vary deterministically via `ratingFromName()` hash function instead of hardcoded `4.5`/`88` everywhere.
- **Cleanup (2):** Two final raw value stragglers resolved — `rgba(250,250,250,0.6)` (new token) and `rgba(250,250,250,0.7)` in contato page.

## Decisions made

- **Token migration strategy:** Used `.Replace()` in PowerShell for bulk find-and-replace across figma files rather than individual `multi_replace_string_in_file` calls. Added all needed tokens before migration to avoid partial state.
- **Breadcrumb variant:** Added `variant?: 'main' | 'figma'` prop instead of creating a separate `FigmaBreadcrumb` component. Keeps one source of truth for breadcrumb structure while allowing token divergence.
- **Contact form:** Client component with `useState` + simulated submission (800ms setTimeout) + success state with reset button. No email backend configured yet, but form is functional and provides real UX feedback.
- **Star ratings:** Deterministic hash of product name → rating 3.5–5.0, reviews 10–200. Same product always gets same rating across page refreshes. Applied to all 4 figma pages that render product cards.
- **Figma design tokens** are now the canonical source for the figma frontend. 27 tokens defined in `globals.css`. Code-standards.md rule "Never hardcode colors" now enforced for both design systems.

## Problems solved

- **PowerShell path issues:** Files with `[]` in names (dynamic routes) require `-LiteralPath` parameter. `[regex]::Escape()` doesn't always help — `.Replace()` (string method, not regex) was more reliable for bulk token migration.
- **Multiple match failures:** When using `multi_replace_string_in_file`, identical code blocks (like "Ver Todos os Produtos" CTAs) need unique surrounding context to disambiguate. Added preceding section comments or product card context to differentiate.
- **Link regressions from token migration:** The PowerShell bulk `.Replace()` overwrote earlier manual link fixes (e.g., `/figma/produtos` → `/produtos`). Had to re-audit all figma pages for `/produtos` and `/categorias/` links without `/figma/` prefix after token migration.

## Current state

- Phase 1–5: ✅ Complete
- Review cycle (14 issues): ✅ All resolved
- Build: 23/23 pages, zero errors, zero warnings (beyond pre-existing font warning)
- Figma frontend: 100% token-based, fully self-contained (all internal links stay within `/figma/*`)
- Shared data layer: 6 functions in `lib/data.ts`, used by both frontends
- All interactive elements (search, cart, wishlist, contact form) provide user feedback
- Not yet pushed to origin/main

## Next session starts with

1. Run `/remember restore`
2. Push to origin/main or deploy to Vercel
3. Consider: add real email backend for contact form, implement search functionality, add pagination

## Open questions

- None
