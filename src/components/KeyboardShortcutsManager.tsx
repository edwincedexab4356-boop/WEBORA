import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, X, ArrowUp, ArrowDown, Volume2, VolumeX, Calculator, Sparkles, Compass } from 'lucide-react';
import { useCinematicTransition } from './CinematicTransitionLayer';
import { useSoundscape } from '../context/SoundscapeContext';

interface SectionTarget {
  id: string;
  name: string;
  keyHint?: string;
}

const SECTION_ORDER: SectionTarget[] = [
  { id: '#hero', name: 'Inicio', keyHint: 'H' },
  { id: '#manifiesto', name: 'Manifiesto' },
  { id: '#servicios', name: 'Servicios', keyHint: 'S' },
  { id: '#portafolio', name: 'Portafolio', keyHint: 'P' },
  { id: '#impacto', name: 'Resultados', keyHint: 'R' },
  { id: '#proceso', name: 'Proceso' },
  { id: '#cotizador', name: 'Cotizador', keyHint: 'C' },
  { id: '#contacto', name: 'Contacto' },
];

export const KeyboardShortcutsManager: React.FC = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<{ key: string; label: string } | null>(null);
  const toastTimeoutRef = useRef<number | null>(null);

  const { navigateToSection } = useCinematicTransition();
  const { toggleMute, isMuted, playTick } = useSoundscape();

  // Helper to flash temporary HUD toast
  const triggerToast = useCallback((key: string, label: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setActiveToast({ key, label });
    toastTimeoutRef.current = window.setTimeout(() => {
      setActiveToast(null);
    }, 1300);
  }, []);

  // Determine which section is currently closest to the top of viewport
  const getCurrentSectionIndex = useCallback(() => {
    const scrollPos = window.scrollY + 180;
    for (let i = SECTION_ORDER.length - 1; i >= 0; i--) {
      const el = document.querySelector(SECTION_ORDER[i].id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollPos >= top) {
          return i;
        }
      }
    }
    return 0;
  }, []);

  // Keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Never intercept when the user is typing in an input field
      const target = e.target as HTMLElement | null;
      if (target) {
        const tagName = target.tagName?.toLowerCase();
        if (
          tagName === 'input' ||
          tagName === 'textarea' ||
          tagName === 'select' ||
          target.isContentEditable
        ) {
          return;
        }
      }

      // 2. Ignore browser system combinations (Ctrl, Alt, Meta/Cmd) unless it's pure Shift for '?'
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const key = e.key;
      const lowerKey = key.toLowerCase();

      // Handle Escape to close modal
      if (key === 'Escape') {
        if (isHelpOpen) {
          setIsHelpOpen(false);
          e.preventDefault();
        }
        return;
      }

      // Handle '?' or '/' for help cheatsheet
      if (key === '?' || (e.shiftKey && key === '/')) {
        e.preventDefault();
        setIsHelpOpen((prev) => !prev);
        playTick();
        triggerToast('?', isHelpOpen ? 'Atajos cerrados' : 'Guía de atajos');
        return;
      }

      // Handle 'C' for Budget Calculator jump
      if (lowerKey === 'c') {
        e.preventDefault();
        playTick();
        triggerToast('C', 'Cotizador de Proyectos');
        navigateToSection('#cotizador', 'Cotizador de Proyectos');
        return;
      }

      // Handle 'H' for Home / Hero
      if (lowerKey === 'h') {
        e.preventDefault();
        playTick();
        triggerToast('H', 'Inicio');
        navigateToSection('#hero', 'Experiencia Central');
        return;
      }

      // Handle 'S' for Services
      if (lowerKey === 's') {
        e.preventDefault();
        playTick();
        triggerToast('S', 'Servicios');
        navigateToSection('#servicios', 'Capacidades & Servicios');
        return;
      }

      // Handle 'P' for Portfolio
      if (lowerKey === 'p') {
        e.preventDefault();
        playTick();
        triggerToast('P', 'Portafolio');
        navigateToSection('#portafolio', 'Obras Selectas');
        return;
      }

      // Handle 'R' for Results
      if (lowerKey === 'r') {
        e.preventDefault();
        playTick();
        triggerToast('R', 'Resultados');
        navigateToSection('#impacto', 'Métricas & Resultados');
        return;
      }

      // Handle 'M' for Mute / Unmute
      if (lowerKey === 'm') {
        e.preventDefault();
        playTick();
        toggleMute();
        triggerToast('M', !isMuted ? 'Audio silenciado' : 'Audio activado');
        return;
      }

      // Handle Down / Next navigation (ArrowDown, PageDown, J)
      if (key === 'ArrowDown' || key === 'PageDown' || lowerKey === 'j') {
        e.preventDefault();
        playTick();
        const currentIndex = getCurrentSectionIndex();
        const nextIndex = Math.min(currentIndex + 1, SECTION_ORDER.length - 1);
        const nextSection = SECTION_ORDER[nextIndex];
        triggerToast('↓', nextSection.name);
        navigateToSection(nextSection.id, nextSection.name);
        return;
      }

      // Handle Up / Prev navigation (ArrowUp, PageUp, K)
      if (key === 'ArrowUp' || key === 'PageUp' || lowerKey === 'k') {
        e.preventDefault();
        playTick();
        const currentIndex = getCurrentSectionIndex();
        const prevIndex = Math.max(currentIndex - 1, 0);
        const prevSection = SECTION_ORDER[prevIndex];
        triggerToast('↑', prevSection.name);
        navigateToSection(prevSection.id, prevSection.name);
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    getCurrentSectionIndex,
    isHelpOpen,
    isMuted,
    navigateToSection,
    playTick,
    toggleMute,
    triggerToast,
  ]);

  return (
    <>
      {/* 1. Micro-Toast Notification when a shortcut triggers */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.16 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] pointer-events-none select-none"
          >
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#080a0f]/90 border border-cyan-400/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(0,229,255,0.2)]">
              <span className="flex items-center justify-center w-5 h-5 rounded-md bg-cyan-400/20 text-cyan-300 font-mono-tech text-[11px] font-bold border border-cyan-400/40">
                {activeToast.key}
              </span>
              <span className="text-xs font-mono-tech text-white uppercase tracking-wider font-medium">
                {activeToast.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Floating Cheatsheet Trigger Button on Desktop */}
      <div className="fixed bottom-6 left-6 z-40 hidden lg:block">
        <button
          onClick={() => {
            playTick();
            setIsHelpOpen(true);
          }}
          aria-label="Ver atajos de teclado"
          title="Ver atajos de teclado (Presiona ?)"
          className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#090b10]/80 hover:bg-[#0f131d] border border-white/[0.08] hover:border-cyan-400/40 text-zinc-400 hover:text-white transition-all duration-300 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.5)] cursor-pointer text-[10px] font-mono-tech"
        >
          <Command className="w-3 h-3 text-cyan-400 group-hover:scale-110 transition-transform" />
          <span className="tracking-wider uppercase">Atajos</span>
          <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.1] text-zinc-300 text-[9px]">?</kbd>
        </button>
      </div>

      {/* 3. Keyboard Shortcuts HUD Modal */}
      <AnimatePresence>
        {isHelpOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsHelpOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Atajos de teclado de Novexa"
              className="relative w-full max-w-lg bg-[#090b10] border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Command className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-display tracking-tight text-white">
                      Navegación por Teclado
                    </h3>
                    <p className="text-[11px] font-mono-tech text-zinc-400">
                      Control ultrarrápido para power users
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsHelpOpen(false)}
                  aria-label="Cerrar ventana de atajos"
                  className="p-2 rounded-full border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Shortcuts Grid */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <Calculator className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Abrir cotizador de presupuesto</span>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-md bg-[#121620] border border-cyan-400/40 text-cyan-300 font-mono-tech text-xs font-bold">
                    C
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sección siguiente</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-2 py-0.5 rounded-md bg-[#121620] border border-white/[0.1] text-zinc-200 font-mono-tech text-xs">
                      ↓
                    </kbd>
                    <span className="text-zinc-500 text-xs font-mono-tech">/</span>
                    <kbd className="px-2 py-0.5 rounded-md bg-[#121620] border border-white/[0.1] text-zinc-200 font-mono-tech text-xs">
                      J
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Sección anterior</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-2 py-0.5 rounded-md bg-[#121620] border border-white/[0.1] text-zinc-200 font-mono-tech text-xs">
                      ↑
                    </kbd>
                    <span className="text-zinc-500 text-xs font-mono-tech">/</span>
                    <kbd className="px-2 py-0.5 rounded-md bg-[#121620] border border-white/[0.1] text-zinc-200 font-mono-tech text-xs">
                      K
                    </kbd>
                  </div>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-400" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                    <span>Silenciar / Activar sonido ambiental</span>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-md bg-[#121620] border border-white/[0.1] text-zinc-200 font-mono-tech text-xs font-semibold">
                    M
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Saltos directos de sección</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono-tech text-xs text-zinc-400">
                    <kbd className="px-1.5 py-0.5 rounded bg-[#121620] border border-white/[0.1] text-zinc-300">H</kbd> Inicio • 
                    <kbd className="px-1.5 py-0.5 rounded bg-[#121620] border border-white/[0.1] text-zinc-300 ml-1">P</kbd> Portafolio • 
                    <kbd className="px-1.5 py-0.5 rounded bg-[#121620] border border-white/[0.1] text-zinc-300 ml-1">S</kbd> Servicios
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono-tech text-zinc-500">
                <span>Presiona ESC para cerrar</span>
                <span className="text-cyan-400/80">NOVEXA // WEB STUDIO</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
