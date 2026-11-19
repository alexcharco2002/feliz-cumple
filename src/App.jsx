import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import Navbar from './components/Navbar';
import HeroEnvelope from './components/HeroEnvelope';
import LetterCard from './components/LetterCard';
import PolaroidWall from './components/PolaroidWall';
import GrandFinaleSection from './components/GrandFinaleSection';
import VoiceNotesSection from './components/VoiceNotesSection';
import Footer from './components/Footer';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className="relative min-h-screen text-light-on-surface dark:text-dark-on-surface bg-light-surface dark:bg-dark-surface transition-colors duration-500 overflow-x-hidden">
      {/* Dynamic Ambient Background Orbs */}
      <AmbientBackground />

      {/* Floating Glassmorphic Top Navbar */}
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />

      {/* =========================================================================
          SECCIÓN 1: BIENVENIDA & SOBRE 3D (PANTALLA COMPLETA)
          Tono: Marfil Rosado Suave (light-surface #FDF8F5 / dark-surface #0F0B14)
      ========================================================================= */}
      <section className="relative z-10 w-full min-h-[92vh] sm:min-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 pb-12 px-4 sm:px-6 lg:px-8 border-b border-gold-trim/30">
        <div className="w-full max-w-[1140px] mx-auto flex-1 flex flex-col justify-center">
          <HeroEnvelope 
            isEnvelopeOpen={isEnvelopeOpen} 
            onEnvelopeOpen={() => setIsEnvelopeOpen(true)} 
          />
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: CARTA EDITORIAL DE CUMPLEAÑOS (CON ILUSTRACIÓN ANIME)
          Tono: Pergamino Editorial Puro (parchment #FFFDF9 / dark:bg-[#160E22])
      ========================================================================= */}
      <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 bg-parchment dark:bg-[#160E22] border-b border-gold-trim/30 shadow-xs">
        <div className="max-w-[1140px] mx-auto">
          {/* Chapter Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
            <span className="font-label text-xs sm:text-sm uppercase tracking-widest text-accent dark:text-dark-primary font-semibold px-4 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface-card border border-gold-trim/30 shadow-xs">
              ✦ CAPÍTULO I • CARTA DE AMOR ✦
            </span>
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
          </div>

          <LetterCard />
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3: MOMENTOS EN EL TIEMPO (GALERÍA POLAROID 3D)
          Tono: Rubor Suave Editorial (surface-card-subtle #FFF1F2 / dark:bg-[#1C1425])
      ========================================================================= */}
      <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 bg-light-surface-card-subtle dark:bg-dark-surface-card border-b border-gold-trim/30 shadow-xs">
        <div className="max-w-[1140px] mx-auto">
          {/* Chapter Badge */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
            <span className="font-label text-xs sm:text-sm uppercase tracking-widest text-accent dark:text-dark-primary font-semibold px-4 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface-card-subtle border border-gold-trim/30 shadow-xs">
              ✦ CAPÍTULO II • NUESTROS RECUERDOS ✦
            </span>
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
          </div>

          <PolaroidWall />
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 4: EL GRAN FINAL (VIDEO ESPECIAL)
          Tono: Champán Boleto Dorado (ticket-bg #FCF6EC / dark:bg-[#20162B])
      ========================================================================= */}
      <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 bg-ticket-bg dark:bg-[#20162B] border-b border-gold-trim/30 shadow-xs">
        <div className="max-w-[1140px] mx-auto">
          {/* Chapter Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
            <span className="font-label text-xs sm:text-sm uppercase tracking-widest text-accent dark:text-dark-primary font-semibold px-4 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface-card border border-gold-trim/30 shadow-xs">
              ✦ CAPÍTULO III • TU REGALO SORPRESA ✦
            </span>
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
          </div>

          <GrandFinaleSection />
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5: CAPÍTULO IV • NOTAS DE VOZ EN VARIOS IDIOMAS
          Tono: Superficie Suave de Gala (bg-light-surface / dark:bg-[#180E24])
      ========================================================================= */}
      <section className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-[#180E24] border-b border-gold-trim/30 shadow-xs">
        <div className="max-w-[1140px] mx-auto">
          {/* Chapter Badge */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
            <span className="font-label text-xs sm:text-sm uppercase tracking-widest text-accent dark:text-dark-primary font-semibold px-4 py-1.5 rounded-full bg-light-surface dark:bg-dark-surface-card border border-gold-trim/30 shadow-xs">
              ✦ CAPÍTULO IV • NOTAS DE VOZ ✦
            </span>
            <span className="h-px w-16 sm:w-24 bg-gold-trim/50"></span>
          </div>

          <VoiceNotesSection />
        </div>
      </section>

      {/* =========================================================================
          PIE DE PÁGINA: Suave y elegante en armonía con el diseño
      ========================================================================= */}
      <section className="relative z-10 w-full bg-envelope-flap-bg dark:bg-[#0F0B14] py-4">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </section>
    </div>
  );
}
