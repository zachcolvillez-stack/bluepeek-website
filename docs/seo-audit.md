# Free SEO audit (`/seo-audit`)

A public, ungated tool on the marketing site: a visitor types their domain, we
crawl their homepage and score twelve on-page fundamentals, then pitch the fix.

## Why it is not gated

The score **is** the pitch. Someone looking at a red column against their own
domain needs no persuading, and an email wall in front of that loses most of
them. Conversion happens after the result, through the same `EnquireFlow` as
every other CTA, with the domain and score carried into the lead.

## Shape

| File | Role |
| --- | --- |
| `app/seo-audit/page.jsx` | Page shell, metadata, FAQ + schema |
| `components/SeoAudit.jsx` | Form, progress, report, pitch, CTA |
| `lib/seo-audit.js` | Shared pure helpers (client **and** server) |
| `lib/seo-audit-server.js` | The crawl, the SSRF guard, the score |
| `lib/seo-audit-log.js` | Fire-and-forget write to the CRM Supabase |
| `app/api/seo-audit/route.js` | Public endpoint: rate limit, cache, honeypot |

## The two things that matter

**1. It is a public URL fetcher, so the SSRF guard is the feature.**
`safeFetch()` resolves DNS and refuses private/loopback/link-local addresses,
and re-validates on *every redirect hop* — `redirect: 'follow'` would let a
public host 302 us onto `127.0.0.1` after the check had already passed.
Verified against `localtest.me` and `127.0.0.1.nip.io`, both blocked.

**2. Never state a number we did not measure.**
`ok: false` means "we could not check it", **not** "it scored zero" — the UI
says so, and `score`/`grade` land in the database as null. The speed check
takes the **faster of two requests**: one cold sample is worthless, the same
site measured 1.7s and 5.3s minutes apart in testing, which is the difference
between a pass and a fail on nothing but network weather.

The projected score is a flat 100 because every check is on-page and a rebuild
fixes all of them. The caveat under the report states plainly that this grades
on-page technical SEO only — not rankings, backlinks or the Google Business
Profile.

## Environment

Both optional. Without them the tool works and simply logs nothing.

| Variable | Purpose |
| --- | --- |
| `CRM_SUPABASE_URL` | The **CRM/dashboard** project (`jephyb…`), not BluePeek Forms (`bumjk…`) |
| `CRM_SUPABASE_SERVICE_ROLE_KEY` | Legacy `eyJ…` service role JWT |
| `AUDIT_IP_SALT` | Salt for the visitor IP hash. Set it; the default is a constant. |

Table DDL lives in the dashboard repo at `supabase/seo-audits.sql` and must be
pasted into the Supabase SQL editor — no DDL can run from a local session.

## Gotcha

`EnquireWidget` swallows clicks on every `#contact` anchor and opens the panel
in place. The audit CTA calls `openEnquire(service, context)` directly instead,
which is also how the domain and score reach the lead.
