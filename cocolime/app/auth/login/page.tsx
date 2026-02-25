import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { LoginForm } from '@/components/auth/LoginForm'

export const metadata: Metadata = {
  title: 'Sign In',
  robots: { index: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[440px]">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-stone-900 mb-2">
            Welcome back
          </h1>
          <p className="text-stone-500 text-sm">Sign in to your Cocolime account</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
          <Suspense fallback={<div className="h-64 animate-shimmer rounded-lg" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          <Link href="/" className="hover:text-stone-700">← Back to shop</Link>
        </p>
      </div>
    </div>
  )
}
