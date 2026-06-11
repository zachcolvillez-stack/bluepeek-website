// =============================================================================
// Bluepeek social profiles — SINGLE SOURCE OF TRUTH for the website.
// =============================================================================
// Paste the handle (just the username, no @ or URL) once the account exists.
// Leave "" for platforms you haven't created yet — they simply don't render.
// The footer (and anywhere else) reads from here, so links can never drift.
// =============================================================================

export const SOCIAL_HANDLES = {
  instagram: '',   // e.g. 'bluepeek.au'  → instagram.com/bluepeek.au
  facebook: '',    // e.g. 'bluepeekau'   → facebook.com/bluepeekau
  tiktok: '',      // e.g. 'bluepeek.au'  → tiktok.com/@bluepeek.au
  linkedin: '',    // e.g. 'bluepeek-au'  → linkedin.com/company/bluepeek-au
  youtube: '',     // e.g. '@bluepeekau'  → youtube.com/@bluepeekau
}

const URL_BUILDERS = {
  instagram: (h) => `https://www.instagram.com/${h}`,
  facebook: (h) => `https://www.facebook.com/${h}`,
  tiktok: (h) => `https://www.tiktok.com/@${h.replace(/^@/, '')}`,
  linkedin: (h) => `https://www.linkedin.com/company/${h}`,
  youtube: (h) => `https://www.youtube.com/${h.startsWith('@') ? h : '@' + h}`,
}

export const SOCIAL_LABELS = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
}

/** Only the platforms with a handle filled in: [{ key, label, url }] */
export function activeSocials() {
  return Object.entries(SOCIAL_HANDLES)
    .filter(([, handle]) => handle && handle.trim())
    .map(([key, handle]) => ({
      key,
      label: SOCIAL_LABELS[key],
      url: URL_BUILDERS[key](handle.trim()),
    }))
}
