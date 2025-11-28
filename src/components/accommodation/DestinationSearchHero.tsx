import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
export function DestinationSearchHero() {
  return <div className="px-4 py-6">
      <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-3xl p-6 border border-cyan-500/30 shadow-2xl" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }}>
        <h2 className="text-xl font-bold text-white mb-6">
          Where are you going?
        </h2>

        <div className="space-y-4">
          {/* Location Input */}
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400" />
            <input type="text" placeholder="Search destinations..." className="w-full bg-[#0A0E1A] text-white pl-12 pr-4 py-4 rounded-xl border border-cyan-500/30 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
          </div>

          {/* Date Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Check-in" className="w-full bg-[#0A0E1A] text-white pl-10 pr-3 py-3.5 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 text-sm" />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Check-out" className="w-full bg-[#0A0E1A] text-white pl-10 pr-3 py-3.5 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 text-sm" />
            </div>
          </div>

          {/* Guests Selector */}
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="2 guests" className="w-full bg-[#0A0E1A] text-white pl-12 pr-4 py-4 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
          </div>

          {/* Search Button */}
          <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2" whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
            <Search className="w-5 h-5" />
            Search Stays
          </motion.button>
        </div>
      </motion.div>
    </div>;
}