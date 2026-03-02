import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 55%, #7c3aed 100%)',
          borderRadius: '40px',
        }}
      >
        {/* Scales of justice — viewBox 48x48 rendered at 130x130 */}
        <svg width="130" height="130" viewBox="0 0 48 48" fill="none">
          {/* Base */}
          <line x1="16" y1="39" x2="32" y2="39" stroke="white" stroke-width="2" stroke-linecap="round"/>
          {/* Post */}
          <line x1="24" y1="38" x2="24" y2="13" stroke="white" stroke-width="2" stroke-linecap="round"/>
          {/* Beam */}
          <line x1="8"  y1="13" x2="40" y2="13" stroke="white" stroke-width="2" stroke-linecap="round"/>
          {/* Pivot */}
          <circle cx="24" cy="13" r="2.2" fill="white"/>
          {/* Left strings */}
          <line x1="8" y1="13" x2="5"  y2="27" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="8" y1="13" x2="11" y2="27" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
          {/* Left pan */}
          <path d="M5 27 Q8 31.5 11 27" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>
          {/* Right strings */}
          <line x1="40" y1="13" x2="37" y2="27" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
          <line x1="40" y1="13" x2="43" y2="27" stroke="white" stroke-width="1.4" stroke-linecap="round"/>
          {/* Right pan */}
          <path d="M37 27 Q40 31.5 43 27" stroke="white" stroke-width="1.8" fill="none" stroke-linecap="round"/>
        </svg>
      </div>
    ),
    { ...size }
  );
}
