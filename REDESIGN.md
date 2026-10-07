# Bluepeek homepage redesign

Implemented in an isolated copy of the existing Next.js project, based on local commit `503b8c0`. The production website has not been deployed or changed.

## Preview

The current local preview runs at http://localhost:3018. To restart from this directory:

```sh
npm ci
npm run build
npm run start -- --port 3018
```

The existing Google font setup and live reviews request require network access during the build.

## Design and behaviour

- Reuses the existing Bluepeek Logo component and cube asset, with the existing brand blue `#0B3ED9`.
- Uses the supplied headline, slim navigation, and an open photographic silver laptop in a light workspace.
- The laptop screen displays a real capture from https://coastal-2pac.vercel.app/, taken on 18 September 2026 Australia/Brisbane. It is a captured presentation of the client page, not a live iframe. Refresh the capture when the client website changes.
- Native page scrolling translates the screenshot within a perspective-mapped screen. Desktop uses a short CSS sticky stage; mobile and tablet use ordinary document scrolling. No scrolling is intercepted and no animation library was added. Reduced motion removes the scrolling effect and pinning.
- Retains client links, all package inclusions, additional service access, founder photos, live Google review fetching, the callback page, and the existing chat widget.
- Adds accessible contact labels, validation, loading, success, failure, retry and focus handling while retaining the original submission endpoint, form slug and hostname routing.
- Metadata, structured-data logic, analytics, redirects, SEO routes and dependencies are unchanged. The layout imports the shared site styles.

## Latest update

Replaced floral/café sample concepts with automotive, home services and Bluepeek team content. The social website card now features Rayan Tiling. The gallery leads with Coastal 2PAC and Rayan Tiling and excludes AE & AC from curated, CRM and Vercel sources, including offline fallback. See `CAMPAIGN-ASSETS.md` for current imagery and prompts.

Unified the entire site around shared warm cream/stone surfaces, charcoal text, muted sage accents and restrained Bluepeek blue buttons. Homepage headings now share one sans-serif scale and consistent spacing; campaign and social previews use the same surrounding canvas. Supporting pages reuse the homepage header/footer, neutral callouts and colour tokens. The chat panel also follows the light palette. The client creative remains colourful.

Added bold Google/Meta ad previews on a warm stone background and a colourful social content showcase below the website projects. These are clearly labelled sample concepts, with generated florist and café imagery. See `MARKETING-CONCEPTS.md` for image prompts and provenance. Verified responsive layouts at 1440, 768, 390 and 320 pixels, image loading, section order and enquiry links.

The stacked mobile/tablet hero now preserves the photograph’s full height and eases gradually into the page background. This removes the compressed horizontal fade above the laptop while keeping the display sharp.

Coastal 2PAC replaces Artisan Concrete in the laptop display and selected work. Both images were captured directly from the client URL supplied by the user. The existing laptop perspective and scroll behaviour are retained.

## Verification

- Production build passed, generating all 40 existing pages.
- Chrome checked at 1440×900, 768×1024, 390×844 and 320×740.
- Verified scrolling display, reduced motion, mobile menu and Escape behaviour, one H1, anchor targets and horizontal overflow.
- Verified all 22 linked internal routes and all three selected external client sites return HTTP 200.
- Exercised contact validation, loading, failure, retained field values, retry and success with intercepted responses.
- Submitted one real enquiry named `INTERNAL TEST — Bluepeek redesign` using `info@bluepeek.com.au`. The real endpoint returned HTTP 200 and the redesigned form displayed its success state. The local redesign was served at its production hostname inside an isolated test browser to test the original domain routing. Inbox delivery was not separately checked. The test can be archived in Bluepeek's lead system.
- Preview domains such as localhost may not be registered with the production form service. Its hostname handling has deliberately been preserved; use the actual Bluepeek domain for deployment or register a preview domain with the form service.

## Image provenance

The reference was recovered from the user's ChatGPT task titled “Redesign Bluepeek Website”, attachment `Screenshot 2026-09-17 at 23.23.34.png`. Existing business and project assets came from the source repository. No generated client design, metrics, logos or testimonials were used.

The photographic plate was prepared with the built-in image-generation tool, then optimized to WebP. Its screen is overlaid with the genuine client capture in responsive HTML. Final assets:

- `public/images/bluepeek-workspace.webp`
- `public/images/coastal-2pac-scroll-3200.webp`

Image-generation prompt:

Use case: precise-object-edit. Asset type: photographic website hero background, no page UI. Input image is the composition reference. Create a high resolution 1920x1080 landscape photographic plate recreating the bright contemporary workspace and realistic open silver laptop from the supplied reference. REMOVE ALL website UI outside the laptop: no BluePeek logo, no navigation, no headline, no labels, no buttons, no statistics, no numbers, no rounded frame, no black outer border. Fill the full image edge to edge with the workspace photograph. The left 42 percent must be a very clean off-white/cool light grey wall suitable for separate black HTML text. A pale light grey stone desk stretches across the bottom. Laptop occupies the RIGHT side from approximately x=42% to 95%, y=21% to 88%. Its display is facing the viewer at a shallow three-quarter angle as in the reference, keyboard and silver palm rest completely visible, realistic hinge, trackpad and black keys. Show the FRONT of the open laptop, never back of lid. Replace the entire screen contents with a perfectly flat blank dark charcoal screen, four clean straight edges, so a real client website screenshot can be overlaid in production with a perspective transform. No invented text or website on display. Soft natural window light, believable contact shadows, off-white walls, subtly blurred dark green plant far right. No blue lighting, glow, sculpture or floating object. Match reference laptop orientation closely. Restrained premium product photography; realistic materials and proportions.
