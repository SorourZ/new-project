import type { ProductListItem } from '@/types'
import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from '@/components/ui/Skeleton'
import { PackageSearch } from 'lucide-react'

interface ProductGridProps {
  products: ProductListItem[]
  isLoading?: boolean
  skeletonCount?: number
}

export function ProductGrid({ products, isLoading, skeletonCount = 12 }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageSearch size={48} className="text-stone-200 mb-4" aria-hidden />
        <h3 className="font-[family-name:var(--font-display)] text-xl text-stone-700 mb-2">
          No products found
        </h3>
        <p className="text-sm text-stone-400 max-w-xs">
          Try adjusting your filters or browse a different category.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  )
}
