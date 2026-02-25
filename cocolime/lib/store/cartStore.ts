import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Cart } from '@/types'

interface CartState {
  cart: Cart | null
  isOpen: boolean
  isLoading: boolean
  setCart: (cart: Cart) => void
  openDrawer: () => void
  closeDrawer: () => void
  toggleDrawer: () => void
  setLoading: (v: boolean) => void
  clearCart: () => void
  itemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: null,
      isOpen: false,
      isLoading: false,

      setCart: (cart) => set({ cart }),
      openDrawer: () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),
      toggleDrawer: () => set((s) => ({ isOpen: !s.isOpen })),
      setLoading: (v) => set({ isLoading: v }),
      clearCart: () => set({ cart: null }),
      itemCount: () => get().cart?.item_count ?? 0,
    }),
    {
      name: 'cocolime-cart',
      partialize: (state) => ({ cart: state.cart }),
    }
  )
)
