import React from 'react';
import { motion } from 'framer-motion';
import { StoreIcon, ShoppingBagIcon } from 'lucide-react';
const features = [{
  id: 'kiosk',
  title: 'Be a Kiosk Owner',
  description: 'Own and run your own kiosk and start earning instantly',
  icon: StoreIcon,
  gradient: 'from-teal-500 to-cyan-500',
  image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop'
}, {
  id: 'marketplace',
  title: 'Access Marketplace',
  description: 'Browse and shop from verified sellers and stores',
  icon: ShoppingBagIcon,
  gradient: 'from-emerald-500 to-teal-500',
  image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop'
}];
export function FeatureCards() {
  return <div className="px-5 py-6">
      <div className="grid grid-cols-2 gap-3">
        {features.map((feature, index) => {
        const Icon = feature.icon;
        return <motion.button key={feature.id} className="relative bg-gray-900 rounded-2xl overflow-hidden text-left group" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.4 + index * 0.1
        }} whileTap={{
          scale: 0.95
        }}>
              <div className="relative h-24 overflow-hidden">
                <img src={feature.image} alt={feature.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
              </div>

              <div className="p-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-2`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <h3 className="text-sm font-bold text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.button>;
      })}
      </div>
    </div>;
}