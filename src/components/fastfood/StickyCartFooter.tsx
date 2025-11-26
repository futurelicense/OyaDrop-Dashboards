import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Coins, ChevronUp } from 'lucide-react';
interface StickyCartFooterProps {
  itemCount: number;
  subtotal: number;
  xpToEarn: number;
  coinsToEarn: number;
  onCheckout: () => void;
}
export function StickyCartFooter({
  itemCount,
  subtotal,
  xpToEarn,
  coinsToEarn,
  onCheckout
}: StickyCartFooterProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  if (itemCount === 0) return null;
  return <>
      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setIsExpanded(false)} />}
      </AnimatePresence>

      {/* Cart Footer */}
      <motion.div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-[#0A0E1A] via-[#0F1520] to-transparent backdrop-blur-xl border-t border-cyan-500/20" initial={{
      y: 100
    }} animate={{
      y: 0
    }} transition={{
      type: 'spring',
      damping: 20
    }}>
        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && <motion.div className="bg-[#131B2E] border-b border-white/10 p-4" initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }}>
              <h3 className="text-sm font-bold text-white mb-3">
                Suggested Add-ons
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#0A0E1A] rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-white font-semibold mb-1">
                    🍟 Large Fries
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400">
                      ₦800
                    </span>
                    <button className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-lg">
                      Add
                    </button>
                  </div>
                </div>
                <div className="bg-[#0A0E1A] rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-white font-semibold mb-1">
                    🥤 Coke
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-cyan-400">
                      ₦500
                    </span>
                    <button className="text-xs bg-cyan-500 text-white px-2 py-1 rounded-lg">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>}
        </AnimatePresence>

        {/* Main Footer */}
        <div className="p-4">
          {/* Expand/Collapse Button */}
          <button className="w-full flex items-center justify-center mb-3" onClick={() => setIsExpanded(!isExpanded)}>
            <motion.div animate={{
            rotate: isExpanded ? 180 : 0
          }} transition={{
            duration: 0.3
          }}>
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </motion.div>
          </button>

          <div className="flex items-center gap-3 mb-3">
            {/* Cart Info */}
            <div className="flex items-center gap-2 flex-1">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">{itemCount} items</p>
                <p className="text-lg font-bold text-white">
                  ₦{subtotal.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Rewards Preview */}
            <div className="flex gap-2">
              <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-lg">
                <Zap className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-yellow-400">
                  +{xpToEarn}
                </span>
              </div>
              <div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-lg">
                <Coins className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">
                  +{coinsToEarn}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30" onClick={onCheckout} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            Review Order & Gain XP
          </motion.button>
        </div>
      </motion.div>
    </>;
}