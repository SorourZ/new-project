'use client'

import Link from 'next/link'
import { CheckCircle2, Package, Truck, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'

// In real usage, this receives the order from router.query or URL state
// after a successful POST /api/orders
export default function OrderConfirmPage() {
  const orderNumber = 'ORD-2026-00123'
  const estimatedDelivery = '3–5 business days'

  return (
    <div className="max-w-[600px] mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={32} className="text-green-600" />
      </div>

      <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-stone-900 mb-3">
        Thank you for your order!
      </h1>
      <p className="text-stone-500 mb-2">
        We&apos;ve received your order and will start preparing it right away.
      </p>
      <p className="text-sm font-medium text-stone-700 mb-8">
        Order number: <span className="font-mono text-stone-900">{orderNumber}</span>
      </p>

      <div className="bg-stone-50 rounded-2xl p-6 text-left space-y-4 mb-8">
        <div className="flex items-center gap-3 text-sm">
          <Package size={18} className="text-stone-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-stone-800">Order being processed</p>
            <p className="text-stone-500 text-xs">You&apos;ll receive a confirmation email shortly.</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Truck size={18} className="text-stone-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-stone-800">Estimated delivery</p>
            <p className="text-stone-500 text-xs">{estimatedDelivery}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <MapPin size={18} className="text-stone-400 flex-shrink-0" />
          <div>
            <p className="font-medium text-stone-800">Track your order</p>
            <p className="text-stone-500 text-xs">We&apos;ll email you tracking info when dispatched.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/account/orders">
          <Button variant="primary" size="lg">View My Orders</Button>
        </Link>
        <Link href="/">
          <Button variant="outline" size="lg">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  )
}
