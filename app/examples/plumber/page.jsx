'use client'
import Link from 'next/link'
import { Phone, Clock, Shield, Wrench, Droplet, Flame, Home, ThumbsUp, Star, Check } from 'lucide-react'

export const dynamic = 'force-static'

const SERVICES = [
  { icon: Droplet, title: 'Blocked Drains',     desc: 'CCTV inspection, hydro-jetting, root removal.' },
  { icon: Flame,   title: 'Hot Water Systems',  desc: 'Repairs, replacements, gas & electric.' },
  { icon: Home,    title: 'Bathroom Renos',     desc: 'Full plumbing fit-outs and renovations.' },
  { icon: Wrench,  title: 'Leaks & Taps',       desc: 'Same-day repairs for taps, toilets, pipes.' },
  { icon: Shield,  title: 'Gas Fitting',        desc: 'Licensed gas installations and repairs.' },
  { icon: ThumbsUp,title: 'Maintenance',        desc: 'Preventive checks to avoid costly issues.' },
]

const AREAS = ['Joondalup', 'Hillarys', 'Sorrento', 'Duncraig', 'Padbury', 'Kingsley', 'Mullaloo', 'Ocean Reef', 'Currambine', 'Iluka', 'Burns Beach', 'Edgewater']

export default function Plumber() {
  return (
    <div style={{ background: '#ffffff', color: '#0f172a', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Demo banner */}
      <div className="bg-blue-900 text-blue-50 text-xs text-center py-2 px-4">
        Example design by <Link href="/" className="underline font-semibold">Bluepeek</Link> — fictional business for demonstration
      </div>

      {/* Top emergency bar */}
      <div className="bg-red-600 text-white text-sm py-2 px-6 text-center font-medium">
        🚨 24/7 Emergency Plumbing — Call now: <a href="tel:0894001234" className="underline font-bold">(08) 9400 1234</a>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center">
              <Wrench size={18} className="text-white" />
            </div>
            <div>
              <p className="font-black text-slate-900 leading-none">REILLY</p>
              <p className="text-xs text-blue-700 font-semibold mt-0.5">PLUMBING &amp; GAS</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#areas"    className="hover:text-blue-700">Service Areas</a>
            <a href="#quote"    className="hover:text-blue-700">Get a Quote</a>
          </div>
          <a href="tel:0894001234" className="hidden md:inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded font-bold text-sm transition-colors">
            <Phone size={15} /> (08) 9400 1234
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-700/80 text-blue-100 px-3 py-1 rounded-full text-xs font-semibold mb-6">
              <Star size={12} className="fill-current" /> 4.9 ★ Google · 200+ reviews
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-5 leading-tight">
              Perth&apos;s Most<br />Reliable Plumber.
            </h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Family-owned, fully licensed, and on-site fast. No call-out fee for jobs over $200.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="tel:0894001234" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-7 py-4 rounded font-bold transition-colors">
                <Phone size={18} /> Call Now
              </a>
              <a href="#quote" className="inline-flex items-center bg-white hover:bg-slate-100 text-blue-900 px-7 py-4 rounded font-bold transition-colors">
                Get Free Quote
              </a>
            </div>
            <div className="flex gap-6 mt-10 text-blue-100 text-sm">
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Licensed &amp; Insured</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> Upfront Pricing</div>
              <div className="flex items-center gap-2"><Check size={16} className="text-emerald-400" /> 12-Month Warranty</div>
            </div>
          </div>
          <div className="hidden md:block bg-white rounded-2xl p-6 shadow-2xl">
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Quick Quote</p>
            <h3 className="font-bold text-slate-900 text-xl mb-4">Get a fast estimate</h3>
            <div className="space-y-3">
              <input className="w-full border border-slate-300 rounded px-4 py-2.5 text-sm" placeholder="Your name" />
              <input className="w-full border border-slate-300 rounded px-4 py-2.5 text-sm" placeholder="Phone number" />
              <select className="w-full border border-slate-300 rounded px-4 py-2.5 text-sm text-slate-600">
                <option>What do you need?</option>
                <option>Blocked drain</option>
                <option>Hot water issue</option>
                <option>Leak / repair</option>
                <option>Emergency</option>
              </select>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-bold transition-colors">
                Get My Quote →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-700 uppercase tracking-widest text-xs font-bold mb-3">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900">Plumbing Services Done Right</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map(s => (
              <div key={s.title} className="bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border-2 border-slate-100 rounded-xl p-7 transition-all">
                <div className="w-12 h-12 bg-blue-700 rounded-lg flex items-center justify-center mb-4">
                  <s.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-600 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service areas */}
      <section id="areas" className="py-24 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-blue-300 uppercase tracking-widest text-xs font-bold mb-3">Service Areas</p>
          <h2 className="text-4xl md:text-5xl font-black mb-6">Servicing Perth&apos;s Northern Suburbs</h2>
          <p className="text-slate-300 mb-10 max-w-xl mx-auto">Fast, reliable plumbing across Joondalup and surrounds. If you&apos;re north of the river, we&apos;re your local mob.</p>
          <div className="flex flex-wrap justify-center gap-2">
            {AREAS.map(a => (
              <span key={a} className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/10">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote CTA */}
      <section id="quote" className="py-24 px-6 bg-gradient-to-br from-blue-700 to-blue-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <Clock size={40} className="mx-auto mb-6 text-blue-200" />
          <h2 className="text-4xl md:text-5xl font-black mb-5">On-Site Within the Hour</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Don&apos;t wait around — call us now and we&apos;ll have a licensed plumber at your door fast.
          </p>
          <a href="tel:0894001234" className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 px-9 py-5 rounded font-black text-xl transition-colors">
            <Phone size={22} /> (08) 9400 1234
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 px-6 text-center text-sm">
        <p className="font-black text-white mb-2">REILLY PLUMBING &amp; GAS</p>
        <p className="mb-1">Lic. No. PL12345 · ABN 12 345 678 901</p>
        <p className="text-xs">© 2026 Reilly Plumbing &amp; Gas — Built by <Link href="/" className="underline">Bluepeek</Link></p>
      </footer>
    </div>
  )
}
