import { get, post, put, del } from './client'
import type { AddToCartPayload, Cart } from '@/types'

export const cartApi = {
  get: () =>
    get<Cart>('/cart'),

  addItem: (payload: AddToCartPayload) =>
    post<Cart>('/cart/items', payload),

  updateItem: (itemId: string, quantity: number) =>
    put<Cart>(`/cart/items/${itemId}`, { quantity }),

  removeItem: (itemId: string) =>
    del<Cart>(`/cart/items/${itemId}`),

  applyCoupon: (code: string) =>
    post<Cart>('/cart/coupon', { code }),

  removeCoupon: () =>
    del<Cart>('/cart/coupon'),
}
