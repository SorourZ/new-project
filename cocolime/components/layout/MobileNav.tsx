'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, X, Heart, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const NAV_DATA = [
  {
    label: 'Skincare',
    slug: 'skincare',
    subcategories: ['Cleansers', 'Moisturisers', 'Serums', 'Eye Care', 'SPF', 'Masks'],
  },
  {
    label: 'Makeup',
    slug: 'makeup',
    subcategories: ['Face', 'Eyes', 'Lips', 'Setting'],
  },
  {
    label: 'Haircare',
    slug: 'haircare',
    subcategories: ['Shampoo & Conditioner', 'Treatments', 'Styling', 'Scalp Care'],
  },
  {
    label: 'Fragrance',
    slug: 'fragrance',
    subcategories: ["Women's", "Men's", 'Unisex', 'Home Fragrance'],
  },
  {
    label: 'Body',
    slug: 'body',
    subcategories: ['Cleanse', 'Moisturise', 'Deodorant'],
  },
  {
    label: 'Gifts',
    slug: 'gifts',
    subcategories: ['Gift Sets', 'Gift Cards'],
  },
]

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [openSection, setOpenSection] = useState<string | null>(null)

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[290] lg:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white z-[300] lg:hidden flex flex-col',
          'transition-transform duration-300 ease-out shadow-xl',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100">
          <span className="font-[family-name:var(--font-playfair)] text-xl font-medium">
            Cocolime
          </span>
          <button onClick={onClose} className="p-1 text-stone-500 hover:text-stone-900" aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-4">
          {NAV_DATA.map((item) => (
            <div key={item.slug} className="border-b border-stone-100 last:border-0">
              <button
                onClick={() => setOpenSection(openSection === item.slug ? null : item.slug)}
                className="flex items-center justify-between w-full px-5 py-4 text-sm font-medium text-stone-800 hover:bg-stone-50 transition-colors"
                aria-expanded={openSection === item.slug}
              >
                {item.label}
                <ChevronDown
                  size={16}
                  className={cn(
                    'text-stone-400 transition-transform duration-200',
                    openSection === item.slug && 'rotate-180'
                  )}
                />
              </button>

              {openSection === item.slug && (
                <div className="bg-stone-50 px-5 pb-3">
                  <Link
                    href={`/category/${item.slug}`}
                    onClick={onClose}
                    className="block py-2 text-xs font-semibold tracking-wider uppercase text-stone-400 hover:text-stone-700"
                  >
                    View all {item.label}
                  </Link>
                  {item.subcategories.map((sub) => (
                    <Link
                      key={sub}
                      href={`/category/${item.slug}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={onClose}
                      className="block py-2 text-sm text-stone-600 hover:text-stone-900 pl-3 border-l-2 border-stone-200 hover:border-stone-400 transition-colors"
                    >
                      {sub}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="px-5 py-3">
            <Link href="/about" onClick={onClose} className="block py-3 text-sm font-medium text-stone-800 hover:text-stone-600">About</Link>
            <Link href="/contact" onClick={onClose} className="block py-3 text-sm font-medium text-stone-800 hover:text-stone-600">Contact</Link>
          </div>
        </nav>

        {/* Footer links */}
        <div className="border-t border-stone-100 px-5 py-4 flex gap-4">
          <Link href="/account" onClick={onClose} className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900">
            <User size={16} /> Account
          </Link>
          <Link href="/account/wishlist" onClick={onClose} className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900">
            <Heart size={16} /> Wishlist
          </Link>
        </div>
      </div>
    </>
  )
}
