import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Package, MapPin, ChevronRight } from 'lucide-react';
interface LaundryOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  garmentCount: number;
  serviceType: 'Wash Only' | 'Wash & Iron' | 'Dry Cleaning' | 'Express';
  status:
  'pickup' |
  'sorting' |
  'washing' |
  'ironing' |
  'packaging' |
  'delivery';
  urgency: 'normal' | 'urgent' | 'express';
  timeElapsed: string;
  deliveryType: 'pickup' | 'delivery';
}
const mockOrders: LaundryOrder[] = [
{
  id: '1',
  orderNumber: '#LND-2847',
  customerName: 'Chioma Adeyemi',
  garmentCount: 12,
  serviceType: 'Wash & Iron',
  status: 'pickup',
  urgency: 'express',
  timeElapsed: '5 mins ago',
  deliveryType: 'delivery'
},
{
  id: '2',
  orderNumber: '#LND-2846',
  customerName: 'Tunde Bakare',
  garmentCount: 8,
  serviceType: 'Wash Only',
  status: 'washing',
  urgency: 'normal',
  timeElapsed: '2 hours ago',
  deliveryType: 'pickup'
},
{
  id: '3',
  orderNumber: '#LND-2845',
  customerName: 'Grace Okonkwo',
  garmentCount: 15,
  serviceType: 'Dry Cleaning',
  status: 'ironing',
  urgency: 'urgent',
  timeElapsed: '4 hours ago',
  deliveryType: 'delivery'
}];

const urgencyColors = {
  normal: {
    border: '#10B981',
    bg: '#10B98120'
  },
  urgent: {
    border: '#FFB800',
    bg: '#FFB80020'
  },
  express: {
    border: '#FF6B00',
    bg: '#FF6B0020'
  }
};
const statusLabels = {
  pickup: 'Awaiting Pickup',
  sorting: 'Sorting',
  washing: 'Washing',
  ironing: 'Ironing',
  packaging: 'Packaging',
  delivery: 'Ready for Delivery'
};
const statusProgress = {
  pickup: 16,
  sorting: 33,
  washing: 50,
  ironing: 66,
  packaging: 83,
  delivery: 100
};
interface LaundryOrderListProps {
  onSelectOrder: (order: LaundryOrder) => void;
}
export function LaundryOrderList({ onSelectOrder }: LaundryOrderListProps) {
  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Filter Tabs */}
      <div className="p-4 border-b border-white/10">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All Orders', 'In Progress', 'Ready', 'Completed'].map(
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
          const progress = statusProgress[order.status];
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
              
              {/* Urgency Bar */}
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
                        color: colors.border
                      }}>
                      
                      {order.urgency === 'express' ?
                      'EXPRESS' :
                      order.urgency.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <User className="w-4 h-4" />
                    <span>{order.customerName}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>

              {/* Service Type */}
              <div className="mb-3">
                <span className="text-xs font-bold px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">
                  {order.serviceType}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white font-semibold">
                    {order.garmentCount} items
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-white font-semibold capitalize">
                    {order.deliveryType}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">
                    {statusLabels[order.status]}
                  </span>
                  <span className="text-white font-semibold">{progress}%</span>
                </div>
                <div className="h-2 bg-[#0A0E1A] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 to-teal-500"
                    initial={{
                      width: 0
                    }}
                    animate={{
                      width: `${progress}%`
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }} />
                  
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{order.timeElapsed}</span>
                </div>
              </div>
            </motion.button>);

        })}
      </div>
    </div>);

}