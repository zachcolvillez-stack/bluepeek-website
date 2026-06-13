'use client'
import { useState } from 'react'
import SceneBackground from '../components/SceneBackground'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Packages from '../components/Packages'
import Portfolio from '../components/Portfolio'
import Gallery from '../components/Gallery'
import HowItWorks from '../components/HowItWorks'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'
import FAQ, { HOME_FAQS } from '../components/FAQ'
import Contact from '../components/Contact'
import SiteFooter from '../components/site/SiteFooter'
import MobileCTA from '../components/MobileCTA'
import ChatWidget from '../components/ChatWidget'
import JsonLd from '../components/seo/JsonLd'
import { faqSchema } from '../lib/schema'

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
        <Services />
        <Packages onCTA={goTo} />
        <Portfolio />
        <HowItWorks />
        <Testimonials />
        <WhyUs />
        <FAQ />
        <Contact />
        <SiteFooter />
      </div>
      <MobileCTA onCTA={goTo} />
      <ChatWidget />
      <JsonLd data={faqSchema(HOME_FAQS)} />
    </main>
  )
}
