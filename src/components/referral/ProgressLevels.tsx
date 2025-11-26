import React from 'react';
import { motion } from 'framer-motion';
import { TrophyIcon, CrownIcon, SparklesIcon } from 'lucide-react';
const levels = [{
  title: 'Rookie Recruit',
  subtitle: 'Starter',
  icon: TrophyIcon,
  currentXP: 2450,
  requiredXP: 3000,
  color: '#00ffcc',
  bgGradient: 'from-[#00ffcc]/20 to-[#00d9ff]/10'
}, {
  title: 'Elite Commander',
  subtitle: 'Master',
  icon: CrownIcon,
  currentXP: 1200,
  requiredXP: 5000,
  color: '#ff00ff',
  bgGradient: 'from-[#ff00ff]/20 to-[#d946ef]/10'
}, {
  title: 'Community Legend',
  subtitle: 'Social',
  icon: SparklesIcon,
  currentXP: 800,
  requiredXP: 10000,
  color: '#ffd700',
  bgGradient: 'from-[#ffd700]/20 to-[#ffb800]/10'
}];
export function ProgressLevels() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Level Progression
      </motion.h2>
      <p className="text-sm text-gray-400 mb-6">Unlock new ranks and rewards</p>

      <div className="space-y-4">
        {levels.map((level, index) => {
        const Icon = level.icon;
        const progress = level.currentXP / level.requiredXP * 100;
        const isComplete = progress >= 100;
        return <motion.div key={level.title} className={`relative bg-gradient-to-br ${level.bgGradient} rounded-2xl p-5 border border-white/10 overflow-hidden`} initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2 + index * 0.15
        }} whileHover={{
          scale: 1.02
        }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-40" style={{
            backgroundColor: level.color
          }} />

              <div className="relative flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{
              backgroundColor: `${level.color}30`,
              boxShadow: `0 0 20px ${level.color}40`
            }}>
                  <Icon className="w-7 h-7" style={{
                color: level.color
              }} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-white">
                      {level.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
                  backgroundColor: `${level.color}20`,
                  color: level.color
                }}>
                      {level.subtitle}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    {level.currentXP.toLocaleString()} /{' '}
                    {level.requiredXP.toLocaleString()} XP
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    {Math.round(progress)}%
                  </p>
                  <p className="text-[10px] text-gray-400">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2.5 bg-[#0a1a1f]/50 rounded-full overflow-hidden">
                <motion.div className="h-full rounded-full relative" style={{
              background: `linear-gradient(90deg, ${level.color}, ${level.color}dd)`
            }} initial={{
              width: 0
            }} animate={{
              width: `${Math.min(progress, 100)}%`
            }} transition={{
              delay: 0.4 + index * 0.15,
              duration: 1,
              ease: 'easeOut'
            }}>
                  {isComplete && <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" animate={{
                x: ['-100%', '200%']
              }} transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear'
              }} />}
                </motion.div>
              </div>

              {isComplete && <motion.div className="absolute top-3 right-3" initial={{
            scale: 0,
            rotate: -180
          }} animate={{
            scale: 1,
            rotate: 0
          }} transition={{
            delay: 0.6 + index * 0.15,
            type: 'spring'
          }}>
                  <div className="w-8 h-8 rounded-full bg-[#00ff88] flex items-center justify-center shadow-[0_0_12px_rgba(0,255,136,0.6)]">
                    <SparklesIcon className="w-4 h-4 text-white" />
                  </div>
                </motion.div>}
            </motion.div>;
      })}
      </div>
    </div>;
}