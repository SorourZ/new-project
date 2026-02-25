import Link from 'next/link'
import { User, MapPin, ShoppingBag, Heart } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Account',
  robots: { index: false },
}

const ACCOUNT_NAV = [
  { href: '/account/profile', icon: <User size={16} />, label: 'Profile' },
  { href: '/account/orders', icon: <ShoppingBag size={16} />, label: 'Orders' },
  { href: '/account/addresses', icon: <MapPin size={16} />, label: 'Addresses' },
  { href: '/account/wishlist', icon: <Heart size={16} />, label: 'Wishlist' },
]

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-10">
      <div className="grid lg:grid-cols-[240px_1fr] gap-10">
        {/* Sidebar */}
        <aside>
          <div className="bg-stone-50 rounded-2xl p-5">
            <h2 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-4 px-2">
              My Account
            </h2>
            <nav className="space-y-1">
              {ACCOUNT_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-stone-600 hover:bg-white hover:text-stone-900 transition-all"
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 pt-4 border-t border-stone-200">
              <button className="w-full text-left px-3 py-2 text-sm text-stone-400 hover:text-red-600 transition-colors rounded-xl hover:bg-red-50">
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Content */}
        <div>{children}</div>
      </div>
    </div>
  )
}
