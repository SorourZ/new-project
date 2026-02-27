'use client'

import { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '@/lib/api/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { FilterSidebar } from '@/components/shared/FilterSidebar'
import { Pagination } from '@/components/shared/Pagination'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import type { ProductFilters } from '@/types'

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'bestselling', label: 'Bestselling' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

export default function AllProductsPage() {
  const [filters, setFilters] = useState<ProductFilters>({
    sort: 'newest',
    page: 1,
    limit: 24,
  })
  const [filterOpen, setFilterOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productsApi.list(filters),
  })

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <Breadcrumb items={[{ label: 'All Products' }]} />

      <div className="mt-6 mb-8">
        <h1 className="text-4xl text-stone-900 mb-2">All Products</h1>
        {data?.pagination && (
          <p className="text-sm text-stone-400">{data.pagination.total} products</p>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          className="lg:hidden flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-stone-500 hidden sm:block">Sort by</label>
          <select
            id="sort"
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value as ProductFilters['sort'], page: 1 }))}
            className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-200"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar — only renders once filter data is available */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          {data?.filters_available && (
            <FilterSidebar
              filters={data.filters_available}
              active={filters}
              onChange={setFilters}
            />
          )}
        </aside>

        {/* Mobile filter drawer */}
        {filterOpen && (
          <>
            <div className="fixed inset-0 bg-black/40 z-[290] lg:hidden" onClick={() => setFilterOpen(false)} />
            <div className="fixed bottom-0 left-0 right-0 bg-white z-[300] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto lg:hidden animate-slide-up">
              {data?.filters_available && (
                <FilterSidebar
                  filters={data.filters_available}
                  active={filters}
                  onChange={(f) => { setFilters(f); setFilterOpen(false) }}
                />
              )}
            </div>
          </>
        )}

        {/* Grid */}
        <div className="flex-1 min-w-0">
          <ProductGrid
            products={data?.data}
            isLoading={isLoading}
            emptyMessage="No products found."
          />
          {data?.pagination && data.pagination.total_pages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={filters.page ?? 1}
                totalPages={data.pagination.total_pages}
                onPageChange={(page) => setFilters((f) => ({ ...f, page }))}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
