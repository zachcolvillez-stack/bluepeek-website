'use client'
import Link from 'next/link'
import { Instagram, ArrowRight, Calendar, Scissors, Heart } from 'lucide-react'

export const dynamic = 'force-static'

const SERVICES = [
  { name: 'Cut &amp; Style',      from: 'From $95',  desc: 'Personalised cuts and finish for any hair type.' },
  { name: 'Colour &amp; Balayage',from: 'From $220', desc: 'Hand-painted colour, foils, and balayage.' },
  { name: 'Treatments',           from: 'From $80',  desc: 'Olaplex, K-18 and bond-rebuilding treatments.' },
  { name: 'Special Events',       from: 'From $150', desc: 'Wedding hair, formals, and special occasions.' },
]

const STYLISTS = [
  { name: 'Melissa K.', role: 'Founder &amp; Senior Stylist',  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop' },
  { name: 'Olivia P.',  role: 'Colour Specialist',             img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop' },
  { name: 'Chloe M.',   role: 'Senior Stylist',                img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop' },
]

export default function Salon() {
  return (
    <div style={{ background: '#fefcfa', color: '#1a0f14', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Demo banner */}
      <div className="bg-pink-900 text-pink-50 text-xs text-center py-2 px-4">
        Example design by <Link href="/" className="underline font-semibold">Bluepeek</Link> — fictional business for demonstration
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#fefcfa]/90 backdrop-blur-md border-b border-pink-900/8">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-light tracking-[0.2em] text-pink-950">INDIGO</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm uppercase tracking-[0.15em] text-pink-950/70">
            <a href="#services" className="hover:text-pink-950">Services</a>
            <a href="#stylists" className="hover:text-pink-950">Stylists</a>
            <a href="#gallery"  className="hover:text-pink-950">Gallery</a>
          </div>
          <button className="border border-pink-950 text-pink-950 hover:bg-pink-950 hover:text-pink-50 px-6 py-2.5 text-xs uppercase tracking-[0.2em] font-medium transition-colors">
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-950/60 via-pink-950/20 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full text-center">
          <p className="text-pink-100 text-xs uppercase tracking-[0.4em] mb-6">Fremantle · Est. 2021</p>
          <h1 className="font-serif text-6xl md:text-8xl font-light text-white leading-[0.95] mb-8">
            Hair That Speaks<br /><em className="font-serif italic">Your Story.</em>
          </h1>
          <p className="text-pink-50/90 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            A boutique studio in the heart of Fremantle. Premium cuts, colour, and care — by appointment.
          </p>
          <a href="#book" className="inline-flex items-center gap-2 bg-white hover:bg-pink-50 text-pink-950 px-8 py-4 text-sm uppercase tracking-[0.2em] font-medium transition-colors">
            Book a Consultation <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-pink-700 text-xs mb-4">Our Services</p>
            <h2 className="font-serif text-5xl font-light text-pink-950">Designed for You.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-10">
            {SERVICES.map(s => (
              <div key={s.name} className="border-b border-pink-900/10 pb-6">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-serif text-2xl font-light text-pink-950" dangerouslySetInnerHTML={{ __html: s.name }} />
                  <span className="text-pink-700 text-sm font-medium">{s.from}</span>
                </div>
                <p className="text-pink-900/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section id="stylists" className="py-28 px-6 bg-pink-950 text-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-pink-300 text-xs mb-4">Meet the Team</p>
            <h2 className="font-serif text-5xl font-light text-white">Our Stylists.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STYLISTS.map(p => (
              <div key={p.name} className="text-center">
                <div className="aspect-[3/4] mb-5 overflow-hidden">
                  <img src={p.img} alt="" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-1">{p.name}</h3>
                <p className="text-pink-300 text-xs uppercase tracking-[0.2em]" dangerouslySetInnerHTML={{ __html: p.role }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.3em] text-pink-700 text-xs mb-4">Our Work</p>
            <h2 className="font-serif text-5xl font-light text-pink-950 mb-4">Recent Looks.</h2>
            <a href="#" className="inline-flex items-center gap-2 text-pink-800 hover:text-pink-950 text-sm">
              <Instagram size={16} /> @indigo.studio
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&auto=format&fit=crop',
            ].map((src, i) => (
              <div key={i} className="aspect-square overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book CTA */}
      <section id="book" className="py-28 px-6 bg-pink-50">
        <div className="max-w-3xl mx-auto text-center">
          <Calendar className="text-pink-700 mx-auto mb-6" size={40} />
          <h2 className="font-serif text-5xl font-light text-pink-950 mb-5">Ready for Your Next Look?</h2>
          <p className="text-pink-900/70 text-lg mb-8">Book online in under a minute. Same-week appointments often available.</p>
          <button className="bg-pink-950 hover:bg-pink-900 text-pink-50 px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium transition-colors">
            Book Online
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-pink-950 text-pink-200/70 py-10 px-6 text-center text-sm">
        <p className="font-serif text-pink-50 text-2xl font-light tracking-[0.2em] mb-2">INDIGO</p>
        <p className="text-xs mb-3">142 South Terrace, Fremantle WA 6160</p>
        <p className="text-xs">© 2026 Indigo Hair Studio — Built by <Link href="/" className="underline">Bluepeek</Link></p>
      </footer>
    </div>
  )
}
