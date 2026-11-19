import React from 'react';
import confetti from 'canvas-confetti';
import { celebrationData } from '../data/celebrationData';
import { musicPlayer } from '../utils/audioPlayer';

export default function HeroEnvelope({ onEnvelopeOpen, isEnvelopeOpen }) {
  const triggerConfettiExplosion = () => {
    // Multi-colored celebratory burst
    const end = Date.now() + 1000;
    const colors = ['#8C711E', '#D4AF37', '#F472B6', '#FCE7F3', '#FFFFFF', '#851E36'];

    (function frame() {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 60,
        origin: { x: 0.15, y: 0.6 },
        colors: colors
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 60,
        origin: { x: 0.85, y: 0.6 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const scrollToLetter = () => {
    const letterElem = document.getElementById('letter-section');
    if (letterElem) {
      letterElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpen = () => {
    if (!isEnvelopeOpen) {
      onEnvelopeOpen();
      triggerConfettiExplosion();
      musicPlayer.play();

      setTimeout(() => {
        scrollToLetter();
      }, 850);
    } else {
      scrollToLetter();
    }
  };

  return (
    <div id="hero-envelope-section" className="w-full flex flex-col justify-center py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Hero Column: Narrative & Primary CTA */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          
          {/* Eyebrow Badge */}
          <div className="mb-4 sm:mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-dark-surface-card border border-gold-trim/60 text-accent dark:text-dark-primary font-label text-xs sm:text-sm uppercase tracking-widest shadow-sm">
              <span className="material-symbols-outlined text-sm sm:text-base text-gold-trim">auto_awesome</span>
              <span>{celebrationData.hero.badge}</span>
              <span className="material-symbols-outlined text-sm sm:text-base text-gold-trim">auto_awesome</span>
            </span>
          </div>

          {/* Bold Serif Title */}
          <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-light-on-surface dark:text-dark-on-surface mb-4 font-bold tracking-tight leading-tight">
            Feliz Cumpleaños, <br />
            <span className="text-light-primary dark:text-rose-glow italic">
              {celebrationData.recipient}
            </span>
          </h1>
          
          <p className="font-body text-base sm:text-lg text-light-text-muted dark:text-dark-text-muted max-w-lg mb-8 leading-relaxed">
            {celebrationData.hero.subtitle}
          </p>

          {/* Primary CTA Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <button 
              type="button" 
              onClick={handleOpen}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-label text-base font-semibold shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] ${
                isEnvelopeOpen
                  ? 'bg-rose-700 hover:bg-rose-800 text-white shadow-rose-900/20'
                  : 'bg-light-primary hover:bg-[#3D1829] dark:bg-dark-primary dark:hover:bg-rose-400 text-white dark:text-[#280A1A] shadow-plum/20'
              }`}
            >
              <span className="material-symbols-outlined text-xl text-amber-200 dark:text-inherit group-hover:rotate-12 transition-transform">
                {isEnvelopeOpen ? 'auto_stories' : 'mail'}
              </span>
              <span className="tracking-wide">
                {isEnvelopeOpen ? 'Leer mi carta de amor ❤️ ↓' : 'Abrir mi sorpresa 💌'}
              </span>
            </button>
            <span className="font-label text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted">
              {isEnvelopeOpen ? '¡Toca para bajar a la dedicatoria!' : celebrationData.hero.ctaHint}
            </span>
          </div>

        </div>

        {/* Right Hero Column: Realistic 3D Tactile Envelope (No clipping & perfectly centered) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end pt-24 sm:pt-28 pb-4">
          <div 
            id="envelope-widget" 
            onClick={handleOpen}
            className={`relative w-full max-w-[380px] sm:max-w-[430px] h-[260px] sm:h-[280px] cursor-pointer group select-none transition-transform hover:scale-[1.02] ${isEnvelopeOpen ? 'envelope-open' : ''}`}
            style={{ perspective: '1200px' }}
          >
            
            {/* Glowing Ambient Halo */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-accent/20 via-rose-glow/20 to-gold-trim/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity pointer-events-none" />

            {/* ENVELOPE BACKPLATE (Layer 1 - z-0) */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#F7EFE6] via-[#F4EBE0] to-[#EFE1D2] dark:from-[#251A33] dark:via-[#1F142B] dark:to-[#170E22] border-2 border-gold-trim/60 shadow-2xl z-0 overflow-hidden">
              <div className="absolute inset-2 border border-gold-trim/25 rounded-xl pointer-events-none" />
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-trim/70 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-trim/70 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-trim/70 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-trim/70 pointer-events-none" />
            </div>

            {/* THE LETTER PAPER (Layer 2 - inset-x-4, zero translate-X dependency so it never shifts sideways!) */}
            <div 
              id="peek-letter" 
              className={`letter-paper-3d absolute left-4 right-4 bottom-3 h-[90%] rounded-xl bg-white dark:bg-[#1E1528] border-2 border-gold-trim/60 p-4 sm:p-5 flex flex-col items-center justify-between text-center shadow-xl transition-all ${
                isEnvelopeOpen ? 'z-35' : 'z-10'
              }`}
            >
              {/* Header */}
              <div className="w-full flex items-center justify-between border-b border-gold-trim/30 pb-1.5">
                <span className="font-label text-[10px] uppercase tracking-wider text-accent dark:text-dark-primary font-bold">
                  ✦ Carta Especial Para Ti ✦
                </span>
                <span className="material-symbols-outlined text-rose-glow text-base">favorite</span>
              </div>

              {/* Letter Quote */}
              <div className="my-auto py-1 px-1">
                <p className="font-handwritten text-xl sm:text-2xl text-zinc-800 dark:text-zinc-100 leading-snug">
                  {celebrationData.hero.envelopeQuote}
                </p>
                <span className="font-handwritten text-base sm:text-lg text-light-primary dark:text-rose-glow block mt-1 font-semibold">
                  — Con todo mi amor, Jeferson ❤️
                </span>
              </div>

              {/* Bottom Cue */}
              <div className="w-full pt-1.5 border-t border-gold-trim/20 flex items-center justify-center gap-1.5 text-xs font-label text-accent dark:text-dark-primary font-semibold">
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
                <span>Toca para leer la carta completa</span>
                <span className="material-symbols-outlined text-sm">arrow_downward</span>
              </div>
            </div>

            {/* ENVELOPE FRONT POCKET FOLDS (Layer 3 - z-20: covers letter when closed) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-20 drop-shadow-sm" 
              viewBox="0 0 430 280" 
              fill="none" 
              preserveAspectRatio="none"
            >
              {/* Left Side Flap Fold */}
              <polygon 
                points="0,0 215,160 0,280" 
                className="fill-[#FBF5ED] dark:fill-[#21172E] stroke-gold-trim/50" 
                strokeWidth="1.5" 
              />
              {/* Right Side Flap Fold */}
              <polygon 
                points="430,0 215,160 430,280" 
                className="fill-[#F8F0E4] dark:fill-[#1E142B] stroke-gold-trim/50" 
                strokeWidth="1.5" 
              />
              {/* Bottom Flap Fold (forms bottom pocket edge) */}
              <polygon 
                points="0,280 215,150 430,280" 
                className="fill-[#F4E9DC] dark:fill-[#1A1026] stroke-gold-trim/60" 
                strokeWidth="1.5" 
              />
            </svg>

            {/* TOP TRIANGULAR FLAP & 3D WAX SEAL (Layer 4 - z-30 closed, z-5 open) */}
            <div 
              id="envelope-flap" 
              className={`envelope-flap-3d absolute top-0 left-0 w-full h-[148px] origin-top ${
                isEnvelopeOpen ? 'z-5' : 'z-30'
              }`}
            >
              {/* Flap SVG */}
              <svg 
                className="w-full h-full drop-shadow-md" 
                viewBox="0 0 430 148" 
                fill="none" 
                preserveAspectRatio="none"
              >
                <polygon 
                  points="0,0 430,0 215,145" 
                  className="fill-[#F8EFE4] dark:fill-[#241733] stroke-gold-trim/60" 
                  strokeWidth="1.5" 
                />
              </svg>

              {/* Realistic 3D Wax Seal with Heart Relief at Flap Point */}
              <div 
                id="wax-seal" 
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-br from-[#A8223F] via-seal-red to-[#4E0E1B] shadow-2xl border-2 border-gold-trim flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-transform z-40"
              >
                {/* Inner Seal Ring */}
                <div className="w-10 sm:w-11 h-10 sm:h-11 rounded-full border border-amber-300/50 flex items-center justify-center bg-seal-red/60 shadow-inner">
                  <span className="material-symbols-outlined text-amber-200 text-lg sm:text-xl drop-shadow-md">
                    favorite
                  </span>
                </div>

                {/* Pulsing indicator when closed */}
                {!isEnvelopeOpen && (
                  <span className="absolute inset-0 rounded-full border border-gold-trim animate-ping opacity-60 pointer-events-none" />
                )}
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Subtle bottom indicator */}
      <div 
        className="mt-8 text-center flex flex-col items-center justify-center gap-1 opacity-70 hover:opacity-100 transition-opacity cursor-pointer" 
        onClick={handleOpen}
      >
        <span className="font-label text-xs uppercase tracking-widest text-accent dark:text-dark-primary font-medium">
          {isEnvelopeOpen ? 'Desliza o haz clic para leer tu dedicatoria' : 'Toca el sobre para comenzar la sorpresa'}
        </span>
        <span className="material-symbols-outlined text-base animate-bounce text-accent dark:text-dark-primary">
          expand_more
        </span>
      </div>
    </div>
  );
}
