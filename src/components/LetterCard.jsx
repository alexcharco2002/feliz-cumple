import React from 'react';
import { celebrationData } from '../data/celebrationData';

export default function LetterCard() {
  return (
    <div id="letter-section" className="flex justify-center w-full">
      <div className="w-full max-w-5xl">
        
        <article className="relative rounded-3xl bg-light-surface-card dark:bg-dark-surface-card border-2 border-gold-trim/40 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden transition-all">
          
          {/* Subtle Corner Flourishes */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-accent/10 via-blush/20 to-transparent pointer-events-none rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-accent/10 to-transparent pointer-events-none rounded-bl-3xl" />

          {/* 2-Column Layout: Illustration on Left, Heartfelt Letter on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Portrait Illustration of Magaly */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] rounded-2xl overflow-hidden border-2 border-gold-trim/60 shadow-2xl group bg-gold-light/20">
                {/* Gold corner ornaments */}
                <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-gold-trim/80 z-10 pointer-events-none" />
                <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-gold-trim/80 z-10 pointer-events-none" />
                <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-gold-trim/80 z-10 pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-gold-trim/80 z-10 pointer-events-none" />

                <img 
                  src="/media/animado_magui.jpg" 
                  alt="Ilustración mágica de Magaly en el bosque" 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Badge on Image */}
                <span className="font-label absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/65 text-amber-200 text-xs backdrop-blur-sm font-semibold border border-amber-300/30">
                  ✦ Mi Persona Favorita ✦
                </span>
              </div>

              {/* Caption below illustration */}
              <div className="mt-4 text-center">
                <p className="font-handwritten text-2xl text-light-primary dark:text-rose-glow font-bold leading-tight">
                  “Mi chica de cuento de hadas ✨”
                </p>
                <p className="font-label text-xs text-light-text-muted dark:text-dark-text-muted mt-0.5">
                  Magaly iluminando cada paisaje
                </p>
              </div>
            </div>

            {/* Right Column: Love Letter Content */}
            <div className="lg:col-span-7 flex flex-col">
              
              {/* Header */}
              <div className="flex items-center gap-3 text-accent dark:text-dark-primary mb-3">
                <span className="h-px w-10 bg-gold-trim/60"></span>
                <span className="material-symbols-outlined text-lg">local_florist</span>
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span className="material-symbols-outlined text-lg text-rose-glow">favorite</span>
                <span className="h-px w-10 bg-gold-trim/60"></span>
              </div>

              <header className="mb-6">
                <h2 className="font-headline text-3xl sm:text-4xl text-light-on-surface dark:text-dark-on-surface font-semibold tracking-tight">
                  {celebrationData.letter.title}{' '}
                  <span className="italic font-normal text-light-primary dark:text-rose-glow">
                    {celebrationData.letter.titleHighlight}
                  </span>
                </h2>
                <p className="font-label text-xs text-accent dark:text-dark-primary uppercase tracking-widest mt-1 font-semibold">
                  {celebrationData.dateText}
                </p>
              </header>

              {/* Body Message */}
              <div className="font-body text-base text-light-on-surface dark:text-dark-on-surface leading-relaxed space-y-4 text-justify">
                {celebrationData.letter.paragraphs.map((para, idx) => (
                  <p key={idx} className="first-letter:text-2xl first-letter:font-headline first-letter:text-accent dark:first-letter:text-dark-primary">
                    {para}
                  </p>
                ))}
              </div>

              {/* Divider Line */}
              <div className="my-6 flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-light-border-subtle dark:bg-dark-border-subtle"></span>
                <span className="material-symbols-outlined text-accent dark:text-dark-primary text-sm">
                  diamond
                </span>
                <span className="h-px flex-1 bg-light-border-subtle dark:bg-dark-border-subtle"></span>
              </div>

              {/* Handwritten Signature Block */}
              <footer className="text-right flex flex-col items-end">
                <span className="font-handwritten text-xl text-light-text-muted dark:text-dark-text-muted">
                  {celebrationData.letter.signOff}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-handwritten text-2xl sm:text-3xl text-light-primary dark:text-accent font-bold tracking-wide">
                    {celebrationData.letter.signature}
                  </span>
                  <span className="material-symbols-outlined text-rose-glow text-xl animate-pulse">
                    favorite
                  </span>
                </div>
              </footer>

            </div>

          </div>

        </article>
      </div>
    </div>
  );
}
