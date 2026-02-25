'use client'

import { useUIStore, type Toast } from '@/lib/store/uiStore'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const ICONS = {
  success: <CheckCircle size={18} className="text-green-600 flex-shrink-0" />,
  error:   <AlertCircle size={18} className="text-red-600 flex-shrink-0" />,
  warning: <AlertTriangle size={18} className="text-amber-600 flex-shrink-0" />,
  info:    <Info size={18} className="text-blue-600 flex-shrink-0" />,
}

const STYLES = {
  success: 'border-green-200 bg-green-50',
  error:   'border-red-200 bg-red-50',
  warning: 'border-amber-200 bg-amber-50',
  info:    'border-blue-200 bg-blue-50',
}

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useUIStore((s) => s.removeToast)

  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'flex items-start gap-3 p-4 pr-3 rounded-xl border shadow-lg max-w-sm w-full animate-slide-up',
        STYLES[toast.type]
      )}
    >
      {ICONS[toast.type]}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-stone-800">{toast.title}</p>
        {toast.message && (
          <p className="text-xs text-stone-600 mt-0.5">{toast.message}</p>
        )}
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="p-1 text-stone-400 hover:text-stone-700 transition-colors flex-shrink-0"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useUIStore((s) => s.toasts)

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 right-4 z-[500] flex flex-col gap-2 sm:top-6 sm:right-6"
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} />
      ))}
    </div>
  )
}
