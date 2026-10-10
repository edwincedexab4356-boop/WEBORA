import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useSoundscape } from '../context/SoundscapeContext';
import { useReducedMotion } from '../hooks/useReducedMotion';

export interface TasteButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'electric' | 'secondary' | 'ghost' | 'pill' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  strength?: number; // Magnetic pull strength in pixels
  showSheen?: boolean; // Emil Kowalski shimmer sweep beam
  active?: boolean;
}

/**
 * TasteButton — Engineered with Emil Kowalski & Taste Motion principles:
 * - Tactile micro-squash on press (whileTap scale 0.95)
 * - Kinetic spring physics (stiffness: 450, damping: 28)
 * - Shimmer sheen beam sweeping across on hover
 * - Magnetic cursor attraction
 * - Electric Blue, Carbon Black & White palette matching D.E.K NOVACORE logo
 */
export const TasteButton: React.FC<TasteButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  icon,
  iconPosition = 'right',
  strength = 8,
  showSheen = true,
  active = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const { playTick, activateSoundscape } = useSoundscape();
  const ref = useRef<HTMLDivElement>(null);

  // Magnetic spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 18, stiffness: 220, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current || strength === 0) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);
    mouseX.set(deltaX * strength);
    mouseY.set(deltaY * strength);
  };

  const handleMouseLeave = () => {
    if (shouldReduceMotion || strength === 0) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleInteraction = (e: React.MouseEvent) => {
    activateSoundscape();
    playTick();
    if (onClick) onClick(e);
  };

  // Sizing definitions
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-[11px] tracking-wider rounded-full gap-1.5',
    md: 'px-6 py-3 text-xs tracking-[0.2em] rounded-full gap-2.5',
    lg: 'px-8 py-4 text-xs sm:text-sm tracking-[0.22em] rounded-full gap-3',
  }[size];

  // Variant themes using the logo palette: Carbon Black (#07090E), Electric Blue (#0066FF), Cyber Cyan (#00D2FF), Pure White
  const variantClasses = {
    // Primary: Electric Blue background with neon halo & white bold text
    primary:
      'bg-[#0066FF] hover:bg-[#0052CC] text-white font-extrabold uppercase shadow-[0_0_24px_rgba(0,102,255,0.45)] border border-[#00D2FF]/30 hover:border-[#00D2FF]',
    // Electric: High-tech cyber neon
    electric:
      'bg-gradient-to-r from-[#0066FF] via-[#0055EE] to-[#0044CC] text-white font-black uppercase shadow-[0_0_28px_rgba(0,102,255,0.55)] border border-[#00D2FF]/40 hover:border-[#00D2FF]',
    // Secondary: Carbon black obsidian with electric blue border and glow
    secondary:
      'bg-[#0B0F17] hover:bg-[#0E1420] text-white font-semibold uppercase border border-[#0066FF]/35 hover:border-[#0066FF] shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:shadow-[0_0_20px_rgba(0,102,255,0.25)]',
    // Ghost: Subtle glassy carbon with electric highlight
    ghost:
      'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white font-medium uppercase border border-white/[0.1] hover:border-[#0066FF]/60 backdrop-blur-md',
    // White: Crisp high contrast
    white:
      'bg-white hover:bg-zinc-100 text-[#07090E] font-bold uppercase shadow-[0_0_25px_rgba(255,255,255,0.25)] border border-white',
    // Pill: Compact filter / tag pill with active toggle state
    pill: active
      ? 'bg-[#0066FF] text-white font-bold border border-[#00D2FF]/50 shadow-[0_0_15px_rgba(0,102,255,0.4)]'
      : 'bg-[#0B0F17] hover:bg-[#121722] text-zinc-400 hover:text-white border border-white/[0.08] hover:border-[#0066FF]/40',
  }[variant];

  const content = (
    <>
      {/* Emil Kowalski signature sheen sweep beam */}
      {showSheen && !disabled && (
        <span
          className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Taste Motion subtle inner border glare */}
      <span
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 ring-1 ring-inset ring-white/20"
        aria-hidden="true"
      />

      {/* Icon left */}
      {icon && iconPosition === 'left' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5">
          {icon}
        </span>
      )}

      {/* Label */}
      <span className="relative z-10 select-none flex items-center gap-2">
        {children}
      </span>

      {/* Icon right */}
      {icon && iconPosition === 'right' && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          {icon}
        </span>
      )}
    </>
  );

  const commonMotionProps = {
    whileHover: shouldReduceMotion
      ? undefined
      : { scale: 1.02, y: -1, transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const } },
    whileTap: shouldReduceMotion
      ? undefined
      : { scale: 0.95, transition: { type: 'spring' as const, stiffness: 500, damping: 28 } },
  };

  const buttonInnerClasses = `relative group inline-flex items-center justify-center overflow-hidden transition-colors duration-200 cursor-pointer ${sizeClasses} ${variantClasses} ${
    disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : ''
  } ${className}`;

  if (href) {
    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={shouldReduceMotion ? undefined : { x, y }}
        className="inline-block"
      >
        <motion.a
          href={href}
          target={target}
          rel={rel}
          data-interactive="true"
          onClick={handleInteraction}
          onMouseEnter={playTick}
          className={buttonInnerClasses}
          {...commonMotionProps}
        >
          {content}
        </motion.a>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className="inline-block"
    >
      <motion.button
        type={type}
        disabled={disabled}
        data-interactive="true"
        onClick={handleInteraction}
        onMouseEnter={playTick}
        className={buttonInnerClasses}
        {...commonMotionProps}
      >
        {content}
      </motion.button>
    </motion.div>
  );
};
