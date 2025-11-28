import React from 'react';
import { motion } from 'framer-motion';
import { Menu, Bell, Clock } from 'lucide-react';
interface TransportHeaderProps {
  onMenuClick: () => void;
}
export function TransportHeader({
  onMenuClick
}: TransportHeaderProps) {
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
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }} onClick={onMenuClick}>
              <Menu className="w-6 h-6 text-white" />
            </motion.button>

            <div>
              <h1 className="text-lg font-bold text-white">Book a Ride</h1>
              <p className="text-xs text-gray-400">OyaDrop Transport</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
            scale: 0.95
          }}>
              <Clock className="w-5 h-5 text-gray-400" />
            </motion.button>

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
      </div>
    </motion.header>;
}