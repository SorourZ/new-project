'use client'

import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '@/lib/api/cart'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'
import type { AddToCartPayload } from '@/types'

export function useCart() {
  const { cart, setCart, openDrawer, setLoading } = useCartStore()
  const addToast = useUIStore((s) => s.addToast)
  const queryClient = useQueryClient()

  const { isLoading: isFetching } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const data = await cartApi.get()
      setCart(data)
      return data
    },
    staleTime: 30_000,
  })

  const addMutation = useMutation({
    mutationFn: (payload: AddToCartPayload) => cartApi.addItem(payload),
    onMutate: () => setLoading(true),
    onSuccess: (data) => {
      setCart(data)
      queryClient.setQueryData(['cart'], data)
      openDrawer()
      addToast({ type: 'success', title: 'Added to cart' })
    },
    onError: () => {
      addToast({ type: 'error', title: 'Could not add item', message: 'Please try again.' })
    },
    onSettled: () => setLoading(false),
  })

  const updateMutation = useMutation({
    mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
      cartApi.updateItem(itemId, quantity),
    onSuccess: (data) => {
      setCart(data)
      queryClient.setQueryData(['cart'], data)
    },
    onError: () => addToast({ type: 'error', title: 'Could not update cart' }),
  })

  const removeMutation = useMutation({
    mutationFn: (itemId: string) => cartApi.removeItem(itemId),
    onSuccess: (data) => {
      setCart(data)
      queryClient.setQueryData(['cart'], data)
      addToast({ type: 'info', title: 'Item removed' })
    },
  })

  const couponMutation = useMutation({
    mutationFn: (code: string) => cartApi.applyCoupon(code),
    onSuccess: (data) => {
      setCart(data)
      addToast({ type: 'success', title: `Coupon applied! You save ${data.coupon_discount / 100}` })
    },
    onError: () => addToast({ type: 'error', title: 'Invalid coupon code' }),
  })

  const addToCart = useCallback(
    (payload: AddToCartPayload) => addMutation.mutate(payload),
    [addMutation]
  )

  const updateItem = useCallback(
    (itemId: string, quantity: number) => updateMutation.mutate({ itemId, quantity }),
    [updateMutation]
  )

  const removeItem = useCallback(
    (itemId: string) => removeMutation.mutate(itemId),
    [removeMutation]
  )

  const applyCoupon = useCallback(
    (code: string) => couponMutation.mutate(code),
    [couponMutation]
  )

  return {
    cart,
    isFetching,
    isAdding: addMutation.isPending,
    isUpdating: updateMutation.isPending,
    isRemoving: removeMutation.isPending,
    addToCart,
    updateItem,
    removeItem,
    applyCoupon,
  }
}
