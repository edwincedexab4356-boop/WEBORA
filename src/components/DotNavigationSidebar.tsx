import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCinematicTransition } from './CinematicTransitionLayer';
import { useSoundscape } from '../context/SoundscapeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NavSection {
  id: string;
  number: string;
  name: string;
  label: string;
  readTime: string;
}

const SECTIONS: NavSection[] = [
  { id: '#hero', number: '01', name: 'Inicio', label: 'Portada Principal', readTime: '~30s' },
  { id: '#manifiesto', number: '02', name: 'Manifiesto', label: 'Filosofía Novexa', readTime: '~1.5m' },
  { id: '#servicios', number: '03', name: 'Servicios', label: 'Capacidades Digitales', readTime: '~2m' },
  { id: '#portafolio', number: '04', name: 'Portafolio', label: 'Proyectos Selectos', readTime: '~2.5m' },
  { id: '#impacto', number: '05', name: 'Resultados', label: 'Métricas Reales', readTime: '~1.5m' },
  { id: '#proceso', number: '06', name: 'Proceso', label: 'Metodología Ágil', readTime: '~1.5m' },
  { id: '#cotizador', number: '07', name: 'Cotizador', label: 'Simulador de Costos', readTime: '~1.5m' },
  { id: '#contacto', number: '08', name: 'Contacto', label: 'Iniciar Proyecto', readTime: '~45s' },
];

export const DotNavigationSidebar: React.FC = () => {
  const [activeSection, setActiveSection] = useState('#hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const activeSectionRef = useRef('#hero');

  const { navigateToSection } = useCinematicTransition();
  const { playTick } = useSoundscape();
  const shouldReduceMotion = useReducedMotion();

  // High-performance IntersectionObserver for accurate section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const hash = `#${entry.target.id}`;
            if (activeSectionRef.current !== hash) {
              activeSectionRef.current = hash;
              setActiveSection(hash);
            }
          }
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: 0.1,
      }
    );

    SECTIONS.forEach((sec) => {
      const el = document.querySelector(sec.id);
      if (el) observer.observe(el);
    });

    // Passive scroll progress listener to drive the vertical track progress bar
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          if (totalHeight > 0) {
            const progress = Math.min(Math.max(window.scrollY / totalHeight, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDotClick = (sectionId: string, label: string) => {
    playTick();
    navigateToSection(sectionId, label);
  };

  return (
    <nav
      aria-label="Navegación rápida por secciones"
      className="fixed right-3 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-40 select-none pointer-events-auto"
    >
      <div className="relative py-4 px-1.5 flex flex-col items-center">
        
        {/* Background Subtle Spine Line */}
        <div className="absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-[1px] bg-white/[0.08] pointer-events-none" />

        {/* Dynamic Glowing Progress Fill Line */}
        <div
          className="absolute top-6 left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-[#00e5ff] to-[#0088ff] origin-top shadow-[0_0_8px_rgba(0,229,255,0.7)] pointer-events-none transition-all duration-150"
          style={{
            height: `calc((100% - 48px) * ${scrollProgress})`,
          }}
        />

        {/* Section Dots List */}
        <div className="flex flex-col gap-2.5 sm:gap-3 relative z-10">
          {SECTIONS.map((sec, index) => {
            const isActive = activeSection === sec.id;
            const isHovered = hoveredSection === sec.id;

            return (
              <div
                key={sec.id}
                className="relative flex items-center justify-end group"
                onMouseEnter={() => setHoveredSection(sec.id)}
                onMouseLeave={() => setHoveredSection(null)}
              >
                {/* Floating Tooltip Label on Hover / Active State */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, x: 8, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 6, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-9 px-3 py-1.5 rounded-lg bg-[#07090e]/95 border border-white/[0.12] backdrop-blur-xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] pointer-events-none flex items-center gap-2 whitespace-nowrap z-50"
                    >
                      <span className="text-[10px] font-mono-tech text-cyan-400 font-semibold tracking-wider">
                        {sec.number}
                      </span>
                      <div className="h-2.5 w-[1px] bg-white/10" />
                      <div className="flex flex-col text-left">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-display font-bold text-white tracking-wide">
                            {sec.name}
                          </span>
                          <span className="text-[9px] font-mono-tech text-cyan-400 font-normal">
                            {sec.readTime}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono-tech text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
                          {sec.label}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Interactive Dot Hit Target Button */}
                <button
                  onClick={() => handleDotClick(sec.id, sec.name)}
                  aria-label={`Ir a sección ${sec.number}: ${sec.name}`}
                  aria-current={isActive ? 'step' : undefined}
                  className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-cyan-400 rounded-full cursor-pointer"
                >
                  {/* Active glowing indicator pill */}
                  {isActive ? (
                    <motion.div
                      layoutId={shouldReduceMotion ? undefined : 'active-nav-dot'}
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 28,
                      }}
                      className="relative flex items-center justify-center"
                    >
                      {/* Luminous aura */}
                      <span className="absolute w-4 h-6 rounded-full bg-cyan-400/20 blur-[3px]" />
                      
                      {/* Active elongated cyan pill */}
                      <span className="h-4 sm:h-5 w-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff]" />
                    </motion.div>
                  ) : (
                    /* Inactive subtle dot */
                    <div
                      className={`rounded-full transition-all duration-200 ${
                        isHovered
                          ? 'w-2 h-2 bg-white scale-125 shadow-[0_0_6px_rgba(255,255,255,0.8)]'
                          : 'w-1.5 h-1.5 bg-white/20 group-hover:bg-white/60'
                      }`}
                    />
                  )}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </nav>
  );
};
