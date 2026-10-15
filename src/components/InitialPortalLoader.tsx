import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Globe, ShoppingBag, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';
import { useSiteMode, SiteMode, SITE_MODES } from '../context/SiteModeContext';
import { useSoundscape } from '../context/SoundscapeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface InitialPortalLoaderProps {
  onComplete?: () => void;
}

export const InitialPortalLoader: React.FC<InitialPortalLoaderProps> = ({ onComplete }) => {
  const { showPortal, selectMode } = useSiteMode();
  const { playTick, activateSoundscape } = useSoundscape();
  const shouldReduceMotion = useReducedMotion();
  const [logoRevealed, setLogoRevealed] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<SiteMode | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoRevealed(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (mode: SiteMode) => {
    activateSoundscape();
    playTick();
    selectMode(mode, true);
    if (onComplete) {
      setTimeout(onComplete, 400);
    }
  };

  const CARDS: Array<{
    id: SiteMode;
    num: string;
    title: string;
    category: string;
    badge: string;
    description: string;
    price: string;
    priceLabel: string;
    features: string[];
    icon: React.ReactNode;
    accentColor: string;
    borderColor: string;
    bgGlow: string;
  }> = [
    {
      id: 'sistemas',
      num: '01',
      title: 'Sistemas a Medida',
      category: 'ADMINISTRACIÓN & INVENTARIO',
      badge: 'Control de Negocio',
      description: 'Software en la nube para administrar tu inventario, ventas en mostrador (POS), caja diaria, cuentas y clientes.',
      price: '$220',
      priceLabel: 'USD (Planes hasta $490)',
      features: ['Control de stock en tiempo real', 'Punto de Venta / Caja diaria', 'Gestión de clientes y reportes'],
      icon: <Database className="w-5 h-5 text-[#00D2FF]" />,
      accentColor: '#00D2FF',
      borderColor: 'border-[#0066FF]/60 hover:border-[#00D2FF]',
      bgGlow: 'hover:shadow-[0_0_35px_rgba(0,102,255,0.35)]',
    },
    {
      id: 'webs',
      num: '02',
      title: 'Páginas Web',
      category: 'PRESENCIA DIGITAL',
      badge: 'Alta Velocidad',
      description: 'Páginas web profesionales y landing pages de alto impacto, optimizadas para celulares y posicionamiento en Google.',
      price: '$95',
      priceLabel: 'USD (Planes hasta $190)',
      features: ['Diseño 100% responsivo para celular', 'Dominio económico incluido', 'Botones directos de contacto'],
      icon: <Globe className="w-5 h-5 text-[#0066FF]" />,
      accentColor: '#0066FF',
      borderColor: 'border-white/[0.12] hover:border-[#0066FF]',
      bgGlow: 'hover:shadow-[0_0_30px_rgba(0,102,255,0.25)]',
    },
    {
      id: 'catalogos',
      num: '03',
      title: 'Catálogos Digitales',
      category: 'PEDIDOS WHATSAPP',
      badge: 'El Más Solicitado',
      description: 'Vitrina digital interactiva para pastelerías, tiendas de ropa o comida con carrito y pedidos listos a WhatsApp.',
      price: '$160',
      priceLabel: 'USD (Planes hasta $260)',
      features: ['Checkout directo a WhatsApp', 'Buscador y filtros por categoría', 'Fotos en alta resolución'],
      icon: <ShoppingBag className="w-5 h-5 text-[#00D2FF]" />,
      accentColor: '#00D2FF',
      borderColor: 'border-[#0066FF]/40 hover:border-[#00D2FF]',
      bgGlow: 'hover:shadow-[0_0_30px_rgba(0,210,255,0.25)]',
    },
    {
      id: 'todo',
      num: '04',
      title: 'Ver Todo',
      category: 'EXPERIENCIA COMPLETA',
      badge: 'Sitio Completo',
      description: 'Explora todos los sistemas, páginas web, proyectos reales en producción, cotizador en vivo y portafolio.',
      price: 'Todos',
      priceLabel: 'los planes accesibles',
      features: ['Sistemas + Webs + Catálogos', 'Cotizador interactivo de precios', 'Portafolio real desplegado'],
      icon: <Sparkles className="w-5 h-5 text-white" />,
      accentColor: '#FFFFFF',
      borderColor: 'border-white/[0.15] hover:border-white/60',
      bgGlow: 'hover:shadow-[0_0_25px_rgba(255,255,255,0.15)]',
    },
  ];

  if (!showPortal) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.02 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[10000] bg-[#07090E] overflow-y-auto flex flex-col justify-between py-6 px-4 sm:px-6 md:px-8 select-none"
      >
        {/* Background ambient light */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(0,102,255,0.15),transparent_70%)] blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(0,210,255,0.06),transparent_70%)] blur-[120px]" />
        </div>

        {/* Top Header Row */}
        <div className="relative z-10 max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <WeboraLogo size={36} showText={true} />
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono-tech text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
              PORTAL DE SELECCIÓN
            </span>

            <button
              onClick={() => handleSelect('todo')}
              className="text-xs font-mono-tech text-zinc-400 hover:text-white px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] hover:border-[#0066FF] transition-all cursor-pointer"
            >
              Saltar y ver todo →
            </button>
          </div>
        </div>

        {/* Central Selection Body */}
        <div className="relative z-10 max-w-6xl w-full mx-auto my-auto py-6 sm:py-10">
          
          {/* Main Title & Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/35 text-[#00D2FF] text-[10px] font-mono-tech uppercase tracking-widest mb-3">
              <Zap className="w-3 h-3 text-[#00D2FF]" />
              <span>Soluciones Digitales Accesibles</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-display tracking-tight text-white leading-tight mb-3">
              ¿Qué solución necesitas para tu negocio?
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-zinc-300 leading-relaxed">
              Selecciona una de las 4 opciones para dirigirte directamente a sus precios, funcionalidades y proyectos en vivo:
            </p>
          </motion.div>

          {/* The 4 Division Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {CARDS.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
                whileHover={shouldReduceMotion ? undefined : { y: -4, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
                onClick={() => handleSelect(card.id)}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative rounded-3xl bg-[#0B0F17] border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer group ${card.borderColor} ${card.bgGlow}`}
              >
                {/* Emil Kowalski sheen light sweep */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                {/* Card Top: Number & Category */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08] mb-4">
                    <span className="font-mono-tech text-xs tracking-widest text-[#00D2FF] font-bold">
                      {card.num} // OPCIÓN
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center group-hover:scale-110 transition-transform">
                      {card.icon}
                    </div>
                  </div>

                  <span className="text-[10px] font-mono-tech tracking-wider text-zinc-400 uppercase block mb-1">
                    {card.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-black font-display text-white tracking-tight leading-snug mb-2 group-hover:text-[#00D2FF] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-zinc-300 text-xs leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 mb-5 text-[11px] text-zinc-400">
                    {card.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#00D2FF] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Bottom: Price & CTA */}
                <div className="pt-4 border-t border-white/[0.08] mt-auto">
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="text-[10px] font-mono-tech text-zinc-400 uppercase">
                      Desde
                    </span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-[#00D2FF] transition-colors">
                        {card.price}
                      </span>{' '}
                      <span className="text-[10px] font-mono text-zinc-400">
                        {card.priceLabel}
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] group-hover:bg-[#0066FF] border border-white/[0.1] group-hover:border-[#00D2FF] text-white text-xs font-bold font-mono-tech uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm">
                    <span>Elegir {card.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        {/* Bottom Guarantee Row */}
        <div className="relative z-10 max-w-6xl w-full mx-auto pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono-tech text-zinc-400 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
              Precios transparentes y accesibles
            </span>
            <span className="hidden md:inline text-zinc-600">•</span>
            <span className="hidden md:inline">Trato directo con D.E.K NOVACORE</span>
          </div>

          <div className="text-zinc-400">
            WhatsApp Oficial: <span className="text-white font-bold">66952340</span> (+507 6695-2340)
          </div>
        </div>

      </motion.div>
    </AnimatePresence>
  );
};
