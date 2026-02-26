'use client'

import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/Input'

const COUNTRIES = [
  { code: 'SA', name: 'Saudi Arabia' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'KW', name: 'Kuwait' },
  { code: 'BH', name: 'Bahrain' },
  { code: 'QA', name: 'Qatar' },
  { code: 'OM', name: 'Oman' },
  { code: 'JO', name: 'Jordan' },
  { code: 'EG', name: 'Egypt' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'US', name: 'United States' },
]

interface AddressFormProps {
  prefix?: string
}

export function AddressForm({ prefix = 'shipping_address' }: AddressFormProps) {
  const { register, formState: { errors } } = useFormContext()

  const field = (name: string) => `${prefix}.${name}` as const
  const err = (name: string): string | undefined => {
    const parts = name.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let e: any = errors
    for (const part of parts) e = e?.[part]
    return e?.message as string | undefined
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="First name"
          autoComplete="given-name"
          required
          error={err(`${prefix}.first_name`)}
          {...register(field('first_name'))}
        />
        <Input
          label="Last name"
          autoComplete="family-name"
          required
          error={err(`${prefix}.last_name`)}
          {...register(field('last_name'))}
        />
      </div>

      <Input
        label="Address line 1"
        autoComplete="address-line1"
        required
        error={err(`${prefix}.line1`)}
        {...register(field('line1'))}
      />

      <Input
        label="Address line 2"
        autoComplete="address-line2"
        error={err(`${prefix}.line2`)}
        {...register(field('line2'))}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          autoComplete="address-level2"
          required
          error={err(`${prefix}.city`)}
          {...register(field('city'))}
        />
        <Input
          label="Postal code"
          autoComplete="postal-code"
          required
          placeholder="e.g. 11564"
          error={err(`${prefix}.postcode`)}
          {...register(field('postcode'))}
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-stone-700">
          Country <span className="text-red-500">*</span>
        </label>
        <select
          {...register(field('country'))}
          className="w-full px-4 py-3 rounded-lg border border-stone-200 text-sm text-stone-900 bg-white focus:outline-none focus:ring-2 focus:ring-[--color-brand-primary] focus:border-transparent hover:border-stone-300 transition-all"
          defaultValue="SA"
        >
          <option value="" disabled>Select country</option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.name}</option>
          ))}
        </select>
        {err(`${prefix}.country`) && (
          <p className="text-xs text-red-600">{err(`${prefix}.country`)}</p>
        )}
      </div>

      <Input
        label="Phone (optional)"
        type="tel"
        autoComplete="tel"
        placeholder="+966 5X XXX XXXX"
        error={err(`${prefix}.phone`)}
        hint="For delivery updates only"
        {...register(field('phone'))}
      />
    </div>
  )
}
