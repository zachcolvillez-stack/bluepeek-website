import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(new URL('../components/DescentFilm.jsx', import.meta.url), 'utf8')
const scrollCode = source.slice(source.indexOf('    const playableUntil ='), source.indexOf('    const copyEls ='))
// Run the real tick through scroll sampling and easing; visual rendering follows this boundary.
const tickCode = source.slice(source.indexOf('    const tick = (now) => {'), source.indexOf('      if (current !== prev || dirty)')) + '\n    }'
const loadCode = source.slice(source.indexOf('    const loadTrack = async'), source.indexOf('    let pct ='))
const measureCode = source.slice(source.indexOf('    const measure = () => {'), source.indexOf('    measure()'))

function engine() {
  let reads = 0, toggles = 0, now = 0, top = 0
  const listeners = new Map()
  const context = vm.createContext({
    Math, performance: { now: () => now },
    document: { documentElement: { toggleAttribute: () => toggles++, setAttribute() {}, removeAttribute() {} } },
    section: { getBoundingClientRect: () => { reads++; return { top, height: 3000, bottom: top + 3000 } } },
    window: { innerHeight: 1000, scrollY: 0, scrollTo() {},
      addEventListener: (name, handler) => listeners.set(name, handler),
      removeEventListener: (name, handler) => { if (listeners.get(name) === handler) listeners.delete(name) } },
    stage: { clientWidth: 1000, clientHeight: 1000 }, frame: { style: {} }, camera: { style: {} },
  })
  vm.runInContext(`
    let dirty = true, scrollDirty = true, target = 0, current = 0, last = 0;
    let wallSpent = false;
    const reduce = false, FILM_END = 0.8;
    const held = () => false;
    const preview = { ready: true };
    const segs = [{ ready: true, start: 0, frames: 11 }];
    const film = { timeMap: Array.from({ length: 11 }, (_, i) => i / 10) };
    let vw = 0, vh = 0, coverScale = 1, offX = 0, offY = 0, scr;
    const FW = 1000, SRC_H = 1000, SCREEN_W = 1000, SCREEN_H = 1000;
    const quad = [[0,0], [1000,0], [1000,1000], [0,1000]];
    const blobUrl = async () => 'blob:test';
    const firstInput = Promise.resolve(), objectUrls = [];
    const cancelled = false;
    const attach = async () => {};
    ${loadCode}
    ${measureCode}
    ${scrollCode}
    ${tickCode}
  `, context)
  return {
    run: code => vm.runInContext(code, context),
    tick: time => { now = time; vm.runInContext(`tick(${time}); dirty = false`, context) },
    scroll: value => { top = value; listeners.get('scroll')?.() },
    get reads() { return reads }, get toggles() { return toggles }, get listeners() { return listeners },
  }
}

test('idle film frames stop reading geometry and toggling the root attribute', () => {
  const e = engine()
  e.tick(16)
  for (let time = 32; time <= 1600; time += 16) e.tick(time)
  assert.equal(e.reads, 1)
  assert.equal(e.toggles, 1)
})

test('scroll samples once while easing continues on subsequent frames', async () => {
  const e = engine()
  e.tick(16)
  e.scroll(-500)
  e.tick(32)
  const first = e.run('current')
  e.tick(48)
  assert.ok(e.run('current') > first)
  assert.ok(e.run('current') < e.run('target'))
  assert.equal(e.reads, 2)
  e.run('measure()')
  e.tick(64)
  assert.equal(e.reads, 3, 'resize measurement invalidates scroll geometry')
  await e.run("loadTrack({ url: '/film/test.mp4', video: {}, ready: false })")
  e.tick(80)
  assert.equal(e.reads, 4, 'loaded tracks refresh the playable limit')
})

test('active soft wall keeps sampling and retains its 1500ms escape', () => {
  const e = engine()
  e.run('preview.ready = false; segs[0].frames = 6')
  e.scroll(-1000) // target .5, playable limit .4
  e.tick(16)
  assert.equal(e.run('walled'), true)
  e.tick(32)
  assert.equal(e.reads, 2, 'wall samples without another scroll event')
  e.tick(1536)
  assert.equal(e.run('walled'), false)
  assert.equal(e.run('wallSpent'), true)
  e.tick(1552)
  assert.equal(e.reads, 3, 'sampling stops after wall timeout')
})

test('effect cleanup removes its scroll invalidation listener', () => {
  const e = engine()
  const cleanupLine = source.match(/      window\.removeEventListener\('scroll', onScroll\)/)?.[0]
  assert.ok(cleanupLine)
  e.run(cleanupLine)
  assert.equal(e.listeners.size, 0)
})
