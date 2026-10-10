import React, { useState, useMemo } from 'react';
import { ArrowUpRight, Check, Clock, Shield, Globe, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { TasteButton } from './TasteButton';
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
    name: 'Sitio Web para Negocio / Landing Page',
    badge: 'Presencia Digital',
    deliveryDays: '5 a 8 días hábiles',
    basePrice: 190,
    description: 'Diseño limpio y moderno, adaptado al 100% a celulares y tablets, con botones directos a tu WhatsApp (66952340) y carga ultra rápida.'
  },
  {
    id: 'catalog',
    name: 'Catálogo Digital + Pedidos WhatsApp',
    badge: 'El Más Solicitado',
    deliveryDays: '8 a 12 días hábiles',
    basePrice: 280,
    description: 'Catálogo interactivo con fotos de tus productos, categorías, selector de variantes y carrito que envía el pedido listo a tu WhatsApp.'
  },
  {
    id: 'system',
    name: 'Sitio Web Completo / Tienda Online',
    badge: 'Solución Integral',
    deliveryDays: '14 a 20 días hábiles',
    basePrice: 450,
    description: 'Plataforma completa de múltiples secciones, catálogo extendido o reservas, optimizada para buscadores y máxima conversión.'
  }
];

export interface CheapDomain {
  ext: string;
  category: string;
  badge: string;
  desc: string;
}

export const CHEAP_DOMAINS: CheapDomain[] = [
  { ext: '.store', category: 'Tiendas & Catálogos', badge: 'Ideal ventas', desc: 'Para catálogos, reposterías, moda y productos' },
  { ext: '.site', category: 'Todo Negocio', badge: 'Ultra económico', desc: 'La extensión más versátil y barata para cualquier negocio' },
  { ext: '.online', category: 'Presencia Activa', badge: 'Popular', desc: 'Indica presencia digital activa las 24 horas del día' },
  { ext: '.shop', category: 'Comercio Directo', badge: 'Compras', desc: 'Orientado 100% a venta de artículos y pedidos' },
  { ext: '.xyz', category: 'Moderna & Urbana', badge: 'Económico', desc: 'Corta, memorable y muy económica para marcas jóvenes' },
  { ext: '.website', category: 'Página Oficial', badge: 'Directo', desc: 'Presentación formal para servicios y profesionales' },
  { ext: '.space', category: 'Espacios & Creativos', badge: 'Creativo', desc: 'Para marcas creativas, estudios, diseño o fotografía' },
  { ext: '.tech', category: 'Servicios Técnicos', badge: 'Técnico', desc: 'Para talleres, servicios de soporte y tecnología' },
  { ext: '.club', category: 'Membresías', badge: 'Comunidad', desc: 'Para grupos deportivos, fitness o membresías' },
  { ext: '.fun', category: 'Recreación', badge: 'Dinámico', desc: 'Para marcas lúdicas, entretenimiento y eventos' },
];

interface AddonOption {
  id: string;
  label: string;
  price: number;
  description: string;
}

export const BudgetCalculator: React.FC = () => {
  const { playTick } = useSoundscape();
  const [selectedSolution, setSelectedSolution] = useState<string>('website');
  const [selectedDomainExt, setSelectedDomainExt] = useState<string>('.store');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['cloud_infra']);
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const currentDomainInfo = useMemo(() => {
    return CHEAP_DOMAINS.find(d => d.ext === selectedDomainExt) || CHEAP_DOMAINS[0];
  }, [selectedDomainExt]);

  const sanitizedBizName = useMemo(() => {
    if (!companyName.trim()) return 'tunegocio';
    return companyName.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  }, [companyName]);

  const previewDomain = `${sanitizedBizName}${selectedDomainExt}`;

  const addons: AddonOption[] = useMemo(() => [
    {
      id: 'cloud_infra',
      label: `Dominio Económico (${selectedDomainExt}) + Hosting Rápido (1 año)`,
      price: 35,
      description: `Tu dominio propio con extensión económica, servidores en la nube de alta velocidad y certificado SSL seguro.`
    },
    {
      id: 'corporate_mail',
      label: 'Correo Profesional Oficial',
      price: 25,
      description: `Buzón formal vinculado a tu web (ej. contacto@${previewDomain}).`
    },
    {
      id: 'seo_engine',
      label: 'Posicionamiento en Google Maps & Búsquedas',
      price: 35,
      description: 'Configuración para que clientes locales encuentren tu negocio fácilmente en Google.'
    },
    {
      id: 'payments',
      label: 'Pasarela de Pagos con Tarjeta',
      price: 60,
      description: 'Integración para aceptar cobros en línea de forma segura con tarjeta de crédito o débito.'
    }
  ], [selectedDomainExt, previewDomain]);

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const currentSolution = useMemo(() => {
    return SOLUTIONS.find(s => s.id === selectedSolution) || SOLUTIONS[0];
  }, [selectedSolution]);

  const currentAddonsList = useMemo(() => {
    return addons.filter(a => selectedAddons.includes(a.id));
  }, [addons, selectedAddons]);

  const totalEstimate = useMemo(() => {
    const addonsTotal = currentAddonsList.reduce((acc, curr) => acc + curr.price, 0);
    return currentSolution.basePrice + addonsTotal;
  }, [currentSolution, currentAddonsList]);

  const whatsappInquiryUrl = useMemo(() => {
    const addonNames = currentAddonsList.map(a => a.label).join(', ');
    const greeting = clientName ? `Hola D.E.K NOVACORE, mi nombre es ${clientName}` : 'Hola D.E.K NOVACORE';
    const biz = companyName ? ` para mi negocio ${companyName}` : '';
    
    const message = `${greeting}. Calculé un presupuesto accesible en su cotizador${biz}:\n\n` +
      `▪ *Plan:* ${currentSolution.name}\n` +
      `▪ *Tiempo de entrega:* ${currentSolution.deliveryDays}\n` +
      `▪ *Dominio económico:* ${selectedDomainExt} (${previewDomain})\n` +
      `▪ *Adicionales:* ${addonNames || 'Ninguno'}\n` +
      `▪ *Total estimado:* $${totalEstimate} USD\n\n` +
      `¿Podemos revisar los detalles para empezar mi proyecto?`;

    return `https://wa.me/50766952340?text=${encodeURIComponent(message)}`;
  }, [clientName, companyName, currentSolution, selectedDomainExt, previewDomain, currentAddonsList, totalEstimate]);

  return (
    <section id="cotizador" className="py-20 sm:py-28 md:py-32 relative bg-[#07090E] border-t border-white/[0.06]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
              <span className="text-xs font-mono tracking-widest text-[#00D2FF] uppercase font-semibold">
                07 / Presupuesto Accesible Para Todos
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
              Calcula tu proyecto.
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <SectionProgressIndicator
              sectionId="#cotizador"
              readTime="~1 min"
              label="Cotizador"
              variant="badge"
            />
            <p className="text-zinc-400 text-xs sm:text-sm max-w-[380px] leading-relaxed">
              Precios sumamente económicos, dominios baratos (.store, .site, .online) y sin tarifas excesivas.
            </p>
          </div>
        </div>

        {/* Highlight Banner: No Expensive Domains Rule (.com, .net, .org excluded) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/30 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-[#00D2FF] shrink-0 mt-0.5" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Política de Dominios Baratos: Máximo Ahorro
                </span>
                <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-[#00D2FF] border border-[#0066FF]/40 font-semibold">
                  SIN SOBRECOSTOS
                </span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                <strong className="text-white">No utilizamos .com, .net ni .org</strong> por sus precios inflados. Implementamos extensiones modernas y mucho más económicas como <strong className="text-[#00D2FF]">.store</strong>, <strong className="text-[#00D2FF]">.site</strong>, <strong className="text-[#00D2FF]">.online</strong>, <strong className="text-[#00D2FF]">.shop</strong>, <strong className="text-[#00D2FF]">.xyz</strong>, permitiéndote tener tu marca en la web con el menor costo posible.
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-[#0066FF]/30 text-xs font-mono text-[#00D2FF]">
            <span>Tu web:</span>
            <span className="text-white font-bold">{previewDomain}</span>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Step 1: Solution */}
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block mb-3 font-semibold">
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
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-200 relative touch-pan-y active:scale-[0.985] ${
                        isSelected
                          ? 'bg-[#0E1320] border-[#0066FF] shadow-[0_0_25px_rgba(0,102,255,0.2)]'
                          : 'bg-[#0B0D12] border-white/[0.08] hover:border-white/[0.2]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[9px] sm:text-[10px] font-mono-tech uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#0066FF]/15 text-[#00D2FF] border border-[#0066FF]/30 font-semibold">
                          {sol.badge}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-base sm:text-lg font-mono-tech text-white font-black">
                            ${sol.basePrice}
                          </span>
                          <span className="text-zinc-400 text-xs font-mono">USD</span>
                        </div>
                      </div>

                      <h4 className="text-base sm:text-lg font-bold font-display text-white mb-1">
                        {sol.name}
                      </h4>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                        {sol.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono-tech text-zinc-400">
                        <Clock className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                        <span>Entrega lista en: {sol.deliveryDays}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Choose Cheap Domain Extension */}
            <div className="bg-[#0B0D12] border border-white/[0.08] rounded-2xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block font-semibold">
                  02 // SELECCIONA TU DOMINIO BARATO
                </span>
                <span className="text-[10px] font-mono-tech text-zinc-400">
                  Excluimos .com / .net / .org por economía
                </span>
              </div>

              <div className="grid grid-cols-2 min-[480px]:grid-cols-3 sm:grid-cols-5 gap-2 mb-4">
                {CHEAP_DOMAINS.map(d => {
                  const isChosen = selectedDomainExt === d.ext;
                  return (
                    <button
                      key={d.ext}
                      type="button"
                      onClick={() => {
                        playTick();
                        setSelectedDomainExt(d.ext);
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isChosen
                          ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                          : 'bg-black/40 border-white/[0.08] text-zinc-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-mono text-xs font-black tracking-wide">
                        {d.ext}
                      </div>
                      <div className={`text-[9px] truncate ${isChosen ? 'text-white/80' : 'text-zinc-500'}`}>
                        {d.badge}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-white mr-1.5">{currentDomainInfo.ext}:</span>
                  <span className="text-zinc-400 text-[11px]">{currentDomainInfo.desc}</span>
                </div>
                <span className="text-[10px] font-mono-tech text-[#00D2FF] uppercase shrink-0 ml-2">
                  TARIFAS BAJAS
                </span>
              </div>
            </div>

            {/* Step 3: Addons */}
            <div>
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block mb-3 font-semibold">
                03 // OPCIONALES ACCESIBLES
              </span>

              <div className="space-y-2.5">
                {addons.map(addon => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => {
                        playTick();
                        toggleAddon(addon.id);
                      }}
                      className={`p-3.5 sm:p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#0E1320] border-[#0066FF]/60 text-white'
                          : 'bg-[#0B0D12] border-white/[0.06] text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                          isChecked ? 'bg-[#0066FF] border-[#0066FF] text-white' : 'border-zinc-600 bg-transparent'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-white">
                            {addon.label}
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {addon.description}
                          </div>
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold text-[#00D2FF] shrink-0">
                        +${addon.price} USD
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-[#0B0D12] border border-[#0066FF]/30 rounded-3xl p-5 sm:p-7 shadow-2xl sticky top-28">
            <span className="text-[10px] font-mono-tech uppercase tracking-[0.25em] text-[#00D2FF] block mb-4 font-semibold">
              RESUMEN DE ESTIMACIÓN
            </span>

            {/* Client Inputs for personalized WhatsApp link */}
            <div className="space-y-3 mb-6 pb-6 border-b border-white/[0.08]">
              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1">
                  Tu nombre (opcional)
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  placeholder="Ej. Andrés Martínez"
                  className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#0066FF]"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1">
                  Nombre de tu negocio
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  placeholder="Ej. Ropa & Estilo"
                  className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#0066FF]"
                />
              </div>
            </div>

            {/* Selected Plan breakdown */}
            <div className="space-y-2 mb-6 text-xs text-zinc-300">
              <div className="flex justify-between items-center py-1">
                <span>{currentSolution.name}</span>
                <span className="font-mono font-bold text-white">${currentSolution.basePrice}</span>
              </div>

              <div className="flex justify-between items-center py-1 text-zinc-400">
                <span>Dominio económico ({selectedDomainExt})</span>
                <span className="font-mono text-[#00D2FF]">Incluido / Tarifa baja</span>
              </div>

              {currentAddonsList.map(a => (
                <div key={a.id} className="flex justify-between items-center py-1 text-zinc-400">
                  <span className="truncate pr-2">{a.label}</span>
                  <span className="font-mono font-semibold text-white">+${a.price}</span>
                </div>
              ))}
            </div>

            {/* Total Price */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] mb-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-tech uppercase tracking-widest text-zinc-400 block">
                  PRECIO TOTAL ESTIMADO
                </span>
                <span className="text-2xl sm:text-3xl font-black font-display text-white">
                  ${totalEstimate} <span className="text-xs font-mono font-normal text-zinc-400">USD</span>
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#0066FF]/15 text-[#00D2FF] border border-[#0066FF]/35 font-semibold">
                  PRECIO ACCESIBLE
                </span>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <TasteButton
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="electric"
              size="lg"
              strength={10}
              icon={<ArrowUpRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full"
            >
              Consultar por WhatsApp (66952340)
            </TasteButton>

            <p className="text-[10px] text-zinc-500 text-center font-mono-tech mt-3">
              Sin compromisos • Contacto directo con D.E.K NOVACORE
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
