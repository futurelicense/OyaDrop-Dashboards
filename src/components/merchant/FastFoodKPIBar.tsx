import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ShoppingBag, Clock, DollarSign, TrendingUp, CheckCircle, Timer, Truck, Plus } from 'lucide-react';
const kpis = [{
  label: 'Total Shops',
  value: '4',
  icon: Store,
  color: '#00D9C0',
  trend: null,
  description: 'Active locations'
}, {
  label: 'Live Orders',
  value: '8',
  icon: ShoppingBag,
  color: '#FF6B00',
  trend: null,
  pulse: true,
  description: 'Currently processing'
}, {
  label: 'Pending',
  value: '3',
  icon: Clock,
  color: '#FFB800',
  trend: null,
  description: 'Awaiting acceptance'
}, {
  label: 'Today Revenue',
  value: '₦284k',
  icon: DollarSign,
  color: '#10B981',
  trend: '+12%',
  description: 'vs yesterday'
}, {
  label: 'Week Revenue',
  value: '₦1.8M',
  icon: TrendingUp,
  color: '#00F0FF',
  trend: '+8%',
  description: 'vs last week'
}, {
  label: 'Accept Rate',
  value: '96%',
  icon: CheckCircle,
  color: '#A855F7',
  trend: null,
  description: 'Order acceptance'
}, {
  label: 'Prep Time',
  value: '12m',
  icon: Timer,
  color: '#F59E0B',
  trend: '-2m',
  description: 'Average kitchen time'
}, {
  label: 'Delivery Score',
  value: '4.8',
  icon: Truck,
  color: '#EC4899',
  trend: '+0.2',
  description: 'Customer rating'
}];
export function FastFoodKPIBar() {
  const [showAll, setShowAll] = useState(false);
  const displayedKpis = showAll ? kpis : kpis.slice(0, 3);
  return <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-bold text-white">Performance Metrics</h2>
          <p className="text-xs text-gray-400">
            Real-time business intelligence
          </p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {displayedKpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return <motion.div key={kpi.label} className="flex-shrink-0 w-32 bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10 relative overflow-hidden" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} whileHover={{
          y: -2,
          borderColor: kpi.color + '40'
        }}>
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-16 h-16 rounded-full blur-2xl opacity-20" style={{
            backgroundColor: kpi.color
          }} />

              {/* Icon */}
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2 relative" style={{
            backgroundColor: kpi.color + '20'
          }}>
                <Icon className="w-4 h-4" style={{
              color: kpi.color
            }} />
                {kpi.pulse && <motion.div className="absolute inset-0 rounded-lg" style={{
              backgroundColor: kpi.color
            }} animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }} transition={{
              duration: 2,
              repeat: Infinity
            }} />}
              </div>

              {/* Value */}
              <p className="text-xl font-bold text-white mb-1">{kpi.value}</p>

              {/* Label & Trend */}
              <div className="flex items-center justify-between">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  {kpi.label}
                </p>
                {kpi.trend && <span className="text-[10px] font-bold" style={{
              color: kpi.trend.startsWith('+') ? '#10B981' : '#EF4444'
            }}>
                    {kpi.trend}
                  </span>}
              </div>
            </motion.div>;
      })}

        {/* More Button */}
        {!showAll && <motion.button className="flex-shrink-0 w-32 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl p-4 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/50 transition-colors flex flex-col items-center justify-center gap-2" onClick={() => setShowAll(true)} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.15
      }} whileHover={{
        y: -2
      }} whileTap={{
        scale: 0.95
      }}>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <Plus className="w-4 h-4 text-cyan-400" />
            </div>
            <p className="text-xs font-bold text-cyan-400">View More</p>
            <p className="text-[10px] text-gray-400">{kpis.length - 3} more</p>
          </motion.button>}

        {/* Show Less Button */}
        {showAll && <motion.button className="flex-shrink-0 w-32 bg-gradient-to-br from-gray-500/10 to-gray-600/10 rounded-2xl p-4 border-2 border-dashed border-gray-500/30 hover:border-gray-500/50 transition-colors flex flex-col items-center justify-center gap-2" onClick={() => setShowAll(false)} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} whileHover={{
        y: -2
      }} whileTap={{
        scale: 0.95
      }}>
            <div className="w-8 h-8 rounded-lg bg-gray-500/20 flex items-center justify-center">
              <motion.div animate={{
            rotate: 180
          }} transition={{
            duration: 0.3
          }}>
                <Plus className="w-4 h-4 text-gray-400" />
              </motion.div>
            </div>
            <p className="text-xs font-bold text-gray-400">Show Less</p>
          </motion.button>}
      </div>
    </div>;
}