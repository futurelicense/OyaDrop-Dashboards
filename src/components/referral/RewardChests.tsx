import React from 'react';
import { motion } from 'framer-motion';
import { UsersIcon, CoinsIcon, TrendingUpIcon } from 'lucide-react';
export function RewardChests() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Treasure Vaults
      </motion.h2>

      <div className="space-y-4">
        {/* Recruit Chest */}
        <motion.div className="relative bg-gradient-to-br from-[#1a2a2f] via-[#1f2f35] to-[#1a2a2f] rounded-2xl p-6 border border-[#00ffcc]/30 overflow-hidden" initial={{
        opacity: 0,
        x: -30
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.2
      }} whileHover={{
        scale: 1.02
      }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#00ffcc]/20 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] flex items-center justify-center shadow-[0_0_24px_rgba(0,255,204,0.4)]" animate={{
              rotate: [0, 5, -5, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                <UsersIcon className="w-8 h-8 text-[#0a1a1f]" />
              </motion.div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Recruit Chest
                </p>
                <p className="text-3xl font-bold text-white">47</p>
                <p className="text-xs text-[#00ffcc] font-semibold">
                  Total Referrals
                </p>
              </div>
            </div>

            <motion.div className="flex items-center gap-1 bg-[#00ff88]/20 px-3 py-1.5 rounded-full border border-[#00ff88]/40" animate={{
            scale: [1, 1.05, 1]
          }} transition={{
            duration: 1.5,
            repeat: Infinity
          }}>
              <TrendingUpIcon className="w-4 h-4 text-[#00ff88]" />
              <span className="text-sm font-bold text-[#00ff88]">+8</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Treasure Vault */}
        <motion.div className="relative bg-gradient-to-br from-[#1a2a2f] via-[#1f2f35] to-[#1a2a2f] rounded-2xl p-6 border border-[#ffd700]/30 overflow-hidden" initial={{
        opacity: 0,
        x: 30
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: 0.3
      }} whileHover={{
        scale: 1.02
      }}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#ffd700]/20 blur-3xl" />

          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#ffd700] to-[#ffb800] flex items-center justify-center shadow-[0_0_24px_rgba(255,215,0,0.4)]" animate={{
              y: [0, -5, 0]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }}>
                <CoinsIcon className="w-8 h-8 text-[#0a1a1f]" />
              </motion.div>

              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
                  Treasure Vault
                </p>
                <p className="text-3xl font-bold text-white">₦24,500</p>
                <p className="text-xs text-[#ffd700] font-semibold">
                  Total Earnings
                </p>
              </div>
            </div>

            <motion.button className="bg-gradient-to-r from-[#ffd700] to-[#ffb800] px-4 py-2 rounded-full font-bold text-[#0a1a1f] text-sm shadow-[0_0_16px_rgba(255,215,0,0.4)]" whileHover={{
            scale: 1.05,
            boxShadow: '0 0 24px rgba(255,215,0,0.6)'
          }} whileTap={{
            scale: 0.95
          }}>
              Claim
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>;
}