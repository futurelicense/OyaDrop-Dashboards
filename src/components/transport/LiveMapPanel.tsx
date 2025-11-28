import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
const nearbyDrivers = [{
  id: 1,
  type: '🏍️',
  x: 45,
  y: 30,
  rating: 4.8,
  eta: '2 min'
}, {
  id: 2,
  type: '🚗',
  x: 65,
  y: 45,
  rating: 4.9,
  eta: '4 min'
}, {
  id: 3,
  type: '🏍️',
  x: 30,
  y: 60,
  rating: 4.7,
  eta: '3 min'
}, {
  id: 4,
  type: '🚗',
  x: 75,
  y: 25,
  rating: 4.6,
  eta: '5 min'
}, {
  id: 5,
  type: '🏍️',
  x: 55,
  y: 70,
  rating: 4.9,
  eta: '2 min'
}];
export function LiveMapPanel() {
  return <div className="px-4 py-4">
      <div className="relative h-80 bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-3xl overflow-hidden border border-cyan-500/20">
        {/* Map Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* User Location (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div className="relative w-6 h-6" animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            {/* Pulsing Ring */}
            <motion.div className="absolute inset-0 bg-cyan-500 rounded-full" animate={{
            scale: [1, 2, 1],
            opacity: [0.6, 0, 0.6]
          }} transition={{
            duration: 2,
            repeat: Infinity
          }} />
            {/* Center Dot */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full shadow-lg shadow-cyan-500/50 flex items-center justify-center">
              <Navigation className="w-3 h-3 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Nearby Drivers */}
        {nearbyDrivers.map((driver, index) => <motion.div key={driver.id} className="absolute z-10" style={{
        left: `${driver.x}%`,
        top: `${driver.y}%`
      }} initial={{
        opacity: 0,
        scale: 0
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        delay: index * 0.1
      }}>
            {/* Pulsing Ring */}
            <motion.div className="absolute -inset-2 bg-yellow-500 rounded-full" animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0, 0.4]
        }} transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.5
        }} />

            {/* Driver Icon */}
            <motion.div className="relative w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg shadow-lg cursor-pointer" whileHover={{
          scale: 1.2
        }} whileTap={{
          scale: 0.9
        }} animate={{
          y: [0, -2, 0]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          delay: index * 0.3
        }}>
              {driver.type}
            </motion.div>
          </motion.div>)}

        {/* Pickup Pin (Example) */}
        <motion.div className="absolute top-[25%] left-[40%] z-15" initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.5
      }}>
          <div className="relative">
            <MapPin className="w-8 h-8 text-green-400 fill-green-400/20" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
              Pickup
            </div>
          </div>
        </motion.div>

        {/* Destination Pin (Example) */}
        <motion.div className="absolute top-[70%] left-[65%] z-15" initial={{
        y: -20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.7
      }}>
          <div className="relative">
            <MapPin className="w-8 h-8 text-red-400 fill-red-400/20" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
              Destination
            </div>
          </div>
        </motion.div>

        {/* Map Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <motion.button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors" whileTap={{
          scale: 0.9
        }}>
            <span className="text-white text-lg">+</span>
          </motion.button>
          <motion.button className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-colors" whileTap={{
          scale: 0.9
        }}>
            <span className="text-white text-lg">−</span>
          </motion.button>
        </div>

        {/* Driver Count Badge */}
        <div className="absolute top-4 left-4 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 px-3 py-1.5 rounded-xl">
          <p className="text-xs font-bold text-cyan-400">
            {nearbyDrivers.length} drivers nearby
          </p>
        </div>
      </div>
    </div>;
}