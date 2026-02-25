'use client'

import { useState } from 'react'
import { X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils/cn'
import type { FiltersAvailable, ProductFilters } from '@/types'

interface FilterSidebarProps {
  filters: FiltersAvailable
  active: ProductFilters
  onChange: (filters: ProductFilters) => void
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-stone-100 pb-4 mb-4 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-stone-700 hover:text-stone-900"
        aria-expanded={open}
      >
        {title}
        <ChevronDown size={14} className={cn('text-stone-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  )
}

export function FilterSidebar({ filters, active, onChange }: FilterSidebarProps) {
  const toggle = (key: 'brands' | 'skin_types' | 'concerns', value: string) => {
    const current = (active[key] as string[]) ?? []
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    onChange({ ...active, [key]: next.length ? next : undefined, page: 1 })
  }

  const hasActive = !!(
    (active.brands?.length) ||
    (active.skin_types?.length) ||
    (active.concerns?.length) ||
    active.price_min ||
    active.price_max
  )

  return (
    <aside aria-label="Product filters">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-stone-900 tracking-wide uppercase">Filters</h2>
        {hasActive && (
          <button
            onClick={() => onChange({ page: 1 })}
            className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
          >
            <X size={12} /> Clear all
          </button>
        )}
      </div>

      {/* Active chips */}
      {hasActive && (
        <div className="flex flex-wrap gap-2 mb-4">
          {[...(active.brands ?? [])].map((v) => (
            <button key={v} onClick={() => toggle('brands', v)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-xs text-stone-700 hover:bg-stone-200">
              {v} <X size={10} />
            </button>
          ))}
          {[...(active.skin_types ?? [])].map((v) => (
            <button key={v} onClick={() => toggle('skin_types', v)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-100 text-xs text-stone-700 hover:bg-stone-200">
              {v} <X size={10} />
            </button>
          ))}
        </div>
      )}

      {filters.brands.length > 0 && (
        <FilterSection title="Brand">
          <ul className="space-y-2">
            {filters.brands.map((brand) => (
              <li key={brand}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(active.brands ?? []).includes(brand)}
                    onChange={() => toggle('brands', brand)}
                    className="w-4 h-4 rounded border-stone-300 accent-stone-900"
                  />
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                    {brand}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      {filters.skin_types.length > 0 && (
        <FilterSection title="Skin Type">
          <ul className="space-y-2">
            {filters.skin_types.map((type) => (
              <li key={type}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(active.skin_types ?? []).includes(type)}
                    onChange={() => toggle('skin_types', type)}
                    className="w-4 h-4 rounded border-stone-300 accent-stone-900"
                  />
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                    {type}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      {filters.concerns.length > 0 && (
        <FilterSection title="Concern">
          <ul className="space-y-2">
            {filters.concerns.map((concern) => (
              <li key={concern}>
                <label className="flex items-center gap-2.5 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={(active.concerns ?? []).includes(concern)}
                    onChange={() => toggle('concerns', concern)}
                    className="w-4 h-4 rounded border-stone-300 accent-stone-900"
                  />
                  <span className="text-sm text-stone-600 group-hover:text-stone-900 transition-colors">
                    {concern}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </FilterSection>
      )}

      <FilterSection title="Price Range">
        <div className="grid grid-cols-2 gap-3">
          {[['Min', 'price_min'], ['Max', 'price_max']].map(([label, key]) => (
            <div key={key}>
              <label className="text-xs text-stone-400 mb-1 block">{label} (£)</label>
              <input
                type="number"
                min={0}
                value={(active[key as keyof ProductFilters] as number ?? '') || ''}
                onChange={(e) => onChange({
                  ...active,
                  [key]: e.target.value ? Number(e.target.value) * 100 : undefined,
                  page: 1
                })}
                className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-[--color-brand-primary]"
                placeholder={label === 'Min' ? '0' : 'Any'}
              />
            </div>
          ))}
        </div>
      </FilterSection>
    </aside>
  )
}
