import React from 'react';
import { celebrationData } from '../data/celebrationData';

export default function Footer() {
  return (
    <footer className="py-10 text-center">
      <div className="flex items-center justify-center gap-3 text-accent dark:text-dark-primary mb-3">
        <span className="h-px w-12 bg-gold-trim/60"></span>
        <span className="material-symbols-outlined text-base text-rose-glow animate-pulse">
          favorite
        </span>
        <span className="h-px w-12 bg-gold-trim/60"></span>
      </div>
      <p className="font-handwritten text-2xl sm:text-3xl text-light-on-surface dark:text-dark-on-surface font-medium">
        Creado con cariño por {celebrationData.sender} para {celebrationData.recipient}
      </p>
      <p className="font-label text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mt-1 tracking-wide">
        20 DE NOVIEMBRE • EL DÍA QUE EL MUNDO SE PUSO MÁS BONITO
      </p>
    </footer>
  );
}
