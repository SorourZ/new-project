import Link from 'next/link'
import { Instagram, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8 mt-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-white block mb-4">
              Cocolime
            </span>
            <p className="text-sm leading-relaxed text-stone-400 max-w-[240px]">
              Premium beauty, thoughtfully formulated for your most radiant self.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4">
                {col.title}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-stone-800 pt-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white mb-1">Stay in the loop</p>
              <p className="text-xs text-stone-500">New arrivals, exclusive offers and beauty tips.</p>
            </div>
            <form className="flex gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 sm:w-60 px-4 py-2.5 rounded-md bg-stone-800 border border-stone-700 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-[--color-brand-primary]"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[--color-brand-primary] text-white text-sm font-medium rounded-md hover:bg-[--color-brand-primary-hover] transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Cocolime Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/legal/returns" className="hover:text-white transition-colors">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

const FOOTER_LINKS = [
  {
    title: 'Shop',
    links: [
      { label: 'Skincare', href: '/category/skincare' },
      { label: 'Makeup', href: '/category/makeup' },
      { label: 'Haircare', href: '/category/haircare' },
      { label: 'Fragrance', href: '/category/fragrance' },
      { label: 'Gift Sets', href: '/category/gifts' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign In', href: '/auth/login' },
      { label: 'Register', href: '/auth/register' },
      { label: 'Orders', href: '/account/orders' },
      { label: 'Wishlist', href: '/account/wishlist' },
      { label: 'Addresses', href: '/account/addresses' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact Us', href: '/contact' },
      { label: 'Returns', href: '/legal/returns' },
      { label: 'Shipping', href: '/contact' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
    ],
  },
]
