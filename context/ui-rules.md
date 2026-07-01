# UI Rules

Concise rules for building Guia de Suprimentos UI. This project has two design systems: the **main brand** design and the **figma** e-commerce design. Components must match the design system they belong to.

## Two Design Systems

| Aspect         | Main Brand                            | Figma                                  |
| -------------- | ------------------------------------- | -------------------------------------- |
| Header         | `Header.tsx`                          | `FigmaHeader.tsx`                      |
| Footer         | `Footer.tsx`                          | `FigmaFooter.tsx`                      |
| Product Card   | `ProductCard.tsx`                     | `FigmaProductCard.tsx`                 |
| Color scheme   | Brand navy + warm gold + rich red     | Dark (#2f2e30) + red (#db4444) + white |
| Border radius  | `rounded-2xl` (16px) on cards         | `rounded-[4px]` throughout             |
| Typography     | Inter body, Playfair Display headings | Inter for all text                     |
| Max width      | `max-w-7xl` (1280px)                  | `max-w-[1170px]`                       |
| Section labels | `.section-badge` pill                 | `SectionEyebrow` with red bar          |

## Font

Two fonts loaded via `next/font/google`:

```typescript
// Inter — body text (both design systems)
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// Playfair Display — main brand headings only
import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});
```

- Main brand headings: `font-display` (Playfair Display)
- Figma headings: `font-sans` (Inter), no serif fonts
- Never use system fonts — always the project's loaded fonts

## Main Brand Design Rules

### Layout

- Page max-width: `max-w-7xl` (1280px), centered with `mx-auto`
- Section padding: `py-20 sm:py-28`
- Content padding: `px-4 sm:px-6 lg:px-8`

### Hero Section

- Gradient background: `bg-linear-to-br from-brand-900 via-brand-800 to-brand-700`
- Subtle SVG pattern overlay at 5% opacity
- Heading: `font-display text-4xl sm:text-5xl lg:text-6xl font-bold`
- CTA buttons: `bg-accent-500` primary, `border-2 border-white/20 bg-white/10` secondary

### Section Badges

Pill-shaped label above section headings:

```html
<span className="section-badge ..."> Label </span>
```

Defined in globals.css: `inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700`

### Cards

- White background with `border border-gray-200`
- Border radius: `rounded-2xl`
- Hover: `hover:border-brand-300 hover:shadow-xl hover:-translate-y-1`

### Trust Badges

- White cards on hero overlay: `rounded-xl bg-white shadow-lg border border-gray-100`
- Icon circle: `bg-brand-50 text-brand-700` → hover `bg-brand-100`

### CTA Section

- Dark background: `bg-brand-900 text-white`
- Pattern overlay at 10% opacity
- Primary button: `bg-accent-500`, secondary: `border-2 border-white/20 bg-white/10`

## Figma Design Rules

### Layout

- Page max-width: `max-w-[1170px]`, centered with `mx-auto`
- Section padding: `py-20`
- Content padding: `px-4 sm:px-6`

### Section Eyebrow

Red vertical bar + label pattern:

```html
<div className="flex items-center gap-4">
  <div className="h-10 w-5 rounded-xs bg-figma-red" />
  <span className="text-sm font-semibold text-figma-red">Label</span>
</div>
```

### Hero Section

- Left sidebar: categories list, `w-[217px]`, right border
- Main hero: `bg-[#2f2e30] rounded-[4px]`
- Heading: `text-4xl lg:text-5xl font-semibold text-[#fafafa]`
- CTA: text link with underline hover

### Product Cards

- No card container border — grid items only
- Image: `bg-[#f5f5f5] rounded-[4px] aspect-square`
- Star ratings always shown
- Discount badge: `bg-[#db4444]` on top-left
- Price colors: current `text-[#db4444]`, original `text-[rgba(0,0,0,0.5)] line-through`

### Buttons

- Primary: `bg-[#db4444] hover:bg-[#e07575] text-white rounded-[4px] h-[56px]`
- Secondary: nav style, text with underline on hover

### Dividers

- `<hr className="border-figma-border" />` between major sections

### Promo Banner

- `bg-[#2f2e30] rounded-[4px]`
- Green accent: `text-[#00ff66]`
- Countdown circles: `bg-white` with dark text
- CTA: `bg-[#00ff66] hover:bg-[#00dd55]`

## Shared Rules (Both Design Systems)

### Do Nots

- Never use Tailwind's built-in color classes (`bg-blue-500`, `text-gray-600`) — use project tokens only
- Never define colors in `tailwind.config.ts` — use `@theme` in globals.css
- Never hardcode hex values in components — use token classes
- Never use more than one font family in a single text element
- Never show raw error messages to users
- Never use `position: fixed` for standard UI — only for mobile sidebar overlay

### Responsive Breakpoints

Follow Tailwind defaults:

- `sm:` 640px
- `md:` 768px
- `lg:` 1024px
- `xl:` 1280px

Mobile-first: write base styles for mobile, add breakpoints up.
