import React from 'react';
import { motion } from 'framer-motion';
import {
  ChevronRight,
  Clock,
  MapPin,
  Bell,
  Users,
  CreditCard,
  Shield,
  FileText,
  Pill } from
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
  title: 'Pharmacy Information',
  items: [
  {
    id: 'license',
    title: 'License Details',
    subtitle: 'PCN number, certifications',
    icon: Shield,
    color: '#10B981'
  },
  {
    id: 'store-hours',
    title: 'Operating Hours',
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
    subtitle: 'OTC vs Prescription rules',
    icon: Bell,
    color: '#00D9C0'
  },
  {
    id: 'controlled-drugs',
    title: 'Controlled Drug Management',
    subtitle: 'Tracking & compliance',
    icon: Pill,
    color: '#FF6B00'
  },
  {
    id: 'prescription-policy',
    title: 'Prescription Policy',
    subtitle: 'Review & approval settings',
    icon: FileText,
    color: '#B026FF'
  },
  {
    id: 'staff',
    title: 'Staff Accounts',
    subtitle: 'Pharmacist & assistant access',
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

}];

export function PharmacySettings() {
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