'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { useUIStore } from '@/lib/store/uiStore'

const profileSchema = z.object({
  first_name: z.string().min(1, 'Required'),
  last_name:  z.string().min(1, 'Required'),
  email:      z.string().email('Invalid email'),
  phone:      z.string().optional(),
})

type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfilePage() {
  const [isSaving, setIsSaving] = useState(false)
  const addToast = useUIStore((s) => s.addToast)

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  })

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true)
    try {
      const { put } = await import('@/lib/api/client')
      await put('/account/profile', data)
      addToast({ type: 'success', title: 'Profile updated' })
    } catch {
      addToast({ type: 'error', title: 'Could not save profile' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div>
      <h1 className="font-[family-name:var(--font-playfair)] text-2xl text-stone-900 mb-6">Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="First name" required error={errors.first_name?.message} {...register('first_name')} />
          <Input label="Last name"  required error={errors.last_name?.message}  {...register('last_name')} />
        </div>
        <Input label="Email address" type="email" required error={errors.email?.message} {...register('email')} />
        <Input label="Phone (optional)" type="tel" hint="For order updates" error={errors.phone?.message} {...register('phone')} />

        <div className="pt-2">
          <Button type="submit" variant="primary" size="md" isLoading={isSaving}>Save changes</Button>
        </div>
      </form>
    </div>
  )
}
