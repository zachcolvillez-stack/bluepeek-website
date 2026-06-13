import { ImageResponse } from 'next/og'

export const alt = 'Bluepeek — Perth Website Design & AI Automation'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Branded link-preview image rendered to match the dark homepage.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '84px',
          background: 'linear-gradient(135deg, #080b14 0%, #0d1426 55%, #0a0e1a 100%)',
        }}
      >
        {/* city-light glow */}
        <div
          style={{
            position: 'absolute',
            top: -180,
            right: -120,
            width: 640,
            height: 640,
            display: 'flex',
            background: 'radial-gradient(circle, rgba(111,168,245,0.28) 0%, transparent 60%)',
          }}
        />

        {/* brand row */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 22,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #4f86f7, #6f6ff5 55%, #9b6bf2)',
            }}
          >
            <svg width="46" height="46" viewBox="0 0 100 100" fill="none">
              <g stroke="#ffffff" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" fill="none">
                <path d="M50 26 L72 38 L72 62 L50 74 L28 62 L28 38 Z" />
                <path d="M50 26 L50 50 M50 50 L72 38 M50 50 L28 38" />
              </g>
            </svg>
          </div>
          <div style={{ fontSize: 44, fontWeight: 700, color: '#ffffff', marginLeft: 24 }}>bluepeek</div>
        </div>

        {/* headline */}
        <div
          style={{
            display: 'flex',
            fontSize: 66,
            fontWeight: 800,
            color: '#f4f7fd',
            lineHeight: 1.1,
            marginTop: 56,
            maxWidth: 940,
          }}
        >
          Websites that make local businesses look established.
        </div>

        {/* tagline */}
        <div style={{ display: 'flex', fontSize: 30, color: '#9fb6ff', marginTop: 32 }}>
          Perth Web Design & AI Automation · Built to bring you leads
        </div>
      </div>
    ),
    { ...size },
  )
}
