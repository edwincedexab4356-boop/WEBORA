import React from 'react';
import { ArrowUp, ArrowUpRight, Volume2, VolumeX, Command } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';
import { useSoundscape } from '../context/SoundscapeContext';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { isMuted, isPlaying, toggleMute, activateSoundscape, playTick } = useSoundscape();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSoundToggle = () => {
    activateSoundscape();
    toggleMute();
    playTick();
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Upper Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/[0.06]">
          
          <div className="md:col-span-5 space-y-4">
            <WeboraLogo size={36} showText={true} textClassName="text-xl tracking-[0.25em]" />
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Novexa diseña páginas web modernas, catálogos interactivos con WhatsApp y herramientas digitales accesibles para negocios.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[9px] sm:text-[10px] font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DISPONIBILIDAD // PROYECTOS DISPONIBLES</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-zinc-500 block">
              SERVICIOS
            </span>
            <ul className="space-y-2 text-xs text-zinc-400 font-medium">
              <li><a href="#servicios" className="hover:text-white transition-colors">Sitios Web Corporativos</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Catálogos Digitales & WhatsApp</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Sistemas & Dashboards a Medida</a></li>
              <li><a href="#cotizador" className="hover:text-white transition-colors">Calculadora de Presupuestos</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.3em] text-zinc-500 block">
              CONTACTO DIRECTO
            </span>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Atención directa por WhatsApp para dudas, presupuestos e inicio de proyectos.
            </p>
            <a
              href="https://wa.me/50766952340"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
            >
              <span>66952340 (WhatsApp)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Lower Sub-Footer with Audio Soundscape Toggle */}
        <div className="pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-5 text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 text-center sm:text-left">
          <p>© {currentYear} NOVEXA. Todos los derechos reservados.</p>
          
          {/* Ambient Soundscape Toggle Controller & Shortcuts Button */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={handleSoundToggle}
              aria-label={isMuted ? 'Activar paisaje sonoro ambiental' : 'Silenciar paisaje sonoro ambiental'}
              title={isMuted ? 'Activar audio ambiental' : 'Silenciar audio ambiental'}
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                !isMuted && isPlaying
                  ? 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]'
                  : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {/* Dynamic Sound Icon */}
              {!isMuted && isPlaying ? (
                <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-zinc-500" />
              )}

              {/* Animated Audio Equalizer Bars when active */}
              {!isMuted && isPlaying && (
                <span className="flex items-end gap-0.5 h-2.5">
                  <span className="w-[1.5px] h-full bg-cyan-400 animate-pulse rounded-full" />
                  <span className="w-[1.5px] h-1.5 bg-cyan-400 animate-pulse rounded-full" style={{ animationDelay: '0.15s' }} />
                  <span className="w-[1.5px] h-2 bg-cyan-400 animate-pulse rounded-full" style={{ animationDelay: '0.3s' }} />
                </span>
              )}

              <span className="uppercase tracking-wider text-[10px]">
                {!isMuted && isPlaying ? 'AUDIO ESPACIAL: ACTIVO' : 'AUDIO ESPACIAL: SILENCIADO'}
              </span>
            </button>

            {/* Quick Keyboard Shortcuts Trigger */}
            <button
              onClick={() => {
                playTick();
                window.dispatchEvent(new KeyboardEvent('keydown', { key: '?' }));
              }}
              aria-label="Ver atajos de teclado"
              title="Atajos de teclado rápidos (Presiona ?)"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-cyan-400/30 text-zinc-400 hover:text-white transition-all cursor-pointer text-[10px] font-mono-tech"
            >
              <Command className="w-3 h-3 text-cyan-400" />
              <span className="uppercase tracking-wider">ATAJOS</span>
              <kbd className="px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-300 text-[9px]">?</kbd>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <span>ZONA HORARIA: GMT-5</span>
            <button
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>VOLVER ARRIBA</span>
              <ArrowUp className="w-3 h-3 text-cyan-400" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
