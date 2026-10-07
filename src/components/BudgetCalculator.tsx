import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Clock, Shield } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useSoundscape } from '../context/SoundscapeContext';
import { SectionProgressIndicator } from './SectionProgressIndicator';

interface SolutionOption {
  id: string;
  name: string;
  badge: string;
  deliveryDays: string;
  basePrice: number;
  description: string;
}

const SOLUTIONS: SolutionOption[] = [
  {
    id: 'website',
    name: 'Sitio Web para Negocio',
    badge: 'Presencia & Confianza',
    deliveryDays: '5 a 8 días hábiles',
    basePrice: 190,
    description: 'Diseño limpio y moderno, adaptado a celulares, optimizado para cargar en menos de un segundo y con botón directo a WhatsApp.'
  },
  {
    id: 'catalog',
    name: 'Catálogo Digital + WhatsApp',
    badge: 'Más Solicitado',
    deliveryDays: '7 a 10 días hábiles',
    basePrice: 280,
    description: 'Catálogo visual de tus productos con fotos, categorías, precios y carrito que genera el pedido formateado a tu WhatsApp.'
  },
  {
    id: 'system',
    name: 'Sitio Web Completo / Tienda Online',
    badge: 'Solución Integral',
    deliveryDays: '12 a 18 días hábiles',
    basePrice: 450,
    description: 'Plataforma con múltiples páginas, reservas o catálogo extendido, panel de administración y optimización para Google.'
  }
];

interface AddonOption {
  id: string;
  label: string;
  price: number;
  description: string;
}

const ADDONS: AddonOption[] = [
  {
    id: 'cloud_infra',
    label: 'Dominio .com y Alojamiento Rápido (1 año)',
    price: 35,
    description: 'Tu dominio propio (.com) con servidores en la nube de alta velocidad y certificado SSL seguro.'
  },
  {
    id: 'corporate_mail',
    label: 'Correo Corporativo Oficial',
    price: 25,
    description: 'Buzón profesional vinculado a tu web (ej. contacto@tunegocio.com) para máxima formalidad.'
  },
  {
    id: 'seo_engine',
    label: 'Posicionamiento en Google Maps & Búsquedas',
    price: 40,
    description: 'Configuración para que clientes locales encuentren tu negocio fácilmente en Google.'
  },
  {
    id: 'payments',
    label: 'Pasarela de Pagos con Tarjeta',
    price: 50,
    description: 'Integración para aceptar cobros en línea de forma segura con tarjeta de crédito o débito.'
  }
];

export const BudgetCalculator: React.FC = () => {
  const { playTick } = useSoundscape();
  const [selectedSolution, setSelectedSolution] = useState<string>('website');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['cloud_infra']);
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const currentSolution = useMemo(() => {
    return SOLUTIONS.find(s => s.id === selectedSolution) || SOLUTIONS[0];
  }, [selectedSolution]);

  const currentAddonsList = useMemo(() => {
    return ADDONS.filter(a => selectedAddons.includes(a.id));
  }, [selectedAddons]);

  const totalEstimate = useMemo(() => {
    const addonsTotal = currentAddonsList.reduce((acc, curr) => acc + curr.price, 0);
    return currentSolution.basePrice + addonsTotal;
  }, [currentSolution, currentAddonsList]);

  const whatsappInquiryUrl = useMemo(() => {
    const addonNames = currentAddonsList.map(a => a.label).join(', ');
    const greeting = clientName ? `Hola Novexa, mi nombre es ${clientName}` : 'Hola Novexa';
    const biz = companyName ? ` para mi negocio ${companyName}` : '';
    
    const message = `${greeting}. Calculé un presupuesto en su sitio web${biz}:\n\n` +
      `▪ *Plan:* ${currentSolution.name}\n` +
      `▪ *Tiempo de entrega:* ${currentSolution.deliveryDays}\n` +
      `▪ *Adicionales:* ${addonNames || 'Ninguno'}\n` +
      `▪ *Presupuesto estimado:* $${totalEstimate} USD\n\n` +
      `¿Podemos conversar por WhatsApp para revisar detalles y comenzar?`;

    return `https://wa.me/50766952340?text=${encodeURIComponent(message)}`;
  }, [clientName, companyName, currentSolution, currentAddonsList, totalEstimate]);

  return (
    <section id="cotizador" className="py-24 sm:py-32 md:py-36 relative bg-[#050608] border-t border-white/[0.05]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
                07 / Presupuesto Transparente
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Calcula tu proyecto.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <SectionProgressIndicator
              sectionId="#cotizador"
              readTime="~1.5 min de lectura"
              label="Cotizador"
              variant="badge"
            />
            <p className="text-zinc-400 text-sm sm:text-base max-w-[400px] leading-relaxed">
              Precios accesibles, tiempos de entrega garantizados y sin costos ocultos.
            </p>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Solution */}
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-cyan-400 block mb-4">
                01 // ELIGE EL PLAN PARA TU NEGOCIO
              </span>

              <div className="space-y-3">
                {SOLUTIONS.map(sol => {
                  const isSelected = selectedSolution === sol.id;
                  return (
                    <div
                      key={sol.id}
                      onClick={() => {
                        playTick();
                        setSelectedSolution(sol.id);
                      }}
                      data-interactive="true"
                      className={`p-4 sm:p-6 rounded-2xl border cursor-pointer transition-all duration-300 relative touch-pan-y active:scale-[0.985] ${
                        isSelected
                          ? 'bg-[#0d1017] border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.12)]'
                          : 'bg-[#090b10] border-white/[0.08] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                          {sol.badge}
                        </span>
                        <span className="text-sm font-mono-tech text-white font-bold">
                          ${sol.basePrice} <span className="text-zinc-400 text-xs">USD</span>
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold font-display text-white mb-1">
                        {sol.name}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                        {sol.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-tech text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Entrega lista en: {sol.deliveryDays}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Addons */}
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-cyan-400 block mb-4">
                02 // COMPONENTES OPCIONALES
              </span>

              <div className="space-y-2.5">
                {ADDONS.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => {
                        playTick();
                        toggleAddon(addon.id);
                      }}
                      data-interactive="true"
                      className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-center justify-between gap-3 sm:gap-4 touch-pan-y active:scale-[0.985] ${
                        isChecked
                          ? 'bg-[#0d1017] border-cyan-400/60'
                          : 'bg-[#090b10] border-white/[0.06] hover:border-white/[0.15]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <div
                          className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center transition-colors shrink-0 ${
                            isChecked
                              ? 'bg-cyan-400 border-cyan-400 text-black'
                              : 'border-white/20 bg-white/[0.02]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-white block">
                            {addon.label}
                          </span>
                          <span className="text-[10px] sm:text-[11px] text-zinc-400">
                            {addon.description}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs font-mono-tech text-cyan-400 font-bold shrink-0">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact inputs for the WhatsApp message */}
            <div className="bg-[#090b10] border border-white/[0.08] rounded-2xl p-5 sm:p-6">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-zinc-300 block mb-3">
                TUS DATOS PARA EL MENSAJE DE WHATSAPP (OPCIONAL)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={e => setClientName(e.target.value)}
                    placeholder="Ej. Carlos"
                    className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1">
                    Nombre de tu negocio
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="Ej. Mi Tienda"
                    className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Summary Card */}
          <div className="lg:col-span-5 lg:sticky top-28">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#090b10] border border-white/[0.1] shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
                <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-zinc-300">
                  RESUMEN DE ESTIMACIÓN
                </span>
                <span className="text-[10px] font-mono-tech uppercase px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                  PRECIO CLARO
                </span>
              </div>

              {/* Selected plan */}
              <div className="space-y-4 pb-6 border-b border-white/[0.06]">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white font-display">
                    {currentSolution.name}
                  </span>
                  <span className="text-sm font-mono-tech text-white font-bold">
                    ${currentSolution.basePrice} USD
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono-tech flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Plazo de entrega: {currentSolution.deliveryDays}</span>
                </div>
              </div>

              {/* Addons breakdown */}
              <div className="py-6 border-b border-white/[0.06] space-y-2.5">
                <span className="text-[11px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-2">
                  Adicionales seleccionados ({currentAddonsList.length}):
                </span>
                {currentAddonsList.length === 0 ? (
                  <span className="text-xs text-zinc-600 italic">Sin adicionales seleccionados</span>
                ) : (
                  currentAddonsList.map(a => (
                    <div key={a.id} className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 truncate pr-2">{a.label}</span>
                      <span className="text-zinc-300 font-mono-tech shrink-0 font-medium">+${a.price}</span>
                    </div>
                  ))
                )}
              </div>

              {/* Total display */}
              <div className="pt-6 pb-8">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-mono-tech">
                    Inversión estimada:
                  </span>
                  <div className="text-right">
                    <span className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight">
                      ${totalEstimate}
                    </span>
                    <span className="text-xs font-mono-tech text-cyan-400 block font-bold">USD</span>
                  </div>
                </div>

                <div className="mt-4 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-start gap-2.5 text-xs text-zinc-400">
                  <Shield className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    Sitio 100% de tu propiedad, soporte directo y entrega puntual garantizada.
                  </span>
                </div>
              </div>

              {/* Magnetic Action */}
              <MagneticButton strength={8} className="w-full">
                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive="true"
                  className="w-full py-4 rounded-full text-center text-xs uppercase tracking-widest font-black bg-white text-black hover:bg-cyan-400 transition-colors shadow-[0_0_25px_rgba(255,255,255,0.2)] flex items-center justify-center gap-2 group"
                >
                  <span>Enviar Presupuesto a WhatsApp (66952340)</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>

              <span className="text-[10px] font-mono-tech text-zinc-500 block text-center mt-3">
                WhatsApp directo: 66952340 • Atención inmediata
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
