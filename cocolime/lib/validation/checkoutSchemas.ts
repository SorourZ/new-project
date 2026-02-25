import { z } from 'zod'

export const addressSchema = z.object({
  first_name: z.string().min(1, 'Required').max(50),
  last_name: z.string().min(1, 'Required').max(50),
  line1: z.string().min(1, 'Address is required').max(100),
  line2: z.string().max(100).optional(),
  city: z.string().min(1, 'City is required').max(100),
  postcode: z.string().min(1, 'Postcode is required').max(20),
  country: z.string().length(2, 'Select a country'),
  phone: z.string().optional(),
})

export const checkoutInfoSchema = z.object({
  email: z.string().email('Enter a valid email'),
  shipping_address: addressSchema,
  save_address: z.boolean().optional(),
})

export type AddressFormData = z.infer<typeof addressSchema>
export type CheckoutInfoFormData = z.infer<typeof checkoutInfoSchema>
