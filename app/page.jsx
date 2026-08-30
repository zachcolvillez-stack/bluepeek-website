'use client'
import { useState } from 'react'
import SceneBackground from '../components/SceneBackground'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Packages from '../components/Packages'
import Portfolio from '../components/Portfolio'
import ThreePhones from '../components/ThreePhones'
import Founders from '../components/Founders'
import Reviews from '../components/Reviews'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'
import Contact from '../components/Contact'
import SiteFooter from '../components/site/SiteFooter'
import MobileCTA from '../components/MobileCTA'
import ChatWidget from '../components/ChatWidget'

export default function Home() {
  const [scene, setScene] = useState('hero')

  const goTo = (target) => {
    setScene(target)
    const el = document.getElementById(target)
    if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100)
    else window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <main className="relative">
      <SceneBackground />
      <div className="relative z-10">
        <Nav onNavigate={goTo} currentScene={scene} />
        <Hero onCTA={goTo} />

        {/* Quick facts strip - short, declarative facts for people and AI answer engines */}
        <div className="px-6 pb-14">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-3 py-5 px-6 rounded-2xl text-center"
            style={{ background: '#f7f9fc', border: '1px solid rgba(12,28,52,0.08)' }}>
            {[
              '5.0★ · 19 Google reviews',
              '13+ Australian businesses live',
              '1–2 week turnaround',
              'No lock-in contracts',
              'You own everything',
            ].map((fact, i, arr) => (
              <span key={fact} className="flex items-center gap-x-6">
                <span className="text-sm font-medium" style={{ color: '#475569' }}>{fact}</span>
                {i < arr.length - 1 && <span className="hidden sm:inline-block w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#c3cdda' }} />}
              </span>
            ))}
          </div>
        </div>
        <Services />
        <Packages onCTA={goTo} />
        <ThreePhones />
        <Portfolio />
        <Founders />
        <Reviews />
        <HowItWorks />
        <Testimonials />
        <WhyUs />
        <Contact />
        <SiteFooter />
      </div>
      <MobileCTA onCTA={goTo} />
      <ChatWidget />
    </main>
  )
}
