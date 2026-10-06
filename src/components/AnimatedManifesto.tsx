import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedManifesto: React.FC = () => {
  const lines = [
    { text: 'TU NEGOCIO.', highlight: false },
    { text: 'TU MARCA.', highlight: false },
    { text: 'TU EXPERIENCIA DIGITAL.', highlight: true },
  ];

  return (
    <section id="manifiesto" className="py-20 sm:py-28 md:py-36 relative overflow-hidden bg-[#050608] border-t border-white/[0.05]">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-6 sm:mb-10"
        >
          <div className="w-8 h-[1px] bg-cyan-400/80" />
          <span className="text-[10px] sm:text-[11px] font-mono-tech tracking-[0.35em] uppercase text-cyan-400">
            EL MANIFIESTO WEBORA
          </span>
        </motion.div>

        {/* Big Line-by-Line Typography */}
        <div className="space-y-1 sm:space-y-3 mb-10 sm:mb-16">
          {lines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.div
                initial={{ y: '110%', opacity: 0 }}
                whileInView={{ y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.85,
                  delay: idx * 0.16,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-black font-display tracking-tight leading-[1.08] break-words ${
                  line.highlight
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-[#00e5ff] drop-shadow-[0_0_40px_rgba(0,229,255,0.2)]'
                    : 'text-zinc-200'
                }`}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 border-t border-white/[0.07] items-start">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono-tech block">
              FILOSOFÍA DE INGENIERÍA
            </span>
            <p className="text-white font-medium text-sm mt-2">
              Sin atajos. Sin plantillas genéricas. Solo código de alto rendimiento.
            </p>
          </div>

          <div className="md:col-span-8 space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            <p>
              La mayoría de sitios web se olvidan en segundos porque siguen fórmulas idénticas. En <strong className="text-white font-semibold">WEBORA</strong> tratamos cada producto digital como una pieza de ingeniería visual y estratégica.
            </p>
            <p>
              Fusionamos diseño minimalista internacional, microinteracciones táctiles y tecnología ultrarrápida para que tu negocio transmita una autoridad indiscutible desde el primer segundo.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
