import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeboraLogo } from './WeboraLogo';
import { useSoundscape } from '../context/SoundscapeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CinematicTransitionContextType {
  navigateToSection: (targetId: string, label?: string) => void;
  isTransitioning: boolean;
}

const CinematicTransitionContext = createContext<CinematicTransitionContextType>({
  navigateToSection: () => {},
  isTransitioning: false,
});

export const useCinematicTransition = () => useContext(CinematicTransitionContext);

interface CinematicTransitionLayerProps {
  children: ReactNode;
}

export const CinematicTransitionLayer: React.FC<CinematicTransitionLayerProps> = ({ children }) => {
  const shouldReduceMotion = useReducedMotion();
  const { playWhoosh } = useSoundscape();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState<string>('');

  const sectionLabels: Record<string, string> = {
    '#hero': 'Inicio',
    '#manifiesto': 'Manifiesto',
    '#servicios': 'Servicios',
    '#portafolio': 'Portafolio',
    '#impacto': 'Resultados',
    '#proceso': 'Metodología',
    '#cotizador': 'Cotizador',
    '#contacto': 'Contacto',
  };

  const navigateToSection = useCallback((targetId: string, customLabel?: string) => {
    const cleanId = targetId.startsWith('#') ? targetId : `#${targetId}`;
    const element = document.querySelector(cleanId);
    if (!element) return;

    if (shouldReduceMotion) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', cleanId);
      return;
    }

    const label = customLabel || sectionLabels[cleanId] || cleanId.replace('#', '');
    setTargetLabel(label);
    playWhoosh();
    setIsTransitioning(true);

    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', cleanId);
    }, 180);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 420);
  }, [shouldReduceMotion]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        navigateToSection(href);
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });
    return () => document.removeEventListener('click', handleAnchorClick, { capture: true });
  }, [navigateToSection]);

  return (
    <CinematicTransitionContext.Provider value={{ navigateToSection, isTransitioning }}>
      {children}

      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            key="page-transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[9999] bg-[#050608]/90 backdrop-blur-md flex flex-col items-center justify-center pointer-events-none select-none"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.02, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-4"
            >
              <WeboraLogo size={42} showText={false} />
              <div className="text-center">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  Navegando a
                </span>
                <span className="text-2xl font-bold font-display text-white tracking-tight">
                  {targetLabel}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicTransitionContext.Provider>
  );
};
