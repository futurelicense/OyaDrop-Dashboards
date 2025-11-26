import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Flame, Coins } from 'lucide-react';
interface FastFoodHeaderProps {
  onMenuClick: () => void;
}
export function FastFoodHeader({
  onMenuClick
}: FastFoodHeaderProps) {
  const currentXP = 2340;
  const nextLevelXP = 3000;
  const xpProgress = currentXP / nextLevelXP * 100;
  const currentLevel = 12;
  const levelTitle = 'Combo Captain';
  const oyaCoins = 8450;
  const streak = 7;
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
        }} onClick={onMenuClick}>
            <Menu className="w-6 h-6 text-white" />
          </motion.button>

          <motion.div className="text-center" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.2
        }}>
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              Welcome to
            </p>
            <h1 className="text-lg font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Fast-Food Arena
            </h1>
          </motion.div>

          <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full shadow-[0_0_8px_#EF4444]" />
          </motion.button>
        </div>

        {/* Player Status Bar */}
        <div className="flex items-center gap-3">
          {/* Avatar with XP Ring */}
          <motion.div className="relative flex-shrink-0" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.3,
          type: 'spring'
        }}>
            <svg className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="28" stroke="#1F2937" strokeWidth="4" fill="none" />
              <motion.circle cx="32" cy="32" r="28" stroke="url(#xpGradient)" strokeWidth="4" fill="none" strokeLinecap="round" initial={{
              strokeDasharray: '0 175.93'
            }} animate={{
              strokeDasharray: `${xpProgress / 100 * 175.93} 175.93`
            }} transition={{
              delay: 0.5,
              duration: 1,
              ease: 'easeOut'
            }} />
              <defs>
                <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFB800" />
                  <stop offset="100%" stopColor="#FF6B00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-2xl">
                🍔
              </div>
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 px-2 py-0.5 rounded-full text-[10px] font-bold text-black shadow-lg">
              Lv {currentLevel}
            </div>
          </motion.div>

          {/* XP Progress & Stats */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-white">{levelTitle}</p>
              <p className="text-[10px] text-gray-400">
                {currentXP}/{nextLevelXP} XP
              </p>
            </div>

            {/* XP Progress Bar */}
            <div className="relative h-2 bg-[#131B2E] rounded-full overflow-hidden border border-orange-500/20 mb-2">
              <motion.div className="h-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-full" initial={{
              width: 0
            }} animate={{
              width: `${xpProgress}%`
            }} transition={{
              delay: 0.5,
              duration: 1,
              ease: 'easeOut'
            }}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              </motion.div>
            </div>

            {/* Coins & Streak */}
            <div className="flex items-center gap-3">
              <motion.div className="flex items-center gap-1 bg-amber-500/20 px-2 py-1 rounded-lg border border-amber-500/30" initial={{
              x: -10,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: 0.6
            }}>
                <Coins className="w-3 h-3 text-amber-400" />
                <span className="text-xs font-bold text-amber-400">
                  {oyaCoins.toLocaleString()}
                </span>
              </motion.div>

              <motion.div className="flex items-center gap-1 bg-gradient-to-br from-orange-500 to-red-600 px-2 py-1 rounded-lg shadow-[0_0_12px_rgba(255,107,0,0.4)]" initial={{
              x: -10,
              opacity: 0
            }} animate={{
              x: 0,
              opacity: 1
            }} transition={{
              delay: 0.7
            }}>
                <motion.div animate={{
                scale: [1, 1.2, 1]
              }} transition={{
                duration: 1,
                repeat: Infinity
              }}>
                  <Flame className="w-3 h-3 text-white fill-white" />
                </motion.div>
                <span className="text-xs font-bold text-white">
                  {streak} Days
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>;
}