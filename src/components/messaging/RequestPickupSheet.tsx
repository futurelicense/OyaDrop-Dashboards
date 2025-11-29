import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Navigation, Clock } from 'lucide-react';
interface RequestPickupSheetProps {
  isOpen: boolean;
  onClose: () => void;
  driverName: string;
}
export function RequestPickupSheet({
  isOpen,
  onClose,
  driverName
}: RequestPickupSheetProps) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [scheduledTime, setScheduledTime] = useState<'now' | 'later'>('now');
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Bottom Sheet */}
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col" initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
        type: 'spring',
        damping: 30,
        stiffness: 300
      }}>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Request Pickup</h2>
                <p className="text-sm text-gray-400">from {driverName}</p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              {/* Pickup Location */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Pickup Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
                  <input type="text" placeholder="Enter pickup address" value={pickup} onChange={e => setPickup(e.target.value)} className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                  <motion.button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-cyan-500/20 rounded-lg" whileTap={{
                scale: 0.9
              }}>
                    <Navigation className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                </div>
              </div>

              {/* Dropoff Location */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Dropoff Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
                  <input type="text" placeholder="Enter destination" value={dropoff} onChange={e => setDropoff(e.target.value)} className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
                </div>
              </div>

              {/* Schedule Time */}
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  When?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button className={`p-4 rounded-xl border-2 transition-all ${scheduledTime === 'now' ? 'bg-cyan-500/20 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setScheduledTime('now')} whileTap={{
                scale: 0.98
              }}>
                    <Clock className={`w-6 h-6 mx-auto mb-2 ${scheduledTime === 'now' ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${scheduledTime === 'now' ? 'text-white' : 'text-gray-400'}`}>
                      Pick me now
                    </p>
                  </motion.button>

                  <motion.button className={`p-4 rounded-xl border-2 transition-all ${scheduledTime === 'later' ? 'bg-cyan-500/20 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setScheduledTime('later')} whileTap={{
                scale: 0.98
              }}>
                    <Clock className={`w-6 h-6 mx-auto mb-2 ${scheduledTime === 'later' ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <p className={`text-sm font-semibold ${scheduledTime === 'later' ? 'text-white' : 'text-gray-400'}`}>
                      Schedule for later
                    </p>
                  </motion.button>
                </div>
              </div>

              {/* Estimated Fare */}
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Estimated Fare</span>
                  <span className="text-xl font-bold text-cyan-400">
                    ₦2,500
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Final fare may vary based on traffic and route
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg" whileTap={{
            scale: 0.98
          }}>
                Request Pickup
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}