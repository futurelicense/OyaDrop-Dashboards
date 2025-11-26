import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, Clock, Award, Settings, QrCode, Edit, Zap } from 'lucide-react';
interface Branch {
  id: string;
  name: string;
  location: string;
  ordersToday: number;
  revenueToday: number;
  pending: number;
  completed: number;
  avgPrepTime: string;
  bestseller: string;
  heatLevel: 'low' | 'medium' | 'high';
  peakHours: string;
  comboRate: number;
}
const branches: Branch[] = [{
  id: '1',
  name: 'Jakande Branch',
  location: 'Lekki, Lagos',
  ordersToday: 45,
  revenueToday: 128500,
  pending: 3,
  completed: 42,
  avgPrepTime: '11m',
  bestseller: '🍔 Burger',
  heatLevel: 'high',
  peakHours: '12PM-2PM',
  comboRate: 68
}, {
  id: '2',
  name: 'Ikota Branch',
  location: 'Ajah, Lagos',
  ordersToday: 32,
  revenueToday: 89200,
  pending: 2,
  completed: 30,
  avgPrepTime: '13m',
  bestseller: '🌯 Shawarma',
  heatLevel: 'medium',
  peakHours: '1PM-3PM',
  comboRate: 54
}, {
  id: '3',
  name: 'Lekki Phase 1',
  location: 'Lekki, Lagos',
  ordersToday: 38,
  revenueToday: 105800,
  pending: 1,
  completed: 37,
  avgPrepTime: '10m',
  bestseller: '🍗 Chicken',
  heatLevel: 'high',
  peakHours: '12PM-2PM',
  comboRate: 72
}, {
  id: '4',
  name: 'VI Branch',
  location: 'Victoria Island',
  ordersToday: 28,
  revenueToday: 76400,
  pending: 0,
  completed: 28,
  avgPrepTime: '14m',
  bestseller: '🍟 Fries',
  heatLevel: 'low',
  peakHours: '6PM-8PM',
  comboRate: 45
}];
export function MultiBranchGrid() {
  const getHeatColor = (level: string) => {
    switch (level) {
      case 'high':
        return {
          bg: '#EF444420',
          border: '#EF4444',
          text: '#EF4444'
        };
      case 'medium':
        return {
          bg: '#F59E0B20',
          border: '#F59E0B',
          text: '#F59E0B'
        };
      case 'low':
        return {
          bg: '#10B98120',
          border: '#10B981',
          text: '#10B981'
        };
      default:
        return {
          bg: '#6B728020',
          border: '#6B7280',
          text: '#6B7280'
        };
    }
  };
  return <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Branch Performance</h2>
          <p className="text-xs text-gray-400">
            Real-time overview of all locations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map((branch, index) => {
        const heatColors = getHeatColor(branch.heatLevel);
        return <motion.div key={branch.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-5 border border-white/10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -4,
          borderColor: '#00D9C040'
        }}>
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-2xl">
                    🏪
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {branch.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <MapPin className="w-3 h-3" />
                      {branch.location}
                    </div>
                  </div>
                </div>

                {/* Heat Level */}
                <div className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase" style={{
              backgroundColor: heatColors.bg,
              color: heatColors.text,
              border: `1px solid ${heatColors.border}40`
            }}>
                  {branch.heatLevel}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Orders Today</p>
                  <p className="text-2xl font-bold text-white">
                    {branch.ordersToday}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-green-400">
                      ✓ {branch.completed}
                    </span>
                    <span className="text-xs text-orange-400">
                      ⏱ {branch.pending}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Revenue</p>
                  <p className="text-xl font-bold text-cyan-400">
                    ₦{(branch.revenueToday / 1000).toFixed(1)}k
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-400" />
                    <span className="text-xs text-green-400">+12%</span>
                  </div>
                </div>

                <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Avg Prep Time</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    <p className="text-lg font-bold text-white">
                      {branch.avgPrepTime}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0A0E1A]/50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Bestseller</p>
                  <p className="text-sm font-bold text-white">
                    {branch.bestseller}
                  </p>
                </div>
              </div>

              {/* Peak Hours & Combo Rate */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 bg-orange-500/10 border border-orange-500/30 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-orange-400 uppercase mb-1">
                    Peak Hours
                  </p>
                  <p className="text-xs font-bold text-white">
                    {branch.peakHours}
                  </p>
                </div>
                <div className="flex-1 bg-purple-500/10 border border-purple-500/30 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-purple-400 uppercase mb-1">
                    Combo Rate
                  </p>
                  <p className="text-xs font-bold text-white">
                    {branch.comboRate}%
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2">
                <motion.button className="flex flex-col items-center gap-1 py-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors" whileTap={{
              scale: 0.95
            }}>
                  <Settings className="w-4 h-4 text-cyan-400" />
                  <span className="text-[9px] text-cyan-400 font-semibold">
                    Manage
                  </span>
                </motion.button>

                <motion.button className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" whileTap={{
              scale: 0.95
            }}>
                  <QrCode className="w-4 h-4 text-gray-400" />
                  <span className="text-[9px] text-gray-400 font-semibold">
                    QR
                  </span>
                </motion.button>

                <motion.button className="flex flex-col items-center gap-1 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors" whileTap={{
              scale: 0.95
            }}>
                  <Edit className="w-4 h-4 text-gray-400" />
                  <span className="text-[9px] text-gray-400 font-semibold">
                    Menu
                  </span>
                </motion.button>

                <motion.button className="flex flex-col items-center gap-1 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/30 hover:bg-yellow-500/20 transition-colors" whileTap={{
              scale: 0.95
            }}>
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-[9px] text-yellow-400 font-semibold">
                    Promo
                  </span>
                </motion.button>
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}