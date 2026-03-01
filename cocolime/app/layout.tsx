import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'

// Fonts loaded via @import in globals.css (browser-side — avoids server TLS restrictions)

export const metadata: Metadata = {
  title: {
    default: 'Cocolime — Premium Beauty & Skincare',
    template: '%s | Cocolime',
  },
  description:
    'Discover premium skincare, makeup, haircare and fragrance. Thoughtfully formulated for your most radiant self.',
  keywords: ['beauty', 'skincare', 'makeup', 'haircare', 'cosmetics', 'fragrance', 'Cocolime'],
  openGraph: {
    type: 'website',
    siteName: 'Cocolime',
    title: 'Cocolime — Premium Beauty & Skincare',
    description: 'Discover premium skincare, makeup, haircare and fragrance.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-stone-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[600] focus:px-4 focus:py-2 focus:bg-stone-900 focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <Providers>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
