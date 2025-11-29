import React from 'react';
import { motion } from 'framer-motion';
import { Car, MapPin, Clock, DollarSign } from 'lucide-react';
interface RideRequestCardProps {
  pickup: string;
  dropoff: string;
  estimatedFare: number;
  estimatedTime: string;
  rideType: string;
}
export function RideRequestCard({
  pickup,
  dropoff,
  estimatedFare,
  estimatedTime,
  rideType
}: RideRequestCardProps) {
  return <motion.div className="max-w-[85%] bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl rounded-br-sm p-4 border border-cyan-500/30" initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    type: 'spring',
    damping: 20
  }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
        <div className="w-10 h-10 bg-cyan-500/20 rounded-xl flex items-center justify-center">
          <Car className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Ride Request</h3>
          <p className="text-xs text-gray-400">{rideType}</p>
        </div>
      </div>

      {/* Route */}
      <div className="space-y-3 mb-4">
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-cyan-500" />
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <p className="text-xs text-gray-400 mb-1">Pickup</p>
              <p className="text-sm font-semibold text-white">{pickup}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Dropoff</p>
              <p className="text-sm font-semibold text-white">{dropoff}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-2 p-2 bg-[#0A0E1A]/50 rounded-lg">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400">Est. Time</p>
            <p className="text-xs font-bold text-white">{estimatedTime}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-2 bg-[#0A0E1A]/50 rounded-lg">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-400">Est. Fare</p>
            <p className="text-xs font-bold text-cyan-400">
              ₦{estimatedFare.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button className="flex-1 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm" whileTap={{
        scale: 0.98
      }}>
          Decline
        </motion.button>
        <motion.button className="flex-1 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl text-white font-semibold text-sm shadow-lg" whileTap={{
        scale: 0.98
      }}>
          Accept Ride
        </motion.button>
      </div>
    </motion.div>;
}