import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Store, Gift, ShoppingBag, Wallet, Utensils, Car, Building, Package, Briefcase, MessageCircle, ShoppingCart, Pill, Sparkles, Shirt, Users, ChevronRight } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  onNavigate: (view: string) => void;
}
interface NavSection {
  title: string;
  items: NavItem[];
}
interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  badge?: string;
}
const navSections: NavSection[] = [{
  title: 'Main',
  items: [{
    id: 'home',
    label: 'Home Dashboard',
    icon: <Home className="w-5 h-5" />,
    color: '#00D9C0'
  }, {
    id: 'wallet',
    label: 'Wallet',
    icon: <Wallet className="w-5 h-5" />,
    color: '#FFB800'
  }, {
    id: 'referral',
    label: 'Referral Program',
    icon: <Gift className="w-5 h-5" />,
    color: '#B026FF'
  }, {
    id: 'messaging',
    label: 'Messages',
    icon: <MessageCircle className="w-5 h-5" />,
    color: '#00D9C0'
  }]
}, {
  title: 'Customer Services',
  items: [{
    id: 'pharmacy-customer',
    label: 'Pharmacy Shopping',
    icon: <Pill className="w-5 h-5" />,
    color: '#B026FF'
  }, {
    id: 'beauty-customer',
    label: 'Beauty Services',
    icon: <Sparkles className="w-5 h-5" />,
    color: '#FF6B00'
  }, {
    id: 'supermarket-customer',
    label: 'Supermarket',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: '#10B981'
  }, {
    id: 'laundry-customer',
    label: 'Laundry Service',
    icon: <Shirt className="w-5 h-5" />,
    color: '#14B8A6'
  }, {
    id: 'fastfood',
    label: 'Fast Food',
    icon: <Utensils className="w-5 h-5" />,
    color: '#EF4444'
  }, {
    id: 'transport',
    label: 'Transport',
    icon: <Car className="w-5 h-5" />,
    color: '#00D9C0'
  }, {
    id: 'accommodation',
    label: 'Accommodation',
    icon: <Building className="w-5 h-5" />,
    color: '#3B82F6'
  }, {
    id: 'marketplace',
    label: 'Marketplace',
    icon: <ShoppingBag className="w-5 h-5" />,
    color: '#8B5CF6'
  }]
}, {
  title: 'Provider Dashboards',
  items: [{
    id: 'beauty-provider',
    label: 'Beauty Provider',
    icon: <Sparkles className="w-5 h-5" />,
    color: '#FF6B00',
    badge: 'New'
  }, {
    id: 'pharmacy',
    label: 'Pharmacy Dashboard',
    icon: <Pill className="w-5 h-5" />,
    color: '#B026FF'
  }, {
    id: 'supermarket',
    label: 'Supermarket Dashboard',
    icon: <ShoppingCart className="w-5 h-5" />,
    color: '#10B981'
  }, {
    id: 'laundry',
    label: 'Laundry Dashboard',
    icon: <Shirt className="w-5 h-5" />,
    color: '#14B8A6'
  }, {
    id: 'merchant',
    label: 'Merchant Dashboard',
    icon: <Store className="w-5 h-5" />,
    color: '#EF4444'
  }, {
    id: 'provider',
    label: 'Universal Provider',
    icon: <Briefcase className="w-5 h-5" />,
    color: '#00D9C0'
  }]
}, {
  title: 'Business',
  items: [{
    id: 'kiosk',
    label: 'Kiosk Dashboard',
    icon: <Store className="w-5 h-5" />,
    color: '#8B5CF6'
  }, {
    id: 'kioskstore',
    label: 'Kiosk Storefront',
    icon: <Package className="w-5 h-5" />,
    color: '#8B5CF6'
  }]
}];
export function Sidebar({
  isOpen,
  onClose,
  activeView,
  onNavigate
}: SidebarProps) {
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Sidebar */}
          <motion.div className="fixed left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-[#0A0E1A] to-[#0F1520] z-50 overflow-y-auto" initial={{
        x: '-100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '-100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }}>
            {/* Header */}
            <div className="sticky top-0 bg-[#0A0E1A] border-b border-white/10 p-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">OyaDrop</h2>
                <p className="text-xs text-gray-400">
                  All Services & Dashboards
                </p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Navigation Sections */}
            <div className="p-4 space-y-6">
              {navSections.map((section, sectionIndex) => <div key={section.title}>
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    {section.title}
                  </h3>
                  <div className="space-y-1">
                    {section.items.map((item, itemIndex) => {
                const isActive = activeView === item.id;
                return <motion.button key={item.id} className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${isActive ? 'bg-white/10 border border-white/20' : 'hover:bg-white/5 border border-transparent'}`} onClick={() => {
                  onNavigate(item.id);
                  onClose();
                }} initial={{
                  opacity: 0,
                  x: -20
                }} animate={{
                  opacity: 1,
                  x: 0
                }} transition={{
                  delay: sectionIndex * 0.1 + itemIndex * 0.03
                }} whileTap={{
                  scale: 0.98
                }}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{
                      backgroundColor: `${item.color}20`,
                      color: item.color
                    }}>
                              {item.icon}
                            </div>
                            <div className="text-left">
                              <p className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                {item.label}
                              </p>
                              {item.badge && <span className="text-xs font-bold text-orange-400">
                                  {item.badge}
                                </span>}
                            </div>
                          </div>
                          {isActive && <motion.div initial={{
                    scale: 0
                  }} animate={{
                    scale: 1
                  }} transition={{
                    type: 'spring',
                    damping: 15
                  }}>
                              <ChevronRight className="w-5 h-5 text-white" />
                            </motion.div>}
                        </motion.button>;
              })}
                  </div>
                </div>)}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0E1A] to-transparent p-4 border-t border-white/10">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                <p className="text-sm font-bold text-white mb-1">Need Help?</p>
                <p className="text-xs text-gray-400 mb-3">
                  Contact support for assistance
                </p>
                <motion.button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white text-sm font-bold" whileTap={{
              scale: 0.98
            }}>
                  Contact Support
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}