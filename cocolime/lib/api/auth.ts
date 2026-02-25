import { get, post } from './client'
import type { AuthTokens, LoginPayload, RegisterPayload, User } from '@/types'

export const authApi = {
  login: (payload: LoginPayload) =>
    post<AuthTokens>('/auth/login', payload),

  register: (payload: RegisterPayload) =>
    post<AuthTokens>('/auth/register', payload),

  logout: () =>
    post<void>('/auth/logout'),

  refresh: () =>
    post<Pick<AuthTokens, 'access_token' | 'expires_in'>>('/auth/refresh'),

  forgotPassword: (email: string) =>
    post<{ message: string }>('/auth/forgot-password', { email }),

  getMe: () =>
    get<User>('/account/profile'),
}
