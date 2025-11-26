import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, User, MapPin, CreditCard, ChefHat, CheckCircle, Bike } from 'lucide-react';
interface Order {
  id: string;
  orderNumber: string;
  timeAgo: string;
  items: string[];
  customer: string;
  deliveryMode: 'pickup' | 'delivery';
  paymentStatus: 'paid' | 'pending';
  status: 'pending' | 'accepted' | 'cooking' | 'ready' | 'delivering';
  prepTimer: number; // minutes
  branch: string;
}
const orders: Order[] = [{
  id: '1',
  orderNumber: '#ORD-2847',
  timeAgo: '2m ago',
  items: ['2x Chicken Bucket', '1x Large Fries', '2x Coke'],
  customer: 'Adebayo O.',
  deliveryMode: 'delivery',
  paymentStatus: 'paid',
  status: 'pending',
  prepTimer: 0,
  branch: 'Jakande'
}, {
  id: '2',
  orderNumber: '#ORD-2846',
  timeAgo: '5m ago',
  items: ['1x Beef Burger', '1x Fries', '1x Sprite'],
  customer: 'Chioma N.',
  deliveryMode: 'pickup',
  paymentStatus: 'paid',
  status: 'cooking',
  prepTimer: 8,
  branch: 'Ikota'
}, {
  id: '3',
  orderNumber: '#ORD-2845',
  timeAgo: '12m ago',
  items: ['3x Shawarma Wrap', '2x Pepsi'],
  customer: 'Ibrahim K.',
  deliveryMode: 'delivery',
  paymentStatus: 'paid',
  status: 'ready',
  prepTimer: 15,
  branch: 'Lekki Phase 1'
}];
export function RealTimeOrderManager() {
  const [activeOrders, setActiveOrders] = useState(orders);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return {
          bg: '#FF6B0020',
          border: '#FF6B00',
          text: '#FF6B00'
        };
      case 'accepted':
        return {
          bg: '#00D9C020',
          border: '#00D9C0',
          text: '#00D9C0'
        };
      case 'cooking':
        return {
          bg: '#FFB80020',
          border: '#FFB800',
          text: '#FFB800'
        };
      case 'ready':
        return {
          bg: '#10B98120',
          border: '#10B981',
          text: '#10B981'
        };
      case 'delivering':
        return {
          bg: '#00F0FF20',
          border: '#00F0FF',
          text: '#00F0FF'
        };
      default:
        return {
          bg: '#6B728020',
          border: '#6B7280',
          text: '#6B7280'
        };
    }
  };
  const getTimerColor = (minutes: number) => {
    if (minutes === 0) return '#6B7280';
    if (minutes < 10) return '#10B981';
    if (minutes < 15) return '#FFB800';
    return '#EF4444';
  };
  return <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Live Orders</h2>
          <p className="text-xs text-gray-400">Real-time order management</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1.5 rounded-lg border border-orange-500/30">
          <motion.div className="w-2 h-2 bg-orange-500 rounded-full" animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.5, 1]
        }} transition={{
          duration: 1.5,
          repeat: Infinity
        }} />
          <span className="text-xs font-bold text-white">
            {activeOrders.length} Active
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {activeOrders.map((order, index) => {
        const statusColors = getStatusColor(order.status);
        const timerColor = getTimerColor(order.prepTimer);
        return <motion.div key={order.id} className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border border-white/10" initial={{
          opacity: 0,
          x: -20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          delay: index * 0.1
        }} whileHover={{
          borderColor: statusColors.border + '40'
        }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">
                    {order.orderNumber}
                  </p>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-400">{order.timeAgo}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-cyan-400">{order.branch}</span>
                </div>

                {/* Status Badge */}
                <div className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase" style={{
              backgroundColor: statusColors.bg,
              color: statusColors.text,
              border: `1px solid ${statusColors.border}40`
            }}>
                  {order.status}
                </div>
              </div>

              {/* Items */}
              <div className="bg-[#0A0E1A]/50 rounded-xl p-3 mb-3">
                <p className="text-xs text-gray-400 mb-2">Order Items:</p>
                {order.items.map((item, i) => <p key={i} className="text-sm text-white font-semibold">
                    • {item}
                  </p>)}
              </div>

              {/* Customer & Details */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-white">{order.customer}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-white capitalize">
                    {order.deliveryMode}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-green-400 capitalize">
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{
                color: timerColor
              }} />
                  <span className="text-xs font-bold" style={{
                color: timerColor
              }}>
                    {order.prepTimer > 0 ? `${order.prepTimer}m` : 'Not started'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {order.status === 'pending' && <>
                    <motion.button className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                      <CheckCircle className="w-4 h-4" />
                      Accept
                    </motion.button>
                    <motion.button className="col-span-2 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 font-bold text-sm" whileHover={{
                scale: 1.02
              }} whileTap={{
                scale: 0.98
              }}>
                      Reject
                    </motion.button>
                  </>}

                {order.status === 'accepted' && <motion.button className="col-span-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-sm shadow-lg" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                    <ChefHat className="w-4 h-4" />
                    Start Cooking
                  </motion.button>}

                {order.status === 'cooking' && <motion.button className="col-span-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold text-sm shadow-lg" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                    <CheckCircle className="w-4 h-4" />
                    Mark Ready
                  </motion.button>}

                {order.status === 'ready' && <motion.button className="col-span-4 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-sm shadow-lg" whileHover={{
              scale: 1.02
            }} whileTap={{
              scale: 0.98
            }}>
                    <Bike className="w-4 h-4" />
                    Handed to Rider
                  </motion.button>}
              </div>
            </motion.div>;
      })}
      </div>
    </div>;
}