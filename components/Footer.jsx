'use client'

export default function Footer({ onNavigate }) {
  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate?.(id)
  }

  return (
    <footer className="relative py-12 px-6" style={{ borderTop: '1px solid #1f1f24' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#22d3ee' }}>
              <span className="text-sm font-black" style={{ color: '#0a0a0c' }}>b</span>
            </div>
            <span className="font-bold tracking-tight" style={{ color: '#f5f5f7' }}>bluepeek</span>
          </div>

          <div className="flex items-center gap-6 text-sm" style={{ color: '#8a8a93' }}>
            <a href="#services"     onClick={(e) => handleClick(e, 'services')}     className="transition-colors hover:text-white">Services</a>
            <a href="#how-it-works" onClick={(e) => handleClick(e, 'how-it-works')} className="transition-colors hover:text-white">How It Works</a>
            <a href="#contact"      onClick={(e) => handleClick(e, 'contact')}      className="transition-colors hover:text-white">Contact</a>
            <a href="mailto:zach@bluepeek.com.au" className="transition-colors hover:text-white">
              zach@bluepeek.com.au
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-10 pt-6"
          style={{ borderTop: '1px solid #1f1f24' }}>
          <p className="text-xs" style={{ color: '#5a5a62' }}>© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <p className="text-xs" style={{ color: '#5a5a62' }}>Built in Perth, WA</p>
        </div>
      </div>
    </footer>
  )
}
