import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy' }

export default function PrivacyPage() {
  return (
    <div className="max-w-[760px] mx-auto px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-900 mb-3">Privacy Policy</h1>
      <p className="text-sm text-stone-400 mb-10">Last updated: February 2026</p>
      <div className="prose prose-stone max-w-none text-stone-600 text-sm leading-relaxed space-y-6">
        <p>Cocolime Ltd (&ldquo;Cocolime&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is committed to protecting your personal data. This policy explains how we collect, use and safeguard your information when you use our website and services.</p>

        {[
          { h: 'Information we collect', p: 'We collect information you provide directly (name, email, shipping address, payment details), as well as usage data (pages visited, products viewed, purchase history) and technical data (IP address, browser type, cookies).' },
          { h: 'How we use your data', p: 'Your data is used to process orders, personalise your experience, send transactional emails, improve our services, and (with your consent) send marketing communications.' },
          { h: 'Data sharing', p: 'We do not sell your personal data. We share data only with trusted service providers (payment processors, shipping partners, analytics tools) under strict data processing agreements.' },
          { h: 'Your rights', p: 'You have the right to access, correct, delete, and port your personal data. You may also object to processing or withdraw consent at any time. Contact us at privacy@cocolime.com.' },
          { h: 'Cookies', p: 'We use essential, functional, analytical and marketing cookies. You can manage your preferences via our cookie banner or browser settings.' },
          { h: 'Contact', p: 'For privacy queries: privacy@cocolime.com · Cocolime Ltd, London, United Kingdom.' },
        ].map(({ h, p }) => (
          <section key={h}>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-stone-900 mb-2">{h}</h2>
            <p>{p}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
