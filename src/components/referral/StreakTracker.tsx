import React from 'react';
import { motion } from 'framer-motion';
import { FlameIcon, TrophyIcon } from 'lucide-react';
const streakDays = [{
  day: 'Mon',
  completed: true
}, {
  day: 'Tue',
  completed: true
}, {
  day: 'Wed',
  completed: true
}, {
  day: 'Thu',
  completed: true
}, {
  day: 'Fri',
  completed: true
}, {
  day: 'Sat',
  completed: true
}, {
  day: 'Sun',
  completed: true
}];
export function StreakTracker() {
  const currentStreak = 7;
  const nextReward = '₦200';
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Streak Power
      </motion.h2>

      <motion.div className="bg-gradient-to-br from-[#ff6b00] via-[#ff4500] to-[#ff0000] rounded-2xl p-6 relative overflow-hidden" initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      delay: 0.2
    }}>
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl" />

        <div className="relative">
          {/* Streak Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center" animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }}>
                <FlameIcon className="w-8 h-8 text-white fill-white" />
              </motion.div>
              <div>
                <p className="text-4xl font-bold text-white">{currentStreak}</p>
                <p className="text-sm text-white/80">Day Streak</p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs text-white/80 mb-1">Next Reward</p>
              <p className="text-2xl font-bold text-white">{nextReward}</p>
            </div>
          </div>

          {/* Week Progress */}
          <div className="flex items-center justify-between gap-2 mb-4">
            {streakDays.map((day, index) => <motion.div key={day.day} className="flex-1" initial={{
            opacity: 0,
            y: 10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.3 + index * 0.05
          }}>
                <div className={`h-2 rounded-full mb-2 ${day.completed ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' : 'bg-white/20'}`} />
                <p className="text-[10px] text-white/80 text-center">
                  {day.day}
                </p>
              </motion.div>)}
          </div>

          {/* Milestones */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrophyIcon className="w-5 h-5 text-[#ffd700]" />
                <span className="text-sm font-semibold text-white">
                  Streak Milestones
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="text-center">
                <p className="text-xs text-white/60 mb-1">7 Days</p>
                <p className="text-sm font-bold text-white">₦200</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60 mb-1">14 Days</p>
                <p className="text-sm font-bold text-white">₦500</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-white/60 mb-1">30 Days</p>
                <p className="text-sm font-bold text-white">₦1,500</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>;
}