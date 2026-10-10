import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number; // Maximum offset in pixels (default 10)
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 10,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physical spring back to 0,0
  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(deltaX * strength);
    mouseY.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  if (shouldReduceMotion) {
    return (
      <div className={`inline-block transition-transform duration-200 active:scale-95 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 450, damping: 25 }}
      style={{ x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};
