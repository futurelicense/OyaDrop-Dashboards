import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
interface FareSummaryFooterProps {
  mode: 'regular' | 'negotiate';
  fare: string;
  pickup: string;
  destination: string;
}
export function FareSummaryFooter({
  mode,
  fare,
  pickup,
  destination
}: FareSummaryFooterProps) {
  return <motion.div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0A0E1A] via-[#0F1520] to-transparent backdrop-blur-xl border-t border-cyan-500/20 p-4" initial={{
    y: 100
  }} animate={{
    y: 0
  }} transition={{
    type: 'spring',
    damping: 20
  }}>
      {/* Summary */}
      <div className="mb-3">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
          <span className="truncate max-w-[40%]">
            {pickup || 'Pickup location'}
          </span>
          <ArrowRight className="w-4 h-4 flex-shrink-0" />
          <span className="truncate max-w-[40%]">
            {destination || 'Destination'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400">
              {mode === 'regular' ? 'Estimated Fare' : 'Your Offer'}
            </p>
            <p className="text-2xl font-bold text-white">{fare}</p>
          </div>

          <div className="flex items-center gap-1 bg-yellow-500/20 px-3 py-1.5 rounded-lg">
            <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-bold text-yellow-400">+25 XP</span>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2" whileHover={{
      scale: 1.02
    }} whileTap={{
      scale: 0.98
    }}>
        {mode === 'regular' ? '🚗 Book Ride Now' : '💰 Send Offer to Drivers'}
      </motion.button>
    </motion.div>;
}