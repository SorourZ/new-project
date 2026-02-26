'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useCart } from '@/lib/hooks/useCart'
import { formatPrice } from '@/lib/utils/currency'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'

export function CartDrawer() {
  const { isOpen, cart, closeDrawer } = useCartStore()
  const { updateItem, removeItem, isUpdating, isRemoving } = useCart()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[290] animate-fade-in"
          onClick={closeDrawer}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[300] flex flex-col',
          'shadow-2xl transition-transform duration-350 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-stone-700" />
            <h2 className="font-medium text-stone-900">
              Your Cart {cart && cart.item_count > 0 && (
                <span className="text-stone-400 font-normal">({cart.item_count})</span>
              )}
            </h2>
          </div>
          <button
            onClick={closeDrawer}
            className="p-1.5 text-stone-400 hover:text-stone-900 transition-colors rounded-md hover:bg-stone-100"
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {!cart || cart.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag size={48} className="text-stone-200 mb-4" aria-hidden />
              <p className="font-[family-name:var(--font-playfair)] text-lg text-stone-700 mb-2">
                Your cart is empty
              </p>
              <p className="text-sm text-stone-400 mb-6">
                Add some beautiful things to get started.
              </p>
              <Button variant="primary" onClick={closeDrawer} size="md">
                <Link href="/category/skincare">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-stone-100 px-6">
              {cart.items.map((item) => (
                <li key={item.id} className="py-5 flex gap-4">
                  {/* Image */}
                  <div className="relative w-20 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-stone-50">
                    {item.product.images?.[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.images[0].alt || item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-100" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-stone-400 font-medium truncate">{item.product.brand}</p>
                    <h3 className="text-sm font-medium text-stone-800 leading-snug mt-0.5 line-clamp-2">
                      {item.product.name}
                    </h3>
                    {item.variant.name && (
                      <p className="text-xs text-stone-400 mt-0.5">{item.variant.name}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      {/* Qty stepper */}
                      <div className="flex items-center border border-stone-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => {
                            if (item.quantity > 1) updateItem(item.id, item.quantity - 1)
                            else removeItem(item.id)
                          }}
                          disabled={isUpdating || isRemoving}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateItem(item.id, item.quantity + 1)}
                          disabled={isUpdating}
                          className="w-8 h-8 flex items-center justify-center text-stone-500 hover:bg-stone-50 hover:text-stone-900 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-stone-900">
                          {formatPrice(item.line_total, item.product.currency)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          disabled={isRemoving}
                          className="p-1 text-stone-300 hover:text-red-500 transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cart && cart.items.length > 0 && (
          <div className="border-t border-stone-100 px-6 py-5 space-y-4 bg-stone-50">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span>{formatPrice(cart.subtotal, cart.currency)}</span>
              </div>
              {cart.coupon_discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>−{formatPrice(cart.coupon_discount, cart.currency)}</span>
                </div>
              )}
              {cart.shipping_estimate !== null && (
                <div className="flex justify-between text-stone-600">
                  <span>Est. Shipping</span>
                  <span>{cart.shipping_estimate === 0 ? 'Free' : formatPrice(cart.shipping_estimate, cart.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span>{formatPrice(cart.total, cart.currency)}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={() => { closeDrawer() }}
              >
                <Link href="/checkout/info" className="w-full text-center">Checkout</Link>
              </Button>
              <Button
                variant="outline"
                size="md"
                className="w-full"
                onClick={closeDrawer}
              >
                <Link href="/cart">View Full Cart</Link>
              </Button>
            </div>

            <p className="text-center text-xs text-stone-400">
              Free shipping on orders over SAR 200
            </p>
          </div>
        )}
      </div>
    </>
  )
}
