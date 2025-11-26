import React from 'react';
import { motion } from 'framer-motion';
import { Store, ShoppingBag, Clock, DollarSign, TrendingUp, CheckCircle, Timer, Truck } from 'lucide-react';
const kpis = [{
  label: 'Total Shops',
  value: '4',
  icon: Store,
  color: '#00D9C0',
  trend: null
}, {
  label: 'Live Orders',
  value: '8',
  icon: ShoppingBag,
  color: '#FF6B00',
  trend: null,
  pulse: true
}, {
  label: 'Pending',
  value: '3',
  icon: Clock,
  color: '#FFB800',
  trend: null
}, {
  label: 'Today Revenue',
  value: '₦284k',
  icon: DollarSign,
  color: '#10B981',
  trend: '+12%'
}, {
  label: 'Week Revenue',
  value: '₦1.8M',
  icon: TrendingUp,
  color: '#00F0FF',
  trend: '+8%'
}, {
  label: 'Accept Rate',
  value: '96%',
  icon: CheckCircle,
  color: '#A855F7',
  trend: null
}, {
  label: 'Prep Time',
  value: '12m',
  icon: Timer,
  color: '#F59E0B',
  trend: '-2m'
}, {
  label: 'Delivery Score',
  value: '4.8',
  icon: Truck,
  color: '#EC4899',
  trend: '+0.2'
}];
export function FastFoodKPIBar() {
  return <div className="px-4 py-4">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {kpis.map((kpi, index) => {
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
      </div>
    </div>;
}