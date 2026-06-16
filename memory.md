# Memory — Dual Visual Themes + Figma Redesign

Last updated: 2026-06-15

## What was built

**Alternate Figma-style homepage** at `/figma` route, based on "Full E-Commerce Website UI UX Design" community Figma file. Coexists alongside original navy/gold design for comparison.

Files created this session:

- `src/components/FigmaHeader.tsx` — White nav with black top bar, search input, wishlist/cart icons, mobile hamburger menu
- `src/components/FigmaFooter.tsx` — Dark (#2F2E30) footer with newsletter signup, 4-column links
- `src/components/FigmaProductCard.tsx` — Product cards with discount badges, star ratings, hover heart/eye icons, "Add to Cart" slide-up
- `src/components/HeaderSwitcher.tsx` — Client component that renders Header or FigmaHeader based on URL path
- `src/components/FooterSwitcher.tsx` — Same pattern for Footer/FigmaFooter
- `src/app/figma/layout.tsx` — Pass-through layout (inherits root)
- `src/app/figma/page.tsx` — Full Figma homepage: hero w/ sidebar categories, flash sales, browse by category, best selling, promo banner w/ countdown, explore products grid, new arrival showcase, services bar

Files modified this session:

- `src/app/globals.css` — Added Figma design tokens (--color-figma-_ and --font-figma-_)
- `src/app/layout.tsx` — Replaced hardcoded Header/Footer with HeaderSwitcher/FooterSwitcher; added Poppins font
- `next.config.ts` — Added `allowedDevOrigins` for local network mobile access

## Decisions made

- **Dual theme architecture**: Used path-based switcher components (HeaderSwitcher/FooterSwitcher) instead of route groups — avoids moving all existing pages
- **Figma design system**: White bg (#FFFFFF), secondary gray (#F5F5F5), red accent (#DB4444), dark sections (#2F2E30), Poppins body font + Inter headings
- **Product card pattern**: Discount badges (red -40%), star ratings with half-star support, heart/eye hover icons, black "Add to Cart" slide-up bar
- **Section labels**: Red vertical bar (20x40px) + text eyebrow (matching Figma "Today's"/"This Month" pattern)
- **Mobile network access**: Firewall rule added for port 3000 + allowedDevOrigins in next.config (not fully working yet)

## Current state

- **Build**: ✅ Passes — 31/31 pages compiled
- **Lint**: ⚠️ One harmless warning (custom fonts in layout.tsx)
- **Original site** (`/`): Navy/gold theme intact
- **Figma site** (`/figma`): New Figma theme with own header/footer
- **Mobile access**: Not working yet — firewall rule and allowedDevOrigins set but not verified

## Next session starts with

1. Debug mobile access (firewall + allowedDevOrigins might need further tuning)
2. Optionally: create Figma-styled versions of product listing, product detail, category pages
3. Optionally: deploy and compare both versions live

## Open questions

- Should the remaining pages (produtos, categorias, contato, sobre) also get Figma-styled versions?
- Should the Figma version become the default and the navy version be removed?
