import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionProgressIndicator } from './SectionProgressIndicator';

export const AnimatedManifesto: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const lines = [
    { text: 'TU NEGOCIO.', highlight: false },
    { text: 'TU MARCA.', highlight: false },
    { text: 'TU EXPERIENCIA DIGITAL.', highlight: true },
  ];

  const principles = [
    {
      num: '01',
      title: 'Claridad sobre el ruido',
      desc: 'Si una persona necesita instrucciones para entender lo que ofreces, el diseño ha fallado. Eliminamos la complejidad para que tu mensaje llegue de forma directa.',
    },
    {
      num: '02',
      title: 'Velocidad sin compromisos',
      desc: 'Nadie tiene paciencia para páginas lentas. Construimos con tecnologías ligeras que cargan en fracciones de segundo en cualquier teléfono o red.',
    },
    {
      num: '03',
      title: 'Identidad y autoridad',
      desc: 'Tu web es la oficina principal de tu empresa en el mundo digital. Un diseño cuidado y profesional transmite solidez y confianza antes de la primera llamada.',
    },
  ];

  return (
    <section
      id="manifiesto"
      className="py-20 sm:py-28 md:py-36 relative overflow-hidden bg-[#050608] border-t border-white/[0.05]"
    >
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Header with quiet reading time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
              02 / Manifiesto
            </span>
          </div>

          <SectionProgressIndicator
            sectionId="#manifiesto"
            readTime="~1.5 min de lectura"
            label="Lectura"
            variant="badge"
          />
        </div>

        {/* Headline Typography */}
        <div className="space-y-1 sm:space-y-2 mb-12 sm:mb-16">
          {lines.map((line, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { y: '100%', opacity: 0 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { y: '0%', opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: shouldReduceMotion ? 0.35 : 0.7,
                  delay: shouldReduceMotion ? idx * 0.06 : idx * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`text-2xl min-[360px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display tracking-tight leading-[1.08] ${
                  line.highlight
                    ? 'text-[#0066FF]'
                    : 'text-white'
                }`}
              >
                {line.text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Narrative columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-white/[0.07] items-start mb-16">
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-wider text-zinc-400 font-mono block">
              Nuestra filosofía
            </span>
            <p className="text-white font-medium text-base mt-2 leading-relaxed">
              Diseño con intención, código a medida y cero plantillas genéricas.
            </p>
          </div>

          <div className="md:col-span-8 space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
            <p>
              La mayoría de los sitios web se sienten iguales porque siguen las mismas fórmulas repetitivas. En <strong className="text-white font-medium">D.E.K NOVACORE</strong> diseñamos cada proyecto como una pieza única adaptada a la realidad de tu negocio.
            </p>
            <p>
              Combinamos estética contemporánea, fluidez en cada interacción y velocidad de carga real para que tu marca proyecte el nivel y la seriedad que tiene tu trabajo.
            </p>
          </div>
        </div>

        {/* Three Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {principles.map((principle) => (
            <div
              key={principle.num}
              className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <span className="text-xs font-mono text-cyan-400 font-semibold block mb-3">
                {principle.num}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-2">
                {principle.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
