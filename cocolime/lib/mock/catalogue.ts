/**
 * Shared product catalogue for mock API routes.
 * Maps product_id → minimal data needed to build cart items.
 */
import type { ProductListItem, ProductVariant } from '@/types'

type CatalogueEntry = ProductListItem & {
  defaultVariant: ProductVariant
}

const PRODUCTS: CatalogueEntry[] = [
  {
    id: 'boj-001', slug: 'beauty-of-joseon-relief-sun-rice-probiotics-spf50',
    name: 'Relief Sun: Rice + Probiotics SPF50+ PA++++ (50ml)', brand: 'Beauty of Joseon',
    price: 1490, compare_at_price: 2200, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.8, count: 3241 }, badges: ['bestseller', 'sale'], in_stock: true,
    defaultVariant: { id: 'boj-001-v1', name: '50ml', price: 1490, compare_at_price: 2200, sku: 'BOJ-SUN-50', inventory: 50, in_stock: true, options: {} },
  },
  {
    id: 'boj-002', slug: 'beauty-of-joseon-revive-eye-serum-ginseng-retinal',
    name: 'Revive Eye Serum: Ginseng + Retinal (30ml)', brand: 'Beauty of Joseon',
    price: 1450, compare_at_price: 2200, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.7, count: 1892 }, badges: ['sale'], in_stock: true,
    defaultVariant: { id: 'boj-002-v1', name: '30ml', price: 1450, compare_at_price: 2200, sku: 'BOJ-EYE-30', inventory: 30, in_stock: true, options: {} },
  },
  {
    id: 'boj-003', slug: 'beauty-of-joseon-glow-serum-propolis-niacinamide',
    name: 'Glow Serum: Propolis + Niacinamide (30ml)', brand: 'Beauty of Joseon',
    price: 1390, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.6, count: 2107 }, badges: ['new'], in_stock: true,
    defaultVariant: { id: 'boj-003-v1', name: '30ml', price: 1390, compare_at_price: null, sku: 'BOJ-GLOW-30', inventory: 45, in_stock: true, options: {} },
  },
  {
    id: 'boj-004', slug: 'beauty-of-joseon-dynasty-cream',
    name: 'Dynasty Cream (50ml)', brand: 'Beauty of Joseon',
    price: 1790, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.5, count: 983 }, badges: [], in_stock: true,
    defaultVariant: { id: 'boj-004-v1', name: '50ml', price: 1790, compare_at_price: null, sku: 'BOJ-DYN-50', inventory: 20, in_stock: true, options: {} },
  },
  {
    id: 'cosrx-001', slug: 'cosrx-advanced-snail-96-mucin-power-essence',
    name: 'Advanced Snail 96 Mucin Power Essence (100ml)', brand: 'COSRX',
    price: 1850, compare_at_price: 2500, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1631159562830-7e5e1e1dfe55?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.9, count: 5412 }, badges: ['bestseller', 'sale'], in_stock: true,
    defaultVariant: { id: 'cosrx-001-v1', name: '100ml', price: 1850, compare_at_price: 2500, sku: 'COSRX-SNAIL-100', inventory: 80, in_stock: true, options: {} },
  },
  {
    id: 'cosrx-002', slug: 'cosrx-low-ph-good-morning-gel-cleanser',
    name: 'Low pH Good Morning Gel Cleanser (150ml)', brand: 'COSRX',
    price: 1190, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.7, count: 3899 }, badges: ['bestseller'], in_stock: true,
    defaultVariant: { id: 'cosrx-002-v1', name: '150ml', price: 1190, compare_at_price: null, sku: 'COSRX-CLEAN-150', inventory: 60, in_stock: true, options: {} },
  },
  {
    id: 'to-001', slug: 'the-ordinary-hyaluronic-acid-2-b5',
    name: 'Hyaluronic Acid 2% + B5 (30ml)', brand: 'The Ordinary',
    price: 790, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1547032889-81d21e98800d?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.6, count: 8921 }, badges: ['bestseller'], in_stock: true,
    defaultVariant: { id: 'to-001-v1', name: '30ml', price: 790, compare_at_price: null, sku: 'TO-HA-30', inventory: 100, in_stock: true, options: {} },
  },
  {
    id: 'to-002', slug: 'the-ordinary-niacinamide-10-zinc-1',
    name: 'Niacinamide 10% + Zinc 1% (30ml)', brand: 'The Ordinary',
    price: 590, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38a18?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.5, count: 11203 }, badges: ['bestseller'], in_stock: true,
    defaultVariant: { id: 'to-002-v1', name: '30ml', price: 590, compare_at_price: null, sku: 'TO-NIA-30', inventory: 120, in_stock: true, options: {} },
  },
  {
    id: 'cera-001', slug: 'cerave-hydrating-facial-cleanser',
    name: 'Hydrating Facial Cleanser (236ml)', brand: 'CeraVe',
    price: 1090, compare_at_price: 1490, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.8, count: 12450 }, badges: ['bestseller', 'sale'], in_stock: true,
    defaultVariant: { id: 'cera-001-v1', name: '236ml', price: 1090, compare_at_price: 1490, sku: 'CERA-CLEAN-236', inventory: 90, in_stock: true, options: {} },
  },
  {
    id: 'cera-002', slug: 'cerave-moisturising-cream',
    name: 'Moisturising Cream (340g)', brand: 'CeraVe',
    price: 1290, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.9, count: 18723 }, badges: ['bestseller'], in_stock: true,
    defaultVariant: { id: 'cera-002-v1', name: '340g', price: 1290, compare_at_price: null, sku: 'CERA-MOIST-340', inventory: 75, in_stock: true, options: {} },
  },
  {
    id: 'bio-001', slug: 'bioderma-sensibio-h2o-micellar-water',
    name: 'Sensibio H2O Micellar Water (500ml)', brand: 'Bioderma',
    price: 1490, compare_at_price: 1990, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.9, count: 22341 }, badges: ['bestseller', 'sale'], in_stock: true,
    defaultVariant: { id: 'bio-001-v1', name: '500ml', price: 1490, compare_at_price: 1990, sku: 'BIO-SENSI-500', inventory: 65, in_stock: true, options: {} },
  },
  {
    id: 'anua-001', slug: 'anua-heartleaf-77-soothing-toner',
    name: 'Heartleaf 77% Soothing Toner (250ml)', brand: 'Anua',
    price: 1690, compare_at_price: 2200, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.7, count: 3487 }, badges: ['sale', 'new'], in_stock: true,
    defaultVariant: { id: 'anua-001-v1', name: '250ml', price: 1690, compare_at_price: 2200, sku: 'ANUA-HL-250', inventory: 40, in_stock: true, options: {} },
  },
  {
    id: 'lrp-003', slug: 'la-roche-posay-anthelios-ultra-light-spf50',
    name: 'Anthelios Ultra-Light Invisible Fluid SPF50+ (50ml)', brand: 'La Roche-Posay',
    price: 2490, compare_at_price: null, currency: 'SAR',
    images: [{ id: 'i1', url: 'https://images.unsplash.com/photo-1607602878030-eb70a90f8090?w=400&q=70', alt: '', position: 0 }],
    rating: { average: 4.8, count: 6721 }, badges: [], in_stock: true,
    defaultVariant: { id: 'lrp-003-v1', name: '50ml', price: 2490, compare_at_price: null, sku: 'LRP-ANT-50', inventory: 35, in_stock: true, options: {} },
  },
]

const CATALOGUE_BY_ID = new Map(PRODUCTS.map((p) => [p.id, p]))

export function findProduct(productId: string): CatalogueEntry | undefined {
  return CATALOGUE_BY_ID.get(productId)
}

export function findVariant(product: CatalogueEntry, variantId: string): ProductVariant {
  // For mock purposes, always return the default variant
  return { ...product.defaultVariant, id: variantId }
}
