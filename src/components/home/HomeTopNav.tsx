import React from 'react';
import { motion } from 'framer-motion';
import { MenuIcon, BellIcon, UserCircleIcon } from 'lucide-react';
interface HomeTopNavProps {
  onMenuClick: () => void;
}
export function HomeTopNav({
  onMenuClick
}: HomeTopNavProps) {
  return <motion.nav className="sticky top-0 z-50 bg-black/95 backdrop-blur-xl border-b border-gray-800" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.4
  }}>
      <div className="flex items-center justify-between px-5 py-4">
        <motion.button className="p-2 rounded-lg hover:bg-gray-900 transition-colors" whileTap={{
        scale: 0.95
      }} onClick={onMenuClick}>
          <MenuIcon className="w-6 h-6 text-white" />
        </motion.button>

        <motion.div className="flex items-center gap-2" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
          <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">O</span>
          </div>
          <span className="text-xl font-bold text-white">OyaDrop</span>
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.button className="relative p-2 rounded-lg hover:bg-gray-900 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <BellIcon className="w-6 h-6 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          </motion.button>

          <motion.button className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center" whileTap={{
          scale: 0.95
        }}>
            <UserCircleIcon className="w-6 h-6 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.nav>;
}