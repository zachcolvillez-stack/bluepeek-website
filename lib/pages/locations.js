// Location hubs: website design and local SEO by city. Each page lists the
// client stories in its hub (MoneyPageTemplate reads page.hub), so every claim
// about "businesses we build for here" is backed by a real, linked story.
// Search observations come from Google results checked on 14 October 2026.
import { CLIENT_POSTS } from '../posts/clients'

const count = hub => CLIENT_POSTS.filter(p => p.hub === hub).length
const CTA = {
  label: 'Enquire About Your Free First Month',
  form: 'website',
  note: 'Tell us about your business. We will explain the website and monthly SEO package, your free first month, and the price from $99 per month before you sign up.',
  submit: 'Enquire about the offer',
}
const PRICE = {
  q: 'How much does a website cost?',
  a: 'The first month is free. After that, plans start at $99 per month, including the website build and monthly SEO, with no separate build fee and no lock-in contract. We quote the exact plan in writing before work starts.',
}
const REMOTE = {
  h2: 'Built by two founders, wherever you are',
  paragraphs: [
    'Bluepeek is Jac Thomas-Rees and Zach Colville, based on the Gold Coast. We build for businesses across Australia by phone, video and email, and every site is built by us, not outsourced. You own your domain, your content and the site, and there is no lock-in contract.',
  ],
}
const METHOD = {
  h2: 'How we study a suburb before we build',
  steps: [
    { title: 'Search what customers search', text: 'We run the real searches for your trade and suburb, and the neighbouring suburbs, and record who holds the map pack and page one, and why.' },
    { title: 'Find the gaps', text: 'Suburb names shared with other cities, services competitors do not have pages for, directories and chains crowding the results, review counts to beat.' },
    { title: 'Build pages for the searches that matter', text: 'One page per core service and per genuine service area, with the suburb, structured data and click-to-call done properly.' },
    { title: 'Line up the Google profile', text: 'Same name, address, phone, hours and services on the site and the profile, and a review request after every job.' },
  ],
}

export const perth = {
  slug: 'website-design-perth',
  kind: 'service',
  stage: 'convert',
  area: 'perth',
  hub: 'perth',
  serviceType: 'Website design',
  nav: 'Website Design Perth',
  primaryKeyword: 'website design Perth',
  secondaryKeywords: ['web design Perth', 'local SEO Perth', 'small business websites Perth'],
  metaTitle: 'Website Design Perth | Local SEO by Suburb',
  metaDescription: `Custom websites and local SEO for Perth businesses, built suburb by suburb. ${count('perth')} Perth businesses so far, from Malaga to Beeliar. First month free.`,
  h1: 'Website design in Perth, built for the suburb you work in.',
  lead: `We have built websites for ${count('perth')} Perth and WA businesses, from mechanics and smash repairers in Malaga to barbers in Beeliar and painters in Jandakot. Each site starts with the searches customers in that suburb actually make. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What Perth searches taught us',
      paragraphs: [
        'Perth is a city of suburbs, and people search them by name. When we checked our Perth clients’ searches on 14 October 2026, a few patterns stood out that change how a Perth site should be built.',
      ],
      bullets: [
        '**Some Perth suburb names belong to somewhere else too.** “Massage Ascot” returned Ascot in Brisbane, “barber Kiara” returned Kirra on the Gold Coast, and “mechanic Hamilton Hill” returned Hamilton in Brisbane. A Perth site in those suburbs has to say Perth and WA everywhere Google looks.',
        '**Industrial suburbs are the hardest.** In Malaga, mechanic and panel beater searches are held by workshops with 15 to 35 years in business and hundreds of reviews, plus chains like Auto Masters and Autobahn. Newer workshops win on specific services first.',
        '**Marketplaces crowd trade searches.** hipages, Airtasker and Yellow Pages took places on page one for tilers, painters and gardeners. A tradie who ranks directly gets the enquiry for themselves.',
        '**When the site and profile agree, small businesses win.** Textured Barber Lounge leads “barber Beeliar” in both the map pack and the organic results against a competitor with four times its reviews.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsIntro: 'Every business below has a story on how local search works in its suburb: what customers search, who Google shows, and what its site does about it.',
  faqs: [
    { q: 'Do you work with Perth businesses from the Gold Coast?', a: 'Yes. Most of our clients are outside the Gold Coast, and Perth is our largest group. Everything runs by phone, video and email, and we research your suburb’s search results directly.' },
    { q: 'Should a Perth website target Perth or my suburb?', a: 'Usually your suburb and the ones around it, plus Perth for services people travel for. We decide per service based on how customers actually search.' },
    { q: 'What if my suburb name exists in another state?', a: 'We add Perth and WA to your title, headings, structured data and Google profile, and target neighbouring suburbs that are not confused with anywhere else.' },
  ],
  related: ['local-seo', 'google-business-profile-management', 'google-reviews', 'website-design'],
  updated: '2026-10-14',
}

export const melbourne = {
  slug: 'website-design-melbourne',
  kind: 'service',
  stage: 'convert',
  area: 'melbourne',
  hub: 'melbourne',
  serviceType: 'Website design',
  nav: 'Website Design Melbourne',
  primaryKeyword: 'website design Melbourne',
  secondaryKeywords: ['web design Melbourne', 'local SEO Melbourne', 'website design regional Victoria'],
  metaTitle: 'Website Design Melbourne & Victoria | Local SEO',
  metaDescription: 'Custom websites and local SEO for Melbourne and regional Victorian businesses, from Craigieburn and Coburg to Werribee and Shepparton. First month free.',
  h1: 'Website design in Melbourne and regional Victoria.',
  lead: `We build websites for Victorian businesses in Melbourne’s growth corridors and in regional towns, ${count('melbourne')} so far. Each site starts with the searches customers in that area make, and the gaps in what Google shows them. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What Victorian searches taught us',
      bullets: [
        '**Growth corridors reward suburb pages.** Freddy’s Auto Care leads “mechanic Craigieburn” in the map pack and organic results, with pages for Roxburgh Park, Mickleham, Greenvale, Kalkallo and Epping, where new residents search for a local mechanic for the first time.',
        '**Roadworthy certificates are a Victorian search.** Sellers need one to sell a registered car, so “roadworthy” plus a suburb is a high-intent search worth its own page.',
        '**Regional towns are searched as a whole.** Nobody searches “yoga Shepparton East”; they search “yoga Shepparton”. b.YOGA Practice leads that search in both the pack and the organic results.',
        '**The map pack is a separate contest.** Union Road Mechanic ranks first on the website results for its town but was missing from the map, which is fixed through the Google profile, not the site.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsIntro: 'Each business below has a story on how local search works where it trades.',
  faqs: [
    { q: 'Do you build for regional Victorian businesses?', a: 'Yes. Regional search works differently from Melbourne: fewer competitors, town-level searches and customers who travel further. We build for that.' },
    { q: 'Can you help a Melbourne business that is not on the map?', a: 'Usually that is a Google Business Profile issue rather than a website one. We set up and align the profile alongside the site.' },
  ],
  related: ['local-seo', 'google-business-profile-management', 'google-reviews', 'website-design'],
  updated: '2026-10-14',
}

export const sydney = {
  slug: 'website-design-sydney',
  kind: 'service',
  stage: 'convert',
  area: 'sydney',
  hub: 'sydney',
  serviceType: 'Website design',
  nav: 'Website Design Sydney',
  primaryKeyword: 'website design Sydney',
  secondaryKeywords: ['web design Sydney', 'local SEO Sydney', 'website design regional NSW'],
  metaTitle: 'Website Design Sydney & NSW | Local SEO',
  metaDescription: 'Custom websites and local SEO for Sydney and regional NSW businesses, from Liverpool, Granville and Waitara to Albury and Wagga Wagga. First month free.',
  h1: 'Website design in Sydney and regional New South Wales.',
  lead: `We build websites for New South Wales businesses in Sydney’s west and north and in regional cities, ${count('sydney')} so far. Each one starts with the real searches in that suburb or town. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What New South Wales searches taught us',
      bullets: [
        '**Chains own some Sydney searches outright.** “Laser hair removal Liverpool” was all national laser chains in the pack and on page one. An independent wins on specific questions, prices and neighbouring suburbs first.',
        '**Granville is also in Queensland.** “Mechanic Granville” mixed Sydney results with Granville near Maryborough, so a Sydney site there needs Granville NSW and its street everywhere.',
        '**Pink and blue slips are searched by name.** A New South Wales mechanic with a clear page for each wins those searches.',
        '**Border towns are two searches.** Albury is in NSW and Wodonga in Victoria; S.T.S.B Gardening’s site covers both and has brought in 20 quote requests since July.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsIntro: 'Each business below has a story on how local search works where it trades.',
  faqs: [
    { q: 'Can a small Sydney business compete with chains on Google?', a: 'Not on every search at first. On specific services, suburbs and questions the chains do not answer well, yes, and those are where we start.' },
    { q: 'Do you build for regional NSW?', a: 'Yes, including Albury and Wagga Wagga. Regional searches are usually by town, with fewer competitors and customers who travel further.' },
  ],
  related: ['local-seo', 'google-business-profile-management', 'google-reviews', 'website-design'],
  updated: '2026-10-14',
}

export const brisbane = {
  slug: 'website-design-brisbane',
  kind: 'service',
  stage: 'convert',
  area: 'brisbane',
  hub: 'queensland',
  serviceType: 'Website design',
  nav: 'Website Design Brisbane',
  primaryKeyword: 'website design Brisbane',
  secondaryKeywords: ['web design Brisbane', 'website design Sunshine Coast', 'website design Hervey Bay', 'local SEO Queensland'],
  metaTitle: 'Website Design Brisbane & Queensland | Local SEO',
  metaDescription: 'Custom websites and local SEO for Brisbane, Sunshine Coast and regional Queensland businesses, from a Gold Coast team. First month free, then from $99 a month.',
  h1: 'Website design in Brisbane and across Queensland.',
  lead: 'We are a Gold Coast team, and we build for Queensland businesses well beyond it: barbers in Brisbane’s north, massage on the Sunshine Coast and glass fencing in Hervey Bay. Each site starts with the searches customers in that town make. First month free, then from $99 per month.',
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What Queensland searches taught us',
      bullets: [
        '**Multi-location businesses need a page per location.** Empire Cuts leads “barber Taigum” in both the map pack and organic results, and each of its Brisbane shops needs the same treatment.',
        '**Regional towns move fast.** Marlin Glass Fencing ranks second for “glass pool fencing Hervey Bay” in both the pack and organic results, with no reviews yet. A handful of reviews could take first.',
        '**Check the search matches the business.** A studio named “home massage” is easily mistaken for a mobile service; the right searches to chase depend on what the business actually offers.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsIntro: 'Each business below has a story on how local search works where it trades. For the Gold Coast, see our [Gold Coast website design](/website-design-gold-coast) page.',
  faqs: [
    { q: 'Do you build for Brisbane businesses?', a: 'Yes. We are based on the Gold Coast, an hour from Brisbane, and work with Queensland businesses from Brisbane to Hervey Bay.' },
    { q: 'Is SEO different in regional Queensland?', a: 'Searches are usually by town rather than suburb, and there are fewer competitors, so a well-built site and profile can reach the top sooner.' },
  ],
  related: ['website-design-gold-coast', 'local-seo', 'google-business-profile-management', 'google-reviews'],
  updated: '2026-10-14',
}

export const australia = {
  slug: 'website-design-australia',
  kind: 'service',
  stage: 'convert',
  area: 'australia',
  hub: 'all',
  serviceType: 'Website design',
  nav: 'Website Design Australia',
  primaryKeyword: 'website design Australia',
  secondaryKeywords: ['small business web design Australia', 'local SEO Australia', 'web design agency Australia'],
  metaTitle: 'Website Design Australia | Local SEO by Suburb',
  metaDescription: `Custom websites and local SEO for Australian businesses. ${CLIENT_POSTS.length} client sites across five states, each built from a study of its own suburb. First month free.`,
  h1: 'Website design for local businesses across Australia.',
  lead: `We have built ${CLIENT_POSTS.length} websites for local businesses across Queensland, Western Australia, Victoria, New South Wales and South Australia, plus online stores that ship nationally. Every one starts with a study of the searches in that business’s own suburb. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'Local SEO is local everywhere',
      paragraphs: [
        'A plumber in Nerang, a barber in Beeliar and a mechanic in Craigieburn compete in completely different search markets. What works is the same method applied to each: find the searches customers really make in that suburb, see who Google shows and why, then build the pages and profile that answer those searches better.',
        'That is why every client below has its own story, written from its own Google results, rather than a template with the name swapped.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsTitle: 'Every business we have written about, by region',
  clientsIntro: 'Choose a region to see our page for it, or open any story to see how local search works for that business.',
  faqs: [
    { q: 'Do you only work with Gold Coast businesses?', a: 'No. We are based on the Gold Coast, but most of our clients are elsewhere in Australia, with Perth our largest group.' },
    { q: 'Can you build an online store?', a: 'Yes. For stores we focus on category and product pages, product structured data and the questions buyers search, as with Egg Decorating Supplies and Lazer Lures.' },
  ],
  related: ['website-design-gold-coast', 'website-design-perth', 'website-design-melbourne', 'website-design-sydney', 'website-design-brisbane', 'local-seo'],
  updated: '2026-10-14',
}

const near = suburbs => CLIENT_POSTS.filter(p => suburbs.includes(p.client.suburb)).length

export const nerang = {
  slug: 'website-design-nerang',
  kind: 'service',
  stage: 'convert',
  area: 'gold-coast',
  hub: 'gold-coast',
  clientSuburbs: ['Nerang', 'Molendinar'],
  serviceType: 'Website design',
  nav: 'Website Design Nerang',
  primaryKeyword: 'website design Nerang',
  secondaryKeywords: ['web design Nerang', 'web design Molendinar', 'SEO Nerang'],
  metaTitle: 'Website Design Nerang & Molendinar | Web Design and SEO',
  metaDescription: `Web design and local SEO for Nerang and Molendinar businesses, from a studio in Molendinar. ${near(['Nerang', 'Molendinar'])} local client sites so far. First month free.`,
  h1: 'Website design in Nerang, from a studio just up the road.',
  lead: `Bluepeek is based in Molendinar, next door to Nerang, and ${near(['Nerang', 'Molendinar'])} of the businesses we build for are in these two suburbs: detailers, a tyre and roadworthy workshop, a brake specialist, a drain specialist, a 2PAC spray booth and a mechanic. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What Nerang searches look like',
      paragraphs: [
        'Much of Nerang’s trade work sits along Lawrence Drive and the light industrial streets off it, a few minutes from Molendinar, Carrara and Ashmore. When we checked our Nerang clients’ searches on 14 October 2026, each trade had its own kind of competition.',
      ],
      bullets: [
        '**Tyres are owned by national chains.** Bob Jane, Bridgestone, Goodyear and Tyrepower all had Nerang store pages on page one, and the map pack leader had about 1,200 reviews. An independent wins the narrower searches first: puncture repair, second-hand tyres and safety certificates.',
        '**Car servicing is crowded with long-established workshops**, including one with 35 years in business and an Ultra Tune franchise. Specialists win on what they do differently, such as in-house brake machining.',
        '**Detailing is decided on reviews.** The map pack held detailers with 134 to 302 reviews; Attention Detailing was second in both the pack and the website results, and took 74 enquiries in under a month.',
        '**Drains are urgent.** Plumbers with dedicated Nerang pages crowd the search; Fair Dinkum Drainage holds second in the pack with a 5.0 rating.',
      ],
    },
    METHOD,
    {
      h2: 'Local, in person if you like',
      paragraphs: [
        'We are Jac Thomas-Rees and Zach Colville, based in Molendinar. For Nerang businesses we are close enough to come and take photos of the workshop, which is often the best content a trade website can have. You own your domain, content and site, and there is no lock-in contract.',
      ],
    },
  ],
  clientsTitle: 'Nerang and Molendinar businesses we have built for',
  clientsIntro: 'Each business below has a story on how local search works for its trade in Nerang or Molendinar.',
  faqs: [
    { q: 'Can you visit my business in Nerang?', a: 'Yes. We are based in Molendinar, a few minutes away, and can meet on site and photograph your work for the website.' },
    { q: 'How do I compete with chains in Nerang searches?', a: 'Win the specific searches the chains do not answer well, such as a particular service in your suburb, and build reviews steadily so you can enter the map pack.' },
  ],
  related: ['website-design-gold-coast', 'seo-gold-coast', 'google-business-profile-management', 'google-reviews'],
  updated: '2026-10-15',
}

export const southport = {
  slug: 'website-design-southport',
  kind: 'service',
  stage: 'convert',
  area: 'gold-coast',
  hub: 'gold-coast',
  clientSuburbs: ['Southport'],
  serviceType: 'Website design',
  nav: 'Website Design Southport',
  primaryKeyword: 'website design Southport',
  secondaryKeywords: ['web design Southport', 'SEO Southport'],
  metaTitle: 'Website Design Southport | Web Design and SEO',
  metaDescription: 'Web design and local SEO for Southport businesses. How Southport searches work, what ranks in the Gold Coast CBD, and the local sites we have built. First month free.',
  h1: 'Website design in Southport, the Gold Coast’s busiest search market.',
  lead: `Southport is the Gold Coast’s central business district, and its local searches are some of the most crowded on the coast. We build for businesses there from our studio in Molendinar, ${near(['Southport'])} so far. First month free, then from $99 per month.`,
  answer: PRICE,
  cta: CTA,
  sections: [
    {
      h2: 'What Southport searches look like',
      paragraphs: [
        'When we checked our Southport clients’ searches on 14 October 2026, the pattern was clear: the broad searches are crowded, and specialists win.',
      ],
      bullets: [
        '**Directories and chains take page-one places.** For “mechanic Southport”, a Localsearch list and the Auto Masters chain sat in the top five, and the map pack included a workshop with about 1,300 reviews.',
        '**Long-established businesses hold the map.** The panel beater pack was led by a crash repairer with 25 years in business.',
        '**Specialists can be first.** SPR Performance, a Subaru workshop on Olympic Circuit, was the first result for “Subaru performance Gold Coast”, because its site goes deeper on its specialty than any general workshop.',
      ],
      after: [
        'For a Southport business, the plan is usually: own your specialty with dedicated pages, build reviews steadily for the map, and target the suburbs around you, such as Molendinar, Ashmore, Labrador and Arundel.',
      ],
    },
    METHOD,
    REMOTE,
  ],
  clientsTitle: 'Southport businesses we have built for',
  clientsIntro: 'Each business below has a story on how local search works for it in Southport.',
  faqs: [
    { q: 'Is it worth a small Southport business doing SEO?', a: 'Yes, but aim at the searches you can win: your specialty, your exact services and the suburbs around you. The broad CBD searches come later.' },
    { q: 'Why do directories rank above businesses in Southport?', a: 'They have strong domains and pages listing many businesses. A business beats them in the map pack with a strong profile and reviews, and on the website results with a more specific page.' },
  ],
  related: ['website-design-gold-coast', 'seo-gold-coast', 'google-business-profile-management', 'google-reviews'],
  updated: '2026-10-15',
}
