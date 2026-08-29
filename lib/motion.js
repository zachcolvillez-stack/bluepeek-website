// Shared motion vocabulary. Components import from here — never define their own
// durations, easings or offsets. Three primitives: reveal (enter), stage
// (scroll-linked, composed per-component with useScroll), hover (interactive lift).

export const EASE = [0.22, 1, 0.36, 1]

/** Fade + rise on enter. Fires once when 25% of the element is visible. */
export const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, delay, ease: EASE },
})

/** Directional variant for side-entering elements. */
export const revealFrom = (direction = 'up', delay = 0) => {
  const offset = {
    up:    { y: 16,  x: 0 },
    down:  { y: -16, x: 0 },
    left:  { x: -24, y: 0 },
    right: { x: 24,  y: 0 },
  }[direction]
  return {
    initial: { opacity: 0, ...offset },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.6, delay, ease: EASE },
  }
}

/** Parent wrapper that staggers its motion children. */
export const stagger = (gap = 0.08) => ({
  initial: 'hidden',
  whileInView: 'show',
  viewport: { once: true, amount: 0.2 },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  },
})

/** Child variant to pair with stagger(). */
export const staggerChild = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

/** Interactive lift for cards and links. */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.25, ease: EASE } },
  whileTap: { y: -1 },
}
