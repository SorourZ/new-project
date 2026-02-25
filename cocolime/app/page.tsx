import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Sparkles, Leaf, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cocolime — Premium Beauty & Skincare',
  description: 'Discover premium skincare, makeup, haircare and fragrance. Thoughtfully formulated for your most radiant self.',
}

const FEATURED_CATEGORIES = [
  { label: 'Skincare', slug: 'skincare', desc: 'Serums, moisturisers & more', color: 'from-rose-50 to-stone-50' },
  { label: 'Makeup', slug: 'makeup', desc: 'Face, eyes & lips', color: 'from-amber-50 to-stone-50' },
  { label: 'Haircare', slug: 'haircare', desc: 'Nourish & strengthen', color: 'from-emerald-50 to-stone-50' },
  { label: 'Fragrance', slug: 'fragrance', desc: 'Find your signature scent', color: 'from-purple-50 to-stone-50' },
]

const BRAND_VALUES = [
  { icon: <Leaf size={22} />, title: 'Clean Ingredients', desc: 'No nasties, ever. Every formula is carefully curated.' },
  { icon: <Star size={22} />, title: 'Premium Quality', desc: 'Rigorously tested for efficacy and skin compatibility.' },
  { icon: <Sparkles size={22} />, title: 'Sustainably Made', desc: 'Eco-conscious packaging and responsible sourcing.' },
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center" style={{ background: 'var(--color-brand-accent)' }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full py-20">
          <div className="max-w-[640px]">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5" style={{ color: 'var(--color-brand-muted)' }}>
              New Collection — Spring 2026
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl sm:text-6xl lg:text-7xl font-medium text-stone-900 leading-[1.05] mb-6">
              Beauty that<br />
              <em className="not-italic" style={{ color: 'var(--color-brand-highlight)' }}>speaks</em> for itself.
            </h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-8 max-w-[480px]">
              Premium formulations crafted with the finest ingredients. Because you deserve skincare that actually works.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/category/skincare"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-stone-900 text-white text-sm font-medium tracking-wider uppercase rounded-lg hover:bg-stone-700 transition-all hover:-translate-y-0.5 shadow-lg shadow-stone-900/20"
              >
                Shop Skincare <ArrowRight size={15} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-stone-300 text-stone-700 text-sm font-medium tracking-wider uppercase rounded-lg hover:border-stone-800 hover:bg-stone-50 transition-all"
              >
                Our Story
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l pointer-events-none" style={{ backgroundImage: 'linear-gradient(to left, var(--color-brand-primary-light), transparent)' }} aria-hidden />
        <div className="absolute -bottom-px left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" aria-hidden />
      </section>

      {/* CATEGORIES GRID */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2">Explore</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-stone-900">Shop by Category</h2>
          </div>
          <Link href="/products" className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors">
            All products <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className={`group relative aspect-[3/4] rounded-2xl bg-gradient-to-br ${cat.color} overflow-hidden border border-stone-100 hover:border-stone-200 transition-all hover:shadow-xl`}
            >
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-stone-900 mb-1">{cat.label}</h3>
                <p className="text-sm text-stone-500">{cat.desc}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                  Shop now <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* BRAND VALUES */}
      <section className="bg-stone-50 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BRAND_VALUES.map((v) => (
              <div key={v.title} className="flex flex-col items-center text-center p-8">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4" style={{ color: 'var(--color-brand-primary)' }}>
                  {v.icon}
                </div>
                <h3 className="font-medium text-stone-900 mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BESTSELLERS PLACEHOLDER */}
      <section className="py-20 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-400 mb-2">Most loved</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl text-stone-900">Bestsellers</h2>
          </div>
          <Link href="/products?sort=bestselling" className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors">
            View all <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-3 animate-shimmer rounded-xl" style={{ minHeight: 340 }} />
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-stone-900 py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: 'var(--color-brand-primary)' }}>Stay connected</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl text-white mb-3">Beauty, delivered to your inbox.</h2>
          <p className="text-stone-400 mb-8 text-sm">New arrivals, expert tips and exclusive offers — no spam, ever.</p>
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-3 rounded-lg bg-stone-800 border border-stone-700 text-white text-sm placeholder:text-stone-500 focus:outline-none"
              aria-label="Email for newsletter"
            />
            <button type="submit" className="px-6 py-3 text-white text-sm font-medium rounded-lg transition-colors whitespace-nowrap" style={{ background: 'var(--color-brand-primary)' }}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  )
}
