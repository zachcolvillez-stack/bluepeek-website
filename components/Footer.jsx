'use client'

export default function Footer({ onNavigate }) {
  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate?.(id)
  }

  return (
    <footer className="relative border-t border-white/5 py-10 px-6 bg-[#020817]/70 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Bluepeek" className="w-8 h-8 object-contain" />
            <span className="text-white font-bold tracking-tight">bluepeek</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#services"    onClick={(e) => handleClick(e, 'services')}    className="hover:text-slate-300 transition-colors">Services</a>
            <a href="#how-it-works" onClick={(e) => handleClick(e, 'how-it-works')} className="hover:text-slate-300 transition-colors">How It Works</a>
            <a href="#contact"     onClick={(e) => handleClick(e, 'contact')}     className="hover:text-slate-300 transition-colors">Contact</a>
            <a href="mailto:zach@bluepeek.com.au" className="hover:text-slate-300 transition-colors">
              zach@bluepeek.com.au
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-slate-700">© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <p className="text-xs text-slate-700">Founded by Zach — Perth, Western Australia</p>
        </div>
      </div>
    </footer>
  )
}
