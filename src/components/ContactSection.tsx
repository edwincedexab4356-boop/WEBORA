import React, { useState } from 'react';
import { ArrowUpRight, MessageSquare, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('Sitio Web');
  const [details, setDetails] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = `Hola Webora, mi nombre es ${name || 'Cliente'} de ${company || 'mi empresa'}.\n\n` +
      `Estoy interesado en el desarrollo de: ${service}.\n` +
      (details ? `Requerimientos principales: ${details}\n\n` : '\n') +
      `¿Podemos coordinar para dar inicio al proyecto?`;

    const url = `https://wa.me/50760000000?text=${encodeURIComponent(formatted)}`;
    setSentSuccess(true);
    window.open(url, '_blank');
  };

  return (
    <section id="contacto" className="py-28 md:py-40 relative bg-[#050608] border-t border-white/[0.05] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(0,229,255,0.05)_0%,transparent_70%)] blur-[120px] pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-6 sm:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading & Concept */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span className="text-[11px] font-mono-tech tracking-[0.3em] uppercase text-cyan-400">
                INICIAR COLABORACIÓN
              </span>
            </div>

            <h2 className="text-3xl min-[380px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-display tracking-tight text-white leading-[1.04] mb-6">
              Hablemos de tu próximo gran salto.
            </h2>

            <p className="text-zinc-400 text-sm sm:text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              Webora convierte ideas de negocios en experiencias digitales de alto impacto. Cuéntanos tu visión y definamos el camino técnico ideal.
            </p>

            {/* Direct WhatsApp Callout with Magnetic button */}
            <div className="mb-10 sm:mb-12">
              <MagneticButton strength={10} className="w-full sm:w-auto">
                <a
                  href="https://wa.me/50760000000?text=Hola%20Webora,%20quiero%20información%20sobre%20el%20desarrollo%20de%20un%20proyecto%20digital."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-interactive="true"
                  className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs uppercase tracking-[0.25em] font-extrabold bg-[#00e5ff] text-black hover:bg-white transition-colors duration-300 shadow-[0_0_35px_rgba(0,229,255,0.35)] group"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Conversar por WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </MagneticButton>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.06] max-w-md">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>RESPUESTA ÁGIL</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Respuesta técnica en menos de 2 horas hábiles.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-mono-tech text-white">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>CONFIDENCIALIDAD</span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Protección de propiedad intelectual garantizada.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-6 bg-[#090b10] border border-white/[0.08] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative">
            <span className="text-xs font-mono-tech uppercase tracking-[0.25em] text-zinc-400 block mb-6">
              SOLICITAR PROPUESTA TÉCNICA
            </span>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1.5">
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
                  <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1.5">
                    Empresa o negocio
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="Ej. Gómez & Co."
                    className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1.5">
                  Tipo de solución requerida
                </label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors cursor-pointer"
                >
                  <option value="Sitio Web">Sitio Web Corporativo</option>
                  <option value="Catálogo Digital">Catálogo Digital con WhatsApp</option>
                  <option value="Sistema a Medida">Sistema a Medida / Panel Administrativo</option>
                  <option value="Rediseño Completo">Rediseño & Modernización de Marca</option>
                  <option value="Consultoría Técnica">Consultoría de Arquitectura Digital</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono-tech uppercase tracking-wider text-zinc-500 block mb-1.5">
                  Detalles del proyecto (opcional)
                </label>
                <textarea
                  rows={4}
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  placeholder="Cuéntanos brevemente objetivos, referencias o plazos que tengas en mente..."
                  className="w-full bg-[#050608] border border-white/[0.1] rounded-xl px-4 py-3 sm:py-2.5 text-base sm:text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                />
              </div>

              <MagneticButton strength={6} className="w-full">
                <button
                  type="submit"
                  data-interactive="true"
                  className="w-full py-4 rounded-full text-center text-xs uppercase tracking-widest font-black bg-white text-black hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Enviar Requerimiento</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </MagneticButton>

              {sentSuccess && (
                <div className="p-3 rounded-xl bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 text-xs text-center font-mono-tech flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Mensaje transferido a WhatsApp exitosamente.</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
