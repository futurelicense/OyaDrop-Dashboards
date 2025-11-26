import React from 'react';
import { motion } from 'framer-motion';
const services = [{
  id: 'go',
  name: 'OyaGo',
  icon: "/oyadrop_app_000.png",
  bgColor: 'bg-cyan-400',
  badge: 'NEW',
  badgeColor: 'bg-yellow-400'
}, {
  id: 'eat',
  name: 'OyaEat',
  icon: "/01.png",
  bgColor: 'bg-orange-400',
  badge: null,
  badgeColor: ''
}, {
  id: 'buy',
  name: 'OyaBuy',
  icon: "/06.png",
  bgColor: 'bg-blue-500',
  badge: 'SALE',
  badgeColor: 'bg-red-500'
}, {
  id: 'move',
  name: 'OyaMove',
  icon: "/03.png",
  bgColor: 'bg-purple-500',
  badge: 'NEW',
  badgeColor: 'bg-yellow-400'
}, {
  id: 'stay',
  name: 'OyaStay',
  icon: "/04.png",
  bgColor: 'bg-pink-400',
  badge: null,
  badgeColor: ''
}, {
  id: 'explore',
  name: 'Explore',
  icon: null,
  bgColor: 'bg-gray-700',
  badge: null,
  badgeColor: ''
}];
export function ServicesGrid() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-lg font-bold text-white mb-4" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        OyaDrop Services
      </motion.h2>

      <div className="grid grid-cols-3 gap-4">
        {services.map((service, index) => {
        return <motion.button key={service.id} className={`relative aspect-square rounded-2xl overflow-hidden ${service.bgColor} flex flex-col items-center justify-center p-4`} initial={{
          opacity: 0,
          scale: 0.9
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          delay: 0.1 + index * 0.08
        }} whileTap={{
          scale: 0.95
        }}>
              {service.icon ? <motion.img src={service.icon} alt={service.name} className="w-full h-full object-contain mb-2" initial={{
            y: 10,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2 + index * 0.08
          }} /> : <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center mb-2">
                  <span className="text-2xl text-gray-400">⋯</span>
                </div>}

              {service.badge && <motion.div className={`absolute top-2 right-2 ${service.badgeColor} px-2 py-0.5 rounded-full shadow-lg`} initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} transition={{
            delay: 0.3 + index * 0.08,
            type: 'spring'
          }}>
                  <span className="text-[10px] font-bold text-white">
                    {service.badge}
                  </span>
                </motion.div>}

              <div className="absolute bottom-3 left-0 right-0">
                <p className="text-sm font-bold text-white text-center">
                  {service.name}
                </p>
              </div>
            </motion.button>;
      })}
      </div>
    </div>;
}