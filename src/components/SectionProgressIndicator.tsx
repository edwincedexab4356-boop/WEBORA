import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface SectionProgressIndicatorProps {
  sectionId: string;
  readTime: string;
  label?: string;
  wordsCount?: string;
  variant?: 'badge' | 'detailed' | 'minimal';
  className?: string;
}

export const SectionProgressIndicator: React.FC<SectionProgressIndicatorProps> = ({
  sectionId,
  readTime,
  label = 'Tiempo estimado',
  wordsCount,
  variant = 'badge',
  className = '',
}) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Look up target element by ID or selector
    const selector = sectionId.startsWith('#') ? sectionId : `#${sectionId}`;
    const el = document.querySelector(selector) as HTMLElement | null;

    if (!el) return;

    let ticking = false;

    const computeProgress = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section starts counting progress when its top enters the upper half of screen (or 75% down)
      const startOffset = windowHeight * 0.75;
      // Section is considered 100% complete when its bottom aligns with the comfortable viewing zone
      const totalDistance = rect.height;

      if (totalDistance <= 0) return;

      const scrolled = startOffset - rect.top;
      const rawProgress = Math.min(Math.max(scrolled / totalDistance, 0), 1);
      const rounded = Math.round(rawProgress * 100);

      setProgress(rounded);
      setIsCompleted(rounded >= 98);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(computeProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    // Initial evaluation
    computeProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionId]);

  if (variant === 'minimal') {
    return (
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${progress}% completado`}
        className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[10px] font-mono-tech ${className}`}
      >
        <Clock className="w-3 h-3 text-[#00D2FF]" />
        <span className="text-zinc-300 font-medium">{readTime}</span>
        <div className="w-8 h-1 rounded-full bg-white/[0.08] overflow-hidden ml-1">
          <div
            className="h-full bg-[#0066FF] transition-all duration-100 ease-out shadow-[0_0_6px_#0066FF]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label}: ${progress}% completado, ${readTime}`}
        className={`relative overflow-hidden rounded-xl bg-[#0B0D12]/95 border border-[#0066FF]/30 backdrop-blur-md p-4 sm:p-5 shadow-[0_4px_24px_rgba(0,0,0,0.5)] ${className}`}
      >
        {/* Subtle accent corner glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-[#0066FF]/[0.08] rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#0066FF]/15 text-[#00D2FF] border border-[#0066FF]/30">
              <BookOpen className="w-3.5 h-3.5" />
            </span>
            <div>
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.2em] text-zinc-400 block">
                {label}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs sm:text-sm font-bold text-white font-mono-tech">
                  {readTime}
                </span>
                {wordsCount && (
                  <>
                    <span className="text-zinc-600 text-xs">•</span>
                    <span className="text-[11px] text-zinc-400 font-mono-tech">
                      {wordsCount}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Status badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.07] text-[10px] font-mono-tech">
            {isCompleted ? (
              <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3 h-3" />
                SECCIÓN COMPLETADA
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                <span>LEYENDO //</span>
                <strong className="text-[#00D2FF] font-bold">{progress}%</strong>
              </span>
            )}
          </div>
        </div>

        {/* Micro progress track */}
        <div className="w-full bg-white/[0.06] h-1.5 rounded-full overflow-hidden relative">
          <div
            className={`h-full bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#0052CC] rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(0,102,255,0.7)] ${
              shouldReduceMotion ? '' : 'will-change-transform'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  // Default 'badge' variant
  return (
    <div
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${progress}% completado`}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-zinc-400 select-none ${className}`}
    >
      <Clock className="w-3 h-3 text-[#00D2FF]" />
      <span>{readTime}</span>
      <span className="text-zinc-600">·</span>
      <div className="w-10 h-1 rounded-full bg-white/[0.08] overflow-hidden">
        <div
          className="h-full bg-[#0066FF] shadow-[0_0_6px_#0066FF] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="text-zinc-300 font-medium min-w-[24px] text-right">
        {progress}%
      </span>
    </div>
  );
};
