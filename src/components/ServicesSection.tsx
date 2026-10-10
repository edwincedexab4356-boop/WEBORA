import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Globe, Layers, Cpu } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionProgressIndicator } from './SectionProgressIndicator';
import { TasteButton } from './TasteButton';

interface ServiceData {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  techTags: string[];
  icon: React.ReactNode;
}

const SERVICES: ServiceData[] = [
  {
    id: 'sitios-web',
    num: '01',
    title: 'SITIOS WEB',
    tagline: 'Diseñamos sitios que representan tu negocio.',
    description: 'Interfaces cinematográficas y limpias que convierten a visitantes en clientes. Optimizadas para velocidad de carga instantánea, SEO orgánico y posicionamiento de marca de primer nivel.',
    deliverables: [
      'Arquitectura de información y diseño visual exclusivo',
      'Desarrollo Mobile-First adaptativo a cualquier resolución',
      'Optimización de rendimiento Lighthouse 95+ en Google',
      'Integración con dominio económico (.store, .site, .online) y analítica'
    ],
    techTags: ['React / Vite', 'Tailwind', 'Next-Gen SEO', 'Microinteracciones'],
    icon: <Globe className="w-6 h-6 text-[#00D2FF]" />
  },
  {
    id: 'catalogos-digitales',
    num: '02',
    title: 'CATÁLOGOS DIGITALES',
    tagline: 'Tus productos siempre disponibles y fáciles de explorar.',
    description: 'Catálogos interactivos ultra veloces pensados para redes sociales y tráfico móvil. Filtros dinámicos por categorías, detalles de producto con fotos en alta definición y carrito con checkout directo a WhatsApp.',
    deliverables: [
      'Buscador instantáneo y filtros facetados por categoría/precio',
      'Fichas técnicas con galería interactiva y disponibilidad',
      'Generador de orden automatizada con desglose a WhatsApp',
      'Panel ágil para actualización de inventario sin fricción'
    ],
    techTags: ['WhatsApp Checkout', 'Buscador Instantáneo', 'Galería HD', 'Stock Dinámico'],
    icon: <Layers className="w-6 h-6 text-[#00D2FF]" />
  },
  {
    id: 'sistemas-negocios',
    num: '03',
    title: 'SISTEMAS PARA NEGOCIOS',
    tagline: 'Construimos herramientas digitales adaptadas a tu operación.',
    description: 'Plataformas a medida para automatizar los flujos críticos de tu empresa: paneles administrativos protegidos, control de inventario en vivo, gestión de clientes (CRM) y emisión de cotizaciones.',
    deliverables: [
      'Paneles administrativos privados con autenticación robusta',
      'Control de inventario, productos y alertas de bajo stock',
      'Módulo de generación de presupuestos y facturación',
      'Base de datos segura en la nube con copias de respaldo'
    ],
    techTags: ['Dashboard Seguro', 'Gestión de Clientes', 'Base de Datos Cloud', 'Roles & Permisos'],
    icon: <Cpu className="w-6 h-6 text-[#00D2FF]" />
  }
];

// 3D Tilt Card with Cursor-following and Touch-following Spotlight Illumination
const SpotlightCard: React.FC<{ service: ServiceData; index: number }> = ({ service, index }) => {
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0, opacity: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Gentle physical tilt (max ±5 degrees) with spring recovery
  const springConfig = { damping: 24, stiffness: 220, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleInteractionEnd = () => {
    if (shouldReduceMotion) return;
    setSpotlightPos(prev => ({ ...prev, opacity: 0 }));
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 12 : 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0.35 : 0.65,
        delay: shouldReduceMotion ? index * 0.08 : index * 0.16,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: shouldReduceMotion ? undefined : 1000 }}
      className={`w-full ${index === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleInteractionEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleInteractionEnd}
        onTouchCancel={handleInteractionEnd}
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
        }}
        className={`relative rounded-3xl bg-[#0B0D12] border border-white/[0.08] hover:border-[#0066FF]/60 p-6 sm:p-8 lg:p-10 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[460px] sm:min-h-[500px] group shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] touch-pan-y ${
          shouldReduceMotion ? 'hover:-translate-y-2' : ''
        }`}
      >
        {/* Dynamic Cursor Spotlight Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 -z-0"
          style={{
            opacity: spotlightPos.opacity,
            background: `radial-gradient(450px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(0, 102, 255, 0.16), transparent 70%)`,
          }}
        />

        {/* Ambient subtle corner glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/[0.02] rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="relative z-10">
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center group-hover:border-cyan-400/30 transition-colors">
              {service.icon}
            </div>
            <span className="font-mono-tech text-xs tracking-widest text-zinc-500 font-bold">
              // {service.num}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white mb-2 group-hover:text-cyan-300 transition-colors">
            {service.title}
          </h3>

          <p className="text-cyan-400/90 text-sm font-medium tracking-wide mb-4">
            “{service.tagline}”
          </p>

          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-8">
            {service.description}
          </p>

          {/* Deliverables */}
          <div className="space-y-3 mb-8">
            {service.deliverables.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card Footer */}
        <div className="relative z-10 pt-6 border-t border-white/[0.06] flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {service.techTags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-mono-tech uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>

          <TasteButton
            href="#contacto"
            variant="ghost"
            size="sm"
            icon={<ArrowUpRight className="w-3.5 h-3.5 text-[#00D2FF]" />}
            iconPosition="right"
          >
            Consultar
          </TasteButton>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicios" className="py-24 sm:py-28 md:py-36 relative bg-[#07090E] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                03 / Servicios
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Lo que hacemos.
            </h2>
          </div>
          
          <p className="text-zinc-400 text-sm sm:text-base max-w-[420px] leading-relaxed">
            Desarrollo web y dirección visual pensados para marcas que no se conforman con soluciones genéricas.
          </p>
        </div>

        {/* 3 Core Large Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <SpotlightCard key={service.id} service={service} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};
