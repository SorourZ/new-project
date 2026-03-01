/**
 * Server-side in-memory cart store (dev/mock only).
 * Persists across requests within the same server process.
 */
import type { Cart, CartItem } from '@/types'
import { findProduct, findVariant } from './catalogue'

// ── Global store ────────────────────────────────────────────────────────────
const store = new Map<string, Cart>()

const COUPONS: Record<string, number> = {
  COCO10:  10,  // 10% off
  WELCOME: 15,  // 15% off
  SAR50:   20,  // 20% off (promo)
}

// ── Helpers ─────────────────────────────────────────────────────────────────
function computeTotals(cart: Cart): Cart {
  const subtotal = cart.items.reduce((s, i) => s + i.line_total, 0)
  const couponDiscount = cart.coupon_code
    ? Math.round((subtotal * (COUPONS[cart.coupon_code] ?? 0)) / 100)
    : 0
  const shippingEstimate = subtotal >= 20000 ? 0 : 1500  // free shipping over SAR 200
  const total = subtotal - couponDiscount + shippingEstimate

  return {
    ...cart,
    subtotal,
    coupon_discount: couponDiscount,
    discount: couponDiscount,
    shipping_estimate: shippingEstimate,
    total,
    item_count: cart.items.reduce((s, i) => s + i.quantity, 0),
  }
}

// ── Public API ───────────────────────────────────────────────────────────────
export function getCart(sessionId: string): Cart {
  if (!store.has(sessionId)) {
    store.set(sessionId, {
      id: `cart-${sessionId}`,
      items: [],
      subtotal: 0,
      discount: 0,
      shipping_estimate: null,
      total: 0,
      currency: 'SAR',
      coupon_code: null,
      coupon_discount: 0,
      item_count: 0,
    })
  }
  return computeTotals(store.get(sessionId)!)
}

export function addItem(
  sessionId: string,
  productId: string,
  variantId: string,
  quantity: number
): Cart | { error: string } {
  const product = findProduct(productId)
  if (!product) return { error: 'Product not found' }

  const variant = findVariant(product, variantId)
  const cart = getCart(sessionId)
  const existing = cart.items.find((i) => i.variant.id === variantId)

  let items: CartItem[]
  if (existing) {
    items = cart.items.map((i) =>
      i.variant.id === variantId
        ? { ...i, quantity: i.quantity + quantity, line_total: (i.quantity + quantity) * variant.price }
        : i
    )
  } else {
    const newItem: CartItem = {
      id: `item-${Date.now()}`,
      product,
      variant,
      quantity,
      line_total: quantity * variant.price,
    }
    items = [...cart.items, newItem]
  }

  const updated = computeTotals({ ...cart, items })
  store.set(sessionId, updated)
  return updated
}

export function updateItem(
  sessionId: string,
  itemId: string,
  quantity: number
): Cart | { error: string } {
  const cart = getCart(sessionId)
  const item = cart.items.find((i) => i.id === itemId)
  if (!item) return { error: 'Item not found' }

  const items =
    quantity <= 0
      ? cart.items.filter((i) => i.id !== itemId)
      : cart.items.map((i) =>
          i.id === itemId
            ? { ...i, quantity, line_total: quantity * i.variant.price }
            : i
        )

  const updated = computeTotals({ ...cart, items })
  store.set(sessionId, updated)
  return updated
}

export function removeItem(sessionId: string, itemId: string): Cart {
  const cart = getCart(sessionId)
  const items = cart.items.filter((i) => i.id !== itemId)
  const updated = computeTotals({ ...cart, items })
  store.set(sessionId, updated)
  return updated
}

export function applyCoupon(
  sessionId: string,
  code: string
): Cart | { error: string } {
  const upper = code.toUpperCase().trim()
  if (!(upper in COUPONS)) return { error: 'Invalid coupon code' }
  const cart = getCart(sessionId)
  const updated = computeTotals({ ...cart, coupon_code: upper })
  store.set(sessionId, updated)
  return updated
}

export function removeCoupon(sessionId: string): Cart {
  const cart = getCart(sessionId)
  const updated = computeTotals({ ...cart, coupon_code: null })
  store.set(sessionId, updated)
  return updated
}

export function getSessionId(cookieHeader: string | null): string {
  if (cookieHeader) {
    const match = cookieHeader.match(/cocolime_sid=([^;]+)/)
    if (match) return match[1]
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}
