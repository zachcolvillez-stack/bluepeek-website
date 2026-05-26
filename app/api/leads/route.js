export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// Amenity values that represent actual businesses (excludes benches, ATMs, bus stops, etc).
const AMENITY_WHITELIST = [
  'cafe', 'restaurant', 'bar', 'pub', 'fast_food', 'food_court', 'ice_cream', 'biergarten',
  'pharmacy', 'doctors', 'dentist', 'clinic', 'veterinary', 'optician', 'hospital',
  'car_wash', 'car_rental', 'car_rental', 'fuel', 'driving_school', 'car_repair',
  'nightclub', 'cinema', 'theatre', 'studio', 'marketplace',
  'bank', 'post_office', 'kindergarten', 'childcare', 'gym',
]

const GROUP_LABELS = {
  shop: 'Shop',
  craft: 'Tradie',
  office: 'Office',
  healthcare: 'Healthcare',
  amenity: 'Service',
  tourism: 'Tourism',
}

function hasWebsite(tags) {
  return Boolean(
    tags.website ||
    tags['contact:website'] ||
    tags.url ||
    tags['contact:url'] ||
    tags['website:en']
  )
}

function distanceMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000
  const toRad = (d) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

function classify(tags) {
  for (const key of ['shop', 'craft', 'office', 'healthcare', 'tourism', 'amenity']) {
    if (tags[key]) {
      return {
        group: GROUP_LABELS[key] || key,
        sub: String(tags[key]).replace(/_/g, ' '),
      }
    }
  }
  return { group: 'Other', sub: '' }
}

function buildAddress(tags) {
  const street = [tags['addr:housenumber'], tags['addr:street']].filter(Boolean).join(' ').trim()
  const locality = tags['addr:suburb'] || tags['addr:city'] || tags['addr:town'] || tags['addr:village'] || ''
  return [street, locality].filter(Boolean).join(', ')
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const lat = parseFloat(searchParams.get('lat'))
  const lon = parseFloat(searchParams.get('lon'))
  const radius = Math.min(Math.max(parseInt(searchParams.get('radius') || '2000', 10) || 2000, 250), 15000)
  const requestedCats = (searchParams.get('cats') || 'shop,amenity,craft,office,healthcare')
    .split(',')
    .map((c) => c.trim())
    .filter(Boolean)

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return Response.json({ error: 'lat and lon query params are required' }, { status: 400 })
  }

  const parts = []
  if (requestedCats.includes('shop')) parts.push(`nwr["shop"](around:${radius},${lat},${lon});`)
  if (requestedCats.includes('amenity')) parts.push(`nwr["amenity"~"^(${AMENITY_WHITELIST.join('|')})$"](around:${radius},${lat},${lon});`)
  if (requestedCats.includes('craft')) parts.push(`nwr["craft"](around:${radius},${lat},${lon});`)
  if (requestedCats.includes('office')) parts.push(`nwr["office"](around:${radius},${lat},${lon});`)
  if (requestedCats.includes('healthcare')) parts.push(`nwr["healthcare"](around:${radius},${lat},${lon});`)

  if (!parts.length) {
    return Response.json({ count: 0, results: [] })
  }

  const overpassQuery = `[out:json][timeout:25];(${parts.join('')});out center tags;`

  let data
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'bluepeek-leads/1.0',
      },
      body: 'data=' + encodeURIComponent(overpassQuery),
    })
    if (!res.ok) {
      return Response.json({ error: `Overpass returned ${res.status}` }, { status: 502 })
    }
    data = await res.json()
  } catch (err) {
    return Response.json({ error: 'Overpass request failed: ' + err.message }, { status: 502 })
  }

  const seen = new Set()
  const results = []

  for (const el of data.elements || []) {
    const tags = el.tags || {}
    if (!tags.name) continue
    if (hasWebsite(tags)) continue

    const elLat = el.lat ?? el.center?.lat
    const elLon = el.lon ?? el.center?.lon
    if (elLat == null || elLon == null) continue

    const dedupeKey = `${tags.name.toLowerCase()}|${elLat.toFixed(4)}|${elLon.toFixed(4)}`
    if (seen.has(dedupeKey)) continue
    seen.add(dedupeKey)

    const { group, sub } = classify(tags)
    results.push({
      id: `${el.type}/${el.id}`,
      name: tags.name,
      group,
      sub,
      address: buildAddress(tags),
      suburb: tags['addr:suburb'] || tags['addr:city'] || tags['addr:town'] || '',
      phone: tags.phone || tags['contact:phone'] || tags['contact:mobile'] || '',
      email: tags.email || tags['contact:email'] || '',
      facebook: tags['contact:facebook'] || tags.facebook || '',
      instagram: tags['contact:instagram'] || tags.instagram || '',
      lat: elLat,
      lon: elLon,
      distance_m: Math.round(distanceMeters(lat, lon, elLat, elLon)),
    })
  }

  results.sort((a, b) => a.distance_m - b.distance_m)

  return Response.json({ count: results.length, results })
}
