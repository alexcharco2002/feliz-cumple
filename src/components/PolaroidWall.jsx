import React, { useState } from 'react';
import { celebrationData } from '../data/celebrationData';

export default function PolaroidWall() {
  const [flippedCards, setFlippedCards] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <div id="polaroids-section" className="relative">
      
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-light-surface-card dark:bg-dark-surface-card border border-gold-trim/40 text-accent dark:text-dark-primary font-label text-xs sm:text-sm uppercase tracking-widest shadow-sm mb-3">
          <span className="material-symbols-outlined text-sm sm:text-base text-gold-trim">photo_camera</span>
          <span>Nuestros Mejores Capítulos</span>
        </div>
        <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl text-light-on-surface dark:text-dark-on-surface font-semibold tracking-tight">
          Cada foto guarda una historia
        </h2>
        <p className="font-body text-sm sm:text-base text-light-text-muted dark:text-dark-text-muted mt-2 max-w-xl mx-auto">
          Haz clic en cualquier tarjeta y descubrir la nota que escribí para ti.
        </p>
      </div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch justify-items-center max-w-6xl mx-auto">
        {celebrationData.polaroids.map((card) => {
          const isFlipped = !!flippedCards[card.id];

          return (
            <div 
              key={card.id} 
              className="w-full max-w-[340px] h-[450px]"
              style={{ perspective: '1200px' }}
            >
              {/* Outer tilt/hover wrapper */}
              <div className={`w-full h-full transition-transform duration-300 ease-out hover:scale-[1.03] ${card.rotation} hover:rotate-0`}>
                
                {/* 3D Flipper Box */}
                <div 
                  onClick={() => toggleFlip(card.id)}
                  className="relative w-full h-full cursor-pointer transition-transform duration-700 ease-in-out select-none"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  
                  {/* FRONT SIDE (Polaroid Picture) */}
                  <div 
                    className="absolute inset-0 w-full h-full p-4 pb-5 rounded-2xl bg-white text-zinc-900 shadow-2xl border border-zinc-200/90 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden'
                    }}
                  >
                    {/* Washi Tape Graphic */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/80 dark:bg-amber-200/60 backdrop-blur-sm border border-amber-300/40 rotate-1 shadow-xs rounded-xs pointer-events-none z-10" />

                    {/* Photo Container */}
                    <div className="relative w-full h-64 bg-zinc-100 rounded-lg overflow-hidden shadow-inner group">
                      <img 
                        src={card.image} 
                        alt={card.title} 
                        onError={(e) => {
                          if (e.target.src.endsWith('.jpg')) {
                            e.target.src = e.target.src.replace('.jpg', '.jpeg');
                          } else if (e.target.src.endsWith('.jpeg')) {
                            e.target.src = e.target.src.replace('.jpeg', '.jpg');
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <span className="font-label absolute bottom-2 right-2 px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[11px] backdrop-blur-sm font-medium">
                        {card.tag}
                      </span>
                      
                      {/* Zoom Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewPhoto(card);
                        }}
                        aria-label="Ver foto en tamaño completo"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm flex items-center justify-center transition-colors opacity-80 hover:opacity-100"
                      >
                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                      </button>
                    </div>

                    {/* Captions & Flip Button */}
                    <div className="mt-2 text-center flex flex-col items-center">
                      <p className="font-handwritten text-2xl text-zinc-800 leading-tight">
                        {card.title}
                      </p>
                      <p className="font-label text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 mt-1 px-1 leading-snug line-clamp-2">
                        {card.location}
                      </p>
                      
                      <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 text-light-primary border border-rose-200/60 font-label text-xs font-semibold shadow-xs hover:bg-rose-100 transition-colors">
                        <span className="material-symbols-outlined text-sm text-rose-glow">favorite</span>
                        <span>Ver nota secreta 💌</span>
                        <span className="material-symbols-outlined text-sm text-accent">sync</span>
                      </div>
                    </div>
                  </div>

                  {/* BACK SIDE (Heartfelt Note) */}
                  <div 
                    className="absolute inset-0 w-full h-full p-6 rounded-2xl bg-parchment dark:bg-dark-surface-card text-zinc-800 dark:text-zinc-100 shadow-2xl border-2 border-gold-trim/50 flex flex-col justify-between"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div>
                      {/* Note Header */}
                      <div className="flex items-center justify-between border-b border-gold-trim/30 pb-3 mb-3">
                        <span className="font-label text-xs uppercase tracking-wider font-semibold text-accent dark:text-dark-primary flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">lock_open</span>
                          Nota Secreta de Jeferson
                        </span>
                        <span className="material-symbols-outlined text-rose-glow text-lg animate-pulse">
                          favorite
                        </span>
                      </div>

                      {/* Handwritten Message */}
                      <p className="font-handwritten text-lg sm:text-[19px] text-zinc-700 dark:text-zinc-200 leading-snug sm:leading-relaxed text-justify">
                        “{card.note}”
                      </p>
                    </div>

                    {/* Note Footer */}
                    <div className="pt-3 border-t border-gold-trim/30 flex items-center justify-between text-xs font-label text-light-text-muted dark:text-dark-text-muted">
                      <span className="italic">{card.tag}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(card.id);
                        }}
                        className="inline-flex items-center gap-1 text-accent dark:text-dark-primary font-semibold hover:underline"
                      >
                        <span className="material-symbols-outlined text-sm">photo</span>
                        <span>Volver a ver foto</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Photo Preview Modal */}
      {previewPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewPhoto(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white dark:bg-dark-surface-card p-4 rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-light-primary text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <img 
              src={previewPhoto.image} 
              alt={previewPhoto.title} 
              onError={(e) => {
                if (e.target.src.endsWith('.jpg')) {
                  e.target.src = e.target.src.replace('.jpg', '.jpeg');
                } else if (e.target.src.endsWith('.jpeg')) {
                  e.target.src = e.target.src.replace('.jpeg', '.jpg');
                }
              }}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="mt-3 text-center">
              <p className="font-headline text-xl text-light-on-surface dark:text-dark-on-surface font-semibold">
                {previewPhoto.title}
              </p>
              <p className="font-label text-xs text-light-text-muted dark:text-dark-text-muted">
                {previewPhoto.location}
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
