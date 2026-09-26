// Measured results for a case study. Renders nothing unless the study carries
// real data with a stated source - see the CASE_STUDIES note in lib/site.js.
const METRICS = [
  ['adSpend', 'Ad spend'],
  ['clicks', 'Clicks'],
  ['leads', 'Leads'],
  ['costPerLead', 'Cost per lead'],
  ['conversionChange', 'Conversion change'],
  ['reviewGrowth', 'Google review growth'],
  ['websiteChange', 'Website change'],
]

export default function CaseStudyResults({ results }) {
  if (!results?.source) return null
  const rows = METRICS.filter(([key]) => results[key])
  if (!rows.length) return null
  return (
    <section className="bp-cs-results" aria-labelledby="cs-results">
      <h2 id="cs-results">Results{results.period ? `, ${results.period}` : ''}</h2>
      <dl>
        {rows.map(([key, label]) => (
          <div key={key}><dt>{label}</dt><dd>{results[key]}</dd></div>
        ))}
      </dl>
      <p className="bp-cs-source">Source: {results.source}</p>
    </section>
  )
}
