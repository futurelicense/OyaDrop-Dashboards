import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Gift } from 'lucide-react';
const streakMilestones = [{
  day: 1,
  reward: '+10 XP',
  unlocked: true
}, {
  day: 3,
  reward: '+50 XP',
  unlocked: true
}, {
  day: 7,
  reward: '+150 XP + Mystery Box',
  unlocked: true
}, {
  day: 14,
  reward: '+300 XP + Silver Badge',
  unlocked: false
}, {
  day: 30,
  reward: '+1000 XP + Gold Badge',
  unlocked: false
}];
export function WalletStreak() {
  const currentStreak = 12;
  return <div className="px-4 py-6">
      <motion.div className="relative rounded-3xl bg-gradient-to-br from-orange-900/20 via-red-900/20 to-orange-800/20 border border-orange-500/30 overflow-hidden p-6" initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }}>
        {/* Flame Glow */}
        <motion.div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl" animate={{
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.4, 0.2]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }} />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <motion.div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center shadow-[0_0_24px_rgba(255,107,0,0.5)]" animate={{
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }}>
                <Flame className="w-8 h-8 text-white fill-white" />
              </motion.div>
              <div>
                <p className="text-xs text-orange-400 font-medium uppercase tracking-wider">
                  Daily Streak
                </p>
                <p className="text-3xl font-bold text-white">
                  {currentStreak} Days
                </p>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="space-y-3">
            {streakMilestones.map((milestone, index) => <motion.div key={milestone.day} className={`flex items-center justify-between p-3 rounded-xl ${milestone.unlocked ? 'bg-green-500/10 border border-green-500/30' : 'bg-white/5 border border-white/10'}`} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${milestone.unlocked ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-500'}`}>
                    {milestone.unlocked ? '✓' : milestone.day}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Day {milestone.day}
                    </p>
                    <p className="text-xs text-gray-400">{milestone.reward}</p>
                  </div>
                </div>

                {milestone.day === 7 && milestone.unlocked && <motion.div animate={{
              rotate: [0, 10, -10, 0]
            }} transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2
            }}>
                    <Gift className="w-5 h-5 text-purple-400" />
                  </motion.div>}
              </motion.div>)}
          </div>

          {/* Warning */}
          <p className="text-xs text-center text-gray-500 mt-4">
            Keep your streak alive! Login daily to earn rewards
          </p>
        </div>
      </motion.div>
    </div>;
}