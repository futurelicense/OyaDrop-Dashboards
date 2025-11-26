import React from 'react';
import { motion } from 'framer-motion';
import { PackageIcon, ShoppingCartIcon, UsersIcon, TrendingUpIcon } from 'lucide-react';
const stats = [{
  label: 'Products',
  value: '156',
  icon: PackageIcon,
  color: '#00d9ff',
  change: '+8'
}, {
  label: 'Orders',
  value: '342',
  icon: ShoppingCartIcon,
  color: '#00ffcc',
  change: '+24'
}, {
  label: 'Customers',
  value: '1.2K',
  icon: UsersIcon,
  color: '#ff00ff',
  change: '+156'
}, {
  label: 'Revenue',
  value: '₦2.4M',
  icon: TrendingUpIcon,
  color: '#ffb800',
  change: '+18%'
}];
export function StatsGrid() {
  return <div className="px-5 pb-6">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => {
        const Icon = stat.icon;
        return <motion.div key={stat.label} className="bg-gradient-to-br from-[#1a1a24] to-[#1f1f2e] rounded-xl p-4 border border-white/5 shadow-lg relative overflow-hidden" initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.4 + index * 0.1,
          duration: 0.4
        }} whileHover={{
          scale: 1.05
        }}>
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20" style={{
            backgroundColor: stat.color
          }} />

              <div className="relative">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{
              backgroundColor: `${stat.color}15`,
              boxShadow: `0 0 20px ${stat.color}30`
            }}>
                  <Icon className="w-5 h-5" style={{
                color: stat.color
              }} />
                </div>

                <p className="text-xs text-gray-400 mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <span className="text-xs font-medium text-[#00ff88]">
                    {stat.change}
                  </span>
                </div>
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}