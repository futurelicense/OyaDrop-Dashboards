import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Award, Crown, Zap, Target } from 'lucide-react';
const achievements = [{
  id: 1,
  name: 'First Top-Up',
  icon: Zap,
  rarity: 'Common',
  color: '#94A3B8',
  unlocked: true
}, {
  id: 2,
  name: '₦100k Volume',
  icon: Target,
  rarity: 'Rare',
  color: '#3B82F6',
  unlocked: true
}, {
  id: 3,
  name: 'Coin Collector',
  icon: Star,
  rarity: 'Epic',
  color: '#A855F7',
  unlocked: true
}, {
  id: 4,
  name: '10 Days Streak',
  icon: Trophy,
  rarity: 'Epic',
  color: '#A855F7',
  unlocked: true
}, {
  id: 5,
  name: 'Zero-Fee Master',
  icon: Award,
  rarity: 'Legendary',
  color: '#FFD700',
  unlocked: false
}, {
  id: 6,
  name: 'Vault Legend',
  icon: Crown,
  rarity: 'Legendary',
  color: '#FFD700',
  unlocked: false
}];
export function WalletAchievements() {
  return <div className="px-4 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <Trophy className="w-5 h-5 text-yellow-400" />
        Achievement Wall
      </motion.h2>

      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement, index) => {
        const Icon = achievement.icon;
        return <motion.div key={achievement.id} className={`relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center ${achievement.unlocked ? 'bg-gradient-to-br from-[#131B2E] to-[#0F1520] border-2' : 'bg-[#0A0E1A]/50 border border-white/10 opacity-50'}`} style={{
          borderColor: achievement.unlocked ? achievement.color + '60' : undefined,
          boxShadow: achievement.unlocked ? `0 0 20px ${achievement.color}40` : undefined
        }} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: index * 0.1
        }} whileHover={achievement.unlocked ? {
          scale: 1.05,
          y: -4
        } : {}}>
              {/* Rarity Badge */}
              <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{
            backgroundColor: achievement.color + '20',
            color: achievement.color
          }}>
                {achievement.rarity[0]}
              </div>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 ${achievement.unlocked ? '' : 'grayscale'}`} style={{
            backgroundColor: achievement.unlocked ? achievement.color + '20' : '#1A1A1A'
          }}>
                <Icon className="w-6 h-6" style={{
              color: achievement.unlocked ? achievement.color : '#4A5568'
            }} />
              </div>

              {/* Name */}
              <p className={`text-[10px] font-semibold text-center leading-tight ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`}>
                {achievement.name}
              </p>

              {/* Lock Overlay */}
              {!achievement.unlocked && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-lg">🔒</span>
                  </div>
                </div>}
            </motion.div>;
      })}
      </div>
    </div>;
}