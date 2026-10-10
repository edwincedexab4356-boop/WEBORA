import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Sparkles, Building2, User, FileText, CheckCircle2 } from 'lucide-react';
import { useWhatsAppModal } from '../context/WhatsAppModalContext';
import { useSoundscape } from '../context/SoundscapeContext';
import { TasteButton } from './TasteButton';
import { WeboraLogo } from './WeboraLogo';

const BUSINESS_TYPE_SUGGESTIONS = [
  'Pastelería / Repostería',
  'Ropa / Streetwear / Moda',
  'Restaurante / Comida rápida',
  'Barbería / Salón de belleza',
  'Servicios profesionales',
  'Tienda de accesorios',
  'Emprendimiento digital',
  'Otro negocio',
];

export const WhatsAppConsultModal: React.FC = () => {
  const { isOpen, initialData, closeConsultation } = useWhatsAppModal();
  const { playTick } = useSoundscape();

  const [name, setName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [specs, setSpecs] = useState('');
  const [errors, setErrors] = useState<{ name?: string; businessType?: string; specs?: string }>({});
  const [sentSuccess, setSentSuccess] = useState(false);

  // Sync initialData when modal opens
  useEffect(() => {
    if (isOpen) {
      setName(initialData.clientName || '');
      setBusinessType(initialData.businessType || '');
      setSpecs(initialData.specs || '');
      setErrors({});
      setSentSuccess(false);
    }
  }, [isOpen, initialData]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeConsultation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeConsultation]);

  const validate = () => {
    const newErrors: { name?: string; businessType?: string; specs?: string } = {};
    if (!name.trim()) {
      newErrors.name = 'Por favor ingresa tu nombre o el de tu persona de contacto';
    }
    if (!businessType.trim()) {
      newErrors.businessType = 'Por favor indica qué tipo de negocio tienes o planeas crear';
    }
    if (!specs.trim() || specs.trim().length < 5) {
      newErrors.specs = 'Cuéntanos algunas especificaciones sobre lo que necesitas (mínimo 5 caracteres)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validate()) {
      playTick();
      return;
    }

    playTick();
    setSentSuccess(true);

    const messageLines: string[] = [
      '👋 *HOLA D.E.K NOVACORE — DIGITAL SOLUTIONS*',
      '',
      `👤 *Nombre:* ${name.trim()}`,
      `🏢 *Tipo de Negocio:* ${businessType.trim()}`,
      '',
      '📋 *Especificaciones del Proyecto:*',
      specs.trim(),
    ];

    if (initialData.serviceName || initialData.priceEstimate) {
      messageLines.push('');
      messageLines.push('💰 *Referencia de servicio / presupuesto:*');
      if (initialData.serviceName) {
        messageLines.push(`• Solución: ${initialData.serviceName}`);
      }
      if (initialData.priceEstimate) {
        messageLines.push(`• Estimado: ${initialData.priceEstimate}`);
      }
      if (initialData.breakdown) {
        messageLines.push(`• Desglose: ${initialData.breakdown}`);
      }
    }

    messageLines.push('');
    messageLines.push('¿Podemos revisar la cotización y los detalles por aquí? ¡Muchas gracias!');

    const fullMessage = messageLines.join('\n');
    const waUrl = `https://wa.me/50766952340?text=${encodeURIComponent(fullMessage)}`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      setTimeout(() => {
        closeConsultation();
      }, 500);
    }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          {/* Backdrop blur with dark carbon scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeConsultation}
            className="fixed inset-0 bg-[#07090E]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 28, stiffness: 350 }}
            className="relative w-full max-w-xl bg-[#0B0F17] border border-[#0066FF]/40 rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(0,102,255,0.2)] my-auto overflow-hidden text-white"
          >
            {/* Top Cyan Light Accent Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-[#00D2FF] to-transparent shadow-[0_0_12px_#00D2FF]" />

            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <WeboraLogo size={36} showText={false} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-tech tracking-[0.2em] text-[#00D2FF] uppercase font-semibold">
                      CONSULTA DIRECTA
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-[#0066FF]/20 text-[#00D2FF] text-[9px] font-mono border border-[#0066FF]/40">
                      66952340
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight leading-tight mt-0.5">
                    Consultar por WhatsApp
                  </h3>
                </div>
              </div>

              {/* Close Button with Emil Kowalski spring tap */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  playTick();
                  closeConsultation();
                }}
                className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.1] hover:border-[#0066FF] flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                aria-label="Cerrar modal"
              >
                <X className="w-4 h-4" />
              </motion.button>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
              Por favor completa estos 3 datos para preparar tu consulta y abrir WhatsApp con la información lista:
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Field 1: Nombre */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-white flex items-center gap-2 mb-1.5 font-bold">
                  <User className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>1. Tu Nombre *</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                  }}
                  placeholder="Ej. Roberto Gómez / Andrea Castillo"
                  className={`w-full bg-[#07090E] border rounded-xl px-4 py-3 sm:py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                    errors.name
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-white/[0.12] focus:border-[#0066FF]'
                  }`}
                />
                {errors.name && (
                  <p className="text-[11px] text-red-400 font-mono-tech mt-1">{errors.name}</p>
                )}
              </div>

              {/* Field 2: Tipo de Negocio */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-white flex items-center gap-2 mb-1.5 font-bold">
                  <Building2 className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>2. Tipo de Negocio o Rubro *</span>
                </label>
                <input
                  type="text"
                  value={businessType}
                  onChange={e => {
                    setBusinessType(e.target.value);
                    if (errors.businessType) setErrors(prev => ({ ...prev, businessType: undefined }));
                  }}
                  placeholder="Ej. Pastelería, Ropa Streetwear, Barbería, Consultoría..."
                  className={`w-full bg-[#07090E] border rounded-xl px-4 py-3 sm:py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors ${
                    errors.businessType
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-white/[0.12] focus:border-[#0066FF]'
                  }`}
                />
                {errors.businessType && (
                  <p className="text-[11px] text-red-400 font-mono-tech mt-1">{errors.businessType}</p>
                )}

                {/* Quick suggestion chips with Emil Kowalski spring tap */}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {BUSINESS_TYPE_SUGGESTIONS.map(s => (
                    <motion.button
                      key={s}
                      type="button"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={() => {
                        playTick();
                        setBusinessType(s);
                        if (errors.businessType) setErrors(prev => ({ ...prev, businessType: undefined }));
                      }}
                      className={`text-[10px] px-2.5 py-1 rounded-lg border transition-all ${
                        businessType === s
                          ? 'bg-[#0066FF] border-[#00D2FF]/60 text-white font-bold'
                          : 'bg-white/[0.03] border-white/[0.08] text-zinc-400 hover:text-white hover:border-[#0066FF]/40'
                      }`}
                    >
                      {s}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Field 3: Especificaciones */}
              <div>
                <label className="text-xs font-mono-tech uppercase tracking-wider text-white flex items-center gap-2 mb-1.5 font-bold">
                  <FileText className="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>3. Especificaciones del Proyecto *</span>
                </label>
                <textarea
                  rows={3}
                  value={specs}
                  onChange={e => {
                    setSpecs(e.target.value);
                    if (errors.specs) setErrors(prev => ({ ...prev, specs: undefined }));
                  }}
                  placeholder="Ej. Necesito catálogo digital con 20 productos, fotos en alta resolución, pedidos por WhatsApp, diseño para celular y dominio propio..."
                  className={`w-full bg-[#07090E] border rounded-xl px-4 py-3 sm:py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none transition-colors resize-none ${
                    errors.specs
                      ? 'border-red-500/80 focus:border-red-500'
                      : 'border-white/[0.12] focus:border-[#0066FF]'
                  }`}
                />
                {errors.specs && (
                  <p className="text-[11px] text-red-400 font-mono-tech mt-1">{errors.specs}</p>
                )}
              </div>

              {/* Reference banner if opened from Budget Calculator or Portfolio */}
              {(initialData.serviceName || initialData.priceEstimate) && (
                <div className="p-3 rounded-xl bg-[#07090E] border border-[#0066FF]/30 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#00D2FF] shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono-tech text-zinc-400 uppercase block">
                        Presupuesto / Referencia seleccionada:
                      </span>
                      <span className="font-semibold text-white">
                        {initialData.serviceName || 'Personalizado'}
                      </span>
                    </div>
                  </div>
                  {initialData.priceEstimate && (
                    <span className="font-mono font-bold text-[#00D2FF] text-sm">
                      {initialData.priceEstimate}
                    </span>
                  )}
                </div>
              )}

              {/* Submit CTA button */}
              <div className="pt-2">
                <TasteButton
                  type="submit"
                  variant="electric"
                  size="lg"
                  strength={6}
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="right"
                  className="w-full text-center"
                >
                  Continuar y Abrir WhatsApp (66952340)
                </TasteButton>

                <p className="text-[10px] text-zinc-400 text-center font-mono-tech mt-2.5 flex items-center justify-center gap-1.5">
                  <Phone className="w-3 h-3 text-[#00D2FF]" />
                  <span>Atención directa al 66952340 (+507 6695-2340) • Sin compromisos</span>
                </p>
              </div>

              {sentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-[#0066FF]/20 border border-[#0066FF]/40 text-[#00D2FF] text-xs text-center font-mono-tech flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF]" />
                  <span>Abriendo WhatsApp con tu consulta estructurada...</span>
                </motion.div>
              )}

            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
