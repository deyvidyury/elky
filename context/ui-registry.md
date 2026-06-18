# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes and structure
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, design system (main or figma), and key classes used.

## Components

### Header (`src/components/Header.tsx`) — Main Design System

Sticky top header with announcement bar + main nav.

- Top bar: `bg-brand-900 text-white`, hidden on mobile (`hidden md:block`)
- Main nav: `bg-white border-b border-gray-100`
- Logo: `text-brand-700 font-bold text-xl`
- Nav links: `text-sm font-medium text-gray-600 hover:text-brand-700`
- Mobile: hamburger menu with slide-down nav

### Footer (`src/components/Footer.tsx`) — Main Design System

Dark footer with brand column, navigation columns, social links.

- Background: `bg-brand-900 text-white`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Social icons: `bg-brand-800 hover:bg-accent-500` circles
- Links: `text-gray-300 hover:text-white`

### FigmaHeader (`src/components/FigmaHeader.tsx`) — Figma Design System

Dark-themed sticky header with announcement bar + nav.

- Announcement bar: `bg-[#2f2e30] text-[#fafafa]`
- Main nav: white background, max-width 1170px
- Nav links: `text-sm text-[#2f2e30] hover:text-[#db4444]`
- Active indicator: underline on hover
- Mobile: hamburger with dropdown

### FigmaFooter (`src/components/FigmaFooter.tsx`) — Figma Design System

Dark footer with newsletter, category links, institutional links.

- Background: `bg-[#2f2e30] text-[#fafafa]`
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Newsletter input: dark bordered, `focus:border-[#db4444]`
- CTA button: `bg-[#db4444] hover:bg-[#e07575]`
- Links: `text-[rgba(250,250,250,0.7)] hover:text-[#db4444]`

### ProductCard (`src/components/ProductCard.tsx`) — Main Design System

Card for product listings with image, badges, name, price.

- Container: `rounded-2xl border border-gray-200 bg-white hover:border-brand-300 hover:shadow-xl hover:-translate-y-1`
- Image: `aspect-4/3 bg-gray-100`
- Featured badge: `bg-accent-500 text-white rounded-full`
- Category badge: `bg-white/90 backdrop-blur-sm`
- Title: `text-base font-semibold text-gray-900`
- Price: `text-lg font-bold text-brand-700`

### FigmaProductCard (`src/components/FigmaProductCard.tsx`) — Figma Design System

E-commerce style card with discount badges, star ratings, review counts.

- Container: `flex flex-col gap-4` (no border, no shadow)
- Image: `bg-[#f5f5f5] rounded-[4px] aspect-square`
- Discount badge: `bg-[#db4444] text-white rounded-[4px]`
- Stars: `text-[#ffad33]` filled, `text-[#D1D5DB]` empty
- Title: `text-sm font-medium text-[#2f2e30]`
- Current price: `text-sm font-medium text-[#db4444]`
- Original price: `text-sm text-[rgba(0,0,0,0.5)] line-through`

### AdminSidebar (`src/components/AdminSidebar.tsx`) — Admin

Responsive admin navigation — static sidebar on desktop, hamburger drawer on mobile.

- Desktop: `w-64 bg-brand-900 text-white min-h-screen`
- Mobile: fixed top bar `bg-brand-900` + slide-in overlay drawer
- Backdrop: `bg-black/50` on mobile
- Active link: `bg-brand-800 text-white`
- Nav items: `text-gray-300 hover:text-white hover:bg-brand-800`

### AuthButton (`src/components/AuthButton.tsx`) — Shared

Sign-in button or user dropdown. Used in both main and figma headers.

- Signed out: sign-in button with Google icon
- Signed in: user avatar + dropdown (admin link, sign out)
- Admin link: visible on all screen sizes when `isAdmin` is true

### AdUnit (`src/components/AdUnit.tsx`) — Main Design System

Placeholder for future ad integration.

- Container: `border-2 border-dashed border-gray-300 rounded-lg bg-gray-50`
- Ad label: `text-xs text-gray-400 uppercase`

### Breadcrumb (`src/components/Breadcrumb.tsx`) — Shared

Navigation breadcrumb showing category hierarchy.

- Container: `flex items-center text-sm text-gray-500`
- Separator: chevron SVG
- Current page: `text-gray-900 font-medium`
