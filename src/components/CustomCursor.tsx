import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFineDevice, setIsFineDevice] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth lagging spring for outer ring
  const ringX = useSpring(rawX, { damping: 25, stiffness: 220, mass: 0.2 });
  const ringY = useSpring(rawY, { damping: 25, stiffness: 220, mass: 0.2 });

  useEffect(() => {
    // Only activate on devices with fine pointers (desktop mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) {
      setIsFineDevice(false);
      return;
    }
    setIsFineDevice(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest('a, button, input, select, textarea, [data-interactive="true"]');
      setIsPointer(!!interactive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [rawX, rawY]);

  if (!isFineDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Extremely subtle ambient light follow */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="absolute w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.04)_0%,transparent_70%)] blur-2xl pointer-events-none -z-10"
      />

      {/* Outer interactive ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 44 : 26,
          height: isPointer ? 44 : 26,
          borderColor: isPointer ? 'rgba(0, 229, 255, 0.85)' : 'rgba(255, 255, 255, 0.25)',
          backgroundColor: isPointer ? 'rgba(0, 229, 255, 0.05)' : 'transparent',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="absolute rounded-full border border-white/30 backdrop-blur-[0.5px]"
      />

      {/* Central crisp dot */}
      <motion.div
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 0.6 : 1,
          backgroundColor: isPointer ? '#00e5ff' : '#ffffff',
        }}
        transition={{ duration: 0.12 }}
        className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,229,255,0.8)]"
      />
    </div>
  );
};
