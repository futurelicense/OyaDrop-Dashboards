import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowDownToLine, RefreshCw, Lock, Sparkles } from 'lucide-react';
export function AnimatedBalanceCard() {
  const balance = 1782216.65;
  const cashbackCoins = 38249.27;
  const nextRewardAt = 50000;
  const rewardProgress = cashbackCoins / nextRewardAt * 100;
  return <motion.div className="relative mx-4 mt-6 mb-6 p-6 rounded-3xl bg-gradient-to-br from-[#131B2E] via-[#1A2332] to-[#0F1520] overflow-hidden" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.5
  }} style={{
    boxShadow: '0 20px 60px rgba(0, 217, 192, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
  }}>
      {/* Animated Background Glow */}
      <motion.div className="absolute -top-20 -right-20 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl" animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.3, 0.2]
    }} transition={{
      duration: 4,
      repeat: Infinity
    }} />
      <motion.div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.3, 0.2]
    }} transition={{
      duration: 5,
      repeat: Infinity,
      delay: 1
    }} />

      {/* Sparkle Effect */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" animate={{
      x: ['-100%', '100%']
    }} transition={{
      duration: 3,
      repeat: Infinity,
      repeatDelay: 5,
      ease: 'easeInOut'
    }} />

      <div className="relative z-10">
        {/* Security Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
            <Lock className="w-3 h-3 text-green-400" />
            <span className="text-xs font-medium text-green-400">Secured</span>
          </div>
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>

        {/* Balance Section */}
        <div className="mb-6">
          <p className="text-gray-400 text-xs mb-2 uppercase tracking-wider">
            Wallet Balance
          </p>
          <motion.h1 className="text-5xl font-bold text-white mb-2 tracking-tight" initial={{
          scale: 0.9
        }} animate={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.2
        }}>
            ₦
            {balance.toLocaleString('en-NG', {
            minimumFractionDigits: 2
          })}
          </motion.h1>
        </div>

        {/* OyaCoin Cashback with Rotating Coin */}
        <div className="flex items-center gap-3 mb-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20">
          <motion.img src="/oyadrop_app_0.png" alt="OyaCoin" className="w-12 h-12" animate={{
          rotateY: [0, 360]
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear'
        }} />
          <div className="flex-1">
            <p className="text-xs text-gray-400">Cashback Earned</p>
            <p className="text-xl font-bold text-amber-400">
              {cashbackCoins.toLocaleString()} OC
            </p>
          </div>
        </div>

        {/* Next Reward Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-gray-400">Next Reward Unlock</p>
            <p className="text-xs font-bold text-cyan-400">
              {nextRewardAt.toLocaleString()} OC
            </p>
          </div>
          <div className="relative h-2 bg-[#0A0E1A] rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-full" initial={{
            width: 0
          }} animate={{
            width: `${rewardProgress}%`
          }} transition={{
            delay: 0.7,
            duration: 1,
            ease: 'easeOut'
          }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-shadow">
            <Plus className="w-5 h-5" />
            <span className="text-xs">Add Fund</span>
          </motion.button>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-white/5 backdrop-blur-sm text-white font-semibold border border-white/10 hover:bg-white/10 transition-colors">
            <ArrowDownToLine className="w-5 h-5" />
            <span className="text-xs">Withdraw</span>
          </motion.button>

          <motion.button whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow">
            <RefreshCw className="w-5 h-5" />
            <span className="text-xs">Convert</span>
          </motion.button>
        </div>
      </div>
    </motion.div>;
}