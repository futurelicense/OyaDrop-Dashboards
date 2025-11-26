import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CrownIcon, TrophyIcon, MedalIcon } from 'lucide-react';
const leaderboardData = [{
  rank: 1,
  name: 'Sarah M.',
  xp: 15420,
  avatar: '👑',
  isCurrentUser: false
}, {
  rank: 2,
  name: 'John D.',
  xp: 14850,
  avatar: '🏆',
  isCurrentUser: false
}, {
  rank: 3,
  name: 'You',
  xp: 12450,
  avatar: '🎯',
  isCurrentUser: true
}, {
  rank: 4,
  name: 'Mike R.',
  xp: 11200,
  avatar: '⚡',
  isCurrentUser: false
}, {
  rank: 5,
  name: 'Lisa K.',
  xp: 10800,
  avatar: '🌟',
  isCurrentUser: false
}, {
  rank: 6,
  name: 'Tom B.',
  xp: 9500,
  avatar: '🔥',
  isCurrentUser: false
}, {
  rank: 7,
  name: 'Emma W.',
  xp: 8900,
  avatar: '💎',
  isCurrentUser: false
}, {
  rank: 8,
  name: 'Alex P.',
  xp: 8200,
  avatar: '🚀',
  isCurrentUser: false
}];
const tabs = ['Daily', 'Weekly', 'All-Time'];
export function Leaderboard() {
  const [activeTab, setActiveTab] = useState('Weekly');
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <CrownIcon className="w-5 h-5 text-[#ffd700]" />;
    if (rank === 2) return <TrophyIcon className="w-5 h-5 text-[#c0c0c0]" />;
    if (rank === 3) return <MedalIcon className="w-5 h-5 text-[#cd7f32]" />;
    return null;
  };
  const getRankColor = (rank: number) => {
    if (rank === 1) return '#ffd700';
    if (rank === 2) return '#c0c0c0';
    if (rank === 3) return '#cd7f32';
    return '#4a5568';
  };
  return <div className="px-5 py-6 pb-8">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Leaderboard
      </motion.h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {tabs.map(tab => <motion.button key={tab} className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${activeTab === tab ? 'bg-gradient-to-r from-[#00ffcc] to-[#00d9ff] text-[#0a1a1f] shadow-[0_0_16px_rgba(0,255,204,0.4)]' : 'bg-[#1a2a2f] text-gray-400 border border-white/10'}`} onClick={() => setActiveTab(tab)} whileTap={{
        scale: 0.98
      }}>
            {tab}
          </motion.button>)}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaderboardData.map((player, index) => <motion.div key={player.rank} className={`relative rounded-xl p-4 border ${player.isCurrentUser ? 'bg-gradient-to-br from-[#00ffcc]/20 to-[#00d9ff]/10 border-[#00ffcc]/40 shadow-[0_0_16px_rgba(0,255,204,0.2)]' : 'bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] border-white/10'} overflow-hidden`} initial={{
        opacity: 0,
        x: -20
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.2 + index * 0.05
      }} whileHover={{
        scale: 1.02
      }}>
            {player.rank <= 3 && <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20" style={{
          backgroundColor: getRankColor(player.rank)
        }} />}

            <div className="relative flex items-center gap-4">
              {/* Rank */}
              <div className="flex items-center justify-center w-8">
                {getRankIcon(player.rank) || <span className="text-lg font-bold text-gray-500">
                    #{player.rank}
                  </span>}
              </div>

              {/* Avatar */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1f2f35] to-[#2a3a3f] flex items-center justify-center text-2xl border-2 border-white/10">
                {player.avatar}
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className={`text-sm font-bold ${player.isCurrentUser ? 'text-[#00ffcc]' : 'text-white'}`}>
                  {player.name}
                </p>
                <p className="text-xs text-gray-400">
                  {player.xp.toLocaleString()} XP
                </p>
              </div>

              {/* Badge */}
              {player.isCurrentUser && <motion.div className="bg-gradient-to-r from-[#00ffcc] to-[#00d9ff] px-3 py-1 rounded-full" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.4 + index * 0.05,
            type: 'spring'
          }}>
                  <span className="text-xs font-bold text-[#0a1a1f]">You</span>
                </motion.div>}
            </div>
          </motion.div>)}
      </div>
    </div>;
}