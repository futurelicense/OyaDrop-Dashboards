import React from 'react';
import { motion } from 'framer-motion';
const announcements = ['Midnight Promotion is on! Latest League of Legends Skins & Rare Skins are 50% off up to 60% | Hurry up, despite the fact that it is up to 60% off'];
export function MarqueeBar() {
  return <div className="bg-gray-900 border-b border-gray-800 overflow-hidden">
      <motion.div className="flex items-center gap-8 py-2.5 px-5" animate={{
      x: [0, -1000]
    }} transition={{
      duration: 30,
      repeat: Infinity,
      ease: 'linear'
    }}>
        {[...announcements, ...announcements, ...announcements].map((text, index) => <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <span className="text-xs font-medium text-gray-300">{text}</span>
            </div>)}
      </motion.div>
    </div>;
}