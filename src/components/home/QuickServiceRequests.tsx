import React from 'react';
import { motion } from 'framer-motion';
import {
  Pill,
  ShoppingCart,
  Sparkles,
  Car,
  UtensilsCrossed,
  Shirt } from
'lucide-react';
interface Service {
  id: string;
  name: string;
  icon: any;
  color: string;
  gradient: string;
  description: string;
}
const services: Service[] = [
{
  id: 'pharmacy',
  name: 'Pharmacy',
  icon: Pill,
  color: '#B026FF',
  gradient: 'from-purple-500 to-pink-500',
  description: 'Order medications'
},
{
  id: 'supermarket',
  name: 'Supermarket',
  icon: ShoppingCart,
  color: '#10B981',
  gradient: 'from-green-500 to-teal-500',
  description: 'Grocery shopping'
},
{
  id: 'beauty',
  name: 'Beauty',
  icon: Sparkles,
  color: '#FF6B00',
  gradient: 'from-orange-500 to-pink-500',
  description: 'Hair & beauty'
},
{
  id: 'transport',
  name: 'Ride',
  icon: Car,
  color: '#00D9C0',
  gradient: 'from-cyan-500 to-teal-500',
  description: 'Book a ride'
},
{
  id: 'fastfood',
  name: 'Fast Food',
  icon: UtensilsCrossed,
  color: '#EF4444',
  gradient: 'from-red-500 to-orange-500',
  description: 'Order food'
},
{
  id: 'laundry',
  name: 'Laundry',
  icon: Shirt,
  color: '#14B8A6',
  gradient: 'from-teal-500 to-green-500',
  description: 'Schedule pickup'
}];

interface QuickServiceRequestsProps {
  onServiceSelect: (serviceId: string) => void;
}
export function QuickServiceRequests({
  onServiceSelect
}: QuickServiceRequestsProps) {
  return (
    <div className="px-4 py-6">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-white">Quick Requests</h2>
        <p className="text-sm text-gray-400">What do you need today?</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.id}
              className="relative bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 text-left overflow-hidden group"
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
              whileHover={{
                y: -4,
                borderColor: service.color + '40'
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => onServiceSelect(service.id)}>

              {/* Gradient Overlay on Hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />


              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-3 relative z-10"
                style={{
                  backgroundColor: service.color + '20'
                }}>

                <Icon
                  className="w-6 h-6"
                  style={{
                    color: service.color
                  }} />

              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-sm font-bold text-white mb-1">
                  {service.name}
                </h3>
                <p className="text-xs text-gray-400">{service.description}</p>
              </div>

              {/* Arrow Indicator */}
              <motion.div
                className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                initial={{
                  x: -5
                }}
                whileHover={{
                  x: 0
                }}>

                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: service.color + '20'
                  }}>

                  <span
                    style={{
                      color: service.color
                    }}>

                    →
                  </span>
                </div>
              </motion.div>
            </motion.button>);

        })}
      </div>
    </div>);

}