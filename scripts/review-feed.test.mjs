import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseReviewFeed } from '../lib/review-feed.js'
const valid = { ok: true, ratingValue: 5, reviewCount: 131, mapsUrl: 'https://www.google.com/maps/place/?q=place_id:ChIJQWOVmcSvMioRkZfBFkPuivM', reviews: [{ author: 'Public reviewer', text: 'Helpful work', rating: 5 }], checkedAt: '2026-11-08T04:00:00Z' }
test('new authoritative totals and review text replace a dated fallback together', () => { const feed = parseReviewFeed(valid); assert.equal(feed.reviewCount, 131); assert.equal(feed.ratingValue, '5.0'); assert.equal(feed.reviews[0].text, 'Helpful work') })
test('failure and malformed aggregates cannot reset verified proof', () => { for (const value of [{ok:false}, {...valid,reviewCount:-1}, {...valid,reviewCount:'131'}, {...valid,ratingValue:8}, {...valid,ratingValue:undefined}]) assert.equal(parseReviewFeed(value),null) })
test('a valid empty profile is distinct from an unavailable feed', () => { assert.equal(parseReviewFeed({...valid,reviewCount:0,ratingValue:null,reviews:[]}).reviewCount,0) })
test('untrusted links and malformed quotes are not rendered', () => { const feed=parseReviewFeed({...valid,mapsUrl:'https://example.com/maps/',reviews:[{author:'Bad',text:'invalid',rating:8}]});assert.equal(feed.mapsUrl,null);assert.deepEqual(feed.reviews,[]) })
