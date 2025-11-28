import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Clock, Search } from 'lucide-react';
export function LocationInputCards() {
  return <div className="px-4 py-4 space-y-3">
      {/* Pickup Card */}
      <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-green-500/30" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.2
    }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Pickup Location</p>
            <input type="text" placeholder="Enter pickup address" className="w-full bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none" />
          </div>
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <motion.button className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Navigation className="w-3 h-3" />
            My Location
          </motion.button>

          <motion.button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-400 hover:bg-white/10 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Clock className="w-3 h-3" />
            Saved
          </motion.button>
        </div>
      </motion.div>

      {/* Destination Card */}
      <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-red-500/30" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.3
    }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-gray-400 mb-1">Destination</p>
            <input type="text" placeholder="Enter destination address" className="w-full bg-transparent text-white text-sm placeholder:text-gray-500 focus:outline-none" />
          </div>
          <Search className="w-5 h-5 text-gray-400" />
        </div>

        <div className="flex items-center gap-2">
          <motion.button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-lg text-xs font-semibold text-purple-400 hover:bg-purple-500/20 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <MapPin className="w-3 h-3" />
            Choose on Map
          </motion.button>

          <motion.button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-400 hover:bg-white/10 transition-colors" whileTap={{
          scale: 0.95
        }}>
            <Clock className="w-3 h-3" />
            Recent
          </motion.button>
        </div>
      </motion.div>
    </div>;
}