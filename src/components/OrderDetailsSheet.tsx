import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Package,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Calendar } from
'lucide-react';
export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price?: number;
  notes?: string;
  image?: string;
}
export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
  items?: OrderItem[];
  itemCount: number;
  totalValue?: number;
  status: string;
  urgency?: 'normal' | 'urgent' | 'express' | 'critical';
  timeElapsed: string;
  createdAt?: string;
  estimatedCompletion?: string;
  specialInstructions?: string;
  deliveryType?: 'pickup' | 'delivery';
  paymentMethod?: string;
  paymentStatus?: 'paid' | 'pending' | 'cod';
}
interface OrderDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onStatusChange?: (orderId: string, newStatus: string) => void;
  onContactCustomer?: (orderId: string) => void;
  statusOptions?: Array<{
    value: string;
    label: string;
    color: string;
  }>;
}
const urgencyConfig = {
  normal: {
    color: '#10B981',
    bg: '#10B98120',
    label: 'Normal'
  },
  urgent: {
    color: '#F59E0B',
    bg: '#F59E0B20',
    label: 'Urgent'
  },
  express: {
    color: '#FF6B00',
    bg: '#FF6B0020',
    label: 'Express'
  },
  critical: {
    color: '#EF4444',
    bg: '#EF444420',
    label: 'Critical'
  }
};
export function OrderDetailsSheet({
  isOpen,
  onClose,
  order,
  onStatusChange,
  onContactCustomer,
  statusOptions
}: OrderDetailsSheetProps) {
  if (!order) return null;
  const urgency = urgencyConfig[order.urgency || 'normal'];
  return (
    <AnimatePresence>
      {isOpen &&
      <>
          {/* Backdrop */}
          <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          onClick={onClose} />


          {/* Sheet */}
          <motion.div
          className="fixed inset-x-0 bottom-0 z-[90] bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl max-h-[90vh] flex flex-col"
          initial={{
            y: '100%'
          }}
          animate={{
            y: 0
          }}
          exit={{
            y: '100%'
          }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300
          }}>

            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Order Details</h2>
                <p className="text-sm text-gray-400">{order.orderNumber}</p>
              </div>
              <motion.button
              className="p-2 rounded-xl hover:bg-white/5 transition-colors"
              onClick={onClose}
              whileTap={{
                scale: 0.95
              }}>

                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
              {/* Status & Urgency */}
              <motion.div
              className="flex items-center gap-3"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.1
              }}>

                <div
                className="px-4 py-2 rounded-xl font-bold text-sm"
                style={{
                  backgroundColor: urgency.bg,
                  color: urgency.color
                }}>

                  {urgency.label}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{order.timeElapsed}</span>
                </div>
              </motion.div>

              {/* Customer Info */}
              <motion.div
              className="bg-[#0A0E1A]/50 rounded-2xl p-4 space-y-3"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.2
              }}>

                <h3 className="text-sm font-bold text-white mb-3">
                  Customer Information
                </h3>
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {order.customerName}
                    </p>
                    {order.customerPhone &&
                  <p className="text-xs text-gray-400">
                        {order.customerPhone}
                      </p>
                  }
                  </div>
                </div>
                {order.customerAddress &&
              <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                    <p className="text-sm text-gray-300">
                      {order.customerAddress}
                    </p>
                  </div>
              }
                {order.deliveryType &&
              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400 capitalize">
                      {order.deliveryType}
                    </span>
                  </div>
              }
              </motion.div>

              {/* Order Items */}
              {order.items && order.items.length > 0 &&
            <motion.div
              className="space-y-3"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.3
              }}>

                  <h3 className="text-sm font-bold text-white">
                    Items ({order.items.length})
                  </h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) =>
                <motion.div
                  key={item.id}
                  className="bg-[#0A0E1A]/50 rounded-xl p-3 flex items-center gap-3"
                  initial={{
                    opacity: 0,
                    x: -10
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.4 + index * 0.05
                  }}>

                        {item.image &&
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover" />

                  }
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            Qty: {item.quantity}
                          </p>
                          {item.notes &&
                    <p className="text-xs text-gray-500 mt-1">
                              Note: {item.notes}
                            </p>
                    }
                        </div>
                        {item.price &&
                  <p className="text-sm font-bold text-cyan-400">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </p>
                  }
                      </motion.div>
                )}
                  </div>
                </motion.div>
            }

              {/* Special Instructions */}
              {order.specialInstructions &&
            <motion.div
              className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.5
              }}>

                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-yellow-400 mb-1">
                        Special Instructions
                      </p>
                      <p className="text-sm text-gray-300">
                        {order.specialInstructions}
                      </p>
                    </div>
                  </div>
                </motion.div>
            }

              {/* Order Summary */}
              {order.totalValue &&
            <motion.div
              className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.6
              }}>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Subtotal</span>
                    <span className="text-sm text-white">
                      ₦{order.totalValue.toLocaleString()}
                    </span>
                  </div>
                  {order.paymentMethod &&
              <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">
                        Payment Method
                      </span>
                      <span className="text-sm text-white capitalize">
                        {order.paymentMethod}
                      </span>
                    </div>
              }
                  <div className="pt-3 border-t border-cyan-500/30 flex items-center justify-between">
                    <span className="text-base font-bold text-white">
                      Total
                    </span>
                    <span className="text-xl font-bold text-cyan-400">
                      ₦{order.totalValue.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
            }

              {/* Timeline */}
              {(order.createdAt || order.estimatedCompletion) &&
            <motion.div
              className="space-y-3"
              initial={{
                opacity: 0,
                y: 10
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                delay: 0.7
              }}>

                  <h3 className="text-sm font-bold text-white">Timeline</h3>
                  <div className="space-y-2">
                    {order.createdAt &&
                <div className="flex items-center gap-3 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400">Created:</span>
                        <span className="text-white">{order.createdAt}</span>
                      </div>
                }
                    {order.estimatedCompletion &&
                <div className="flex items-center gap-3 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="text-gray-400">Est. Completion:</span>
                        <span className="text-green-400">
                          {order.estimatedCompletion}
                        </span>
                      </div>
                }
                  </div>
                </motion.div>
            }
            </div>

            {/* Actions Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A] space-y-3">
              {/* Contact Customer */}
              {onContactCustomer &&
            <div className="grid grid-cols-2 gap-3">
                  <motion.button
                className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => onContactCustomer(order.id)}>

                    <Phone className="w-4 h-4" />
                    Call
                  </motion.button>
                  <motion.button
                className="flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-semibold hover:bg-white/10 transition-colors"
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => onContactCustomer(order.id)}>

                    <MessageCircle className="w-4 h-4" />
                    Message
                  </motion.button>
                </div>
            }

              {/* Status Actions */}
              {statusOptions && onStatusChange &&
            <div className="grid grid-cols-2 gap-3">
                  {statusOptions.slice(0, 2).map((option) =>
              <motion.button
                key={option.value}
                className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold shadow-lg"
                style={{
                  backgroundColor: option.color + '20',
                  border: `2px solid ${option.color}40`,
                  color: option.color
                }}
                whileTap={{
                  scale: 0.98
                }}
                onClick={() => onStatusChange(order.id, option.value)}>

                      <CheckCircle className="w-4 h-4" />
                      {option.label}
                    </motion.button>
              )}
                </div>
            }
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}