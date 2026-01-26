import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  FileText,
  AlertTriangle,
  X,
  Clock,
  Shield,
  TrendingUp } from
'lucide-react';
interface DashboardCard {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  color: string;
  urgent?: boolean;
  badge?: string;
}
const cards: DashboardCard[] = [
{
  id: '1',
  title: 'Orders Today',
  value: 18,
  subtitle: '5 pending fulfillment',
  icon: ShoppingCart,
  color: '#00D9C0',
  urgent: true
},
{
  id: '2',
  title: 'Pending Prescriptions',
  value: 7,
  subtitle: 'Awaiting review',
  icon: FileText,
  color: '#B026FF',
  urgent: true,
  badge: 'New'
},
{
  id: '3',
  title: 'Low Stock Drugs',
  value: 8,
  subtitle: 'Need restocking',
  icon: AlertTriangle,
  color: '#FFB800',
  urgent: true
},
{
  id: '4',
  title: 'Out of Stock',
  value: 3,
  subtitle: 'Update immediately',
  icon: X,
  color: '#FF6B00',
  urgent: true
},
{
  id: '5',
  title: 'Expiring Medications',
  value: 12,
  subtitle: 'Within 30 days',
  icon: Clock,
  color: '#FF6B00',
  urgent: true,
  badge: 'Critical'
},
{
  id: '6',
  title: 'Controlled Drugs',
  value: 24,
  subtitle: 'In inventory',
  icon: Shield,
  color: '#10B981'
},
{
  id: '7',
  title: 'Sales Today',
  value: '₦145K',
  subtitle: '+12% vs yesterday',
  icon: TrendingUp,
  color: '#00D9C0'
}];

export function PharmacyDashboardCards() {
  return (
    <div className="p-4 space-y-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.button
            key={card.id}
            className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 text-left relative overflow-hidden"
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
            }}
            whileTap={{
              scale: 0.98
            }}>

            {/* Urgent Indicator */}
            {card.urgent &&
            <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            }

            {/* Badge */}
            {card.badge &&
            <div className="absolute top-2 right-8">
                <span className="text-[10px] font-bold px-2 py-1 bg-red-500 text-white rounded-full">
                  {card.badge}
                </span>
              </div>
            }

            <div className="flex items-center gap-4">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{
                  backgroundColor: card.color + '20'
                }}>

                <Icon
                  className="w-7 h-7"
                  style={{
                    color: card.color
                  }} />

              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-400 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-white mb-1">
                  {card.value}
                </p>
                <p className="text-xs text-gray-500">{card.subtitle}</p>
              </div>
            </div>
          </motion.button>);

      })}
    </div>);

}