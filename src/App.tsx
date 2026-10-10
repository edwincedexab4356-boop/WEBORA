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
import { CinematicTransitionLayer } from './components/CinematicTransitionLayer';
import { CinematicSectionMask } from './components/CinematicSectionMask';
import { DotNavigationSidebar } from './components/DotNavigationSidebar';
import { KeyboardShortcutsManager } from './components/KeyboardShortcutsManager';
import { StickyReadingProgressBar } from './components/StickyReadingProgressBar';
import { SoundscapeProvider } from './context/SoundscapeContext';

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
    <SoundscapeProvider>
      <CinematicTransitionLayer>
        <div className="min-h-screen bg-[#07090E] text-white selection:bg-[#0066FF] selection:text-white font-sans relative overflow-x-hidden">
          
          {/* 1. Preloader (max 1.4s, unmounts automatically) */}
          <AnimatePresence>
            {!preloaderFinished && (
              <Preloader onComplete={() => setPreloaderFinished(true)} />
            )}
          </AnimatePresence>

          {/* 2. Minimalist Desktop Custom Cursor */}
          <CustomCursor />

          {/* 3. Global Keyboard Shortcuts Manager */}
          <KeyboardShortcutsManager />

          {/* 4. Persistent Minimalist Dot-Navigation Sidebar */}
          <DotNavigationSidebar />

          {/* 4. Top Scroll Progress Indicator */}
          <motion.div
            className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#0052CC] z-[70] origin-left shadow-[0_0_12px_rgba(0,102,255,0.7)]"
            style={{ scaleX }}
          />

          {/* 5. Glassmorphic Sticky Navbar */}
          <Navbar />

          {/* 6. Sticky Reading Progress Indicator Bar in Viewport */}
          <StickyReadingProgressBar />

          {/* Main Experience */}
          <main className="relative z-10">
            {/* Chapter 01: Hero Section */}
            <Hero />

            {/* Section Transition: 01 -> 02 */}
            <CinematicSectionMask
              fromChapter="01"
              toChapter="02"
              title="Manifiesto"
            />

            {/* Chapter 02: Big Line-by-Line Kinetic Manifesto */}
            <AnimatedManifesto />

            {/* Chapter 03: Services: 3 Large 3D Tilt Cards with Spotlight */}
            <ServicesSection />

            {/* Section Transition: 03 -> 04 */}
            <CinematicSectionMask
              fromChapter="03"
              toChapter="04"
              title="Portafolio"
            />

            {/* Chapter 04: Portfolio: Cinematic Large Cards with Hover Zoom & Specs */}
            <PortfolioSection />

            {/* Chapter 05: Testimonials: Infinite Horizontal Outcome Carousel */}
            <TestimonialsCarousel />

            {/* Chapter 06: Work Process Methodology */}
            <WorkProcess />

            {/* Section Transition: 06 -> 07 */}
            <CinematicSectionMask
              fromChapter="06"
              toChapter="07"
              title="Estimación"
            />

            {/* Chapter 07: Real-time Project Budget Calculator */}
            <BudgetCalculator />

            {/* Chapter 08: Contact & WhatsApp Connection */}
            <ContactSection />
          </main>

          {/* Footer */}
          <Footer />
        </div>
      </CinematicTransitionLayer>
    </SoundscapeProvider>
  );
}
