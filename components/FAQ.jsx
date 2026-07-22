'use client'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export const HOME_FAQS = [
  { q: 'How much does a website cost in Perth?', a: 'Every project is custom-quoted to fit your business and goals - we have Starter, Growth and Scale packages. Get in touch for a free, no-obligation quote.' },
  { q: 'How long does it take to build?', a: 'Most websites go live in one to two weeks once we have your content. We keep you in the loop with drafts and feedback the whole way.' },
  { q: 'Do I own my website?', a: 'Yes - 100%. You own your domain, content and site, with no lock-in contracts. You can take it elsewhere any time.' },
  { q: 'Do you offer AI chatbots and automation?', a: 'Yes. We build 24/7 AI assistants and automations that capture and follow up on leads for you - included in our Growth and Scale packages, or added to an existing site.' },
  { q: 'What areas do you cover?', a: 'We’re based in Perth and work with businesses right across the Perth metro area and wider Western Australia.' },
  { q: 'Can you improve my existing website?', a: 'Often, yes - we can review your current site and improve its design, SEO and lead capture, or rebuild it if that makes more sense for you.' },
  { q: 'Do you do SEO and get my business found on Google?', a: 'Yes. Every Blue Peek site is built with local SEO from the ground up - clean structure, fast loading, proper page setup and Google-ready basics - so you show up when nearby customers search for what you do.' },
  { q: 'Will my website show up on ChatGPT and AI search?', a: 'Yes - it is one of the things that sets us apart. We build for GEO (generative engine optimisation): structured data, an llms.txt file and clear, factual content so AI answer engines like ChatGPT, Perplexity and Google AI can understand and recommend your business.' },
  { q: 'Do you set up online booking and appointments?', a: 'Yes. On our Growth and Scale packages we can add online booking and appointment systems so customers can book you 24/7, straight from your site.' },
  { q: 'Can you help me get more Google reviews?', a: 'Yes. More reviews lift your Google ranking and your visibility in AI search, so we help you turn happy customers into 5-star reviews - including our tap-to-review plaques.' },
  { q: 'Do you only build websites in Perth?', a: 'We started in Perth and cover all of Western Australia, and we now also work with businesses in the United Kingdom and Ireland.' },
  { q: 'What makes Blue Peek different?', a: 'Premium quality without big-agency prices, no lock-in contracts, you own everything, most sites live in one to two weeks, and we build for both Google and AI search - plus ongoing care so your site keeps working for you.' },
]

export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="eyebrow">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0c1c34' }}>
            Questions, answered.
          </h2>
          <p className="text-base md:text-lg" style={{ color: '#475569' }}>
            The things Perth business owners usually ask Blue Peek before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {HOME_FAQS.map((f, i) => (
            <details key={i} className="card p-5 group" style={{ borderRadius: '16px' }}>
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold" style={{ color: '#0c1c34' }}>
                {f.q}
                <ChevronRight size={18} className="transition-transform group-open:rotate-90 flex-shrink-0 ml-3" style={{ color: '#7e8aa0' }} />
              </summary>
              <p className="text-sm leading-relaxed mt-3" style={{ color: '#475569' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
