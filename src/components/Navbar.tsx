import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';
import { MagneticButton } from './MagneticButton';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Lo Que Hacemos', href: '#servicios' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Resultados', href: '#impacto' },
    { name: 'Cotizador', href: '#cotizador' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#050608]/80 backdrop-blur-xl border-b border-white/[0.07] py-3.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]'
            : 'bg-transparent border-b border-transparent py-6'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center transition-opacity hover:opacity-90"
            data-interactive="true"
          >
            <WeboraLogo
              size={34}
              showText={true}
              textClassName="text-lg sm:text-xl tracking-[0.25em] text-white"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-interactive="true"
                className="text-[11px] xl:text-xs uppercase tracking-[0.2em] font-medium text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#00e5ff] transition-all duration-300 group-hover:w-full opacity-80" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button with Magnetic Pull */}
          <div className="hidden lg:flex items-center gap-4">
            <MagneticButton strength={8}>
              <a
                href="#contacto"
                data-interactive="true"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold bg-white text-black hover:bg-cyan-300 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(0,229,255,0.5)] group"
              >
                <span>Crear Proyecto</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </MagneticButton>
          </div>

          {/* Mobile & Tablet Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            className="lg:hidden p-2 text-zinc-300 hover:text-white focus:outline-none rounded-lg border border-white/10 bg-white/[0.03] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050608]/95 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 sm:p-10 pt-28 max-h-[100dvh] overflow-y-auto"
          >
            <div className="space-y-6">
              <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-mono-tech block mb-4">
                NAVEGACIÓN
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold font-display tracking-tight text-white hover:text-cyan-400 block py-1 border-b border-white/[0.06]"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-white/[0.08]">
              <a
                href="#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-4 rounded-xl text-center text-xs uppercase tracking-widest font-black bg-cyan-400 text-black block mb-3 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
              >
                Crear Mi Proyecto
              </a>
              <p className="text-[11px] text-zinc-500 text-center tracking-wider font-mono-tech">
                WEBORA — DIGITAL STUDIO
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
