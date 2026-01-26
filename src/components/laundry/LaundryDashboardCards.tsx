import React from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Droplets,
  Wind,
  Package,
  Truck,
  CheckCircle } from
'lucide-react';
interface DashboardCard {
  id: string;
  title: string;
  value: number;
  subtitle: string;
  icon: any;
  color: string;
  urgent?: boolean;
}
const cards: DashboardCard[] = [
{
  id: '1',
  title: 'New Orders',
  value: 8,
  subtitle: 'Awaiting pickup',
  icon: ShoppingBag,
  color: '#00D9C0',
  urgent: true
},
{
  id: '2',
  title: 'In Washing',
  value: 15,
  subtitle: '3 batches running',
  icon: Droplets,
  color: '#00F0FF'
},
{
  id: '3',
  title: 'In Ironing',
  value: 12,
  subtitle: '2 staff working',
  icon: Wind,
  color: '#FFB800'
},
{
  id: '4',
  title: 'Ready for Pickup',
  value: 6,
  subtitle: 'Customer collection',
  icon: Package,
  color: '#B026FF',
  urgent: true
},
{
  id: '5',
  title: 'Ready for Delivery',
  value: 9,
  subtitle: 'Assign riders',
  icon: Truck,
  color: '#FF6B00',
  urgent: true
},
{
  id: '6',
  title: 'Completed Today',
  value: 24,
  subtitle: '₦48,000 revenue',
  icon: CheckCircle,
  color: '#10B981'
}];

export function LaundryDashboardCards() {
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

            {card.urgent &&
            <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
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