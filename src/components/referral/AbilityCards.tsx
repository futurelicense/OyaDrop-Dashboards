import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyIcon, Share2Icon, BarChart3Icon, TrophyIcon, CheckIcon } from 'lucide-react';
const abilities = [{
  icon: CopyIcon,
  label: 'Copy Link',
  xp: '+10 XP',
  color: '#00ffcc',
  action: 'copy'
}, {
  icon: Share2Icon,
  label: 'Share Link',
  xp: '+30 XP',
  color: '#00d9ff',
  action: 'share'
}, {
  icon: BarChart3Icon,
  label: 'View Stats',
  xp: '',
  color: '#ff00ff',
  action: 'stats'
}, {
  icon: TrophyIcon,
  label: 'Check Ladder',
  xp: '',
  color: '#ffd700',
  action: 'ladder'
}];
export function AbilityCards() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const handleAction = (action: string, index: number) => {
    if (action === 'copy') {
      navigator.clipboard.writeText('https://oyadrop.com/ref/USER123');
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Power Abilities
      </motion.h2>
      <p className="text-sm text-gray-400 mb-6">
        Use your skills to grow your network
      </p>

      <div className="grid grid-cols-2 gap-3">
        {abilities.map((ability, index) => {
        const Icon = ability.icon;
        const isCopied = copiedIndex === index;
        return <motion.button key={ability.label} className="relative bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] rounded-2xl p-5 border border-white/10 text-left overflow-hidden group" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.3 + index * 0.1
        }} whileHover={{
          scale: 1.05,
          borderColor: ability.color + '60'
        }} whileTap={{
          scale: 0.95
        }} onClick={() => handleAction(ability.action, index)}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: `radial-gradient(circle at 50% 50%, ${ability.color}20, transparent 70%)`
          }} />

              <motion.div className="absolute top-2 right-2 w-20 h-20 rounded-full blur-2xl opacity-30" style={{
            backgroundColor: ability.color
          }} animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />

              <div className="relative">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3 transition-all duration-300" style={{
              backgroundColor: `${ability.color}20`,
              boxShadow: `0 0 20px ${ability.color}30`
            }}>
                  <AnimatePresence mode="wait">
                    {isCopied ? <motion.div key="check" initial={{
                  scale: 0,
                  rotate: -180
                }} animate={{
                  scale: 1,
                  rotate: 0
                }} exit={{
                  scale: 0,
                  rotate: 180
                }}>
                        <CheckIcon className="w-7 h-7 text-[#00ff88]" />
                      </motion.div> : <motion.div key="icon" initial={{
                  scale: 0
                }} animate={{
                  scale: 1
                }} exit={{
                  scale: 0
                }}>
                        <Icon className="w-7 h-7 transition-transform group-hover:scale-110" style={{
                    color: ability.color
                  }} />
                      </motion.div>}
                  </AnimatePresence>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {ability.label}
                </h3>
                {ability.xp && <p className="text-xs font-semibold" style={{
              color: ability.color
            }}>
                    {ability.xp}
                  </p>}
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: `linear-gradient(90deg, transparent, ${ability.color}, transparent)`,
            boxShadow: `0 0 8px ${ability.color}`
          }} />
            </motion.button>;
      })}
      </div>
    </div>;
}