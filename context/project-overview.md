# Project Overview

## About the Project

Guia de Suprimentos is a curated product guide for restaurant owners — a catalog-style Next.js site that helps restaurateurs find and compare equipment, cleaning supplies, and kitchen essentials. Think of it as a "buyer's guide" rather than an e-commerce store: no cart, no checkout, just clear, detailed product information to help owners make informed purchasing decisions.

The site is built with two interchangeable frontends (main brand design and a figma-inspired e-commerce design) as an experiment to find the best visual fit. Both frontends pull from the same InsForge backend.

## The Problem It Solves

Restaurant owners waste hours searching across multiple supplier sites, comparing specs, and trying to figure out which products are actually worth buying. There's no single place in the Brazilian market that catalogs and compares restaurant supplies with clear, consistent information. Guia de Suprimentos fills that gap — organized by category, with detailed specs, pricing, and supplier information all in one place.

## Pages

```
/                                    → Homepage (main design)
/figma                               → Homepage (experimental design)
/produtos                            → All products listing
/produtos/[category]/[slug]          → Individual product detail
/categorias/[category]               → Products filtered by category
/sobre                               → About page
/contato                             → Contact page
/politica-de-privacidade             → Privacy policy
/termos-de-uso                       → Terms of use
/sign-in                             → Google OAuth sign-in
/admin                               → Admin dashboard
/admin/produtos                      → Manage products (CRUD)
/admin/produtos/novo                 → Create product
/admin/produtos/[id]/editar          → Edit product
/admin/categorias                    → Manage categories (CRUD)
/admin/categorias/nova               → Create category
/admin/categorias/[id]/editar        → Edit category
```

## Navigation

Main site: top sticky header with logo, nav links (Produtos, Limpeza, Cozinha, Refrigeração, Lavagem, Utensílios), and auth button. Full-width layout.

Admin: dedicated sidebar navigation — fixed on desktop, hamburger drawer on mobile. No main site header/footer on admin routes.

Figma: its own header (dark theme, announcement bar, minimalist nav) and footer.

## Core User Flow

### Public visitors

- Land on homepage → browse categories or featured products
- Click category → see filtered product list
- Click product → see full details (specs, price, supplier, description)
- Static pages (sobre, contato, etc.) provide company info

### Admin users

- Sign in via Google OAuth
- Admin button appears in header for users with `metadata.role = "admin"`
- Admin panel: dashboard, CRUD for categories and products
- Product management: upload images to InsForge Storage, set featured flag, add dynamic specs

## Data Architecture

### Database (InsForge PostgreSQL)

**categories** — product categories with icons (emoji-based)
| Column | Type | Notes |
|-------------|--------|------------------------------|
| id | uuid | Primary key |
| slug | text | URL-safe identifier |
| name | text | Display name |
| description | text | Short category description |
| icon | text | Emoji icon |

**products** — individual product listings
| Column | Type | Notes |
|-------------|--------|------------------------------|
| id | uuid | Primary key |
| slug | text | URL-safe identifier |
| name | text | Product name |
| category_id | uuid | FK → categories.id |
| price | text | Display price (e.g. "R$ 150")|
| image_url | text | Public image URL |
| image_key | text | Storage key for the image |
| description | text | Product description |
| specs | jsonb | Dynamic key-value specs |
| supplier | text | Supplier name (nullable) |
| featured | bool | Show on homepage highlights |

### Storage (InsForge Storage)

**product-images** bucket — public read, admin-only write via RLS. Product images uploaded by admin, served as public URLs.

### Authorization

JWT-based Row Level Security via InsForge:

- Public: SELECT on categories and products
- Admin (`auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`): full CRUD on categories and products, write access to product-images bucket

## Features In Scope

- Two interchangeable frontend designs (main brand + figma)
- Shared data-fetching core (`lib/data.ts`)
- Product catalog with categories, specs, pricing
- Featured products on homepage
- Full admin CRUD panel (categories + products)
- Image upload to InsForge Storage
- Google OAuth authentication via InsForge
- Server-side auth checks for protected routes
- Responsive design — mobile hamburger for admin, horizontal scroll for tables
- SEO metadata (OpenGraph, robots)
- AdUnit placeholder component

## Features Out of Scope

- Shopping cart or checkout
- User accounts for non-admin visitors
- Product reviews or ratings (currently static/hardcoded)
- Search functionality
- Pagination
- Order tracking or analytics
- Email notifications
- Multi-language support
- Payment processing
