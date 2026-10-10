import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, CheckCircle, ExternalLink, Lock, AlertCircle, Scale } from 'lucide-react';
import { WeboraLogo } from './WeboraLogo';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'privacy' | 'terms';
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'privacy',
}) => {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop with carbon blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#050608]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0B0D12] border border-[#0066FF]/30 rounded-2xl sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-zinc-300"
          >
            {/* Modal Header */}
            <div className="px-5 sm:px-8 py-5 border-b border-white/[0.08] flex items-center justify-between bg-[#08090D] shrink-0">
              <div className="flex items-center gap-3">
                <WeboraLogo size={32} showText={true} />
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Cerrar modal legal"
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-5 sm:px-8 py-3 bg-[#0c0f17] border-b border-white/[0.06] shrink-0">
              <button
                onClick={() => setActiveTab('privacy')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'privacy'
                    ? 'bg-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>POLÍTICA DE PRIVACIDAD</span>
              </button>

              <button
                onClick={() => setActiveTab('terms')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeTab === 'terms'
                    ? 'bg-[#0066FF] text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]'
                    : 'bg-white/[0.03] text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>TÉRMINOS Y CONDICIONES</span>
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-300">
              {activeTab === 'privacy' ? (
                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div className="pb-4 border-b border-white/[0.08]">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00D2FF] text-[10px] font-mono-tech mb-2">
                      <Lock className="w-3 h-3" />
                      <span>DOCUMENTO LEGAL OFICIAL // PROTECCIÓN DE DATOS</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                      Política de Privacidad y Tratamiento de Datos
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Última actualización: Octubre de 2026. Aplicable a clientes, usuarios y prospectos comerciales de D.E.K NOVACORE — DIGITAL SOLUTIONS.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">01.</span> Identidad del Responsable del Tratamiento
                    </h3>
                    <p>
                      El responsable del tratamiento de los datos suministrados a través de este portal, cotizaciones y enlaces oficiales de comunicación es <strong>D.E.K NOVACORE — DIGITAL SOLUTIONS</strong>, con canal de atención directa a través de WhatsApp oficial <strong>66952340 (+507 6695-2340)</strong> y perfil de Instagram <strong>@d.e.k.novacore</strong> (<a href="https://www.instagram.com/d.e.k.novacore/" target="_blank" rel="noopener noreferrer" className="text-[#00D2FF] underline">instagram.com/d.e.k.novacore</a>).
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">02.</span> Datos que Recopilamos
                    </h3>
                    <p className="mb-2">
                      Recopilamos exclusivamente los datos necesarios y pertinentes para estructurar presupuestos, coordinar el desarrollo técnico y entregar proyectos web y catálogos:
                    </p>
                    <ul className="list-disc list-inside space-y-1.5 text-zinc-400 pl-2">
                      <li><strong className="text-zinc-200">Datos de identificación y contacto:</strong> Nombre y apellidos, teléfono de contacto y cuenta de WhatsApp.</li>
                      <li><strong className="text-zinc-200">Datos del negocio o proyecto:</strong> Nombre de la marca, giro comercial, catálogo de productos, fotografías, lista de precios e información que el cliente desea publicar.</li>
                      <li><strong className="text-zinc-200">Preferencias de configuración:</strong> Elección de nombre de dominio accesible (.store, .site, .online, .shop, etc.) y especificaciones funcionales solicitadas.</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">03.</span> Finalidad del Tratamiento
                    </h3>
                    <p>
                      La información proporcionada se utiliza con el único propósito de:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="font-semibold text-white block mb-1">Presupuestos y Consultas</span>
                        <p className="text-xs text-zinc-400">Responder solicitudes de cálculo de presupuesto enviadas a WhatsApp al número 66952340.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                        <span className="font-semibold text-white block mb-1">Ejecución del Servicio</span>
                        <p className="text-xs text-zinc-400">Diseño, programación, despliegue y puesta en marcha de la página web o catálogo interactivo acordado.</p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">04.</span> Enlaces a Terceros y Plataformas Externas
                    </h3>
                    <p>
                      Nuestra web facilita la comunicación directa mediante enlaces a aplicaciones externas como <strong>WhatsApp</strong> (Meta Platforms) e <strong>Instagram</strong> (<a href="https://www.instagram.com/d.e.k.novacore/" target="_blank" rel="noopener noreferrer" className="text-[#00D2FF] underline">@d.e.k.novacore</a>), así como enlaces a proyectos reales desplegados en <strong>Vercel</strong>. Al hacer clic en estos enlaces, el tratamiento de sus datos se rige por las políticas de privacidad de dichas plataformas.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">05.</span> Derechos del Usuario (ARCO)
                    </h3>
                    <p>
                      Usted conserva en todo momento el derecho de acceder, rectificar, limitar o solicitar la eliminación total de sus datos de nuestros registros de contacto. Para ejercer estos derechos, simplemente envíe un mensaje a nuestro WhatsApp oficial <strong>66952340</strong> o contáctenos vía mensaje directo en Instagram.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Title & Badge */}
                  <div className="pb-4 border-b border-white/[0.08]">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0066FF]/15 border border-[#0066FF]/30 text-[#00D2FF] text-[10px] font-mono-tech mb-2">
                      <Scale className="w-3 h-3" />
                      <span>MARCO LEGAL VINCULANTE // CONDICIONES DE CONTRATACIÓN</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black font-display text-white">
                      Términos y Condiciones del Servicio
                    </h2>
                    <p className="text-xs text-zinc-400 mt-1">
                      Normas que regulan la prestación de servicios digitales, diseño y desarrollo web de D.E.K NOVACORE — DIGITAL SOLUTIONS.
                    </p>
                  </div>

                  {/* Section 1 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">01.</span> Alcance de los Servicios
                    </h3>
                    <p>
                      <strong>D.E.K NOVACORE — DIGITAL SOLUTIONS</strong> ofrece servicios profesionales de diseño web, catálogos digitales interactivos con integración a WhatsApp y tiendas virtuales accesibles para emprendedores y empresas. Cada propuesta incluye las funcionalidades explícitamente detalladas en la cotización confirmada por el cliente.
                    </p>
                  </div>

                  {/* Section 2 - DOMAINS POLICY */}
                  <div className="p-4 rounded-2xl bg-[#0066FF]/10 border border-[#0066FF]/30">
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-[#00D2FF]" />
                      <span>02. Política de Nombres de Dominio y Extensiones Económicas</span>
                    </h3>
                    <p className="text-zinc-300">
                      En concordancia con nuestro modelo de precios accesibles para todo público, <strong>no comercializamos ni suministramos dominios de alta tarifa como .com, .net ni .org</strong>. En su lugar, todos nuestros planes incorporan exclusivamente <strong>extensiones económicas y modernas</strong> tales como:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {['.store', '.site', '.online', '.shop', '.xyz', '.website', '.space', '.tech', '.club', '.fun'].map((ext) => (
                        <span key={ext} className="px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-white font-mono-tech text-[11px] font-bold">
                          {ext}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-zinc-400 mt-2.5">
                      Estas extensiones ofrecen excelente memorabilidad, idéntica compatibilidad con buscadores y un costo de registro y renovación sustancialmente más bajo.
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">03.</span> Precios Accesibles, Cotizaciones y Pagos
                    </h3>
                    <p>
                      Los valores estimados mediante el cotizador web son referenciales y transparentes. La contratación formal se confirma a través de nuestro canal de WhatsApp <strong>66952340</strong>. Las modalidades habituales operan bajo anticipo del 50% al inicio y el 50% restante contra entrega y verificación del sitio en vivo.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">04.</span> Propiedad Intelectual y Entregables
                    </h3>
                    <p>
                      Una vez cancelado el 100% de los honorarios correspondientes al proyecto, el cliente adquiere la titularidad sobre los contenidos específicos, imágenes propias y el sitio web entregado. <strong>D.E.K NOVACORE</strong> conserva el derecho de exhibir el sitio web resultante en su portafolio comercial de casos reales (como los exhibidos en dulzuras-de-belgis y gorras-de-alex).
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-[#00D2FF] font-mono-tech">05.</span> Garantía y Soporte Técnico
                    </h3>
                    <p>
                      Todos los proyectos cuentan con garantía de corrección técnica frente a anomalías de funcionamiento durante 30 días posteriores al lanzamiento, así como asesoría directa por WhatsApp al <strong>66952340</strong>.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-5 sm:px-8 py-4 bg-[#08090D] border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] font-mono-tech text-zinc-500 text-center sm:text-left">
                D.E.K NOVACORE — DIGITAL SOLUTIONS • WhatsApp: 66952340
              </span>

              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0066FF] hover:bg-[#0052cc] text-white transition-colors cursor-pointer shadow-[0_0_15px_rgba(0,102,255,0.3)]"
              >
                Entendido y de Acuerdo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
