import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';
const chests = [{
  id: 1,
  name: 'Bronze Chest',
  rarity: 'Common',
  color: '#CD7F32',
  gradient: 'from-amber-700 to-orange-900',
  unlocked: true,
  reward: '+50 OC'
}, {
  id: 2,
  name: 'Silver Chest',
  rarity: 'Rare',
  color: '#C0C0C0',
  gradient: 'from-gray-400 to-gray-600',
  unlocked: true,
  reward: '+150 OC'
}, {
  id: 3,
  name: 'Gold Chest',
  rarity: 'Epic',
  color: '#FFD700',
  gradient: 'from-yellow-400 to-yellow-600',
  unlocked: false,
  reward: '+500 OC'
}];
export function RewardChests() {
  return <div className="px-4 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <Gift className="w-5 h-5 text-purple-400" />
        Reward Chests
      </motion.h2>

      <div className="grid grid-cols-3 gap-3">
        {chests.map((chest, index) => <motion.button key={chest.id} className={`relative aspect-square rounded-2xl bg-gradient-to-br ${chest.gradient} p-4 flex flex-col items-center justify-center ${chest.unlocked ? '' : 'opacity-50'}`} initial={{
        opacity: 0,
        scale: 0.8,
        rotateY: -90
      }} animate={{
        opacity: 1,
        scale: 1,
        rotateY: 0
      }} transition={{
        delay: index * 0.15,
        type: 'spring'
      }} whileHover={chest.unlocked ? {
        scale: 1.05,
        y: -4
      } : {}} whileTap={chest.unlocked ? {
        scale: 0.95
      } : {}} disabled={!chest.unlocked}>
            {/* Sparkle Effect */}
            {chest.unlocked && <motion.div className="absolute top-2 right-2" animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
                <Sparkles className="w-4 h-4 text-white" />
              </motion.div>}

            {/* Chest Icon */}
            <div className="text-4xl mb-2">{chest.unlocked ? '🎁' : '🔒'}</div>

            {/* Name */}
            <p className="text-xs font-bold text-white text-center mb-1">
              {chest.name}
            </p>

            {/* Reward */}
            {chest.unlocked && <p className="text-[10px] text-white/80">{chest.reward}</p>}

            {/* Tap to Unlock */}
            {chest.unlocked && <motion.p className="text-[9px] text-white/60 mt-1" animate={{
          opacity: [0.6, 1, 0.6]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }}>
                Tap to unlock
              </motion.p>}
          </motion.button>)}
      </div>
    </div>;
}