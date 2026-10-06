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
  const cyanGradId = `webora-cyan-${uid}`;
  const shadowGradId = `webora-shadow-${uid}`;
  const chromeId = `webora-chrome-${uid}`;
  const glowId = `webora-glow-${uid}`;

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Cinematic Ribbon / Origami Folded 'W' Logo Mark */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <defs>
          {/* Cyan to Electric Blue gradient for front ribbon */}
          <linearGradient id={cyanGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>

          {/* Deep cobalt shadow gradient for folded rear plane */}
          <linearGradient id={shadowGradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0044cc" />
            <stop offset="100%" stopColor="#031633" />
          </linearGradient>

          {/* Highlight chrome gradient */}
          <linearGradient id={chromeId} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#c7d2fe" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>

          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Back geometric fold */}
        <path
          d="M12 18L26 46L36 28L28 14L12 18Z"
          fill={`url(#${shadowGradId})`}
          opacity="0.85"
        />

        {/* Main sharp diagonal ribbon facet */}
        <path
          d="M10 14L28 48L38 48L54 16L40 16L32 34L22 14L10 14Z"
          fill={`url(#${cyanGradId})`}
          filter={`url(#${glowId})`}
        />

        {/* Top-right sharp chrome facet */}
        <path
          d="M38 14L54 14L46 32L34 32L38 14Z"
          fill={`url(#${chromeId})`}
        />

        {/* Accent specular light point */}
        <circle cx="28" cy="47" r="1.5" fill="#ffffff" />
      </svg>

      {showText && (
        <span className={`font-black font-display text-white uppercase ${textClassName}`}>
          WEBORA
        </span>
      )}
    </div>
  );
};
