import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Flame, Zap } from 'lucide-react';
export function GamifiedWalletHeader() {
  const currentXP = 1450;
  const nextLevelXP = 2000;
  const xpProgress = currentXP / nextLevelXP * 100;
  const currentLevel = 8;
  const levelTitle = 'Coin Master';
  const streak = 12;
  return <motion.header className="sticky top-0 z-50 bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-transparent backdrop-blur-xl border-b border-cyan-500/20" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <div className="px-4 pt-4 pb-3">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Menu className="w-6 h-6 text-white" />
          </motion.button>

          <motion.div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            Wallet Quest
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Bell className="w-5 h-5 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_#B026FF]" />
            </motion.button>
          </div>
        </div>

        {/* Player Status Bar */}
        <div className="flex items-center gap-3 mb-3">
          {/* Avatar with Level Ring */}
          <motion.div className="relative" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.3,
          type: 'spring'
        }}>
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-purple-500 p-0.5 shadow-[0_0_20px_rgba(0,217,192,0.5)]">
              <div className="w-full h-full rounded-full bg-[#0F1520] flex items-center justify-center border-2 border-cyan-400/30">
                <span className="text-xl">🎮</span>
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-500 px-2 py-0.5 rounded-full text-[10px] font-bold text-black shadow-lg">
              Lv {currentLevel}
            </div>
          </motion.div>

          {/* XP Progress & Level Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <p className="text-xs font-bold text-white">{levelTitle}</p>
                <motion.div className="flex items-center gap-1 bg-green-500/20 px-2 py-0.5 rounded-full" animate={{
                scale: [1, 1.05, 1]
              }} transition={{
                duration: 2,
                repeat: Infinity
              }}>
                  <Zap className="w-3 h-3 text-green-400 fill-green-400" />
                  <span className="text-[10px] font-bold text-green-400">
                    +50 XP
                  </span>
                </motion.div>
              </div>
              <p className="text-[10px] text-gray-400">
                {currentXP}/{nextLevelXP} XP
              </p>
            </div>

            {/* XP Progress Bar */}
            <div className="relative h-2 bg-[#131B2E] rounded-full overflow-hidden border border-cyan-500/20">
              <motion.div className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-500 rounded-full relative" initial={{
              width: 0
            }} animate={{
              width: `${xpProgress}%`
            }} transition={{
              delay: 0.5,
              duration: 1,
              ease: 'easeOut'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </motion.div>
            </div>
          </div>

          {/* Streak Counter */}
          <motion.div className="flex items-center gap-1.5 bg-gradient-to-br from-orange-500 to-red-600 px-3 py-2 rounded-xl shadow-[0_0_16px_rgba(255,107,0,0.4)]" initial={{
          x: 20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.4
        }} whileHover={{
          scale: 1.05
        }}>
            <motion.div animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 1,
            repeat: Infinity
          }}>
              <Flame className="w-4 h-4 text-white fill-white" />
            </motion.div>
            <div className="text-right">
              <p className="text-xs font-bold text-white leading-none">
                {streak}
              </p>
              <p className="text-[8px] text-white/80 leading-none">Days</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>;
}