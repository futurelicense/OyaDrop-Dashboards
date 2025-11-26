import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap } from 'lucide-react';
const dailyMissions = [{
  task: 'Order 1 meal',
  progress: 0,
  total: 1,
  reward: '+20 XP',
  color: '#00D9C0'
}, {
  task: 'Add fries to order',
  progress: 0,
  total: 1,
  reward: '+10 XP',
  color: '#FFB800'
}, {
  task: 'Try a new restaurant',
  progress: 0,
  total: 1,
  reward: '+25 XP',
  color: '#B026FF'
}, {
  task: 'Buy a combo',
  progress: 0,
  total: 1,
  reward: '+30 XP',
  color: '#00F0FF'
}];
export function FastFoodMissions() {
  return <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Active Missions</h2>
          <p className="text-xs text-gray-400">Complete to earn rewards</p>
        </div>
      </div>

      {/* Daily Missions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            Daily Missions
          </h3>
        </div>
        <div className="space-y-3">
          {dailyMissions.map((mission, index) => {
          const progress = mission.progress / mission.total * 100;
          return <motion.div key={mission.task} className="bg-[#131B2E] rounded-xl p-3 border border-white/10" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-white">
                    {mission.task}
                  </p>
                  <span className="text-xs font-bold px-2 py-1 rounded-full" style={{
                backgroundColor: `${mission.color}20`,
                color: mission.color
              }}>
                    {mission.reward}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-[#0A0E1A] rounded-full overflow-hidden">
                    <motion.div className="h-full rounded-full" style={{
                  backgroundColor: mission.color
                }} initial={{
                  width: 0
                }} animate={{
                  width: `${progress}%`
                }} transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.6
                }} />
                  </div>
                  <span className="text-xs text-gray-400">
                    {mission.progress}/{mission.total}
                  </span>
                </div>
              </motion.div>;
        })}
        </div>
      </div>
    </div>;
}