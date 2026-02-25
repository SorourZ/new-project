# Cocolime — Complete Website Specification
> Senior Product Design + Frontend Architecture Document
> Version 1.0 | February 2026

---

## Executive Summary

Cocolime is a premium beauty/cosmetics ecommerce brand requiring a polished, conversion-optimised digital storefront. The architecture is designed as a **decoupled frontend** (Next.js 14 App Router) consuming an existing REST backend, with a **token-based design system** that allows brand color swap at a single source of truth. The site supports full transactional flows (browse → cart → checkout → orders) with secure JWT-based auth delegated entirely to the existing backend.

**Core principles:**
- Frontend is a pure presentation/interaction layer — zero business logic ownership
- Design tokens → every visual decision is a CSS custom property
- Mobile-first, WCAG AA accessible, Core Web Vitals–optimised
- SEO-ready with SSR/ISR for catalog pages, CSR for authenticated views

---

## 1. Information Architecture

### 1.1 Full Sitemap

```
/                          → Home
├── /products              → All Products
├── /category/[slug]       → Category Listing (Skincare, Makeup…)
│   └── /[sub-slug]        → Subcategory Listing
│       └── /[type-slug]   → Product Type Listing
├── /products/[slug]       → Product Detail Page (PDP)
├── /search                → Search Results
├── /cart                  → Cart Page
├── /checkout              → Checkout Flow
│   ├── /checkout/info     → Contact + Shipping Info
│   ├── /checkout/shipping → Shipping Method
│   ├── /checkout/payment  → Payment
│   └── /checkout/confirm  → Order Confirmation
├── /account               → Account Dashboard (protected)
│   ├── /account/profile   → Profile & Preferences
│   ├── /account/addresses → Saved Addresses
│   ├── /account/orders    → Order History
│   │   └── /[orderId]     → Order Detail
│   └── /account/wishlist  → Wishlist
├── /auth
│   ├── /auth/login        → Login
│   ├── /auth/register     → Registration
│   └── /auth/forgot       → Password Reset
├── /about                 → Brand Story
├── /contact               → Contact & Support
└── /legal
    ├── /legal/privacy     → Privacy Policy
    ├── /legal/terms       → Terms of Service
    └── /legal/returns     → Returns & Refunds
```

### 1.2 Navigation Tree (Category Taxonomy — 3 Levels)

| L1 Category   | L2 Subcategory       | L3 Product Type                              |
|---------------|----------------------|----------------------------------------------|
| **Skincare**  | Cleansers            | Gel Cleanser, Foam Cleanser, Micellar Water  |
|               | Moisturisers         | Day Cream, Night Cream, Gel Moisturiser      |
|               | Serums               | Vitamin C, Retinol, Hyaluronic Acid          |
|               | Eye Care             | Eye Cream, Eye Patches                       |
|               | Sun Protection       | SPF Moisturiser, Sunscreen Spray             |
|               | Masks & Treatments   | Clay Mask, Sheet Mask, Exfoliant             |
| **Makeup**    | Face                 | Foundation, Concealer, Primer, Blush         |
|               | Eyes                 | Mascara, Eyeliner, Eyeshadow, Brow           |
|               | Lips                 | Lipstick, Lip Gloss, Lip Liner               |
|               | Setting              | Setting Spray, Powder, Bronzer               |
| **Haircare**  | Shampoo & Conditioner| Shampoo, Conditioner, Co-Wash               |
|               | Treatments           | Hair Mask, Serum, Oil                        |
|               | Styling              | Curl Cream, Heat Protectant, Dry Shampoo     |
|               | Scalp Care           | Scalp Serum, Scalp Scrub                     |
| **Fragrance** | Women's              | Eau de Parfum, Eau de Toilette               |
|               | Men's                | Cologne, Aftershave                          |
|               | Unisex               | Unisex EDP, Body Mist                        |
|               | Home Fragrance       | Candle, Diffuser, Room Spray                 |
| **Tools**     | Face Tools           | Gua Sha, Roller, Cleansing Brush             |
|               | Makeup Tools         | Brushes, Sponges, Applicators                |
|               | Hair Tools           | Combs, Diffusers, Clips                      |
| **Body**      | Cleanse              | Body Wash, Bar Soap, Scrub                   |
|               | Moisturise           | Body Lotion, Body Butter, Body Oil           |
|               | Deodorant            | Roll-On, Stick, Spray                        |
| **Gifts**     | Gift Sets            | Skincare Set, Makeup Set, Fragrance Set      |
|               | Gift Cards           | Digital, Physical                            |

### 1.3 Breadcrumb Structure

```
Home > Skincare > Serums > Vitamin C Serum
Home > Search: "retinol"
Home > Account > Orders > #ORD-2024-00123
Home > Cart
Home > Checkout
```

---

## 2. UX Flows

### 2.1 Guest Browsing Flow

```
Landing (/)
  → [Browse categories via mega menu]
  → Category Page (/category/skincare)
  → Subcategory Page (/category/skincare/serums)
  → PDP (/products/vitamin-c-serum)
  → Add to Cart (cart drawer opens)
  → Cart (/cart)
  → Checkout → [Gate: must register or continue as guest]
```

### 2.2 Registration Flow

```
/auth/register
  → Input: first_name, last_name, email, password, confirm_password
  → Client validation → POST /api/auth/register
  → Success: auto-login + redirect to /account or previous page
  → Error: inline field errors from backend 422 response
```

### 2.3 Login Flow

```
/auth/login
  → Input: email, password
  → POST /api/auth/login → JWT access_token + refresh_token
  → Tokens stored in httpOnly cookies (set by backend Set-Cookie)
  → Redirect to /account or returnUrl param
  → Failure: "Invalid email or password" toast
```

### 2.4 Add-to-Cart + Checkout Flow

```
PDP → Select variant → Add to Cart
  → POST /api/cart/items → optimistic UI update
  → Cart Drawer slides open (mini cart)
  → /cart → Review items, update quantities, apply coupon
  → /checkout/info → Email + Shipping address
  → /checkout/shipping → Shipping method selection
  → /checkout/payment → Credit card / PayPal / Apple Pay
  → POST /api/orders → Order created on backend
  → /checkout/confirm → Order summary + confirmation number
  → Email confirmation sent by backend
```

### 2.5 Post-Purchase Order Tracking Flow

```
/account/orders → Order list
  → /account/orders/[orderId] → Order detail
  → Tracking number link → External courier site
  → "Return Item" → Initiate return via backend API
```

### 2.6 Error / Empty / Loading States

| State        | Component Behavior                                              |
|--------------|-----------------------------------------------------------------|
| Loading      | Skeleton cards (shimmer animation), spinner in CTA buttons      |
| Empty cart   | Illustration + "Start Shopping" CTA                             |
| Empty search | "No results for X" + suggested categories                       |
| 404          | Brand-styled page + navigation back                             |
| API error    | Toast notification (top-right) with retry option where possible |
| Form error   | Inline field error below input, red border, icon                |
| Out of stock | Disabled Add to Cart, "Notify Me" email capture                 |

---

## 3. Design Token System

### 3.1 Color Tokens (Swap-Ready Placeholders)

```css
:root {
  /* Brand — replace with final Cocolime palette */
  --color-brand-primary:     #C8A882;   /* placeholder: warm gold */
  --color-brand-secondary:   #2D2D2D;   /* placeholder: near-black */
  --color-brand-accent:      #F5EDE0;   /* placeholder: soft cream */
  --color-brand-highlight:   #D4956A;   /* placeholder: terracotta */

  /* Neutrals */
  --color-neutral-0:         #FFFFFF;
  --color-neutral-50:        #FAFAFA;
  --color-neutral-100:       #F5F5F5;
  --color-neutral-200:       #E5E5E5;
  --color-neutral-300:       #D4D4D4;
  --color-neutral-400:       #A3A3A3;
  --color-neutral-500:       #737373;
  --color-neutral-600:       #525252;
  --color-neutral-700:       #404040;
  --color-neutral-800:       #262626;
  --color-neutral-900:       #171717;

  /* Semantic */
  --color-success:           #22C55E;
  --color-warning:           #F59E0B;
  --color-error:             #EF4444;
  --color-info:              #3B82F6;

  /* Surface */
  --color-surface-page:      var(--color-neutral-0);
  --color-surface-card:      var(--color-neutral-0);
  --color-surface-subtle:    var(--color-neutral-50);
  --color-surface-overlay:   rgba(0,0,0,0.48);
}
```

### 3.2 Typography Tokens

```css
:root {
  /* Font families */
  --font-display:  'Playfair Display', Georgia, serif;     /* headings */
  --font-body:     'DM Sans', system-ui, sans-serif;       /* body text */
  --font-mono:     'JetBrains Mono', monospace;            /* code/IDs */

  /* Scale (Major Third — 1.250) */
  --text-xs:    0.64rem;    /* 10.24px */
  --text-sm:    0.8rem;     /* 12.8px  */
  --text-base:  1rem;       /* 16px    */
  --text-lg:    1.25rem;    /* 20px    */
  --text-xl:    1.563rem;   /* 25px    */
  --text-2xl:   1.953rem;   /* 31px    */
  --text-3xl:   2.441rem;   /* 39px    */
  --text-4xl:   3.052rem;   /* 49px    */
  --text-5xl:   3.815rem;   /* 61px    */

  /* Weight */
  --font-weight-regular:    400;
  --font-weight-medium:     500;
  --font-weight-semibold:   600;
  --font-weight-bold:       700;

  /* Leading */
  --leading-tight:   1.1;
  --leading-snug:    1.35;
  --leading-normal:  1.5;
  --leading-relaxed: 1.7;

  /* Tracking */
  --tracking-tight:  -0.02em;
  --tracking-normal: 0;
  --tracking-wide:   0.08em;
  --tracking-widest: 0.15em;
}
```

### 3.3 Spacing & Layout Tokens

```css
:root {
  /* 4px base grid */
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Container widths */
  --container-sm:   640px;
  --container-md:   768px;
  --container-lg:   1024px;
  --container-xl:   1280px;
  --container-2xl:  1536px;
  --container-max:  1440px;

  /* Border radius */
  --radius-sm:   2px;
  --radius-md:   6px;
  --radius-lg:   12px;
  --radius-xl:   20px;
  --radius-2xl:  32px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-xs:  0 1px 2px rgba(0,0,0,0.05);
  --shadow-sm:  0 1px 3px rgba(0,0,0,0.10), 0 1px 2px rgba(0,0,0,0.06);
  --shadow-md:  0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.05);
  --shadow-lg:  0 10px 15px rgba(0,0,0,0.10), 0 4px 6px rgba(0,0,0,0.05);
  --shadow-xl:  0 20px 25px rgba(0,0,0,0.10), 0 10px 10px rgba(0,0,0,0.04);
  --shadow-card: 0 2px 20px rgba(0,0,0,0.06);

  /* Motion */
  --duration-fast:   100ms;
  --duration-normal: 200ms;
  --duration-slow:   350ms;
  --duration-slower: 500ms;
  --ease-out:        cubic-bezier(0.0, 0, 0.2, 1);
  --ease-in:         cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Z-index scale */
  --z-base:    0;
  --z-raised:  10;
  --z-dropdown: 100;
  --z-sticky:  200;
  --z-overlay: 300;
  --z-modal:   400;
  --z-toast:   500;
}
```

---

## 4. Component Library

### 4.1 Navbar
- Desktop: Logo (center or left) | Primary nav links | Icons (search, wishlist, account, cart)
- Mega menu opens on hover/click with category grid
- Mobile: Hamburger → full-screen drawer with accordion categories
- Sticky on scroll with background blur + reduced height
- Cart icon shows item count badge

### 4.2 Category Mega Menu
- 3-column layout: L1 categories left, L2 subcategories center, featured products/imagery right
- Keyboard navigable, focus-trapped
- Close on Escape, outside click

### 4.3 Product Card
- Aspect ratio: 3:4 (portrait)
- Image with hover second image crossfade
- Quick-add button overlay on hover
- Wishlist heart toggle (top-right)
- Brand, name, price (+ sale price strikethrough)
- Star rating + review count
- "New" / "Sale" / "Low Stock" badges
- Skeleton loading state

### 4.4 Filters Sidebar / Drawer
- Category chips (horizontal scroll mobile)
- Price range slider
- Multi-select checkboxes: Brand, Skin Type, Concern, Shade, Size
- Active filters chips bar with X per filter + "Clear all"
- "Apply" CTA on mobile (drawer)

### 4.5 PDP Gallery
- Main image large view + thumbnail strip
- Pinch-to-zoom on mobile
- Zoom modal on desktop click
- Image count indicator

### 4.6 Cart Drawer
- Slides from right, 400px wide
- Line items: thumbnail + name + variant + qty stepper + line total + remove
- Order summary: subtotal, shipping estimate, discount, total
- "View Cart" + "Checkout" CTAs
- Upsell row: "You might also like"

### 4.7 Checkout Steps
- Progress bar: Info → Shipping → Payment → Confirm
- Express checkout: Apple Pay / Google Pay / PayPal
- Address autocomplete (Google Places)
- Real-time form validation
- Order summary sidebar (collapsible on mobile)

### 4.8 Account Dashboard
- Sidebar navigation (desktop) / tab bar (mobile)
- Profile: avatar upload, name, email, phone, DOB
- Addresses: default + saved list, add/edit/delete
- Orders: status chips (Processing/Shipped/Delivered/Cancelled), tracking link
- Wishlist: product cards grid with move-to-cart

### 4.9 Forms
- Floating label inputs
- Password strength meter on register
- Show/hide password toggle
- Error state with icon + message below field
- Success state checkmark
- Loading state disabled + spinner

### 4.10 Toast Notifications
- Position: top-right (desktop), top-center (mobile)
- Types: success (green), error (red), warning (amber), info (blue)
- Auto-dismiss after 4s with progress bar
- Close X button
- Stacks up to 3, older ones exit first

### 4.11 Modals
- Centered overlay, max-width 480px
- Focus trapped, Escape to close
- Backdrop click closes (optional)
- Animation: scale + fade in from center

---

## 5. Backend Integration Contract

### 5.1 API Integration Map

| Domain         | Method | Endpoint                        | Auth Required |
|----------------|--------|---------------------------------|---------------|
| Auth — Login   | POST   | /api/auth/login                 | No            |
| Auth — Register| POST   | /api/auth/register              | No            |
| Auth — Logout  | POST   | /api/auth/logout                | Yes           |
| Auth — Refresh | POST   | /api/auth/refresh               | No (cookie)   |
| Auth — ForgotPW| POST   | /api/auth/forgot-password       | No            |
| Profile — Get  | GET    | /api/account/profile            | Yes           |
| Profile — Update| PUT   | /api/account/profile            | Yes           |
| Addresses — List| GET   | /api/account/addresses          | Yes           |
| Addresses — Add | POST  | /api/account/addresses          | Yes           |
| Addresses — Edit| PUT   | /api/account/addresses/:id      | Yes           |
| Addresses — Del | DELETE| /api/account/addresses/:id      | Yes           |
| Products — List | GET   | /api/products?category=&page=   | No            |
| Products — Get  | GET   | /api/products/:slug             | No            |
| Products — Search| GET  | /api/products/search?q=         | No            |
| Categories — List| GET  | /api/categories                 | No            |
| Categories — Get | GET  | /api/categories/:slug           | No            |
| Cart — Get      | GET   | /api/cart                       | Yes/Guest     |
| Cart — Add Item | POST  | /api/cart/items                 | Yes/Guest     |
| Cart — Update   | PUT   | /api/cart/items/:itemId         | Yes/Guest     |
| Cart — Remove   | DELETE| /api/cart/items/:itemId         | Yes/Guest     |
| Cart — Coupon   | POST  | /api/cart/coupon                | Yes/Guest     |
| Orders — Create | POST  | /api/orders                     | Yes           |
| Orders — List   | GET   | /api/account/orders             | Yes           |
| Orders — Get    | GET   | /api/account/orders/:orderId    | Yes           |
| Wishlist — List | GET   | /api/account/wishlist           | Yes           |
| Wishlist — Add  | POST  | /api/account/wishlist           | Yes           |
| Wishlist — Remove| DELETE| /api/account/wishlist/:productId| Yes          |

### 5.2 Request/Response Examples

**POST /api/auth/login**
```json
// Request
{ "email": "user@example.com", "password": "Secret123!" }

// Response 200
{
  "access_token": "eyJhbGci...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "usr_abc123",
    "email": "user@example.com",
    "first_name": "Amira",
    "last_name": "Chen",
    "avatar_url": null
  }
}

// Response 401
{ "error": "invalid_credentials", "message": "Email or password is incorrect" }
```

**POST /api/auth/register**
```json
// Request
{
  "first_name": "Amira",
  "last_name": "Chen",
  "email": "amira@example.com",
  "password": "Secret123!",
  "accepts_marketing": true
}

// Response 201
{
  "access_token": "eyJhbGci...",
  "user": { "id": "usr_xyz", "email": "amira@example.com", ... }
}

// Response 422
{
  "error": "validation_error",
  "errors": {
    "email": ["Email is already taken"],
    "password": ["Must be at least 8 characters"]
  }
}
```

**GET /api/products?category=skincare&subcategory=serums&page=1&limit=24&sort=newest**
```json
// Response 200
{
  "data": [
    {
      "id": "prod_111",
      "slug": "vitamin-c-brightening-serum",
      "name": "Vitamin C Brightening Serum",
      "brand": "Cocolime",
      "price": 4200,        // cents/pence — always integer
      "compare_at_price": 5500,
      "currency": "GBP",
      "images": [
        { "id": "img_1", "url": "https://cdn.../serum.jpg", "alt": "..." }
      ],
      "variants": [...],
      "rating": { "average": 4.7, "count": 312 },
      "badges": ["new"],
      "in_stock": true
    }
  ],
  "pagination": {
    "page": 1, "limit": 24, "total": 87, "total_pages": 4
  },
  "filters_available": {
    "brands": [...], "skin_types": [...], "concerns": [...]
  }
}
```

**POST /api/cart/items**
```json
// Request
{
  "product_id": "prod_111",
  "variant_id": "var_30ml",
  "quantity": 1
}

// Response 200
{
  "cart": {
    "id": "cart_abc",
    "items": [
      {
        "id": "item_xyz",
        "product": { "id": "prod_111", "name": "...", "image": "..." },
        "variant": { "id": "var_30ml", "name": "30ml", "price": 4200 },
        "quantity": 1,
        "line_total": 4200
      }
    ],
    "subtotal": 4200,
    "discount": 0,
    "total": 4200,
    "currency": "GBP"
  }
}
```

**POST /api/orders**
```json
// Request
{
  "cart_id": "cart_abc",
  "shipping_address": {
    "first_name": "Amira", "last_name": "Chen",
    "line1": "12 Rose Lane", "city": "London",
    "postcode": "SW1A 1AA", "country": "GB", "phone": "+447911123456"
  },
  "shipping_method_id": "ship_standard",
  "payment": {
    "method": "stripe",
    "payment_intent_id": "pi_abc123"
  },
  "coupon_code": null,
  "accepts_terms": true
}

// Response 201
{
  "order": {
    "id": "ord_def456",
    "order_number": "ORD-2024-00123",
    "status": "processing",
    "total": 4200,
    "estimated_delivery": "2024-03-05"
  }
}
```

### 5.3 Validation Requirements

| Field           | Rules                                                           |
|-----------------|-----------------------------------------------------------------|
| email           | Required, valid format, max 255 chars                          |
| password        | Required, min 8 chars, 1 uppercase, 1 digit, 1 special char   |
| first_name      | Required, min 1, max 50, letters/hyphens/apostrophes only     |
| last_name       | Required, min 1, max 50                                        |
| phone           | Optional, E.164 format (+447...)                               |
| postcode        | Required at checkout, format validated per country             |
| quantity        | Integer, min 1, max stock limit from backend                   |
| coupon_code     | Max 20 chars, alphanumeric + hyphen                            |

### 5.4 Error Handling Strategy

```
HTTP 400 → Bad Request: show field-level errors from response body
HTTP 401 → Unauthorized: redirect to /auth/login with returnUrl
HTTP 403 → Forbidden: show "Access denied" toast, redirect home
HTTP 404 → Not Found: render 404 page component
HTTP 409 → Conflict (e.g. email taken): show inline field error
HTTP 422 → Validation Error: map errors{} to form fields
HTTP 429 → Rate Limited: show "Too many attempts, wait X seconds"
HTTP 500 → Server Error: show generic error toast + log to Sentry
Network  → Timeout/offline: show "Check connection" banner
```

### 5.5 Token/Session Handling

```
1. POST /api/auth/login → backend sets httpOnly Secure SameSite=Strict cookies:
   - access_token (expires: 1h)
   - refresh_token (expires: 30d)

2. All subsequent requests: browser sends cookies automatically

3. On 401: middleware calls POST /api/auth/refresh (refresh_token cookie)
   - Success: new access_token cookie set, original request retried
   - Failure: clear all auth cookies → redirect to /auth/login

4. Frontend NEVER stores tokens in localStorage or JS-accessible state

5. Server-side: Next.js middleware reads cookie to determine auth state
   - Protects /account/* routes
   - Passes user context to RSC via headers
```

### 5.6 Form Field → Backend Payload Mapping

| Form Field UI Label       | JSON Key             | Notes                          |
|---------------------------|----------------------|--------------------------------|
| First Name                | first_name           |                                |
| Last Name                 | last_name            |                                |
| Email Address             | email                | lowercase trimmed              |
| Password                  | password             | never logged/displayed         |
| Confirm Password          | —                    | client-only validation         |
| Subscribe to newsletter   | accepts_marketing    | boolean                        |
| Address Line 1            | line1                |                                |
| Address Line 2            | line2                | optional                       |
| City / Town               | city                 |                                |
| Postcode / ZIP            | postcode             | uppercase trimmed              |
| Country                   | country              | ISO 3166-1 alpha-2             |
| Phone Number              | phone                | E.164 format                   |
| Set as default            | is_default           | boolean                        |

---

## 6. Technical Architecture

### 6.1 Recommended Stack

| Layer              | Technology                                          | Rationale                                     |
|--------------------|-----------------------------------------------------|-----------------------------------------------|
| Framework          | Next.js 14 (App Router)                             | SSR/ISR/CSR, file-based routing, RSC          |
| Language           | TypeScript 5                                        | Type safety across API contracts              |
| Styling            | Tailwind CSS 3 + CSS Custom Properties              | Utility-first + token swapping                |
| Component          | shadcn/ui (Radix primitives)                        | Accessible, headless, fully customisable      |
| State (UI)         | Zustand                                             | Lightweight, no boilerplate                   |
| State (Server)     | TanStack Query (React Query)                        | Caching, revalidation, loading/error states   |
| Forms              | React Hook Form + Zod                               | Performant, schema-driven validation          |
| Auth               | next-auth (or custom cookie middleware)             | Cookie-based JWT, route protection            |
| Animation          | Framer Motion                                       | Gesture-aware, spring physics                 |
| Icons              | Lucide React                                        | Consistent, tree-shakeable                    |
| Image optimisation | Next.js Image component                             | WebP/AVIF, lazy load, LQIP blur               |
| HTTP Client        | Axios (with interceptors)                           | Interceptors for token refresh, error mapping |
| Testing            | Vitest + Testing Library + Playwright               | Unit + integration + e2e                      |
| Analytics          | Segment / GA4                                       | Funnel tracking                               |
| Error tracking     | Sentry                                              | Frontend exception logging                    |
| Deployment         | Vercel                                              | Edge SSR, ISR, image CDN                      |

### 6.2 Folder Structure

```
cocolime/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Route group: public pages
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx
│   │   └── contact/page.tsx
│   ├── (shop)/                   # Route group: catalog
│   │   ├── category/[slug]/
│   │   │   └── [[...subslug]]/page.tsx
│   │   ├── products/[slug]/page.tsx
│   │   └── search/page.tsx
│   ├── (commerce)/               # Route group: transactional
│   │   ├── cart/page.tsx
│   │   └── checkout/
│   │       ├── info/page.tsx
│   │       ├── shipping/page.tsx
│   │       ├── payment/page.tsx
│   │       └── confirm/page.tsx
│   ├── (auth)/                   # Route group: auth
│   │   ├── auth/login/page.tsx
│   │   ├── auth/register/page.tsx
│   │   └── auth/forgot/page.tsx
│   ├── account/                  # Protected route group
│   │   ├── layout.tsx            # Dashboard shell
│   │   ├── profile/page.tsx
│   │   ├── addresses/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [orderId]/page.tsx
│   │   └── wishlist/page.tsx
│   ├── legal/
│   │   ├── privacy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── returns/page.tsx
│   ├── api/                      # Next.js API routes (proxy only)
│   │   └── [...proxy]/route.ts   # Pass-through to backend
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── ui/                       # Base design system primitives
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Badge.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Modal.tsx
│   │   └── Toast.tsx
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Footer.tsx
│   │   └── Breadcrumb.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductGallery.tsx
│   │   ├── ProductInfo.tsx
│   │   ├── VariantSelector.tsx
│   │   └── ReviewStars.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   ├── checkout/
│   │   ├── CheckoutProgress.tsx
│   │   ├── AddressForm.tsx
│   │   ├── ShippingMethodList.tsx
│   │   └── PaymentForm.tsx
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── account/
│   │   ├── AccountNav.tsx
│   │   ├── OrderCard.tsx
│   │   └── AddressCard.tsx
│   └── shared/
│       ├── FilterSidebar.tsx
│       ├── SortSelect.tsx
│       ├── Pagination.tsx
│       └── EmptyState.tsx
├── lib/
│   ├── api/
│   │   ├── client.ts             # Axios instance + interceptors
│   │   ├── auth.ts
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── cart.ts
│   │   └── orders.ts
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   ├── useWishlist.ts
│   │   └── useProducts.ts
│   ├── store/
│   │   ├── cartStore.ts          # Zustand
│   │   └── uiStore.ts
│   ├── utils/
│   │   ├── currency.ts
│   │   ├── slugify.ts
│   │   └── cn.ts                 # classnames helper
│   └── validation/
│       ├── authSchemas.ts
│       └── checkoutSchemas.ts
├── types/
│   ├── product.ts
│   ├── cart.ts
│   ├── order.ts
│   ├── user.ts
│   └── api.ts
├── styles/
│   ├── globals.css               # Tokens + base styles
│   └── animations.css
├── public/
│   ├── fonts/
│   └── images/
├── middleware.ts                 # Route protection
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

### 6.3 State Management Approach

```
Server State (TanStack Query):
  - Products, categories, search results (ISR + client refetch)
  - Orders, addresses, profile (CSR, auth-gated)
  - Cart (server-synced on login, guest-local then merged)

Client State (Zustand):
  - Cart item count (optimistic, synced from server)
  - UI state: cart drawer open, menu open, active filters
  - Toast queue
  - Active checkout step

Form State (React Hook Form + Zod):
  - All forms — no external state store
  - Zod schemas define validation AND TypeScript types

URL State (nuqs / searchParams):
  - Filters, sort, page — shareable/bookmarkable URLs
```

### 6.4 Accessibility (WCAG 2.1 AA)

- Semantic HTML: `<nav>`, `<main>`, `<header>`, `<article>`, `<section>` used correctly
- Focus visible on all interactive elements (custom focus ring matching brand)
- Skip-to-content link at top of page
- All images: descriptive alt text (empty alt for decorative)
- Color contrast ratio: ≥4.5:1 for body text, ≥3:1 for large text
- ARIA labels on icon-only buttons (cart, wishlist, close)
- Modal/drawer: focus trap + return focus on close
- Form: label association, error announcement via aria-live
- Keyboard navigation: Tab, Enter, Escape, Arrow keys in menus
- No motion: `prefers-reduced-motion` respected for animations

### 6.5 SEO Requirements

| Element                | Implementation                                          |
|------------------------|---------------------------------------------------------|
| Meta title/description | Dynamic per page via Next.js Metadata API              |
| Canonical URLs         | Set on all paginated/filtered pages                     |
| Open Graph             | og:title, og:image, og:description per product         |
| Structured data        | Product (JSON-LD), BreadcrumbList, Organization        |
| Sitemap                | Auto-generated /sitemap.xml via next-sitemap           |
| robots.txt             | Disallow /account/, /checkout/, /api/                  |
| Page titles            | "Product Name — Category | Cocolime" format           |
| Image alt text         | Product name + descriptors                             |
| Heading hierarchy      | One H1 per page, logical H2/H3 structure               |
| Core Web Vitals        | LCP <2.5s, CLS <0.1, INP <200ms                       |

### 6.6 Performance Strategy

- **Images**: Next.js `<Image>` with priority on above-fold, AVIF/WebP, LQIP placeholder
- **Fonts**: `next/font` with `display: swap`, preload critical fonts
- **Code splitting**: Route-based automatic, dynamic imports for heavy components (gallery, map)
- **Caching**:
  - Categories: ISR 1h revalidation
  - Product listings: ISR 5min revalidation
  - PDPs: ISR 1min revalidation + on-demand via webhook
  - Cart/account: CSR, no cache
- **Prefetching**: Next.js Link prefetch on hover, TanStack Query prefetchQuery for PDP on card hover
- **Bundle**: Tree-shaking, analyze with @next/bundle-analyzer, target <200KB initial JS
- **Third-party**: Load analytics scripts with `next/script` strategy="lazyOnload"

### 6.7 Analytics Events

| Event                     | Trigger                                   | Properties                                         |
|---------------------------|-------------------------------------------|----------------------------------------------------|
| page_view                 | Every route change                        | page_path, page_title, referrer                    |
| product_list_view         | Category/search page load                 | list_name, products[], category                    |
| product_click             | Product card click                        | product_id, name, price, position, list_name       |
| product_detail_view       | PDP load                                  | product_id, name, price, category, brand           |
| add_to_cart               | Add to cart button                        | product_id, variant_id, quantity, price            |
| remove_from_cart          | Remove from cart                          | product_id, quantity, price                        |
| begin_checkout            | Click checkout from cart                  | cart_value, items_count, coupon                    |
| checkout_step_completed   | Each checkout step submit                 | step (1-4), method                                 |
| purchase                  | Order confirm page                        | order_id, revenue, tax, shipping, items[]          |
| sign_up                   | Registration success                      | method: "email"                                    |
| login                     | Login success                             | method: "email"                                    |
| search                    | Search query submitted                    | search_term, results_count                         |
| add_to_wishlist           | Wishlist toggle on                        | product_id, price                                  |
| coupon_applied            | Valid coupon entered                      | coupon_code, discount_value                        |

---

## 7. Phased Implementation Plan

### Phase 1 — MVP (Weeks 1–8)

**Goal**: Working storefront with core commerce flow

| Priority | Feature                                           |
|----------|---------------------------------------------------|
| P0       | Design tokens + global CSS                        |
| P0       | Navbar (desktop + mobile)                         |
| P0       | Category/subcategory pages (ISR)                  |
| P0       | Product detail page (ISR)                         |
| P0       | Cart (drawer + full page)                         |
| P0       | Checkout flow (all 4 steps)                       |
| P0       | Login + Registration forms                        |
| P0       | API client with auth interceptors                 |
| P1       | Search results page                               |
| P1       | Home page hero + featured products                |
| P1       | Account dashboard (profile, orders)               |
| P1       | 404 + error pages                                 |

### Phase 2 — V2 (Weeks 9–14)

**Goal**: Engagement, conversion optimisation, SEO

| Priority | Feature                                           |
|----------|---------------------------------------------------|
| P1       | Wishlist                                          |
| P1       | Product reviews display                           |
| P1       | Advanced filters + URL state sync                 |
| P1       | Mega menu with imagery                            |
| P1       | Upsell / cross-sell on PDP + cart                 |
| P2       | Address book management                           |
| P2       | Order return flow                                 |
| P2       | Coupon code system                                |
| P2       | Newsletter opt-in                                 |
| P2       | JSON-LD structured data                           |
| P2       | Sitemap + robots.txt                              |
| P2       | Analytics event tracking                          |

### Phase 3 — V3 (Weeks 15–20)

**Goal**: Premium experience + growth features

| Priority | Feature                                           |
|----------|---------------------------------------------------|
| P2       | Loyalty / points system                           |
| P2       | Product quiz (skin type finder)                   |
| P2       | Recently viewed                                   |
| P2       | Back-in-stock notifications                       |
| P3       | AR try-on integration                             |
| P3       | Live chat / support widget                        |
| P3       | Subscription / replenishment                      |
| P3       | Gift wrapping option                              |
| P3       | Multi-currency / multi-language                   |
| P3       | A/B testing framework                             |

---

*Document maintained by: Frontend Architecture Team*
*Last updated: February 2026*
