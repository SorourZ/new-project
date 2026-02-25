import { get } from './client'
import type { Product, ProductFilters, ProductsResponse } from '@/types'

export const productsApi = {
  list: (filters?: ProductFilters) =>
    get<ProductsResponse>('/products', filters as Record<string, unknown>),

  get: (slug: string) =>
    get<Product>(`/products/${slug}`),

  search: (q: string, page = 1, limit = 24) =>
    get<ProductsResponse>('/products/search', { q, page, limit }),

  getRelated: (slug: string) =>
    get<{ data: Product[] }>(`/products/${slug}/related`),
}
