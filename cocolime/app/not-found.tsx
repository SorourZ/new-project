import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 text-center">
      <div>
        <p className="text-[120px] font-[family-name:var(--font-display)] font-medium leading-none text-stone-100 select-none" aria-hidden>
          404
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-900 mb-3 -mt-4">
          Page not found
        </h1>
        <p className="text-stone-500 mb-8 max-w-xs mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors">
          Back to home <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
