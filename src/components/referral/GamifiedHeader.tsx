import React from 'react';
import { motion } from 'framer-motion';
import { BellIcon, MenuIcon, UserCircleIcon, FlameIcon } from 'lucide-react';
interface GamifiedHeaderProps {
  onMenuClick: () => void;
}
export function GamifiedHeader({
  onMenuClick
}: GamifiedHeaderProps) {
  const currentXP = 2450;
  const nextLevelXP = 3000;
  const xpProgress = currentXP / nextLevelXP * 100;
  const currentLevel = 'Pro';
  const streak = 7;
  return <motion.header className="sticky top-0 z-50 bg-gradient-to-b from-[#0a1a1f] via-[#0f2027] to-transparent backdrop-blur-xl border-b border-[#00ffcc]/20" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <div className="px-5 pt-4 pb-3">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }} onClick={onMenuClick}>
            <MenuIcon className="w-6 h-6 text-white" />
          </motion.button>

          <motion.div className="text-xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00d9ff] bg-clip-text text-transparent" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            Referral Quest
          </motion.div>

          <div className="flex items-center gap-3">
            <motion.button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <BellIcon className="w-6 h-6 text-white" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ff00ff] rounded-full shadow-[0_0_8px_#ff00ff]" />
            </motion.button>

            <motion.button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] p-0.5 shadow-[0_0_12px_rgba(0,255,204,0.4)]" whileTap={{
            scale: 0.95
          }}>
              <div className="w-full h-full rounded-full bg-[#1a2a2f] flex items-center justify-center">
                <UserCircleIcon className="w-5 h-5 text-[#00ffcc]" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Level Badge & Streak */}
        <div className="flex items-center justify-between mb-3">
          <motion.div className="flex items-center gap-3" initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffd700] via-[#ffb800] to-[#ff8800] p-1 shadow-[0_0_20px_rgba(255,215,0,0.5)]">
                <div className="w-full h-full rounded-full bg-[#0f2027] flex items-center justify-center border-2 border-[#ffd700]/30">
                  <span className="text-2xl font-bold text-[#ffd700]">12</span>
                </div>
              </div>
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#ffd700] to-[#ffb800] px-2 py-0.5 rounded-full text-[10px] font-bold text-[#0a1a1f] whitespace-nowrap shadow-lg">
                {currentLevel}
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400 mb-0.5">Level 12 • Pro</p>
              <p className="text-sm font-semibold text-white">
                {currentXP.toLocaleString()} XP
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-center gap-2 bg-gradient-to-br from-[#ff6b00] to-[#ff0000] px-3 py-2 rounded-full shadow-[0_0_16px_rgba(255,107,0,0.4)]" initial={{
          x: 20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.3
        }} whileHover={{
          scale: 1.05
        }}>
            <motion.div animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 1,
            repeat: Infinity
          }}>
              <FlameIcon className="w-5 h-5 text-white fill-white" />
            </motion.div>
            <div className="text-right">
              <p className="text-xs font-bold text-white">{streak} Days</p>
              <p className="text-[10px] text-white/80">Streak</p>
            </div>
          </motion.div>
        </div>

        {/* XP Progress Bar */}
        <motion.div className="relative" initial={{
        scaleX: 0,
        opacity: 0
      }} animate={{
        scaleX: 1,
        opacity: 1
      }} transition={{
        delay: 0.4,
        duration: 0.6
      }}>
          <div className="h-3 bg-[#1a2a2f] rounded-full overflow-hidden border border-[#00ffcc]/20 shadow-inner">
            <motion.div className="h-full bg-gradient-to-r from-[#00ffcc] via-[#00d9ff] to-[#00ffcc] rounded-full relative" initial={{
            width: 0
          }} animate={{
            width: `${xpProgress}%`
          }} transition={{
            delay: 0.6,
            duration: 1,
            ease: 'easeOut'
          }}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
          <div className="flex items-center justify-between mt-1.5">
            <p className="text-[10px] text-gray-400">
              {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
            </p>
            <p className="text-[10px] font-semibold text-[#00ffcc]">
              {(nextLevelXP - currentXP).toLocaleString()} to Level 13
            </p>
          </div>
        </motion.div>
      </div>
    </motion.header>;
}