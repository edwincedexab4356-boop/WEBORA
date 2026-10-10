import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck, Clock, CheckCircle2, Phone, Instagram } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { TasteButton } from './TasteButton';
import { SectionProgressIndicator } from './SectionProgressIndicator';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Sitio Web para Negocio ($190 USD)');
  const [details, setDetails] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hola D.E.K NOVACORE, mi nombre es ${name || 'Cliente'} de ${company || 'mi negocio'}.\n\n` +
      `Me interesa cotizar: ${service}.\n` +
      (details ? `Detalles: ${details}\n\n` : '\n') +
      `¿Podemos conversar para revisar disponibilidad y cotización accesible?`;

    const url = `https://wa.me/50766952340?text=${encodeURIComponent(formatted)}`;
    setSentSuccess(true);
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-20 sm:py-28 md:py-32 relative bg-[#07090E] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,102,255,0.06)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading & Concept */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                <span className="text-xs font-mono tracking-widest text-[#00D2FF] uppercase font-semibold">
                  08 / Contacto Directo
                </span>
              </div>

              <SectionProgressIndicator
                sectionId="#contacto"
                readTime="~45s conexión"
                label="Contacto"
                variant="minimal"
              />
            </div>

            <h2 className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white leading-[1.04] mb-6">
              Conversemos sobre tu negocio.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              ¿Quieres un sitio web moderno, un catálogo interactivo con pedidos o renovar tu imagen en internet? Escríbenos directamente a WhatsApp o visítanos en Instagram. Precios justos, accesibles y trato directo.
            </p>

            {/* Direct Channels Cards: WhatsApp & Instagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
              {/* WhatsApp Card */}
              <a
                href="https://wa.me/50766952340?text=Hola%20D.E.K%20NOVACORE,%20quiero%20información%20y%20precios%20para%20un%20proyecto%20web."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0B0D12] border border-[#0066FF]/30 hover:border-[#0066FF] transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0066FF]/15 flex items-center justify-center text-[#00D2FF]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">WhatsApp Directo</span>
                    <span className="text-[11px] font-mono text-[#00D2FF]">66952340</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </a>

              {/* Instagram Card */}
              <a
                href="https://www.instagram.com/d.e.k.novacore/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#0B0D12] border border-white/[0.08] hover:border-[#0066FF] transition-all group flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] flex items-center justify-center text-[#00D2FF]">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block">Instagram Oficial</span>
                    <span className="text-[11px] font-mono text-zinc-400">@d.e.k.novacore</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </a>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.06] max-w-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <Clock className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                  <span>RESPUESTA RÁPIDA</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Te contestamos por WhatsApp en pocos minutos.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                  <span>PRECIOS ACCESIBLES</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Sin costos ocultos ni mensualidades infladas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 bg-[#0B0D12] border border-[#0066FF]/25 rounded-3xl p-5 sm:p-8 lg:p-10 shadow-2xl relative">
            <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#00D2FF] block mb-5 font-semibold">
              SOLICITA TU COTIZACIÓN PERSONALIZADA
            </span>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Tu nombre *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Ej. Roberto Gómez"
                    className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1.5">
                    Nombre de tu negocio
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Ej. Dulces & Sabores"
                    className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#0066FF] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1.5">
                  ¿Qué necesitas para tu negocio?
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-[#0066FF] transition-colors cursor-pointer"
                >
                  <option value="Sitio Web para Negocio ($190 USD)">Sitio Web para Negocio / Landing Page ($190 USD)</option>
                  <option value="Catálogo Digital WhatsApp ($280 USD)">Catálogo Digital con Pedidos WhatsApp ($280 USD)</option>
                  <option value="Sitio Completo / Tienda Online ($450 USD)">Sitio Web Completo / Tienda Online ($450 USD)</option>
                  <option value="Rediseño de Web Actual">Modernización de mi página actual</option>
                  <option value="Consulta Especial">Otra consulta o proyecto a medida</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Cuéntanos brevemente sobre tu negocio (opcional)
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Ej. Vendo postres/ropa/servicios y quiero que mis clientes hagan pedidos directo por WhatsApp al 66952340..."
                  className="w-full bg-[#07090E] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#0066FF] transition-colors resize-none"
                />
              </div>

              <TasteButton
                type="submit"
                variant="electric"
                size="lg"
                strength={8}
                icon={<ArrowUpRight className="w-4 h-4" />}
                iconPosition="right"
                className="w-full"
              >
                Enviar por WhatsApp a D.E.K NOVACORE
              </TasteButton>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00D2FF] text-xs text-center font-mono-tech flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF]" />
                  <span>Abriendo WhatsApp (66952340)...</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
