'use client'
import { useEffect, useMemo, useState } from 'react'
import { Crosshair, Loader2, MapPin, Search, ExternalLink, Phone, Mail } from 'lucide-react'

const CATEGORIES = [
  { key: 'shop', label: 'Shops' },
  { key: 'amenity', label: 'Food & Services' },
  { key: 'craft', label: 'Tradies' },
  { key: 'office', label: 'Offices' },
  { key: 'healthcare', label: 'Healthcare' },
]

const RADIUS_PRESETS = [
  { label: '500 m', value: 500 },
  { label: '1 km', value: 1000 },
  { label: '2 km', value: 2000 },
  { label: '5 km', value: 5000 },
  { label: '10 km', value: 10000 },
]

function fmtDistance(m) {
  if (m == null) return ''
  if (m < 1000) return `${m} m`
  return `${(m / 1000).toFixed(m < 10000 ? 2 : 1)} km`
}

function mapsLink(lat, lon, name) {
  const q = name
    ? `${encodeURIComponent(name)}+${lat},${lon}`
    : `${lat},${lon}`
  return `https://www.google.com/maps/search/?api=1&query=${q}`
}

export default function LeadsPage() {
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [radius, setRadius] = useState(2000)
  const [cats, setCats] = useState(CATEGORIES.map((c) => c.key))
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [locating, setLocating] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    if (!lat && !lon && typeof window !== 'undefined' && navigator.geolocation) {
      useMyLocation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function useMyLocation() {
    setError('')
    if (!navigator.geolocation) {
      setError('Geolocation is not supported in this browser.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6))
        setLon(pos.coords.longitude.toFixed(6))
        setLocating(false)
      },
      (err) => {
        setLocating(false)
        setError(err.message || 'Could not get your location.')
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 }
    )
  }

  function toggleCat(key) {
    setCats((curr) => (curr.includes(key) ? curr.filter((c) => c !== key) : [...curr, key]))
  }

  async function search() {
    setError('')
    if (!lat || !lon) {
      setError('Set a location first (tap "Use my location" or enter lat/lon).')
      return
    }
    if (!cats.length) {
      setError('Pick at least one category.')
      return
    }
    setLoading(true)
    setSearched(true)
    try {
      const params = new URLSearchParams({
        lat: String(lat),
        lon: String(lon),
        radius: String(radius),
        cats: cats.join(','),
      })
      const res = await fetch('/api/leads?' + params.toString())
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Search failed')
      setResults(data.results || [])
    } catch (e) {
      setError(e.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const summary = useMemo(() => {
    if (!searched) return ''
    if (loading) return 'Searching…'
    return `${results.length} business${results.length === 1 ? '' : 'es'} found without a website.`
  }, [searched, loading, results])

  return (
    <main className="min-h-screen px-4 pt-8 pb-24 max-w-5xl mx-auto" style={{ color: 'var(--bp-text)' }}>
      <header className="mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4"
          style={{ background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.2)', color: '#22d3ee' }}>
          <MapPin size={12} /> Internal · Lead finder
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Local businesses <span className="gradient-text">without a website</span>
        </h1>
        <p className="text-sm md:text-base" style={{ color: 'var(--bp-muted)' }}>
          Searches OpenStreetMap around you and filters out anyone who already has a website tag.
          Quality varies by area — best for warm prospecting, not a contact list.
        </p>
      </header>

      {/* Controls */}
      <section className="card p-4 md:p-5 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            onClick={useMyLocation}
            disabled={locating}
            className="btn-secondary flex items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold disabled:opacity-60"
          >
            {locating ? <Loader2 size={16} className="animate-spin" /> : <Crosshair size={16} />}
            {locating ? 'Locating…' : 'Use my location'}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <input
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              placeholder="Latitude"
              inputMode="decimal"
              className="px-3 py-3 rounded-lg text-sm bg-transparent"
              style={{ border: '1px solid var(--bp-border)', color: 'var(--bp-text)' }}
            />
            <input
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              placeholder="Longitude"
              inputMode="decimal"
              className="px-3 py-3 rounded-lg text-sm bg-transparent"
              style={{ border: '1px solid var(--bp-border)', color: 'var(--bp-text)' }}
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--bp-muted)' }}>
            Radius
          </div>
          <div className="flex flex-wrap gap-2">
            {RADIUS_PRESETS.map((r) => {
              const active = radius === r.value
              return (
                <button
                  key={r.value}
                  onClick={() => setRadius(r.value)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
                  style={
                    active
                      ? { background: 'var(--bp-accent)', color: '#0a0a0c' }
                      : { background: 'transparent', color: 'var(--bp-text)', border: '1px solid var(--bp-border)' }
                  }
                >
                  {r.label}
                </button>
              )
            })}
          </div>
        </div>

        <div className="mb-4">
          <div className="text-xs uppercase tracking-wide mb-2" style={{ color: 'var(--bp-muted)' }}>
            Categories
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = cats.includes(c.key)
              return (
                <button
                  key={c.key}
                  onClick={() => toggleCat(c.key)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
                  style={
                    active
                      ? { background: 'var(--bp-accent)', color: '#0a0a0c' }
                      : { background: 'transparent', color: 'var(--bp-text)', border: '1px solid var(--bp-border)' }
                  }
                >
                  {c.label}
                </button>
              )
            })}
          </div>
        </div>

        <button
          onClick={search}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-full text-sm font-semibold disabled:opacity-60"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Search size={16} />}
          {loading ? 'Searching…' : 'Find leads near me'}
        </button>

        {error && (
          <p className="mt-3 text-sm" style={{ color: '#f87171' }}>
            {error}
          </p>
        )}
      </section>

      {/* Results */}
      {searched && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm" style={{ color: 'var(--bp-muted)' }}>{summary}</p>
          </div>

          {!loading && results.length > 0 && (
            <div className="card overflow-hidden">
              {/* Desktop / tablet table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ background: '#0f0f12' }}>
                    <tr className="text-left" style={{ color: 'var(--bp-muted)' }}>
                      <th className="px-4 py-3 font-medium">Business</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Distance</th>
                      <th className="px-4 py-3 font-medium">Suburb</th>
                      <th className="px-4 py-3 font-medium">Phone</th>
                      <th className="px-4 py-3 font-medium">Map</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((r, i) => (
                      <tr key={r.id}
                        style={{ borderTop: i === 0 ? 'none' : '1px solid var(--bp-border)' }}>
                        <td className="px-4 py-3">
                          <div className="font-semibold">{r.name}</div>
                          {r.address && (
                            <div className="text-xs mt-0.5" style={{ color: 'var(--bp-muted)' }}>
                              {r.address}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <div>{r.group}</div>
                          <div className="text-xs" style={{ color: 'var(--bp-muted)' }}>{r.sub}</div>
                        </td>
                        <td className="px-4 py-3 align-top">{fmtDistance(r.distance_m)}</td>
                        <td className="px-4 py-3 align-top">{r.suburb || '—'}</td>
                        <td className="px-4 py-3 align-top">
                          {r.phone ? (
                            <a href={`tel:${r.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-1 hover:underline" style={{ color: '#22d3ee' }}>
                              <Phone size={12} /> {r.phone}
                            </a>
                          ) : (
                            <span style={{ color: 'var(--bp-muted)' }}>—</span>
                          )}
                        </td>
                        <td className="px-4 py-3 align-top">
                          <a href={mapsLink(r.lat, r.lon, r.name)}
                            target="_blank" rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-semibold hover:underline"
                            style={{ color: '#22d3ee' }}>
                            Open <ExternalLink size={12} />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards (still tabular feel, one business per row) */}
              <ul className="md:hidden">
                {results.map((r, i) => (
                  <li key={r.id}
                    className="px-4 py-3"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--bp-border)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold truncate">{r.name}</div>
                        <div className="text-xs mt-0.5" style={{ color: 'var(--bp-muted)' }}>
                          {r.group}{r.sub ? ` · ${r.sub}` : ''} · {fmtDistance(r.distance_m)}
                        </div>
                        {(r.address || r.suburb) && (
                          <div className="text-xs mt-1" style={{ color: 'var(--bp-muted)' }}>
                            {r.address || r.suburb}
                          </div>
                        )}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs">
                          {r.phone && (
                            <a href={`tel:${r.phone.replace(/\s+/g, '')}`}
                              className="inline-flex items-center gap-1" style={{ color: '#22d3ee' }}>
                              <Phone size={12} /> {r.phone}
                            </a>
                          )}
                          {r.email && (
                            <a href={`mailto:${r.email}`}
                              className="inline-flex items-center gap-1" style={{ color: '#22d3ee' }}>
                              <Mail size={12} /> Email
                            </a>
                          )}
                        </div>
                      </div>
                      <a href={mapsLink(r.lat, r.lon, r.name)}
                        target="_blank" rel="noopener noreferrer"
                        className="shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-full text-xs font-semibold"
                        style={{ background: 'var(--bp-accent)', color: '#0a0a0c' }}>
                        Map <ExternalLink size={12} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!loading && searched && results.length === 0 && !error && (
            <div className="card p-6 text-center text-sm" style={{ color: 'var(--bp-muted)' }}>
              Nothing matched. Try a bigger radius or different categories.
            </div>
          )}
        </section>
      )}

      <p className="mt-8 text-xs" style={{ color: 'var(--bp-muted)' }}>
        Data © OpenStreetMap contributors. "No website" means no website tag in OSM — some businesses may have one
        we just can't see, so verify before pitching.
      </p>
    </main>
  )
}
