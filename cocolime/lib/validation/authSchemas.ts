import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
  password: z.string().min(1, 'Password is required'),
})

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, 'First name is required')
      .max(50, 'Max 50 characters')
      .regex(/^[a-zA-Z\s'\-]+$/, 'Letters, hyphens and apostrophes only'),
    last_name: z
      .string()
      .min(1, 'Last name is required')
      .max(50, 'Max 50 characters'),
    email: z.string().min(1, 'Email is required').email('Enter a valid email'),
    password: z
      .string()
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Include an uppercase letter')
      .regex(/[0-9]/, 'Include a number')
      .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Include a special character'),
    confirm_password: z.string().min(1, 'Please confirm your password'),
    accepts_marketing: z.boolean(),
  })
  .refine((d) => d.password === d.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  })

export const forgotSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ForgotFormData = z.infer<typeof forgotSchema>
