import React, { useState } from 'react';
import { celebrationData } from '../data/celebrationData';

export default function VideoPlayerCard() {
  const [selectedVideo, setSelectedVideo] = useState(celebrationData.videos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl bg-light-surface-card dark:bg-dark-surface-card border-2 border-gold-trim/40 shadow-2xl p-6 overflow-hidden">
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-label text-xs text-accent dark:text-dark-primary uppercase tracking-widest font-semibold">
            Nuestra primera chamba juntos
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-rose-glow/20 text-light-primary dark:text-rose-glow text-xs font-semibold">
            De Jeferson para Magaly
          </span>
        </div>
        <h3 className="font-headline text-xl sm:text-2xl text-light-on-surface dark:text-dark-on-surface font-semibold mb-3">
          {selectedVideo.title}
        </h3>
      </div>

      {/* Video Player Frame with Glowing Border */}
      <div className="relative w-full rounded-xl overflow-hidden border-2 border-gold-trim/50 shadow-xl bg-black aspect-[16/10] my-3">
        <video 
          key={selectedVideo.src}
          src={selectedVideo.src}
          controls
          playsInline
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      </div>

      {/* Video Selector Tabs */}
      <div className="mt-2">
        <p className="font-label text-xs text-light-text-muted dark:text-dark-text-muted mb-2 font-medium">
          Selecciona un video para reproducir:
        </p>
        <div className="grid grid-cols-2 gap-2">
          {celebrationData.videos.map((vid) => (
            <button
              key={vid.id}
              type="button"
              onClick={() => setSelectedVideo(vid)}
              className={`px-3 py-2 rounded-lg text-xs font-label text-left transition-all flex items-center justify-between ${
                selectedVideo.id === vid.id
                  ? 'bg-light-primary text-white dark:bg-dark-primary dark:text-dark-on-primary font-semibold shadow-sm'
                  : 'bg-light-surface dark:bg-dark-surface-card-subtle text-light-text-muted dark:text-dark-text-muted hover:bg-gold-light/40 border border-gold-trim/20'
              }`}
            >
              <span className="truncate">{vid.badge}</span>
              <span className="material-symbols-outlined text-sm">
                {selectedVideo.id === vid.id ? 'play_circle' : 'movie'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="font-body text-xs text-light-text-muted dark:text-dark-text-muted mt-4 text-center italic">
        Grabado en secreto y con todo el amor.
      </p>

    </div>
  );
}
