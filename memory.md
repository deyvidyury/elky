# Memory — Dual Frontend Architecture Planning & Project Scaffolding

Last updated: 2026-06-17

## What was built

### Context files created (from scratch)

- **`context/build-plan.md`** — 5-phase implementation plan for dual frontend architecture (shared data core, main route group, figma layout cleanup, transition links, figma secondary pages)
- **`context/progress-tracker.md`** — 28 tasks across 5 phases, all currently ⬜
- **`context/project-overview.md`** — Project description, problem solved, all pages, user flows, features in/out of scope, DB schema summary
- **`context/architecture.md`** — Stack, full folder structure (including planned figma routes), system boundaries, data flow diagrams, InsForge schema
- **`context/code-standards.md`** — TypeScript rules, Next.js 15 conventions, file naming, component structure order, InsForge SDK patterns, styling rules
- **`context/ui-registry.md`** — All 10 existing components documented with exact classes, file paths, and design system affiliation
- **`context/ui-rules.md`** — Both design systems documented side-by-side (main brand + figma): layout, hero, cards, buttons, fonts, breakpoints, do-nots
- **`context/ui-tokens.md`** — Complete color tokens from globals.css with usage guides for both design systems
- **`context/library-docs.md`** — InsForge SDK patterns, Next.js 15 patterns, Tailwind v4 config specific to this project

### AGENTS.md updated

- Added Next.js agent rules block
- Added context file reading order (9 files)
- Added immutable rules (no hardcoded colors, update tracker/registry, use skills, /recover)
- Added available skills list
- Preserved existing InsForge SDK documentation

## Decisions made

- **Route groups over separate projects**: Use `(main)/` and keep `/figma/*` — no monorepo, no duplicate configs, URLs unchanged
- **Shared data layer**: `lib/data.ts` with `getCategories()`, `getFeaturedProducts()`, `getAllProducts()` — both frontends import from here
- **Layout per frontend**: Each route group gets its own layout rendering the correct header/footer. `HeaderSwitcher`/`FooterSwitcher` to be deleted
- **Footer transition links**: Subtle "Ver design alternativo" / "Ver design principal" links in each footer, not in main nav
- **Full page parity**: Every page in one frontend must exist in the other — products, categories, product detail, static pages (sobre, contato, politica, termos)
- **Phase-by-phase build**: 5 sequential phases, each verified with `npm run build` before proceeding

## Problems solved

- Clarified that "static" figma page isn't actually static — it already fetches from InsForge, just feature-incomplete
- Resolved "two separated projects" vs "route groups" — chose route groups to avoid monorepo overhead
- Identified exact pages needed for figma frontend parity: produtos listing, category filter, product detail, 4 static pages

## Current state

- Build passes ✅ (no code changes made yet)
- All 9 context files exist and are populated
- `AGENTS.md` updated with project rules
- Admin CRUD still not tested in browser
- 5 categories, 20 products in DB; images on Unsplash URLs
- Admin user: `deyvidyury@gmail.com` with `metadata.role = "admin"`

## Next session starts with

1. Run `/remember restore`
2. Read `context/build-plan.md` and `context/progress-tracker.md`
3. Start Phase 1 — create `src/lib/data.ts` with shared data-fetching functions, update both homepage pages to use them
4. Verify with `npm run build`

## Open questions

- None from this session — all architectural decisions resolved
