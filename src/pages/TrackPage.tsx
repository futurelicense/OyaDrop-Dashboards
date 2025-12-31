import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Package, Clock, CheckCircle } from 'lucide-react';
interface TrackPageProps {
  onBack: () => void;
}
const activeOrders = [{
  id: 'ORD-12345',
  type: 'Food Delivery',
  restaurant: 'B-square Restaurant',
  status: 'In Transit',
  estimatedTime: '15 mins',
  currentLocation: 'Victoria Island',
  progress: 75
}, {
  id: 'ORD-12346',
  type: 'Laundry Pickup',
  provider: 'CleanPro Laundry',
  status: 'Rider Assigned',
  estimatedTime: '25 mins',
  currentLocation: 'Lekki Phase 1',
  progress: 50
}];
export function TrackPage({
  onBack
}: TrackPageProps) {
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-4">
          <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onBack} whileTap={{
          scale: 0.95
        }}>
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">Track Orders</h1>
            <p className="text-xs text-gray-400">Real-time order tracking</p>
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4">
        <h2 className="text-lg font-bold text-white mb-4">Active Orders</h2>

        <div className="space-y-4">
          {activeOrders.map((order, index) => <motion.div key={order.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-5 border border-white/10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Order {order.id}</p>
                  <h3 className="text-base font-bold text-white">
                    {order.type}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {order.restaurant || order.provider}
                  </p>
                </div>
                <div className="px-3 py-1 bg-teal-500/20 border border-teal-500/30 rounded-lg">
                  <p className="text-xs font-bold text-teal-400">
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-400">Progress</p>
                  <p className="text-xs font-bold text-white">
                    {order.progress}%
                  </p>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-teal-500 to-green-500" initial={{
                width: 0
              }} animate={{
                width: `${order.progress}%`
              }} transition={{
                duration: 1,
                delay: index * 0.1
              }} />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-teal-400" />
                  <p className="text-sm text-gray-300">
                    ETA: {order.estimatedTime}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-teal-400" />
                  <p className="text-sm text-gray-300">
                    {order.currentLocation}
                  </p>
                </div>
              </div>

              <motion.button className="w-full mt-4 py-3 bg-teal-500/20 border border-teal-500/30 rounded-xl text-teal-400 font-semibold text-sm" whileTap={{
            scale: 0.98
          }}>
                View on Map
              </motion.button>
            </motion.div>)}
        </div>
      </main>
    </div>;
}