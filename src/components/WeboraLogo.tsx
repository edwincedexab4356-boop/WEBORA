import React, { useId, useState } from 'react';
import userLogoSrc from '../assets/dek_nova_core.png';

interface WeboraLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textClassName?: string;
  orientation?: 'horizontal' | 'vertical';
}

export const WeboraLogo: React.FC<WeboraLogoProps> = ({
  className = '',
  size = 40,
  showText = true,
  textClassName = '',
  orientation = 'horizontal'
}) => {
  const [imgError, setImgError] = useState(false);
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const blueGradId = `dek-electric-${uid}`;
  const accentGradId = `dek-accent-${uid}`;
  const glowId = `dek-glow-${uid}`;

  return (
    <div
      className={`inline-flex items-center select-none ${
        orientation === 'vertical' ? 'flex-col text-center gap-2.5' : 'flex-row gap-3'
      } ${className}`}
    >
      {/* Logo montado por el usuario (dek nova core.png) */}
      {!imgError ? (
        <div
          className="relative shrink-0 rounded-xl overflow-hidden bg-black/90 border border-[#0066FF]/35 shadow-[0_0_16px_rgba(0,102,255,0.22)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{ width: size, height: size }}
        >
          <img
            src={userLogoSrc}
            alt="D.E.K NOVACORE — DIGITAL SOLUTIONS"
            className="w-full h-full object-contain p-0.5"
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        /* Monograma D.E.K vectorial alternativo si no carga la imagen */
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id={blueGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="35%" stopColor="#00D2FF" />
              <stop offset="85%" stopColor="#0066FF" />
              <stop offset="100%" stopColor="#0047CC" />
            </linearGradient>

            <linearGradient id={accentGradId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0B0D12" />
              <stop offset="50%" stopColor="#121826" />
              <stop offset="100%" stopColor="#0066FF" />
            </linearGradient>

            <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          <rect
            x="4"
            y="4"
            width="72"
            height="72"
            rx="18"
            fill="#0B0D12"
            stroke="#0066FF"
            strokeWidth="1.8"
            strokeOpacity="0.45"
          />

          <circle cx="40" cy="40" r="30" stroke="#00D2FF" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="2 3" />

          <path
            d="M18 24H28C33.5228 24 38 28.4772 38 34C38 39.5228 33.5228 44 28 44H18V24Z"
            fill="none"
            stroke={`url(#${blueGradId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="39" cy="44" r="1.5" fill="#00D2FF" />

          <path
            d="M44 24H58M44 34H54M44 44H58"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="59.5" cy="44" r="1.5" fill="#00D2FF" />

          <path
            d="M47 50V62M47 56L57 50M51 55L58 62"
            stroke={`url(#${blueGradId})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M20 54L34 54L39 59L34 64L20 64"
            stroke="#0066FF"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.8"
          />
          <circle cx="39" cy="59" r="2.5" fill="#00D2FF" filter={`url(#${glowId})`} />
          <circle cx="68" cy="12" r="2" fill="#00D2FF" fillOpacity="0.9" />
        </svg>
      )}

      {/* Bloque tipográfico: D.E.K + NOVACORE debajo + DIGITAL SOLUTIONS */}
      {showText && (
        <div className={`flex flex-col ${orientation === 'vertical' ? 'items-center' : 'items-start'} leading-none ${textClassName}`}>
          {/* Fila superior: D.E.K Monograma */}
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold text-[15px] sm:text-base tracking-[0.22em] text-white">
              D.E.K
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] shadow-[0_0_8px_#0066FF]" />
          </div>

          {/* NOVACORE debajo */}
          <span className="font-display font-black text-xs sm:text-sm tracking-[0.28em] text-white/95 uppercase mt-0.5">
            NOVACORE
          </span>

          {/* Descriptor: DIGITAL SOLUTIONS */}
          <span className="text-[8px] sm:text-[9px] font-mono-tech tracking-[0.32em] text-[#0066FF] font-semibold uppercase mt-1">
            DIGITAL SOLUTIONS
          </span>
        </div>
      )}
    </div>
  );
};

export const DekLogo = WeboraLogo;
