# Architecture

## Stack

| Layer         | Tool                        | Purpose                                |
| ------------- | --------------------------- | -------------------------------------- |
| Framework     | Next.js 15 (App Router)     | Full stack framework                   |
| Backend       | InsForge                    | Auth + DB + Storage + Realtime         |
| Styling       | Tailwind CSS v4             | Utility-first CSS with `@theme` tokens |
| Language      | TypeScript strict           | Throughout                             |
| Hosting       | Vercel                      | Frontend deployment                    |
| Auth Provider | Google OAuth (via InsForge) | Admin authentication                   |

## Folder Structure

```
/
├── AGENTS.md
├── insforge.toml                         → InsForge backend configuration
├── context/
│   ├── project-overview.md
│   ├── architecture.md
│   ├── ui-tokens.md
│   ├── ui-rules.md
│   ├── ui-registry.md
│   ├── code-standards.md
│   ├── library-docs.md
│   ├── build-plan.md
│   └── progress-tracker.md
├── src/
│   ├── app/
│   │   ├── layout.tsx                    → Root layout (metadata + body)
│   │   ├── globals.css                   → Tailwind v4 @theme tokens
│   │   ├── page.tsx                      → Main homepage
│   │   ├── (auth)/
│   │   │   └── sign-in/
│   │   │       └── page.tsx              → Google OAuth sign-in
│   │   ├── admin/
│   │   │   ├── layout.tsx                → Admin layout (auth guard + sidebar)
│   │   │   ├── page.tsx                  → Admin dashboard
│   │   │   ├── SignOutButton.tsx
│   │   │   ├── categorias/
│   │   │   │   ├── page.tsx              → Category list
│   │   │   │   ├── CategoryForm.tsx
│   │   │   │   ├── DeleteCategoryButton.tsx
│   │   │   │   ├── nova/page.tsx         → Create category
│   │   │   │   └── [id]/editar/page.tsx  → Edit category
│   │   │   └── produtos/
│   │   │       ├── page.tsx              → Product list
│   │   │       ├── ProductForm.tsx
│   │   │       ├── DeleteProductButton.tsx
│   │   │       ├── novo/page.tsx         → Create product
│   │   │       └── [id]/editar/page.tsx  → Edit product
│   │   ├── figma/
│   │   │   ├── layout.tsx                → Figma layout (FigmaHeader + FigmaFooter)
│   │   │   ├── page.tsx                  → Figma homepage
│   │   │   ├── produtos/
│   │   │   │   └── page.tsx              → Figma product listing
│   │   │   ├── categorias/
│   │   │   │   └── [category]/
│   │   │   │       └── page.tsx          → Figma category page
│   │   │   ├── produtos/
│   │   │   │   └── [category]/
│   │   │   │       └── [slug]/
│   │   │   │           └── page.tsx      → Figma product detail
│   │   │   ├── sobre/page.tsx
│   │   │   ├── contato/page.tsx
│   │   │   ├── politica-de-privacidade/page.tsx
│   │   │   └── termos-de-uso/page.tsx
│   │   ├── produtos/
│   │   │   ├── page.tsx                  → Main product listing
│   │   │   └── [category]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx          → Main product detail
│   │   ├── categorias/
│   │   │   └── [category]/
│   │   │       └── page.tsx              → Main category page
│   │   ├── sobre/page.tsx
│   │   ├── contato/page.tsx
│   │   ├── politica-de-privacidade/page.tsx
│   │   ├── termos-de-uso/page.tsx
│   │   └── api/
│   │       └── auth/
│   │           ├── callback/route.ts     → OAuth callback handler
│   │           └── refresh/route.ts      → Token refresh
│   ├── components/
│   │   ├── Header.tsx                    → Main site header
│   │   ├── Footer.tsx                    → Main site footer
│   │   ├── FigmaHeader.tsx               → Figma site header
│   │   ├── FigmaFooter.tsx               → Figma site footer
│   │   ├── FigmaProductCard.tsx          → Figma-styled product card
│   │   ├── ProductCard.tsx               → Main-styled product card
│   │   ├── AdminSidebar.tsx              → Admin navigation (responsive)
│   │   ├── AuthButton.tsx                → Sign-in / user menu
│   │   ├── AdUnit.tsx                    → Ad placeholder
│   │   └── Breadcrumb.tsx               → Breadcrumb navigation
│   └── lib/
│       ├── categories.ts                 → Shared TypeScript types
│       ├── data.ts                       → Shared data-fetching functions (Phase 1)
│       └── insforge/
│           ├── server.ts                 → InsForge server client factory
│           └── client.ts                 → InsForge browser client instance
```

## System Boundaries

| Folder        | Owns                                                                               |
| ------------- | ---------------------------------------------------------------------------------- |
| `app/`        | Pages and API routes only. Data fetching via shared `lib/data.ts` functions.       |
| `components/` | UI only. No data fetching logic. No direct DB calls. Presentation and interaction. |
| `lib/`        | Shared utilities, types, InsForge client initialization, data-fetching functions.  |
| `context/`    | Documentation only. No code. Build plans, design tokens, progress tracking.        |

## Data Flow

### Public Pages (Server Components)

```
User requests page
        ↓
Server Component calls shared function from lib/data.ts
        ↓
createInsForgeServerClient() → InsForge DB query
        ↓
Data returned, rendered as HTML
        ↓
Sent to client
```

### Admin Mutations (Server Actions)

```
Admin submits form in Client Component
        ↓
Server Action in lib/insforge/actions.ts
        ↓
InsForge DB write (insert/update/delete)
        ↓
Storage upload if image provided
        ↓
revalidatePath() → page re-renders
```

### Auth Flow

```
User clicks Sign In
        ↓
Redirect to InsForge OAuth (Google)
        ↓
Callback at /api/auth/callback
        ↓
InsForge sets session cookie
        ↓
Server Components read user via getCurrentUser()
        ↓
Admin check: metadata.role === "admin"
```

## InsForge Database Schema

### `categories`

| Column      | Type | Notes              |
| ----------- | ---- | ------------------ |
| id          | uuid | PK, auto-generated |
| slug        | text | URL-safe, unique   |
| name        | text | Display name       |
| description | text | Short description  |
| icon        | text | Emoji character    |

### `products`

| Column      | Type  | Notes                      |
| ----------- | ----- | -------------------------- |
| id          | uuid  | PK, auto-generated         |
| slug        | text  | URL-safe identifier        |
| name        | text  | Product name               |
| category_id | uuid  | FK → categories.id         |
| price       | text  | Display price string       |
| image_url   | text  | Public Storage URL         |
| image_key   | text  | Storage object key         |
| description | text  | Product description        |
| specs       | jsonb | `{ "key": "value" }` pairs |
| supplier    | text  | Nullable supplier name     |
| featured    | bool  | Featured on homepage       |
