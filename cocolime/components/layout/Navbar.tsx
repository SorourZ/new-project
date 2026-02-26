'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '@/lib/store/cartStore'
import { useUIStore } from '@/lib/store/uiStore'
import { cn } from '@/lib/utils/cn'
import { MegaMenu } from './MegaMenu'
import { MobileNav } from './MobileNav'
import { LogoWordmark, LogoCL } from '@/components/ui/Logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [megaMenuOpen, setMegaMenuOpen] = useState(false)
  const itemCount = useCartStore((s) => s.itemCount())
  const openDrawer = useCartStore((s) => s.openDrawer)
  const { mobileNavOpen, openMobileNav, closeMobileNav, openSearch } = useUIStore()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-[200] transition-all duration-200',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
            : 'bg-white py-4'
        )}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile: hamburger */}
            <button
              onClick={mobileNavOpen ? closeMobileNav : openMobileNav}
              className="lg:hidden p-2 -ml-2 text-stone-700 hover:text-stone-900 transition-colors"
              aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileNavOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo — wordmark on desktop, CL icon on mobile */}
            <Link href="/" aria-label="Cocolime – home" className="flex-shrink-0">
              <span className="hidden lg:block text-xl">
                <LogoWordmark />
              </span>
              <span className="lg:hidden">
                <LogoCL size={34} />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              {NAV_LINKS.map((link) =>
                link.hasMega ? (
                  <button
                    key={link.label}
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </button>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href ?? '#'}
                    className="px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-4 right-4 h-px bg-stone-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </Link>
                )
              )}
            </nav>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button
                onClick={openSearch}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              <Link
                href="/account/wishlist"
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors hidden sm:flex"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </Link>

              <Link
                href="/account"
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors hidden sm:flex"
                aria-label="Account"
              >
                <User size={20} />
              </Link>

              <button
                onClick={openDrawer}
                className="p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
                aria-label={`Cart (${itemCount} items)`}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        {megaMenuOpen && (
          <div onMouseEnter={() => setMegaMenuOpen(true)} onMouseLeave={() => setMegaMenuOpen(false)}>
            <MegaMenu onClose={() => setMegaMenuOpen(false)} />
          </div>
        )}
      </header>

      {/* Spacer */}
      <div className={scrolled ? 'h-[60px]' : 'h-[72px]'} />

      {/* Mobile nav drawer */}
      <MobileNav isOpen={mobileNavOpen} onClose={closeMobileNav} />
    </>
  )
}

const NAV_LINKS = [
  { label: 'Shop', hasMega: true },
  { label: 'Skincare', href: '/category/skincare' },
  { label: 'Makeup', href: '/category/makeup' },
  { label: 'Gifts', href: '/category/gifts' },
  { label: 'About', href: '/about' },
]
