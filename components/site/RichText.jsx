import Link from 'next/link'

// Renders a copy string with two lightweight marks, so content files can carry
// contextual internal links without JSX:
//   [anchor text](/path)   -> link (internal via next/link, external in a new tab)
//   **bold**               -> <strong>
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g

export default function RichText({ text }) {
  if (!text) return null
  const out = []
  let last = 0
  let m
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1]) {
      const [, label, href] = m
      out.push(href.startsWith('/')
        ? <Link key={m.index} href={href} className="bp-inline-link">{label}</Link>
        : <a key={m.index} href={href} className="bp-inline-link" target="_blank" rel="noopener noreferrer">{label}</a>)
    } else {
      out.push(<strong key={m.index}>{m[3]}</strong>)
    }
    last = TOKEN.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return <>{out}</>
}

// Plain-text version for metadata and structured data.
export function plainText(text = '') {
  return text.replace(TOKEN, (_, label, _href, bold) => label || bold)
}
