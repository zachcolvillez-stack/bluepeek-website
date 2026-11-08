import test from 'node:test'
import assert from 'node:assert/strict'
import { validateResults, weeklySummary, fetchResults, resultDate } from './results.js'

const domains = ['attentiondetailing.com.au', 'texturedbarberlounge.com.au', 'stsbgardening.com.au']
function payload(counts = [9, 3], current = 2) {
  const weeks = counts.map((count, i) => ({ start: `2026-06-${String(8 + i * 7).padStart(2, '0')}`, count }))
  return { ok: true, asOf: '2026-06-24T02:00:00Z', periodStart: '2026-06-08', timezone: 'Australia/Brisbane', total: counts.reduce((sum, count) => sum + count, current), weeks, currentWeek: { start: '2026-06-22', count: current }, clients: domains.map(domain => ({ domain, total: 0, weeks: weeks.map(week => ({ ...week, count: 0 })), currentWeek: { start: '2026-06-22', count: 0 } })) }
}

test('valid results keep real dates, counts and all client series', () => {
  const value = payload()
  assert.deepEqual(validateResults(value), value)
})

test('zero totals remain valid instead of selecting saved results', () => {
  const valid = validateResults(payload([0, 0], 0))
  assert.equal(valid.total, 0)
  assert.equal(valid.clients[0].total, 0)
  assert.deepEqual(weeklySummary(valid.weeks), { max: 0, peak: 0 })
})

test('reject error, malformed, wrong dates, inconsistent and unapproved client data', () => {
  const broken = [null, {}, { ok: false }, { ...payload(), total: 999 }, { ...payload(), timezone: 'UTC' }, { ...payload(), asOf: 'yesterday' }]
  const negative = payload(); negative.weeks[0].count = -1; broken.push(negative)
  const date = payload(); date.weeks[0].start = '2026-06-09'; broken.push(date)
  const missing = payload(); missing.weeks.pop(); broken.push(missing)
  const partial = payload(); partial.currentWeek.start = '2026-06-15'; broken.push(partial)
  const unknown = payload(); unknown.clients[0].domain = 'private-client.example'; broken.push(unknown)
  const duplicate = payload(); duplicate.clients[0].domain = duplicate.clients[1].domain; broken.push(duplicate)
  const clientMismatch = payload(); clientMismatch.clients[0].total = 4; broken.push(clientMismatch)
  for (const value of broken) assert.equal(validateResults(value), null)
})

test('chart finds an earlier peak and scales beyond old hardcoded 110 maximum', () => {
  assert.deepEqual(weeklySummary([{ count: 250 }, { count: 4 }, { count: 20 }]), { max: 250, peak: 0 })
  assert.deepEqual(weeklySummary([]), { max: 0, peak: -1 })
  assert.equal(resultDate('2026-06-08'), '8 June 2026')
})

test('Brisbane week rolls over at Sunday 14:00 UTC, not UTC midnight', () => {
  const value = payload([0, 0], 0)
  value.asOf = '2026-06-21T14:00:00Z'
  assert.ok(validateResults(value))
  value.asOf = '2026-06-21T13:59:59Z'
  assert.equal(validateResults(value), null)
})

test('fetch preserves valid zero and returns null on upstream error or malformed data', async t => {
  const original = globalThis.fetch
  t.after(() => { globalThis.fetch = original })
  let options
  globalThis.fetch = async (_, supplied) => { options = supplied; return { ok: true, json: async () => payload([0, 0], 0) } }
  assert.equal((await fetchResults()).total, 0)
  assert.equal(options.cache, 'no-store')
  globalThis.fetch = async () => ({ ok: false })
  assert.equal(await fetchResults(), null)
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ ok: true, total: 12 }) })
  assert.equal(await fetchResults(), null)
  globalThis.fetch = async () => { throw new Error('offline') }
  assert.equal(await fetchResults(), null)
})
