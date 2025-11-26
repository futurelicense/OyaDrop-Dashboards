import React from 'react';
import { motion } from 'framer-motion';
import { AwardIcon, CoinsIcon, UsersIcon, TrophyIcon, FlameIcon, StarIcon } from 'lucide-react';
const achievements = [{
  icon: AwardIcon,
  title: 'First Referral',
  description: 'Invited your first friend',
  unlocked: true,
  color: '#00ffcc'
}, {
  icon: CoinsIcon,
  title: '₦10K Earned',
  description: 'Earned 10,000 in rewards',
  unlocked: true,
  color: '#ffd700'
}, {
  icon: UsersIcon,
  title: '100 Referrals',
  description: 'Built a network of 100',
  unlocked: false,
  color: '#00d9ff'
}, {
  icon: TrophyIcon,
  title: 'Top 10 Leader',
  description: 'Ranked in top 10',
  unlocked: true,
  color: '#ff00ff'
}, {
  icon: FlameIcon,
  title: '5-Day Streak',
  description: 'Active for 5 days straight',
  unlocked: true,
  color: '#ff6b00'
}, {
  icon: StarIcon,
  title: 'Legend Status',
  description: 'Reached Legend tier',
  unlocked: false,
  color: '#ffb800'
}];
export function AchievementWall() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Achievement Wall
      </motion.h2>
      <p className="text-sm text-gray-400 mb-6">
        Collect badges and show off your progress
      </p>

      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return <motion.div key={achievement.title} className={`relative rounded-xl p-4 border ${achievement.unlocked ? 'bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] border-white/20' : 'bg-[#0a1a1f]/50 border-white/5'} overflow-hidden`} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.2 + index * 0.08
        }} whileHover={achievement.unlocked ? {
          scale: 1.05
        } : {}}>
              {achievement.unlocked && <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-30" style={{
            backgroundColor: achievement.color
          }} />}

              <div className="relative flex flex-col items-center text-center">
                <motion.div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${achievement.unlocked ? 'shadow-lg' : 'opacity-30'}`} style={{
              backgroundColor: achievement.unlocked ? `${achievement.color}30` : '#1a2a2f',
              boxShadow: achievement.unlocked ? `0 0 20px ${achievement.color}40` : 'none'
            }} animate={achievement.unlocked ? {
              rotate: [0, 5, -5, 0]
            } : {}} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                  <Icon className="w-6 h-6" style={{
                color: achievement.unlocked ? achievement.color : '#4a5568'
              }} />
                </motion.div>

                <p className={`text-[10px] font-semibold leading-tight ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
                  {achievement.title}
                </p>

                {achievement.unlocked && <motion.div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#00ff88] flex items-center justify-center shadow-[0_0_8px_rgba(0,255,136,0.6)]" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.4 + index * 0.08,
              type: 'spring'
            }}>
                    <span className="text-white text-[10px]">✓</span>
                  </motion.div>}

                {!achievement.unlocked && <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-700 flex items-center justify-center">
                      <span className="text-gray-700 text-lg">🔒</span>
                    </div>
                  </div>}
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}