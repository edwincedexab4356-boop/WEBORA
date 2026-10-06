import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-white/[0.06] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Upper Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-16 border-b border-white/[0.06]">
          
          <div className="md:col-span-5 space-y-4">
            <WeboraLogo size={36} showText={true} textClassName="text-xl tracking-[0.25em]" />
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              Webora convierte ideas de negocios en experiencias digitales. Sitios web, catálogos interactivos y sistemas concebidos para liderar.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[9px] sm:text-[10px] font-mono-tech">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>DISPONIBILIDAD // ACEPTANDO NUEVOS PROYECTOS</span>
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
              Atención personalizada para directores, fundadores y equipos de crecimiento.
            </p>
            <a
              href="https://wa.me/50760000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono-tech text-cyan-400 hover:text-white transition-colors"
            >
              <span>+507 6000-0000 (WhatsApp Business)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Lower Sub-Footer */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 text-center sm:text-left">
          <p>© {currentYear} WEBORA. Todos los derechos reservados.</p>
          
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
