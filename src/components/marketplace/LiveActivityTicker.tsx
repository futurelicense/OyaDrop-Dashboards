import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBagIcon } from 'lucide-react';
const activities = [{
  user: 'John',
  item: 'Wireless Headphones',
  location: 'Lagos',
  time: '2m ago'
}, {
  user: 'Sarah',
  item: 'Smart Watch',
  location: 'Abuja',
  time: '5m ago'
}, {
  user: 'Mike',
  item: 'Coffee Beans',
  location: 'Port Harcourt',
  time: '8m ago'
}, {
  user: 'Ada',
  item: 'Designer Bag',
  location: 'Ibadan',
  time: '12m ago'
}, {
  user: 'Tunde',
  item: 'Gaming Mouse',
  location: 'Lagos',
  time: '15m ago'
}];
export function LiveActivityTicker() {
  return <div className="bg-[#00ffcc]/10 border-y border-[#00ffcc]/20 overflow-hidden py-2">
      <motion.div className="flex items-center gap-8" animate={{
      x: [0, -1000]
    }} transition={{
      duration: 30,
      repeat: Infinity,
      ease: 'linear'
    }}>
        {[...activities, ...activities, ...activities].map((activity, index) => <div key={index} className="flex items-center gap-2 whitespace-nowrap">
              <div className="w-6 h-6 bg-[#00ffcc]/20 rounded-full flex items-center justify-center">
                <ShoppingBagIcon className="w-3.5 h-3.5 text-[#00ffcc]" />
              </div>
              <span className="text-xs text-white">
                <span className="font-semibold">{activity.user}</span> in{' '}
                <span className="text-[#00ffcc]">{activity.location}</span>{' '}
                bought <span className="font-medium">{activity.item}</span>
              </span>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>)}
      </motion.div>
    </div>;
}