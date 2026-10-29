// Blog articles - single source of truth for the /blog index + article pages.
// Plain data (no MDX) so articles render through the shared ArticleTemplate
// and stay easy for AI answer engines to parse.

import { GROWTH_POSTS } from './posts'
import { CLIENT_POSTS } from './posts/clients'

const LEGACY_POSTS = [
  {
    "slug": "best-web-design-agencies-perth",
    "title": "How to Choose a Web Design Agency in Perth",
    "metaTitle": "Choosing a Perth Web Design Agency: What to Compare",
    "description": "Compare Perth web design proposals on scope, total cost, ownership, real local work and support. Includes Bluepeek’s current offer and questions to ask.",
    "date": "2026-07-01",
    "updated": "2026-10-29",
    "readTime": "5 min read",
    "primaryService": "website-design-perth",
    "intro": "The best web design agency for your Perth business depends on the site you need, the support you want and the terms you agree. Compare written scope, total cost and real work before comparing headline prices. Bluepeek is one of the providers you can consider; this guide is published by Bluepeek and is not an independent agency ranking.",
    "sections": [
      {
        "h2": "Compare the same scope in every quote",
        "paragraphs": [
          "Ask each provider to price the same service pages, content work, mobile layouts, enquiry forms and booking requirements. A low headline price is hard to compare with a larger proposal until you know what each includes."
        ],
        "table": {
          "headers": [
            "Decision",
            "What to ask for",
            "Why it matters"
          ],
          "rows": [
            [
              "Build scope",
              "Named pages, content, forms and integrations",
              "Shows what will actually be delivered"
            ],
            [
              "Total cost",
              "Build, monthly fees, domain, hosting and third-party costs",
              "Makes the first-year commitment comparable"
            ],
            [
              "Ownership",
              "Who owns the domain, content and final site",
              "Explains what you keep if you leave"
            ],
            [
              "Support",
              "Who handles updates and what the plan covers",
              "Makes ongoing responsibilities clear"
            ],
            [
              "Evidence",
              "Live local examples and dated, defined results",
              "Lets you assess relevant work rather than promises"
            ]
          ]
        }
      },
      {
        "h2": "What Bluepeek offers Perth businesses",
        "paragraphs": [
          "Our first month is free, then website and monthly SEO plans start at $99 per month, with no separate build fee or lock-in contract. Exact pages, integrations, third-party costs and support arrangements are confirmed in writing. Most straightforward builds go live in one to two weeks once content is ready.",
          "Bluepeek is based on the Gold Coast, started in Perth and works with WA businesses remotely. You deal directly with co-founders Jac Thomas-Rees and Zach Colville. See our [Perth website design service](/website-design-perth) and the [Superior Garage website case study](/work/superior-garage) for a workshop example. AI chat, booking integrations and automation need their own agreed scope; do not assume they are included in the starting price."
        ]
      },
      {
        "h2": "Check real work and evidence",
        "paragraphs": [
          "Open the live examples on your phone. Can you understand the service, find the business and call or enquire without searching? Ask what the provider actually built and whether the result fits a business like yours.",
          "For results, ask for the date range, source and definition. A form enquiry is not a paid job. A ranking snapshot depends on the query, date and location. Our [Attention Detailing case study](/work/attention-detailing) separates enquiry totals from confirmed jobs and explains its reporting periods."
        ]
      },
      {
        "h2": "Questions to ask before signing",
        "bullets": [
          "Which pages and content are included, and who supplies the photos?",
          "What do I pay in the first month, after that and if the scope changes?",
          "Are hosting, domain renewal, software subscriptions and tax itemised?",
          "Who owns the final site and how would a move to another host work?",
          "What notice and handover arrangements apply if I cancel?",
          "How will we measure relevant enquiries and separate them from spam?"
        ],
        "after": [
          "Compare current written proposals directly. We do not publish unverified competitor prices, turnaround promises or a numbered best-agency ranking."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Who is the cheapest web design agency in Perth?",
        "a": "We cannot verify a cheapest provider across the market. Compare the same scope and the total first-year cost. Bluepeek’s current offer is first month free, then from $99 per month including the build and monthly SEO, with exact scope agreed before work starts."
      },
      {
        "q": "How long does a Bluepeek website take?",
        "a": "Most straightforward sites go live in one to two weeks once content is ready. Larger sites and integrations need an agreed project timeline."
      },
      {
        "q": "Does Bluepeek have a Perth office?",
        "a": "Bluepeek is based on the Gold Coast and works with businesses across Perth and WA remotely. We started in Perth; our service pages show genuine WA client work."
      }
    ]
  },
  {
    "slug": "website-cost-perth-price-guide",
    "title": "How Much Does a Website Cost in Perth?",
    "metaTitle": "Website Cost Perth: From $99/mo | Inclusions Explained",
    "description": "Bluepeek’s Perth website offer: first month free, then from $99/month with the build and monthly SEO. Compare scope, ongoing costs, ownership and optional extras.",
    "date": "2026-07-08",
    "updated": "2026-10-29",
    "readTime": "5 min read",
    "primaryService": "website-design-perth",
    "intro": "Bluepeek’s website plans for Perth businesses start with a free first month, then from $99 per month including the website build and full monthly SEO, with no separate build fee or lock-in contract. This is Bluepeek’s starting offer, not a Perth market average. Your written quote confirms the pages, integrations, ongoing work and any third-party costs before you start.",
    "sections": [
      {
        "h2": "What does the starting offer cover?",
        "table": {
          "headers": [
            "Part of the quote",
            "Starting position",
            "What to confirm"
          ],
          "rows": [
            [
              "First month",
              "Free",
              "When the offer and billing begin"
            ],
            [
              "Ongoing website plan",
              "From $99 per month",
              "Your exact plan and ongoing scope"
            ],
            [
              "Website build",
              "No separate build fee",
              "Included pages, content and forms"
            ],
            [
              "Monthly SEO",
              "Included in the website plan",
              "Agreed priorities and reporting"
            ],
            [
              "Ownership",
              "You own the domain, content and site",
              "Payment and handover terms in your agreement"
            ],
            [
              "Optional systems",
              "Quoted to your requirements",
              "Booking, AI chat, follow-up and third-party fees"
            ]
          ]
        },
        "after": [
          "The offer does not mean every possible website or integration costs $99 per month. Ask for the deliverables and limits in writing. Read our [Perth website design service](/website-design-perth) and [small business website service](/small-business-websites-perth) for the approach."
        ]
      },
      {
        "h2": "What should a useful small business website include?",
        "paragraphs": [
          "A driver looking for a Malaga mechanic needs different information from someone comparing an Ascot spa treatment. Agree the customer questions before the page count: services, location, real work, trust signals and a clear contact or booking route.",
          "Our builds use custom mobile-first layouts, technical SEO foundations, structured data and enquiry forms. The exact page plan and any campaign landing pages are agreed for your business. See [Superior Garage](/work/superior-garage) and [Jasmine Health & Spa](/work/jasmine-health-and-spa) for different service-business examples."
        ]
      },
      {
        "h2": "Which costs should be itemised separately?",
        "bullets": [
          "Domain registration or renewal and whose account owns the domain.",
          "Hosting, maintenance and the support included in the monthly arrangement.",
          "Third-party booking tools, CRM subscriptions and payment fees, if needed.",
          "AI chat, missed-call recovery and automated follow-up where requested.",
          "Photography, extra copy, additional pages or later changes outside the agreed scope.",
          "Tax treatment and the total amount payable."
        ],
        "after": [
          "These are questions for the quote, not a claim that every item is charged separately. Confirm inclusions before comparing providers. Ad spend and advertising management are different services from the website build."
        ]
      },
      {
        "h2": "How to compare monthly and upfront proposals",
        "paragraphs": [
          "For a simple comparison, add the build fee, billed monthly fees and other required costs over the same period. On an illustrative plan that remains at $99 per month with the first month free, eleven billed months would total $1,089 in the first twelve months. That excludes any separately agreed extras and is arithmetic using the starting offer, not a quote for a particular business.",
          "Check what happens after the first year and what support you need. A cheaper website that cannot explain your service or capture an enquiry may not suit the job. A larger package is only useful if you need the additional scope."
        ]
      },
      {
        "h2": "What happens if I leave?",
        "paragraphs": [
          "Bluepeek has no lock-in contract. You own your domain, content and final site under the payment terms in your agreement. Ongoing cancellation notice and handover arrangements are confirmed in that agreement.",
          "Ask how hosting, subscriptions and integrations will be managed after a move. See our [terms of service](/terms) and ask for a [written website quote](/#contact) covering your exact requirements."
        ]
      }
    ],
    "faqs": [
      {
        "q": "Does Bluepeek charge a website setup fee?",
        "a": "The current website offer has no separate build fee: first month free, then plans from $99 per month including the build and monthly SEO. Exact scope and third-party costs are confirmed in writing."
      },
      {
        "q": "Are AI chat and booking systems included for $99 per month?",
        "a": "Do not assume so. AI chat, automation and booking integrations are scoped in the quote, including any third-party subscriptions. The starting website price is not a promise of every integration."
      },
      {
        "q": "Do I own the website if I cancel?",
        "a": "You own the final site, domain and content under your agreed payment terms. There is no lock-in contract; cancellation notice and handover arrangements are confirmed in your agreement."
      },
      {
        "q": "Do you work with businesses outside Perth?",
        "a": "Yes. Bluepeek is based on the Gold Coast and builds websites for businesses across Australia. See our Gold Coast and Australia website design pages for the same approach in other markets."
      }
    ]
  },
  {
    slug: 'ai-automation-small-business-perth-guide',
    title: "AI Automation for Small Business: A Perth Owner’s Guide",
    description:
      'A practical guide to AI automation for Perth small businesses - 24/7 enquiry assistants, automated follow-up and booking, with real local scenarios and cost-vs-ROI framing.',
    date: '2026-07-15',
    updated: '2026-10-29',
    readTime: '8 min read',
    intro:
      'AI automation sounds abstract until you see it solve a specific, everyday problem - a missed call, a lead that never got followed up, a booking that had to wait until business hours. Here is a practical look at what AI automation actually does for a small Perth business, with real scenarios and a straightforward cost-vs-ROI view.',
    sections: [
      {
        h2: 'What AI automation actually means for a small business',
        bullets: [
          '24/7 enquiry assistant - a chatbot on your website that answers common questions and captures contact details any time of day, including after hours and weekends.',
          'Automated follow-up - when a lead enquires, an automated message (SMS or email) follows up immediately, then again if there is no reply, so leads do not go cold.',
          'Online booking - customers can book an appointment or job straight from your website without calling during business hours.',
        ],
      },
      {
        h2: 'Three example workflows for Perth businesses',
        paragraphs: [
          'Tradie missed-call recovery: A Perth plumber is often on tools and cannot answer the phone. Every missed call is a potential job going to a competitor. An AI-answered enquiry form plus automatic SMS follow-up means the enquiry is captured and responded to within minutes, even mid-job.',
          'Salon booking: A beauty salon in Perth gets after-hours enquiries on Instagram and via the website, but the front desk closes at 5pm. Online booking lets a customer see availability and book a slot at 9pm on a Sunday, without waiting for a call back.',
          'Mechanic lead capture: A mechanic’s website gets traffic from Google but many visitors leave without calling. A chatbot that asks a couple of quick questions (make, model, issue) and captures a phone number turns a passive visitor into a warm lead the workshop can call back the next morning.',
        ],
      },
      {
        h2: 'Cost vs ROI - is it worth it for a small business?',
        paragraphs: [
          'Bluepeek quotes automation to the workflow, integrations and ongoing usage your business needs. Website plans start with the first month free, then from $99 per month, but AI chat and automated follow-up are optional additions with their scope and costs agreed separately. Compare the full monthly cost with the gross profit from additional completed jobs, after allowing for staff time and software fees. Extra enquiries are not the same as booked work, so measure both before judging the return.',
        ],
      },
      {
        h2: 'What to look for before adding AI automation',
        bullets: [
          'Make sure it is genuinely automated end-to-end (capture, follow-up, and where relevant, booking) rather than just a chat widget with no follow-up behind it.',
          'Check where leads land - ideally a simple inbox or CRM you can check, not buried in a spreadsheet.',
          'Ask whether it works after hours and on weekends, since that is when it delivers the most value for trades and service businesses.',
          'Confirm there is no lock-in - you should be able to turn it off or leave without penalty.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need to know how to use AI to benefit from this?', a: 'No - the automation runs in the background. You just receive the captured leads and bookings, the same as you would from a phone call.' },
      { q: 'Will an AI chatbot sound robotic to my customers?', a: 'A well-built chatbot is scoped to your business and answers common questions naturally - it is there to capture the enquiry and hand it to you, not replace a real conversation.' },
      { q: 'How much does AI automation cost for a small business in Perth?', a: 'We quote the workflow, integrations and ongoing usage before work starts. AI automation is an optional addition; do not assume it is included in the starting website plan.' },
      { q: 'What is the fastest win from AI automation for a tradie?', a: 'Missed-call recovery - capturing and following up on enquiries you would otherwise lose while on a job, on the tools, or after hours.' },
      { q: 'Can AI automation help with online bookings too?', a: 'Yes - most small business AI setups can include a booking system so customers can book a slot any time, not just during office hours.' },
    ],
  },
]

export const GUIDE_POSTS = [...GROWTH_POSTS, ...LEGACY_POSTS]
export { CLIENT_POSTS }
export const BLOG_POSTS = [...GUIDE_POSTS, ...CLIENT_POSTS]

// Client stories in one city hub, optionally leaving one out (the post being read).
export function clientPostsIn(hub, exceptSlug) {
  return CLIENT_POSTS.filter(p => p.hub === hub && p.slug !== exceptSlug)
}

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
