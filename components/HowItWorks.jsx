'use client'

const STEPS = [
  { number: '01', title: 'Free Chat',        description: "A quick 15-minute call to chat about your business and what you're hoping to achieve. If we're not the right fit, we'll tell you straight up." },
  { number: '02', title: 'We Build It',      description: "We design and build your site — keeping you in the loop. You see drafts, give feedback, we make changes until it's right." },
  { number: '03', title: 'Launch & Support', description: "Your site goes live. We make sure it runs smoothly, show you how to manage it, and stick around when you need us." },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: '#22d3ee' }}>The Process</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5" style={{ color: '#f5f5f7' }}>
            Simple. Honest.<br />Done right.
          </h2>
          <p className="text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: '#8a8a93' }}>
            No jargon, no surprises. Just a clear path to a website that actually works.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-10 left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #232328 20%, #232328 80%, transparent)' }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {STEPS.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full mb-6"
                  style={{ background: '#131316', border: '1px solid #232328' }}>
                  <span className="text-2xl font-bold gradient-text">{step.number}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#f5f5f7' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8a8a93' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <a href="#contact" className="inline-flex items-center gap-2 font-semibold text-sm" style={{ color: '#22d3ee' }}>
            Book your free chat today →
          </a>
        </div>
      </div>
    </section>
  )
}
