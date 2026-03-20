import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  MapPin,
  DollarSign,
  Users,
  Bell,
  Package } from
'lucide-react';
const settingsSections = [
{
  title: 'Business Settings',
  items: [
  {
    id: 'hours',
    title: 'Operating Hours',
    subtitle: 'Set opening & closing times',
    icon: Clock,
    color: '#FFB800'
  },
  {
    id: 'radius',
    title: 'Service Radius',
    subtitle: 'Pickup & delivery area',
    icon: MapPin,
    color: '#B026FF'
  },
  {
    id: 'pricing',
    title: 'Pricing Menu',
    subtitle: 'Service rates & charges',
    icon: DollarSign,
    color: '#10B981'
  }]

},
{
  title: 'Operations',
  items: [
  {
    id: 'staff',
    title: 'Staff Accounts',
    subtitle: 'Manage team access',
    icon: Users,
    color: '#00F0FF'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Alerts & reminders',
    icon: Bell,
    color: '#FF6B00'
  },
  {
    id: 'services',
    title: 'Service Types',
    subtitle: 'Available laundry services',
    icon: Package,
    color: '#00D9C0'
  }]

}];

export function LaundrySettings() {
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