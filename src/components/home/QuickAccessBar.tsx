import React from 'react';
import { motion } from 'framer-motion';
import { Car, Store, ShoppingBag, Wallet } from 'lucide-react';
interface QuickAccessBarProps {
  onNavigate?: (view: string) => void;
}
const quickServices = [
{
  id: 'transport',
  name: 'OyaGo',
  icon: Car,
  color: '#00D9C0',
  gradient: 'from-cyan-500 to-teal-500'
},
{
  id: 'kioskstore',
  name: 'Kiosk',
  icon: Store,
  color: '#FFB800',
  gradient: 'from-yellow-500 to-orange-500'
},
{
  id: 'marketplace',
  name: 'Marketplace',
  icon: ShoppingBag,
  color: '#8B5CF6',
  gradient: 'from-violet-500 to-purple-500'
},
{
  id: 'wallet',
  name: 'Wallet',
  icon: Wallet,
  color: '#B026FF',
  gradient: 'from-purple-500 to-pink-500'
}];

export function QuickAccessBar({ onNavigate }: QuickAccessBarProps) {
  return (
    <div className="px-4 py-4 bg-gradient-to-b from-black to-transparent">
      <div className="flex items-center justify-between gap-3">
        {quickServices.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.id}
              className="flex-1 relative group"
              initial={{
                opacity: 0,
                y: -10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: index * 0.1
              }}
              onClick={() => onNavigate?.(service.id)}
              whileTap={{
                scale: 0.95
              }}>

              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"
                style={{
                  backgroundColor: service.color + '40'
                }} />


              {/* Button content */}
              <div
                className={`relative bg-gradient-to-br ${service.gradient} rounded-2xl p-4 flex flex-col items-center gap-2 shadow-lg`}>

                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-bold text-white">
                  {service.name}
                </span>
              </div>
            </motion.button>);

        })}
      </div>
    </div>);

}