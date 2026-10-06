import React from 'react';
import { motion } from 'framer-motion';

export const WorkProcess: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'ARQUITECTURA & ESTRATEGIA',
      desc: 'Analizamos la propuesta de valor de tu negocio, los cuellos de botella de conversión y la psicología de tus clientes para definir la estructura óptima.',
      detail: 'Auditoría competitiva • Mapa de navegación • Objetivos de conversión'
    },
    {
      num: '02',
      title: 'DISEÑO SENSORIAL & UI/UX',
      desc: 'Creamos una dirección de arte exclusiva con jerarquía visual calculada, espacios amplios y microinteracciones que elevan la percepción de tu marca.',
      detail: 'Diseño de interfaz a medida • Prototipo interactivo • Dirección estética'
    },
    {
      num: '03',
      title: 'INGENIERÍA & DESPLIEGUE',
      desc: 'Codificamos con tecnologías modernas enfocadas en carga sub-segundo, seguridad blindada y optimización para motores de búsqueda (SEO).',
      detail: 'Código limpio sin plantillas • Testing responsive • Puesta en producción'
    }
  ];

  return (
    <section id="proceso" className="py-20 sm:py-28 md:py-36 relative bg-[#050608] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono-tech tracking-[0.3em] uppercase text-cyan-400">
                METODOLOGÍA
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Proceso de ingeniería.
            </h2>
          </div>
          <p className="text-zinc-400 text-sm sm:text-base max-w-[420px] leading-relaxed">
            Un marco de ejecución estructurado y transparente sin improvisaciones ni retrasos innecesarios.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.6,
                delay: idx * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-400/40 active:border-cyan-400/50 active:scale-[0.985] transition-all duration-300 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] group touch-pan-y cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                  <span className="font-mono-tech text-xs tracking-widest text-cyan-400 font-bold">
                    FASE // {step.num}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-cyan-400 transition-colors" />
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-display tracking-tight text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-[10px] font-mono-tech tracking-wider uppercase text-zinc-500 block">
                  {step.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
