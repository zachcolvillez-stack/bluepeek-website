import { SITE, SERVICES, INDUSTRIES, CASE_STUDIES, u } from '../lib/site'

export default function sitemap() {
  const now = new Date()
  const entry = (path, priority, freq) => ({
    url: `${SITE.url}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  })

  return [
    entry('/', 1.0, 'weekly'),
    ...SERVICES.map(s => entry(u.service(s.slug), 0.9, 'monthly')),
    ...INDUSTRIES.map(i => entry(u.industry(i.slug), 0.8, 'monthly')),
    ...CASE_STUDIES.map(c => entry(u.work(c.slug), 0.7, 'monthly')),
  ]
}
