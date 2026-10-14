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
import { WhatsAppModalProvider } from './context/WhatsAppModalContext';
import { WhatsAppConsultModal } from './components/WhatsAppConsultModal';
import { SiteModeProvider } from './context/SiteModeContext';
import { InitialPortalLoader } from './components/InitialPortalLoader';
import { CustomSystemsSection } from './components/CustomSystemsSection';

export default function App() {
  // Top Scroll Progress Line in electric cyan
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <SiteModeProvider>
      <SoundscapeProvider>
        <WhatsAppModalProvider>
          <CinematicTransitionLayer>
            <div className="min-h-screen bg-[#07090E] text-white selection:bg-[#0066FF] selection:text-white font-sans relative overflow-x-hidden">
              
              {/* 1. Initial Interactive Portal Loader (1 Sistemas, 2 Webs, 3 Catálogos, 4 Todo) */}
              <InitialPortalLoader />

            {/* 2. Minimalist Desktop Custom Cursor */}
            <CustomCursor />

            {/* 3. Global Keyboard Shortcuts Manager */}
            <KeyboardShortcutsManager />

            {/* 4. Persistent Minimalist Dot-Navigation Sidebar */}
            <DotNavigationSidebar />

            {/* 5. Top Scroll Progress Indicator */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0066FF] via-[#00D2FF] to-[#0052CC] z-[70] origin-left shadow-[0_0_12px_rgba(0,102,255,0.7)]"
              style={{ scaleX }}
            />

            {/* 6. Glassmorphic Sticky Navbar */}
            <Navbar />

            {/* 7. Sticky Reading Progress Indicator Bar in Viewport */}
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

              {/* Section Transition: 02 -> 03: 1. Sistemas a Medida */}
              <CinematicSectionMask
                fromChapter="02"
                toChapter="03"
                title="1. Sistemas a Medida"
              />

              {/* Chapter 03: Sistemas a Medida (Administración, Inventario & POS) */}
              <CustomSystemsSection />

              {/* Section Transition: 03 -> 04: 2. Páginas Web */}
              <CinematicSectionMask
                fromChapter="03"
                toChapter="04"
                title="2. Páginas Web"
              />

              {/* Chapter 04: Services: 2. Páginas Web & Soluciones Digitales */}
              <ServicesSection />

              {/* Section Transition: 04 -> 05: 3. Catálogos Digitales */}
              <CinematicSectionMask
                fromChapter="04"
                toChapter="05"
                title="3. Catálogos"
              />

              {/* Chapter 05: Portfolio: 3. Catálogos Digitales con Pedidos WhatsApp */}
              <PortfolioSection />

              {/* Chapter 06: Testimonials: Infinite Horizontal Outcome Carousel */}
              <TestimonialsCarousel />

              {/* Chapter 07: Work Process Methodology */}
              <WorkProcess />

              {/* Section Transition: 07 -> 08 */}
              <CinematicSectionMask
                fromChapter="07"
                toChapter="08"
                title="Estimación"
              />

              {/* Chapter 08: Real-time Project Budget Calculator */}
              <BudgetCalculator />

              {/* Chapter 09: Contact & WhatsApp Connection */}
              <ContactSection />
            </main>

            {/* Footer */}
            <Footer />

            {/* Interactive WhatsApp Consultation Modal with Name, Business Type & Specs */}
            <WhatsAppConsultModal />
          </div>
        </CinematicTransitionLayer>
      </WhatsAppModalProvider>
    </SoundscapeProvider>
  </SiteModeProvider>
  );
}
