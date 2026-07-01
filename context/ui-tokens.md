# UI Tokens

Design tokens for Guia de Suprimentos. All colors, typography, and spacing tokens are defined via the `@theme` directive in `src/app/globals.css`. This file documents what each token means and when to use it. Never hardcode colors in components.

## How to Use

This project uses **Tailwind CSS v4**. All design tokens are defined using `@theme` in `globals.css`. Tailwind v4 automatically generates utility classes:

- `--color-brand-700` → `bg-brand-700`, `text-brand-700`, `border-brand-700`
- `--color-accent-500` → `bg-accent-500`, `text-accent-500`, `border-accent-500`
- `--color-figma-red` → `bg-figma-red`, `text-figma-red`

```tsx
// Correct — uses generated utility classes
className="bg-brand-900 text-accent-400"

// Correct — references CSS variable directly (rarely needed)
style={{ color: 'var(--color-brand-700)' }}

// Never — hardcoded hex values (use bg-brand-700 text-accent-500 instead)
className="bg-brand-700 text-accent-500"

// Never — raw Tailwind color classes
className="bg-blue-500 text-gray-600"
```

---

## Main Brand Tokens

### Brand — Deep Navy

Used for: headers, footers, hero sections, dark backgrounds.

| Token                     | Hex       | Usage                                  |
| ------------------------- | --------- | -------------------------------------- |
| `brand-50`                | `#eef2f7` | Light backgrounds, section badge bg    |
| `brand-100`               | `#d5dfed` | Icon backgrounds on hover              |
| `brand-200` – `brand-600` | —         | Intermediate shades                    |
| `brand-700`               | `#1e3a5f` | Logo text, CTA border, button hover bg |
| `brand-800`               | `#162d4a` | Social icon backgrounds, nav hover     |
| `brand-900`               | `#0f1f35` | Header top bar, footer, hero gradient  |

### Accent — Warm Gold

Used for: primary CTAs, featured badges, highlights.

| Token                       | Hex       | Usage                               |
| --------------------------- | --------- | ----------------------------------- |
| `accent-50`                 | `#fffbeb` | Light accent backgrounds            |
| `accent-100` – `accent-300` | —         | Intermediate shades                 |
| `accent-400`                | `#fbbf24` | Hero text highlight, icon accents   |
| `accent-500`                | `#d4a017` | Primary buttons, featured badges    |
| `accent-600` – `accent-900` | —         | Darker accent shades (hover states) |

### Secondary — Rich Red

Used for: restaurant-industry accents, secondary CTAs, urgent highlights.

| Token                            | Hex       | Usage                      |
| -------------------------------- | --------- | -------------------------- |
| `secondary-50` – `secondary-400` | —         | Lighter shades             |
| `secondary-500`                  | `#c0392b` | Secondary emphasis         |
| `secondary-700`                  | `#8b0000` | Strong emphasis (dark red) |

### Typography Tokens (Main Brand)

| Token            | Font                     | Usage                         |
| ---------------- | ------------------------ | ----------------------------- |
| `--font-sans`    | Inter, system sans-serif | Body text, nav, labels        |
| `--font-display` | Playfair Display, serif  | Hero headings, section titles |

---

## Figma Design Tokens

The figma frontend uses a separate set of tokens inspired by a modern e-commerce UI kit.

### Backgrounds

| Token                | Hex       | Usage                           |
| -------------------- | --------- | ------------------------------- |
| `figma-bg`           | `#ffffff` | Page background                 |
| `figma-bg-secondary` | `#f5f5f5` | Card image backgrounds, arrows  |
| `figma-dark`         | `#2f2e30` | Nav bar, footer, promo sections |
| `figma-dark-text`    | `#fafafa` | Text on dark backgrounds        |

### Accent

| Token             | Hex       | Usage                                                                |
| ----------------- | --------- | -------------------------------------------------------------------- |
| `figma-red`       | `#db4444` | Primary buttons, discount badges, section eyebrow bar, active states |
| `figma-red-hover` | `#e07575` | Button hover, link hover                                             |
| `figma-green`     | `#00ff66` | Promo CTA, "Categories" label                                        |

### Text

| Token        | Hex       | Usage     |
| ------------ | --------- | --------- |
| `figma-text` | `#000000` | Body text |

### Component-Specific

| Element            | Value                   |
| ------------------ | ----------------------- |
| Star rating filled | `#ffad33`               |
| Star rating empty  | `#D1D5DB`               |
| Muted text         | `rgba(0,0,0,0.5)`       |
| Dark muted text    | `rgba(250,250,250,0.7)` |
| Border light       | `rgba(0,0,0,0.1)`       |
| Border dark        | `rgba(250,250,250,0.2)` |

---

## Color Usage Guide — Main Brand

### Page Layout

| Element             | Token                   |
| ------------------- | ----------------------- |
| Page background     | white                   |
| Hero background     | `bg-brand-900` gradient |
| Featured section bg | `bg-gray-50`            |
| CTA section bg      | `bg-brand-900`          |

### Typography

| Element          | Token / Class                 |
| ---------------- | ----------------------------- |
| Hero heading     | `font-display text-white`     |
| Section heading  | `font-display text-gray-900`  |
| Section subtitle | `text-gray-500`               |
| Nav links        | `text-gray-600`               |
| Card title       | `text-gray-900 font-semibold` |
| Card description | `text-gray-500 text-xs`       |
| Price            | `text-brand-700 font-bold`    |

### Buttons

| Element       | Token                                             |
| ------------- | ------------------------------------------------- |
| Primary CTA   | `bg-accent-500 text-white`                        |
| Secondary CTA | `border-2 border-white/20 bg-white/10 text-white` |

---

## Color Usage Guide — Figma

### Page Layout

| Element            | Token          |
| ------------------ | -------------- |
| Page background    | `bg-white`     |
| Hero background    | `bg-[#2f2e30]` |
| Section background | `bg-white`     |
| Promo background   | `bg-[#2f2e30]` |

### Typography

| Element         | Token / Class                  |
| --------------- | ------------------------------ |
| Section heading | `text-[#2f2e30] font-semibold` |
| Section eyebrow | `text-[#db4444] font-semibold` |
| Body text       | `text-[#2f2e30]`               |
| Muted text      | `text-[rgba(0,0,0,0.5)]`       |
| Dark text       | `text-[#fafafa]`               |

### Buttons

| Element   | Token                                                      |
| --------- | ---------------------------------------------------------- |
| Primary   | `bg-[#db4444] hover:bg-[#e07575] text-white rounded-[4px]` |
| Promo CTA | `bg-[#00ff66] hover:bg-[#00dd55] text-white rounded-[4px]` |
