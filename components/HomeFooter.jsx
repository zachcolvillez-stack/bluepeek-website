import Logo from './Logo'
import { SITE, SERVICES, INDUSTRIES, u } from '../lib/site'
export default function HomeFooter() {
  return (<footer className="bp-footer"><div className="bp-wrap">
    <div className="bp-footer-top"><a href="/" aria-label="Bluepeek home" className="bp-logo"><Logo size={34} /></a><p>Built on the Gold Coast.<br />Working Australia-wide.</p><nav aria-label="Footer navigation">{[['Work', '/gallery'], ['Services', '/#services'], ['About', '/about'], ['Blog', '/blog'], ['FAQ', '/faq']].map(([label, href]) => <a href={href} key={href}>{label}</a>)}</nav></div>
    <div className="bp-footer-contact"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><a href="tel:0402923253">Jac · 0402 923 253</a><a href="tel:0468955806">Zach · 0468 955 806</a><span>7 Gidgee Court, Molendinar QLD 4214</span></div>
    <details className="bp-footer-directory"><summary>Services & industries</summary><nav aria-label="Services and industries">{SERVICES.map(s => <a key={s.slug} href={u.service(s.slug)}>{s.title}</a>)}{INDUSTRIES.map(i => <a key={i.slug} href={u.industry(i.slug)}>{i.title}</a>)}</nav></details>
    <div className="bp-footer-bottom"><p>© {new Date().getFullYear()} Bluepeek. All rights reserved.</p><div><a href="/terms">Terms of Service</a><a href="/privacy">Privacy</a><a href="https://bluepeek.com.au">Powered by Bluepeek</a></div></div>
  </div></footer>)
}
