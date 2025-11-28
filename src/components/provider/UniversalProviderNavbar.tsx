import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, DollarSign, ChevronDown, Power, Menu } from 'lucide-react';
interface UniversalProviderNavbarProps {
  provider: {
    name: string;
    avatar: string;
    serviceType: string;
    status: 'online' | 'offline' | 'busy' | 'on-job';
  };
  earnings: number;
  notifications: number;
  onMenuClick: () => void;
}
const statusConfig = {
  online: {
    label: 'Online',
    color: '#10B981',
    bg: '#10B98120'
  },
  offline: {
    label: 'Offline',
    color: '#6B7280',
    bg: '#6B728020'
  },
  busy: {
    label: 'Busy',
    color: '#F59E0B',
    bg: '#F59E0B20'
  },
  'on-job': {
    label: 'On Job',
    color: '#00D9C0',
    bg: '#00D9C020'
  }
};
export function UniversalProviderNavbar({
  provider,
  earnings,
  notifications,
  onMenuClick
}: UniversalProviderNavbarProps) {
  const [isOnline, setIsOnline] = useState(provider.status === 'online');
  const currentStatus = statusConfig[provider.status];
  return <motion.nav className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-cyan-500/20 px-4 py-4" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }}>
      <div className="flex items-center justify-between">
        {/* Left: Menu & Avatar & Status */}
        <div className="flex items-center gap-3">
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }} onClick={onMenuClick}>
            <Menu className="w-6 h-6 text-white" />
          </motion.button>

          <div className="relative">
            <img src={provider.avatar} alt={provider.name} className="w-12 h-12 rounded-full border-2 border-cyan-500/30" />
            <motion.div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#0A0E1A]" style={{
            backgroundColor: currentStatus.color
          }} animate={{
            scale: [1, 1.2, 1]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
          </div>

          <div>
            <h2 className="text-sm font-bold text-white">{provider.name}</h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{
              color: currentStatus.color,
              backgroundColor: currentStatus.bg
            }}>
                {currentStatus.label}
              </span>
              <button className="flex items-center gap-1 text-xs text-gray-400">
                {provider.serviceType}
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Earnings */}
          <motion.button className="flex items-center gap-1.5 px-3 py-2 bg-green-500/20 border border-green-500/30 rounded-xl" whileTap={{
          scale: 0.95
        }}>
            <DollarSign className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-green-400">
              ₦{earnings.toLocaleString()}
            </span>
          </motion.button>

          {/* Notifications */}
          <motion.button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Bell className="w-5 h-5 text-white" />
            {notifications > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center">
                {notifications}
              </span>}
          </motion.button>

          {/* Online Toggle */}
          <motion.button className={`p-2 rounded-xl transition-colors ${isOnline ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`} onClick={() => setIsOnline(!isOnline)} whileTap={{
          scale: 0.95
        }}>
            <Power className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.nav>;
}