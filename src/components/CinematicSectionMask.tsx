import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface CinematicSectionMaskProps {
  fromChapter: string;
  toChapter: string;
  title: string;
  id?: string;
}

export const CinematicSectionMask: React.FC<CinematicSectionMaskProps> = ({
  fromChapter,
  toChapter,
  title,
  id,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across this transition zone
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic laser expansion and optical aperture transforms
  const laserScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.1, 1, 0.1]);
  const laserOpacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);
  const badgeY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [15, 0, -15]);
  const ambientGlowScale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1.3, 0.8]);

  if (shouldReduceMotion) {
    // Accessible, non-distracting static layout for users with reduced motion preferences
    return (
      <div id={id} className="relative w-full py-10 bg-[#050608] border-t border-b border-white/[0.04]">
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8 flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-widest text-zinc-500">
          <span>{fromChapter} ➔ {toChapter}</span>
          <span className="text-zinc-400 font-semibold">{title}</span>
          <span className="text-cyan-400">WEBORA // TRANSICIÓN</span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full py-14 sm:py-20 bg-[#050608] overflow-hidden select-none pointer-events-none"
    >
      {/* Ambient optical flare in center */}
      <motion.div
        style={{ scale: ambientGlowScale }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[120px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.08)_0%,rgba(0,102,255,0.02)_50%,transparent_80%)] blur-[50px]"
      />

      {/* Central Cinematic Laser Horizon */}
      <div className="relative max-w-[1240px] mx-auto px-6 sm:px-8 flex flex-col items-center justify-center">
        
        {/* Top guide lines */}
        <div className="w-full flex items-center justify-between text-[9px] sm:text-[10px] font-mono-tech text-zinc-600 tracking-[0.3em] uppercase mb-5">
          <span>CAP // {fromChapter}</span>
          <div className="flex items-center gap-1.5 text-cyan-400/80">
            <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[9px]">SISTEMA ENLACE</span>
          </div>
          <span>CAP // {toChapter}</span>
        </div>

        {/* Dynamic Expanding Laser Line with Cyan Edge Glow */}
        <div className="relative w-full flex items-center justify-center">
          <motion.div
            style={{ scaleX: laserScale, opacity: laserOpacity }}
            className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent origin-center shadow-[0_0_15px_#00e5ff]"
          />

          {/* Central Interlocking HUD Badge (Shared-Element Anchor) */}
          <motion.div
            style={{ y: badgeY }}
            className="absolute -top-4 px-4 py-1.5 rounded-full bg-[#080a0f] border border-cyan-400/40 shadow-[0_0_20px_rgba(0,229,255,0.35)] flex items-center gap-2.5 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.25em] text-white uppercase font-bold">
              {title}
            </span>
            <span className="text-[9px] font-mono-tech text-cyan-400/80">
              {toChapter}
            </span>
          </motion.div>
        </div>

        {/* Lower telemetry coordinate subtitle */}
        <motion.div
          style={{ opacity: laserOpacity }}
          className="mt-6 flex items-center gap-4 text-[9px] font-mono-tech text-zinc-500 tracking-[0.25em] uppercase"
        >
          <span>ARQUITECTURA DE FLUJO CINEMÁTICO</span>
          <span>•</span>
          <span className="text-zinc-400">FLUIDEZ PERSISTENTE</span>
        </motion.div>

      </div>
    </div>
  );
};
