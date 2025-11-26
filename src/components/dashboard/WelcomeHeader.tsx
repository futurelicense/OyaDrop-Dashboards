import React from 'react';
import { motion } from 'framer-motion';
import { Sparkline } from './Sparkline';
import { TrendingUpIcon } from 'lucide-react';
export function WelcomeHeader() {
  const salesData = [45, 52, 48, 61, 58, 65, 72, 68, 75, 82, 78, 85];
  return <motion.div className="px-5 py-6" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: 0.2,
    duration: 0.5
  }}>
      <h1 className="text-2xl font-bold text-white mb-1">
        Welcome back, Merchant 👋
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        Here's what's happening with your store today
      </p>

      <motion.div className="bg-gradient-to-br from-[#1a1a24] to-[#1f1f2e] rounded-2xl p-5 border border-white/5 shadow-xl" whileHover={{
      scale: 1.02
    }} transition={{
      duration: 0.2
    }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
              Today's Sales
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white">₦85,420</span>
              <span className="flex items-center gap-1 text-xs font-medium text-[#00ff88]">
                <TrendingUpIcon className="w-3 h-3" />
                +12.5%
              </span>
            </div>
          </div>
        </div>

        <div className="h-10">
          <Sparkline data={salesData} color="#00d9ff" height={40} />
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
          <div>
            <p className="text-xs text-gray-400">Orders</p>
            <p className="text-lg font-semibold text-white">24</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Avg. Order</p>
            <p className="text-lg font-semibold text-white">₦3,559</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Peak Hour</p>
            <p className="text-lg font-semibold text-white">2-3 PM</p>
          </div>
        </div>
      </motion.div>
    </motion.div>;
}