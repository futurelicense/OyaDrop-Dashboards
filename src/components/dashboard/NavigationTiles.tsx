import React from 'react';
import { motion } from 'framer-motion';
import { PackageIcon, ShoppingBagIcon, TicketIcon, BarChart3Icon, BriefcaseIcon, SettingsIcon } from 'lucide-react';
const tiles = [{
  label: 'Products',
  icon: PackageIcon,
  color: '#00d9ff',
  description: 'Manage inventory'
}, {
  label: 'Orders',
  icon: ShoppingBagIcon,
  color: '#00ffcc',
  description: 'Track sales'
}, {
  label: 'Coupons',
  icon: TicketIcon,
  color: '#ff00ff',
  description: 'Create offers'
}, {
  label: 'Analytics',
  icon: BarChart3Icon,
  color: '#ffb800',
  description: 'View insights'
}, {
  label: 'Business Suite',
  icon: BriefcaseIcon,
  color: '#00ff88',
  description: 'Grow your store'
}, {
  label: 'Settings',
  icon: SettingsIcon,
  color: '#a0a0b0',
  description: 'Configure store'
}];
export function NavigationTiles() {
  return <div className="px-5 pb-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {tiles.map((tile, index) => {
        const Icon = tile.icon;
        return <motion.button key={tile.label} className="relative bg-gradient-to-br from-[#1a1a24]/80 to-[#1f1f2e]/80 backdrop-blur-xl rounded-2xl p-5 border border-white/10 text-left overflow-hidden group" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.6 + index * 0.08,
          duration: 0.4
        }} whileHover={{
          scale: 1.05,
          borderColor: 'rgba(255,255,255,0.2)'
        }} whileTap={{
          scale: 0.98
        }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: `radial-gradient(circle at 50% 50%, ${tile.color}15, transparent 70%)`
          }} />

              <div className="relative">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300" style={{
              backgroundColor: `${tile.color}15`,
              boxShadow: `0 0 0 0 ${tile.color}30`
            }}>
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" style={{
                color: tile.color
              }} />
                </div>

                <h3 className="text-base font-semibold text-white mb-1">
                  {tile.label}
                </h3>
                <p className="text-xs text-gray-400">{tile.description}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
            background: `linear-gradient(90deg, transparent, ${tile.color}, transparent)`,
            boxShadow: `0 0 8px ${tile.color}`
          }} />
            </motion.button>;
      })}
      </div>
    </div>;
}