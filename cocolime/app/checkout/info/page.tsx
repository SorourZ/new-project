'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { checkoutInfoSchema, type CheckoutInfoFormData } from '@/lib/validation/checkoutSchemas'
import { CheckoutProgress } from '@/components/checkout/CheckoutProgress'
import { AddressForm } from '@/components/checkout/AddressForm'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useCartStore } from '@/lib/store/cartStore'
import { formatPrice } from '@/lib/utils/currency'

export default function CheckoutInfoPage() {
  const router = useRouter()
  const { cart } = useCartStore()

  const methods = useForm<CheckoutInfoFormData>({
    resolver: zodResolver(checkoutInfoSchema),
    defaultValues: {
      shipping_address: { country: 'SA' },
    },
  })

  const { register, handleSubmit, formState: { errors, isSubmitting } } = methods

  const onSubmit = (data: CheckoutInfoFormData) => {
    // Store in session/state and proceed
    sessionStorage.setItem('checkout_info', JSON.stringify(data))
    router.push('/checkout/shipping')
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <Link href="/" className="text-2xl font-medium text-stone-900" style={{ fontFamily: 'var(--font-display)' }}>
          cocolime
        </Link>
      </div>

      <CheckoutProgress currentStep="info" />

      <div className="mt-10 grid lg:grid-cols-[1fr_380px] gap-10">
        {/* Form */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div>
              <h2 className="font-medium text-stone-900 mb-5">Contact information</h2>
              <Input
                label="Email address"
                type="email"
                autoComplete="email"
                required
                error={errors.email?.message}
                {...register('email')}
              />
            </div>

            <div>
              <h2 className="font-medium text-stone-900 mb-5">Shipping address</h2>
              <AddressForm prefix="shipping_address" />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-stone-100">
              <Link href="/cart" className="text-sm text-stone-500 hover:text-stone-900">
                ← Return to cart
              </Link>
              <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
                Continue to Shipping
              </Button>
            </div>
          </form>
        </FormProvider>

        {/* Order summary */}
        {cart && (
          <div className="bg-stone-50 rounded-2xl p-6 h-fit sticky top-24">
            <h3 className="text-sm font-semibold text-stone-700 mb-4">Order summary</h3>
            <ul className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <li key={item.id} className="flex items-center gap-3 text-sm">
                  <div className="w-12 h-14 rounded-lg bg-stone-100 flex-shrink-0 overflow-hidden relative">
                    {item.product.images?.[0] && (
                      <img src={item.product.images[0].url} alt="" className="w-full h-full object-cover" />
                    )}
                    <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-stone-400 text-white text-[10px] flex items-center justify-center font-bold">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-stone-800 truncate">{item.product.name}</p>
                    {item.variant.name && <p className="text-stone-400 text-xs">{item.variant.name}</p>}
                  </div>
                  <span className="font-medium text-stone-800 flex-shrink-0">
                    {formatPrice(item.line_total, item.product.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-t border-stone-200 pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{formatPrice(cart.subtotal, cart.currency)}</span></div>
              <div className="flex justify-between text-stone-500"><span>Shipping</span><span>Calculated next</span></div>
              <div className="flex justify-between font-semibold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span><span>{formatPrice(cart.total, cart.currency)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
