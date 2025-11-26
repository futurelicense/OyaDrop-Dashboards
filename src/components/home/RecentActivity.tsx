import React from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, ShoppingCartIcon, TruckIcon, CoinsIcon } from 'lucide-react';
const activities = [{
  id: 1,
  type: 'airtime',
  icon: PhoneIcon,
  title: 'Airtime Purchase',
  description: 'Airtime purchase - 30% cashback Applied',
  amount: '₦7,500.00',
  time: '30 secs ago',
  color: '#06b6d4',
  isCredit: false
}, {
  id: 2,
  type: 'delivery',
  icon: TruckIcon,
  title: 'Delivery Payment',
  description: 'Payment made for shop order',
  amount: '+₦25,800.00',
  time: '2 hours ago',
  color: '#10b981',
  isCredit: true
}, {
  id: 3,
  type: 'reward',
  icon: CoinsIcon,
  title: 'OyaCoin Reward',
  description: 'Successful',
  amount: '+50',
  time: 'Yesterday',
  color: '#f59e0b',
  isCredit: true
}];
export function RecentActivity() {
  return <div className="px-5 py-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <motion.h2 className="text-lg font-bold text-white" initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }}>
            Recent Activity
          </motion.h2>
          <p className="text-xs text-cyan-400">Live updates</p>
        </div>

        <motion.button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors" whileTap={{
        scale: 0.95
      }}>
          View All
        </motion.button>
      </div>

      <motion.div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden" initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 0.5
    }}>
        <div className="divide-y divide-gray-800">
          {activities.map((activity, index) => {
          const Icon = activity.icon;
          return <motion.div key={activity.id} className="flex items-center gap-4 p-4" initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: 0.6 + index * 0.1
          }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{
              backgroundColor: `${activity.color}20`
            }}>
                  <Icon className="w-5 h-5" style={{
                color: activity.color
              }} />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white mb-0.5">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {activity.description}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-1">
                    {activity.time}
                  </p>
                </div>

                <div className="text-right">
                  <p className={`text-sm font-bold ${activity.isCredit ? 'text-green-400' : 'text-white'}`}>
                    {activity.amount}
                  </p>
                </div>
              </motion.div>;
        })}
        </div>
      </motion.div>
    </div>;
}