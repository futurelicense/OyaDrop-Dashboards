import React from 'react';
import { BellIcon, MenuIcon, UserCircleIcon } from 'lucide-react';
import { motion } from 'framer-motion';
interface TopNavProps {
  onMenuClick: () => void;
}
export function TopNav({
  onMenuClick
}: TopNavProps) {
  return <motion.nav className="sticky top-0 z-50 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.4
  }}>
      <div className="flex items-center justify-between px-5 py-4">
        <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" whileTap={{
        scale: 0.95
      }} onClick={onMenuClick}>
          <MenuIcon className="w-6 h-6 text-white" />
        </motion.button>

        <motion.div className="text-xl font-bold bg-gradient-to-r from-[#00d9ff] to-[#00ffcc] bg-clip-text text-transparent" initial={{
        scale: 0.9,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} transition={{
        delay: 0.2
      }}>
          OyaDrop
        </motion.div>

        <div className="flex items-center gap-3">
          <motion.button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <BellIcon className="w-6 h-6 text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00ff88] rounded-full shadow-[0_0_8px_#00ff88]" />
          </motion.button>

          <motion.button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00d9ff] to-[#00ffcc] p-0.5 shadow-[0_0_12px_rgba(0,217,255,0.3)]" whileTap={{
          scale: 0.95
        }}>
            <div className="w-full h-full rounded-full bg-[#1a1a24] flex items-center justify-center">
              <UserCircleIcon className="w-5 h-5 text-[#00d9ff]" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.nav>;
}