import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Globe, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { useSoundscape } from '../context/SoundscapeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionProgressIndicator } from './SectionProgressIndicator';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Catálogos Digitales' | 'Sitios Web';
  client: string;
  tagline: string;
  description: string;
  impact: string;
  tech: string[];
  gradient: string;
  liveUrl: string;
  displayUrl: string;
  accentColor: string;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'dulzuras-de-belgis',
    title: 'Dulzuras de Belgis',
    category: 'Catálogos Digitales',
    client: 'Pastelería & Repostería Artesanal',
    tagline: 'Catálogo dulce interactivo con pedidos directos a WhatsApp',
    description: 'Plataforma digital para pastelería y repostería artesanal. Diseñada con una estética cálida y apetitosa para mostrar tortas personalizadas, postres para eventos y permitir a los clientes armar su pedido y enviarlo directo por WhatsApp con todos los detalles.',
    impact: 'Catálogo 100% interactivo • Pedidos rápidos por WhatsApp',
    tech: ['Catálogo Dulce', 'Pedidos WhatsApp', 'Diseño Responsivo', 'Vercel Fast'],
    gradient: 'from-[#2b101f] via-[#1a0a14] to-[#050608]',
    liveUrl: 'https://dulzuras-de-belgis.vercel.app/',
    displayUrl: 'dulzuras-de-belgis.vercel.app',
    accentColor: '#f472b6'
  },
  {
    id: 'costa-atlantica',
    title: 'Costa Atlántica',
    category: 'Sitios Web',
    client: 'Turismo & Hospedaje en el Caribe',
    tagline: 'Experiencia visual inmersiva para turismo y reservas directas frente al mar',
    description: 'Sitio web moderno y envolvente diseñado para capturar la belleza natural de la costa caribeña. Presenta cabañas boutique, paquetes turísticos, galería fotográfica y canal directo para consultar disponibilidad y realizar reservas sin pagar comisiones a plataformas intermediarias.',
    impact: 'Carga instantánea en móviles • Reservas directas sin intermediarios',
    tech: ['Galería Inmersiva', 'Reservas Directas', 'Velocidad Rápida', 'Vercel Fast'],
    gradient: 'from-[#06242e] via-[#04161c] to-[#050608]',
    liveUrl: 'https://ejemplo-numero-2-de-costa-atlantica.vercel.app/',
    displayUrl: 'costa-atlantica.vercel.app',
    accentColor: '#00e5ff'
  },
  {
    id: 'gorras-de-alex',
    title: 'Gorras de Alex',
    category: 'Catálogos Digitales',
    client: 'Streetwear & Gorras Exclusivas',
    tagline: 'Catálogo digital de moda urbana con compra directa por WhatsApp',
    description: 'Showcase digital y vitrina interactiva para tienda de gorras y accesorios urbanos streetwear. Permite a los compradores explorar modelos exclusivos, ver fotos de alta calidad y realizar compras de forma inmediata enviando la referencia seleccionada al WhatsApp del negocio.',
    impact: 'Navegación visual dinámica • Proceso de compra sin fricción',
    tech: ['Catálogo Streetwear', 'Checkout WhatsApp', 'Filtros Dinámicos', 'Vercel Fast'],
    gradient: 'from-[#191c28] via-[#0f1118] to-[#050608]',
    liveUrl: 'https://gorras-de-alex.vercel.app/#',
    displayUrl: 'gorras-de-alex.vercel.app',
    accentColor: '#38bdf8'
  }
];

// Interactive Project Card
const InteractiveProjectCard: React.FC<{
  project: ProjectItem;
  index: number;
  onSelect: (p: ProjectItem) => void;
}> = ({ project, index, onSelect }) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });
  const touchStartPosRef = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 220, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), springConfig);

  const updateCoordinates = (clientX: number, clientY: number) => {
    if (shouldReduceMotion || !cardRef.current) return;
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
    if (!shouldReduceMotion) {
      setSpotlightPos(prev => ({ ...prev, opacity: 0 }));
      mouseX.set(0);
      mouseY.set(0);
    }

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
      initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
      transition={{
        duration: shouldReduceMotion ? 0.3 : 0.45,
        delay: shouldReduceMotion ? index * 0.04 : index * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => handleInteractionEnd()}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={() => handleInteractionEnd()}
      style={{
        rotateX: shouldReduceMotion ? 0 : rotateX,
        rotateY: shouldReduceMotion ? 0 : rotateY,
        perspective: shouldReduceMotion ? undefined : 1000,
      }}
      data-interactive="true"
      className={`group relative rounded-3xl bg-[#090b10] border border-white/[0.08] hover:border-cyan-400/50 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_50px_-15px_rgba(0,229,255,0.15)] will-change-transform ${
        shouldReduceMotion ? 'hover:-translate-y-1.5' : ''
      }`}
    >
      {/* Dynamic Cursor / Touch Spotlight Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: spotlightPos.opacity,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 229, 255, 0.1), transparent 70%)`,
        }}
      />

      {/* Visual Canvas Header */}
      <div className={`h-60 sm:h-72 w-full bg-gradient-to-br ${project.gradient} p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden border-b border-white/[0.06]`}>
        
        {/* Subtle geometric grid lines */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

        {/* Ambient glow */}
        <div
          className="absolute -top-16 -right-16 w-52 h-52 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700 opacity-25"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Top Bar with real URL pill and category */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/[0.1] text-zinc-300">
            {project.category}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono-tech text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ONLINE
            </span>
          </div>
        </div>

        {/* Center UI Showcase Card with smooth zoom on hover */}
        <div className="relative z-10 bg-black/60 backdrop-blur-md border border-white/[0.1] rounded-2xl p-4 sm:p-5 transform transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-white/20" />
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <span className="text-[10px] font-mono-tech text-zinc-400 truncate max-w-[170px]">
              {project.displayUrl}
            </span>
          </div>
          <h4 className="text-lg sm:text-2xl font-black font-display text-white tracking-tight">
            {project.title}
          </h4>
          <p className="text-zinc-400 text-xs mt-1 truncate">
            {project.tagline}
          </p>
        </div>

        {/* Impact metric badge */}
        <div className="relative z-10 self-start inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-[10px] sm:text-[11px] font-mono-tech">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>{project.impact}</span>
        </div>
      </div>

      {/* Information Card Body */}
      <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-mono-tech text-zinc-400 mb-2">
            Cliente: <span className="text-white font-medium">{project.client}</span>
          </div>
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

        {/* Action row with direct link and details */}
        <div className="pt-5 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:bg-cyan-400 text-xs font-bold tracking-wider uppercase transition-colors duration-200 shadow-sm"
          >
            <span>Ver Sitio en Vivo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={() => onSelect(project)}
            className="text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer py-2"
          >
            Detalles
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export const PortfolioSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('Todos');
  const [activeModal, setActiveModal] = useState<ProjectItem | null>(null);
  const { playTick } = useSoundscape();

  const categories = ['Todos', 'Catálogos Digitales', 'Sitios Web'];

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
    <section id="portafolio" className="py-24 sm:py-32 md:py-36 relative bg-[#050608] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                04 / Portafolio Real
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Proyectos reales.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-xl">
              Explora sitios web y catálogos en producción desarrollados por Novexa para marcas reales. Puedes visitarlos directamente en vivo.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <SectionProgressIndicator
              sectionId="#portafolio"
              readTime="~2.5 min de lectura"
              label="Portafolio"
              variant="badge"
            />

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleFilterClick(cat)}
                  data-interactive="true"
                  className={`text-xs uppercase tracking-wider font-medium px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    filter === cat
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-zinc-400 hover:text-white border border-white/[0.06]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Real Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

        {/* Real Live Links Quick Access Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center shrink-0">
              <Globe className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold font-display text-white">
                Todos nuestros proyectos están desplegados en producción
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
                Rápidos, optimizados para celulares y listos para recibir pedidos de clientes.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/50766952340?text=Hola%20Novexa,%20vi%20sus%20proyectos%20en%20el%20portafolio%20y%20quiero%20cotizar%20un%20sitio%20para%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest bg-cyan-400 text-black hover:bg-white transition-colors shrink-0 shadow-[0_0_20px_rgba(0,229,255,0.25)]"
          >
            <span>Cotizar mi web por WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

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
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
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
                  // {activeModal.client}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mb-2">
                {activeModal.title}
              </h3>
              <p className="text-cyan-400 text-sm font-medium mb-6">
                “{activeModal.tagline}”
              </p>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                {activeModal.description}
              </p>

              {/* Live URL Link highlight banner */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-500 block mb-1">
                    ENLACE EN PRODUCCIÓN
                  </span>
                  <a
                    href={activeModal.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:underline font-mono text-sm break-all flex items-center gap-1.5"
                  >
                    <span>{activeModal.liveUrl}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>

                <a
                  href={activeModal.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-white text-black hover:bg-cyan-400 text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                >
                  <span>Abrir en vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-400/5 border border-cyan-400/15 mb-6">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-cyan-300 block mb-1">
                  RESULTADO DEL PROYECTO
                </span>
                <span className="text-base font-semibold text-white">
                  {activeModal.impact}
                </span>
              </div>

              <div className="mb-8">
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400 block mb-3">
                  CARACTERÍSTICAS
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

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`https://wa.me/50766952340?text=Hola%20Novexa,%20quiero%20un%20proyecto%20similar%20a%20${encodeURIComponent(activeModal.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl text-center text-xs uppercase tracking-widest font-black bg-cyan-400 text-black hover:bg-white transition-colors block shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  Solicitar una web como esta por WhatsApp
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl text-center text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
