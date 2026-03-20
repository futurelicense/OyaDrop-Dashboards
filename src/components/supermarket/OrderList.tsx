import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, User, Package, ChevronRight } from 'lucide-react';
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  itemCount: number;
  totalValue: number;
  timeElapsed: string;
  type: 'pickup' | 'delivery';
  status: 'pending' | 'picking' | 'ready' | 'completed';
  urgency: 'normal' | 'urgent' | 'critical';
}
const mockOrders: Order[] = [
{
  id: '1',
  orderNumber: '#ORD-2847',
  customerName: 'Chioma Adeyemi',
  itemCount: 12,
  totalValue: 15400,
  timeElapsed: '5 mins ago',
  type: 'delivery',
  status: 'pending',
  urgency: 'critical'
},
{
  id: '2',
  orderNumber: '#ORD-2846',
  customerName: 'Tunde Bakare',
  itemCount: 8,
  totalValue: 8200,
  timeElapsed: '12 mins ago',
  type: 'pickup',
  status: 'pending',
  urgency: 'urgent'
},
{
  id: '3',
  orderNumber: '#ORD-2845',
  customerName: 'Grace Okonkwo',
  itemCount: 15,
  totalValue: 22500,
  timeElapsed: '18 mins ago',
  type: 'delivery',
  status: 'picking',
  urgency: 'normal'
},
{
  id: '4',
  orderNumber: '#ORD-2844',
  customerName: 'Emeka Johnson',
  itemCount: 6,
  totalValue: 5800,
  timeElapsed: '25 mins ago',
  type: 'pickup',
  status: 'ready',
  urgency: 'normal'
}];

const urgencyColors = {
  normal: {
    border: '#10B981',
    bg: '#10B98120',
    text: '#10B981'
  },
  urgent: {
    border: '#FFB800',
    bg: '#FFB80020',
    text: '#FFB800'
  },
  critical: {
    border: '#FF6B00',
    bg: '#FF6B0020',
    text: '#FF6B00'
  }
};
const statusLabels = {
  pending: 'New Order',
  picking: 'Picking',
  ready: 'Ready',
  completed: 'Completed'
};
interface OrderListProps {
  onSelectOrder: (order: Order) => void;
}
export function OrderList({ onSelectOrder }: OrderListProps) {
  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All Orders', 'Pending', 'Picking', 'Ready'].map(
            (filter, index) =>
            <motion.button
              key={filter}
              className={`flex-shrink-0 px-4 py-2 rounded-xl font-semibold text-sm ${index === 0 ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`}
              whileTap={{
                scale: 0.95
              }}>
              
                {filter}
              </motion.button>

          )}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mockOrders.map((order, index) => {
          const colors = urgencyColors[order.urgency];
          return (
            <motion.button
              key={order.id}
              className="w-full bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl p-4 border-2 text-left relative overflow-hidden"
              style={{
                borderColor: colors.border
              }}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                delay: index * 0.05
              }}
              whileTap={{
                scale: 0.98
              }}
              onClick={() => onSelectOrder(order)}>
              
              {/* Urgency Indicator */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  backgroundColor: colors.border
                }} />
              

              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-white">
                      {order.orderNumber}
                    </h3>
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text
                      }}>
                      
                      {statusLabels[order.status]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{order.customerName}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white font-semibold">
                    {order.itemCount} items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white font-semibold capitalize">
                    {order.type}
                  </span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{order.timeElapsed}</span>
                </div>
                <span className="text-lg font-bold text-cyan-400">
                  ₦{order.totalValue.toLocaleString()}
                </span>
              </div>
            </motion.button>);

        })}
      </div>
    </div>);

}