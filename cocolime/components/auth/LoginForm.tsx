'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { loginSchema, type LoginFormData } from '@/lib/validation/authSchemas'
import { authApi } from '@/lib/api/auth'
import { useAuthStore } from '@/lib/store/authStore'
import { useUIStore } from '@/lib/store/uiStore'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ApiError } from '@/types'
import type { AxiosError } from 'axios'

export function LoginForm() {
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
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      const res = await authApi.login(data)
      setUser(res.user)
      addToast({ type: 'success', title: `Welcome back, ${res.user.first_name}!` })
      router.push(returnUrl)
    } catch (err) {
      const axiosError = err as AxiosError<ApiError>
      if (axiosError.response?.status === 401) {
        setError('email', { message: 'Invalid email or password' })
        setError('password', { message: ' ' })
      } else if (axiosError.response?.data?.errors) {
        const errors = axiosError.response.data.errors
        Object.entries(errors).forEach(([field, messages]) => {
          setError(field as keyof LoginFormData, { message: messages[0] })
        })
      } else {
        addToast({ type: 'error', title: 'Sign in failed', message: 'Please try again.' })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        label="Email address"
        type="email"
        autoComplete="email"
        required
        error={errors.email?.message}
        {...register('email')}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
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

      <div className="flex justify-end">
        <Link
          href="/auth/forgot"
          className="text-sm text-stone-500 hover:text-stone-900 underline underline-offset-2"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full">
        Sign In
      </Button>

      <p className="text-center text-sm text-stone-500">
        Don&apos;t have an account?{' '}
        <Link href={`/auth/register${returnUrl !== '/account' ? `?returnUrl=${returnUrl}` : ''}`}
          className="text-stone-900 font-medium underline underline-offset-2 hover:no-underline"
        >
          Create account
        </Link>
      </p>
    </form>
  )
}
