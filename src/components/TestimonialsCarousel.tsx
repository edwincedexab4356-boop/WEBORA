import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck, Pause, Play, CheckCircle2, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { SectionProgressIndicator } from './SectionProgressIndicator';

interface TestimonialOutcome {
  id: string;
  client: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  quote: string;
  serviceType: string;
  verifiedYear: string;
}

const OUTCOMES: TestimonialOutcome[] = [
  {
    id: 'veloce',
    client: 'Carlos Varela',
    role: 'CEO & Fundador',
    company: 'Veloce Luxury Accessories',
    metric: '+58%',
    metricLabel: 'Conversión directa en WhatsApp',
    quote: 'El catálogo digital que Webora construyó redujo a cero las dudas de los clientes. El pedido llega formateado con código de producto y monto total exacto. Es una máquina de ventas.',
    serviceType: 'Catálogo Digital + Checkout',
    verifiedYear: '2026'
  },
  {
    id: 'lumina',
    client: 'Arq. Mateo Bianchi',
    role: 'Director de Diseño',
    company: 'Lumina Architecture Studio',
    metric: '0.4s',
    metricLabel: 'Velocidad de carga en móviles',
    quote: 'Nuestros clientes de inversión inmobiliaria juzgan nuestro nivel por la presencia web. Webora entregó una interfaz con el mismo estándar estético que nuestras obras arquitectónicas.',
    serviceType: 'Sitio Web Corporativo Inmersivo',
    verifiedYear: '2026'
  },
  {
    id: 'kryon',
    client: 'Lucía Fernández',
    role: 'Head of Operations',
    company: 'Kryon Logistics Network',
    metric: '4.2 hrs',
    metricLabel: 'Ahorro operativo por turno',
    quote: 'Reemplazaron hojas de cálculo dispersas por un sistema administrativo robusto y privado. Controlamos inventario, cotizaciones y despachos sin fallas técnicas.',
    serviceType: 'Sistema a Medida / Panel ERP',
    verifiedYear: '2026'
  },
  {
    id: 'aura',
    client: 'Esteban Roy',
    role: 'Socio Director',
    company: 'Aura Hospitality Group',
    metric: '+82%',
    metricLabel: 'Incremento en reservas confirmadas',
    quote: 'La carta digital con código QR y el motor de reservas directas cambiaron la dinámica de nuestros dos restaurantes. Los clientes destacan la rapidez y elegancia del sitio.',
    serviceType: 'Sitio Web & Menú Interactivo',
    verifiedYear: '2026'
  },
  {
    id: 'sonrisas',
    client: 'Dra. Sofía Navarro',
    role: 'Directora Médica',
    company: 'Navarro Odontología Avanzada',
    metric: '+140',
    metricLabel: 'Nuevos pacientes mensuales vía web',
    quote: 'Teníamos una web antigua que no transmitía confianza. El nuevo sitio nos posicionó como líderes en estética dental y duplicó las consultas de pacientes de alto valor.',
    serviceType: 'Sitio Médico & Agenda Online',
    verifiedYear: '2026'
  }
];

// Tripled items is lightweight and provides seamless buffer
const DISPLAY_OUTCOMES = [...OUTCOMES, ...OUTCOMES, ...OUTCOMES];

export const TestimonialsCarousel: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Position and physics refs (keeps 120fps GPU updates without React re-render lag)
  const xPosRef = useRef(0);
  const targetXPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const singleSetWidthRef = useRef(0);
  const cardStepRef = useRef(0);
  const activeCardIndexRef = useRef(0);
  const isVisibleRef = useRef(false);

  // Drag interaction tracking
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const velocityRef = useRef(0);

  // Measure card sizes dynamically
  const measure = useCallback(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards.length >= 6) {
      const firstCard = cards[0] as HTMLElement;
      const sixthCard = cards[OUTCOMES.length] as HTMLElement;
      const secondCard = cards[1] as HTMLElement;

      const setWidth = sixthCard.offsetLeft - firstCard.offsetLeft;
      if (setWidth > 0) {
        singleSetWidthRef.current = setWidth;
      }
      const step = secondCard.offsetLeft - firstCard.offsetLeft;
      if (step > 0) {
        cardStepRef.current = step;
      }
    }
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener('resize', measure, { passive: true });
    const timer = setTimeout(measure, 200);
    return () => {
      window.removeEventListener('resize', measure);
      clearTimeout(timer);
    };
  }, [measure]);

  // Main high-performance Animation Frame Loop with IntersectionObserver
  useEffect(() => {
    let animationFrameId: number;
    let lastTime = performance.now();
    const cruiseSpeed = 26; // px/sec gentle gliding

    const animate = (currentTime: number) => {
      // If off-screen, skip execution to preserve CPU/GPU
      if (!isVisibleRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      const setWidth = singleSetWidthRef.current;

      if (!isDraggingRef.current && setWidth > 0) {
        // Apply inertia after user releases swipe
        if (Math.abs(velocityRef.current) > 0.4) {
          targetXPosRef.current += velocityRef.current * dt * 50;
          velocityRef.current *= Math.pow(0.92, dt * 60);
        } else {
          velocityRef.current = 0;
          if (!isPausedRef.current) {
            targetXPosRef.current -= cruiseSpeed * dt;
          }
        }

        const diff = targetXPosRef.current - xPosRef.current;
        xPosRef.current += diff * Math.min(1, 14 * dt);
      }

      // Seamless infinite wrapping
      if (setWidth > 0) {
        while (xPosRef.current <= -setWidth) {
          xPosRef.current += setWidth;
          targetXPosRef.current += setWidth;
          dragStartPosRef.current += setWidth;
        }
        while (xPosRef.current > 0) {
          xPosRef.current -= setWidth;
          targetXPosRef.current -= setWidth;
          dragStartPosRef.current -= setWidth;
        }
      }

      // Hardware-accelerated translate3d
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
      }

      // Update active card index ONLY when it actually changes (avoids 120 FPS re-renders)
      if (cardStepRef.current > 0) {
        const positiveOffset = Math.abs(xPosRef.current);
        const index = Math.round(positiveOffset / cardStepRef.current) % OUTCOMES.length;
        if (index !== activeCardIndexRef.current) {
          activeCardIndexRef.current = index;
          setActiveCardIndex(index);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Observe visibility so we only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries[0]?.isIntersecting ?? false;
        isVisibleRef.current = isIntersecting;
        if (isIntersecting) {
          lastTime = performance.now();
        }
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  // Pointer drag event handlers (desktop mouse + mobile touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    lastPointerXRef.current = e.clientX;
    dragStartPosRef.current = xPosRef.current;
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    const currentPointerX = e.clientX;
    const instantDx = currentPointerX - lastPointerXRef.current;
    lastPointerXRef.current = currentPointerX;
    velocityRef.current = instantDx;

    const newPos = dragStartPosRef.current + deltaX;
    xPosRef.current = newPos;
    targetXPosRef.current = newPos;

    // Realtime wrap during active drag
    const setWidth = singleSetWidthRef.current;
    if (setWidth > 0) {
      if (xPosRef.current <= -setWidth) {
        xPosRef.current += setWidth;
        dragStartPosRef.current += setWidth;
        targetXPosRef.current += setWidth;
      } else if (xPosRef.current > 0) {
        xPosRef.current -= setWidth;
        dragStartPosRef.current -= setWidth;
        targetXPosRef.current -= setWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${xPosRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    velocityRef.current = Math.max(-25, Math.min(25, velocityRef.current));
  };

  // Previous & Next step navigation
  const handlePrev = () => {
    const step = cardStepRef.current || 380;
    targetXPosRef.current = xPosRef.current + step;
    velocityRef.current = 0;
  };

  const handleNext = () => {
    const step = cardStepRef.current || 380;
    targetXPosRef.current = xPosRef.current - step;
    velocityRef.current = 0;
  };

  // Jump to specific slide dot
  const handleGoToIndex = (targetIndex: number) => {
    const step = cardStepRef.current || 380;
    let diff = targetIndex - activeCardIndex;
    if (diff > 2) diff -= 5;
    if (diff < -2) diff += 5;
    targetXPosRef.current = xPosRef.current - diff * step;
    velocityRef.current = 0;
  };

  const handleMouseEnter = () => {
    isPausedRef.current = true;
  };

  const handleMouseLeave = () => {
    if (!isPaused) {
      isPausedRef.current = false;
    }
  };

  const togglePause = () => {
    const next = !isPaused;
    setIsPaused(next);
    isPausedRef.current = next;
  };

  return (
    <section id="impacto" className="py-24 md:py-32 relative bg-[#050608] border-t border-white/[0.05] overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[radial-gradient(ellipse,rgba(0,229,255,0.04)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 mb-10 sm:mb-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                05 / Resultados
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Impacto en negocios reales.
            </h2>
          </div>

          {/* Interactive Navigation and Playback Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 text-xs text-zinc-500 font-mono mr-2">
              <MoveHorizontal className="w-3.5 h-3.5 text-cyan-400/80" />
              <span>Arrastra para navegar</span>
            </div>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Testimonio anterior"
              className="p-3 rounded-full border border-white/[0.1] bg-[#0c0e14] hover:bg-white/[0.08] hover:border-cyan-400/40 text-zinc-300 hover:text-white transition-all active:scale-95"
              title="Anterior"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Siguiente testimonio"
              className="p-3 rounded-full border border-white/[0.1] bg-[#0c0e14] hover:bg-white/[0.08] hover:border-cyan-400/40 text-zinc-300 hover:text-white transition-all active:scale-95"
              title="Siguiente"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Play/Pause Toggle */}
            <button
              onClick={togglePause}
              aria-label={isPaused ? 'Reanudar movimiento automático' : 'Pausar movimiento automático'}
              className="p-3 rounded-full border border-white/[0.1] bg-[#0c0e14] hover:bg-white/[0.08] hover:border-cyan-400/40 text-zinc-300 hover:text-white transition-all active:scale-95"
              title={isPaused ? 'Reanudar' : 'Pausar'}
            >
              {isPaused ? <Play className="w-4 h-4 text-cyan-400" /> : <Pause className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing py-3"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Left and Right Fade Edge Gradients */}
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-10 sm:w-24 md:w-36 bg-gradient-to-r from-[#050608] via-[#050608]/90 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-10 sm:w-24 md:w-36 bg-gradient-to-l from-[#050608] via-[#050608]/90 to-transparent z-20" />

        {/* Dynamic Continuous Hardware-Accelerated Track */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 w-max pl-4 sm:pl-8 will-change-transform"
        >
          {DISPLAY_OUTCOMES.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className={`w-[290px] min-[420px]:w-[350px] sm:w-[420px] shrink-0 p-5 sm:p-7 rounded-3xl bg-[#090b10] border ${
                isDragging ? 'border-white/[0.1]' : 'border-white/[0.08] hover:border-cyan-400/50'
              } transition-colors duration-200 flex flex-col justify-between group select-none`}
            >
              <div>
                {/* Metric Hero Block */}
                <div className="flex items-start justify-between pb-4 sm:pb-5 border-b border-white/[0.06] mb-4 pointer-events-none">
                  <div>
                    <span className="text-2xl sm:text-4xl font-black font-display text-white tracking-tight group-hover:text-cyan-300 transition-colors block">
                      {item.metric}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-mono-tech text-cyan-400 tracking-wide mt-1 block">
                      {item.metricLabel}
                    </span>
                  </div>

                  <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-white/[0.04] text-zinc-400 border border-white/[0.08]">
                    {item.verifiedYear}
                  </span>
                </div>

                {/* Service Tag */}
                <div className="flex items-center gap-2 mb-3 pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                  <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400">
                    {item.serviceType}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 italic pointer-events-none">
                  "{item.quote}"
                </p>
              </div>

              {/* Author & Company */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between pointer-events-none">
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-display text-white group-hover:text-cyan-200 transition-colors">
                    {item.client}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                    {item.role} • <span className="text-zinc-300 font-medium">{item.company}</span>
                  </p>
                </div>

                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-cyan-400/[0.06] border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 z-10 relative">
        {OUTCOMES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleGoToIndex(idx)}
            aria-label={`Ir al testimonio ${idx + 1}`}
            className={`transition-all duration-300 rounded-full h-1.5 ${
              activeCardIndex === idx
                ? 'w-7 bg-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.7)]'
                : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>

      {/* Bottom Proof Bar */}
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] font-mono-tech text-zinc-500 border-t border-white/[0.04] pt-6 relative z-10">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            MÉTRICAS AUDITADAS DE CLIENTES
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">100% PRODUCCIÓN ESTABLE</span>
        </div>

        <a
          href="#contacto"
          className="text-cyan-400 hover:text-white flex items-center gap-1 transition-colors uppercase tracking-wider text-[10px]"
        >
          <span>Elevar los resultados de tu negocio</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

    </section>
  );
};
