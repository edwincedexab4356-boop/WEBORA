import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFineDevice, setIsFineDevice] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Smooth, snappy spring for outer ring
  const ringX = useSpring(rawX, { damping: 28, stiffness: 280, mass: 0.15 });
  const ringY = useSpring(rawY, { damping: 28, stiffness: 280, mass: 0.15 });

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
      if (!isVisible) setIsVisible(true);
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
  }, [rawX, rawY, isVisible]);

  if (!isFineDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer interactive ring - hardware accelerated */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isPointer ? 42 : 24,
          height: isPointer ? 42 : 24,
          borderColor: isPointer ? 'rgba(0, 229, 255, 0.9)' : 'rgba(255, 255, 255, 0.3)',
          backgroundColor: isPointer ? 'rgba(0, 229, 255, 0.06)' : 'transparent',
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="absolute rounded-full border will-change-transform"
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
        transition={{ duration: 0.1 }}
        className="absolute w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(0,229,255,0.8)] will-change-transform"
      />
    </div>
  );
};
