import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      <motion.a
        href="https://wa.me/50766952340?text=Hola%20Novexa,%20quiero%20cotizar%20un%20proyecto%20web."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-black font-bold shadow-[0_8px_25px_rgba(37,211,102,0.4)] hover:shadow-[0_10px_35px_rgba(37,211,102,0.6)] transition-all group cursor-pointer"
        aria-label="Chatear por WhatsApp al 66952340"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>

        <MessageCircle className="w-5 h-5 fill-black stroke-black" />
        
        <span className="text-xs uppercase tracking-wider font-extrabold flex items-center gap-1.5">
          <span>WhatsApp</span>
          <span className="bg-black/15 px-2 py-0.5 rounded-full text-[11px] font-mono">66952340</span>
        </span>
      </motion.a>
    </div>
  );
};
