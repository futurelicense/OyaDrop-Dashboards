import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, ChevronDown, TrendingUp, Clock, DollarSign } from 'lucide-react';
interface MerchantProHeaderProps {
  onMenuClick: () => void;
}
export function MerchantProHeader({
  onMenuClick
}: MerchantProHeaderProps) {
  const [selectedBranch, setSelectedBranch] = useState('Jakande Branch');
  const branches = ['Jakande Branch', 'Ikota Branch', 'Lekki Phase 1 Branch', 'VI Branch'];
  return <motion.header className="sticky top-0 z-50 bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-transparent backdrop-blur-xl border-b border-cyan-500/20" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <div className="px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }} onClick={onMenuClick}>
              <Menu className="w-6 h-6 text-white" />
            </motion.button>

            {/* Merchant Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-2xl">
                🍔
              </div>
              <div>
                <p className="text-sm font-bold text-white">ChopChop Foods</p>
                <p className="text-xs text-gray-400">Merchant PRO</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Bell className="w-5 h-5 text-white" />
              <motion.span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" animate={{
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} />
            </motion.button>
          </div>
        </div>

        {/* Branch Selector & Quick KPIs */}
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {/* Branch Selector */}
          <div className="relative flex-shrink-0">
            <select value={selectedBranch} onChange={e => setSelectedBranch(e.target.value)} className="appearance-none bg-[#131B2E] text-white px-4 py-2 pr-10 rounded-xl border border-cyan-500/30 text-sm font-semibold cursor-pointer hover:border-cyan-500/50 transition-colors">
              {branches.map(branch => <option key={branch} value={branch}>
                  {branch}
                </option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
          </div>

          {/* Quick KPIs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="bg-[#131B2E] px-3 py-2 rounded-xl border border-orange-500/30 flex items-center gap-2">
              <motion.div className="w-2 h-2 bg-orange-500 rounded-full" animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.5, 1]
            }} transition={{
              duration: 1.5,
              repeat: Infinity
            }} />
              <span className="text-xs font-bold text-white">8 Live</span>
            </div>

            <div className="bg-[#131B2E] px-3 py-2 rounded-xl border border-green-500/30 flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-green-400" />
              <span className="text-xs font-bold text-white">₦284k</span>
            </div>

            <div className="bg-[#131B2E] px-3 py-2 rounded-xl border border-cyan-500/30 flex items-center gap-2">
              <Clock className="w-3 h-3 text-cyan-400" />
              <span className="text-xs font-bold text-white">12m</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>;
}