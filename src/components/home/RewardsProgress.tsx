import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, RefreshCwIcon } from 'lucide-react';
export function RewardsProgress() {
  const currentCoins = 85;
  const nextReward = 100;
  const progress = currentCoins / nextReward * 100;
  return <div className="px-5 py-6">
      <motion.div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-5 overflow-hidden shadow-xl" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }} whileTap={{
      scale: 0.98
    }}>
        <div className="relative flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <motion.div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center" animate={{
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
              <TrophyIcon className="w-6 h-6 text-white" />
            </motion.div>

            <div>
              <p className="text-sm font-bold text-white">
                {currentCoins}+ OyaCoin
              </p>
              <p className="text-xs text-white/80">to your next reward</p>
            </div>
          </div>

          <motion.button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors" whileTap={{
          scale: 0.95,
          rotate: 180
        }}>
            <RefreshCwIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div className="h-full bg-white rounded-full" initial={{
          width: 0
        }} animate={{
          width: `${progress}%`
        }} transition={{
          delay: 0.5,
          duration: 1,
          ease: 'easeOut'
        }} />
        </div>
      </motion.div>
    </div>;
}