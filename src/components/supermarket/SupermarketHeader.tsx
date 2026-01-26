import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Menu, ChevronDown } from 'lucide-react';
interface SupermarketHeaderProps {
  onMenuClick: () => void;
}
export function SupermarketHeader({ onMenuClick }: SupermarketHeaderProps) {
  const [isOnline, setIsOnline] = useState(true);
  return (
    <div className="bg-[#0A0E1A] border-b border-white/10">
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <motion.button
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            whileTap={{
              scale: 0.95
            }}
            onClick={onMenuClick}>

            <Menu className="w-6 h-6 text-white" />
          </motion.button>

          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=100&h=100&fit=crop"
              alt="Store"
              className="w-10 h-10 rounded-xl object-cover" />

            <div>
              <h1 className="text-sm font-bold text-white">
                FreshMart Supermarket
              </h1>
              <button className="flex items-center gap-1 text-xs text-gray-400">
                <span>Lekki Phase 1</span>
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
            whileTap={{
              scale: 0.95
            }}>

            <Bell className="w-6 h-6 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>
        </div>
      </div>

      {/* Online/Offline Toggle */}
      <div className="px-4 pb-3">
        <motion.button
          className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isOnline ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 border-2 border-green-500' : 'bg-[#131B2E] border-2 border-white/10'}`}
          onClick={() => setIsOnline(!isOnline)}
          whileTap={{
            scale: 0.98
          }}>

          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />

            <div className="text-left">
              <p className="text-sm font-bold text-white">
                {isOnline ? 'Store is Online' : 'Store is Offline'}
              </p>
              <p className="text-xs text-gray-400">
                {isOnline ? 'Accepting orders' : 'Not accepting orders'}
              </p>
            </div>
          </div>

          <motion.div
            className={`w-14 h-8 rounded-full p-1 transition-colors ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}
            animate={{
              backgroundColor: isOnline ? '#10B981' : '#4B5563'
            }}>

            <motion.div
              className="w-6 h-6 bg-white rounded-full"
              animate={{
                x: isOnline ? 24 : 0
              }}
              transition={{
                type: 'spring',
                damping: 20,
                stiffness: 300
              }} />

          </motion.div>
        </motion.button>
      </div>
    </div>);

}