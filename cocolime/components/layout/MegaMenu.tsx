'use client'

import Link from 'next/link'

const MENU_DATA = [
  {
    label: 'Skincare',
    slug: 'skincare',
    accent: 'var(--color-cat-skincare)',
    bg: 'var(--color-cat-skincare-bg)',
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
    accent: 'var(--color-cat-makeup)',
    bg: 'var(--color-cat-makeup-bg)',
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
    accent: 'var(--color-cat-haircare)',
    bg: 'var(--color-cat-haircare-bg)',
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
    accent: 'var(--color-cat-fragrance)',
    bg: 'var(--color-cat-fragrance-bg)',
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
    accent: 'var(--color-cat-body)',
    bg: 'var(--color-cat-body-bg)',
    subcategories: [
      { label: 'Cleanse', slug: 'cleanse' },
      { label: 'Moisturise', slug: 'moisturise' },
      { label: 'Deodorant', slug: 'deodorant' },
    ],
  },
  {
    label: 'Gifts',
    slug: 'gifts',
    accent: 'var(--color-cat-gifts)',
    bg: 'var(--color-cat-gifts-bg)',
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
        <div className="grid grid-cols-6 gap-6">
          {MENU_DATA.map((category) => (
            <div key={category.slug}>
              {/* Category header with accent colour pill */}
              <Link
                href={`/category/${category.slug}`}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 mb-3 group"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                  style={{ background: category.accent }}
                />
                <span
                  className="text-xs font-semibold tracking-widest uppercase transition-colors"
                  style={{ color: category.accent }}
                >
                  {category.label}
                </span>
              </Link>
              {/* Subcategory links */}
              <ul className="space-y-2">
                {category.subcategories.map((sub) => (
                  <li key={sub.slug}>
                    <Link
                      href={`/category/${category.slug}/${sub.slug}`}
                      onClick={onClose}
                      className="text-sm text-stone-600 hover:text-stone-900 transition-colors block pl-3.5 border-l-2 border-transparent hover:border-current"
                      style={{ ['--tw-border-opacity' as string]: '1' }}
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
