import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, Smartphone, TrendingUp, Gift, Zap } from 'lucide-react';
const transactions = [{
  id: 1,
  type: 'xp_gained',
  icon: Zap,
  title: 'Mission Completed',
  description: 'Daily login streak',
  amount: '+50 XP',
  time: '2m ago',
  color: '#10B981'
}, {
  id: 2,
  type: 'coins_earned',
  icon: Gift,
  title: 'Cashback Earned',
  description: 'From airtime purchase',
  amount: '+125 OC',
  time: '15m ago',
  color: '#FFD700'
}, {
  id: 3,
  type: 'top_up',
  icon: Plus,
  title: 'Wallet Top-Up',
  description: 'Added funds',
  amount: '+₦5,000',
  time: '1h ago',
  color: '#00D9C0'
}, {
  id: 4,
  type: 'send',
  icon: Send,
  title: 'Sent OyaCoin',
  description: 'To @john_doe',
  amount: '-500 OC',
  time: '2h ago',
  color: '#B026FF'
}, {
  id: 5,
  type: 'airtime',
  icon: Smartphone,
  title: 'Airtime Purchase',
  description: 'MTN ₦500',
  amount: '-₦500',
  time: '3h ago',
  color: '#FFB800'
}, {
  id: 6,
  type: 'xp_gained',
  icon: TrendingUp,
  title: 'Level Up!',
  description: 'Reached Level 8',
  amount: '+100 XP',
  time: '5h ago',
  color: '#00F0FF'
}];
export function TransactionFeed() {
  return <div className="px-4 py-6 pb-8">
      <motion.h2 className="text-lg font-bold text-white mb-6" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Activity Timeline
      </motion.h2>

      <div className="space-y-3">
        {transactions.map((transaction, index) => {
        const Icon = transaction.icon;
        const isPositive = transaction.amount.startsWith('+');
        return <motion.div key={transaction.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-[#131B2E] to-[#0F1520] border border-white/10" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.08
        }} whileHover={{
          scale: 1.02,
          borderColor: transaction.color + '40'
        }}>
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{
            backgroundColor: transaction.color + '20',
            boxShadow: `0 0 12px ${transaction.color}20`
          }}>
                <Icon className="w-5 h-5" style={{
              color: transaction.color
            }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white mb-0.5">
                  {transaction.title}
                </p>
                <p className="text-xs text-gray-400">
                  {transaction.description}
                </p>
                <p className="text-[10px] text-gray-600 mt-0.5">
                  {transaction.time}
                </p>
              </div>

              {/* Amount */}
              <div className="text-right">
                <p className={`text-sm font-bold ${isPositive ? 'text-green-400' : 'text-white'}`}>
                  {transaction.amount}
                </p>
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}