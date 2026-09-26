'use client'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, AlertTriangle, X, Search, Clock, ShieldCheck, RotateCcw } from 'lucide-react'
import { normaliseDomain, verdictFor, AUDIT_SERVICE } from '../lib/seo-audit'
import { openEnquire } from '../lib/enquire'

/**
 * The free SEO audit, end to end: type a domain, watch it crawl, read the
 * score, then get pitched.
 *
 * The result is never gated. The score IS the pitch - a visitor who sees nine
 * red crosses against their own domain needs no persuading, and a form in front
 * of that just loses most of them. Conversion happens at the bottom, through
 * the same EnquireFlow every other CTA on the site uses, with the domain and
 * score carried into the lead.
 */

// Shown in sequence while the crawl runs - roughly matched to what the server
// is actually doing, so the wait reads as work rather than a stalled spinner.
const STAGES = [
  'Fetching your homepage…',
  'Reading it the way Google does…',
  'Checking titles, headings and schema…',
  'Looking for robots.txt and your sitemap…',
  'Scoring the results…',
]

const ICONS = { pass: Check, warn: AlertTriangle, fail: X }

export default function SeoAudit() {
  const [domain, setDomain] = useState('')
  const [status, setStatus] = useState('idle')   // idle | running | done | error
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [stage, setStage] = useState(0)
  const hp = useRef('')
  const inputRef = useRef(null)
  const resultRef = useRef(null)

  // Advance the progress copy while we wait. Cleared on every status change so
  // a fast response can't leave a stale timer running.
  useEffect(() => {
    if (status !== 'running') return
    setStage(0)
    const timer = setInterval(() => setStage(s => Math.min(s + 1, STAGES.length - 1)), 1600)
    return () => clearInterval(timer)
  }, [status])

  useEffect(() => {
    if (status === 'done' || status === 'error') resultRef.current?.focus()
  }, [status])

  async function submit(event) {
    event.preventDefault()
    if (status === 'running') return

    const clean = normaliseDomain(domain)
    if (!clean) {
      setError('Enter a website address, like yourbusiness.com.au')
      setStatus('error')
      inputRef.current?.focus()
      return
    }

    setStatus('running')
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/seo-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: clean, _hp: hp.current }),
        signal: AbortSignal.timeout(75000),
      })
      const data = await response.json()
      if (!response.ok || !data.ok) {
        setError(data?.error || data?.reason || "We couldn't audit that site. Check the address and try again.")
        setStatus('error')
        return
      }
      setResult(data)
      setStatus('done')
    } catch {
      setError('That took too long. Try again in a moment.')
      setStatus('error')
    }
  }

  function restart() {
    setStatus('idle')
    setResult(null)
    setError('')
    setDomain('')
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  /** Hand off to the one enquiry flow, with the findings attached to the lead. */
  function enquire() {
    openEnquire(AUDIT_SERVICE, {
      source: 'seo audit',
      fields: {
        'audited site': result.domain,
        'current SEO score': `${result.score}/100 (grade ${result.grade})`,
        'issues found': String(result.issues),
      },
    })
  }

  return (
    <div className="bp-audit">
      <form className="bp-audit-form" onSubmit={submit} noValidate>
        <div className="bp-audit-field">
          <label htmlFor="bp-audit-domain">Your website address</label>
          <div className="bp-audit-input">
            <Search size={18} aria-hidden="true" />
            <input
              id="bp-audit-domain"
              ref={inputRef}
              type="text"
              name="domain"
              inputMode="url"
              autoComplete="url"
              autoCapitalize="none"
              spellCheck="false"
              maxLength={253}
              placeholder="yourbusiness.com.au"
              value={domain}
              onChange={e => { setDomain(e.target.value); if (status === 'error') { setStatus('idle'); setError('') } }}
              disabled={status === 'running'}
              aria-invalid={status === 'error' && !result}
              aria-describedby={error ? 'bp-audit-error' : 'bp-audit-hint'}
            />
          </div>
        </div>

        {/* Honeypot - same convention as the enquiry forms. */}
        <div className="bp-enq-hp" aria-hidden="true">
          <label htmlFor="bp-audit-hp">Leave this empty</label>
          <input id="bp-audit-hp" tabIndex={-1} autoComplete="off" onChange={e => { hp.current = e.target.value }} />
        </div>

        <button type="submit" className="bp-button bp-audit-go" disabled={status === 'running'}>
          {status === 'running' ? 'Auditing…' : 'Audit my SEO for free'}
          {status !== 'running' && <ArrowRight size={16} aria-hidden="true" />}
        </button>
      </form>

      <p className="bp-audit-hint" id="bp-audit-hint">
        Free · No email required · Takes about 10 seconds
      </p>

      <div className="bp-audit-out" ref={resultRef} tabIndex={-1} aria-live="polite">
        {status === 'running' && (
          <div className="bp-audit-loading">
            <span className="bp-audit-spinner" aria-hidden="true" />
            <p>{STAGES[stage]}</p>
          </div>
        )}

        {status === 'error' && (
          <p className="bp-audit-error" id="bp-audit-error" role="alert">{error}</p>
        )}

        {status === 'done' && result && <Report result={result} onEnquire={enquire} onRestart={restart} />}
      </div>
    </div>
  )
}

function Report({ result, onEnquire, onRestart }) {
  const verdict = verdictFor(result.score)
  const failed = result.checks.filter(c => c.ok === 'fail')
  const warned = result.checks.filter(c => c.ok === 'warn')
  const fixes = [...failed, ...warned]

  return (
    <div className="bp-audit-report">
      <header className={`bp-audit-verdict bp-audit-${verdict.tone}`}>
        <ScoreRing score={result.score} grade={result.grade} />
        <div>
          <p className="bp-audit-domain">{result.domain}</p>
          <h2>{verdict.headline}</h2>
          <p className="bp-audit-summary">
            {result.issues === 0
              ? 'Every check passed. That is rare. Nicely done.'
              : <>We found <strong>{result.issues}</strong> {result.issues === 1 ? 'issue' : 'issues'} holding your
                 search visibility back.</>}
          </p>
        </div>
      </header>

      <ol className="bp-audit-checks">
        {result.checks.map(check => {
          const Icon = ICONS[check.ok]
          return (
            <li key={check.key} className={`bp-audit-check bp-audit-${check.ok}`}>
              <span className="bp-audit-icon" aria-hidden="true"><Icon size={13} strokeWidth={3} /></span>
              <div>
                <h3>
                  {check.label}
                  <span className="bp-audit-tag">
                    {check.ok === 'pass' ? 'Passed' : check.ok === 'warn' ? 'Needs work' : 'Failing'}
                  </span>
                </h3>
                <p>{check.detail}</p>
              </div>
            </li>
          )
        })}
      </ol>

      <p className="bp-audit-caveat">
        This grades the on-page technical SEO a search engine reads on your homepage. It does not measure your
        rankings, your backlinks or your Google Business Profile. We cover those in the call.
      </p>

      {/* The pitch. Everything claimed here is either measured above or already
          true of how we work, so it survives contact with a sceptical reader. */}
      <section className="bp-audit-pitch">
        <p className="bp-kicker">What Bluepeek does about it</p>
        <h2>
          {result.issues === 0
            ? <>Your technical SEO is clean. Let&rsquo;s go after the rankings.</>
            : <>We take <strong>{result.domain}</strong> from {result.score} to {result.projectedScore}.</>}
        </h2>
        <p className="bp-audit-pitch-lede">
          {result.issues === 0
            ? <>Every check on this page passed, so the next gains are in content, local search and your Google
               Business Profile rather than the code. That is a conversation worth having.</>
            : result.issues === 1
              ? <>That issue is on-page, and it gets fixed in a Bluepeek rebuild: a {result.projectedScore}/100 on
                 these {result.checks.length} checks, on a site that loads in under a second.</>
              : <>Every one of those issues is on-page, and all of them get fixed in a Bluepeek rebuild: a{' '}
                 {result.projectedScore}/100 on these {result.checks.length} checks, on a site that loads in under
                 a second.</>}
        </p>

        {fixes.length > 0 && (
          <ul className="bp-audit-fixes">
            {fixes.slice(0, 5).map(check => (
              <li key={check.key}>
                <span className="bp-audit-fix-tick" aria-hidden="true"><Check size={12} strokeWidth={3} /></span>
                <span><strong>{check.label}.</strong> {check.fix}</span>
              </li>
            ))}
            {fixes.length > 5 && <li className="bp-audit-fix-more">…and {fixes.length - 5} more from the list above.</li>}
          </ul>
        )}

        <ul className="bp-audit-proof">
          <li><Clock size={15} aria-hidden="true" /> Live in 1–2 weeks</li>
          <li><ShieldCheck size={15} aria-hidden="true" /> No lock-in contracts</li>
          <li><Check size={15} aria-hidden="true" /> You own everything</li>
        </ul>

        <div className="bp-audit-actions">
          <button type="button" className="bp-button" onClick={onEnquire}>
            Fix my SEO <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button type="button" className="bp-audit-again" onClick={onRestart}>
            <RotateCcw size={14} aria-hidden="true" /> Audit another site
          </button>
        </div>
        <p className="bp-audit-note">Free quote · No obligation · We&rsquo;ll call you within one business day</p>
      </section>
    </div>
  )
}

/** Score dial. The number is the message, so the ring stays quiet behind it. */
function ScoreRing({ score, grade }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(100, score)) / 100)
  return (
    <div className="bp-audit-ring">
      <svg viewBox="0 0 128 128" role="img" aria-label={`Score ${score} out of 100, grade ${grade}`}>
        <circle cx="64" cy="64" r={radius} className="bp-audit-ring-track" />
        <circle
          cx="64" cy="64" r={radius}
          className="bp-audit-ring-fill"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 64 64)"
        />
      </svg>
      <div className="bp-audit-ring-inner" aria-hidden="true">
        <strong>{score}</strong>
        <span>/100 · {grade}</span>
      </div>
    </div>
  )
}
