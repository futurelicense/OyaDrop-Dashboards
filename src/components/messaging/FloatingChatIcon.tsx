import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
interface FloatingChatIconProps {
  unreadCount?: number;
  onOpenChat: () => void;
}
export function FloatingChatIcon({
  unreadCount = 0,
  onOpenChat
}: FloatingChatIconProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  return <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isExpanded && <motion.div className="absolute bottom-16 right-0 bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-cyan-500/30 shadow-2xl w-64" initial={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }} exit={{
        opacity: 0,
        y: 20,
        scale: 0.9
      }} transition={{
        type: 'spring',
        damping: 20
      }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-white">Quick Chat</h3>
              <motion.button className="p-1 rounded-lg hover:bg-white/5 transition-colors" onClick={() => setIsExpanded(false)} whileTap={{
            scale: 0.9
          }}>
                <X className="w-4 h-4 text-gray-400" />
              </motion.button>
            </div>

            <p className="text-xs text-gray-400 mb-3">
              Open messages to chat with riders, restaurants, and vendors
            </p>

            <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-cyan-500/30" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }} onClick={() => {
          setIsExpanded(false);
          onOpenChat();
        }}>
              Open Messages
            </motion.button>
          </motion.div>}
      </AnimatePresence>

      <motion.button className="relative w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} onClick={() => setIsExpanded(!isExpanded)} animate={unreadCount > 0 ? {
      scale: [1, 1.1, 1]
    } : {}} transition={unreadCount > 0 ? {
      duration: 0.5,
      repeat: Infinity,
      repeatDelay: 2
    } : {}}>
        <MessageCircle className="w-6 h-6 text-white" />

        {unreadCount > 0 && <motion.span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center border-2 border-[#0A0E1A]" initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        type: 'spring',
        damping: 15
      }}>
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.span>}
      </motion.button>
    </div>;
}