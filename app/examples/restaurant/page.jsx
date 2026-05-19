'use client'
import Link from 'next/link'
import { Star, MapPin, Clock, Calendar, ArrowRight } from 'lucide-react'

export const dynamic = 'force-static'

const DISHES = [
  { name: 'Marron, Saffron, Brown Butter',     desc: 'Local marron poached in saffron, finished with brown butter sauce and finger lime.', price: '$48' },
  { name: 'Wagyu Sirloin, Black Garlic',       desc: 'Margaret River wagyu, black garlic purée, smoked bone marrow, fermented chilli.',     price: '$72' },
  { name: 'Wild Mushroom, Pearl Barley, Truffle', desc: 'Pearl barley risotto with foraged mushrooms, parmesan crisp, fresh black truffle.',  price: '$36' },
]

const REVIEWS = [
  { stars: 5, text: 'The marron dish was unreal. Best meal in Perth this year.', author: 'James W.' },
  { stars: 5, text: 'Stunning food, perfect service. Already booked our next visit.', author: 'Anna B.' },
  { stars: 5, text: 'A genuine fine-dining experience in the heart of Northbridge.', author: 'Marc T.' },
]

export default function Restaurant() {
  return (
    <div style={{ background: '#0a0908', color: '#f5f5f4', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
      {/* Demo banner */}
      <div className="bg-stone-900 text-stone-400 text-xs text-center py-2 px-4 border-b border-stone-800">
        Example design by <Link href="/" className="underline font-semibold">Bluepeek</Link> — fictional business for demonstration
      </div>

      {/* Nav */}
      <nav className="absolute top-9 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="font-serif text-2xl tracking-[0.15em] text-stone-100">THE LONG TABLE</div>
          <div className="hidden md:flex items-center gap-10 text-xs uppercase tracking-[0.2em] text-stone-300">
            <a href="#menu"   className="hover:text-white">Menu</a>
            <a href="#about"  className="hover:text-white">About</a>
            <a href="#visit"  className="hover:text-white">Visit</a>
          </div>
          <button className="border border-stone-400/50 hover:border-stone-100 hover:bg-stone-100 hover:text-stone-950 text-stone-100 px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors">
            Reserve
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=2000&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/80 via-stone-950/50 to-stone-950" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center w-full">
          <p className="text-amber-200 text-xs uppercase tracking-[0.4em] mb-8">Northbridge · Modern Australian</p>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-[0.95] mb-8 text-stone-50">
            Seasonal.<br /><em className="italic text-amber-100">Considered.</em><br />Always Local.
          </h1>
          <p className="text-stone-300 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            A 32-seat restaurant celebrating the produce of Western Australia. Modern, intimate, unforgettable.
          </p>
          <a href="#visit" className="inline-flex items-center gap-3 bg-amber-100 hover:bg-amber-50 text-stone-950 px-9 py-4 text-sm uppercase tracking-[0.2em] font-medium transition-colors">
            Reserve a Table <ArrowRight size={14} />
          </a>
        </div>
      </section>

      {/* Menu */}
      <section id="menu" className="py-28 px-6 bg-stone-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="uppercase tracking-[0.3em] text-amber-200/70 text-xs mb-4">From Our Kitchen</p>
            <h2 className="font-serif text-5xl font-light text-stone-50">A Taste of the Menu.</h2>
          </div>
          <div className="space-y-10">
            {DISHES.map(d => (
              <div key={d.name} className="border-b border-stone-800 pb-10">
                <div className="flex items-baseline justify-between gap-6 mb-3">
                  <h3 className="font-serif text-2xl text-stone-100">{d.name}</h3>
                  <span className="text-amber-200 font-light">{d.price}</span>
                </div>
                <p className="text-stone-400 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="text-amber-200/80 underline underline-offset-4 hover:text-amber-100 text-sm uppercase tracking-[0.2em]">View Full Menu</a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="uppercase tracking-[0.3em] text-amber-200/70 text-xs mb-4">Our Philosophy</p>
            <h2 className="font-serif text-5xl font-light text-stone-50 mb-6 leading-tight">Slow food.<br />Honest service.</h2>
            <p className="text-stone-400 text-lg leading-relaxed mb-4">
              We source produce within 200km of our kitchen. We change the menu weekly. We cook with
              fire, with patience, and with deep respect for what the land gives us.
            </p>
            <p className="text-stone-400 text-lg leading-relaxed">
              Chef Tom Whitfield leads our kitchen — formerly of Wildflower and Restaurant Amusé.
            </p>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-28 px-6 bg-stone-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-4">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-300 fill-amber-300" />)}
            </div>
            <p className="text-stone-300 text-sm">4.9 · 380+ reviews · Two Hats — Good Food Guide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {REVIEWS.map(r => (
              <div key={r.author} className="border border-stone-800 p-8">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, i) => <Star key={i} size={12} className="text-amber-300 fill-amber-300" />)}
                </div>
                <p className="text-stone-200 italic font-serif text-lg leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <p className="text-stone-500 text-sm">— {r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Calendar className="text-amber-200 mx-auto mb-6" size={36} />
          <h2 className="font-serif text-5xl font-light text-stone-50 mb-6">Book a Table.</h2>
          <p className="text-stone-400 mb-10 max-w-md mx-auto">Open Wednesday to Sunday. We highly recommend booking ahead — we book out 2–3 weeks in advance.</p>
          <div className="grid sm:grid-cols-2 gap-6 mb-10 text-left">
            <div className="border border-stone-800 p-6">
              <MapPin className="text-amber-200/70 mb-3" size={20} />
              <p className="font-serif text-stone-100 text-xl mb-1">Location</p>
              <p className="text-stone-400 text-sm">88 William Street<br />Northbridge WA 6003</p>
            </div>
            <div className="border border-stone-800 p-6">
              <Clock className="text-amber-200/70 mb-3" size={20} />
              <p className="font-serif text-stone-100 text-xl mb-1">Hours</p>
              <p className="text-stone-400 text-sm">Wed–Sat 5:30pm – late<br />Sun 12pm – 3pm</p>
            </div>
          </div>
          <button className="bg-amber-100 hover:bg-amber-50 text-stone-950 px-10 py-4 uppercase tracking-[0.2em] text-sm font-medium transition-colors">
            Reserve Online
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 border-t border-stone-900 text-stone-500 py-10 px-6 text-center text-sm">
        <p className="font-serif text-stone-100 text-xl tracking-[0.15em] mb-2">THE LONG TABLE</p>
        <p className="text-xs">© 2026 The Long Table — Built by <Link href="/" className="underline">Bluepeek</Link></p>
      </footer>
    </div>
  )
}
