import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
export function OyaCoinInfoBanner() {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;
  return <motion.div initial={{
    opacity: 0,
    height: 0
  }} animate={{
    opacity: 1,
    height: 'auto'
  }} exit={{
    opacity: 0,
    height: 0
  }} className="mx-4 mb-6">
      <div className="relative p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 backdrop-blur-sm">
        <button onClick={() => setIsVisible(false)} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/10 active:scale-95 transition-all" aria-label="Dismiss">
          <X className="w-4 h-4 text-slate-400" />
        </button>

        <div className="flex items-start gap-3 pr-6">
          <img src="/image.png" alt="OyaCoin" className="w-10 h-10 flex-shrink-0" />

          <div>
            <p className="text-white text-sm leading-relaxed mb-2">
              <span className="font-semibold text-teal-400">
                1 Oya Coin = ₦10.
              </span>{' '}
              Exchange and enjoy{' '}
              <span className="font-semibold">Zero fees</span> on sending &
              receiving coins.
            </p>
            <button className="flex items-center gap-1 text-teal-400 text-sm font-medium hover:gap-2 transition-all">
              Click to explore
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>;
}