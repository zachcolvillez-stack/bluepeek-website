import Nav from '../components/Nav'
import DescentFilm from '../components/DescentFilm'
import HomeSections from '../components/HomeSections'
import Packages from '../components/Packages'
import Reviews from '../components/Reviews'
import Contact from '../components/Contact'
import HomeFooter from '../components/HomeFooter'
import EnquireWidget from '../components/EnquireWidget'

export default function Home() {
  return (
    <div className="bp-home">
      <a className="bp-skip" href="#main-content">Skip to content</a>
      <Nav film />
      <main id="main-content">
        <DescentFilm />
        <HomeSections />
        <Packages />
        <Reviews />
        <Contact />
      </main>
      <HomeFooter />
      <EnquireWidget />
    </div>
  )
}
