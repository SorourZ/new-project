'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Tag } from 'lucide-react'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cartStore'
import { useCart } from '@/lib/hooks/useCart'
import { formatPrice } from '@/lib/utils/currency'
import { Button } from '@/components/ui/Button'

export default function CartPage() {
  const { cart } = useCartStore()
  const { updateItem, removeItem, applyCoupon, isUpdating, isRemoving } = useCart()
  const [couponInput, setCouponInput] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)

  const handleCoupon = async () => {
    setCouponLoading(true)
    applyCoupon(couponInput)
    setCouponLoading(false)
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 text-center">
        <ShoppingBag size={64} className="text-stone-200 mx-auto mb-6" />
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-stone-900 mb-3">Your cart is empty</h1>
        <p className="text-stone-500 mb-8">Discover beautiful products to fill it up.</p>
        <Link href="/category/skincare">
          <Button variant="primary" size="lg">Start Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-stone-900 mb-8">
        Your Cart <span className="text-stone-400 font-normal text-2xl">({cart.item_count})</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="divide-y divide-stone-100">
            {cart.items.map((item) => (
              <li key={item.id} className="py-6 flex gap-5">
                <div className="relative w-24 h-28 sm:w-32 sm:h-36 flex-shrink-0 rounded-xl overflow-hidden bg-stone-50">
                  {item.product.images?.[0] ? (
                    <Image src={item.product.images[0].url} alt={item.product.name} fill className="object-cover" sizes="128px" />
                  ) : <div className="w-full h-full bg-stone-100" />}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-stone-400 font-medium mb-0.5">{item.product.brand}</p>
                  <h2 className="text-sm sm:text-base font-medium text-stone-800 mb-1 leading-snug">{item.product.name}</h2>
                  {item.variant.name && <p className="text-xs text-stone-400 mb-3">{item.variant.name}</p>}

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => item.quantity > 1 ? updateItem(item.id, item.quantity - 1) : removeItem(item.id)}
                        disabled={isUpdating || isRemoving}
                        className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors disabled:opacity-40"
                        aria-label="Decrease"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateItem(item.id, item.quantity + 1)}
                        disabled={isUpdating}
                        className="w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-50 transition-colors disabled:opacity-40"
                        aria-label="Increase"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-stone-900">{formatPrice(item.line_total, item.product.currency)}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-stone-300 hover:text-red-500 transition-colors rounded"
                        aria-label={`Remove ${item.product.name}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <Link href="/products" className="text-sm text-stone-500 hover:text-stone-900 transition-colors flex items-center gap-1">
              ← Continue shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <div>
          <div className="bg-stone-50 rounded-2xl p-6 sticky top-24">
            <h2 className="font-medium text-stone-900 mb-5">Order Summary</h2>

            {/* Coupon */}
            <div className="mb-5 pb-5 border-b border-stone-200">
              <label className="text-xs font-medium text-stone-600 flex items-center gap-1.5 mb-2">
                <Tag size={12} /> Discount code
              </label>
              <div className="flex gap-2">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2.5 text-sm border border-stone-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-stone-200"
                />
                <Button variant="outline" size="sm" isLoading={couponLoading} onClick={handleCoupon}>
                  Apply
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span><span>{formatPrice(cart.subtotal, cart.currency)}</span>
              </div>
              {cart.coupon_discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({cart.coupon_code})</span><span>−{formatPrice(cart.coupon_discount, cart.currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500 text-xs pt-1">
                <span>Shipping</span><span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between font-semibold text-stone-900 text-base pt-3 border-t border-stone-200">
                <span>Total</span><span>{formatPrice(cart.total, cart.currency)}</span>
              </div>
            </div>

            <Link href="/checkout/info" className="block mt-6">
              <Button variant="primary" size="lg" className="w-full">
                Proceed to Checkout <ArrowRight size={15} />
              </Button>
            </Link>

            <p className="text-center text-xs text-stone-400 mt-3">Free shipping on orders over SAR 200</p>
          </div>
        </div>
      </div>
    </div>
  )
}
