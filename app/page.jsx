import Nav from '../components/Nav'
import DescentFilm from '../components/DescentFilm'
import BottomHalf from '../components/bottom/BottomHalf'
import HomeFooter from '../components/HomeFooter'
import EnquireWidget from '../components/EnquireWidget'

export default function Home() {
  return (
    <div className="bp-home bp-home--film">
      <a className="bp-skip" href="#main-content">Skip to content</a>
      <Nav film />
      <main id="main-content">
        <DescentFilm />
        <BottomHalf />
      </main>
      <HomeFooter />
      <EnquireWidget />
    </div>
  )
}
