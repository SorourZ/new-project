import { forwardRef } from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, id, className, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-stone-700">
            {label}
            {props.required && <span className="text-red-500 ml-1" aria-hidden>*</span>}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
          aria-invalid={!!error}
          className={cn(
            'w-full px-4 py-3 rounded-lg border text-sm text-stone-900 placeholder:text-stone-400',
            'bg-white transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[--color-brand-primary] focus:border-transparent',
            error
              ? 'border-red-400 focus:ring-red-400 bg-red-50'
              : 'border-stone-200 hover:border-stone-300',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-red-600 flex items-center gap-1" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${inputId}-hint`} className="text-xs text-stone-400">{hint}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
