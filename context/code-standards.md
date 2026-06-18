# Code Standards

Implementation rules and conventions for the entire project. The AI agent must follow these in every session without exception. These rules prevent pattern drift across sessions.

## Engineering Mindset

- **Think before implementing** — understand what is being built and why before writing a single line
- **Read context files first** — never assume, always verify against architecture.md and project-overview.md
- **Scope is sacred** — only build what the current feature requires. Never go beyond scope
- **Clean over clever** — simple readable code over clever abstractions
- **One thing at a time** — complete one feature fully before touching the next
- **Every feature must be verifiable** — if it can't be tested immediately, it's incomplete

## TypeScript

- Strict mode enabled in tsconfig.json — no exceptions
- Never use `any` — use `unknown` and narrow the type
- All function parameters and return types must be explicitly typed
- Use `type` for object shapes and unions — use `interface` only for extendable component props
- All async functions must have proper error handling
- Use `const` by default — only use `let` when reassignment is necessary

## Next.js 15 Conventions

- App Router only — no Pages Router
- React 19 — use React 19 APIs throughout
- All components are Server Components by default
- Only add `"use client"` when the component requires:
  - `useState` or `useReducer`
  - `useEffect`
  - Browser APIs (localStorage, window, etc.)
  - Event listeners (click outside, keyboard, etc.)
  - `usePathname` or other navigation hooks
- Data fetching happens in Server Components — never fetch in Client Components directly
- Route handlers live in `app/api/` — minimal logic, delegate to lib functions
- Server Actions are defined in `lib/insforge/actions.ts`
- Always read Next.js 15 documentation before implementing Next.js-specific features

## File and Folder Naming

- Folders: kebab-case — `politica-de-privacidade`, `product-details`
- Component files: PascalCase — `ProductCard.tsx`, `AdminSidebar.tsx`
- Utility files: camelCase — `server.ts`, `categories.ts`
- API route files: always `route.ts`
- One component per file — never export multiple components from one file
- Page components: default export (Next.js convention)
- Shared components: named exports only

## Component Structure

Every component follows this exact order:

```typescript
'use client'; // only if needed

// 1. External imports
import { useState } from 'react';
import Link from 'next/link';

// 2. Internal imports
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/categories';

// 3. Type definitions
type Props = {
  product: Product;
  variant?: 'default' | 'compact';
};

// 4. Component
export function ComponentName({ product, variant = 'default' }: Props) {
  // state
  // derived values
  // handlers
  // return JSX
}
```

- Props type defined directly above the component — not in a separate file unless shared across multiple components
- No inline styles — all styling via Tailwind classes using tokens from ui-tokens.md

## InsForge SDK Usage

```typescript
// Server context — Server Components, Route Handlers, Server Actions
import { createInsForgeServerClient } from '@/lib/insforge/server';

const insforge = await createInsForgeServerClient();

// Browser context — Client Components only
import { insforge } from '@/lib/insforge/client';
```

**Rules:**

- Always handle the `{ data, error }` return structure
- Never assume queries succeed — check for errors
- Database inserts require array format: `[{...}]`
- Always scope mutations to the authenticated user when applicable

## Styling

- Use Tailwind CSS v4 with `@tailwindcss/postcss`
- All design tokens defined via `@theme` in `globals.css` — no `tailwind.config.ts`
- Never hardcode colors — use project token classes (e.g., `bg-brand-700`, `text-accent-500`)
- Never use raw Tailwind color classes (e.g., `bg-blue-500`, `text-gray-600`)
- Two design systems coexist: main (brand/accent tokens) and figma (figma-\* tokens)
- Use the correct token set based on which frontend the component belongs to

## Admin Code

- Admin layout checks auth server-side — redirects to `/sign-in` if no user
- Admin sidebar is a client component (uses `useState`, `usePathname`)
- Admin CRUD pages use Server Actions for mutations
- Image uploads go to InsForge Storage `product-images` bucket
- Always `revalidatePath()` after mutations
