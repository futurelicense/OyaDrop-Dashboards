import React from 'react';
import { motion } from 'framer-motion';
import { UserPlusIcon, CheckCircleIcon, ShoppingBagIcon, CoinsIcon } from 'lucide-react';
const steps = [{
  icon: UserPlusIcon,
  title: 'Recruit a Friend',
  description: 'Share your unique link',
  reward: '+50 XP',
  coins: 10,
  color: '#00ffcc'
}, {
  icon: CheckCircleIcon,
  title: 'Friend Signs Up',
  description: 'They create an account',
  reward: '+100 XP',
  coins: 25,
  color: '#00d9ff'
}, {
  icon: ShoppingBagIcon,
  title: 'First Order Placed',
  description: 'They complete a purchase',
  reward: '+200 XP',
  coins: 50,
  color: '#ffd700'
}];
export function QuestPath() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-2" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }}>
        Quest Path
      </motion.h2>
      <p className="text-sm text-gray-400 mb-6">
        Complete missions to earn rewards
      </p>

      <div className="relative">
        {/* Curved Path SVG */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{
        zIndex: 0
      }}>
          <motion.path d="M 60 40 Q 180 80, 60 140 T 60 240" stroke="url(#questGradient)" strokeWidth="3" fill="none" strokeDasharray="8 8" initial={{
          pathLength: 0,
          opacity: 0
        }} animate={{
          pathLength: 1,
          opacity: 0.4
        }} transition={{
          delay: 0.7,
          duration: 1.5
        }} />
          <defs>
            <linearGradient id="questGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00ffcc" />
              <stop offset="50%" stopColor="#00d9ff" />
              <stop offset="100%" stopColor="#ffd700" />
            </linearGradient>
          </defs>
        </svg>

        <div className="relative space-y-6" style={{
        zIndex: 1
      }}>
          {steps.map((step, index) => {
          const Icon = step.icon;
          return <motion.div key={step.title} className="flex items-start gap-4" initial={{
            opacity: 0,
            x: -30
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.8 + index * 0.2
          }}>
                <motion.div className="relative flex-shrink-0" whileHover={{
              scale: 1.1
            }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center relative" style={{
                background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                boxShadow: `0 0 20px ${step.color}40, inset 0 0 20px ${step.color}20`,
                border: `2px solid ${step.color}60`
              }}>
                    <Icon className="w-7 h-7" style={{
                  color: step.color
                }} />
                  </div>
                  <motion.div className="absolute -top-1 -right-1 bg-gradient-to-br from-[#ffd700] to-[#ffb800] rounded-full px-2 py-0.5 text-[10px] font-bold text-[#0a1a1f] shadow-lg" initial={{
                scale: 0
              }} animate={{
                scale: 1
              }} transition={{
                delay: 1 + index * 0.2,
                type: 'spring'
              }}>
                    {index + 1}
                  </motion.div>
                </motion.div>

                <div className="flex-1 bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] rounded-xl p-4 border border-white/10 shadow-lg">
                  <h3 className="text-base font-bold text-white mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">
                    {step.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-[#00ffcc]/10 px-3 py-1.5 rounded-full border border-[#00ffcc]/30">
                      <span className="text-xs font-bold text-[#00ffcc]">
                        {step.reward}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-[#ffd700]/10 px-3 py-1.5 rounded-full border border-[#ffd700]/30">
                      <CoinsIcon className="w-3 h-3 text-[#ffd700]" />
                      <span className="text-xs font-bold text-[#ffd700]">
                        {step.coins}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>;
        })}
        </div>
      </div>
    </div>;
}