'use client'

export default function Footer({ onNavigate }) {
  const handleClick = (e, id) => {
    e.preventDefault()
    onNavigate?.(id)
  }

  return (
    <footer className="relative border-t border-slate-200 py-10 px-6 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="Bluepeek" className="w-8 h-8 object-contain" />
            <span className="text-slate-900 font-bold tracking-tight">bluepeek</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-500">
            <a href="#services"     onClick={(e) => handleClick(e, 'services')}     className="hover:text-slate-900 transition-colors">Services</a>
            <a href="#how-it-works" onClick={(e) => handleClick(e, 'how-it-works')} className="hover:text-slate-900 transition-colors">How It Works</a>
            <a href="#contact"      onClick={(e) => handleClick(e, 'contact')}      className="hover:text-slate-900 transition-colors">Contact</a>
            <a href="mailto:zach@bluepeek.com.au" className="hover:text-slate-900 transition-colors">
              zach@bluepeek.com.au
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-8 pt-6 border-t border-slate-200">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Bluepeek. All rights reserved.</p>
          <p className="text-xs text-slate-400">Founded by Zach — Australia</p>
        </div>
      </div>
    </footer>
  )
}
