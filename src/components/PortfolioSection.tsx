import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, X } from 'lucide-react';
import { useSoundscape } from '../context/SoundscapeContext';

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

// 3D Tilt Card with Responsive Pointer & Touch Event Handling
const InteractiveProjectCard: React.FC<{
  project: ProjectItem;
  index: number;
  onSelect: (p: ProjectItem) => void;
}> = ({ project, index, onSelect }) => {
  const cardRef = useRef<HTMLElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const touchStartPosRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setSpotlightPos({ x, y, opacity: 1 });

    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length > 0) {
      touchStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleInteractionEnd = (e?: React.TouchEvent<HTMLElement>) => {
    setSpotlightPos(prev => ({ ...prev, opacity: 0 }));
    mouseX.set(0);
    mouseY.set(0);

    // If it was a clean tap without large scroll movement, trigger project modal
    if (e && e.changedTouches && e.changedTouches.length > 0) {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const dx = Math.abs(endX - touchStartPosRef.current.x);
      const dy = Math.abs(endY - touchStartPosRef.current.y);
      if (dx < 12 && dy < 12) {
        onSelect(project);
      }
    }
  };

  return (
    <motion.article
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.45,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleInteractionEnd()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={() => handleInteractionEnd()}
      onClick={() => onSelect(project)}
      style={{ rotateX, rotateY, perspective: 1000 }}
      data-interactive="true"
      className="group relative rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-400/60 overflow-hidden flex flex-col justify-between transition-colors duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,229,255,0.15)] cursor-pointer touch-pan-y will-change-transform"
    >
      {/* Dynamic Cursor / Touch Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 229, 255, 0.1), transparent 70%)`,
        }}
      />

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
        <div className="relative z-10 bg-black/50 backdrop-blur-md border border-white/[0.1] rounded-2xl p-4 sm:p-5 transform transition-transform duration-300 group-hover:scale-[1.03]">
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
  );
};

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('Todos');
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const { playTick } = useSoundscape();

  const categories = ['Todos', 'Sitios Web', 'Catálogos Digitales', 'Sistemas'];

  const filteredProjects = filter === 'Todos'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  const handleFilterClick = (cat: string) => {
    playTick();
    setFilter(cat);
  };

  const handleSelectProject = (project: ProjectItem) => {
    playTick();
    setActiveModal(project);
  };

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
                onClick={() => handleFilterClick(cat)}
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
              <InteractiveProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelect={handleSelectProject}
              />
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
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#090b10] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setActiveModal(null)}
                aria-label="Cerrar modal"
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300">
                  {activeModal.category}
                </span>
                <span className="text-xs font-mono-tech text-zinc-400">
                  {activeModal.client}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                {activeModal.title}
              </h3>
              <p className="text-cyan-400 text-sm font-medium mb-6">
                “{activeModal.tagline}”
              </p>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-8">
                {activeModal.description}
              </p>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] mb-8">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-500 block mb-1">
                  IMPACTO AUDITADO
                </span>
                <span className="text-lg font-bold text-white font-display">
                  {activeModal.impact}
                </span>
              </div>

              <div className="mb-8">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400 block mb-3">
                  TECNOLOGÍAS IMPLEMENTADAS
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeModal.tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono-tech px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-zinc-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a
                href="#contacto"
                onClick={() => setActiveModal(null)}
                className="w-full py-4 rounded-2xl text-center text-xs uppercase tracking-widest font-black bg-white text-black hover:bg-cyan-400 transition-colors block shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Solicitar una solución similar para mi negocio
              </a>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
