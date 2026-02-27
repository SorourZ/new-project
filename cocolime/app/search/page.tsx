'use client'

import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { productsApi } from '@/lib/api/products'
import { ProductGrid } from '@/components/product/ProductGrid'
import { SearchX } from 'lucide-react'
import Link from 'next/link'

function SearchResults() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page')) || 1

  const { data, isLoading } = useQuery({
    queryKey: ['search', q, page],
    queryFn: () => productsApi.search(q, page),
    enabled: q.length > 0,
  })

  if (!q) return (
    <div className="text-center py-20">
      <p className="text-stone-400">Enter a search term above to find products.</p>
    </div>
  )

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-900 mb-1">
          Results for &ldquo;{q}&rdquo;
        </h1>
        {data?.pagination && (
          <p className="text-sm text-stone-400">{data.pagination.total} products found</p>
        )}
      </div>

      {!isLoading && data?.data.length === 0 ? (
        <div className="text-center py-20">
          <SearchX size={48} className="text-stone-200 mx-auto mb-4" />
          <h2 className="font-[family-name:var(--font-display)] text-xl text-stone-700 mb-2">
            No results for &ldquo;{q}&rdquo;
          </h2>
          <p className="text-sm text-stone-400 mb-6">Try a different search term or browse our categories.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Skincare', 'Makeup', 'Haircare', 'Fragrance'].map((cat) => (
              <Link key={cat} href={`/category/${cat.toLowerCase()}`}
                className="px-4 py-2 border border-stone-200 rounded-full text-sm text-stone-600 hover:border-stone-400 hover:text-stone-900 transition-colors">
                {cat}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <ProductGrid products={data?.data ?? []} isLoading={isLoading} />
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10">
      <Suspense fallback={<div className="animate-shimmer h-96 rounded-xl" />}>
        <SearchResults />
      </Suspense>
    </div>
  )
}
