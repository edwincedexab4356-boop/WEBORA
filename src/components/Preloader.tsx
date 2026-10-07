import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeboraLogo } from './WeboraLogo';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'mark' | 'text' | 'beam' | 'exit'>('mark');

  useEffect(() => {
    // Stage 1: Symbol appears (0ms)
    // Stage 2: Typography reveals (280ms)
    const t1 = setTimeout(() => setStage('text'), 280);
    // Stage 3: Light beam sweeps across (550ms)
    const t2 = setTimeout(() => setStage('beam'), 550);
    // Stage 4: Exit sequence (920ms)
    const t3 = setTimeout(() => setStage('exit'), 920);
    // Complete callback (1150ms)
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1150);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: stage === 'exit' ? 0 : 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[10000] bg-[#050608] flex items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Background ambient pulse */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Central Logo Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* The Mark itself */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, filter: 'blur(8px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <WeboraLogo size={68} showText={false} />

          {/* Sweeping Light Ray Beam */}
          {stage === 'beam' && (
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '180%', opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-24 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent pointer-events-none mix-blend-overlay blur-[2px]"
            />
          )}
        </motion.div>

        {/* Wordmark typography reveal */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{
            opacity: stage !== 'mark' ? 1 : 0,
            y: stage !== 'mark' ? 0 : 12,
            filter: stage !== 'mark' ? 'blur(0px)' : 'blur(6px)',
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 text-center"
        >
          <span className="font-display font-black text-2xl tracking-[0.35em] text-white uppercase block">
            WEBORA
          </span>
          <span className="text-[10px] tracking-[0.4em] uppercase text-cyan-400 font-mono-tech mt-1 block opacity-80">
            DIGITAL EXPERIENCES
          </span>
        </motion.div>

        {/* Minimal luminous line beneath */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: stage !== 'mark' ? 1 : 0,
            opacity: stage !== 'mark' ? 0.4 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4"
        />

      </div>
    </motion.div>
  );
};
