import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, TrendingUp, Gift } from 'lucide-react';
export function OyaCoinVault() {
  const [isOpen, setIsOpen] = useState(false);
  const coinBalance = 38249.27;
  const earnedToday = 1250.5;
  const conversionRate = 10;
  const claimableRewards = 500;
  return <div className="px-4 mb-6">
      <motion.div className="relative rounded-3xl bg-gradient-to-br from-amber-900/20 via-yellow-900/20 to-amber-800/20 border border-amber-500/30 overflow-hidden" initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.5
    }}>
        {/* Gold Shine Effect */}
        <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent" animate={{
        x: ['-100%', '100%']
      }} transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }} />

        {/* Vault Door Button */}
        <motion.button className="w-full p-6 text-left" onClick={() => setIsOpen(!isOpen)} whileTap={{
        scale: 0.98
      }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_24px_rgba(255,215,0,0.4)]" animate={{
              rotate: isOpen ? 0 : [0, -5, 5, 0]
            }} transition={{
              duration: 0.5
            }}>
                {isOpen ? <Unlock className="w-7 h-7 text-black" /> : <Lock className="w-7 h-7 text-black" />}
              </motion.div>
              <div>
                <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">
                  OyaCoin Vault
                </p>
                <p className="text-2xl font-bold text-white">
                  {coinBalance.toLocaleString()} OC
                </p>
              </div>
            </div>

            <motion.div animate={{
            rotate: isOpen ? 180 : 0
          }} transition={{
            duration: 0.3
          }} className="text-amber-400">
              ▼
            </motion.div>
          </div>

          {!isOpen && <p className="text-xs text-gray-400 text-center">
              Tap to open vault
            </p>}
        </motion.button>

        {/* Vault Contents */}
        <AnimatePresence>
          {isOpen && <motion.div initial={{
          height: 0,
          opacity: 0
        }} animate={{
          height: 'auto',
          opacity: 1
        }} exit={{
          height: 0,
          opacity: 0
        }} transition={{
          duration: 0.3
        }} className="overflow-hidden">
              <div className="px-6 pb-6 space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0A0E1A]/50 rounded-xl p-3 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-gray-400">Earned Today</p>
                    </div>
                    <p className="text-lg font-bold text-white">
                      +{earnedToday} OC
                    </p>
                  </div>

                  <div className="bg-[#0A0E1A]/50 rounded-xl p-3 border border-amber-500/20">
                    <p className="text-xs text-gray-400 mb-1">
                      Conversion Rate
                    </p>
                    <p className="text-lg font-bold text-white">
                      1 OC = ₦{conversionRate}
                    </p>
                  </div>
                </div>

                {/* Claimable Rewards */}
                {claimableRewards > 0 && <motion.div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30" initial={{
              scale: 0.9
            }} animate={{
              scale: 1
            }} transition={{
              delay: 0.2
            }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Gift className="w-6 h-6 text-purple-400" />
                        <div>
                          <p className="text-xs text-gray-400">
                            Claimable Rewards
                          </p>
                          <p className="text-xl font-bold text-white">
                            +{claimableRewards} OC
                          </p>
                        </div>
                      </div>
                      <motion.button className="bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 rounded-xl font-bold text-white text-sm shadow-lg" whileHover={{
                  scale: 1.05
                }} whileTap={{
                  scale: 0.95
                }}>
                        Claim +50 XP
                      </motion.button>
                    </div>
                  </motion.div>}
              </div>
            </motion.div>}
        </AnimatePresence>
      </motion.div>
    </div>;
}