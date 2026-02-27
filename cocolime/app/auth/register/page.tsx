import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { RegisterForm } from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create Account',
  robots: { index: false },
}

export default function RegisterPage() {
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-[480px]">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-display)] text-3xl text-stone-900 mb-2">
            Join Cocolime
          </h1>
          <p className="text-stone-500 text-sm">Create an account and start your beauty journey</p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-100 shadow-sm p-8">
          <Suspense fallback={<div className="h-96 animate-shimmer rounded-lg" />}>
            <RegisterForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          <Link href="/" className="hover:text-stone-700">← Back to shop</Link>
        </p>
      </div>
    </div>
  )
}
