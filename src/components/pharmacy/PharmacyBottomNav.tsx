import React from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  Pill,
  ShoppingCart,
  FileText,
  MessageCircle,
  Settings } from
'lucide-react';
type Tab =
'home' |
'catalog' |
'orders' |
'prescriptions' |
'messages' |
'settings';
interface PharmacyBottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}
export function PharmacyBottomNav({
  activeTab,
  onTabChange
}: PharmacyBottomNavProps) {
  const tabs = [
  {
    id: 'home',
    icon: Home,
    label: 'Home'
  },
  {
    id: 'catalog',
    icon: Pill,
    label: 'Catalog'
  },
  {
    id: 'orders',
    icon: ShoppingCart,
    label: 'Orders'
  },
  {
    id: 'prescriptions',
    icon: FileText,
    label: 'Rx'
  },
  {
    id: 'messages',
    icon: MessageCircle,
    label: 'Chat'
  },
  {
    id: 'settings',
    icon: Settings,
    label: 'Settings'
  }];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#131B2E] border-t border-white/10 z-50">
      <div className="grid grid-cols-6 px-1 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              className="flex flex-col items-center gap-1 py-2 px-2 rounded-xl relative"
              onClick={() => onTabChange(tab.id as Tab)}
              whileTap={{
                scale: 0.95
              }}>
              
              {isActive &&
              <motion.div
                className="absolute inset-0 bg-cyan-500/20 rounded-xl"
                layoutId="activePharmacyTab"
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300
                }} />

              }
              <Icon
                className={`w-5 h-5 relative z-10 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`} />
              
              <span
                className={`text-[10px] font-semibold relative z-10 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`}>
                
                {tab.label}
              </span>
            </motion.button>);

        })}
      </div>
    </div>);

}