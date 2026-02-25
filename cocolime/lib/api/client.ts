import axios, { type AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import type { ApiError } from '@/types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '/api'

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // send httpOnly cookies
  timeout: 15_000,
})

// ── Request interceptor ──────────────────────────────────────
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
})

// ── Response interceptor ─────────────────────────────────────
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (error: unknown) => void
}> = []

function processQueue(error: unknown) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(undefined)
    }
  })
  failedQueue = []
}

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiError>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then(() => apiClient(originalRequest))
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        await apiClient.post('/auth/refresh')
        processQueue(null)
        return apiClient(originalRequest)
      } catch (refreshError) {
        processQueue(refreshError)
        // Redirect to login if running in browser
        if (typeof window !== 'undefined') {
          const returnUrl = encodeURIComponent(window.location.pathname)
          window.location.href = `/auth/login?returnUrl=${returnUrl}`
        }
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

// ── Typed helper wrappers ────────────────────────────────────
export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const res = await apiClient.get<T>(url, { params })
  return res.data
}

export async function post<T>(url: string, data?: unknown): Promise<T> {
  const res = await apiClient.post<T>(url, data)
  return res.data
}

export async function put<T>(url: string, data?: unknown): Promise<T> {
  const res = await apiClient.put<T>(url, data)
  return res.data
}

export async function del<T>(url: string): Promise<T> {
  const res = await apiClient.delete<T>(url)
  return res.data
}
