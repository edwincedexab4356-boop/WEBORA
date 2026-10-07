import React, { useId } from 'react';

interface WeboraLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export const WeboraLogo: React.FC<WeboraLogoProps> = ({
  className = '',
  size = 36,
  showText = true,
  textClassName = 'text-xl tracking-[0.25em]'
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const cyanGradId = `novexa-cyan-${uid}`;
  const shadowGradId = `novexa-shadow-${uid}`;
  const glowId = `novexa-glow-${uid}`;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Modern Architectural 'N' Monogram */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          <linearGradient id={cyanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0077ff" />
          </linearGradient>

          <linearGradient id={shadowGradId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00b4d8" />
            <stop offset="100%" stopColor="#023e8a" />
          </linearGradient>

          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Left vertical stem */}
        <path
          d="M12 12H22V52H12V12Z"
          fill={`url(#${shadowGradId})`}
        />

        {/* Diagonal dynamic ribbon */}
        <path
          d="M16 12L46 48V52H36L12 20V12H16Z"
          fill={`url(#${cyanGradId})`}
          filter={`url(#${glowId})`}
        />

        {/* Right vertical stem */}
        <path
          d="M42 12H52V52H42V12Z"
          fill={`url(#${cyanGradId})`}
        />

        {/* Specular dot */}
        <circle cx="47" cy="17" r="2" fill="#ffffff" />
      </svg>

      {showText && (
        <span className={`font-black font-display text-white uppercase ${textClassName}`}>
          NOVEXA
        </span>
      )}
    </div>
  );
};
