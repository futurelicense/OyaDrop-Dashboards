import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, ArrowDownToLine } from 'lucide-react';
export function WalletBalanceCard() {
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} className="relative mx-4 mt-6 mb-6 p-6 rounded-3xl bg-gradient-to-br from-[#132337] to-[#0F1D2E] overflow-hidden" style={{
    boxShadow: '0 20px 60px rgba(0, 217, 192, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  }}>
      {/* Animated shimmer overlay */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{
      x: ['-100%', '100%']
    }} transition={{
      duration: 3,
      repeat: Infinity,
      repeatDelay: 5,
      ease: 'easeInOut'
    }} />

      {/* Glow effect */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-teal-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" />

      <div className="relative z-10">
        {/* Balance Section */}
        <div className="mb-6">
          <p className="text-slate-400 text-sm mb-2">Available Balance</p>
          <motion.h1 className="text-5xl font-bold text-white mb-2 tracking-tight" initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.2
        }}>
            ₦1,782,216.65
          </motion.h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400 text-xs font-medium">12.5%</span>
            </div>
            <span className="text-slate-500 text-xs">from last month</span>
          </div>
        </div>

        {/* Cashback Section */}
        <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
          <motion.img src="/image.png" alt="OyaCoin" className="w-10 h-10" animate={{
          rotateY: [0, 360]
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }} />
          <div>
            <p className="text-slate-400 text-xs">Cashback Earned</p>
            <p className="text-amber-400 text-lg font-bold">38,249.27 OC</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-shadow">
            <Plus className="w-5 h-5" />
            Add Fund
          </motion.button>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/5 backdrop-blur-sm text-white font-semibold border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowDownToLine className="w-5 h-5" />
            Withdrawal
          </motion.button>
        </div>
      </div>
    </motion.div>;
}