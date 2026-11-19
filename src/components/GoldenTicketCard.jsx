import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { celebrationData } from '../data/celebrationData';

export default function GoldenTicketCard() {
  const [isClaimed, setIsClaimed] = useState(false);

  const handleClaim = (e) => {
    if (!isClaimed) {
      setIsClaimed(true);

      // Trigger Confetti Blast from Button Position
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { x, y },
        colors: ['#8C711E', '#D4AF37', '#F472B6', '#FCE7F3', '#FFFFFF', '#047857']
      });
    }
  };

  const { voucher } = celebrationData;

  return (
    <div className="relative h-full rounded-2xl bg-gradient-to-br from-parchment via-ticket-bg to-gold-light dark:from-[#21182E] dark:via-dark-surface dark:to-[#2B1B3D] border-2 border-gold-trim/60 shadow-2xl overflow-hidden p-6 sm:p-8 flex flex-col justify-between">
      
      {/* Perforation Rip Cutouts (Left & Right) */}
      <div className="ticket-rip-left bg-light-surface dark:bg-dark-surface border-r-2 border-gold-trim/60" />
      <div className="ticket-rip-right bg-light-surface dark:bg-dark-surface border-l-2 border-gold-trim/60" />

      {/* Ticket Header */}
      <div className="text-center pb-5 border-b-2 border-dashed border-gold-trim/40 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-accent/15 text-accent dark:text-dark-primary font-label text-xs uppercase tracking-wider font-semibold mb-2">
          <span>{voucher.badge}</span>
        </div>
        <h3 className="font-headline text-2xl sm:text-3xl text-light-on-surface dark:text-dark-on-surface font-semibold">
          {voucher.title}
        </h3>
        <p className="font-label text-xs sm:text-sm text-light-text-muted dark:text-dark-text-muted mt-1">
          Emitido exclusivamente para: <strong className="text-light-on-surface dark:text-dark-on-surface font-bold text-accent dark:text-rose-glow">{voucher.recipientLabel}</strong>
        </p>
      </div>

      {/* Ticket Details Grid */}
      <div className="py-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 font-label text-xs sm:text-sm">
        {voucher.items.map((item, idx) => (
          <div key={idx} className="p-3 sm:p-3.5 rounded-lg bg-white/60 dark:bg-dark-surface-card/60 border border-gold-trim/20 shadow-xs">
            <span className="text-light-text-muted dark:text-dark-text-muted block text-[10px] sm:text-[11px] font-semibold tracking-wider">
              {item.label}
            </span>
            <span className="text-light-on-surface dark:text-dark-on-surface font-semibold text-sm sm:text-base mt-0.5 block">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Simulated Barcode Graphic */}
      <div className="pt-4 border-t-2 border-dashed border-gold-trim/40 flex flex-col items-center">
        <div className="flex items-center justify-center gap-1.5 h-10 w-full max-w-[260px] opacity-80 dark:invert">
          <span className="w-1.5 h-full bg-zinc-900"></span>
          <span className="w-1 h-full bg-zinc-900"></span>
          <span className="w-0.5 h-full bg-zinc-900"></span>
          <span className="w-2 h-full bg-zinc-900"></span>
          <span className="w-1 h-full bg-zinc-900"></span>
          <span className="w-2 h-full bg-zinc-900"></span>
          <span className="w-1 h-full bg-zinc-900"></span>
          <span className="w-0.5 h-full bg-zinc-900"></span>
          <span className="w-1.5 h-full bg-zinc-900"></span>
          <span className="w-1 h-full bg-zinc-900"></span>
          <span className="w-1.5 h-full bg-zinc-900"></span>
          <span className="w-0.5 h-full bg-zinc-900"></span>
          <span className="w-2 h-full bg-zinc-900"></span>
          <span className="w-1 h-full bg-zinc-900"></span>
          <span className="w-1.5 h-full bg-zinc-900"></span>
        </div>
        <span className="font-label text-[10px] sm:text-xs text-light-text-muted dark:text-dark-text-muted tracking-widest mt-1">
          {voucher.code}
        </span>
      </div>

      {/* Interactive Claim My Gift Button */}
      <div className="mt-6 flex flex-col items-center">
        <button 
          type="button" 
          onClick={handleClaim}
          className={`group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full font-label text-sm sm:text-base font-semibold shadow-xl transition-all w-full max-w-md ${
            isClaimed
              ? 'bg-emerald-700 text-white cursor-default'
              : 'bg-light-primary dark:bg-dark-primary text-light-on-primary dark:text-dark-on-primary hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          <span className="material-symbols-outlined text-lg sm:text-xl text-amber-200 dark:text-dark-on-primary">
            {isClaimed ? 'check_circle' : 'redeem'}
          </span>
          <span>
            {isClaimed ? voucher.claimedText : voucher.claimButtonText}
          </span>
        </button>

        {isClaimed && (
          <p className="text-xs sm:text-sm font-label text-success-text dark:text-emerald-400 font-semibold mt-3 text-center animate-bounce">
            {voucher.confirmationMsg}
          </p>
        )}
      </div>

    </div>
  );
}
