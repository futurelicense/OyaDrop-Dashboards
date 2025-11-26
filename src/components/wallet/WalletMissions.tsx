import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, Smartphone, Zap, Target, Calendar } from 'lucide-react';
const dailyMissions = [{
  icon: Plus,
  task: 'Add ₦1,000 to wallet',
  progress: 0,
  total: 1000,
  reward: '+40 XP',
  color: '#00D9C0'
}, {
  icon: Send,
  task: 'Send OyaCoin to a friend',
  progress: 0,
  total: 1,
  reward: '+20 XP',
  color: '#B026FF'
}, {
  icon: Smartphone,
  task: 'Buy airtime',
  progress: 0,
  total: 1,
  reward: '+25 XP',
  color: '#FFB800'
}];
const weeklyMissions = [{
  icon: Target,
  task: '5 successful transactions',
  progress: 3,
  total: 5,
  reward: '+200 XP',
  color: '#00F0FF'
}, {
  icon: Calendar,
  task: '₦10,000 spent',
  progress: 6500,
  total: 10000,
  reward: 'Silver Badge',
  color: '#C0C0C0'
}];
function MissionCard({
  mission,
  index,
  delay
}: any) {
  const Icon = mission.icon;
  const progress = mission.progress / mission.total * 100;
  const isComplete = progress >= 100;
  return <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-xl p-4 border border-white/10" initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    delay
  }} whileHover={{
    scale: 1.02,
    borderColor: mission.color + '60'
  }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
        backgroundColor: `${mission.color}20`,
        boxShadow: `0 0 16px ${mission.color}30`
      }}>
          <Icon className="w-5 h-5" style={{
          color: mission.color
        }} />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white mb-1">
            {mission.task}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400">
              {mission.progress} / {mission.total}
            </p>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold" style={{
            backgroundColor: `${mission.color}20`,
            color: mission.color
          }}>
              {mission.reward}
            </span>
          </div>
        </div>

        {isComplete && <motion.div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        type: 'spring'
      }}>
            <span className="text-white text-xs">✓</span>
          </motion.div>}
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-[#0A0E1A] rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{
        backgroundColor: mission.color
      }} initial={{
        width: 0
      }} animate={{
        width: `${Math.min(progress, 100)}%`
      }} transition={{
        delay: delay + 0.2,
        duration: 0.8,
        ease: 'easeOut'
      }}>
          <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </motion.div>
      </div>
    </motion.div>;
}
export function WalletMissions() {
  return <div className="px-4 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        Active Missions
      </motion.h2>

      {/* Daily Missions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-teal-500 rounded-full" />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Daily Quests
          </h3>
        </div>
        <div className="space-y-3">
          {dailyMissions.map((mission, index) => <MissionCard key={mission.task} mission={mission} index={index} delay={0.2 + index * 0.1} />)}
        </div>
      </div>

      {/* Weekly Missions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
          <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
            Weekly Challenges
          </h3>
        </div>
        <div className="space-y-3">
          {weeklyMissions.map((mission, index) => <MissionCard key={mission.task} mission={mission} index={index} delay={0.5 + index * 0.1} />)}
        </div>
      </div>
    </div>;
}