import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'

/**
 * Cormorant Garamond — site-wide brand font (logo, headings, body).
 * Mirrors the elegant serif style of the cocolime logo wordmark.
 */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

/**
 * Jost — secondary UI font for small labels, badges, nav, metadata.
 */
const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

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
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body
        className="antialiased bg-white text-stone-900"
        style={{ fontFamily: "var(--font-display, 'Cormorant Garamond', Georgia, serif)" }}
      >
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
