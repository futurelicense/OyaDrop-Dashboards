import React from 'react';
import { motion } from 'framer-motion';
import { Send, Wallet, Smartphone, FileText, RefreshCw, ArrowDownToLine } from 'lucide-react';
const services = [{
  id: 1,
  name: 'Send OyaCoin',
  icon: Send,
  color: '#00D9C0',
  xpReward: '+10 XP'
}, {
  id: 2,
  name: 'Receive OyaCoin',
  icon: Wallet,
  color: '#00F0FF',
  xpReward: '+5 XP'
}, {
  id: 3,
  name: 'Buy Airtime',
  icon: Smartphone,
  color: '#B026FF',
  xpReward: '+15 XP'
}, {
  id: 4,
  name: 'e-Statement',
  icon: FileText,
  color: '#FFB800',
  xpReward: ''
}, {
  id: 5,
  name: 'Convert Coins',
  icon: RefreshCw,
  color: '#10B981',
  xpReward: '+20 XP'
}, {
  id: 6,
  name: 'Withdraw',
  icon: ArrowDownToLine,
  color: '#F59E0B',
  xpReward: '+10 XP'
}];
export function GamifiedServicesGrid() {
  return <div className="px-4 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Wallet Services
      </motion.h2>

      <div className="grid grid-cols-3 gap-3">
        {services.map((service, index) => {
        const Icon = service.icon;
        return <motion.button key={service.id} className="relative aspect-square rounded-2xl bg-gradient-to-br from-[#131B2E] to-[#0F1520] border border-white/10 p-4 flex flex-col items-center justify-center group" initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: index * 0.08
        }} whileHover={{
          scale: 1.05,
          y: -4,
          borderColor: service.color + '60'
        }} whileTap={{
          scale: 0.95
        }}>
              {/* Glow Effect on Hover */}
              <motion.div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{
            background: `radial-gradient(circle at 50% 50%, ${service.color}20, transparent 70%)`
          }} />

              {/* Icon */}
              <div className="relative w-12 h-12 rounded-xl flex items-center justify-center mb-2 transition-all group-hover:scale-110" style={{
            backgroundColor: service.color + '20',
            boxShadow: `0 0 0 0 ${service.color}30`
          }}>
                <Icon className="w-6 h-6" style={{
              color: service.color
            }} />
              </div>

              {/* Name */}
              <p className="text-[10px] font-semibold text-white text-center leading-tight mb-1">
                {service.name}
              </p>

              {/* XP Reward */}
              {service.xpReward && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{
            backgroundColor: service.color + '20',
            color: service.color
          }}>
                  {service.xpReward}
                </span>}
            </motion.button>;
      })}
      </div>
    </div>;
}