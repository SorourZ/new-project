import { get, post } from './client'
import type { Order, OrderPayload, ShippingMethod, WishlistItem } from '@/types'

export const ordersApi = {
  list: () =>
    get<{ data: Order[] }>('/account/orders'),

  get: (orderId: string) =>
    get<Order>(`/account/orders/${orderId}`),

  create: (payload: OrderPayload) =>
    post<{ order: Order }>('/orders', payload),

  getShippingMethods: () =>
    get<{ data: ShippingMethod[] }>('/shipping-methods'),
}

export const accountApi = {
  getProfile: () =>
    get<{ first_name: string; last_name: string; email: string; phone?: string }>('/account/profile'),

  updateProfile: (data: Partial<{ first_name: string; last_name: string; phone: string }>) =>
    import('./client').then(({ put }) => put('/account/profile', data)),

  getAddresses: () =>
    get<{ data: import('@/types').Address[] }>('/account/addresses'),

  addAddress: (addr: Omit<import('@/types').Address, 'id'>) =>
    post<import('@/types').Address>('/account/addresses', addr),

  updateAddress: (id: string, addr: Partial<import('@/types').Address>) =>
    import('./client').then(({ put }) => put(`/account/addresses/${id}`, addr)),

  deleteAddress: (id: string) =>
    import('./client').then(({ del }) => del(`/account/addresses/${id}`)),
}

export const wishlistApi = {
  list: () =>
    get<{ data: WishlistItem[] }>('/account/wishlist'),

  add: (productId: string) =>
    post<WishlistItem>('/account/wishlist', { product_id: productId }),

  remove: (productId: string) =>
    import('./client').then(({ del }) => del(`/account/wishlist/${productId}`)),
}
