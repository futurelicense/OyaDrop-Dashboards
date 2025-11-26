import React from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, TrendingUpIcon, StarIcon } from 'lucide-react';
const insights = [{
  icon: ClockIcon,
  label: 'Peak Hours',
  value: '2-3 PM',
  subtext: '+45% orders',
  color: '#00d9ff'
}, {
  icon: TrendingUpIcon,
  label: 'Daily Orders',
  value: '24',
  subtext: '+12% vs yesterday',
  color: '#00ffcc'
}, {
  icon: StarIcon,
  label: 'Top Product',
  value: 'Premium Pack',
  subtext: '18 sold today',
  color: '#ffb800'
}];
export function InsightsStrip() {
  return <div className="px-5 pb-6">
      <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Today's Insights
      </h2>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {insights.map((insight, index) => {
        const Icon = insight.icon;
        return <motion.div key={insight.label} className="min-w-[200px] bg-gradient-to-br from-[#1a1a24] to-[#1f1f2e] rounded-xl p-4 border border-white/5 shadow-lg" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: 0.9 + index * 0.1
        }} whileHover={{
          scale: 1.05
        }}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{
              backgroundColor: `${insight.color}15`,
              boxShadow: `0 0 16px ${insight.color}20`
            }}>
                  <Icon className="w-5 h-5" style={{
                color: insight.color
              }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">{insight.label}</p>
                  <p className="text-lg font-bold text-white mb-0.5 truncate">
                    {insight.value}
                  </p>
                  <p className="text-xs text-gray-500">{insight.subtext}</p>
                </div>
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}