import { cn } from '@/lib/utils/cn'
import type { ProductBadge } from '@/types'

interface BadgeProps {
  badge: ProductBadge
  className?: string
}

const CONFIG: Record<ProductBadge, { label: string; className: string }> = {
  new:        { label: 'New', className: 'bg-stone-900 text-white' },
  sale:       { label: 'Sale', className: 'bg-red-600 text-white' },
  low_stock:  { label: 'Low Stock', className: 'bg-amber-100 text-amber-700' },
  bestseller: { label: 'Bestseller', className: 'bg-[--color-brand-primary] text-white' },
  exclusive:  { label: 'Exclusive', className: 'bg-stone-800 text-[--color-brand-accent]' },
}

export function Badge({ badge, className }: BadgeProps) {
  const { label, className: badgeClass } = CONFIG[badge]
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase',
        badgeClass,
        className
      )}
    >
      {label}
    </span>
  )
}
