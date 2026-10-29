import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'

const source = readFileSync(new URL('../components/bottom/Closing.jsx', import.meta.url), 'utf8')
const effect = source.match(/useEffect\(\(\) => \{([\s\S]*?)\n  \}, \[\]\)/)?.[1]
assert.ok(effect, 'Closing useEffect is available for behavioral testing')

function mount({ reduced = false, pinned = false } = {}) {
  const events = () => {
    const listeners = new Map()
    return {
      listeners,
      addEventListener: (name, handler) => listeners.set(name, handler),
      removeEventListener: (name, handler) => { if (listeners.get(name) === handler) listeners.delete(name) },
      emit: name => listeners.get(name)?.(),
    }
  }
  const windowEvents = events()
  const reduce = { ...events(), matches: reduced }
  const pin = { ...events(), matches: pinned }
  const frames = new Map()
  const properties = new Map()
  let nextFrame = 0
  let reads = 0
  let observed = null
  let observerCallback
  let disconnected = false
  const scene = { current: { offsetHeight: 1800, getBoundingClientRect: () => { reads++; return { top: 200 } } } }
  const planet = { current: {
    getBoundingClientRect: () => { reads++; return { top: 500, height: 300 } },
    style: { setProperty: (key, value) => properties.set(key, value) },
  } }
  const context = vm.createContext({
    scene, planet, PINNED: 'pinned',
    window: { ...windowEvents, innerHeight: 900, matchMedia: query => query === 'pinned' ? pin : reduce },
    requestAnimationFrame: callback => { frames.set(++nextFrame, callback); return nextFrame },
    cancelAnimationFrame: id => frames.delete(id),
    IntersectionObserver: class {
      constructor(callback, options) { observerCallback = callback; assert.equal(options.rootMargin, '200px') }
      observe(element) { observed = element }
      disconnect() { disconnected = true }
    },
  })
  const cleanup = vm.runInContext(`(() => {${effect}\n})()`, context)
  assert.equal(observed, scene.current)
  return {
    frames, properties, reduce, pin, windowEvents, cleanup,
    get reads() { return reads }, get disconnected() { return disconnected },
    visible: value => observerCallback([{ isIntersecting: value }]),
    flush: () => { const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(callback => callback()) },
  }
}

test('offscreen scrolling adds no animation frames or geometry reads', () => {
  const m = mount()
  const initialReads = m.reads
  m.visible(false)
  m.windowEvents.emit('scroll')
  m.windowEvents.emit('resize')
  assert.equal(m.frames.size, 0)
  assert.equal(m.reads, initialReads)
  m.cleanup()
})

test('visible scroll updates coalesce into one geometry read per animation frame', () => {
  for (const pinned of [false, true]) {
    const m = mount({ pinned })
    const initialReads = m.reads
    m.visible(true)
    m.windowEvents.emit('scroll')
    m.windowEvents.emit('scroll')
    assert.equal(m.frames.size, 1)
    assert.equal(m.reads, initialReads)
    m.flush()
    assert.equal(m.reads, initialReads + 1)
    assert.ok(Number(m.properties.get('--p')) > 0)
    m.windowEvents.emit('scroll')
    assert.equal(m.frames.size, 1)
    m.flush()
    assert.equal(m.reads, initialReads + 2)
    m.cleanup()
  }
})

test('reduced motion sets the final state without measuring layout', () => {
  const m = mount({ reduced: true })
  assert.equal(m.properties.get('--p'), '1')
  assert.equal(m.reads, 0)
  m.visible(true)
  m.reduce.emit('change')
  m.flush()
  assert.equal(m.properties.get('--p'), '1')
  assert.equal(m.reads, 0)
  m.cleanup()
})

test('unmount disconnects the observer, removes all listeners and cancels pending work', () => {
  const m = mount()
  m.visible(true)
  assert.equal(m.frames.size, 1)
  const reads = m.reads
  m.cleanup()
  assert.equal(m.disconnected, true)
  assert.equal(m.frames.size, 0)
  for (const target of [m.windowEvents, m.reduce, m.pin]) assert.equal(target.listeners.size, 0)
  m.windowEvents.emit('scroll')
  m.flush()
  assert.equal(m.reads, reads)
})
