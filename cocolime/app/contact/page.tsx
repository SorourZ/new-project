import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact & Support',
  description: 'Get in touch with the Cocolime team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-[800px] mx-auto px-4 py-16">
      <h1 className="font-[family-name:var(--font-display)] text-4xl text-stone-900 mb-4">Contact & Support</h1>
      <p className="text-stone-500 mb-12">We&apos;re here to help. Reach out via the form below and we&apos;ll get back to you within one business day.</p>

      <div className="grid sm:grid-cols-2 gap-12">
        <form className="space-y-4">
          {[['Name', 'text', 'Your name'], ['Email', 'email', 'your@email.com'], ['Subject', 'text', 'How can we help?']].map(([label, type, placeholder]) => (
            <div key={label}>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
              <input type={type} placeholder={placeholder}
                className="w-full px-4 py-3 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 bg-white" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1.5">Message</label>
            <textarea rows={5} placeholder="Tell us more..."
              className="w-full px-4 py-3 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-200 bg-white resize-none" />
          </div>
          <button type="submit"
            className="w-full py-3 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-700 transition-colors">
            Send Message
          </button>
        </form>

        <div className="space-y-6">
          {[
            { title: 'Email', value: 'hello@cocolime.com' },
            { title: 'Hours', value: 'Sun–Thu, 9am–6pm AST' },
            { title: 'Returns', value: '30-day hassle-free returns' },
            { title: 'Delivery', value: 'Saudi Arabia: 2–4 business days' },
          ].map((item) => (
            <div key={item.title}>
              <p className="text-xs font-semibold tracking-wider uppercase text-stone-400 mb-1">{item.title}</p>
              <p className="text-sm text-stone-700">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
