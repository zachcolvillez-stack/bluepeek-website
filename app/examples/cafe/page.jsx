'use client'
import Link from 'next/link'
import { Instagram, MapPin, Clock, Phone, ArrowRight, Coffee } from 'lucide-react'

export const dynamic = 'force-static'

const MENU = [
  { name: 'Flat White',          price: '$5.50', desc: 'Single-origin Ethiopian beans, velvety microfoam.' },
  { name: 'Avocado Smash',       price: '$18',   desc: 'Sourdough, smashed avo, feta, chilli, poached egg.' },
  { name: 'Buttermilk Pancakes', price: '$22',   desc: 'Maple-glazed, fresh berries, vanilla mascarpone.' },
]

export default function Cafe() {
  return (
    <div style={{ background: '#fdfbf7', color: '#1a1410', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Demo banner */}
      <div className="bg-amber-900 text-amber-50 text-xs text-center py-2 px-4">
        Example design by <Link href="/" className="underline font-semibold">Bluepeek</Link> — fictional business for demonstration
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-[#fdfbf7]/85 border-b border-amber-900/10">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee size={20} className="text-amber-800" />
            <span className="font-serif text-xl font-bold tracking-tight text-amber-900">Brew &amp; Bean</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-amber-900/70">
            <a href="#menu" className="hover:text-amber-900">Menu</a>
            <a href="#story" className="hover:text-amber-900">Our Story</a>
            <a href="#visit" className="hover:text-amber-900">Visit</a>
          </div>
          <button className="bg-amber-900 hover:bg-amber-950 text-amber-50 px-5 py-2 rounded-full text-sm font-semibold transition-colors">
            Order Online
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1410]/70 via-[#1a1410]/40 to-transparent" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-20 w-full">
          <div className="max-w-xl">
            <p className="text-amber-200 text-sm uppercase tracking-[0.3em] mb-6">Subiaco · Since 2018</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-amber-50 leading-tight mb-6">
              Where Subiaco<br />Starts the Day.
            </h1>
            <p className="text-amber-100/90 text-lg mb-8 leading-relaxed">
              Single-origin coffee, slow-cooked brunch, and a corner of the suburb that feels like home.
            </p>
            <div className="flex gap-4">
              <a href="#menu" className="bg-amber-50 hover:bg-white text-amber-900 px-7 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition-colors">
                See the menu <ArrowRight size={16} />
              </a>
              <a href="#visit" className="border border-amber-50/40 hover:border-amber-50 text-amber-50 px-7 py-3 rounded-full font-semibold transition-colors">
                Find us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu highlights */}
      <section id="menu" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-amber-700 uppercase tracking-[0.3em] text-xs mb-3">Today&apos;s Favourites</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-950">From the Kitchen</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {MENU.map(item => (
              <div key={item.name} className="text-center border-t-2 border-amber-900/20 pt-8">
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="font-serif text-xl font-bold text-amber-950">{item.name}</h3>
                  <span className="text-amber-800 font-medium">{item.price}</span>
                </div>
                <p className="text-amber-900/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="text-amber-800 underline underline-offset-4 hover:text-amber-950">View full menu →</a>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-24 px-6 bg-amber-900/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-amber-700 uppercase tracking-[0.3em] text-xs mb-3">Our Story</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-950 mb-6">A neighbourhood<br />gathering place.</h2>
            <p className="text-amber-900/80 text-lg leading-relaxed mb-4">
              Brew &amp; Bean started in 2018 with a simple idea — Subiaco deserved a cafe that took
              coffee seriously without taking itself too seriously.
            </p>
            <p className="text-amber-900/80 text-lg leading-relaxed">
              Six years later, we&apos;re still here. Still serving Ethiopian beans roasted weekly,
              still making everything in-house, still chatting to the same regulars over the counter.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=600&auto=format&fit=crop" alt="" className="rounded-lg object-cover w-full h-80" />
            <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop" alt="" className="rounded-lg object-cover w-full h-80 mt-8" />
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-amber-700 uppercase tracking-[0.3em] text-xs mb-3">Visit Us</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-amber-950 mb-12">Come Say Hello</h2>
          <div className="grid sm:grid-cols-3 gap-8 text-left">
            <div className="border border-amber-900/15 rounded-2xl p-6">
              <MapPin className="text-amber-700 mb-3" size={22} />
              <p className="font-semibold text-amber-950 mb-1">Location</p>
              <p className="text-amber-900/70 text-sm leading-relaxed">142 Rokeby Road<br />Subiaco WA 6008</p>
            </div>
            <div className="border border-amber-900/15 rounded-2xl p-6">
              <Clock className="text-amber-700 mb-3" size={22} />
              <p className="font-semibold text-amber-950 mb-1">Hours</p>
              <p className="text-amber-900/70 text-sm leading-relaxed">Mon–Fri 6:30am – 3pm<br />Sat–Sun 7am – 3pm</p>
            </div>
            <div className="border border-amber-900/15 rounded-2xl p-6">
              <Phone className="text-amber-700 mb-3" size={22} />
              <p className="font-semibold text-amber-950 mb-1">Contact</p>
              <p className="text-amber-900/70 text-sm leading-relaxed">(08) 9388 1234<br />hello@brewbean.com.au</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-100/80 py-10 px-6 text-center text-sm">
        <p className="font-serif text-amber-50 text-lg font-bold mb-2">Brew &amp; Bean</p>
        <div className="flex justify-center gap-4 mb-4">
          <a href="#" className="hover:text-amber-50"><Instagram size={18} /></a>
        </div>
        <p className="text-xs">© 2026 Brew &amp; Bean Cafe — Built by <Link href="/" className="underline">Bluepeek</Link></p>
      </footer>
    </div>
  )
}
