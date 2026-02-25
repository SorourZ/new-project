import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'outline' | 'ghost' | 'brand' | 'danger'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-stone-900 text-white hover:bg-stone-700 active:bg-stone-800',
  outline: 'border border-stone-300 text-stone-800 hover:border-stone-800 hover:bg-stone-50',
  ghost:   'text-stone-700 hover:bg-stone-100 hover:text-stone-900',
  brand:   'bg-[--color-brand-primary] text-white hover:bg-[--color-brand-primary-hover]',
  danger:  'bg-red-600 text-white hover:bg-red-700',
}

const SIZES: Record<Size, string> = {
  sm: 'px-3.5 py-2 text-xs',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-sm',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, disabled, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium',
          'tracking-[0.04em] uppercase transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-brand-primary] focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          'active:scale-[0.98]',
          VARIANTS[variant],
          SIZES[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 size={14} className="animate-spin" aria-hidden />}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
