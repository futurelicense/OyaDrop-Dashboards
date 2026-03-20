import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Package,
  ShoppingCart,
  MessageCircle,
  Settings } from
'lucide-react';
type Tab = 'home' | 'products' | 'orders' | 'messages' | 'settings';
interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}
export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
  {
    id: 'home',
    icon: Home,
    label: 'Home'
  },
  {
    id: 'products',
    icon: Package,
    label: 'Products'
  },
  {
    id: 'orders',
    icon: ShoppingCart,
    label: 'Orders'
  },
  {
    id: 'messages',
    icon: MessageCircle,
    label: 'Messages'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings'
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#131B2E] border-t border-white/10 z-50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl relative"
              onClick={() => onTabChange(tab.id as Tab)}
              whileTap={{
                scale: 0.95
              }}>
              
              {isActive &&
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 rounded-xl"
                layoutId="activeTab"
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300
                }} />

              }
              <Icon
                className={`w-6 h-6 relative z-10 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
              
              <span
                className={`text-xs font-semibold relative z-10 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`}>
                
                {tab.label}
              </span>
            </motion.button>);

        })}
      </div>
    </div>);

}