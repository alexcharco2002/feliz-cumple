import React, { useState, useEffect } from 'react';
import { musicPlayer } from '../utils/audioPlayer';

export default function Navbar({ isDarkMode, onToggleTheme }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = musicPlayer.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return unsubscribe;
  }, []);

  const handleAudioToggle = () => {
    musicPlayer.toggle();
  };

  const handleAudioRestart = () => {
    musicPlayer.restart();
  };

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-2xl flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-light-surface-card/95 dark:bg-dark-surface-card/95 backdrop-blur-xl border border-gold-trim/40 shadow-2xl shadow-black/10 transition-all">
        
        {/* Left: Audio Player Micro-Widget with Play/Pause and Replay */}
        <div className="flex items-center gap-2.5 sm:gap-3 overflow-hidden">
          {/* Controls: Play/Pause and Replay */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Play/Pause Button */}
            <button 
              type="button" 
              onClick={handleAudioToggle}
              aria-label={isPlaying ? "Pausar música" : "Reproducir música"} 
              title={isPlaying ? "Pausar música" : "Reproducir música"}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-light-primary to-accent dark:from-dark-primary dark:to-accent text-white dark:text-dark-on-primary shadow-sm hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Volver a reproducir Button */}
            <button 
              type="button" 
              onClick={handleAudioRestart}
              aria-label="Volver a reproducir desde el inicio" 
              title="Volver a reproducir desde el inicio"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gold-light/60 dark:bg-accent/20 hover:bg-gold-light dark:hover:bg-accent/35 text-accent dark:text-dark-primary border border-gold-trim/30 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-base">
                replay
              </span>
            </button>
          </div>
          
          {/* Song Info & Soundwave */}
          <div className="flex flex-col min-w-0 pr-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* Animated Soundwave bars */}
              <div className={`flex items-end gap-0.5 h-3.5 sm:h-4 ${isPlaying ? '' : 'soundwave-paused'}`}>
                <span className="w-1 bg-accent rounded-full animate-wave-1"></span>
                <span className="w-1 bg-rose-glow rounded-full animate-wave-2"></span>
                <span className="w-1 bg-accent rounded-full animate-wave-3"></span>
                <span className="w-1 bg-rose-glow rounded-full animate-wave-4"></span>
              </div>
              <span className="font-label text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted font-medium truncate">
                {isPlaying ? 'Sonando: Río Roma - Me cambiaste la vida ♪' : 'Toca para escuchar: Río Roma ♪'}
              </span>
            </div>
            <span className="font-label text-[10px] sm:text-[11px] font-semibold text-accent dark:text-dark-primary tracking-wide uppercase truncate">
              NFC Edition • Starlight Gala
            </span>
          </div>
        </div>

        {/* Center: Editorial Title Badge (Hidden on small mobile) */}
        <div className="hidden md:flex items-center gap-2 text-accent dark:text-dark-primary font-headline italic">
          <span className="text-xs">✦</span>
          <span className="text-base font-semibold">L'Amour Éternel</span>
          <span className="text-xs">✦</span>
        </div>

        {/* Right: Theme Toggle (Sun/Moon Switch) */}
        <button 
          type="button" 
          onClick={onToggleTheme}
          aria-label={isDarkMode ? "Cambiar a modo día romántico" : "Cambiar a modo noche estrellada"} 
          className="relative w-9 h-9 rounded-full flex items-center justify-center bg-light-surface-card dark:bg-dark-surface-card-subtle border border-gold-trim/40 text-accent dark:text-dark-primary shadow-sm hover:rotate-12 transition-transform flex-shrink-0"
        >
          <span className="material-symbols-outlined text-lg">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

      </div>
    </header>
  );
}
