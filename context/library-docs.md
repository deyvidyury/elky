# Library Docs

Project-specific usage patterns for every third party library in this project. Read the relevant section before implementing any feature that touches these libraries.

## Before Using Any Library

1. **Check AGENTS.md** at the project root — it lists every skill installed for this project and how to use them.
2. **Check if an MCP server is configured** for that library — use MCP tools when available.
3. **Read this file** for project-specific patterns.

The order of authority:

```
MCP server (real-time docs) → Skills via AGENTS.md → This file (project rules) → General training knowledge
```

---

## InsForge SDK (`@insforge/sdk`)

### Client vs Server

Two separate files — never mix them:

**Server client** (`src/lib/insforge/server.ts`):

```typescript
import { createServerClient } from '@insforge/sdk/ssr';
import { cookies } from 'next/headers';

export async function createInsForgeServerClient() {
  return createServerClient({
    cookies: await cookies(),
  });
}
```

**Browser client** (`src/lib/insforge/client.ts`):

```typescript
import { createBrowserClient } from '@insforge/sdk/ssr';

const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_URL!;
const anonKey = process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY!;

export const insforge = createBrowserClient({ baseUrl, anonKey });
```

**Rules:**

- `createInsForgeServerClient()` — Server Components, Route Handlers, Server Actions, data-fetching in `lib/data.ts`
- `insforge` (browser) — Client Components only (e.g., realtime subscriptions)
- Never import server client in a client component
- Never import browser client in a server component

### Auth

```typescript
// Get current user (server-side)
const insforge = await createInsForgeServerClient();
const { data } = await insforge.auth.getCurrentUser();
const user = data?.user ?? null;

// Check admin role
const isAdmin = !!(
  user?.metadata && (user.metadata as Record<string, unknown>).role === 'admin'
);

// Redirect if not authenticated
if (!user) {
  redirect('/sign-in');
}
```

**Rules:**

- Always check auth server-side — never rely on client-side checks alone
- Admin role lives in `user.metadata.role`
- Auth callback route at `/api/auth/callback`

### DB Queries

```typescript
const insforge = await createInsForgeServerClient();

// Read — with joins
const { data: products } = await insforge.database
  .from("products")
  .select("*, categories(id, name, slug)")
  .eq("featured", true)
  .order("name");

// Read — single
const { data, error } = await insforge.database
  .from("products")
  .select("*")
  .eq("slug", slug)
  .single();

// Insert
const { data, error } = await insforge.database
  .from("products")
  .insert([{ name, slug, category_id, price, ... }])
  .select()
  .single();

// Update
const { error } = await insforge.database
  .from("products")
  .update({ name, price, ... })
  .eq("id", productId);

// Delete
const { error } = await insforge.database
  .from("products")
  .delete()
  .eq("id", productId);
```

**Rules:**

- Inserts always use array format: `insert([{...}])`
- Use `.single()` when expecting exactly one row
- Always handle the `error` return — never assume success
- Public-facing queries don't need user_id filter (public data)
- Admin mutations use RLS policies for authorization

### Storage

```typescript
// Upload file
const { data, error } = await insforge.storage
  .from('product-images')
  .upload(imageKey, fileBuffer, {
    contentType: 'image/jpeg',
    upsert: true,
  });

// Get public URL
const { data } = insforge.storage.from('product-images').getPublicUrl(imageKey);

const imageUrl = data.publicUrl;
```

**Rules:**

- Bucket: `product-images`
- Always save both `image_key` and `image_url` to the product row
- Use `upsert: true` to overwrite existing images
- Public read access via bucket RLS policy

---

## Next.js 15

### Server Components (Default)

```typescript
// app/produtos/page.tsx
import { getFeaturedProducts } from "@/lib/data";

export default async function ProdutosPage() {
  const products = await getFeaturedProducts();

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
```

### Client Components

Only add `"use client"` when the component uses:

- `useState`, `useEffect`, `useReducer`
- `usePathname`, `useSearchParams`
- Browser APIs (window, localStorage, etc.)
- Event listeners

### Route Handlers

```typescript
// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Handle OAuth callback
}
```

### Server Actions

Server Actions are in `src/lib/insforge/actions.ts`:

```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { createInsForgeServerClient } from '@/lib/insforge/server';

export async function deleteProduct(productId: string) {
  const insforge = await createInsForgeServerClient();
  const { error } = await insforge.database
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) return { success: false, error: error.message };

  revalidatePath('/admin/produtos');
  return { success: true };
}
```

**Rules:**

- Always `revalidatePath()` after mutations
- Always return `{ success: boolean, error?: string }`
- Never throw from Server Actions — return the error

---

## Tailwind CSS v4

### Theme Configuration

All tokens in `src/app/globals.css` via `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-brand-900: #0f1f35;
  --font-sans: 'Inter', sans-serif;
}
```

**Rules:**

- No `tailwind.config.ts` — all tokens via `@theme`
- Classes auto-generated from `--color-*` tokens
- Use `@apply` sparingly — prefer utility classes directly in JSX

### PostCSS

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```
