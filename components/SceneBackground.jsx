'use client'

/**
 * Page background. Deliberately plain: a flat white field.
 * The ambient blue/navy radial washes were removed - they read as decoration
 * rather than structure, and put two gradients above the fold. See bar.md.
 */
export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#ffffff' }} />
  )
}
