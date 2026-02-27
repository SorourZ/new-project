'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import { Heart, Share2, Shield, RefreshCw, Truck } from 'lucide-react'
import { productsApi } from '@/lib/api/products'
import { useCart } from '@/lib/hooks/useCart'
import { calculateDiscount } from '@/lib/utils/currency'
import { SARSymbol } from '@/components/ui/SARSymbol'
import { Breadcrumb } from '@/components/layout/Breadcrumb'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils/cn'
import type { ProductVariant } from '@/types'

const TRUST_BADGES = [
  { icon: <Truck size={16} />, label: 'Free delivery over SAR 200' },
  { icon: <RefreshCw size={16} />, label: '30-day returns' },
  { icon: <Shield size={16} />, label: 'Secure checkout' },
]

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [qty, setQty] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.slug],
    queryFn: () => productsApi.get(params.slug),
  })

  const { addToCart, isAdding } = useCart()

  const activeVariant = selectedVariant ?? product?.variants[0] ?? null
  const price = activeVariant?.price ?? product?.price ?? 0
  const compareAt = activeVariant?.compare_at_price ?? product?.compare_at_price ?? null
  const inStock = activeVariant?.in_stock ?? product?.in_stock ?? false

  const handleAddToCart = () => {
    if (!product) return
    addToCart({
      product_id: product.id,
      variant_id: activeVariant?.id ?? product.id + '_default',
      quantity: qty,
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-3">
            <Skeleton className="aspect-[4/5] w-full rounded-2xl" />
            <div className="flex gap-2">
              {[1,2,3,4].map(i => <Skeleton key={i} className="w-20 h-20 rounded-lg" />)}
            </div>
          </div>
          <div className="space-y-4 pt-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) return null

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <Breadcrumb
        items={[
          { label: product.category, href: `/category/${product.category.toLowerCase()}` },
          { label: product.subcategory, href: `/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase().replace(/\s/g, '-')}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid lg:grid-cols-2 gap-12 xl:gap-20">
        {/* Gallery */}
        <div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-stone-50 mb-4">
            {product.images[activeImage] ? (
              <Image
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-300 text-sm">No image</div>
            )}

            {product.badges.length > 0 && (
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.badges.map(b => <Badge key={b} badge={b} />)}
              </div>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all',
                    i === activeImage ? 'border-stone-900' : 'border-transparent hover:border-stone-300'
                  )}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={i === activeImage}
                >
                  <Image src={img.url} alt={img.alt || ''} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="py-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-2">
            {product.brand}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl text-stone-900 leading-tight mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating.count > 0 && (
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(s => (
                  <svg key={s} className={cn('w-4 h-4', s <= Math.round(product.rating.average) ? 'text-amber-400' : 'text-stone-200')} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-stone-500">{product.rating.average.toFixed(1)} ({product.rating.count} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="text-2xl font-semibold text-stone-900 flex items-center gap-1">
              <SARSymbol size={18} />
              {(price / 100).toFixed(2)}
            </span>
            {compareAt && compareAt > price && (
              <>
                <span className="text-base text-stone-400 line-through flex items-center gap-0.5">
                  <SARSymbol size={14} />
                  {(compareAt / 100).toFixed(2)}
                </span>
                {calculateDiscount(price, compareAt) > 0 && (
                  <span className="text-sm font-bold px-2.5 py-1 rounded-full bg-pink-500 text-white">
                    -{calculateDiscount(price, compareAt)}%
                  </span>
                )}
              </>
            )}
          </div>

          <p className="text-stone-600 leading-relaxed mb-6">{product.short_description}</p>

          {/* Variants */}
          {product.variants.length > 1 && (
            <div className="mb-6">
              <p className="text-sm font-medium text-stone-700 mb-3">
                Size: <span className="font-normal text-stone-500">{activeVariant?.name}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(v)}
                    disabled={!v.in_stock}
                    className={cn(
                      'px-4 py-2 text-sm rounded-lg border transition-all',
                      activeVariant?.id === v.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400',
                      !v.in_stock && 'opacity-40 cursor-not-allowed line-through'
                    )}
                  >
                    {v.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty + Add to cart */}
          <div className="flex gap-3 mb-6">
            <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-12 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-12 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              isLoading={isAdding}
              disabled={!inStock}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>

            <button
              onClick={() => setWishlisted(!wishlisted)}
              className={cn(
                'w-12 h-12 flex items-center justify-center rounded-lg border transition-all',
                wishlisted
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-stone-200 text-stone-500 hover:border-stone-400'
              )}
              aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart size={18} fill={wishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {!inStock && (
            <div className="mb-6 p-4 bg-stone-50 rounded-lg">
              <p className="text-sm text-stone-600 mb-2">Out of stock — get notified when it returns:</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-200" />
                <Button variant="outline" size="sm">Notify Me</Button>
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex flex-col gap-2.5 py-5 border-t border-stone-100">
            {TRUST_BADGES.map((b) => (
              <div key={b.label} className="flex items-center gap-2.5 text-sm text-stone-500">
                <span className="text-stone-400">{b.icon}</span>
                {b.label}
              </div>
            ))}
          </div>

          {/* Share */}
          <button className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-700 transition-colors mt-2">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="mt-16 max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 mb-4">About this product</h2>
          <div className="prose prose-stone text-stone-600 text-sm leading-relaxed">
            <p>{product.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
