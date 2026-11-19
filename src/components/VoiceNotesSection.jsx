import React, { useState, useRef, useEffect } from 'react';
import { celebrationData } from '../data/celebrationData';
import { musicPlayer } from '../utils/audioPlayer';

export default function VoiceNotesSection() {
  const [activeVoiceId, setActiveVoiceId] = useState(null);
  const audioRef = useRef(new Audio());
  const wasMusicPlayingRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      setActiveVoiceId(null);
      if (wasMusicPlayingRef.current) {
        musicPlayer.play();
        wasMusicPlayingRef.current = false;
      }
    };

    const handlePause = () => {
      if (audio.ended || audio.paused) {
        setActiveVoiceId(null);
      }
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('pause', handlePause);
      audio.pause();
    };
  }, []);

  const handleToggleVoice = (voice) => {
    const audio = audioRef.current;

    // If clicking on already playing voice note -> Pause it
    if (activeVoiceId === voice.id) {
      audio.pause();
      setActiveVoiceId(null);
      if (wasMusicPlayingRef.current) {
        musicPlayer.play();
        wasMusicPlayingRef.current = false;
      }
      return;
    }

    // If starting a voice note:
    if (musicPlayer.isPlaying) {
      wasMusicPlayingRef.current = true;
      musicPlayer.pause();
    }

    setActiveVoiceId(voice.id);
    audio.src = voice.src;

    audio.play().catch(() => {
      // If primary path fails, try alt path
      audio.src = voice.altSrc;
      audio.play().catch(() => {
        // Fallback: Web Speech API synthesis if file not recorded yet
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(voice.phrase);
          const langMap = {
            es: 'es-ES',
            qu: 'es-PE',
            en: 'en-US',
            fr: 'fr-FR',
            pt: 'pt-BR',
            it: 'it-IT'
          };
          utterance.lang = langMap[voice.id] || 'es-ES';
          utterance.rate = 0.9;
          utterance.onend = () => {
            setActiveVoiceId(null);
            if (wasMusicPlayingRef.current) {
              musicPlayer.play();
              wasMusicPlayingRef.current = false;
            }
          };
          window.speechSynthesis.speak(utterance);
        } else {
          setActiveVoiceId(null);
        }
      });
    });
  };

  return (
    <div id="voice-notes-section" className="w-full max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10 sm:mb-12">
        
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-light-on-surface dark:text-dark-on-surface font-semibold tracking-tight">
          Te Lo Diría en Cualquier Idioma
        </h2>
        <p className="font-body text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted mt-2 max-w-xl mx-auto">
          Porque mi amor por ti no tiene fronteras
        </p>
      </div>

      {/* Voice Notes Grid (6 Languages) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {celebrationData.voiceNotes.map((voice) => {
          const isPlayingThis = activeVoiceId === voice.id;

          return (
            <div
              key={voice.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 border-2 shadow-xl flex flex-col justify-between ${
                isPlayingThis
                  ? 'bg-gradient-to-br from-rose-50 via-white to-gold-light/40 dark:from-[#2A1733] dark:via-[#201229] dark:to-[#170B1F] border-rose-400 dark:border-rose-glow scale-[1.02]'
                  : 'bg-light-surface-card dark:bg-dark-surface-card border-gold-trim/30 hover:border-gold-trim/60 hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Language Badge & Flag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-light/60 dark:bg-accent/20 border border-gold-trim/30">
                    <span className="text-lg">{voice.flag}</span>
                    <span className="font-label text-xs font-bold text-accent dark:text-dark-primary uppercase tracking-wider">
                      {voice.language}
                    </span>
                  </div>

                  {/* Soundwave animation if playing */}
                  {isPlayingThis && (
                    <div className="flex items-end gap-1 h-5 px-2">
                      <span className="w-1 bg-rose-glow rounded-full animate-wave-1"></span>
                      <span className="w-1 bg-accent rounded-full animate-wave-2"></span>
                      <span className="w-1 bg-rose-glow rounded-full animate-wave-3"></span>
                      <span className="w-1 bg-accent rounded-full animate-wave-4"></span>
                    </div>
                  )}
                </div>

                {/* The Phrase */}
                <h3 className="font-headline text-2xl sm:text-3xl text-light-primary dark:text-rose-glow font-bold leading-tight my-4 text-center">
                  “{voice.phrase}”
                </h3>
              </div>

              {/* Play / Pause Voice Button */}
              <div className="mt-4 pt-4 border-t border-gold-trim/20 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleToggleVoice(voice)}
                  className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full font-label text-xs sm:text-sm font-semibold shadow-md transition-all hover:scale-105 active:scale-95 ${
                    isPlayingThis
                      ? 'bg-rose-600 text-white shadow-rose-900/30'
                      : 'bg-light-primary dark:bg-dark-primary text-white dark:text-[#280A1A]'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {isPlayingThis ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isPlayingThis ? 'Pausar' : 'Escuchar'}</span>
                </button>

                <span className="font-label text-xs text-light-text-muted dark:text-dark-text-muted font-medium">
                  Jeferson ❤️
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
