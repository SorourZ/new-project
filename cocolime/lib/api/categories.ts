import { get } from './client'
import type { Category } from '@/types'

export const categoriesApi = {
  list: () =>
    get<{ data: Category[] }>('/categories'),

  get: (slug: string) =>
    get<Category>(`/categories/${slug}`),
}
