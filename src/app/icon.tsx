import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
          borderRadius: '7px',
          fontFamily: 'sans-serif',
          fontWeight: 800,
          fontSize: '13px',
          color: 'white',
          letterSpacing: '-0.3px',
        }}
      >
        LQ
      </div>
    ),
    { ...size }
  );
}
