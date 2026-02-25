'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import { registerSchema, type RegisterFormData } from '@/lib/validation/authSchemas'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/store/authStore'
import { useUIStore } from '@/lib/store/uiStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import type { ApiError } from '@/types'
import type { AxiosError } from 'axios'

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase letter', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special character', pass: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ]
  const score = checks.filter((c) => c.pass).length

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors duration-300',
              score >= i
                ? score <= 1 ? 'bg-red-400'
                : score <= 2 ? 'bg-amber-400'
                : score <= 3 ? 'bg-yellow-400'
                : 'bg-green-500'
                : 'bg-stone-200'
            )}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-0.5">
        {checks.map((c) => (
          <span key={c.label} className={cn('flex items-center gap-1 text-[11px]', c.pass ? 'text-green-600' : 'text-stone-400')}>
            <CheckCircle2 size={10} className={c.pass ? 'text-green-500' : 'text-stone-300'} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') ?? '/account'
  const setUser = useAuthStore((s) => s.setUser)
  const addToast = useUIStore((s) => s.addToast)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { accepts_marketing: false },
  })

  const password = watch('password', '')

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true)
    try {
      const { confirm_password: _, ...payload } = data
      const res = await authApi.register(payload)
      setUser(res.user)
      addToast({ type: 'success', title: `Welcome to Cocolime, ${res.user.first_name}!` })
      router.push(returnUrl)
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>
      if (axiosError.response?.data?.errors) {
        const apiErrors = axiosError.response.data.errors
        Object.entries(apiErrors).forEach(([field, messages]) => {
          setError(field as keyof RegisterFormData, { message: messages[0] })
        })
      } else {
        addToast({ type: 'error', title: 'Registration failed', message: 'Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          autoComplete="given-name"
          required
          error={errors.first_name?.message}
          {...register('first_name')}
        />
        <Input
          label="Last name"
          autoComplete="family-name"
          required
          error={errors.last_name?.message}
          {...register('last_name')}
        />
      </div>

      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <div>
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            required
            error={errors.password?.message}
            {...register('password')}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-stone-400 hover:text-stone-700 transition-colors"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {password && <PasswordStrength password={password} />}
      </div>

      <Input
        label="Confirm password"
        type="password"
        autoComplete="new-password"
        required
        error={errors.confirm_password?.message}
        {...register('confirm_password')}
      />

      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          className="mt-0.5 w-4 h-4 accent-stone-900 cursor-pointer"
          {...register('accepts_marketing')}
        />
        <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
          Keep me updated with new arrivals, offers and beauty tips.
        </span>
      </label>

      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
        Create Account
      </Button>

      <p className="text-center text-xs text-stone-400">
        By creating an account you agree to our{' '}
        <Link href="/legal/terms" className="underline hover:text-stone-700">Terms</Link>{' '}
        and{' '}
        <Link href="/legal/privacy" className="underline hover:text-stone-700">Privacy Policy</Link>.
      </p>

      <p className="text-center text-sm text-stone-500">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-stone-900 font-medium underline underline-offset-2 hover:no-underline">
          Sign in
        </Link>
      </p>
    </form>
  )
}
