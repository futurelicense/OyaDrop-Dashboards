import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Hotel, Building, Users } from 'lucide-react';
interface AccommodationHeaderProps {
  onMenuClick: () => void;
}
const categories = [{
  id: 'hotels',
  label: 'Hotels',
  icon: Hotel
}, {
  id: 'shortlets',
  label: 'Shortlets',
  icon: Building
}, {
  id: 'shared',
  label: 'Shared',
  icon: Users
}];
export function AccommodationHeader({
  onMenuClick
}: AccommodationHeaderProps) {
  const [activeCategory, setActiveCategory] = useState('hotels');
  return <motion.header className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-cyan-500/20" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      {/* Top Row */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }} onClick={onMenuClick}>
              <Menu className="w-6 h-6 text-white" />
            </motion.button>

            <div>
              <h1 className="text-lg font-bold text-white">OyaDrop Stays</h1>
              <p className="text-xs text-gray-400">Find your perfect place</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Bell className="w-5 h-5 text-white" />
              <motion.span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" animate={{
              scale: [1, 1.2, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} />
            </motion.button>

            <motion.button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-lg" whileTap={{
            scale: 0.95
          }}>
              👤
            </motion.button>
          </div>
        </div>

        {/* Category Switcher */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          return <motion.button key={category.id} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} onClick={() => setActiveCategory(category.id)} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.1
          }} whileTap={{
            scale: 0.95
          }}>
                <Icon className="w-4 h-4" />
                {category.label}
              </motion.button>;
        })}
        </div>
      </div>
    </motion.header>;
}