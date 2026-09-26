import { SITE, SERVICES, INDUSTRIES, CASE_STUDIES, u } from '../lib/site'
import { BLOG_POSTS } from '../lib/blog'
import { SERVICE_PAGES, INDUSTRY_PAGES } from '../lib/pages'
import { industryPath } from '../lib/growth'

// Every indexable page, once. Money pages and posts report their real update
// date; everything else reports the build date.
export default function sitemap() {
  const now = new Date()
  const seen = new Set()
  const entries = []
  const add = (path, priority, lastModified = now) => {
    if (seen.has(path)) return
    seen.add(path)
    entries.push({ url: `${SITE.url}${path}`, lastModified: new Date(lastModified), changeFrequency: 'monthly', priority })
  }

  add('/', 1.0)
  Object.values(SERVICE_PAGES).forEach(p => add(`/${p.slug}`, 0.9, p.updated))
  add('/services', 0.8)
  add('/industries', 0.7)
  Object.values(INDUSTRY_PAGES).forEach(p => add(industryPath(p.slug), 0.8, p.updated))
  add('/seo-audit', 0.8)
  add('/about', 0.7)
  add('/work', 0.7)
  add('/gallery', 0.6)
  add('/blog', 0.7)
  add('/faq', 0.6)
  SERVICES.forEach(s => add(u.service(s.slug), 0.7))
  INDUSTRIES.forEach(i => add(u.industry(i.slug), 0.6))
  CASE_STUDIES.forEach(c => add(u.work(c.slug), 0.6))
  BLOG_POSTS.forEach(p => add(`/blog/${p.slug}`, 0.6, p.updated || p.date))
  return entries
}
