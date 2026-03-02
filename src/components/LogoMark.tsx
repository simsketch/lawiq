interface Props {
  size?: number;
}

/** Scales-of-justice icon mark in the brand gradient */
export default function LogoMark({ size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="lm-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#2563eb"/>
          <stop offset="55%"  stopColor="#4f46e5"/>
          <stop offset="100%" stopColor="#7c3aed"/>
        </linearGradient>
        <linearGradient id="lm-sh" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="white" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="white" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="48" height="48" rx="11" fill="url(#lm-g)"/>
      <rect width="48" height="22" rx="11" fill="url(#lm-sh)"/>

      {/* Base */}
      <line x1="16" y1="39" x2="32" y2="39" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Post */}
      <line x1="24" y1="38" x2="24" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Beam */}
      <line x1="8"  y1="13" x2="40" y2="13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      {/* Pivot */}
      <circle cx="24" cy="13" r="2.5" fill="white"/>

      {/* Left strings */}
      <line x1="8" y1="13" x2="5"  y2="27" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="8" y1="13" x2="11" y2="27" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Left pan */}
      <path d="M5 27 Q8 31.5 11 27" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>

      {/* Right strings */}
      <line x1="40" y1="13" x2="37" y2="27" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <line x1="40" y1="13" x2="43" y2="27" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      {/* Right pan */}
      <path d="M37 27 Q40 31.5 43 27" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    </svg>
  );
}
