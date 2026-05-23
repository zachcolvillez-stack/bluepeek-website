'use client'

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ background: '#0a0a0c' }}>
      {/* Static grid texture — pure CSS, no JS, no blur */}
      <div className="absolute inset-0 grid-bg opacity-60" />
    </div>
  )
}
