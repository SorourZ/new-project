'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Log to Sentry or similar
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 text-center">
      <div>
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <AlertCircle size={28} className="text-red-500" />
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-stone-900 mb-3">
          Something went wrong
        </h1>
        <p className="text-stone-500 mb-8 max-w-xs mx-auto">
          An unexpected error occurred. Please try again or contact support if the problem persists.
        </p>
        <Button onClick={reset} variant="primary" size="lg">
          <RefreshCw size={14} /> Try again
        </Button>
      </div>
    </div>
  )
}
