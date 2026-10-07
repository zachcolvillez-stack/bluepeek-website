import Nav from '../components/Nav'
import Hero from '../components/Hero'
import HomeSections from '../components/HomeSections'
import Packages from '../components/Packages'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import HomeFooter from '../components/HomeFooter'
import ChatWidget from '../components/ChatWidget'

export default function Home() {
  return (
    <div className="bp-home">
      <a className="bp-skip" href="#main-content">Skip to content</a>
      <Nav />
      <main id="main-content">
        <div className="bp-masthead"><Hero /></div>
        <HomeSections />
        <Packages />
        <Reviews />
        <Contact />
      </main>
      <HomeFooter />
      <ChatWidget />
    </div>
  )
}
