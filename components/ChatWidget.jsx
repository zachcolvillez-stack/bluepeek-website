'use client'
import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Sparkles } from 'lucide-react'

const BLUEPEEK_ENDPOINT = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/submit-form'

/* Scripted knowledge base - instant answers in Bluepeek's voice.
   Each intent has a reply and optional follow-up quick-replies. */
const INTENTS = {
  services: {
    label: 'What do you do?',
    reply: "We build premium websites and AI lead-capture systems for Australian businesses 🚀\n\nThat means: custom websites, 24/7 AI chat assistants (like this one!), online booking, and automations that follow up on enquiries for you.",
    next: ['pricing', 'ai', 'quote'],
  },
  pricing: {
    label: 'How much does it cost?',
    reply: "Every project is custom-quoted to fit your business and goals - so you only pay for what you actually need.\n\nWe've got three packages: Starter, Growth (site + 24/7 AI assistant + lead capture) and Scale. No lock-in, and you own everything.\n\nWant a free, no-obligation quote?",
    next: ['quote', 'ai', 'process'],
  },
  turnaround: {
    label: 'How fast can you build it?',
    reply: "Most websites go live in 1–2 weeks ⚡\n\nWe keep you in the loop the whole way - drafts, feedback, then launch. No drawn-out months of waiting.",
    next: ['quote', 'process'],
  },
  ai: {
    label: 'Tell me about AI chatbots',
    reply: "Great question - you're talking to one right now 😄\n\nWe build 24/7 AI assistants that answer customer questions, qualify enquiries and capture leads automatically - even while you're asleep or on the tools. It means you never miss a customer.\n\nIt's included in our Growth and Scale packages.",
    next: ['pricing', 'quote'],
  },
  process: {
    label: 'How does it work?',
    reply: "Four simple steps:\n\n1️⃣ Discovery - a quick chat about your goals\n2️⃣ Design & Build - we create it, you give feedback\n3️⃣ Launch - live in 1–2 weeks\n4️⃣ Support & Growth - we stick around\n\nNo jargon, no surprises.",
    next: ['quote', 'pricing'],
  },
}

const LABELS = {
  services: 'What do you do?',
  pricing: 'Pricing',
  turnaround: 'How fast?',
  ai: 'AI chatbots',
  process: 'How it works',
  quote: '💬 Get a free quote',
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [leadMode, setLeadMode] = useState(null)   // null | 'name' | 'contact' | 'detail' | 'done'
  const [lead, setLead] = useState({ name: '', contact: '', detail: '' })
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  // Greet on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setTyping(true)
      const t = setTimeout(() => {
        setTyping(false)
        setMessages([{
          role: 'bot',
          text: "G'day! 👋 I'm the Bluepeek assistant. Ask me anything about websites, AI or pricing - or grab a free quote.",
          options: ['services', 'pricing', 'turnaround', 'ai', 'quote'],
        }])
      }, 600)
      return () => clearTimeout(t)
    }
  }, [open, messages.length])

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  const botSay = (text, options) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(m => [...m, { role: 'bot', text, options }])
    }, 650)
  }

  const handleIntent = (key) => {
    if (key === 'quote') {
      setMessages(m => [...m, { role: 'user', text: LABELS.quote }])
      setLeadMode('name')
      botSay("Awesome - let's get you a free quote. What's your name?")
      return
    }
    const intent = INTENTS[key]
    if (!intent) return
    setMessages(m => [...m, { role: 'user', text: LABELS[key] }])
    botSay(intent.reply, intent.next)
  }

  const submitLead = async (finalLead) => {
    try {
      await fetch(BLUEPEEK_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formSlug: 'contact',
          domain: typeof window !== 'undefined' ? window.location.hostname : 'bluepeek.com.au',
          data: {
            name: finalLead.name,
            contact: finalLead.contact,
            message: finalLead.detail,
            source: 'chat widget',
          },
        }),
      })
    } catch {}
  }

  const handleSend = () => {
    const val = input.trim()
    if (!val) return
    setMessages(m => [...m, { role: 'user', text: val }])
    setInput('')

    if (leadMode === 'name') {
      setLead(l => ({ ...l, name: val }))
      setLeadMode('contact')
      botSay(`Thanks ${val}! What's the best email or phone to reach you on?`)
    } else if (leadMode === 'contact') {
      setLead(l => ({ ...l, contact: val }))
      setLeadMode('detail')
      botSay("Perfect. Briefly - what are you after? (e.g. new website, AI chatbot, more leads)")
    } else if (leadMode === 'detail') {
      const finalLead = { ...lead, detail: val }
      setLead(finalLead)
      setLeadMode('done')
      submitLead(finalLead)
      botSay("Beauty - got it! 🎉 Zach will personally get back to you within 24 hours. Anything else I can help with?", ['services', 'pricing', 'ai'])
    } else {
      // free text outside lead flow - gentle catch-all
      botSay("Good question! The quickest way to get a proper answer is a free quote - or pick one of these 👇", ['services', 'pricing', 'ai', 'quote'])
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="bp-chat-launcher fixed z-50 bottom-5 right-4 md:bottom-6 md:right-6 w-12 h-12 rounded-full flex items-center justify-center transition-transform hover:scale-105"
        style={{ background: 'var(--lapiz)', boxShadow: 'var(--shadow-sm)' }}
      >
        {open ? <X size={24} className="text-white" /> : <MessageSquare size={22} className="text-white" />}

      </button>

      {/* Chat panel */}
      {open && (
        <div
          className="fixed z-50 bottom-20 right-4 md:bottom-24 md:right-6 w-[calc(100vw-2rem)] max-w-sm rounded-xl overflow-hidden flex flex-col"
          style={{ height: '540px', maxHeight: 'calc(100vh - 12rem)', background: 'var(--bg)', border: '1px solid var(--hairline)', boxShadow: 'var(--shadow-lg)' }}
        >
          {/* Header */}
          <div className="px-5 py-4 flex items-center gap-3" style={{ background: 'var(--bg-2)', color: 'var(--ink)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'var(--surface)' }}>
              <Sparkles size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold leading-tight">Bluepeek Assistant</p>
              <p className="text-xs flex items-center gap-1.5" style={{ color: 'var(--text)' }}>
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22c55e' }} /> Online · replies instantly
              </p>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-current">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((m, i) => (
              <div key={i}>
                <div className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="max-w-[82%] px-3.5 py-2.5 rounded-2xl text-sm whitespace-pre-line leading-relaxed"
                    style={m.role === 'user'
                      ? { background: 'var(--lapiz)', color: '#fff', borderBottomRightRadius: '4px' }
                      : { background: 'var(--surface)', color: 'var(--ink)', borderBottomLeftRadius: '4px' }}>
                    {m.text}
                  </div>
                </div>
                {/* Quick replies */}
                {m.role === 'bot' && m.options && i === messages.length - 1 && !typing && (
                  <div className="flex flex-wrap gap-2 mt-2.5">
                    {m.options.map(opt => (
                      <button key={opt} onClick={() => handleIntent(opt)}
                        className="text-xs font-medium px-3 py-1.5 rounded-full transition-colors"
                        style={{ background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--hairline)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-2)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)' }}>
                        {LABELS[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl flex gap-1" style={{ background: 'var(--surface)' }}>
                  <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--muted)' }} />
                  <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--muted)', animationDelay: '0.2s' }} />
                  <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background: 'var(--muted)', animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="px-3 py-3 flex items-center gap-2" style={{ borderTop: '1px solid var(--hairline)' }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
              placeholder={leadMode && leadMode !== 'done' ? 'Type your answer…' : 'Type a message…'}
              className="flex-1 px-4 py-2.5 rounded-full text-sm focus:outline-none"
              style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--hairline)' }}
            />
            <button onClick={handleSend} aria-label="Send"
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--lapiz)' }}>
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
