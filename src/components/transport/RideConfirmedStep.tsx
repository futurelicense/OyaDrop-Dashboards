import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeafletMap } from './LeafletMap';
import {
  Star,
  Clock,
  Car,
  Phone,
  MessageCircle,
  ShieldCheck,
  X,
  MoreVertical } from
'lucide-react';
interface RideConfirmedStepProps {
  pickup: string;
  destination: string;
  stops: string[];
  pricingMode: 'regular' | 'negotiate';
  driverDetails?: any; // Passed from negotiate step if applicable
  onOpenChat?: () => void;
  onCancel: () => void;
}
export function RideConfirmedStep({
  pickup,
  destination,
  stops,
  pricingMode,
  driverDetails,
  onOpenChat,
  onCancel
}: RideConfirmedStepProps) {
  const [isSearching, setIsSearching] = useState(pricingMode === 'regular');
  // Simulate finding a driver for regular rides
  useEffect(() => {
    if (pricingMode === 'regular') {
      const timer = setTimeout(() => {
        setIsSearching(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [pricingMode]);
  // Mock driver data if none provided
  const driver = driverDetails || {
    driverName: 'Tunde',
    driverImage:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    rating: 4.8,
    trips: 1240,
    vehicle: 'Toyota Camry',
    plate: 'LAG-123-XY',
    eta: '4 min',
    color: 'Silver'
  };
  return (
    <motion.div
      className="flex flex-col h-[calc(100vh-64px)]"
      initial={{
        opacity: 0,
        x: 20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: -20
      }}>
      
      {/* Map Section */}
      <div className="h-[45vh] flex-shrink-0 relative">
        <LeafletMap pickup={pickup} dropoff={destination} stops={stops} />

        {/* Top Bar overlay */}
        <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-start">
          <button
            onClick={onCancel}
            className="w-10 h-10 bg-[#0A0E1A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white">
            
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Sheet Content */}
      <div className="flex-1 bg-[#0A0E1A] rounded-t-3xl -mt-6 relative z-20 flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <AnimatePresence mode="wait">
            {isSearching ?
            <motion.div
              key="searching"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="flex flex-col items-center justify-center h-full pt-8">
              
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20" />
                  <div className="absolute inset-0 rounded-full border-4 border-t-cyan-500 animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Car className="w-8 h-8 text-cyan-400" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Finding your driver...
                </h3>
                <p className="text-gray-400 text-center max-w-[250px]">
                  Connecting you to the nearest available driver
                </p>
              </motion.div> :

            <motion.div
              key="confirmed"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              className="space-y-6 pt-2">
              
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Driver is on the way
                    </h3>
                    <p className="text-sm text-gray-400">
                      Arriving in {driver.eta}
                    </p>
                  </div>
                  <div className="bg-cyan-500/20 text-cyan-400 px-3 py-1.5 rounded-lg font-bold text-lg">
                    {driver.eta}
                  </div>
                </div>

                {/* Driver Card */}
                <div className="bg-[#131B2E] rounded-2xl p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img
                        src={driver.driverImage}
                        alt={driver.driverName}
                        className="w-14 h-14 rounded-full object-cover" />
                      
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#131B2E]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-white text-lg">
                            {driver.driverName}
                          </h4>
                          <ShieldCheck className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div className="flex items-center gap-2 text-sm mt-0.5">
                          <span className="flex items-center gap-0.5 text-yellow-400 font-semibold">
                            <Star className="w-3.5 h-3.5 fill-yellow-400" />{' '}
                            {driver.rating}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">
                            {driver.trips} trips
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-[#0A0E1A]/50 p-3 rounded-xl mb-4">
                    <div>
                      <p className="font-bold text-white">{driver.vehicle}</p>
                      <p className="text-xs text-gray-400">{driver.color}</p>
                    </div>
                    <div className="bg-[#131B2E] border border-white/10 px-3 py-1.5 rounded-lg">
                      <p className="font-mono font-bold text-white tracking-wider">
                        {driver.plate}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 py-3 rounded-xl font-semibold text-white bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
                      <Phone className="w-5 h-5" /> Call
                    </button>
                    <button
                    onClick={onOpenChat}
                    className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-teal-500 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2">
                    
                      <MessageCircle className="w-5 h-5" /> Chat
                    </button>
                  </div>
                </div>

                {/* Trip Details Summary */}
                <div className="bg-[#131B2E] rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-white">Trip Details</h4>
                    <button className="p-1 text-gray-400 hover:text-white">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-3 relative">
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-300 line-clamp-1">
                        {pickup || 'Current Location'}
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2.5 h-2.5 rounded-sm bg-red-500 mt-1.5 flex-shrink-0" />
                      <p className="text-sm text-gray-300 line-clamp-1">
                        {destination || 'Destination'}
                      </p>
                    </div>
                    <div className="absolute left-[4px] top-4 bottom-4 w-[2px] bg-white/10 -z-10" />
                  </div>
                </div>

                {/* Safety / Share */}
                <button className="w-full py-4 rounded-xl font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5" /> Share Trip Status
                </button>
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>);

}