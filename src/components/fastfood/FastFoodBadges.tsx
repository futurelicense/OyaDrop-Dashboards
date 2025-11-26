import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Star, Crown, Flame, Zap } from 'lucide-react';
const badges = [{
  id: 1,
  name: 'First Feast',
  icon: Star,
  rarity: 'Common',
  color: '#94A3B8',
  unlocked: true
}, {
  id: 2,
  name: 'Night Owl',
  icon: Flame,
  rarity: 'Common',
  color: '#94A3B8',
  unlocked: true
}, {
  id: 3,
  name: 'Combo King',
  icon: Trophy,
  rarity: 'Rare',
  color: '#3B82F6',
  unlocked: true
}, {
  id: 4,
  name: '₦50k Spent',
  icon: Award,
  rarity: 'Rare',
  color: '#3B82F6',
  unlocked: true
}, {
  id: 5,
  name: '7-Day Streak',
  icon: Flame,
  rarity: 'Epic',
  color: '#A855F7',
  unlocked: true
}, {
  id: 6,
  name: 'Chicken Slayer',
  icon: Zap,
  rarity: 'Epic',
  color: '#A855F7',
  unlocked: false
}, {
  id: 7,
  name: 'Burger Samurai',
  icon: Crown,
  rarity: 'Legendary',
  color: '#FFD700',
  unlocked: false
}, {
  id: 8,
  name: 'Spice Lord',
  icon: Flame,
  rarity: 'Legendary',
  color: '#FFD700',
  unlocked: false
}];
export function FastFoodBadges() {
  return <div className="px-4 py-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
          <Trophy className="w-5 h-5 text-black" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-white">Achievement Badges</h2>
          <p className="text-xs text-gray-400">
            Unlock your fast-food identity
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {badges.map((badge, index) => {
        const Icon = badge.icon;
        return <motion.div key={badge.id} className={`relative aspect-square rounded-2xl p-3 flex flex-col items-center justify-center ${badge.unlocked ? 'bg-gradient-to-br from-[#131B2E] to-[#0F1520] border-2' : 'bg-[#0A0E1A]/50 border border-white/10 opacity-50'}`} style={{
          borderColor: badge.unlocked ? badge.color + '60' : undefined,
          boxShadow: badge.unlocked ? `0 0 20px ${badge.color}40` : undefined
        }} initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: index * 0.08
        }} whileHover={badge.unlocked ? {
          scale: 1.05,
          y: -4
        } : {}}>
              {/* Rarity Badge */}
              <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded-full text-[8px] font-bold" style={{
            backgroundColor: badge.color + '20',
            color: badge.color
          }}>
                {badge.rarity[0]}
              </div>

              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1 ${badge.unlocked ? '' : 'grayscale'}`} style={{
            backgroundColor: badge.unlocked ? badge.color + '20' : '#1A1A1A'
          }}>
                <Icon className="w-5 h-5" style={{
              color: badge.unlocked ? badge.color : '#4A5568'
            }} />
              </div>

              {/* Name */}
              <p className={`text-[9px] font-bold text-center leading-tight ${badge.unlocked ? 'text-white' : 'text-gray-600'}`}>
                {badge.name}
              </p>

              {/* Lock Overlay */}
              {!badge.unlocked && <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-sm">🔒</span>
                  </div>
                </div>}
            </motion.div>;
      })}
      </div>
    </div>;
}