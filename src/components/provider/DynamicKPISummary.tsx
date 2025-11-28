import React from 'react';
import { motion } from 'framer-motion';
import { Car, Package, Wrench, Scissors, TrendingUp, Star, CheckCircle, Users } from 'lucide-react';
type ProviderType = 'transport' | 'delivery' | 'home-service' | 'professional' | 'artisan';
interface KPI {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  trend?: string;
}
interface DynamicKPISummaryProps {
  providerType: ProviderType;
}
const kpisByType: Record<ProviderType, KPI[]> = {
  transport: [{
    label: 'Total Trips',
    value: 234,
    icon: Car,
    color: '#00D9C0',
    trend: '+12%'
  }, {
    label: 'Daily Earnings',
    value: '₦45,200',
    icon: TrendingUp,
    color: '#10B981',
    trend: '+8%'
  }, {
    label: 'Rating',
    value: '4.8',
    icon: Star,
    color: '#FFB800'
  }, {
    label: 'Acceptance',
    value: '96%',
    icon: CheckCircle,
    color: '#00F0FF'
  }],
  delivery: [{
    label: 'Deliveries',
    value: 156,
    icon: Package,
    color: '#00D9C0',
    trend: '+15%'
  }, {
    label: 'Daily Earnings',
    value: '₦28,400',
    icon: TrendingUp,
    color: '#10B981',
    trend: '+5%'
  }, {
    label: 'Rating',
    value: '4.9',
    icon: Star,
    color: '#FFB800'
  }, {
    label: 'On-Time',
    value: '98%',
    icon: CheckCircle,
    color: '#00F0FF'
  }],
  'home-service': [{
    label: 'Total Jobs',
    value: 89,
    icon: Wrench,
    color: '#00D9C0',
    trend: '+10%'
  }, {
    label: 'Completed',
    value: 82,
    icon: CheckCircle,
    color: '#10B981'
  }, {
    label: 'Monthly Earnings',
    value: '₦185k',
    icon: TrendingUp,
    color: '#FFB800',
    trend: '+18%'
  }, {
    label: 'Repeat Clients',
    value: 45,
    icon: Users,
    color: '#B026FF'
  }],
  professional: [{
    label: 'Bookings',
    value: 67,
    icon: Scissors,
    color: '#00D9C0',
    trend: '+20%'
  }, {
    label: 'Completed',
    value: 62,
    icon: CheckCircle,
    color: '#10B981'
  }, {
    label: 'Monthly Earnings',
    value: '₦220k',
    icon: TrendingUp,
    color: '#FFB800',
    trend: '+25%'
  }, {
    label: 'Rating',
    value: '4.9',
    icon: Star,
    color: '#FF6B00'
  }],
  artisan: [{
    label: 'Service Jobs',
    value: 45,
    icon: Wrench,
    color: '#00D9C0',
    trend: '+8%'
  }, {
    label: 'Completed',
    value: 41,
    icon: CheckCircle,
    color: '#10B981'
  }, {
    label: 'Monthly Earnings',
    value: '₦165k',
    icon: TrendingUp,
    color: '#FFB800',
    trend: '+12%'
  }, {
    label: 'Rating',
    value: '4.7',
    icon: Star,
    color: '#00F0FF'
  }]
};
export function DynamicKPISummary({
  providerType
}: DynamicKPISummaryProps) {
  const kpis = kpisByType[providerType];
  return <div className="px-4 py-4">
      <h2 className="text-sm font-bold text-white mb-3">
        Performance Overview
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return <motion.div key={kpi.label} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          y: -2,
          borderColor: kpi.color + '40'
        }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{
            backgroundColor: kpi.color + '20'
          }}>
                <Icon className="w-5 h-5" style={{
              color: kpi.color
            }} />
              </div>

              <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-xl font-bold text-white">{kpi.value}</p>
                {kpi.trend && <span className="text-xs font-bold text-green-400">
                    {kpi.trend}
                  </span>}
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}