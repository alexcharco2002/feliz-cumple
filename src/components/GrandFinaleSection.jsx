import React, { useRef, useState } from 'react';
import { celebrationData } from '../data/celebrationData';
import { musicPlayer } from '../utils/audioPlayer';

export default function GrandFinaleSection() {
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const wasMusicPlayingRef = useRef(false);

  // When video plays: pause background music
  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
    if (musicPlayer.isPlaying) {
      wasMusicPlayingRef.current = true;
      musicPlayer.pause();
    }
  };

  // When video pauses or finishes: resume background music
  const handleVideoPauseOrEnd = () => {
    setIsVideoPlaying(false);
    if (wasMusicPlayingRef.current) {
      musicPlayer.play();
      wasMusicPlayingRef.current = false;
    }
  };

  return (
    <div id="voucher-video-section" className="w-full max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-10">
        
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-light-on-surface dark:text-dark-on-surface font-semibold tracking-tight">
          Nuestra primera chamba juntos 😅
        </h2>
        <p className="font-body text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted mt-2 max-w-lg mx-auto">
          De {celebrationData.sender} para ti, {celebrationData.recipient} ❤️
        </p>
      </div>

      {/* Large Featured Cinematic Video Card */}
      <div className="relative rounded-3xl bg-light-surface-card dark:bg-dark-surface-card border-2 border-gold-trim/50 shadow-2xl p-4 sm:p-8 overflow-hidden transition-all">
        
        {/* Subtle Ambient Halo */}
        <div className="absolute -inset-1 bg-gradient-to-r from-gold-trim/20 via-rose-glow/20 to-gold-trim/20 blur-xl opacity-60 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          
          {/* Large Video Frame with Dynamic Aspect Ratio */}
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-gold-trim/60 shadow-2xl bg-black flex items-center justify-center">
            <video 
              ref={videoRef}
              src="/media/video-2.mp4"
              controls
              playsInline
              preload="metadata"
              onPlay={handleVideoPlay}
              onPause={handleVideoPauseOrEnd}
              onEnded={handleVideoPauseOrEnd}
              className="w-full max-h-[75vh] object-contain mx-auto"
            />
          </div>

          {/* Audio Indicator & Message */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full px-2 gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2 text-xs font-label text-accent dark:text-dark-primary font-semibold bg-gold-light/40 dark:bg-accent/15 px-3.5 py-1.5 rounded-full border border-gold-trim/30">
              <span className="material-symbols-outlined text-base">
                {isVideoPlaying ? 'volume_off' : 'music_note'}
              </span>
              <span>
                {isVideoPlaying 
                  ? 'Música de fondo pausada durante el video' 
                  : 'Sube el volumen para escuchar el video'}
              </span>
            </div>

            <p className="font-handwritten text-xl sm:text-2xl text-light-on-surface dark:text-dark-on-surface">
              “Risas, caminos y momentos inolvidables juntos ✨”
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
