import { INDUSTRIES, u } from './site'
import { linkFor } from './growth'

// ─── SERVICE PAGE CONTENT ──────────────────────────────────────────
export const SERVICE_CONTENT = {
  'website-design': {
    metaTitle: 'Small Business Website Design Australia',
    metaDescription: 'Custom website design for Australian small businesses. Fast, mobile-first websites built around trust, enquiries and clear ownership.',
    eyebrow: 'Website design',
    h1: 'Small business websites built to earn the enquiry.',
    lead: 'Bluepeek designs fast, clear websites for Australian service businesses, with the structure, proof and contact paths customers need to choose you.',
    sections: [
      { h2: 'A useful website has a job to do', paragraphs: ['A business website should explain what you do, establish trust and make the next step obvious. We plan the page structure around real customer questions before we design the interface.'], bullets: ['Custom design shaped around your brand', 'Mobile-first layouts and clear contact actions', 'Technical SEO foundations and structured data', 'Full ownership of your domain, content and website'] },
      { h2: 'Built around how customers decide', paragraphs: ['Service pages answer specific buying questions. Case studies show relevant work. Clear calls to action help ready customers enquire without searching for contact details. The result is a website that supports both discovery and conversion.'] },
      { h2: 'A direct, practical process', paragraphs: ['You work directly with Jac and Zach. We agree on the structure, prepare the content, design the site and test it across mobile and desktop before launch. Most straightforward projects go live within one to two weeks once content is ready.'] },
    ],
    faqs: [
      { q: 'What businesses do you build websites for?', a: 'We mainly work with Australian trades, automotive workshops, salons, clinics, hospitality businesses and other local service providers.' },
      { q: 'Will I own the finished website?', a: 'Yes. You own the domain, website and content, with no lock-in contract.' },
      { q: 'Can you redesign an existing website?', a: 'Yes. We can improve the structure, design, content and lead capture of an existing site or rebuild it when that is the cleaner option.' },
    ],
  },
  'local-seo': {
    metaTitle: 'Local SEO for Australian Small Businesses',
    metaDescription: 'Local SEO for Australian service businesses: website structure, Google Business Profile alignment, local content and measurement.',
    eyebrow: 'Local SEO',
    h1: 'Local SEO that makes your business easier to find.',
    lead: 'We strengthen the website, location signals and business information that help nearby customers find and understand your business.',
    sections: [
      { h2: 'Start with a consistent local entity', paragraphs: ['Search engines need a clear answer to three questions: who the business is, what it does and where it operates. We align your website, Google Business Profile and core citations around one accurate set of facts.'], bullets: ['Consistent business details across key profiles', 'Service and location page architecture', 'LocalBusiness and Service structured data', 'Internal links that connect related services and areas'] },
      { h2: 'Build pages that match real searches', paragraphs: ['We create useful service, industry and location content around genuine customer intent. Each page has a distinct purpose and original detail, avoiding duplicated suburb pages that add little value.'] },
      { h2: 'Measure enquiries as well as rankings', paragraphs: ['Visibility matters when it produces calls, forms and bookings. We connect search performance with the actions customers take so ongoing work can focus on pages that create commercial value.'] },
    ],
    faqs: [
      { q: 'How long does local SEO take?', a: 'Technical fixes can be completed quickly, while meaningful ranking and traffic improvements usually build over several months. Timing depends on competition, site history and existing authority.' },
      { q: 'Do you optimise Google Business Profiles?', a: 'Yes. We align the profile with the website, services, categories, location information and review process.' },
      { q: 'Do you guarantee first-place rankings?', a: 'No responsible provider can guarantee a specific organic position. We improve the signals, content and measurement that support sustainable visibility.' },
    ],
  },
  'geo-optimisation': {
    metaTitle: 'GEO Optimisation Australia | AI Search Visibility',
    metaDescription: 'Generative engine optimisation for Australian businesses. Make your services, expertise and evidence easier for AI answer engines to understand and cite.',
    eyebrow: 'GEO optimisation',
    h1: 'Make your business easier for AI search to understand.',
    lead: 'GEO organises clear facts, useful answers and verifiable evidence so answer engines can identify what your business does and when it is relevant.',
    sections: [
      { h2: 'Clear entities before clever tactics', paragraphs: ['AI systems need consistent facts about your business, services, people and locations. We organise those facts across your website and trusted external profiles, then connect them with structured data and internal links.'], bullets: ['Accurate organisation and service information', 'Specific answers to customer questions', 'Case studies and first-hand evidence', 'Structured data, authorship and update signals'] },
      { h2: 'Content built to answer and prove', paragraphs: ['Useful GEO content states the answer plainly, explains the reasoning and supports claims with evidence. We build service pages, comparisons, guides and case studies that work for customers as well as machine retrieval.'] },
      { h2: 'GEO works with SEO', paragraphs: ['AI visibility does not replace technical SEO, crawlability or independent authority. We treat GEO as part of the same discovery system, with clean indexing, strong topical coverage and consistent external references.'] },
    ],
    faqs: [
      { q: 'What is generative engine optimisation?', a: 'GEO is the work of making accurate information about a business easier for AI answer engines to retrieve, understand and cite.' },
      { q: 'Does an llms.txt file guarantee AI recommendations?', a: 'No. It can point crawlers toward useful resources, but recommendations depend more on clear content, evidence, authority and consistent third-party references.' },
      { q: 'Can you guarantee that ChatGPT will recommend my business?', a: 'No. We can improve the information and evidence available to answer engines, but no agency controls their recommendations.' },
    ],
  },
  'missed-call-recovery': {
    metaTitle: 'Missed Call Recovery for Small Business',
    metaDescription: 'Missed-call recovery systems for Australian service businesses, with immediate text-back, lead capture and clear follow-up workflows.',
    eyebrow: 'Missed-call recovery',
    h1: 'Turn missed calls into conversations.',
    lead: 'When your team cannot answer, a missed-call recovery system can respond quickly, capture the reason for the call and keep the lead from going cold.',
    sections: [
      { h2: 'Respond while intent is still high', paragraphs: ['A caller often contacts several businesses. An immediate, clearly identified text response lets them know the call was received and gives them a simple way to explain what they need.'], bullets: ['Automatic text-back after a missed call', 'Business-branded message and clear next step', 'Lead details routed to the right person', 'Optional booking or enquiry link'] },
      { h2: 'Fit the workflow to the business', paragraphs: ['We map opening hours, call routing, consent and handover rules before connecting the system. The response should help the customer without pretending a person answered.'] },
      { h2: 'Connect recovery to follow-up', paragraphs: ['Captured enquiries can enter a simple pipeline, trigger a task or receive an approved follow-up sequence so the team knows what still needs attention.'] },
    ],
    faqs: [
      { q: 'What does the customer receive?', a: 'They receive a short message identifying the business, acknowledging the missed call and asking how the team can help.' },
      { q: 'Can it work outside business hours?', a: 'Yes. Rules can be set for business hours, after-hours calls and different response paths.' },
      { q: 'Can it connect to a CRM?', a: 'Usually, yes. The available integration depends on the phone system and CRM already in use.' },
    ],
  },
  'ai-phone-agents': {
    metaTitle: 'AI Phone Agents for Australian Small Business',
    metaDescription: 'AI phone agents for Australian service businesses: answer routine calls, capture details, qualify enquiries and route complex conversations.',
    eyebrow: 'AI phone agents',
    h1: 'A realistic AI phone agent for routine enquiries.',
    lead: 'We design phone workflows that answer common questions, capture caller details and hand important conversations to the right person.',
    sections: [
      { h2: 'Start with a narrow, useful role', paragraphs: ['A reliable phone agent needs a defined job. We map the calls it should handle, the facts it may use, the questions it must ask and the situations that require a human handover.'], bullets: ['Inbound enquiry capture', 'Common service and availability questions', 'Lead qualification and structured notes', 'Booking or human transfer where supported'] },
      { h2: 'Natural voice needs accurate operations', paragraphs: ['Voice quality matters, but accuracy, latency and handover matter just as much. We test real call scenarios and keep the agent inside approved information rather than letting it improvise business policies.'] },
      { h2: 'Measured before it takes more calls', paragraphs: ['We begin with a controlled call set, review transcripts and outcomes, then expand only when the workflow is performing reliably.'] },
    ],
    faqs: [
      { q: 'Can an AI agent replace every receptionist call?', a: 'It is better suited to defined, repeatable calls. Sensitive, unusual or high-value conversations should have a clear human handover.' },
      { q: 'Can callers book appointments?', a: 'Yes, when the chosen phone platform can connect securely to the business’s booking calendar.' },
      { q: 'Will callers know they are speaking to AI?', a: 'The greeting and disclosure can be configured to identify the assistant clearly and set the right expectation.' },
    ],
  },
  'ai-chatbots': {
    metaTitle: 'AI Chatbots for Australian Small Business',
    metaDescription: 'AI website chatbots for Australian small businesses, trained on approved information to answer questions and capture qualified enquiries.',
    eyebrow: 'AI chatbots',
    h1: 'Website chat that answers questions and captures the lead.',
    lead: 'We build focused AI chat assistants around your approved services, policies and enquiry process, with a clear route to a person when needed.',
    sections: [
      { h2: 'Useful answers from approved information', paragraphs: ['The assistant uses a controlled business knowledge base instead of guessing. We organise services, common questions, locations and policies so responses stay relevant.'], bullets: ['Answers routine customer questions', 'Captures names, contact details and enquiry context', 'Routes leads to email, CRM or booking', 'Escalates requests outside its scope'] },
      { h2: 'Designed around the enquiry', paragraphs: ['The chat flow asks only what the team needs to respond well. It avoids long conversations when a call, quote request or booking is the better next step.'] },
      { h2: 'Reviewed after launch', paragraphs: ['Real conversations show which questions customers ask and where the knowledge needs improvement. We use those patterns to refine answers and conversion paths.'] },
    ],
    faqs: [
      { q: 'Can the chatbot use my existing website information?', a: 'Yes. We can prepare an approved knowledge base from accurate website content and information supplied by the business.' },
      { q: 'Can it collect customer details?', a: 'Yes. The assistant can collect agreed fields and pass them into an email, CRM or booking workflow.' },
      { q: 'Can it be added to an existing website?', a: 'In many cases, yes. The exact setup depends on the website platform and the chosen chat provider.' },
    ],
  },
  'lead-follow-up-automation': {
    metaTitle: 'Lead Follow-up Automation Australia',
    metaDescription: 'Automated lead follow-up for Australian service businesses, connecting forms, calls and bookings to timely, approved customer messages.',
    eyebrow: 'Lead follow-up automation',
    h1: 'Follow up every enquiry with a clear next step.',
    lead: 'We connect lead sources to timely acknowledgements, reminders and team tasks so fewer enquiries disappear between first contact and booking.',
    sections: [
      { h2: 'Join the gaps between your tools', paragraphs: ['A lead may arrive through a form, missed call, chat or ad. We map those sources, decide who owns the next action and connect the approved messages and reminders.'], bullets: ['Immediate enquiry acknowledgement', 'Booking links and reminder sequences', 'Pipeline stages and team notifications', 'Source tracking for forms and campaigns'] },
      { h2: 'Keep people in control', paragraphs: ['Automations handle predictable steps while staff keep control of quotes, exceptions and important conversations. Messages identify the business clearly and use the contact permissions available.'] },
      { h2: 'Improve from actual outcomes', paragraphs: ['We review response, booking and handover patterns so the workflow can be simplified rather than adding automation for its own sake.'] },
    ],
    faqs: [
      { q: 'Which lead sources can be connected?', a: 'Common sources include website forms, chat, missed calls, advertising lead forms and booking systems. Compatibility depends on the tools in use.' },
      { q: 'Can follow-up use SMS and email?', a: 'Yes, where the business has the appropriate contact details, consent and messaging provider.' },
      { q: 'Will customers receive too many messages?', a: 'We design short sequences with clear stopping rules when someone replies, books or asks not to be contacted.' },
    ],
  },
  'small-business-websites-gold-coast': {
    metaTitle: 'Small Business Websites Gold Coast | Affordable & Fast',
    metaDescription:
      'Affordable small business websites on the Gold Coast. Professional, mobile-first sites that build trust and bring in enquiries - no lock-in, you own everything.',
    eyebrow: 'Small Business Websites Gold Coast',
    h1: 'Small business websites on the Gold Coast.',
    lead:
      'Professional websites for Gold Coast trades, salons, cafes and service businesses - built to make you look established and turn visitors into enquiries.',
    sections: [
      {
        h2: 'Built for small businesses, not enterprises',
        paragraphs: [
          'You do not need a twenty page website or a marketing department. You need a site that loads fast, explains what you do, proves you are legitimate and makes it easy to get in touch.',
          'That is what we build, and we build it quickly so you are not waiting months to get online.',
        ],
        bullets: [
          'Live in one to two weeks',
          'Mobile-first, because that is where your customers are',
          'Google-ready from day one',
          'No lock-in contracts and you own everything',
        ],
      },
      {
        h2: 'Proof, not promises',
        paragraphs: [
          'We work with trades, mechanics, barbers, cafes and beauty businesses across Australia. Every site in our gallery is a real client site you can click through to and judge for yourself.',
        ],
      },
    ],
    faqs: [
      { q: 'What does a small business website cost?', a: 'Every project is custom-quoted. We offer Starter, Growth and Scale packages so you only pay for what you actually need - get in touch for a free quote.' },
      { q: 'How fast can I be online?', a: 'Most sites go live in one to two weeks once we have your content and photos.' },
      { q: 'What if I already have a website?', a: 'We can rebuild it or improve what you have. Either way you keep full ownership of your domain and content.' },
    ],
  },
  'website-design-perth': {
    metaTitle: 'Website Design Perth | Custom Websites for Local Business',
    metaDescription:
      'Custom website design in Perth for local businesses. High-converting, mobile-first sites built to rank on Google - no lock-in, you own everything. Get a free quote from Bluepeek.',
    eyebrow: 'Website Design Perth',
    h1: 'Website design in Perth, built to bring in customers.',
    lead:
      'We design custom websites for Perth businesses that look the part and actually generate enquiries - fast, mobile-first, and built to be found on Google.',
    sections: [
      {
        h2: 'Custom websites, not templates',
        paragraphs: [
          'A good website does more than look nice - it earns trust in the first few seconds and makes it easy for someone to call, book or enquire. We design every site from scratch around your business, your customers and the way people actually search in Perth.',
          'No drag-and-drop templates, no bloated page builders. Just a clean, fast site you own outright.',
        ],
        bullets: [
          'Designed around your brand and your customers',
          'Mobile-first - most local searches happen on a phone',
          'Fast loading, which Google rewards with better rankings',
          'Clear calls-to-action that turn visitors into enquiries',
        ],
      },
      {
        h2: 'Built to be found on Google',
        paragraphs: [
          'Every site we build comes with the SEO foundations done properly - clean structure, fast load times, mobile usability and local signals that help you show up when nearby customers search for what you do.',
          'We can also pair your new site with lead capture and AI automation so the enquiries that come in never slip through the cracks.',
        ],
      },
      {
        h2: 'Local, honest and easy to deal with',
        paragraphs: [
          'You deal with a real person who knows the Perth market - not an offshore team or an account manager. Most sites go live in one to two weeks, with no lock-in contracts and full ownership of your domain and content.',
        ],
      },
    ],
    faqs: [
      { q: 'How much does a website cost in Perth?', a: 'Every project is custom-quoted to fit your business and goals, so you only pay for what you need. We offer Starter, Growth and Scale packages - get in touch for a free, no-obligation quote.' },
      { q: 'How long does it take to build a website?', a: 'Most websites go live in one to two weeks once we have your content. We keep you in the loop the whole way with drafts and feedback.' },
      { q: 'Do I own my website?', a: 'Yes - 100%. You own your domain, your content and the site itself. There are no lock-in contracts and you can take it elsewhere any time.' },
      { q: 'Will my website work on mobile?', a: 'Always. Every site we build is mobile-first, because the majority of local searches in Perth happen on a phone.' },
    ],
  },

  'ai-automation-perth': {
    metaTitle: 'AI Automation Perth | Smart Lead & Enquiry Systems',
    metaDescription:
      'AI automation for Perth small businesses - 24/7 AI chat assistants, automatic lead follow-up and online booking that capture enquiries while you work. Free quote from Bluepeek.',
    eyebrow: 'AI Automation Perth',
    h1: 'AI automation that captures leads while you work.',
    lead:
      'We build practical AI and automation for Perth businesses - 24/7 chat assistants, automatic follow-ups and booking systems that make sure no enquiry ever goes cold.',
    sections: [
      {
        h2: 'A 24/7 assistant for your business',
        paragraphs: [
          'Most enquiries come in when you’re flat out on a job or after hours. An AI assistant on your website answers common questions, qualifies the enquiry and captures the lead instantly - so you wake up to real jobs, not missed calls.',
        ],
        bullets: [
          '24/7 AI chat assistant trained on your business',
          'Answers pricing, hours and “do you do X?” automatically',
          'Captures name and contact details every time',
          'Hands you a qualified lead, ready to call back',
        ],
      },
      {
        h2: 'Automatic follow-up that never forgets',
        paragraphs: [
          'Leads go cold fast. We set up automations that reply to enquiries instantly and follow up on your behalf - so the people who reach out actually become customers instead of slipping away to a competitor.',
        ],
      },
      {
        h2: 'Simple, not overwhelming',
        paragraphs: [
          'You don’t need to understand AI to benefit from it. We set it all up, plug it into your website, and keep it simple - you just get more enquiries landing in your inbox. It pairs perfectly with a new website or can be added to your existing one.',
        ],
      },
    ],
    faqs: [
      { q: 'What can an AI chatbot actually do for my business?', a: 'It answers customer questions 24/7, handles common enquiries like pricing and hours, and captures the lead’s details - so you never miss a potential customer, even after hours.' },
      { q: 'Do I need a new website to use AI automation?', a: 'No - we can add AI and automation to your existing website, or build it into a new one. Either way we handle the setup.' },
      { q: 'Is AI automation expensive?', a: 'It’s quoted to fit your business and is included in our Growth and Scale packages. For most local businesses, capturing a single extra job a month more than covers it.' },
    ],
  },

  'small-business-websites-perth': {
    metaTitle: 'Small Business Websites Perth | Affordable & Effective',
    metaDescription:
      'Affordable small business websites in Perth that look professional and bring in customers. Mobile-first, fast, no lock-in. Free quote from a local Perth web designer - Bluepeek.',
    eyebrow: 'Small Business Websites Perth',
    h1: 'Small business websites that punch above their weight.',
    lead:
      'You don’t need a big budget to look professional online. We build clean, effective websites for Perth small businesses that win trust and bring in enquiries.',
    sections: [
      {
        h2: 'Look as good as the big guys',
        paragraphs: [
          'Customers judge your business by your website in seconds. A modern, professional site instantly makes you look more trustworthy than competitors still running an outdated page - or no site at all.',
          'We give small Perth businesses a premium presence without the premium-agency runaround or price tag.',
        ],
        bullets: [
          'Professional design that builds instant trust',
          'Everything a customer needs: services, contact, location',
          'Click-to-call and enquiry forms built in',
          'Easy for you to understand and update',
        ],
      },
      {
        h2: 'Built for real local customers',
        paragraphs: [
          'We focus on the things that actually matter for a local business - showing up on Google, making it dead easy to get in touch, and turning visitors into phone calls and bookings.',
        ],
      },
      {
        h2: 'No lock-in, no jargon',
        paragraphs: [
          'You own everything, there are no lock-in contracts, and we explain things in plain English. Most sites go live in one to two weeks, and we’re here when you need a hand.',
        ],
      },
    ],
    faqs: [
      { q: 'I’m a sole trader - is a website worth it?', a: 'Absolutely. Even a simple, professional site means people can find you on Google, check you’re legit, and get in touch. It often pays for itself with a single extra job.' },
      { q: 'Can you build something simple to start?', a: 'Yes - our Starter package is a clean, professional site that covers the essentials. You can always grow it later with extra pages, AI or automation.' },
      { q: 'Do you work with businesses outside central Perth?', a: 'Yes - we work with businesses right across the Perth metro area and wider WA.' },
    ],
  },

  'lead-capture-websites': {
    metaTitle: 'Lead Capture Websites | Turn Visitors Into Enquiries',
    metaDescription:
      'Lead capture websites for Australian businesses - designed to convert visitors into real enquiries with smart forms, click-to-call, and AI follow-up. Free quote from Bluepeek.',
    eyebrow: 'Lead Capture Websites',
    h1: 'Websites designed to capture leads, not just look good.',
    lead:
      'A pretty website that doesn’t generate enquiries is just an expensive brochure. We build lead-capture websites for Australian businesses that turn visitors into real phone calls, forms and bookings.',
    sections: [
      {
        h2: 'Every page built to convert',
        paragraphs: [
          'We design with one goal in mind: making it effortless for a visitor to take the next step. Clear calls-to-action, click-to-call buttons, simple enquiry forms and trust signals all work together to turn interest into action.',
        ],
        bullets: [
          'Clear calls-to-action on every page',
          'Click-to-call and one-tap enquiry on mobile',
          'Short, friction-free contact forms',
          'Trust signals that reassure new customers',
        ],
      },
      {
        h2: 'Capture and follow up automatically',
        paragraphs: [
          'We can connect your forms and chat to automatic follow-up and an AI assistant, so every lead is captured and responded to instantly - even when you’re busy on a job or it’s the middle of the night.',
        ],
      },
      {
        h2: 'Know what’s working',
        paragraphs: [
          'Enquiries land straight in your inbox, so you always know where your leads are coming from and never miss one. Simple, reliable, and built around how local customers actually behave.',
        ],
      },
    ],
    faqs: [
      { q: 'What makes a website good at capturing leads?', a: 'Clear calls-to-action, easy contact options like click-to-call, short forms, and trust signals - all designed so taking the next step feels effortless for the visitor.' },
      { q: 'Where do my enquiries go?', a: 'Straight to your email inbox (and optionally your phone). We can also connect AI follow-up so leads get an instant reply.' },
      { q: 'Can you improve lead capture on my existing site?', a: 'Often, yes. We can review your current site and add the elements that turn more visitors into enquiries - or rebuild it if that makes more sense.' },
    ],
  },
}

// ─── INDUSTRY PAGE CONTENT ─────────────────────────────────────────
// Generated from a shared template with industry-specific detail.
const INDUSTRY_DETAIL = {
  'websites-for-mechanics': {
    metaTitle: 'Websites for Mechanics | Get More Bookings',
    metaDescription:
      'Websites for mechanics and auto workshops - built to bring in bookings with click-to-call, service info and online enquiries. Free quote from Bluepeek.',
    h1: 'Websites for mechanics that fill the workshop.',
    trade: 'mechanics and auto workshops',
    intro:
      'When someone’s car breaks down, they Google a local mechanic and call the first one that looks trustworthy. We build websites for local mechanics that show up, build trust fast, and make booking a service one tap away.',
    bullets: [
      'Click-to-call so customers can book on the spot',
      'Clear service list - logbook, brakes, diagnostics and more',
      'Reviews and trust signals front and centre',
      'Mobile-first for customers searching on the side of the road',
    ],
    example: 'superior-garage',
  },
  'websites-for-barbers': {
    metaTitle: 'Websites for Barbers | Fill Your Chairs',
    metaDescription:
      'Websites for barbershops - sleek, mobile-first sites with online booking, galleries and service menus that fill your chairs. Free quote from Bluepeek.',
    h1: 'Websites for barbers that keep the chairs full.',
    trade: 'barbershops',
    intro:
      'A barbershop lives and dies on bookings and reputation. We build sleek, modern websites for local barbers with easy online booking, a sharp gallery and a clear service menu - so new clients find you and book without the back-and-forth.',
    bullets: [
      'Online booking that works on any phone',
      'Photo gallery to show off your work',
      'Clear service menu and pricing',
      'Built to match your brand and stand out',
    ],
    example: '54-fadez',
  },
  'websites-for-painters': {
    metaTitle: 'Websites for Painters | More Quote Requests',
    metaDescription:
      'Websites for painters - built to win quote requests with project galleries, clear services and easy enquiry forms. Free quote from Bluepeek.',
    h1: 'Websites for painters that win more quotes.',
    trade: 'painters and decorators',
    intro:
      'Your work speaks for itself - your website just needs to show it off and make requesting a quote easy. We build websites for local painters with before-and-after galleries, clear services and simple enquiry forms that turn browsers into quote requests.',
    bullets: [
      'Project galleries that showcase your finish',
      'Easy “request a quote” forms',
      'Clear list of residential and commercial services',
      'Mobile-first so customers can enquire on the go',
    ],
  },
  'websites-for-tradies': {
    metaTitle: 'Websites for Tradies | Get Found, Get Calls',
    metaDescription:
      'Websites for tradies - plumbers, electricians, builders and more. Built to get you found on Google and bring in calls. No lock-in. Free quote from Bluepeek.',
    h1: 'Websites for tradies that get the phone ringing.',
    trade: 'tradies',
    intro:
      'You’re flat out on the tools - the last thing you’ve got time for is chasing work. We build no-nonsense websites for local tradies that get you found on Google, make you look professional, and turn searches into phone calls.',
    bullets: [
      'Click-to-call front and centre',
      'Shows your services, areas and qualifications',
      'Built to rank for local searches in your suburbs',
      'Optional AI assistant to handle enquiries after hours',
    ],
  },
  'websites-for-cafes': {
    metaTitle: 'Websites for Cafes | Menus, Bookings & More',
    metaDescription:
      'Websites for cafes - clean, mobile-first sites with menus, opening hours, location and bookings that bring in more customers. Free quote from Bluepeek.',
    h1: 'Websites for cafes that bring in the crowd.',
    trade: 'cafes and eateries',
    intro:
      'People check your menu, hours and vibe online before they walk in. We build beautiful, mobile-first websites for local cafes with menus, opening hours, location and bookings - so you turn “maybe” into walk-ins and regulars.',
    bullets: [
      'Mouth-watering menu and gallery',
      'Opening hours and location front and centre',
      'Table bookings or order links',
      'Instagram-ready and mobile-first',
    ],
  },
  'websites-for-beauty-salons': {
    metaTitle: 'Websites for Beauty Salons | More Bookings',
    metaDescription:
      'Websites for beauty salons - elegant, mobile-first sites with online booking, treatment menus and galleries that fill your calendar. Free quote from Bluepeek.',
    h1: 'Websites for beauty salons that fill the calendar.',
    trade: 'beauty salons',
    intro:
      'Your clients book online, on their phone, often after hours. We build elegant websites for beauty salons with seamless online booking, treatment menus and galleries - so new clients can find you and book in seconds.',
    bullets: [
      'Online booking that works around the clock',
      'Treatment menu and pricing made clear',
      'Gallery to showcase your work',
      'Elegant design that matches your brand',
    ],
  },
  'websites-for-panel-beaters': {
    metaTitle: 'Websites for Panel Beaters | More Repair Enquiries',
    metaDescription: 'Websites for panel beaters and automotive repair shops, with damage enquiry forms, service pages, workshop details and local SEO foundations.',
    h1: 'Websites for panel beaters that turn damage searches into enquiries.',
    trade: 'panel beaters and automotive repair shops',
    intro: 'Customers often search immediately after an accident or when damage becomes urgent. We build clear automotive websites that explain the repair process, establish trust and make it simple to send vehicle and damage details.',
    bullets: ['Repair enquiry paths designed for mobile', 'Clear workshop location and directions', 'Editable service pages for confirmed repairs', 'Optional photo upload and automated follow-up'],
  },
  'websites-for-builders': {
    metaTitle: 'Websites for Builders | Projects, Trust & Enquiries',
    metaDescription: 'Websites for builders and construction businesses, with project case studies, service areas, qualification details and quote enquiries.',
    h1: 'Websites for builders that make the quality of the work clear.',
    trade: 'builders and construction businesses',
    intro: 'A building client needs confidence before making contact. We create project-led websites that explain your scope, show completed work and give qualified prospects a clear way to discuss their project.',
    bullets: ['Project case studies with real scope and imagery', 'Service area and project type pages', 'Licensing and qualification details supplied by you', 'Structured quote and consultation enquiries'],
  },
  'websites-for-electricians': {
    metaTitle: 'Websites for Electricians | More Local Calls',
    metaDescription: 'Websites for electricians, with local service pages, click-to-call actions, emergency information and quote enquiry workflows.',
    h1: 'Websites for electricians built around local service calls.',
    trade: 'electricians',
    intro: 'Electrical customers need to know whether you cover their area, handle their problem and can respond in time. We structure the website around those questions and make calling or requesting a quote simple.',
    bullets: ['Clear residential and commercial services', 'Service areas and availability information', 'One-tap calling on mobile', 'Quote forms that capture the job context'],
  },
  'websites-for-plumbers': {
    metaTitle: 'Websites for Plumbers | Local Leads & Emergency Calls',
    metaDescription: 'Websites for plumbers, built for mobile search with clear services, service areas, click-to-call actions and lead capture.',
    h1: 'Websites for plumbers that make the next call easy.',
    trade: 'plumbers',
    intro: 'When a customer has a leak or blocked drain, they want a fast, credible answer. We build mobile-first plumbing websites that separate urgent work from planned services and route each enquiry clearly.',
    bullets: ['Prominent phone and emergency contact paths', 'Pages for high-intent plumbing services', 'Local service area information', 'Missed-call and enquiry follow-up options'],
  },
  'websites-for-clinics': {
    metaTitle: 'Websites for Clinics | Clear Services & Bookings',
    metaDescription: 'Websites for Australian clinics and allied health practices, with clear practitioner information, services, booking paths and accessible design.',
    h1: 'Websites for clinics that help patients make an informed next step.',
    trade: 'clinics and allied health practices',
    intro: 'A clinic website needs calm, accurate information and an obvious booking path. We organise services, practitioner details, locations and common questions so prospective patients can decide what to do next.',
    bullets: ['Accessible, mobile-first information design', 'Practitioner and service information supplied by the clinic', 'Online booking or enquiry integration', 'Clear privacy and contact information'],
  },
  'websites-for-restaurants': {
    metaTitle: 'Websites for Restaurants | Menus, Bookings & Local Search',
    metaDescription: 'Websites for restaurants, with mobile menus, bookings, location details, opening hours and local search foundations.',
    h1: 'Restaurant websites that answer the questions diners ask first.',
    trade: 'restaurants and hospitality businesses',
    intro: 'Diners want to see the menu, location, hours and booking options without hunting through social profiles. We put those details first and present the venue with a clear, mobile-friendly experience.',
    bullets: ['Readable mobile menus', 'Reservations, calls and directions', 'Accurate opening and service information', 'Venue imagery and local search foundations'],
  },
}

export function industryContent(slug) {
  const d = INDUSTRY_DETAIL[slug]
  if (!d) return null
  return {
    metaTitle: d.metaTitle,
    metaDescription: d.metaDescription,
    eyebrow: 'Industry',
    h1: d.h1,
    lead: d.intro,
    sections: [
      {
        h2: `What ${d.trade} need from a website`,
        paragraphs: [d.intro],
        bullets: d.bullets,
      },
      {
        h2: 'Get found by local customers',
        paragraphs: [
          `We build every site with proper SEO foundations so you show up when local customers search. Pair it with our AI automation and lead capture and you’ll turn more of those searches into real bookings and calls.`,
        ],
      },
      {
        h2: 'Local, fast and no lock-in',
        paragraphs: [
          `We’re based on the Gold Coast and work with businesses across Australia. You deal directly with the people building the site, most straightforward projects go live in one to two weeks once content is ready, and you own everything.`,
        ],
      },
    ],
    faqs: [
      { q: `Do you build websites specifically for ${d.trade}?`, a: `Yes - we tailor every site to the way ${d.trade} actually win customers, from the layout to the calls-to-action and booking or enquiry flow.` },
      { q: 'How much will it cost?', a: 'Every project is custom-quoted to fit your business. Get in touch for a free, no-obligation quote - no pressure.' },
      { q: 'How long until it’s live?', a: 'Most websites go live within one to two weeks once we have your details and content.' },
      { q: 'Do I own the website?', a: 'Yes - you own your domain, content and site outright, with no lock-in contracts.' },
    ],
    example: d.example,
  }
}

// ─── CASE STUDY CONTENT (factual - no invented metrics) ────────────
export const CASE_CONTENT = {
  'jasmine-health-and-spa': {
    metaTitle: 'Jasmine Health & Spa - Website Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a calm, premium website for Jasmine Health & Spa, an authentic Thai wellness and massage spa in Ascot, Perth. See the live site.',
    brief:
      'Jasmine Health & Spa offers authentic Thai massage and wellness therapies in Ascot, minutes from Perth Airport. They needed a website that felt as calm and premium as the experience, and made it effortless to browse treatments and book.',
    built:
      'We built a serene, mobile-first site that showcases their treatments and turns visitors into bookings.',
    features: [
      'Calm, premium design that reflects the spa experience',
      'Full treatment menu with couples and gift options',
      'Gift vouchers and clear pricing',
      'Easy online booking and click-to-call',
    ],
  },
  'bluestar-mechanics': {
    metaTitle: 'Bluestar Mechanics - Website Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a trust-focused website for Bluestar Mechanics, a family-owned all-makes-and-models mechanic in Coburg, VIC. See the live site.',
    brief:
      'Bluestar Mechanics is a family-owned workshop in Coburg with over 15 years experience servicing all makes and models. They needed a site that conveyed their honest, local reputation and made it easy to book a service or roadworthy.',
    built:
      'We built a clean, mobile-first site centred on trust and quick enquiries.',
    features: [
      'All makes and models servicing made clear',
      'Roadworthy certificates, logbook servicing and diagnostics',
      'Trust signals and 15+ years experience front and centre',
      'Prominent click-to-call and easy enquiry',
    ],
  },
  'superior-garage': {
    metaTitle: 'Superior Garage - Website Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a clean, booking-focused website for Superior Garage, a mechanical workshop in Malaga, Perth. See the live site.',
    brief:
      'Superior Garage is a locally owned mechanical workshop in Malaga that prides itself on honest, transparent service. They needed a website that matched that reputation and made it easy for local drivers to book a service.',
    built:
      'We built a clean, mobile-first site focused on one thing: turning local searches into bookings.',
    features: [
      'Online booking and prominent click-to-call',
      'Clear, transparent service and pricing info',
      '7-day availability made obvious',
      'Mobile-first design for on-the-go customers',
    ],
  },
  '54-fadez': {
    metaTitle: '54 Fadez - Barbershop Website Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a modern booking website for 54 Fadez, a Perth barbershop - online bookings, gallery and service menu. See the live site.',
    brief:
      '54 Fadez is a Perth barbershop building a strong local brand. They wanted a sleek website that let new clients discover their work and book a chair without the back-and-forth.',
    built:
      'We designed a bold, modern site built around bookings and brand.',
    features: [
      'Easy online booking on any device',
      'Gallery to showcase cuts and style',
      'Clear service menu',
      'Brand-led design that stands out',
    ],
  },
  'airborne-suspension-mechanical': {
    metaTitle: 'Airborne Suspension & Mechanical - Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a premium website for Airborne Suspension & Mechanical, a 4WD and suspension specialist in Malaga, Perth. See the live site.',
    brief:
      'Airborne Suspension & Mechanical is a 4WD and suspension specialist in Malaga with deep expertise and a loyal following. They needed a website that reflected the quality of their builds and made it easy to enquire.',
    built:
      'We created a premium site that showcases their expertise and builds trust quickly.',
    features: [
      'Showcases suspension and 4WD specialist services',
      'Highlights experience and quality of work',
      'Clear enquiry and contact options',
      'Mobile-first, fast-loading design',
    ],
  },
  'adizahaircollections': {
    metaTitle: 'Adiza Hair Collections - Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a luxury braiding and wig services website for Adiza Hair Collections in Wagga Wagga, NSW. See the live site.',
    brief:
      'Adiza Hair Collections is a professional braiding and wig business in Wagga Wagga, NSW, specialising in neat, long-lasting braided styles. They needed an elegant site that reflected the quality of their work and made booking simple.',
    built:
      'We built a refined, mobile-first site with a full service menu, a gallery of real client work and clear booking options.',
    features: [
      'Elegant, brand-led luxury design',
      'Full braiding & wig service menu with pricing',
      'Gallery showcasing real client work',
      'Simple booking via call, email or social',
    ],
  },
  'ae-ac-service-center': {
    metaTitle: 'AE & AC Service Center - Case Study | Bluepeek',
    metaDescription:
      'How Bluepeek built a trust-focused website for AE & AC Service Center, an auto electrical and air-con specialist in Malaga, Perth. See the live site.',
    brief:
      'AE & AC Service Center is an auto electrical and air-conditioning specialist in Malaga known for workshop-grade diagnostics. They needed a site that explained their services clearly and earned trust online.',
    built:
      'We built a clear, professional site centred on their diagnostic expertise.',
    features: [
      'Clear breakdown of electrical and air-con services',
      'Trust signals front and centre',
      'Easy contact and enquiry',
      'Clean, mobile-first layout',
    ],
  },
}

// "Explore more" links for the legacy service + website-industry pages. They
// point into the growth system so older pages pass relevance to the money pages.
const LEGACY_RELATED = {
  'website-design':                     ['website-design-gold-coast', 'google-ads-management', 'google-reviews', 'local-seo'],
  'local-seo':                          ['google-business-profile-management', 'google-reviews', 'google-ads-gold-coast', 'geo-optimisation'],
  'geo-optimisation':                   ['local-seo', 'google-business-profile-management', 'website-design-gold-coast'],
  'missed-call-recovery':               ['ai-automation-gold-coast', 'lead-follow-up-automation', 'google-ads-gold-coast', 'tradies'],
  'ai-phone-agents':                    ['ai-automation-australia', 'missed-call-recovery', 'ai-chatbots', 'google-ads-management'],
  'ai-chatbots':                        ['ai-automation-australia', 'lead-follow-up-automation', 'website-design-gold-coast'],
  'lead-follow-up-automation':          ['ai-automation-gold-coast', 'google-reviews', 'google-ads-gold-coast', 'meta-ads-gold-coast'],
  'small-business-websites-gold-coast': ['website-design-gold-coast', 'google-business-profile-management', 'google-reviews', 'google-ads-gold-coast'],
  'website-design-perth':               ['website-design', 'google-ads-management', 'google-reviews', 'ai-automation-australia'],
  'ai-automation-perth':                ['ai-automation-australia', 'lead-follow-up-automation', 'google-reviews'],
  'small-business-websites-perth':      ['website-design', 'google-ads-management', 'google-review-cards'],
  'lead-capture-websites':              ['website-design-gold-coast', 'google-ads-gold-coast', 'meta-ads-gold-coast', 'lead-follow-up-automation'],
}

// Website-industry pages link up to the matching growth hub where one exists.
const INDUSTRY_HUB_FOR = {
  'websites-for-mechanics': 'mechanics',
  'websites-for-tradies': 'tradies',
  'websites-for-builders': 'tradies',
  'websites-for-electricians': 'tradies',
  'websites-for-plumbers': 'tradies',
  'websites-for-painters': 'tradies',
}

export function relatedLinks({ excludeService, excludeIndustry } = {}) {
  if (excludeService) {
    const slugs = LEGACY_RELATED[excludeService] || ['google-ads-gold-coast', 'google-reviews', 'website-design-gold-coast']
    return slugs.map(linkFor).filter(Boolean).map(({ href, label }) => ({ href, label }))
  }
  const hub = INDUSTRY_HUB_FOR[excludeIndustry]
  const slugs = [...(hub ? [hub] : []), 'google-ads-management', 'google-reviews', 'google-business-profile-management']
  const links = slugs.map(linkFor).filter(Boolean).map(({ href, label }) => ({ href, label }))
  INDUSTRIES.filter(i => i.slug !== excludeIndustry).slice(0, 2).forEach(i =>
    links.push({ label: i.title, href: u.industry(i.slug) }))
  return links
}
