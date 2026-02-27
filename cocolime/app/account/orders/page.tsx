'use client'

import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Package, ExternalLink } from 'lucide-react'
import { ordersApi } from '@/lib/api/orders'
import { formatPrice } from '@/lib/utils/currency'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils/cn'
import type { OrderStatus } from '@/types'

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending:    'bg-stone-100 text-stone-600',
  processing: 'bg-blue-100 text-blue-700',
  shipped:    'bg-amber-100 text-amber-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-600',
  refunded:   'bg-stone-100 text-stone-500',
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending', processing: 'Processing', shipped: 'Shipped',
  delivered: 'Delivered', cancelled: 'Cancelled', refunded: 'Refunded',
}

export default function OrdersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.list(),
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h1 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 mb-6">Order History</h1>
        {[1,2,3].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
      </div>
    )
  }

  const orders = data?.data ?? []

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-2xl text-stone-900 mb-6">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package size={48} className="text-stone-200 mx-auto mb-4" />
          <p className="text-stone-500 mb-4">You haven&apos;t placed any orders yet.</p>
          <Link href="/products" className="text-sm font-medium text-stone-900 underline underline-offset-2">
            Start shopping
          </Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border border-stone-100 rounded-2xl p-5 hover:border-stone-200 transition-colors">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div>
                  <p className="text-xs text-stone-400 mb-1">
                    {new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                  <p className="font-mono text-sm font-semibold text-stone-800">{order.order_number}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={cn('text-xs font-medium px-3 py-1 rounded-full', STATUS_STYLES[order.status])}>
                    {STATUS_LABELS[order.status]}
                  </span>
                  <span className="font-semibold text-stone-900">{formatPrice(order.total, order.currency)}</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-stone-500">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  {order.tracking_number && (
                    <> · <a href={order.tracking_url ?? '#'} target="_blank" rel="noopener noreferrer"
                        className="text-stone-700 hover:underline inline-flex items-center gap-1">
                        Track <ExternalLink size={12} />
                      </a>
                    </>
                  )}
                </p>
                <Link href={`/account/orders/${order.id}`} className="text-sm font-medium text-stone-900 hover:text-stone-600 transition-colors">
                  View details →
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
