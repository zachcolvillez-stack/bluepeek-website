// On-the-fly screenshot proxy for auto-synced gallery sites.
//
// Vercel's API gives us a live URL but no preview image, so we capture one
// here. Curated gallery entries keep using their hand-made /screenshots/*.png;
// only auto-discovered Vercel projects hit this route.
//
// Provider is chosen by env:
//   SCREENSHOT_PROVIDER = 'screenshotone' | 'microlink'   (optional)
//   SCREENSHOT_API_KEY  = <key>                            (required for screenshotone)
// Default: microlink (free tier, no key) - fine for a low-traffic gallery.
//
// The key never leaves the server, and the response is cached hard on the CDN
// so each site is only captured once until it changes.

export const runtime = 'nodejs'

const ONE_MONTH = 60 * 60 * 24 * 30

function buildProviderUrl(target) {
  const provider =
    process.env.SCREENSHOT_PROVIDER ||
    (process.env.SCREENSHOT_API_KEY ? 'screenshotone' : 'microlink')

  if (provider === 'screenshotone') {
    const p = new URLSearchParams({
      access_key: process.env.SCREENSHOT_API_KEY || '',
      url: target,
      format: 'jpg',
      viewport_width: '1280',
      viewport_height: '800',
      device_scale_factor: '1',
      block_ads: 'true',
      block_cookie_banners: 'true',
      cache: 'true',
      cache_ttl: String(ONE_MONTH),
    })
    return `https://api.screenshotone.com/take?${p}`
  }

  // microlink - returns the screenshot image bytes directly via embed
  const p = new URLSearchParams({
    url: target,
    screenshot: 'true',
    meta: 'false',
    embed: 'screenshot.url',
    'viewport.width': '1280',
    'viewport.height': '800',
  })
  return `https://api.microlink.io/?${p}`
}

export async function GET(request) {
  const target = new URL(request.url).searchParams.get('url')

  // Validate: only capture real, public https pages.
  let parsed
  try {
    parsed = new URL(target)
  } catch {
    return new Response('Invalid url', { status: 400 })
  }
  if (parsed.protocol !== 'https:') {
    return new Response('Only https urls are allowed', { status: 400 })
  }

  try {
    const upstream = await fetch(buildProviderUrl(parsed.toString()), {
      // Cache the upstream capture within Next too.
      next: { revalidate: ONE_MONTH },
    })
    if (!upstream.ok) {
      return new Response('Screenshot failed', { status: 502 })
    }

    const body = await upstream.arrayBuffer()
    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': upstream.headers.get('content-type') || 'image/jpeg',
        'Cache-Control': `public, max-age=${ONE_MONTH}, s-maxage=${ONE_MONTH}, stale-while-revalidate=86400`,
      },
    })
  } catch (err) {
    console.error('[screenshot] capture failed:', err)
    return new Response('Screenshot error', { status: 502 })
  }
}
