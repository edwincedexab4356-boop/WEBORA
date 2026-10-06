import React, { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnimatedManifesto } from './components/AnimatedManifesto';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsCarousel } from './components/TestimonialsCarousel';
import { WorkProcess } from './components/WorkProcess';
import { BudgetCalculator } from './components/BudgetCalculator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false);

  // Top Scroll Progress Line in electric cyan
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen bg-[#050608] text-[#f8fafc] selection:bg-[#00e5ff] selection:text-[#050608] font-sans relative overflow-x-hidden">
      
      {/* 1. Preloader (max 1.4s, unmounts automatically) */}
      <AnimatePresence>
        {!preloaderFinished && (
          <Preloader onComplete={() => setPreloaderFinished(true)} />
        )}
      </AnimatePresence>

      {/* 2. Minimalist Desktop Custom Cursor */}
      <CustomCursor />

      {/* 3. Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#00e5ff] via-[#38bdf8] to-[#0088ff] z-[70] origin-left shadow-[0_0_12px_rgba(0,229,255,0.6)]"
        style={{ scaleX }}
      />

      {/* 4. Glassmorphic Sticky Navbar */}
      <Navbar />

      {/* Main Experience */}
      <main className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Big Line-by-Line Kinetic Manifesto */}
        <AnimatedManifesto />

        {/* Services: 3 Large 3D Tilt Cards with Spotlight */}
        <ServicesSection />

        {/* Portfolio: Cinematic Large Cards with Hover Zoom & Specs */}
        <PortfolioSection />

        {/* Testimonials: Infinite Horizontal Outcome Carousel */}
        <TestimonialsCarousel />

        {/* Work Process Methodology */}
        <WorkProcess />

        {/* Real-time Project Budget Calculator */}
        <BudgetCalculator />

        {/* Contact & WhatsApp Connection */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
