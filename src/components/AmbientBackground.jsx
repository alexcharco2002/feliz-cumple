import React from 'react';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Rose & Blush floating glow orb */}
      <div className="absolute -top-32 -left-20 w-[450px] sm:w-[550px] h-[450px] sm:h-[550px] rounded-full bg-blush/60 dark:bg-rose-glow/15 blur-3xl animate-float-orb" />
      
      {/* Champagne Gold floating glow orb */}
      <div 
        className="absolute top-1/4 -right-32 w-[500px] sm:w-[650px] h-[500px] sm:h-[650px] rounded-full bg-gold-light/70 dark:bg-gold-trim/15 blur-3xl animate-float-orb" 
        style={{ animationDelay: '-6s' }} 
      />
      
      {/* Velvet Violet / Plum floating glow orb */}
      <div 
        className="absolute bottom-1/4 left-1/4 w-[480px] sm:w-[600px] h-[480px] sm:h-[600px] rounded-full bg-blush/40 dark:bg-purple-900/20 blur-3xl animate-float-orb" 
        style={{ animationDelay: '-10s' }} 
      />
    </div>
  );
}
