export const RESULTS_REFRESH_MS = 300000
export const RESULTS_PERIOD_START = '2026-06-08'
const CLIENT_DOMAINS = ['attentiondetailing.com.au', 'texturedbarberlounge.com.au', 'stsbgardening.com.au']
const DAY = 86400000

function dateValue(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return NaN
  const time = Date.parse(`${value}T00:00:00Z`)
  return Number.isFinite(time) && new Date(time).toISOString().slice(0, 10) === value ? time : NaN
}
const countOk = value => Number.isSafeInteger(value) && value >= 0

// Only publish consistent aggregates; an unavailable feed is never a zero count.
export function validateResults(value) {
  if (!value || value.ok !== true || value.periodStart !== RESULTS_PERIOD_START || value.timezone !== 'Australia/Brisbane') return null
  if (typeof value.asOf !== 'string' || !/^\d{4}-\d{2}-\d{2}T.*(?:Z|[+-]\d{2}:\d{2})$/.test(value.asOf) || !Number.isFinite(Date.parse(value.asOf)) || !Number.isFinite(dateValue(value.asOf.slice(0, 10)))) return null
  const asOfDay = new Intl.DateTimeFormat('en-CA', { timeZone: value.timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(value.asOf))
  const day = dateValue(asOfDay)
  const currentStart = day - ((new Date(day).getUTCDay() + 6) % 7) * DAY
  const periodStart = dateValue(RESULTS_PERIOD_START)
  if (currentStart < periodStart) return null
  const completedWeeks = (currentStart - periodStart) / (7 * DAY)
  function series(item) {
    if (!item || !countOk(item.total) || !Array.isArray(item.weeks) || item.weeks.length !== completedWeeks || !item.currentWeek || !countOk(item.currentWeek.count) || dateValue(item.currentWeek.start) !== currentStart) return null
    if (item.weeks.some((week, i) => !week || !countOk(week.count) || dateValue(week.start) !== periodStart + i * 7 * DAY)) return null
    if (item.weeks.reduce((sum, week) => sum + week.count, item.currentWeek.count) !== item.total) return null
    return { total: item.total, weeks: item.weeks.map(({ start, count }) => ({ start, count })), currentWeek: { start: item.currentWeek.start, count: item.currentWeek.count } }
  }
  const totals = series(value)
  if (!totals || !Array.isArray(value.clients) || value.clients.length !== CLIENT_DOMAINS.length) return null
  const clients = CLIENT_DOMAINS.map(domain => {
    const matches = value.clients.filter(client => client?.domain === domain)
    const data = matches.length === 1 ? series(matches[0]) : null
    if (!data || data.total > totals.total || data.weeks.some((week, i) => week.count > totals.weeks[i].count) || data.currentWeek.count > totals.currentWeek.count) return null
    return { domain, ...data }
  })
  if (clients.some(client => !client) || clients.reduce((sum, client) => sum + client.total, 0) > totals.total) return null
  if (totals.weeks.some((week, i) => clients.reduce((sum, client) => sum + client.weeks[i].count, 0) > week.count) || clients.reduce((sum, client) => sum + client.currentWeek.count, 0) > totals.currentWeek.count) return null
  return { ok: true, asOf: value.asOf, periodStart: value.periodStart, timezone: value.timezone, ...totals, clients }
}

export async function fetchResults(url = '/api/results', options = { cache: 'no-store' }) {
  try {
    const response = await fetch(url, { ...options, signal: options.signal || AbortSignal.timeout(8000) })
    return response.ok ? validateResults(await response.json()) : null
  } catch { return null }
}

export function weeklySummary(weeks) {
  const max = Math.max(0, ...weeks.map(week => week.count))
  return { max, peak: weeks.findIndex(week => week.count === max) }
}

export function resultDate(value) {
  return new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(value.length === 10 ? `${value}T00:00:00+10:00` : value))
}
