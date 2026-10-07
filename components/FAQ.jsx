'use client'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { HOME_FAQS } from '../lib/faqs'



export default function FAQ() {
  return (
    <section id="faq" className="relative py-28 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <span className="eyebrow">FAQ</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: 'var(--ink)' }}>
            Questions, answered.
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text)' }}>
            The things Perth business owners usually ask Bluepeek before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {HOME_FAQS.map((f, i) => (
            <details key={i} className="card p-5 group" style={{ borderRadius: '8px' }}>
              <summary className="flex items-center justify-between cursor-pointer list-none font-semibold" style={{ color: 'var(--ink)' }}>
                {f.q}
                <ChevronRight size={18} className="transition-transform group-open:rotate-90 flex-shrink-0 ml-3" style={{ color: 'var(--muted)' }} />
              </summary>
              <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--text)' }}>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export { HOME_FAQS }
