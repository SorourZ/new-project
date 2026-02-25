import { Check } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const STEPS = [
  { id: 'info', label: 'Information' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
  { id: 'confirm', label: 'Confirm' },
]

interface CheckoutProgressProps {
  currentStep: string
}

export function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const currentIdx = STEPS.findIndex((s) => s.id === currentStep)

  return (
    <nav aria-label="Checkout steps">
      <ol className="flex items-center justify-center gap-0">
        {STEPS.map((step, idx) => {
          const isDone    = idx < currentIdx
          const isCurrent = idx === currentIdx

          return (
            <li key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all',
                    isDone    ? 'bg-stone-900 text-white' :
                    isCurrent ? 'bg-stone-900 text-white ring-4 ring-stone-900/20' :
                                'bg-stone-100 text-stone-400'
                  )}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isDone ? <Check size={14} /> : idx + 1}
                </div>
                <span className={cn(
                  'mt-1.5 text-[11px] font-medium hidden sm:block',
                  isCurrent ? 'text-stone-900' : isDone ? 'text-stone-600' : 'text-stone-400'
                )}>
                  {step.label}
                </span>
              </div>

              {idx < STEPS.length - 1 && (
                <div className={cn(
                  'w-16 sm:w-24 h-px mx-2 transition-colors',
                  isDone ? 'bg-stone-900' : 'bg-stone-200'
                )} aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
