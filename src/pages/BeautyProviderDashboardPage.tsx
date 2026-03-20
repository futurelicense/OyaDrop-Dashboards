import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Bell,
  Calendar,
  Clock,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Sparkles,
  CheckCircle,
  XCircle,
  Phone,
  MessageCircle,
  MapPin,
  Award,
  Settings,
  BarChart3,
  Edit,
  Save,
  X,
  Plus,
  ChevronRight,
  TrendingDown } from
'lucide-react';
interface Appointment {
  id: string;
  customerName: string;
  customerImage: string;
  services: string[];
  time: string;
  duration: string;
  price: number;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  isNew: boolean;
}
interface Client {
  id: string;
  name: string;
  image: string;
  totalVisits: number;
  totalSpent: number;
  lastVisit: string;
  favoriteService: string;
  phone: string;
}
const mockAppointments: Appointment[] = [
{
  id: '1',
  customerName: 'Sarah Johnson',
  customerImage:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  services: ['Braids', 'Hair Styling'],
  time: '10:00 AM',
  duration: '3 hours',
  price: 15000,
  status: 'pending',
  isNew: true
},
{
  id: '2',
  customerName: 'Amara Okafor',
  customerImage:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
  services: ['Manicure', 'Pedicure'],
  time: '2:00 PM',
  duration: '1.5 hours',
  price: 7500,
  status: 'confirmed',
  isNew: false
},
{
  id: '3',
  customerName: 'Chioma Eze',
  customerImage:
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop',
  services: ['Makeup'],
  time: '4:30 PM',
  duration: '1 hour',
  price: 8000,
  status: 'confirmed',
  isNew: false
}];

const mockClients: Client[] = [
{
  id: '1',
  name: 'Sarah Johnson',
  image:
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  totalVisits: 12,
  totalSpent: 145000,
  lastVisit: '2 days ago',
  favoriteService: 'Braids',
  phone: '+234 801 234 5678'
},
{
  id: '2',
  name: 'Amara Okafor',
  image:
  'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop',
  totalVisits: 8,
  totalSpent: 89000,
  lastVisit: '1 week ago',
  favoriteService: 'Manicure',
  phone: '+234 802 345 6789'
},
{
  id: '3',
  name: 'Chioma Eze',
  image:
  'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop',
  totalVisits: 15,
  totalSpent: 198000,
  lastVisit: 'Today',
  favoriteService: 'Makeup',
  phone: '+234 803 456 7890'
},
{
  id: '4',
  name: 'Blessing Adeyemi',
  image:
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
  totalVisits: 6,
  totalSpent: 67000,
  lastVisit: '3 days ago',
  favoriteService: 'Hair Styling',
  phone: '+234 804 567 8901'
}];

const statusConfig = {
  pending: {
    color: '#FFB800',
    bg: '#FFB80020',
    label: 'Pending'
  },
  confirmed: {
    color: '#00D9C0',
    bg: '#00D9C020',
    label: 'Confirmed'
  },
  'in-progress': {
    color: '#B026FF',
    bg: '#B026FF20',
    label: 'In Progress'
  },
  completed: {
    color: '#10B981',
    bg: '#10B98120',
    label: 'Completed'
  },
  cancelled: {
    color: '#EF4444',
    bg: '#EF444420',
    label: 'Cancelled'
  }
};
type ViewType = 'bookings' | 'clients' | 'analytics' | 'settings';
interface BeautyProviderDashboardPageProps {
  onMenuClick: () => void;
}
export function BeautyProviderDashboardPage({
  onMenuClick
}: BeautyProviderDashboardPageProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [selectedTab, setSelectedTab] = useState<
    'today' | 'upcoming' | 'history'>(
    'today');
  const [activeView, setActiveView] = useState<ViewType>('bookings');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="bg-[#0A0E1A] border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <motion.button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              whileTap={{
                scale: 0.95
              }}
              onClick={onMenuClick}>
              
              <Menu className="w-6 h-6 text-white" />
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-white">Glam Studio</h1>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Award className="w-3 h-3" />
                  <span>Verified Provider</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
              whileTap={{
                scale: 0.95
              }}>
              
              <Bell className="w-6 h-6 text-white" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full" />
            </motion.button>
          </div>
        </div>

        {/* Online/Offline Toggle */}
        <div className="px-4 pb-3">
          <motion.button
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${isOnline ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-2 border-orange-500' : 'bg-[#131B2E] border-2 border-white/10'}`}
            onClick={() => setIsOnline(!isOnline)}
            whileTap={{
              scale: 0.98
            }}>
            
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${isOnline ? 'bg-orange-500' : 'bg-gray-500'}`} />
              
              <div className="text-left">
                <p className="text-sm font-bold text-white">
                  {isOnline ? 'Accepting Bookings' : 'Not Accepting Bookings'}
                </p>
                <p className="text-xs text-gray-400">
                  {isOnline ?
                  'You are visible to customers' :
                  'You are hidden from search'}
                </p>
              </div>
            </div>

            <motion.div
              className={`w-14 h-8 rounded-full p-1 transition-colors ${isOnline ? 'bg-orange-500' : 'bg-gray-600'}`}
              animate={{
                backgroundColor: isOnline ? '#FF6B00' : '#4B5563'
              }}>
              
              <motion.div
                className="w-6 h-6 bg-white rounded-full"
                animate={{
                  x: isOnline ? 24 : 0
                }}
                transition={{
                  type: 'spring',
                  damping: 20,
                  stiffness: 300
                }} />
              
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      {activeView === 'bookings' &&
      <div className="p-4 grid grid-cols-2 gap-3">
          <motion.div
          className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1
          }}>
          
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-orange-400" />
              </div>
              <span className="text-xs text-gray-400">Today</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">8</p>
            <p className="text-xs text-gray-400">Appointments</p>
          </motion.div>

          <motion.div
          className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.15
          }}>
          
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-green-400" />
              </div>
              <span className="text-xs text-gray-400">Revenue</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">₦45k</p>
            <p className="text-xs text-green-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% vs yesterday
            </p>
          </motion.div>

          <motion.div
          className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}>
          
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="text-xs text-gray-400">Rating</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">4.9</p>
            <p className="text-xs text-gray-400">234 reviews</p>
          </motion.div>

          <motion.div
          className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.25
          }}>
          
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              <span className="text-xs text-gray-400">Clients</span>
            </div>
            <p className="text-2xl font-bold text-white mb-1">156</p>
            <p className="text-xs text-purple-400">+8 this week</p>
          </motion.div>
        </div>
      }

      {/* Quick Actions */}
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-xl p-3 border transition-all text-center ${activeView === 'analytics' ? 'border-orange-500' : 'border-white/10'}`}
            onClick={() => setActiveView('analytics')}
            whileTap={{
              scale: 0.95
            }}>
            
            <BarChart3
              className={`w-5 h-5 mx-auto mb-1 ${activeView === 'analytics' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <p
              className={`text-xs font-semibold ${activeView === 'analytics' ? 'text-white' : 'text-gray-400'}`}>
              
              Analytics
            </p>
          </motion.button>

          <motion.button
            className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-xl p-3 border border-white/10 text-center"
            onClick={() => setShowScheduleModal(true)}
            whileTap={{
              scale: 0.95
            }}>
            
            <Calendar className="w-5 h-5 text-orange-400 mx-auto mb-1" />
            <p className="text-xs font-semibold text-white">Schedule</p>
          </motion.button>

          <motion.button
            className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-xl p-3 border transition-all text-center ${activeView === 'settings' ? 'border-orange-500' : 'border-white/10'}`}
            onClick={() => setActiveView('settings')}
            whileTap={{
              scale: 0.95
            }}>
            
            <Settings
              className={`w-5 h-5 mx-auto mb-1 ${activeView === 'settings' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <p
              className={`text-xs font-semibold ${activeView === 'settings' ? 'text-white' : 'text-gray-400'}`}>
              
              Settings
            </p>
          </motion.button>

          <motion.button
            className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-xl p-3 border transition-all text-center ${activeView === 'clients' ? 'border-orange-500' : 'border-white/10'}`}
            onClick={() => setActiveView('clients')}
            whileTap={{
              scale: 0.95
            }}>
            
            <Users
              className={`w-5 h-5 mx-auto mb-1 ${activeView === 'clients' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <p
              className={`text-xs font-semibold ${activeView === 'clients' ? 'text-white' : 'text-gray-400'}`}>
              
              Clients
            </p>
          </motion.button>
        </div>
      </div>

      {/* Content Area */}
      <AnimatePresence mode="wait">
        {activeView === 'bookings' &&
        <motion.div
          key="bookings"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}>
          
            {/* Tabs */}
            <div className="px-4 py-3 border-b border-white/10">
              <div className="flex gap-2">
                {(['today', 'upcoming', 'history'] as const).map((tab) =>
              <motion.button
                key={tab}
                className={`flex-1 py-2 px-4 rounded-xl font-semibold text-sm transition-all ${selectedTab === tab ? 'bg-orange-500 text-white' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`}
                onClick={() => setSelectedTab(tab)}
                whileTap={{
                  scale: 0.95
                }}>
                
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </motion.button>
              )}
              </div>
            </div>

            {/* Appointments List */}
            <div className="p-4 pb-24 space-y-3">
              {mockAppointments.map((appointment, index) => {
              const status = statusConfig[appointment.status];
              return (
                <motion.div
                  key={appointment.id}
                  className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}>
                  
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                          src={appointment.customerImage}
                          alt={appointment.customerName}
                          className="w-12 h-12 rounded-xl object-cover" />
                        
                          {appointment.isNew &&
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-[8px] font-bold">
                                N
                              </span>
                            </div>
                        }
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white mb-1">
                            {appointment.customerName}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            <span>{appointment.time}</span>
                            <span>•</span>
                            <span>{appointment.duration}</span>
                          </div>
                        </div>
                      </div>

                      <div
                      className="text-xs font-bold px-2 py-1 rounded-lg"
                      style={{
                        backgroundColor: status.bg,
                        color: status.color
                      }}>
                      
                        {status.label}
                      </div>
                    </div>

                    {/* Services */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {appointment.services.map((service) =>
                      <span
                        key={service}
                        className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-lg">
                        
                            {service}
                          </span>
                      )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-orange-400">
                        ₦{appointment.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {appointment.status === 'pending' &&
                    <>
                          <motion.button
                        className="flex-1 py-2 bg-green-500/20 border border-green-500/30 rounded-xl text-green-400 font-semibold text-sm flex items-center justify-center gap-2"
                        whileTap={{
                          scale: 0.95
                        }}>
                        
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </motion.button>
                          <motion.button
                        className="flex-1 py-2 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-semibold text-sm flex items-center justify-center gap-2"
                        whileTap={{
                          scale: 0.95
                        }}>
                        
                            <XCircle className="w-4 h-4" />
                            Decline
                          </motion.button>
                        </>
                    }
                      {appointment.status === 'confirmed' &&
                    <>
                          <motion.button
                        className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                        whileTap={{
                          scale: 0.95
                        }}>
                        
                            <Phone className="w-4 h-4" />
                            Call
                          </motion.button>
                          <motion.button
                        className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                        whileTap={{
                          scale: 0.95
                        }}>
                        
                            <MessageCircle className="w-4 h-4" />
                            Message
                          </motion.button>
                          <motion.button
                        className="flex-1 py-2 bg-orange-500/20 border border-orange-500/30 rounded-xl text-orange-400 font-semibold text-sm flex items-center justify-center gap-2"
                        whileTap={{
                          scale: 0.95
                        }}>
                        
                            <MapPin className="w-4 h-4" />
                            Directions
                          </motion.button>
                        </>
                    }
                    </div>
                  </motion.div>);

            })}
            </div>
          </motion.div>
        }

        {activeView === 'analytics' &&
        <motion.div
          key="analytics"
          className="p-4 pb-24 space-y-4"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}>
          
            <h2 className="text-lg font-bold text-white mb-4">
              Analytics Overview
            </h2>

            {/* Revenue Chart */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-4">
                Revenue Trend
              </h3>
              <div className="h-48 flex items-end gap-2">
                {[45, 62, 58, 71, 68, 82, 75].map((value, index) =>
              <motion.div
                key={index}
                className="flex-1 bg-gradient-to-t from-orange-500 to-pink-500 rounded-t-lg"
                initial={{
                  height: 0
                }}
                animate={{
                  height: `${value}%`
                }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  damping: 20
                }} />

              )}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>

            {/* Popular Services */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
              <h3 className="text-sm font-bold text-white mb-4">
                Popular Services
              </h3>
              <div className="space-y-3">
                {[
              {
                name: 'Braids',
                bookings: 45,
                revenue: 180000,
                trend: 'up'
              },
              {
                name: 'Makeup',
                bookings: 38,
                revenue: 152000,
                trend: 'up'
              },
              {
                name: 'Manicure',
                bookings: 32,
                revenue: 112000,
                trend: 'down'
              },
              {
                name: 'Hair Styling',
                bookings: 28,
                revenue: 98000,
                trend: 'up'
              }].
              map((service, index) =>
              <motion.div
                key={service.name}
                className="flex items-center justify-between"
                initial={{
                  opacity: 0,
                  x: -20
                }}
                animate={{
                  opacity: 1,
                  x: 0
                }}
                transition={{
                  delay: index * 0.1
                }}>
                
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {service.bookings} bookings
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-orange-400">
                        ₦{(service.revenue / 1000).toFixed(0)}k
                      </p>
                      <div className="flex items-center gap-1 text-xs">
                        {service.trend === 'up' ?
                    <TrendingUp className="w-3 h-3 text-green-400" /> :

                    <TrendingDown className="w-3 h-3 text-red-400" />
                    }
                        <span
                      className={
                      service.trend === 'up' ?
                      'text-green-400' :
                      'text-red-400'
                      }>
                      
                          {service.trend === 'up' ? '+12%' : '-5%'}
                        </span>
                      </div>
                    </div>
                  </motion.div>
              )}
              </div>
            </div>
          </motion.div>
        }

        {activeView === 'clients' &&
        <motion.div
          key="clients"
          className="p-4 pb-24 space-y-3"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}>
          
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Clients</h2>
              <motion.button
              className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-xl"
              whileTap={{
                scale: 0.95
              }}>
              
                <Plus className="w-5 h-5 text-orange-400" />
              </motion.button>
            </div>

            {mockClients.map((client, index) =>
          <motion.div
            key={client.id}
            className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}>
            
                <div className="flex items-center gap-3 mb-3">
                  <img
                src={client.image}
                alt={client.name}
                className="w-12 h-12 rounded-xl object-cover" />
              
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-white mb-1">
                      {client.name}
                    </h3>
                    <p className="text-xs text-gray-400">
                      Last visit: {client.lastVisit}
                    </p>
                  </div>
                  <motion.button
                className="p-2 bg-white/5 rounded-xl"
                whileTap={{
                  scale: 0.95
                }}>
                
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </motion.button>
                </div>

                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="bg-[#0A0E1A]/50 rounded-xl p-2 text-center">
                    <p className="text-xs text-gray-400 mb-1">Visits</p>
                    <p className="text-sm font-bold text-white">
                      {client.totalVisits}
                    </p>
                  </div>
                  <div className="bg-[#0A0E1A]/50 rounded-xl p-2 text-center">
                    <p className="text-xs text-gray-400 mb-1">Spent</p>
                    <p className="text-sm font-bold text-orange-400">
                      ₦{(client.totalSpent / 1000).toFixed(0)}k
                    </p>
                  </div>
                  <div className="bg-[#0A0E1A]/50 rounded-xl p-2 text-center">
                    <p className="text-xs text-gray-400 mb-1">Favorite</p>
                    <p className="text-xs font-bold text-white">
                      {client.favoriteService}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <motion.button
                className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                whileTap={{
                  scale: 0.95
                }}>
                
                    <Phone className="w-4 h-4" />
                    Call
                  </motion.button>
                  <motion.button
                className="flex-1 py-2 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2"
                whileTap={{
                  scale: 0.95
                }}>
                
                    <MessageCircle className="w-4 h-4" />
                    Message
                  </motion.button>
                </div>
              </motion.div>
          )}
          </motion.div>
        }

        {activeView === 'settings' &&
        <motion.div
          key="settings"
          className="p-4 pb-24 space-y-3"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -20
          }}
          transition={{
            duration: 0.3
          }}>
          
            <h2 className="text-lg font-bold text-white mb-4">Settings</h2>

            {/* Business Info */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  Business Information
                </h3>
                <motion.button
                className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-xl"
                whileTap={{
                  scale: 0.95
                }}>
                
                  <Edit className="w-4 h-4 text-orange-400" />
                </motion.button>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Business Name</p>
                  <p className="text-sm font-semibold text-white">
                    Glam Studio
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Address</p>
                  <p className="text-sm font-semibold text-white">
                    123 Victoria Island, Lagos
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Phone</p>
                  <p className="text-sm font-semibold text-white">
                    +234 801 234 5678
                  </p>
                </div>
              </div>
            </div>

            {/* Services & Pricing */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">
                  Services & Pricing
                </h3>
                <motion.button
                className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-xl"
                whileTap={{
                  scale: 0.95
                }}>
                
                  <Plus className="w-4 h-4 text-orange-400" />
                </motion.button>
              </div>
              <div className="space-y-2">
                {[
              {
                name: 'Braids',
                price: 8000,
                duration: '3 hrs'
              },
              {
                name: 'Makeup',
                price: 8000,
                duration: '1 hr'
              },
              {
                name: 'Manicure',
                price: 3500,
                duration: '45 min'
              }].
              map((service) =>
              <div
                key={service.name}
                className="flex items-center justify-between p-3 bg-[#0A0E1A]/50 rounded-xl">
                
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {service.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {service.duration}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-orange-400">
                      ₦{service.price.toLocaleString()}
                    </p>
                  </div>
              )}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white">Working Hours</h3>
                <motion.button
                className="p-2 bg-orange-500/20 border border-orange-500/30 rounded-xl"
                whileTap={{
                  scale: 0.95
                }}>
                
                  <Edit className="w-4 h-4 text-orange-400" />
                </motion.button>
              </div>
              <div className="space-y-2">
                {[
              {
                day: 'Monday - Friday',
                hours: '9:00 AM - 7:00 PM'
              },
              {
                day: 'Saturday',
                hours: '10:00 AM - 6:00 PM'
              },
              {
                day: 'Sunday',
                hours: 'Closed'
              }].
              map((schedule) =>
              <div
                key={schedule.day}
                className="flex items-center justify-between p-3 bg-[#0A0E1A]/50 rounded-xl">
                
                    <p className="text-sm font-semibold text-white">
                      {schedule.day}
                    </p>
                    <p className="text-sm text-gray-400">{schedule.hours}</p>
                  </div>
              )}
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      {/* Schedule Modal */}
      <AnimatePresence>
        {showScheduleModal &&
        <>
            <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            onClick={() => setShowScheduleModal(false)} />
          
            <motion.div
            className="fixed inset-x-0 bottom-0 z-50 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[70vh] flex flex-col"
            initial={{
              y: '100%'
            }}
            animate={{
              y: 0
            }}
            exit={{
              y: '100%'
            }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}>
            
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">
                  Weekly Schedule
                </h2>
                <motion.button
                className="p-2 rounded-xl hover:bg-white/5"
                onClick={() => setShowScheduleModal(false)}
                whileTap={{
                  scale: 0.95
                }}>
                
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-4">
                  {[
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday'].
                map((day, index) =>
                <motion.div
                  key={day}
                  className="bg-gradient-to-br from-[#0F1520] to-[#0A0E1A] rounded-xl p-4 border border-white/10"
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: index * 0.05
                  }}>
                  
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-white mb-1">
                            {day}
                          </p>
                          <p className="text-xs text-gray-400">
                            {day === 'Sunday' ? 'Closed' : '9:00 AM - 7:00 PM'}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-orange-400 font-semibold">
                            {day === 'Sunday' ?
                        '0' :
                        Math.floor(Math.random() * 8) + 3}{' '}
                            bookings
                          </span>
                        </div>
                      </div>
                    </motion.div>
                )}
                </div>
              </div>
            </motion.div>
          </>
        }
      </AnimatePresence>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0A0E1A] border-t border-white/10 px-4 py-3">
        <div className="grid grid-cols-4 gap-2">
          <motion.button
            className="flex flex-col items-center gap-1 py-2"
            onClick={() => setActiveView('bookings')}
            whileTap={{
              scale: 0.95
            }}>
            
            <Calendar
              className={`w-5 h-5 ${activeView === 'bookings' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <span
              className={`text-xs font-semibold ${activeView === 'bookings' ? 'text-orange-400' : 'text-gray-400'}`}>
              
              Bookings
            </span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 py-2"
            onClick={() => setActiveView('clients')}
            whileTap={{
              scale: 0.95
            }}>
            
            <Users
              className={`w-5 h-5 ${activeView === 'clients' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <span
              className={`text-xs font-semibold ${activeView === 'clients' ? 'text-orange-400' : 'text-gray-400'}`}>
              
              Clients
            </span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 py-2"
            onClick={() => setActiveView('analytics')}
            whileTap={{
              scale: 0.95
            }}>
            
            <BarChart3
              className={`w-5 h-5 ${activeView === 'analytics' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <span
              className={`text-xs font-semibold ${activeView === 'analytics' ? 'text-orange-400' : 'text-gray-400'}`}>
              
              Analytics
            </span>
          </motion.button>

          <motion.button
            className="flex flex-col items-center gap-1 py-2"
            onClick={() => setActiveView('settings')}
            whileTap={{
              scale: 0.95
            }}>
            
            <Settings
              className={`w-5 h-5 ${activeView === 'settings' ? 'text-orange-400' : 'text-gray-400'}`} />
            
            <span
              className={`text-xs font-semibold ${activeView === 'settings' ? 'text-orange-400' : 'text-gray-400'}`}>
              
              Settings
            </span>
          </motion.button>
        </div>
      </div>
    </div>);

}