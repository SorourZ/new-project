'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Heart, ShoppingBag, Plus } from 'lucide-react'
import type { ProductListItem } from '@/types'
import { calculateDiscount } from '@/lib/utils/currency'
import { useCart } from '@/lib/hooks/useCart'
import { Badge } from '@/components/ui/Badge'
import { SARSymbol } from '@/components/ui/SARSymbol'
import { cn } from '@/lib/utils/cn'

interface ProductCardProps {
  product: ProductListItem
  priority?: boolean
}

function StarRating({ average, count }: { average: number; count: number }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex" aria-label={`${average} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={cn('w-3 h-3', star <= Math.round(average) ? 'text-amber-400' : 'text-stone-200')}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-[11px] text-stone-400">({count})</span>
    </div>
  )
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [wishListed, setWishListed] = useState(false)
  const [hovered, setHovered] = useState(false)
  const { addToCart, isAdding } = useCart()

  const discount = product.compare_at_price
    ? calculateDiscount(product.price, product.compare_at_price)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({
      product_id: product.id,
      variant_id: product.id + '_default',
      quantity: 1,
    })
  }

  return (
    <article className="group relative">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image container */}
        <div
          className="relative aspect-[3/4] overflow-hidden rounded-xl bg-stone-50 mb-4"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {product.images?.[0] && (
            <>
              <Image
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                fill
                className={cn(
                  'object-cover transition-all duration-500',
                  hovered && product.images[1] ? 'opacity-0' : 'opacity-100'
                )}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                priority={priority}
              />
              {product.images[1] && (
                <Image
                  src={product.images[1].url}
                  alt={product.images[1].alt || product.name}
                  fill
                  className={cn(
                    'object-cover transition-all duration-500',
                    hovered ? 'opacity-100' : 'opacity-0'
                  )}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}
            </>
          )}

          {/* No image placeholder */}
          {!product.images?.[0] && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100">
              <span className="text-stone-300 text-xs">No image</span>
            </div>
          )}

          {/* Badges */}
          {product.badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-col gap-1">
              {product.badges.slice(0, 2).map((b) => (
                <Badge key={b} badge={b} />
              ))}
            </div>
          )}

          {/* Add to cart — compact green icon button, bottom-right */}
          <button
            onClick={handleAddToCart}
            disabled={!product.in_stock || isAdding}
            className={cn(
              'absolute bottom-3 right-3 w-9 h-9 rounded-xl flex items-center justify-center shadow-md transition-all duration-200',
              product.in_stock
                ? 'bg-emerald-400 hover:bg-emerald-500 active:scale-95'
                : 'bg-stone-200 cursor-not-allowed',
            )}
            aria-label={`Add ${product.name} to cart`}
          >
            <span className="relative">
              <ShoppingBag size={16} className="text-white" strokeWidth={2} />
              <Plus
                size={8}
                className="text-white absolute -top-1 -right-1.5"
                strokeWidth={3.5}
              />
            </span>
          </button>

          {/* Wishlist */}
          <button
            onClick={(e) => { e.preventDefault(); setWishListed(!wishListed) }}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-colors"
            aria-label={wishListed ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          >
            <Heart
              size={14}
              className={cn(
                'transition-colors',
                wishListed ? 'fill-red-500 text-red-500' : 'text-stone-500'
              )}
            />
          </button>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <p className="text-[11px] text-stone-400 font-medium tracking-wider uppercase">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-stone-800 leading-snug line-clamp-2 group-hover:text-stone-600 transition-colors">
            {product.name}
          </h3>

          {product.rating.count > 0 && (
            <StarRating average={product.rating.average} count={product.rating.count} />
          )}

          <div className="flex items-center gap-2 pt-0.5 flex-wrap">
            <span className="text-sm font-semibold text-stone-900 flex items-center gap-[3px]">
              <SARSymbol size={12} />
              {(product.price / 100).toFixed(2)}
            </span>
            {product.compare_at_price && product.compare_at_price > product.price && (
              <>
                <span className="text-xs text-stone-400 line-through flex items-center gap-[2px]">
                  <SARSymbol size={10} />
                  {(product.compare_at_price / 100).toFixed(2)}
                </span>
                {discount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-pink-500 text-white leading-none">
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
