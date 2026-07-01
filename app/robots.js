import { SITE } from '../lib/site'

// Explicitly welcome search AND answer-engine crawlers so Bluepeek can be
// indexed, cited and summarised by ChatGPT, Perplexity, Google AI, Claude, etc.
const AI_BOTS = [
  'GPTBot',            // OpenAI training/index
  'OAI-SearchBot',     // ChatGPT search
  'ChatGPT-User',      // ChatGPT live browsing
  'PerplexityBot',     // Perplexity index
  'Perplexity-User',   // Perplexity live fetch
  'ClaudeBot',         // Anthropic
  'Claude-Web',
  'Google-Extended',   // Google Gemini / AI Overviews
  'Applebot-Extended', // Apple Intelligence
  'CCBot',             // Common Crawl (feeds many models)
  'Bytespider',
]

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map(userAgent => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
