import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  MapPin,
  Bell,
  Users,
  CreditCard,
  Store,
  Shield } from
'lucide-react';
interface SettingItem {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  color: string;
}
const settingsSections = [
{
  title: 'Store Information',
  items: [
  {
    id: 'store-profile',
    title: 'Store Profile',
    subtitle: 'Name, logo, description',
    icon: Store,
    color: '#00D9C0'
  },
  {
    id: 'store-hours',
    title: 'Store Hours',
    subtitle: 'Opening & closing times',
    icon: Clock,
    color: '#FFB800'
  },
  {
    id: 'delivery-radius',
    title: 'Delivery Radius',
    subtitle: 'Service area settings',
    icon: MapPin,
    color: '#B026FF'
  }]

},
{
  title: 'Operations',
  items: [
  {
    id: 'auto-accept',
    title: 'Auto-Accept Orders',
    subtitle: 'Automatically accept new orders',
    icon: Bell,
    color: '#10B981'
  },
  {
    id: 'notifications',
    title: 'Notification Preferences',
    subtitle: 'Manage alerts & sounds',
    icon: Bell,
    color: '#FF6B00'
  },
  {
    id: 'staff',
    title: 'Staff Accounts',
    subtitle: 'Manage team access',
    icon: Users,
    color: '#00F0FF'
  }]

},
{
  title: 'Financial',
  items: [
  {
    id: 'payments',
    title: 'Payments & Settlements',
    subtitle: 'Bank details & payouts',
    icon: CreditCard,
    color: '#10B981'
  }]

},
{
  title: 'Account',
  items: [
  {
    id: 'security',
    title: 'Security & Privacy',
    subtitle: 'Password, 2FA, data',
    icon: Shield,
    color: '#FF6B00'
  }]

}];

type View = 'main' | 'store-hours' | 'auto-accept';
export function StoreSettings() {
  const [view, setView] = useState<View>('main');
  const [autoAccept, setAutoAccept] = useState(true);
  if (view === 'store-hours') {
    return (
      <div className="flex flex-col h-full bg-[#0A0E1A]">
        <div className="p-4 bg-[#131B2E] border-b border-white/10">
          <motion.button
            className="flex items-center gap-2 text-cyan-400 font-semibold"
            onClick={() => setView('main')}
            whileTap={{
              scale: 0.95
            }}>

            ← Back
          </motion.button>
          <h2 className="text-xl font-bold text-white mt-2">Store Hours</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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

              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-bold text-white">{day}</span>
                <motion.button
                className="text-xs font-semibold text-cyan-400"
                whileTap={{
                  scale: 0.95
                }}>

                  Edit
                </motion.button>
              </div>
              <div className="flex gap-3">
                <div className="flex-1 bg-[#0A0E1A] rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Open</p>
                  <p className="text-sm font-bold text-white">8:00 AM</p>
                </div>
                <div className="flex-1 bg-[#0A0E1A] rounded-xl p-3 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Close</p>
                  <p className="text-sm font-bold text-white">10:00 PM</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>);

  }
  if (view === 'auto-accept') {
    return (
      <div className="flex flex-col h-full bg-[#0A0E1A]">
        <div className="p-4 bg-[#131B2E] border-b border-white/10">
          <motion.button
            className="flex items-center gap-2 text-cyan-400 font-semibold"
            onClick={() => setView('main')}
            whileTap={{
              scale: 0.95
            }}>

            ← Back
          </motion.button>
          <h2 className="text-xl font-bold text-white mt-2">
            Auto-Accept Orders
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <motion.div
            className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-6 border border-white/10"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}>

            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  Enable Auto-Accept
                </h3>
                <p className="text-sm text-gray-400">
                  Automatically accept all incoming orders
                </p>
              </div>
              <motion.button
                className={`w-14 h-8 rounded-full p-1 transition-colors ${autoAccept ? 'bg-green-500' : 'bg-gray-600'}`}
                onClick={() => setAutoAccept(!autoAccept)}
                whileTap={{
                  scale: 0.95
                }}>

                <motion.div
                  className="w-6 h-6 bg-white rounded-full"
                  animate={{
                    x: autoAccept ? 24 : 0
                  }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300
                  }} />

              </motion.button>
            </div>
          </motion.div>

          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-sm text-cyan-400">
              <strong>Note:</strong> When enabled, orders will be automatically
              accepted and added to your queue. You can still manually reject
              orders if needed.
            </p>
          </div>
        </div>
      </div>);

  }
  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      <div className="flex-1 overflow-y-auto p-4">
        {settingsSections.map((section, sectionIndex) =>
        <div key={section.title} className="mb-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-2">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 text-left"
                  initial={{
                    opacity: 0,
                    x: -20
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: sectionIndex * 0.1 + itemIndex * 0.05
                  }}
                  whileTap={{
                    scale: 0.98
                  }}
                  onClick={() => {
                    if (item.id === 'store-hours') setView('store-hours');
                    if (item.id === 'auto-accept') setView('auto-accept');
                  }}>

                    <div className="flex items-center gap-3">
                      <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: item.color + '20'
                      }}>

                        <Icon
                        className="w-6 h-6"
                        style={{
                          color: item.color
                        }} />

                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-white mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </motion.button>);

            })}
            </div>
          </div>
        )}
      </div>
    </div>);

}