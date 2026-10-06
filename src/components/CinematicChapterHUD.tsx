import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useCinematicTransition } from './CinematicTransitionLayer';

interface Chapter {
  id: string;
  number: string;
  label: string;
}

const CHAPTERS: Chapter[] = [
  { id: '#hero', number: '01', label: 'Inicio' },
  { id: '#manifiesto', number: '02', label: 'Manifiesto' },
  { id: '#servicios', number: '03', label: 'Servicios' },
  { id: '#portafolio', number: '04', label: 'Portafolio' },
  { id: '#impacto', number: '05', label: 'Resultados' },
  { id: '#proceso', number: '06', label: 'Proceso' },
  { id: '#cotizador', number: '07', label: 'Cotizador' },
  { id: '#contacto', number: '08', label: 'Contacto' },
];

export const CinematicChapterHUD: React.FC = () => {
  const [activeChapter, setActiveChapter] = useState('#hero');
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);
  const { navigateToSection } = useCinematicTransition();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const chapter = CHAPTERS[i];
        const el = document.querySelector(chapter.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            setActiveChapter(chapter.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <aside
      aria-label="Navegador de capítulos cinemático"
      className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-2.5 pointer-events-auto select-none"
    >
      <div className="bg-[#050608]/70 backdrop-blur-md p-2 rounded-full border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col items-center gap-2">
        {CHAPTERS.map((chapter) => {
          const isActive = activeChapter === chapter.id;
          const isHovered = hoveredChapter === chapter.id;

          return (
            <div
              key={chapter.id}
              className="relative flex items-center justify-end"
              onMouseEnter={() => setHoveredChapter(chapter.id)}
              onMouseLeave={() => setHoveredChapter(null)}
            >
              {/* Flyout Label on hover */}
              {(isHovered || (isActive && !shouldReduceMotion)) && (
                <div
                  className={`absolute right-9 px-2.5 py-1 rounded-md bg-[#090b10] border border-white/[0.1] shadow-xl text-[10px] font-mono-tech whitespace-nowrap pointer-events-none transition-all duration-200 ${
                    isActive ? 'text-cyan-400 border-cyan-400/30' : 'text-zinc-300'
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{chapter.number}</span>
                  <span className="font-semibold uppercase tracking-wider">{chapter.label}</span>
                </div>
              )}

              {/* Indicator button node with shared-element indicator */}
              <button
                onClick={() => navigateToSection(chapter.id, chapter.label)}
                aria-label={`Ir a ${chapter.label}`}
                aria-current={isActive ? 'true' : undefined}
                className="relative p-1.5 rounded-full flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-cyan-400"
              >
                {/* Active halo with shared layoutId */}
                {isActive && !shouldReduceMotion && (
                  <motion.div
                    layoutId="active-chapter-node"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-cyan-400/20 border border-cyan-400/60 shadow-[0_0_12px_rgba(0,229,255,0.7)]"
                  />
                )}

                {/* Central dot */}
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-cyan-400 scale-125'
                      : isHovered
                      ? 'bg-white scale-110'
                      : 'bg-white/20'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
