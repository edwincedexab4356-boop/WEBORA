import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck, Clock, CheckCircle2, Phone } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { SectionProgressIndicator } from './SectionProgressIndicator';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Sitio Web para Negocio');
  const [details, setDetails] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hola Novexa, mi nombre es ${name || 'Cliente'} de ${company || 'mi negocio'}.\n\n` +
      `Me interesa cotizar: ${service}.\n` +
      (details ? `Detalles: ${details}\n\n` : '\n') +
      `¿Podemos conversar para revisar disponibilidad y cotización?`;

    const url = `https://wa.me/50766952340?text=${encodeURIComponent(formatted)}`;
    setSentSuccess(true);
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-24 sm:py-32 md:py-36 relative bg-[#050608] border-t border-white/[0.05] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,229,255,0.05)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Concept */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono tracking-widest text-zinc-500 uppercase">
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
              ¿Quieres un sitio web moderno, un catálogo interactivo o renovar tu imagen digital? Escríbenos directamente a WhatsApp y te respondemos de inmediato con una cotización clara y sin compromiso.
            </p>

            {/* Direct WhatsApp Callout with Magnetic button */}
            <div className="mb-10 sm:mb-12 flex flex-col sm:flex-row sm:items-center gap-4">
              <MagneticButton strength={10} className="w-full sm:w-auto">
                <a
                  href="https://wa.me/50766952340?text=Hola%20Novexa,%20quiero%20información%20y%20precios%20para%20un%20proyecto%20web."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive="true"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] font-extrabold bg-[#00e5ff] text-black hover:bg-white transition-colors duration-300 shadow-[0_0_35px_rgba(0,229,255,0.35)] group"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Chatear al 66952340</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>

              <div className="flex flex-col">
                <span className="text-xs font-mono text-white font-bold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-cyan-400" />
                  66952340
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  WhatsApp (+507 6695-2340)
                </span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.06] max-w-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>RESPUESTA RÁPIDA</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Te respondemos directamente por WhatsApp en minutos.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>PRECIOS CLAROS</span>
                </div>
                <p className="text-[11px] text-zinc-400">
                  Sin costos sorpresa ni mensualidades abusivas.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 bg-[#090b10] border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
            <span className="text-xs font-mono-tech uppercase tracking-[0.2em] text-cyan-400 block mb-6">
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
                    className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
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
                    className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
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
                  className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="Sitio Web para Negocio">Sitio Web para mi Negocio ($190 USD)</option>
                  <option value="Catálogo Digital con WhatsApp">Catálogo Digital con WhatsApp ($280 USD)</option>
                  <option value="Tienda Online / Sitio Completo">Tienda Online / Sitio Web Completo ($450 USD)</option>
                  <option value="Rediseño de mi Web Actual">Rediseño y modernización de mi web actual</option>
                  <option value="Consulta General">Otra consulta o proyecto especial</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-400 block mb-1.5">
                  Cuéntanos un poco sobre tu idea (opcional)
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Ej. Vendo ropa/postres/servicios y quiero que los clientes me hagan pedidos directo por WhatsApp..."
                  className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <MagneticButton strength={6} className="w-full">
                <button
                  type="submit"
                  data-interactive="true"
                  className="w-full py-4 rounded-full text-center text-xs uppercase tracking-widest font-black bg-white text-black hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Enviar por WhatsApp a Novexa</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs text-center font-mono-tech flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
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
