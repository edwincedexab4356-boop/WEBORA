import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { HeroBackgroundCanvas } from './HeroBackgroundCanvas';
import { MagneticButton } from './MagneticButton';
import { TasteButton } from './TasteButton';
import { useSoundscape } from '../context/SoundscapeContext';
import { SectionProgressIndicator } from './SectionProgressIndicator';
import userLogoSrc from '../assets/dek_nova_core.png';

export const Hero: React.FC = () => {
  const { activateSoundscape, playTick } = useSoundscape();
  const headlineWords = [
    'Diseñamos',
    'experiencias',
    'digitales',
    'que',
    'hacen',
    'crecer',
    'negocios.'
  ];

  // Word entrance motion settings
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: '120%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero"
      onPointerDown={activateSoundscape}
      onClick={activateSoundscape}
      className="relative min-h-[100dvh] w-full flex flex-col justify-between items-center pt-32 pb-12 px-6 overflow-hidden select-none"
    >
      {/* Background Interactive Particle Mesh */}
      <HeroBackgroundCanvas />

      {/* Subtle radial ambient lighting behind typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse,rgba(0,102,255,0.08)_0%,rgba(0,210,255,0.03)_40%,transparent_75%)] pointer-events-none blur-[100px] -z-10" />

      {/* Empty spacer to balance layout */}
      <div className="h-6" />

      {/* Main Hero Content */}
      <div className="max-w-[1020px] mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Brand Micro-badge with User's Logo */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#0066FF]/35 bg-[#07090E]/90 shadow-[0_0_20px_rgba(0,102,255,0.2)] backdrop-blur-md mb-8"
        >
          <div className="w-5 h-5 rounded-md overflow-hidden bg-black border border-[#0066FF]/40 shrink-0 flex items-center justify-center">
            <img src={userLogoSrc} alt="D.E.K NOVACORE" className="w-full h-full object-contain" />
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF] animate-pulse" />
          <span className="text-xs text-white font-semibold tracking-wider font-mono-tech">
            D.E.K NOVACORE — DIGITAL SOLUTIONS
          </span>
        </motion.div>

        {/* Word-by-Word Kinetic Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-black font-display tracking-tight leading-[1.06] text-white max-w-[940px] mb-6 sm:mb-8 break-words"
        >
          {headlineWords.map((word, index) => {
            const isHighlight = word === 'digitales' || word === 'negocios.';
            return (
              <span
                key={index}
                className="inline-block overflow-hidden mr-[0.2em] pb-[0.06em] last:mr-0 align-top"
              >
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${
                    isHighlight
                      ? 'text-[#0066FF]'
                      : 'text-white'
                  }`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </motion.h1>

        {/* Subtitle with Delayed Reveal */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="text-zinc-400 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed max-w-[680px] mb-8 sm:mb-12 text-balance px-2"
        >
          Creamos páginas web rápidas, catálogos interactivos con pedidos a WhatsApp y tiendas virtuales accesibles para negocios que quieren crecer y proyectar máxima confianza.
        </motion.p>

        {/* Emil Kowalski / Taste Motion Kinetic Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Button 1: Primary Electric TasteButton */}
          <TasteButton
            href="#contacto"
            variant="electric"
            size="lg"
            strength={10}
            icon={<ArrowUpRight className="w-4 h-4" />}
            iconPosition="right"
            className="w-full sm:w-auto min-w-[210px]"
          >
            Crear mi proyecto
          </TasteButton>

          {/* Button 2: Secondary Carbon & Blue TasteButton */}
          <TasteButton
            href="#portafolio"
            variant="secondary"
            size="lg"
            strength={8}
            className="w-full sm:w-auto min-w-[210px]"
          >
            Ver nuestro trabajo
          </TasteButton>
        </motion.div>

      </div>

      {/* Bottom Studio Standards */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="w-full max-w-[1180px] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-white/[0.05] relative z-10"
      >
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 md:gap-8 text-xs font-mono text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Código artesanal
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Carga sub-segundo
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            Diseño a medida
          </span>
        </div>

        <a
          href="#manifiesto"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors group"
        >
          <span>Conocer estudio</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-cyan-400" />
        </a>
      </motion.div>
    </section>
  );
};
