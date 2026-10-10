import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Instagram } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';
import { MagneticButton } from './MagneticButton';
import { TasteButton } from './TasteButton';
import { useSoundscape } from '../context/SoundscapeContext';

export const Navbar: React.FC = () => {
  const { activateSoundscape, playTick } = useSoundscape();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let prev = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 30;
      if (isScrolled !== prev) {
        prev = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Manifiesto', href: '#manifiesto' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Portafolio', href: '#portafolio' },
    { name: 'Resultados', href: '#impacto' },
    { name: 'Cotizador', href: '#cotizador' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#07090E]/90 backdrop-blur-xl border-b border-[#0066FF]/20 py-3 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.9)]'
            : 'bg-transparent border-b border-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Logo Monograma D.E.K con NOVACORE debajo */}
          <a
            href="#hero"
            className="group flex items-center transition-opacity hover:opacity-90"
            data-interactive="true"
          >
            <WeboraLogo
              size={42}
              showText={true}
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                data-interactive="true"
                onMouseEnter={playTick}
                onClick={() => {
                  activateSoundscape();
                  playTick();
                }}
                className="text-[11px] xl:text-xs uppercase tracking-[0.2em] font-medium text-zinc-400 hover:text-white transition-colors duration-200 relative group py-1"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#0066FF] transition-all duration-300 group-hover:w-full shadow-[0_0_8px_#0066FF]" />
              </a>
            ))}
          </nav>

          {/* Desktop Actions: Instagram & CTA */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            {/* Instagram Link */}
            <a
              href="https://www.instagram.com/d.e.k.novacore/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de D.E.K NOVACORE"
              className="p-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#0066FF] hover:text-[#00D2FF] text-zinc-400 transition-colors"
              title="Instagram @d.e.k.novacore"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {/* TasteButton CTA */}
            <TasteButton
              href="#cotizador"
              variant="electric"
              size="sm"
              strength={6}
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Cotizar Proyecto
            </TasteButton>
          </div>

          {/* Mobile & Tablet Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="https://www.instagram.com/d.e.k.novacore/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @d.e.k.novacore"
              className="p-2 text-zinc-400 hover:text-white rounded-lg border border-white/10 bg-white/[0.03] active:scale-95 transition-transform"
            >
              <Instagram className="w-4 h-4 text-[#00D2FF]" />
            </a>

            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 500, damping: 25 }}
              onClick={() => {
                activateSoundscape();
                playTick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
              className="p-2.5 text-zinc-300 hover:text-white focus:outline-none rounded-xl border border-[#0066FF]/40 bg-[#0B0D12] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile & Tablet Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#07090E]/98 backdrop-blur-2xl lg:hidden flex flex-col justify-between p-6 sm:p-8 pt-24 max-h-[100dvh] overflow-y-auto"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#00D2FF] font-mono-tech block">
                  MENÚ PRINCIPAL
                </span>
                <span className="text-[10px] font-mono-tech text-zinc-500">
                  D.E.K NOVACORE
                </span>
              </div>

              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white hover:text-[#00D2FF] active:text-[#0066FF] block py-2 border-b border-white/[0.05] transition-colors"
                  >
                    {link.name}
                  </a>
                </motion.div>
              ))}

              {/* Instagram direct in mobile drawer */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.25 }}
                className="pt-2"
              >
                <a
                  href="https://www.instagram.com/d.e.k.novacore/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#0066FF] text-zinc-300 hover:text-white"
                >
                  <Instagram className="w-5 h-5 text-[#00D2FF]" />
                  <div className="text-left">
                    <span className="block text-xs font-semibold">Instagram Oficial</span>
                    <span className="text-[10px] text-zinc-500 font-mono">@d.e.k.novacore</span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-zinc-400" />
                </a>
              </motion.div>
            </div>

            <div className="pt-6 border-t border-white/[0.08] space-y-3">
              <TasteButton
                href="#cotizador"
                onClick={() => setMobileMenuOpen(false)}
                variant="electric"
                size="lg"
                className="w-full"
              >
                Calcular Mi Presupuesto
              </TasteButton>
              <p className="text-[10px] text-zinc-500 text-center tracking-wider font-mono">
                D.E.K NOVACORE — DIGITAL SOLUTIONS
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
