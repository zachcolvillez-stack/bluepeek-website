'use client'
import { motion } from 'framer-motion'
import { MapPin, Target, ShieldCheck, MessageCircle, Zap, Clock } from 'lucide-react'

export default function WhyUs() {
  return (
    <section id="about" className="section-tint relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="eyebrow">Why Blue Peek</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mt-5 mb-5" style={{ color: '#0c1c34' }}>
            A premium agency<br />that feels local.
          </h2>
          <p className="text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: '#475569' }}>
            Big-agency quality without the big-agency runaround. Here’s what makes Blue Peek different.
          </p>
        </motion.div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {/* Large feature — deep navy accent block */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="md:col-span-2 md:row-span-2 rounded-3xl p-8 relative overflow-hidden"
            style={{ background: 'linear-gradient(140deg, #16335c 0%, #0c1c34 100%)', boxShadow: '0 24px 60px rgba(12,28,52,0.30)' }}>
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full" style={{ background: 'radial-gradient(circle, rgba(47,95,208,0.45) 0%, transparent 70%)' }} />
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(8px)' }}>
                <MapPin size={22} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">A local Perth team — real people, real conversations.</h3>
              <p className="text-base leading-relaxed max-w-md" style={{ color: 'rgba(255,255,255,0.86)' }}>
                You’re not a ticket number. Blue Peek is based in Perth, we know the local market, and we’ll grab a coffee in person if you’re nearby. Every site is built around bringing you real customers — not design awards.
              </p>
              <div className="flex flex-wrap gap-2 mt-6">
                {['Built around leads, not vanity', 'Knows the WA market'].map(t => (
                  <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.14)', color: '#ffffff' }}>{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <BentoCard icon={ShieldCheck} title="No lock-in contracts" body="You own your domain, site and content. Walk away any time — no hostage situations." delay={0.08} />
          <BentoCard icon={Clock} title="Fast launch timelines" body="Most sites go live in 1–2 weeks. No drawn-out months of waiting." delay={0.16} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <BentoCard icon={MessageCircle} title="Clear communication" body="Plain English, no jargon. You always know what’s happening and why." delay={0.0} />
          <BentoCard icon={Zap} title="AI-ready systems" body="Lead capture and automation built in — so your site keeps working when you don’t." delay={0.08} />
          <BentoCard icon={Target} title="Direct access to Zach" body="Talk to the person actually building your site. No account managers, no offshore teams." delay={0.16} />
        </div>

        {/* ── Founder card ── */}
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="card-light mt-6 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <div className="w-28 h-28 rounded-3xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #16335c 0%, #0c1c34 100%)', boxShadow: '0 12px 30px rgba(12,28,52,0.28)' }}>
              <span className="text-4xl font-black text-white">Z</span>
            </div>
          </div>
          <div className="text-center md:text-left">
            <svg width="32" height="24" viewBox="0 0 32 24" className="mx-auto md:mx-0 mb-4" style={{ opacity: 0.14 }}>
              <path d="M0 24V12C0 5 4 1 12 0L13 4C8 5 6 8 6 12H12V24H0ZM20 24V12C20 5 24 1 32 0L33 4C28 5 26 8 26 12H32V24H20Z" fill="#0c1c34"/>
            </svg>
            <p className="text-lg md:text-xl leading-relaxed font-medium mb-5" style={{ color: '#0c1c34' }}>
              I started Blue Peek because too many great local businesses were being held back by poor — or no — websites. Every Perth business deserves an online presence that actually works for them, without paying inflated agency prices or getting locked into contracts.
            </p>
            <p className="text-xl font-bold" style={{ color: '#0c1c34', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>Zach</p>
            <p className="text-sm mt-0.5" style={{ color: '#7e8aa0' }}>Founder · Blue Peek · Perth, WA</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function BentoCard({ icon: Icon, title, body, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.5, delay }}
      className="card p-7">
      <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5" style={{ background: 'rgba(47,95,208,0.09)' }}>
        <Icon size={20} style={{ color: '#16335c' }} />
      </div>
      <h3 className="font-bold mb-2" style={{ color: '#0c1c34' }}>{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{body}</p>
    </motion.div>
  )
}
