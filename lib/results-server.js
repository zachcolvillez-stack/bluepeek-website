import 'server-only'
import { fetchResults } from './results'

const RESULTS_URL = 'https://bumjkwvaeqghjspowkrd.supabase.co/functions/v1/public-results'

export async function getResults() {
  const key = process.env.BLUEPEEK_FORMS_ANON_KEY
  if (!key) return null
  return fetchResults(RESULTS_URL, {
    headers: { Authorization: `Bearer ${key}` },
    next: { revalidate: 300 },
  })
}
