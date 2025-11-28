import React from 'react';
import { motion } from 'framer-motion';
interface RideModeSelectorProps {
  mode: 'regular' | 'negotiate';
  onModeChange: (mode: 'regular' | 'negotiate') => void;
}
export function RideModeSelector({
  mode,
  onModeChange
}: RideModeSelectorProps) {
  return <div className="px-4 py-4">
      <div className="relative bg-[#131B2E] rounded-2xl p-1 border border-cyan-500/20">
        <div className="grid grid-cols-2 gap-1 relative">
          {/* Sliding Background */}
          <motion.div className="absolute inset-y-1 w-[calc(50%-4px)] bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl shadow-lg shadow-cyan-500/30" animate={{
          x: mode === 'regular' ? 4 : 'calc(100% + 4px)'
        }} transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300
        }} />

          {/* Regular Button */}
          <button className={`relative z-10 py-3 px-4 rounded-xl font-semibold text-sm transition-colors ${mode === 'regular' ? 'text-white' : 'text-gray-400'}`} onClick={() => onModeChange('regular')}>
            🚗 Regular Ride
          </button>

          {/* Negotiate Button */}
          <button className={`relative z-10 py-3 px-4 rounded-xl font-semibold text-sm transition-colors ${mode === 'negotiate' ? 'text-white' : 'text-gray-400'}`} onClick={() => onModeChange('negotiate')}>
            💰 Negotiate Ride
          </button>
        </div>
      </div>
    </div>;
}