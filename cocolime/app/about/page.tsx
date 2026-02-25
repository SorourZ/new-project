import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'The Cocolime story — premium beauty formulated with integrity.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 text-center px-4" style={{ background: 'var(--color-brand-accent)' }}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--color-brand-muted)' }}>Our story</p>
        <h1 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl text-stone-900 max-w-3xl mx-auto leading-tight">
          Beauty formulated with integrity.
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-[800px] mx-auto px-4 py-20">
        <div className="prose prose-stone max-w-none">
          <p className="text-lg text-stone-600 leading-relaxed mb-8">
            Cocolime was born from a simple belief: that premium beauty shouldn&apos;t come at the cost of your health or the planet. Founded in London, we create thoughtfully formulated products that perform — without compromise.
          </p>

          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-stone-900 mb-4 mt-10">Why we started</h2>
          <p className="text-stone-600 leading-relaxed mb-6">
            Our founder spent years navigating the overwhelming world of beauty products — frustrated by misleading labels, hidden ingredients, and the gap between luxury marketing and actual results. Cocolime is the answer to that frustration.
          </p>

          <h2 className="font-[family-name:var(--font-playfair)] text-2xl text-stone-900 mb-4 mt-10">Our commitments</h2>
          <ul className="space-y-3 text-stone-600">
            {[
              'Clean, skin-compatible formulations — never tested on animals',
              'Sustainably sourced ingredients from ethical suppliers',
              'Recyclable, minimal packaging that respects the environment',
              'Transparent labelling — what you see is exactly what you get',
              'Dermatologist reviewed and allergy tested',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: 'var(--color-brand-primary)' }} />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-100">
          <Link href="/category/skincare" className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors">
            Explore our products <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
