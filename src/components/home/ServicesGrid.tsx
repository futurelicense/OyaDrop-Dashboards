import React from 'react';
import { motion } from 'framer-motion';
import {
  Pill,
  ShoppingCart,
  Sparkles,
  Car,
  UtensilsCrossed,
  Shirt,
  Building } from
'lucide-react';
interface ServicesGridProps {
  onNavigate?: (view: string) => void;
}
const services = [
{
  id: 'pharmacy-customer',
  name: 'OyaMeds',
  icon: Pill,
  color: '#B026FF',
  gradient: 'from-purple-500 to-pink-500'
},
{
  id: 'supermarket-customer',
  name: 'OyaBuy',
  icon: ShoppingCart,
  color: '#10B981',
  gradient: 'from-green-500 to-teal-500'
},
{
  id: 'beauty-customer',
  name: 'OyaGlow',
  icon: Sparkles,
  color: '#FF6B00',
  gradient: 'from-orange-500 to-pink-500'
},
{
  id: 'transport',
  name: 'OyaRide',
  icon: Car,
  color: '#00D9C0',
  gradient: 'from-cyan-500 to-teal-500'
},
{
  id: 'fastfood',
  name: 'OyaEat',
  icon: UtensilsCrossed,
  color: '#EF4444',
  gradient: 'from-red-500 to-orange-500'
},
{
  id: 'laundry-customer',
  name: 'OyaWash',
  icon: Shirt,
  color: '#14B8A6',
  gradient: 'from-teal-500 to-green-500'
},
{
  id: 'accommodation',
  name: 'OyaStay',
  icon: Building,
  color: '#A855F7',
  gradient: 'from-purple-500 to-indigo-500'
}];

export function ServicesGrid({ onNavigate }: ServicesGridProps) {
  const handleServiceClick = (serviceId: string) => {
    if (onNavigate) {
      onNavigate(serviceId);
    }
  };
  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Services</h2>
          <p className="text-sm text-gray-400">
            Everything you need, on demand
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.button
              key={service.id}
              className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-gradient-to-br from-[#131B2E] to-[#0F1520] border border-white/10 hover:border-white/20 transition-all"
              initial={{
                opacity: 0,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                scale: 1
              }}
              transition={{
                delay: index * 0.05
              }}
              onClick={() => handleServiceClick(service.id)}
              whileTap={{
                scale: 0.95
              }}>
              
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: `${service.color}20`
                }}>
                
                <Icon
                  className="w-6 h-6"
                  style={{
                    color: service.color
                  }} />
                
              </div>
              <span className="text-xs font-semibold text-white text-center leading-tight">
                {service.name}
              </span>
            </motion.button>);

        })}
      </div>
    </div>);

}