import { getResults } from '../../../lib/results-server'

export async function GET() {
  const results = await getResults()
  return Response.json(results || { ok: false }, {
    status: results ? 200 : 503,
    headers: { 'Cache-Control': 'no-store' },
  })
}
