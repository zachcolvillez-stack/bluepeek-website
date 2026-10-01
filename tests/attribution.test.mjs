import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
const code = readFileSync(new URL('../lib/attribution.js', import.meta.url), 'utf8').replaceAll('export function ', 'function ')
function browser(path = '/seo-gold-coast', search = '', referrer = 'https://www.google.com/') {
  const storage = () => {const values = new Map(); return {getItem:k=>values.get(k),setItem:(k,v)=>values.set(k,v)}}
  const context = vm.createContext({URL,URLSearchParams,Date,window:{location:{pathname:path,hostname:'www.bluepeek.com.au',search},localStorage:storage(),sessionStorage:storage()},document:{referrer}})
  vm.runInContext(code, context)
  return {context, get:()=>JSON.parse(vm.runInContext('JSON.stringify(attributionFields())',context)), analytics:()=>JSON.parse(vm.runInContext('JSON.stringify(analyticsAttribution())',context))}
}
test('organic entry survives navigation to the quote page',()=>{
 const b=browser();assert.equal(b.get().session_source,'organic_search');
 b.context.window.location.pathname='/free-quote';b.context.document.referrer='https://www.bluepeek.com.au/seo-gold-coast';
 assert.equal(b.get().landing_page,'/seo-gold-coast');assert.equal(b.get().conversion_page,'/free-quote');assert.equal(b.get().referrer,'www.google.com');
});
test('campaign clicks persist for CRM while analytics receives only visit context',()=>{
 const b=browser('/website-design-gold-coast','?utm_source=google&utm_campaign=websites&gclid=click123');b.get();
 b.context.window.location.pathname='/free-quote';b.context.window.location.search='';
 assert.equal(b.get().gclid,'click123');assert.equal(b.get().campaign_landing_page,'/website-design-gold-coast');assert.equal(b.analytics().gclid,undefined);assert.equal(b.analytics().landing_page,'/website-design-gold-coast');
});
test('expired visits and campaigns do not contaminate a fresh direct enquiry',()=>{
 const b=browser('/seo-gold-coast','','');
 b.context.window.sessionStorage.setItem('bp_visit',JSON.stringify({landing_page:'/old',last_seen:Date.now()-31*60*1000}));
 b.context.window.localStorage.setItem('bp_attr',JSON.stringify({gclid:'old',ts:Date.now()-91*86400000}));
 const data=b.get();assert.equal(data.landing_page,'/seo-gold-coast');assert.equal(data.session_source,'direct');assert.equal(data.gclid,undefined);
});
test('storage restrictions still preserve entry during client navigation',()=>{
 const b=browser();Object.defineProperty(b.context.window,'sessionStorage',{get(){throw new Error('denied')}});Object.defineProperty(b.context.window,'localStorage',{get(){throw new Error('denied')}});
 b.get();b.context.window.location.pathname='/free-quote';assert.equal(b.get().landing_page,'/seo-gold-coast');
});
test('a new tagged campaign replaces the previous campaign within a visit',()=>{
 const b=browser('/seo-gold-coast','?gclid=first');b.get();b.context.window.location.pathname='/website-design-gold-coast';b.context.window.location.search='?gclid=second';
 assert.equal(b.get().landing_page,'/website-design-gold-coast');assert.equal(b.get().gclid,'second');
});
