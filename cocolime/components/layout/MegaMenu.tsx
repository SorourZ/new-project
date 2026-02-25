'use client'

import Link from 'next/link'

const MENU_DATA = [
  {
    label: 'Skincare',
    slug: 'skincare',
    subcategories: [
      { label: 'Cleansers', slug: 'cleansers' },
      { label: 'Moisturisers', slug: 'moisturisers' },
      { label: 'Serums', slug: 'serums' },
      { label: 'Eye Care', slug: 'eye-care' },
      { label: 'SPF', slug: 'sun-protection' },
      { label: 'Masks', slug: 'masks-treatments' },
    ],
  },
  {
    label: 'Makeup',
    slug: 'makeup',
    subcategories: [
      { label: 'Face', slug: 'face' },
      { label: 'Eyes', slug: 'eyes' },
      { label: 'Lips', slug: 'lips' },
      { label: 'Setting', slug: 'setting' },
    ],
  },
  {
    label: 'Haircare',
    slug: 'haircare',
    subcategories: [
      { label: 'Shampoo & Conditioner', slug: 'shampoo-conditioner' },
      { label: 'Treatments', slug: 'treatments' },
      { label: 'Styling', slug: 'styling' },
      { label: 'Scalp Care', slug: 'scalp-care' },
    ],
  },
  {
    label: 'Fragrance',
    slug: 'fragrance',
    subcategories: [
      { label: "Women's", slug: 'womens' },
      { label: "Men's", slug: 'mens' },
      { label: 'Unisex', slug: 'unisex' },
      { label: 'Home Fragrance', slug: 'home-fragrance' },
    ],
  },
  {
    label: 'Body',
    slug: 'body',
    subcategories: [
      { label: 'Cleanse', slug: 'cleanse' },
      { label: 'Moisturise', slug: 'moisturise' },
      { label: 'Deodorant', slug: 'deodorant' },
    ],
  },
  {
    label: 'Gifts',
    slug: 'gifts',
    subcategories: [
      { label: 'Gift Sets', slug: 'gift-sets' },
      { label: 'Gift Cards', slug: 'gift-cards' },
    ],
  },
]

interface MegaMenuProps {
  onClose: () => void
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div className="absolute top-full left-0 right-0 bg-white border-t border-stone-100 shadow-xl animate-fade-in">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <div className="grid grid-cols-6 gap-8">
          {MENU_DATA.map((category) => (
            <div key={category.slug}>
              <Link
                href={`/category/${category.slug}`}
                onClick={onClose}
                className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-3 hover:text-stone-900 transition-colors"
              >
                {category.label}
              </Link>
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/category/${category.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="text-sm text-stone-700 hover:text-stone-900 hover:underline underline-offset-2 transition-colors block"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Featured CTA row */}
        <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-6">
          <Link
            href="/products"
            onClick={onClose}
            className="text-sm font-medium text-stone-900 underline underline-offset-2 hover:no-underline"
          >
            View all products →
          </Link>
          <Link
            href="/category/gifts"
            onClick={onClose}
            className="text-sm font-medium text-[--color-brand-primary] hover:text-[--color-brand-primary-hover]"
          >
            Gift ideas ✨
          </Link>
        </div>
      </div>
    </div>
  )
}
