import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowUpRight, Volume2, VolumeX, Command, Instagram, ShieldCheck, Scale, Phone } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';
import { LegalModal } from './LegalModal';
import { useSoundscape } from '../context/SoundscapeContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isMuted, isPlaying, toggleMute, activateSoundscape, playTick } = useSoundscape();
  const [legalOpen, setLegalOpen] = useState(false);
  const [legalTab, setLegalTab] = useState<'privacy' | 'terms'>('privacy');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    activateSoundscape();
    toggleMute();
    playTick();
  };

  const openLegal = (tab: 'privacy' | 'terms') => {
    playTick();
    setLegalTab(tab);
    setLegalOpen(true);
  };

  return (
    <>
      <footer className="bg-[#07090E] border-t border-white/[0.07] pt-20 pb-12 relative overflow-hidden">
        {/* Glow ambient background in electric blue */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#0066FF]/40 to-transparent" />
        
        <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
          
          {/* Upper Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/[0.06]">
            
            {/* Column 1: Brand & Philosophy */}
            <div className="md:col-span-4 space-y-4">
              <WeboraLogo size={44} showText={true} />
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Diseñamos y desarrollamos páginas web modernas, catálogos interactivos con WhatsApp y herramientas digitales accesibles para todo negocio.
              </p>
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/25 text-[#00D2FF] text-[9px] sm:text-[10px] font-mono-tech">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
                <span>DISPONIBILIDAD // PROYECTOS ACTIVOS</span>
              </div>
            </div>

            {/* Column 2: Navigation & Services */}
            <div className="md:col-span-2 space-y-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block font-semibold">
                SERVICIOS
              </span>
              <ul className="space-y-2.5 text-xs text-zinc-400 font-medium">
                <li><a href="#servicios" className="hover:text-white transition-colors">Sitios Web Negocio</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Catálogos WhatsApp</a></li>
                <li><a href="#servicios" className="hover:text-white transition-colors">Tiendas & E-Commerce</a></li>
                <li><a href="#cotizador" className="hover:text-white transition-colors">Calculadora de Precios</a></li>
              </ul>
            </div>

            {/* Column 3: Redes & Canales Oficiales */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block font-semibold">
                CANALES OFICIALES
              </span>
              <div className="space-y-3 text-xs">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/d.e.k.novacore/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-300 hover:text-white group transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-[#0066FF] flex items-center justify-center transition-colors">
                    <Instagram className="w-3.5 h-3.5 text-[#00D2FF]" />
                  </div>
                  <div>
                    <span className="block font-medium">Instagram</span>
                    <span className="text-[10px] text-zinc-500 font-mono">@d.e.k.novacore</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white ml-auto" />
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/50766952340"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-300 hover:text-white group transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/10 group-hover:border-[#0066FF] flex items-center justify-center transition-colors">
                    <Phone className="w-3.5 h-3.5 text-[#00D2FF]" />
                  </div>
                  <div>
                    <span className="block font-medium">WhatsApp Directo</span>
                    <span className="text-[10px] text-zinc-500 font-mono">66952340</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white ml-auto" />
                </a>
              </div>
            </div>

            {/* Column 4: Legal & Transparencia */}
            <div className="md:col-span-3 space-y-3">
              <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block font-semibold">
                MARCO LEGAL & TÉRMINOS
              </span>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Comprometidos con la transparencia legal, privacidad de datos y precios accesibles sin sorpresas.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <button
                  onClick={() => openLegal('privacy')}
                  className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Políticas de Privacidad</span>
                </button>
                <button
                  onClick={() => openLegal('terms')}
                  className="inline-flex items-center gap-2 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer text-left"
                >
                  <Scale className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>Términos y Condiciones</span>
                </button>
              </div>
            </div>

          </div>

          {/* Lower Sub-Footer with Audio Soundscape Toggle & Controls */}
          <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <p>© {currentYear} D.E.K NOVACORE — DIGITAL SOLUTIONS.</p>
              <span className="hidden sm:inline text-zinc-700">•</span>
              <button
                onClick={() => openLegal('privacy')}
                className="hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Privacidad
              </button>
              <span className="text-zinc-700">•</span>
              <button
                onClick={() => openLegal('terms')}
                className="hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Términos
              </button>
            </div>
            
            {/* Ambient Soundscape Toggle Controller & Shortcuts Button */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={handleSoundToggle}
                aria-label={isMuted ? 'Activar audio ambiental' : 'Silenciar audio ambiental'}
                title={isMuted ? 'Activar audio ambiental' : 'Silenciar audio ambiental'}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors duration-200 cursor-pointer ${
                  !isMuted && isPlaying
                    ? 'bg-[#0066FF]/15 border-[#0066FF]/40 text-[#00D2FF] shadow-[0_0_15px_rgba(0,102,255,0.25)]'
                    : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-[#0066FF]/40'
                }`}
              >
                {!isMuted && isPlaying ? (
                  <Volume2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
                )}

                {!isMuted && isPlaying && (
                  <span className="flex items-end gap-0.5 h-2.5">
                    <span className="w-[1.5px] h-full bg-[#00D2FF] animate-pulse rounded-full" />
                    <span className="w-[1.5px] h-1.5 bg-[#00D2FF] animate-pulse rounded-full" style={{ animationDelay: '0.15s' }} />
                    <span className="w-[1.5px] h-2 bg-[#00D2FF] animate-pulse rounded-full" style={{ animationDelay: '0.3s' }} />
                  </span>
                )}

                <span className="uppercase tracking-wider text-[10px]">
                  {!isMuted && isPlaying ? 'AUDIO: ACTIVO' : 'AUDIO: SILENCIADO'}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={() => {
                  playTick();
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
                }}
                aria-label="Ver atajos de teclado"
                title="Atajos de teclado rápidos (Presiona ?)"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#0066FF]/40 text-zinc-400 hover:text-white transition-colors cursor-pointer text-[10px] font-mono"
              >
                <Command className="w-3 h-3 text-[#00D2FF]" />
                <span className="uppercase tracking-wider">ATAJOS</span>
                <kbd className="px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300 text-[9px]">?</kbd>
              </motion.button>
            </div>

            <div className="flex items-center gap-6">
              <span>WHATSAPP: 66952340</span>
              <motion.button
                whileHover={{ scale: 1.08, y: -1 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                onClick={scrollToTop}
                className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>SUBIR</span>
                <ArrowUp className="w-3 h-3 text-[#00D2FF]" />
              </motion.button>
            </div>
          </div>

        </div>
      </footer>

      {/* Modal Legal para Políticas de Privacidad y Términos y Condiciones */}
      <LegalModal
        isOpen={legalOpen}
        onClose={() => setLegalOpen(false)}
        initialTab={legalTab}
      />
    </>
  );
};
