import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HomeIcon, StoreIcon, UsersIcon, XIcon, ShoppingBagIcon, WalletIcon, UtensilsIcon, LayoutDashboardIcon, CarIcon, BedIcon, BriefcaseIcon, MessageCircleIcon, ShoppingCartIcon, PillIcon, WashingMachineIcon, ChevronDownIcon, MapPinIcon, UserIcon, LogOutIcon, SparklesIcon, TruckIcon, SettingsIcon, ClockIcon, MenuIcon } from 'lucide-react';
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: 'home' | 'kiosk' | 'referral' | 'marketplace' | 'wallet' | 'fastfood' | 'merchant' | 'transport' | 'accommodation' | 'kioskstore' | 'provider' | 'messaging' | 'supermarket' | 'pharmacy' | 'laundry' | 'beauty-provider' | 'beauty-customer' | 'supermarket-customer' | 'pharmacy-customer' | 'laundry-customer' | 'sidebar' | 'track' | 'history';
  onNavigate: (view: string) => void;
}
const navItems = [{
  id: 'home',
  label: 'Dashboard',
  icon: HomeIcon,
  color: '#00ffcc'
}, {
  id: 'referral',
  label: 'Referrals',
  icon: UsersIcon,
  color: '#ffb800'
}, {
  id: 'wallet',
  label: 'Wallet',
  icon: WalletIcon,
  color: '#B026FF'
}, {
  id: 'sidebar',
  label: 'Sidebar',
  icon: MenuIcon,
  color: '#00D9C0'
}, {
  id: 'track',
  label: 'Track',
  icon: MapPinIcon,
  color: '#FFB800'
}, {
  id: 'history',
  label: 'History',
  icon: ClockIcon,
  color: '#8B5CF6'
}, {
  id: 'messaging',
  label: 'Messages',
  icon: MessageCircleIcon,
  color: '#00D9C0'
}, {
  id: 'beauty-provider',
  label: 'Beauty Provider',
  icon: SparklesIcon,
  color: '#FF6B00'
}, {
  id: 'laundry',
  label: 'Laundry Dashboard',
  icon: WashingMachineIcon,
  color: '#00D9C0'
}, {
  id: 'pharmacy',
  label: 'Pharmacy Dashboard',
  icon: PillIcon,
  color: '#10B981'
}, {
  id: 'supermarket',
  label: 'Supermarket Dashboard',
  icon: ShoppingCartIcon,
  color: '#00D9C0'
}, {
  id: 'provider',
  label: 'Provider Dashboard',
  icon: BriefcaseIcon,
  color: '#00F0FF'
}, {
  id: 'accommodation',
  label: 'Stays',
  icon: BedIcon,
  color: '#A855F7'
}, {
  id: 'transport',
  label: 'Transport',
  icon: CarIcon,
  color: '#00F0FF'
}, {
  id: 'kioskstore',
  label: 'Kiosk Store',
  icon: StoreIcon,
  color: '#FFB800'
}, {
  id: 'merchant',
  label: 'Merchant PRO',
  icon: LayoutDashboardIcon,
  color: '#10B981'
}, {
  id: 'fastfood',
  label: 'Fast-Food Arena',
  icon: UtensilsIcon,
  color: '#FF6B00'
}, {
  id: 'marketplace',
  label: 'Marketplace',
  icon: ShoppingBagIcon,
  color: '#00d9ff'
}, {
  id: 'kiosk',
  label: 'Kiosk Dashboard',
  icon: StoreIcon,
  color: '#ff00ff'
}];
export function Sidebar({
  isOpen,
  onClose,
  activeView,
  onNavigate
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    orders: true,
    foodOrders: false,
    marketplaceOrders: false
  });
  const handleNavigate = (view: string) => {
    onNavigate(view);
    onClose();
  };
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  const isProviderView = activeView === 'provider';
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
          <motion.div className={`fixed top-0 left-0 bottom-0 w-72 border-r z-[70] shadow-2xl overflow-y-auto ${isProviderView ? 'bg-gradient-to-b from-[#1a3a3a] via-[#1f4545] to-[#1a3a3a] border-teal-500/20' : 'bg-gradient-to-b from-[#0a1a1f] via-[#0f2027] to-[#0a1a1f] border-white/10'}`} initial={{
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
            {isProviderView ?
        // Universal Provider Sidebar
        <>
                {/* Provider Header */}
                <div className="p-5 border-b border-teal-500/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center ring-2 ring-teal-400/30">
                          <UserIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#1a3a3a]" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">
                          Sonia Alfred
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-green-400 font-semibold">
                            Online
                          </span>
                          <span className="text-xs text-gray-500">•</span>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-400">ORDER</span>
                            <ChevronDownIcon className="w-3 h-3 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
                scale: 0.95
              }}>
                      <XIcon className="w-5 h-5 text-white" />
                    </motion.button>
                  </div>

                  {/* Balance Card */}
                  <div className="bg-gradient-to-br from-teal-500/20 to-green-500/10 border border-teal-500/30 rounded-xl p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">
                          Today's Earnings
                        </p>
                        <p className="text-xl font-bold text-white">₦12,450</p>
                      </div>
                      <div className="w-10 h-10 bg-teal-500/20 rounded-lg flex items-center justify-center">
                        <WalletIcon className="w-5 h-5 text-teal-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Provider Navigation */}
                <nav className="p-4 space-y-1.5">
                  {/* Dashboard */}
                  <motion.button className="w-full text-left px-4 py-3 rounded-xl bg-teal-500/20 border border-teal-500/30 text-white font-semibold text-sm hover:bg-teal-500/30 transition-all" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.1
            }} whileTap={{
              scale: 0.98
            }}>
                    <div className="flex items-center gap-3">
                      <LayoutDashboardIcon className="w-4 h-4 text-teal-400" />
                      <span>Dashboard</span>
                    </div>
                  </motion.button>

                  {/* Orders Section */}
                  <div>
                    <motion.button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 text-white font-semibold text-sm transition-all" onClick={() => toggleSection('orders')} initial={{
                opacity: 0,
                y: -10
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: 0.15
              }} whileTap={{
                scale: 0.98
              }}>
                      <div className="flex items-center gap-3">
                        <ShoppingBagIcon className="w-4 h-4 text-gray-400" />
                        <span>Orders (Food & Marketplace)</span>
                      </div>
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.orders ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {expandedSections.orders && <motion.div className="ml-3 mt-1.5 space-y-1.5 border-l-2 border-teal-500/20 pl-3" initial={{
                  opacity: 0,
                  height: 0
                }} animate={{
                  opacity: 1,
                  height: 'auto'
                }} exit={{
                  opacity: 0,
                  height: 0
                }} transition={{
                  duration: 0.2
                }}>
                          {/* Food Orders */}
                          <div>
                            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-white text-sm transition-all" onClick={() => toggleSection('foodOrders')}>
                              <div className="flex items-center gap-2">
                                <UtensilsIcon className="w-4 h-4 text-orange-400" />
                                <span>Food Orders</span>
                              </div>
                              <ChevronDownIcon className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expandedSections.foodOrders ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {expandedSections.foodOrders && <motion.div className="ml-3 mt-1 space-y-1" initial={{
                        opacity: 0,
                        height: 0
                      }} animate={{
                        opacity: 1,
                        height: 'auto'
                      }} exit={{
                        opacity: 0,
                        height: 0
                      }} transition={{
                        duration: 0.2
                      }}>
                                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-all">
                                    Food Dashboard
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-all">
                                    Food Deliveries
                                  </button>
                                </motion.div>}
                            </AnimatePresence>
                          </div>

                          {/* Marketplace Orders */}
                          <div>
                            <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/5 text-white text-sm transition-all" onClick={() => toggleSection('marketplaceOrders')}>
                              <div className="flex items-center gap-2">
                                <ShoppingCartIcon className="w-4 h-4 text-blue-400" />
                                <span>Marketplace Orders</span>
                              </div>
                              <ChevronDownIcon className={`w-3.5 h-3.5 text-gray-400 transition-transform ${expandedSections.marketplaceOrders ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                              {expandedSections.marketplaceOrders && <motion.div className="ml-3 mt-1 space-y-1" initial={{
                        opacity: 0,
                        height: 0
                      }} animate={{
                        opacity: 1,
                        height: 'auto'
                      }} exit={{
                        opacity: 0,
                        height: 0
                      }} transition={{
                        duration: 0.2
                      }}>
                                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-all">
                                    Marketplace Dashboard
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-all">
                                    Marketplace Deliveries
                                  </button>
                                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 text-sm transition-all">
                                    Marketplace Order Bid
                                  </button>
                                </motion.div>}
                            </AnimatePresence>
                          </div>
                        </motion.div>}
                    </AnimatePresence>
                  </div>

                  {/* Vehicle Management */}
                  <motion.button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white font-semibold text-sm transition-all" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.2
            }} whileTap={{
              scale: 0.98
            }}>
                    <div className="flex items-center gap-3">
                      <TruckIcon className="w-4 h-4 text-gray-400" />
                      <span>Vehicle Management</span>
                    </div>
                  </motion.button>

                  {/* Manage Services */}
                  <motion.button className="w-full text-left px-4 py-3 rounded-xl bg-teal-500/20 border border-teal-500/30 text-white font-semibold text-sm hover:bg-teal-500/30 transition-all" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.25
            }} whileTap={{
              scale: 0.98
            }}>
                    <div className="flex items-center gap-3">
                      <SettingsIcon className="w-4 h-4 text-teal-400" />
                      <span>Manage Services</span>
                    </div>
                  </motion.button>

                  {/* Live Location */}
                  <motion.button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-white font-semibold text-sm transition-all" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3
            }} whileTap={{
              scale: 0.98
            }}>
                    <MapPinIcon className="w-4 h-4 text-green-400" />
                    <span>Live Location</span>
                  </motion.button>

                  {/* Profile */}
                  <motion.button className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-white font-semibold text-sm transition-all" initial={{
              opacity: 0,
              y: -10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.35
            }} whileTap={{
              scale: 0.98
            }}>
                    <div className="flex items-center gap-3">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span>Profile</span>
                    </div>
                  </motion.button>
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-teal-500/20 mt-auto">
                  <motion.button className="w-full py-3 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl text-white font-bold flex items-center justify-center gap-2 hover:from-teal-600 hover:to-green-600 transition-all shadow-lg shadow-teal-500/20" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} whileTap={{
              scale: 0.98
            }}>
                    <LogOutIcon className="w-5 h-5" />
                    Logout
                  </motion.button>
                </div>
              </> :
        // Standard Sidebar (Original Design)
        <>
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
                return <motion.button key={item.id} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${isActive ? 'bg-gradient-to-r from-[#00ffcc]/20 to-[#00d9ff]/10 border border-[#00ffcc]/30' : 'hover:bg-white/5 border border-transparent'}`} onClick={() => handleNavigate(item.id)} initial={{
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

                {/* Logout Button */}
                <div className="p-4 border-t border-white/10 mt-auto">
                  <motion.button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.4
            }} whileTap={{
              scale: 0.98
            }}>
                    <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <LogOutIcon className="w-5 h-5 text-red-400" />
                    </div>
                    <span className="text-sm font-semibold text-red-400">
                      Logout
                    </span>
                  </motion.button>
                </div>
              </>}
          </motion.div>
        </>}
    </AnimatePresence>;
}