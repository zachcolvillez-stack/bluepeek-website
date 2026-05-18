'use client'
import { useState } from 'react'
import SceneBackground from '../components/SceneBackground'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Services from '../components/Services'
import HowItWorks from '../components/HowItWorks'
import WhyUs from '../components/WhyUs'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

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
      <SceneBackground scene={scene} />
      <div className="relative z-10">
        <Nav onNavigate={goTo} currentScene={scene} />
        <Hero onCTA={goTo} />
        <Services />
        <HowItWorks />
        <WhyUs />
        <Contact />
        <Footer onNavigate={goTo} />
      </div>
    </main>
  )
}
