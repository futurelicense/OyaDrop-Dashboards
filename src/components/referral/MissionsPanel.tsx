import React from 'react';
import { motion } from 'framer-motion';
import { Share2Icon, UserPlusIcon, ZapIcon, TargetIcon, CalendarIcon, TrendingUpIcon } from 'lucide-react';
const dailyMissions = [{
  icon: Share2Icon,
  task: 'Share your link 3 times',
  progress: 2,
  total: 3,
  reward: '+50 XP',
  color: '#00ffcc'
}, {
  icon: UserPlusIcon,
  task: 'Refer 1 new user',
  progress: 0,
  total: 1,
  reward: '+100 XP',
  color: '#00d9ff'
}, {
  icon: ZapIcon,
  task: 'Open app twice',
  progress: 2,
  total: 2,
  reward: '+25 XP',
  color: '#ffd700'
}];
const weeklyMissions = [{
  icon: TargetIcon,
  task: 'Hit 10 referrals',
  progress: 7,
  total: 10,
  reward: '+500 XP',
  color: '#ff00ff'
}, {
  icon: CalendarIcon,
  task: 'Maintain 5-day streak',
  progress: 3,
  total: 5,
  reward: '+300 XP',
  color: '#00ff88'
}, {
  icon: TrendingUpIcon,
  task: 'Reach 1,000 XP',
  progress: 450,
  total: 1000,
  reward: '₦500',
  color: '#ffb800'
}];
function MissionCard({
  mission,
  index,
  delay
}: any) {
  const Icon = mission.icon;
  const progress = mission.progress / mission.total * 100;
  const isComplete = progress >= 100;
  return <motion.div className="bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] rounded-xl p-4 border border-white/10" initial={{
    opacity: 0,
    x: -20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    delay
  }} whileHover={{
    scale: 1.02
  }}>
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{
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

        {isComplete && <motion.div className="w-6 h-6 rounded-full bg-[#00ff88] flex items-center justify-center" initial={{
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
      <div className="h-1.5 bg-[#0a1a1f]/50 rounded-full overflow-hidden">
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
      }} />
      </div>
    </motion.div>;
}
export function MissionsPanel() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Active Missions
      </motion.h2>

      {/* Daily Missions */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-gradient-to-b from-[#00ffcc] to-[#00d9ff] rounded-full" />
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
          <div className="w-1 h-4 bg-gradient-to-b from-[#ff00ff] to-[#d946ef] rounded-full" />
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