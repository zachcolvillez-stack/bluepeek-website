import QuoteForm from '../../components/QuoteForm'
import { SITE } from '../../lib/site'
import { Star, Check } from 'lucide-react'

export const metadata = {
  title: 'Get a free website quote',
  description:
    'Tell us your name and number and we will call you back within one business day. Free, no obligation. Websites for Australian businesses, live in 1–2 weeks.',
  alternates: { canonical: '/free-quote' },
  // Outbound landing page — kept out of the index so it cannot compete
  // with the homepage for the same terms.
  robots: { index: false, follow: false },
}

const PROOF = [
  'Live in 1–2 weeks',
  'No lock-in contracts',
  'You own everything',
  '30+ Australian businesses',
]

export default function FreeQuotePage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* No nav — nothing to click away to. */}
      <div className="px-6 py-10 md:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2.5 mb-10">
            <img src="/brand/logo-256.png" alt="" width={34} height={34} style={{ borderRadius: 9 }} />
            <span className="font-bold text-lg tracking-tight" style={{ color: 'var(--ink)' }}>bluepeek</span>
          </div>

          <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <h1 className="font-display mb-5" style={{ fontSize: 'clamp(2.1rem,4.6vw,3.4rem)', lineHeight: 1.05 }}>
                A website that actually brings you work.
              </h1>
              <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text)' }}>
                Tell us your name and number. One of us will call you back within a business day,
                talk through what your business needs, and give you a straight price. No obligation.
              </p>

              <ul className="space-y-3 mb-9">
                {PROOF.map(p => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--lapiz)' }}>
                      <Check size={12} className="text-white" strokeWidth={3} />
                    </span>
                    <span className="text-base" style={{ color: 'var(--text)' }}>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                <div className="flex gap-0.5">
                  {[0,1,2,3,4].map(i => <Star key={i} size={16} style={{ color: 'var(--lapiz)', fill: 'var(--lapiz)' }} />)}
                </div>
                <span className="text-sm" style={{ color: 'var(--text)' }}>5.0 on Google</span>
              </div>
            </div>

            <QuoteForm id="quote-form" />
          </div>

          <p className="text-xs text-center mt-16" style={{ color: 'var(--muted)' }}>
            © {new Date().getFullYear()} Bluepeek · <a href="/terms" style={{ color: 'var(--muted)' }}>Terms</a> ·
            {' '}<a href="/privacy" style={{ color: 'var(--muted)' }}>Privacy</a> · Powered by BluePeek
          </p>
        </div>
      </div>
    </main>
  )
}
