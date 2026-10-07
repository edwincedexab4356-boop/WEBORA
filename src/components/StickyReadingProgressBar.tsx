import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SectionMeta {
  id: string;
  number: string;
  name: string;
  readTime: string;
}

const CONTENT_SECTIONS: SectionMeta[] = [
  { id: '#manifiesto', number: '02', name: 'Manifiesto', readTime: '~1.5 min' },
  { id: '#servicios', number: '03', name: 'Servicios', readTime: '~2 min' },
  { id: '#portafolio', number: '04', name: 'Portafolio', readTime: '~2.5 min' },
  { id: '#impacto', number: '05', name: 'Resultados', readTime: '~1.5 min' },
  { id: '#proceso', number: '06', name: 'Proceso', readTime: '~1.5 min' },
  { id: '#cotizador', number: '07', name: 'Cotizador', readTime: '~1.5 min' },
  { id: '#contacto', number: '08', name: 'Contacto', readTime: '~45s' },
];

export const StickyReadingProgressBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionMeta>(CONTENT_SECTIONS[0]);
  const [sectionProgress, setSectionProgress] = useState(0);

  const shouldReduceMotion = useReducedMotion();
  const activeSectionRef = useRef<string>(CONTENT_SECTIONS[0].id);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const windowHeight = window.innerHeight;
        const heroEl = document.getElementById('hero');

        // Only active once the user has scrolled past the hero section
        let inMainContent = false;
        if (heroEl) {
          const heroRect = heroEl.getBoundingClientRect();
          inMainContent = heroRect.bottom <= windowHeight * 0.4;
        } else {
          inMainContent = window.scrollY > 400;
        }

        setIsVisible(inMainContent);

        if (!inMainContent) {
          ticking = false;
          return;
        }

        let currentSection: SectionMeta = CONTENT_SECTIONS[0];
        let currentProgress = 0;

        for (let i = 0; i < CONTENT_SECTIONS.length; i++) {
          const sec = CONTENT_SECTIONS[i];
          const rawId = sec.id.replace('#', '');
          const el = document.getElementById(rawId);

          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= windowHeight * 0.55 && rect.bottom >= windowHeight * 0.15) {
              currentSection = sec;
              const totalDistance = rect.height;
              const scrolled = windowHeight * 0.5 - rect.top;
              const rawRatio = Math.min(Math.max(scrolled / (totalDistance || 1), 0), 1);
              currentProgress = Math.round(rawRatio * 100);
              break;
            } else if (rect.top <= windowHeight * 0.55) {
              currentSection = sec;
            }
          }
        }

        activeSectionRef.current = currentSection.id;
        setActiveSection(currentSection);
        setSectionProgress(currentProgress);

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="region"
          aria-label="Progreso de lectura"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 left-6 z-40 hidden sm:flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#090b10]/90 backdrop-blur-md border border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)] select-none pointer-events-auto"
        >
          <span className="text-[11px] font-mono text-zinc-400">
            {activeSection.number} · {activeSection.name}
          </span>

          <span className="w-1 h-1 rounded-full bg-zinc-700" />

          {/* Clean Micro Progress Bar */}
          <div className="w-14 h-1 rounded-full bg-white/[0.08] overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-150 ease-out"
              style={{ width: `${sectionProgress}%` }}
            />
          </div>

          <span className="text-[11px] font-mono font-medium text-cyan-400 min-w-[26px] text-right">
            {sectionProgress >= 98 ? <Check className="w-3 h-3 text-emerald-400 inline" /> : `${sectionProgress}%`}
          </span>

          <span className="w-1 h-1 rounded-full bg-zinc-700" />

          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-500">
            <Clock className="w-2.5 h-2.5 text-zinc-400" />
            <span>{activeSection.readTime}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
