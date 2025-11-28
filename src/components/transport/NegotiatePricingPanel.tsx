import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Info } from 'lucide-react';
export function NegotiatePricingPanel() {
  return <div className="px-4 py-4">
      <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-5 border border-purple-500/30" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }}>
        <h3 className="text-sm font-bold text-white mb-4">Set Your Price</h3>

        {/* Price Input */}
        <div className="relative mb-4">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <input type="number" placeholder="Enter your offer" className="w-full bg-[#0A0E1A] text-white text-2xl font-bold pl-12 pr-4 py-4 rounded-xl border border-purple-500/30 focus:border-purple-500/50 focus:outline-none placeholder:text-gray-600" />
        </div>

        {/* Recommended Range */}
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-3 mb-4">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-purple-400 font-semibold mb-1">
                Recommended Range
              </p>
              <p className="text-lg font-bold text-white">₦1,900 - ₦2,500</p>
              <p className="text-xs text-gray-400 mt-1">
                More drivers will respond to fair offers
              </p>
            </div>
          </div>
        </div>

        {/* Send Offer Button */}
        <motion.button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-purple-500/30" whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }}>
          Send Offer to Drivers
        </motion.button>
      </motion.div>
    </div>;
}