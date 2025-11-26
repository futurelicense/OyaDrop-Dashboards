import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, StoreIcon, UsersIcon, XIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'home' | 'kiosk' | 'referral';
  onNavigate: (view: 'home' | 'kiosk' | 'referral') => void;
}
const navItems = [{
  id: 'home',
  label: 'Home',
  icon: HomeIcon,
  color: '#00ffcc'
}, {
  id: 'kiosk',
  label: 'Kiosk Dashboard',
  icon: StoreIcon,
  color: '#00d9ff'
}, {
  id: 'referral',
  label: 'Referral Quest',
  icon: UsersIcon,
  color: '#ff00ff'
}];
export function Sidebar({
  isOpen,
  onClose,
  activeView,
  onNavigate
}: SidebarProps) {
  const handleNavigate = (view: 'home' | 'kiosk' | 'referral') => {
    onNavigate(view);
    onClose();
  };
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Sidebar */}
          <motion.div className="fixed top-0 left-0 bottom-0 w-72 bg-gradient-to-b from-[#0a1a1f] via-[#0f2027] to-[#0a1a1f] border-r border-white/10 z-[70] shadow-2xl" initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <motion.div className="text-xl font-bold bg-gradient-to-r from-[#00ffcc] to-[#00d9ff] bg-clip-text text-transparent" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.1
          }}>
                OyaDrop
              </motion.div>

              <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }} initial={{
            opacity: 0,
            rotate: -90
          }} animate={{
            opacity: 1,
            rotate: 0
          }} transition={{
            delay: 0.1
          }}>
                <XIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Navigation Items */}
            <nav className="p-4">
              <motion.p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3" initial={{
            opacity: 0,
            y: -10
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
                Navigation
              </motion.p>

              <div className="space-y-2">
                {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return <motion.button key={item.id} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-[#00ffcc]/20 to-[#00d9ff]/10 border border-[#00ffcc]/30' : 'hover:bg-white/5 border border-transparent'}`} onClick={() => handleNavigate(item.id as 'home' | 'kiosk' | 'referral')} initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.2 + index * 0.1
              }} whileTap={{
                scale: 0.98
              }}>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'shadow-lg' : ''}`} style={{
                  backgroundColor: isActive ? `${item.color}30` : '#1a2a2f',
                  boxShadow: isActive ? `0 0 20px ${item.color}40` : 'none'
                }}>
                        <Icon className="w-5 h-5" style={{
                    color: isActive ? item.color : '#6b7280'
                  }} />
                      </div>

                      <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                        {item.label}
                      </span>

                      {isActive && <motion.div className="ml-auto w-2 h-2 rounded-full" style={{
                  backgroundColor: item.color
                }} layoutId="activeIndicator" transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300
                }} />}
                    </motion.button>;
            })}
              </div>
            </nav>

            {/* Footer Info */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4
        }}>
              <div className="bg-gradient-to-br from-[#1a2a2f] to-[#1f2f35] rounded-xl p-4 border border-white/10">
                <p className="text-xs text-gray-400 mb-2">OyaDrop Super App</p>
                <p className="text-sm font-semibold text-white">v2.0.0</p>
              </div>
            </motion.div>
          </motion.div>
        </>}
    </AnimatePresence>;
}