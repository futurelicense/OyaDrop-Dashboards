import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Gift, Clock, Star } from 'lucide-react';
const promos = [{
  id: 1,
  title: 'Lunch Rush Special',
  subtitle: '₦500 Off Any Combo',
  xpReward: '+50 XP',
  gradient: 'from-orange-500 to-red-600',
  icon: Clock,
  badge: '11AM - 3PM'
}, {
  id: 2,
  title: 'Buy 1 Get 1 Free',
  subtitle: 'All Burgers Today',
  xpReward: '+100 XP',
  gradient: 'from-purple-500 to-pink-600',
  icon: Gift,
  badge: 'Limited Time'
}, {
  id: 3,
  title: '2X XP Boost',
  subtitle: 'Order Any Family Meal',
  xpReward: '+200 XP',
  gradient: 'from-cyan-500 to-blue-600',
  icon: Zap,
  badge: 'Today Only'
}, {
  id: 4,
  title: 'Night Owl Deal',
  subtitle: '30% Off After 10PM',
  xpReward: '+75 XP',
  gradient: 'from-indigo-500 to-purple-600',
  icon: Star,
  badge: '10PM - 2AM'
}];
export function FastFoodPromoCarousel() {
  return <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white">🔥 Hot Deals</h2>
        <p className="text-xs text-cyan-400">Earn bonus XP!</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {promos.map((promo, index) => {
        const Icon = promo.icon;
        return <motion.div key={promo.id} className={`relative flex-shrink-0 w-72 p-5 rounded-2xl bg-gradient-to-br ${promo.gradient} overflow-hidden`} initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          scale: 1.02
        }} whileTap={{
          scale: 0.98
        }}>
              {/* Glow Effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />

              {/* Badge */}
              <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm px-2 py-1 rounded-lg">
                <p className="text-[10px] font-bold text-white">
                  {promo.badge}
                </p>
              </div>

              {/* Icon */}
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-3">
                <Icon className="w-6 h-6 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-1">
                {promo.title}
              </h3>
              <p className="text-sm text-white/80 mb-3">{promo.subtitle}</p>

              {/* XP Reward */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {promo.xpReward}
                </span>
                <motion.button className="text-xs font-bold text-white bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-black/40 transition-colors" whileTap={{
              scale: 0.95
            }}>
                  Claim Now
                </motion.button>
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}