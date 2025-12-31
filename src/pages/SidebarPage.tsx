import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Users, Wallet, MapPin, Clock, LogOut, TrendingUp, Package, DollarSign, Activity, Zap, Menu, X } from 'lucide-react';
interface SidebarPageProps {
  onNavigate?: (view: string) => void;
}
const menuItems = [{
  id: 'home',
  label: 'Dashboard',
  icon: Home,
  color: '#00D9C0',
  angle: 0
}, {
  id: 'referral',
  label: 'Referrals',
  icon: Users,
  color: '#10B981',
  angle: 72
}, {
  id: 'wallet',
  label: 'Wallet',
  icon: Wallet,
  color: '#B026FF',
  angle: 144
}, {
  id: 'track',
  label: 'Track',
  icon: MapPin,
  color: '#FFB800',
  angle: 216
}, {
  id: 'history',
  label: 'History',
  icon: Clock,
  color: '#8B5CF6',
  angle: 288
}];
const stats = [{
  label: 'Total Orders',
  value: '1,234',
  change: '+12%',
  icon: Package,
  color: '#00D9C0'
}, {
  label: 'Revenue',
  value: '₦450K',
  change: '+8%',
  icon: DollarSign,
  color: '#10B981'
}, {
  label: 'Active Users',
  value: '892',
  change: '+23%',
  icon: Activity,
  color: '#B026FF'
}, {
  label: 'Growth',
  value: '45%',
  change: '+5%',
  icon: TrendingUp,
  color: '#FFB800'
}];
const recentActivity = [{
  id: 1,
  type: 'Order',
  description: 'New food delivery order',
  time: '2 mins ago',
  color: '#00D9C0'
}, {
  id: 2,
  type: 'Payment',
  description: 'Payment received ₦2,500',
  time: '15 mins ago',
  color: '#10B981'
}, {
  id: 3,
  type: 'Referral',
  description: 'New user joined via referral',
  time: '1 hour ago',
  color: '#B026FF'
}, {
  id: 4,
  type: 'Delivery',
  description: 'Order delivered successfully',
  time: '2 hours ago',
  color: '#FFB800'
}];
export function SidebarPage({
  onNavigate
}: SidebarPageProps) {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
    if (onNavigate) {
      onNavigate(itemId);
    }
    setSidebarOpen(false);
  };
  const radius = 140;
  return <div className="min-h-screen bg-black flex overflow-hidden relative">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
        backgroundImage: `
            linear-gradient(rgba(0, 217, 192, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 217, 192, 0.1) 1px, transparent 1px)
          `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }} />
      </div>

      {/* Hamburger Menu Button */}
      <motion.button className="fixed top-6 left-6 z-[100] w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-2xl" onClick={() => setSidebarOpen(!sidebarOpen)} whileHover={{
      scale: 1.05,
      boxShadow: '0 20px 40px rgba(0, 217, 192, 0.4)'
    }} whileTap={{
      scale: 0.95
    }}>
        <AnimatePresence mode="wait">
          {sidebarOpen ? <motion.div key="close" initial={{
          rotate: -90,
          opacity: 0
        }} animate={{
          rotate: 0,
          opacity: 1
        }} exit={{
          rotate: 90,
          opacity: 0
        }} transition={{
          duration: 0.2
        }}>
              <X className="w-7 h-7 text-white" />
            </motion.div> : <motion.div key="menu" initial={{
          rotate: 90,
          opacity: 0
        }} animate={{
          rotate: 0,
          opacity: 1
        }} exit={{
          rotate: -90,
          opacity: 0
        }} transition={{
          duration: 0.2
        }}>
              <Menu className="w-7 h-7 text-white" />
            </motion.div>}
        </AnimatePresence>
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {sidebarOpen && <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[60]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => setSidebarOpen(false)} />}
      </AnimatePresence>

      {/* Orbital Sidebar Navigation */}
      <AnimatePresence>
        {sidebarOpen && <motion.div className="fixed left-0 top-0 bottom-0 w-96 z-[70] flex items-center justify-center border-r border-cyan-500/20" initial={{
        x: -400
      }} animate={{
        x: 0
      }} exit={{
        x: -400
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }}>
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-cyan-500/10 to-transparent" />

            {/* Central Hub */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Pulsing Center Core */}
              <motion.div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center" animate={{
            boxShadow: ['0 0 40px rgba(0, 217, 192, 0.4)', '0 0 80px rgba(0, 217, 192, 0.6)', '0 0 40px rgba(0, 217, 192, 0.4)']
          }} transition={{
            duration: 2,
            repeat: Infinity
          }}>
                <div className="w-28 h-28 rounded-full bg-black flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">O</span>
                    </div>
                    <p className="text-xs font-bold text-white">OyaDrop</p>
                  </div>
                </div>
              </motion.div>

              {/* Orbital Rings */}
              {[1, 2, 3].map(ring => <motion.div key={ring} className="absolute rounded-full border border-cyan-500/20" style={{
            width: radius * 2 + ring * 40,
            height: radius * 2 + ring * 40
          }} animate={{
            rotate: 360
          }} transition={{
            duration: 20 + ring * 10,
            repeat: Infinity,
            ease: 'linear'
          }} />)}

              {/* Orbital Menu Items */}
              {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            const isHovered = hoveredItem === item.id;
            const angleRad = item.angle * Math.PI / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;
            return <motion.div key={item.id} className="absolute" style={{
              left: '50%',
              top: '50%'
            }} initial={{
              x: 0,
              y: 0,
              opacity: 0
            }} animate={{
              x: x,
              y: y,
              opacity: 1
            }} transition={{
              type: 'spring',
              damping: 20,
              delay: index * 0.1
            }}>
                    {/* Connection Line to Center */}
                    <motion.div className="absolute top-1/2 left-1/2 origin-left" style={{
                width: radius,
                height: 2,
                background: `linear-gradient(90deg, ${item.color}40, transparent)`,
                transform: `translate(-100%, -50%) rotate(${item.angle + 180}deg)`
              }} animate={{
                opacity: isActive || isHovered ? 1 : 0.3
              }} />

                    {/* Orbital Item */}
                    <motion.button className="relative group" onClick={() => handleItemClick(item.id)} onMouseEnter={() => setHoveredItem(item.id)} onMouseLeave={() => setHoveredItem(null)} whileHover={{
                scale: 1.2
              }} whileTap={{
                scale: 0.9
              }}>
                      {/* Glow Effect */}
                      <motion.div className="absolute inset-0 rounded-full blur-xl" style={{
                  backgroundColor: item.color
                }} animate={{
                  opacity: isActive ? 0.6 : isHovered ? 0.4 : 0,
                  scale: isActive ? 1.5 : 1
                }} />

                      {/* Icon Container */}
                      <motion.div className="relative w-16 h-16 rounded-full flex items-center justify-center border-2" style={{
                  backgroundColor: isActive ? item.color + '40' : '#0A0E1A',
                  borderColor: isActive ? item.color : item.color + '40'
                }} animate={{
                  rotate: isActive ? 360 : 0
                }} transition={{
                  duration: 0.5
                }}>
                        <Icon className="w-7 h-7" style={{
                    color: isActive ? item.color : '#9CA3AF'
                  }} />
                      </motion.div>

                      {/* Always Visible Label */}
                      <motion.div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: 0.3 + index * 0.1
                }}>
                        <div className="px-3 py-1 rounded-lg text-xs font-bold backdrop-blur-sm" style={{
                    backgroundColor: isActive || isHovered ? item.color + '30' : item.color + '15',
                    color: isActive || isHovered ? item.color : '#9CA3AF',
                    border: `1px solid ${item.color}${isActive || isHovered ? '50' : '20'}`
                  }}>
                          {item.label}
                        </div>
                      </motion.div>

                      {/* Active Indicator Particles */}
                      {isActive && <>
                          {[...Array(8)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 rounded-full" style={{
                    backgroundColor: item.color,
                    left: '50%',
                    top: '50%'
                  }} animate={{
                    x: [0, Math.cos(i * 45 * Math.PI / 180) * 30],
                    y: [0, Math.sin(i * 45 * Math.PI / 180) * 30],
                    opacity: [1, 0],
                    scale: [1, 0]
                  }} transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }} />)}
                        </>}
                    </motion.button>
                  </motion.div>;
          })}

              {/* User Profile - Bottom */}
              <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }}>
                <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-2xl backdrop-blur-xl">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">John Doe</p>
                    <p className="text-[10px] text-gray-400">Premium User</p>
                  </div>
                </div>
              </motion.div>

              {/* Logout - Top */}
              <motion.button className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-xl backdrop-blur-xl hover:bg-red-500/30 transition-all flex items-center gap-2" initial={{
            opacity: 0,
            y: -20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.6
          }} whileTap={{
            scale: 0.95
          }}>
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="text-xs font-bold text-red-400">Logout</span>
              </motion.button>
            </div>
          </motion.div>}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-cyan-500 rounded-full" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }} animate={{
        y: [0, -30, 0],
        opacity: [0.2, 0.8, 0.2]
      }} transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }} />)}

        <div className="max-w-6xl mx-auto p-8 pt-24 relative z-10">
          {/* Header with Holographic Effect */}
          <motion.div className="mb-8 relative" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2
        }}>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-8 h-8 text-cyan-400" />
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
                  Dashboard Overview
                </h1>
              </div>
              <p className="text-gray-400 ml-11">
                Real-time insights at your fingertips
              </p>
            </div>
          </motion.div>

          {/* Holographic Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
            const Icon = stat.icon;
            return <motion.div key={stat.label} className="relative group" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.3 + index * 0.1
            }} whileHover={{
              y: -5
            }}>
                  {/* Holographic Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative bg-gradient-to-br from-[#0A0E1A] to-[#0F1520] rounded-2xl p-6 border border-white/10 backdrop-blur-xl overflow-hidden">
                    {/* Animated Scan Line */}
                    <motion.div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" animate={{
                  y: [0, 100, 0]
                }} transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }} />

                    <div className="flex items-center justify-between mb-4">
                      <motion.div className="w-12 h-12 rounded-xl flex items-center justify-center relative" style={{
                    backgroundColor: `${stat.color}20`
                  }} whileHover={{
                    rotate: 360
                  }} transition={{
                    duration: 0.5
                  }}>
                        <Icon className="w-6 h-6" style={{
                      color: stat.color
                    }} />
                      </motion.div>
                      <span className="text-sm font-bold text-green-400">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                </motion.div>;
          })}
          </div>

          {/* Activity Feed with Neon Accents */}
          <motion.div className="relative" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.7
        }}>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl blur-3xl" />

            <div className="relative bg-gradient-to-br from-[#0A0E1A] to-[#0F1520] rounded-2xl p-6 border border-cyan-500/20 backdrop-blur-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-cyan-500 to-teal-500 rounded-full" />
                <h2 className="text-xl font-bold text-white">
                  Live Activity Stream
                </h2>
              </div>

              <div className="space-y-3">
                {recentActivity.map((activity, index) => <motion.div key={activity.id} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all group" initial={{
                opacity: 0,
                x: -20
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                delay: 0.8 + index * 0.1
              }}>
                    <motion.div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 relative" style={{
                  backgroundColor: `${activity.color}20`
                }} whileHover={{
                  scale: 1.1
                }}>
                      <motion.div className="w-2 h-2 rounded-full" style={{
                    backgroundColor: activity.color
                  }} animate={{
                    boxShadow: [`0 0 0px ${activity.color}`, `0 0 20px ${activity.color}`, `0 0 0px ${activity.color}`]
                  }} transition={{
                    duration: 2,
                    repeat: Infinity
                  }} />
                    </motion.div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {activity.type}
                      </p>
                      <p className="text-xs text-gray-400">
                        {activity.description}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 group-hover:text-cyan-400 transition-colors">
                      {activity.time}
                    </span>
                  </motion.div>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes gridMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(50px); }
        }
      `}</style>
    </div>;
}