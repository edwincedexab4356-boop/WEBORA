import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'Sitios Web' | 'Catálogos Digitales' | 'Sistemas';
  client: string;
  tagline: string;
  description: string;
  impact: string;
  tech: string[];
  gradient: string;
  pattern: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'lumina-arch',
    title: 'Lumina Architecture',
    category: 'Sitios Web',
    client: 'Lumina Studio & Developments',
    tagline: 'Presencia inmersiva para estudio internacional de arquitectura',
    description: 'Diseño ultra minimalista con galerías de alta definición, transiciones cinematográficas y sistema de contacto para proyectos de alto valor.',
    impact: '+74% en consultas de clientes calificados',
    tech: ['Next.js Architecture', 'WebGL Shaders', 'Mobile First'],
    gradient: 'from-[#0b1424] via-[#09101d] to-[#050608]',
    pattern: 'arch'
  },
  {
    id: 'veloce-goods',
    title: 'Veloce Precision Goods',
    category: 'Catálogos Digitales',
    client: 'Veloce Luxury Accessories',
    tagline: 'Catálogo digital interactivo con pedidos directos a WhatsApp',
    description: 'Catálogo de carga instantánea con filtros dinámicos por material, galería 360 y generación de orden estructurada directo al chat de ventas.',
    impact: '0.4s tiempo de carga • +58% conversión móvil',
    tech: ['WhatsApp Checkout', 'Filtros Dinámicos', 'Buscador Instantáneo'],
    gradient: 'from-[#091b24] via-[#07131a] to-[#050608]',
    pattern: 'catalog'
  },
  {
    id: 'kryon-cloud',
    title: 'Kryon Cloud ERP',
    category: 'Sistemas',
    client: 'Kryon Logistics Network',
    tagline: 'Panel de control operativo, inventario y facturación',
    description: 'Sistema web administrativo a medida: visualización de existencias en tiempo real, cotizador automático en PDF y asignación de despachos por turnos.',
    impact: '4.2 horas diarias ahorradas al equipo de almacén',
    tech: ['Base de Datos Segura', 'Dashboard Tiempo Real', 'Roles & Permisos'],
    gradient: 'from-[#110f24] via-[#0b0a1a] to-[#050608]',
    pattern: 'system'
  },
  {
    id: 'aura-gastro',
    title: 'Aura Gastronomy & Bar',
    category: 'Sitios Web',
    client: 'Aura Hospitality Group',
    tagline: 'Experiencia sensorial gastronómica y reservas online',
    description: 'Sitio web moderno con carta interactiva por maridajes, selector de fechas para reservas y optimización completa en Google Maps.',
    impact: '+82% en reservas online confirmadas',
    tech: ['Menú QR Interactivo', 'Reservas Directas', 'SEO Google Maps'],
    gradient: 'from-[#0d1622] via-[#080d14] to-[#050608]',
    pattern: 'gastro'
  }
];

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('Todos');
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);

  const categories = ['Todos', 'Sitios Web', 'Catálogos Digitales', 'Sistemas'];

  const filteredProjects = filter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portafolio" className="py-28 md:py-36 relative bg-[#050608] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono-tech tracking-[0.3em] uppercase text-cyan-400">
                PROYECTOS SELECCIONADOS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Portafolio.
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                data-interactive="true"
                className={`text-[11px] sm:text-xs uppercase tracking-wider font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-300 cursor-pointer ${
                  filter === cat
                    ? 'bg-white text-black font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Cinematic Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-400/60 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,229,255,0.15)] cursor-pointer"
                onClick={() => setActiveModal(project)}
                data-interactive="true"
              >
                {/* Visual Canvas / Image Simulation Header */}
                <div className={`h-56 sm:h-72 w-full bg-gradient-to-br ${project.gradient} p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]`}>
                  
                  {/* Subtle geometric pattern lines inside mock visual */}
                  <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

                  {/* Corner ambient glow */}
                  <div className="absolute -top-16 -right-16 w-52 h-52 bg-cyan-400/[0.08] rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />

                  {/* Top Bar inside mock visual */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono-tech uppercase tracking-widest px-2.5 sm:px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1] text-zinc-300">
                      {project.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono-tech text-zinc-400 truncate max-w-[140px] sm:max-w-none">
                      // {project.client}
                    </span>
                  </div>

                  {/* Center Architectural UI Card with smooth zoom on hover */}
                  <div className="relative z-10 bg-black/50 backdrop-blur-md border border-white/[0.1] rounded-2xl p-4 sm:p-5 transform transition-transform duration-500 group-hover:scale-[1.03]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                        <span className="w-2 h-2 rounded-full bg-white/20" />
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono-tech text-cyan-400">PRODUCCIÓN</span>
                    </div>
                    <h4 className="text-base sm:text-xl font-black font-display text-white tracking-tight">
                      {project.title}
                    </h4>
                    <p className="text-zinc-400 text-xs mt-1 truncate">
                      {project.tagline}
                    </p>
                  </div>

                  {/* Impact badge */}
                  <div className="relative z-10 self-start inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] sm:text-[11px] font-mono-tech">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>{project.impact}</span>
                  </div>
                </div>

                {/* Information Card Body */}
                <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono-tech uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-bold text-zinc-300 group-hover:text-cyan-400 transition-colors">
                      Ver especificaciones
                    </span>
                    <div className="w-8 h-8 rounded-full border border-white/[0.1] flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#090b10] border border-white/[0.15] rounded-3xl max-w-xl w-full p-8 relative max-h-[90vh] overflow-y-auto z-10 shadow-2xl"
            >
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Cerrar modal"
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/[0.05] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="text-[10px] font-mono-tech uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 inline-block mb-3">
                {activeModal.category}
              </span>

              <h3 className="text-3xl font-black font-display text-white mb-2">
                {activeModal.title}
              </h3>
              <p className="text-zinc-400 text-sm mb-6">{activeModal.tagline}</p>

              <div className="bg-[#050608] border border-white/[0.08] rounded-2xl p-5 mb-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono-tech border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">CLIENTE</span>
                  <span className="text-white font-medium">{activeModal.client}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono-tech border-b border-white/[0.06] pb-2">
                  <span className="text-zinc-500">IMPACTO DEMOSTRADO</span>
                  <span className="text-cyan-400 font-bold">{activeModal.impact}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed pt-1">
                  {activeModal.description}
                </p>
              </div>

              <div className="mb-8">
                <span className="text-[11px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-3">
                  TECNOLOGÍA APLICADA
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModal.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono-tech px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="#contacto"
                  onClick={() => setActiveModal(null)}
                  className="flex-1 py-4 rounded-full text-center text-xs uppercase tracking-widest font-black bg-white text-black hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Cotizar Proyecto Similar
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
