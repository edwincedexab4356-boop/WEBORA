import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { WeboraLogo } from './WeboraLogo';

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
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetLabel, setTargetLabel] = useState<string>('');
  const [targetCoords, setTargetCoords] = useState<string>('00° 00\'');

  // Friendly human-readable names for anchor IDs
  const sectionLabels: Record<string, { label: string; coords: string }> = {
    '#hero': { label: 'EXPERIENCIA CENTRAL', coords: 'SEC // 01 • LAT 00°' },
    '#manifiesto': { label: 'EL MANIFIESTO', coords: 'SEC // 02 • LAT 14°' },
    '#servicios': { label: 'CAPACIDADES & SERVICIOS', coords: 'SEC // 03 • LAT 28°' },
    '#portafolio': { label: 'OBRAS SELECTAS', coords: 'SEC // 04 • LAT 42°' },
    '#impacto': { label: 'MÉTRICAS & RESULTADOS', coords: 'SEC // 05 • LAT 56°' },
    '#proceso': { label: 'METODOLOGÍA DE INGENIERÍA', coords: 'SEC // 06 • LAT 70°' },
    '#cotizador': { label: 'SIMULADOR DE ALCANCE', coords: 'SEC // 07 • LAT 84°' },
    '#contacto': { label: 'CANAL DE COMUNICACIÓN', coords: 'SEC // 08 • LAT 99°' },
  };

  const navigateToSection = useCallback((targetId: string, customLabel?: string) => {
    const cleanId = targetId.startsWith('#') ? targetId : `#${targetId}`;
    const element = document.querySelector(cleanId);
    if (!element) return;

    // If user prefers reduced motion, navigate immediately without any cinematic curtain
    if (shouldReduceMotion) {
      element.scrollIntoView({ behavior: 'auto' });
      window.history.pushState(null, '', cleanId);
      return;
    }

    // Determine descriptive metadata for the destination
    const meta = sectionLabels[cleanId] || {
      label: customLabel || cleanId.replace('#', '').toUpperCase(),
      coords: 'ENRUTAMIENTO DIRECTO'
    };
    setTargetLabel(meta.label);
    setTargetCoords(meta.coords);
    setIsTransitioning(true);

    // Sequence:
    // 1. Shutter closes with cyan laser edge (220ms)
    // 2. Page scrolls into place smoothly under the cover (at 240ms)
    // 3. Shutter opens back up revealing the section (at 420ms)
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'auto' });
      window.history.pushState(null, '', cleanId);
    }, 240);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 580);
  }, [shouldReduceMotion]);

  // Global anchor interceptor for seamless on-page transitions
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        // Prevent default harsh jump
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

      {/* Cinematic Shutter & Masking Transition Layer */}
      <AnimatePresence>
        {isTransitioning && !shouldReduceMotion && (
          <motion.div
            key="cinematic-transition-curtain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden"
          >
            {/* Top Shutter Blade */}
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '-100%' }}
              transition={{
                duration: 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-1/2 bg-[#050608] border-b border-cyan-400/60 shadow-[0_10px_40px_rgba(0,229,255,0.4)] relative"
            >
              {/* Cyan Laser Edge Line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_15px_#00e5ff]" />
            </motion.div>

            {/* Central Holographic Portal & Shared Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.08, opacity: 0 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none select-none px-6"
            >
              {/* Radial flare behind emblem */}
              <div className="absolute w-[340px] h-[340px] bg-[radial-gradient(circle,rgba(0,229,255,0.18)_0%,rgba(0,102,255,0.06)_40%,transparent_70%)] blur-[40px]" />

              {/* Shared Webora Insignia */}
              <div className="relative mb-5 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.1] backdrop-blur-md shadow-[0_0_30px_rgba(0,229,255,0.25)]">
                <WeboraLogo size={56} showText={false} />
              </div>

              {/* HUD Target Routing Readout */}
              <div className="text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/[0.08] border border-cyan-400/30 text-cyan-400 text-[10px] font-mono-tech tracking-[0.3em] uppercase mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>TRANSICIÓN CINEMÁTICA</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-display tracking-wider text-white uppercase drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                  {targetLabel}
                </h3>

                <p className="text-[11px] font-mono-tech text-zinc-400 tracking-[0.25em] mt-1.5 uppercase">
                  {targetCoords}
                </p>
              </div>

              {/* Subtle Scanning Light Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="w-48 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-6"
              />
            </motion.div>

            {/* Bottom Shutter Blade */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{
                duration: 0.26,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full h-1/2 bg-[#050608] border-t border-cyan-400/60 shadow-[0_-10px_40px_rgba(0,229,255,0.4)] relative"
            >
              {/* Cyan Laser Edge Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00e5ff] to-transparent shadow-[0_0_15px_#00e5ff]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CinematicTransitionContext.Provider>
  );
};
