import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Package, Clock, CheckCircle, X } from 'lucide-react';
interface HistoryPageProps {
  onBack: () => void;
}
type FilterType = 'all' | 'food' | 'laundry' | 'pharmacy' | 'transport';
const orderHistory = [
{
  id: 'ORD-12340',
  type: 'Food Delivery',
  category: 'food',
  restaurant: 'B-square Restaurant',
  date: 'Today, 2:30 PM',
  amount: 2500,
  status: 'Completed'
},
{
  id: 'ORD-12339',
  type: 'Laundry Service',
  category: 'laundry',
  provider: 'CleanPro Laundry',
  date: 'Yesterday, 10:15 AM',
  amount: 3500,
  status: 'Completed'
},
{
  id: 'ORD-12338',
  type: 'Pharmacy',
  category: 'pharmacy',
  provider: 'HealthPlus Pharmacy',
  date: 'Dec 20, 4:45 PM',
  amount: 1200,
  status: 'Completed'
},
{
  id: 'ORD-12337',
  type: 'Transport',
  category: 'transport',
  provider: 'OyaRide',
  date: 'Dec 19, 8:30 AM',
  amount: 1500,
  status: 'Completed'
},
{
  id: 'ORD-12336',
  type: 'Food Delivery',
  category: 'food',
  restaurant: 'Mama Put',
  date: 'Dec 18, 6:20 PM',
  amount: 3200,
  status: 'Cancelled'
}];

export function HistoryPage({ onBack }: HistoryPageProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const filteredOrders =
  filter === 'all' ?
  orderHistory :
  orderHistory.filter((order) => order.category === filter);
  const filters: {
    id: FilterType;
    label: string;
  }[] = [
  {
    id: 'all',
    label: 'All'
  },
  {
    id: 'food',
    label: 'Food'
  },
  {
    id: 'laundry',
    label: 'Laundry'
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy'
  },
  {
    id: 'transport',
    label: 'Transport'
  }];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A]">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3 px-4 py-4">
          <motion.button
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={onBack}
            whileTap={{
              scale: 0.95
            }}>
            
            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold text-white">Order History</h1>
            <p className="text-xs text-gray-400">View all your past orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="px-4 pb-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {filters.map((f) =>
            <motion.button
              key={f.id}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${filter === f.id ? 'bg-teal-500/20 border border-teal-500/30 text-teal-400' : 'bg-white/5 border border-white/10 text-gray-400'}`}
              onClick={() => setFilter(f.id)}
              whileTap={{
                scale: 0.95
              }}>
              
                {f.label}
              </motion.button>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-md mx-auto p-4">
        <div className="space-y-3">
          {filteredOrders.map((order, index) =>
          <motion.div
            key={order.id}
            className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10"
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: index * 0.05
            }}>
            
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <p className="text-xs text-gray-400 mb-1">Order {order.id}</p>
                  <h3 className="text-sm font-bold text-white mb-1">
                    {order.type}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {order.restaurant || order.provider}
                  </p>
                </div>
                <div
                className={`px-2 py-1 rounded-lg ${order.status === 'Completed' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                
                  {order.status === 'Completed' ?
                <CheckCircle className="w-4 h-4 text-green-400" /> :

                <X className="w-4 h-4 text-red-400" />
                }
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  <p className="text-xs text-gray-400">{order.date}</p>
                </div>
                <p className="text-sm font-bold text-white">
                  ₦{order.amount.toLocaleString()}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>);

}