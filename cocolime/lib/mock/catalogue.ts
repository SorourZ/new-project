/**
 * Shared product catalogue for mock API routes.
 * Maps product_id → minimal data needed to build cart items.
 * Backed by the real niceonesa.com product data in lib/data/products.json.
 */
import type { ProductListItem, ProductVariant } from '@/types'
import rawProducts from '@/lib/data/products.json'

type RawProduct = {
  id: string
  slug: string
  name: string
  brand: string
  price: number
  compare_at_price: number | null
  currency: string
  images: { id: string; url: string; alt: string; position: number }[]
  rating: { average: number; count: number }
  badges: string[]
  in_stock: boolean
}

type CatalogueEntry = ProductListItem & {
  defaultVariant: ProductVariant
}

function toEntry(p: RawProduct): CatalogueEntry {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    price: p.price,
    compare_at_price: p.compare_at_price,
    currency: p.currency,
    images: p.images,
    rating: p.rating,
    badges: p.badges as CatalogueEntry['badges'],
    in_stock: p.in_stock,
    defaultVariant: {
      id: `${p.id}-v1`,
      name: 'Default',
      price: p.price,
      compare_at_price: p.compare_at_price,
      sku: p.id,
      inventory: 99,
      in_stock: p.in_stock,
      options: {},
    },
  }
}

const PRODUCTS: CatalogueEntry[] = (rawProducts as RawProduct[]).map(toEntry)

// O(1) lookup by product id
const BY_ID = new Map<string, CatalogueEntry>(PRODUCTS.map((p) => [p.id, p]))

export function getProductById(id: string): CatalogueEntry | undefined {
  return BY_ID.get(id)
}

export function getAllProducts(): CatalogueEntry[] {
  return PRODUCTS
}

/** Compat: used by cartStore */
export function findProduct(id: string): CatalogueEntry | undefined {
  return BY_ID.get(id)
}

/** Compat: used by cartStore — returns defaultVariant (single variant per product) */
export function findVariant(product: CatalogueEntry, _variantId: string): ProductVariant {
  return product.defaultVariant
}

export default PRODUCTS
