import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, MapPin, RefreshCw } from 'lucide-react';
const vehicleCategories = [{
  id: 'bike',
  name: 'Bike',
  icon: '🏍️',
  fare: '₦800',
  eta: '5 min',
  color: '#FFB800'
}, {
  id: 'mini',
  name: 'Mini',
  icon: '🚗',
  fare: '₦1,200',
  eta: '7 min',
  color: '#00D9C0'
}, {
  id: 'sedan',
  name: 'Sedan',
  icon: '🚙',
  fare: '₦1,800',
  eta: '8 min',
  color: '#00F0FF'
}, {
  id: 'xl',
  name: 'XL',
  icon: '🚐',
  fare: '₦2,500',
  eta: '10 min',
  color: '#B026FF'
}];
export function RegularPricingPanel() {
  return <div className="px-4 py-4">
      {/* Fare Estimate Card */}
      <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-cyan-500/30 mb-4" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.4
    }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white">Estimated Fare</h3>
          <motion.button className="p-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors" whileTap={{
          scale: 0.9
        }}>
            <RefreshCw className="w-4 h-4 text-cyan-400" />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Distance</p>
            <p className="text-lg font-bold text-white">8.5 km</p>
          </div>

          <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Duration</p>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-cyan-400" />
              <p className="text-lg font-bold text-white">15 min</p>
            </div>
          </div>

          <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Surge</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              <p className="text-lg font-bold text-orange-400">1.2x</p>
            </div>
          </div>
        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3">
          <p className="text-xs text-cyan-400 mb-1">Price Range</p>
          <p className="text-2xl font-bold text-white">₦800 - ₦2,500</p>
        </div>
      </motion.div>

      {/* Vehicle Categories */}
      <div>
        <h3 className="text-sm font-bold text-white mb-3">Select Vehicle</h3>
        <div className="grid grid-cols-2 gap-3">
          {vehicleCategories.map((vehicle, index) => <motion.button key={vehicle.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 hover:border-cyan-500/50 transition-colors text-left" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.5 + index * 0.1
        }} whileHover={{
          y: -2
        }} whileTap={{
          scale: 0.98
        }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{
              backgroundColor: vehicle.color + '20'
            }}>
                  {vehicle.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{vehicle.name}</p>
                  <p className="text-xs text-gray-400">{vehicle.eta}</p>
                </div>
              </div>
              <p className="text-lg font-bold" style={{
            color: vehicle.color
          }}>
                {vehicle.fare}
              </p>
            </motion.button>)}
        </div>
      </div>
    </div>;
}