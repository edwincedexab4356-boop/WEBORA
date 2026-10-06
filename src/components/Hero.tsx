import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { HeroBackgroundCanvas } from './HeroBackgroundCanvas';
import { MagneticButton } from './MagneticButton';
import { useSoundscape } from '../context/SoundscapeContext';

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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.06)_0%,rgba(0,102,255,0.02)_40%,transparent_75%)] pointer-events-none blur-[100px] -z-10" />

      {/* Empty spacer to balance layout */}
      <div className="h-6" />

      {/* Main Hero Content */}
      <div className="max-w-[1020px] mx-auto text-center relative z-10 flex flex-col items-center">
        
        {/* Brand Micro-badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-8 group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
          <span className="text-[11px] font-mono-tech tracking-[0.3em] uppercase text-zinc-300 font-medium">
            WEBORA • ESTUDIO DE INGENIERÍA DIGITAL
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
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,229,255,0.25)]'
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
          Webora convierte ideas de negocios en experiencias digitales de alto impacto. Creamos sitios web de clase mundial, catálogos interactivos y sistemas a medida.
        </motion.p>

        {/* Magnetic Buttons appearing at the end */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-5 w-full sm:w-auto px-4 sm:px-0"
        >
          {/* Button 1: Primary Magnetic */}
          <MagneticButton strength={10} className="w-full sm:w-auto">
            <a
              href="#contacto"
              data-interactive="true"
              onMouseEnter={playTick}
              onClick={() => {
                activateSoundscape();
                playTick();
              }}
              className="relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] font-extrabold bg-white text-black hover:bg-[#00e5ff] transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.5)] group min-w-[200px]"
            >
              <span>Crear mi proyecto</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </MagneticButton>

          {/* Button 2: Secondary Ghost Magnetic */}
          <MagneticButton strength={8} className="w-full sm:w-auto">
            <a
              href="#portafolio"
              data-interactive="true"
              onMouseEnter={playTick}
              onClick={() => {
                activateSoundscape();
                playTick();
              }}
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] font-semibold text-zinc-300 hover:text-white border border-white/[0.12] hover:border-cyan-400/50 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm min-w-[200px]"
            >
              <span>Ver nuestro trabajo</span>
            </a>
          </MagneticButton>
        </motion.div>

      </div>

      {/* Bottom Scroll Indicator & Studio Metrics */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="w-full max-w-[1180px] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 border-t border-white/[0.05] relative z-10"
      >
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 sm:gap-6 md:gap-8 text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 tracking-widest uppercase">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            100% CÓDIGO A MEDIDA
          </span>
          <span className="hidden md:inline-flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            RENDIMIENTO &lt; 1s
          </span>
          <span className="inline-flex items-center gap-1.5 sm:gap-2">
            <span className="w-1 h-1 rounded-full bg-cyan-400" />
            CERO PLANTILLAS
          </span>
        </div>

        <a
          href="#manifiesto"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-cyan-400 transition-colors group"
        >
          <span>EXPLORAR</span>
          <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 text-cyan-400" />
        </a>
      </motion.div>
    </section>
  );
};
