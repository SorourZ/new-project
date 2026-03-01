import { NextRequest, NextResponse } from 'next/server'
import type { ProductListItem, ProductsResponse, FiltersAvailable } from '@/types'
import rawProducts from '@/lib/data/products.json'

// ---------------------------------------------------------------------------
// Real product catalogue — sourced from niceonesa.com
// 13 000+ products across Makeup, Skincare, Fragrance, Haircare, Body, Tools.
// Prices in halalah (SAR × 100). Images from niceonesa CDN (cloudfront.net).
// ---------------------------------------------------------------------------

type CatalogueEntry = ProductListItem & {
  category: string
  subcategory: string
  skin_types: string[]
  concerns: string[]
  short_description: string
  source_url: string
}

// Cast once at module load — API routes are server-side only so this is fine.
const ALL_PRODUCTS = rawProducts as CatalogueEntry[]

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const category = searchParams.get('category') ?? undefined
  const brands = searchParams.getAll('brands[]').filter(Boolean)
  const skin_types = searchParams.getAll('skin_types[]').filter(Boolean)
  const concerns = searchParams.getAll('concerns[]').filter(Boolean)
  const price_min = searchParams.get('price_min') ? Number(searchParams.get('price_min')) : undefined
  const price_max = searchParams.get('price_max') ? Number(searchParams.get('price_max')) : undefined
  const in_stock = searchParams.get('in_stock') === 'true' ? true : undefined
  const sort = (searchParams.get('sort') ?? 'newest') as 'newest' | 'price_asc' | 'price_desc' | 'rating' | 'bestselling'
  const page = Math.max(1, Number(searchParams.get('page') ?? 1))
  const limit = Math.min(48, Math.max(1, Number(searchParams.get('limit') ?? 24)))

  // Filter
  let results = ALL_PRODUCTS.filter((p) => {
    if (category && p.category !== category && p.subcategory !== category) return false
    if (brands.length && !brands.includes(p.brand)) return false
    if (skin_types.length && !skin_types.some((st) => p.skin_types.includes(st))) return false
    if (concerns.length && !concerns.some((c) => p.concerns.includes(c))) return false
    if (price_min !== undefined && p.price < price_min) return false
    if (price_max !== undefined && p.price > price_max) return false
    if (in_stock !== undefined && p.in_stock !== in_stock) return false
    return true
  })

  // Sort
  results = [...results].sort((a, b) => {
    switch (sort) {
      case 'price_asc': return a.price - b.price
      case 'price_desc': return b.price - a.price
      case 'rating': return b.rating.average - a.rating.average || b.rating.count - a.rating.count
      case 'bestselling':
      case 'newest':
      default: return Number(b.id) - Number(a.id)
    }
  })

  // Build filters from category-scoped pool
  const categoryPool = category
    ? ALL_PRODUCTS.filter((p) => p.category === category || p.subcategory === category)
    : ALL_PRODUCTS

  const filtersAvailable: FiltersAvailable = {
    brands: [...new Set(categoryPool.map((p) => p.brand))].sort(),
    skin_types: [...new Set(categoryPool.flatMap((p) => p.skin_types))].sort(),
    concerns: [...new Set(categoryPool.flatMap((p) => p.concerns))].sort(),
    price_min: Math.min(...categoryPool.map((p) => p.price)),
    price_max: Math.max(...categoryPool.map((p) => p.compare_at_price ?? p.price)),
  }

  // Paginate
  const total = results.length
  const total_pages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(page, total_pages)
  const offset = (safePage - 1) * limit
  const pageData = results.slice(offset, offset + limit)

  // Strip internal fields before returning
  const data: ProductListItem[] = pageData.map(
    ({ category: _c, subcategory: _s, skin_types: _st, concerns: _con, short_description: _sd, source_url: _su, ...rest }) => rest
  )

  const response: ProductsResponse = {
    data,
    pagination: { page: safePage, limit, total, total_pages },
    filters_available: filtersAvailable,
  }

  return NextResponse.json(response)
}
