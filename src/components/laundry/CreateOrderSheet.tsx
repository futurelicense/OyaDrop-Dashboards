import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, MapPin, Plus } from 'lucide-react';
interface CreateOrderSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function CreateOrderSheet({ isOpen, onClose }: CreateOrderSheetProps) {
  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    address: '',
    serviceType: 'Wash & Iron',
    deliveryType: 'delivery',
    urgency: 'normal',
    garmentCount: '',
    notes: ''
  });
  return (
    <AnimatePresence>
      {isOpen &&
      <>
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
        

          <motion.div
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col"
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
          
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full" />
            </div>

            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-bold text-white">Create Order</h2>
                <p className="text-sm text-gray-400">New laundry order</p>
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

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Customer Name *
                </label>
                <input
                type="text"
                placeholder="Enter customer name"
                value={formData.customerName}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  customerName: e.target.value
                })
                }
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number *
                </label>
                <input
                type="tel"
                placeholder="080XXXXXXXX"
                value={formData.phone}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value
                })
                }
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
              
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Address *
                </label>
                <textarea
                placeholder="Enter pickup/delivery address"
                value={formData.address}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value
                })
                }
                rows={2}
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />
              
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Service Type *
                </label>
                <select
                value={formData.serviceType}
                onChange={(e) =>
                setFormData({
                  ...formData,
                  serviceType: e.target.value
                })
                }
                className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none">
                
                  <option>Wash Only</option>
                  <option>Wash & Iron</option>
                  <option>Dry Cleaning</option>
                  <option>Iron Only</option>
                  <option>Express Service</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Delivery Type *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['delivery', 'pickup'].map((type) =>
                <motion.button
                  key={type}
                  className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.deliveryType === type ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-[#0A0E1A] border-white/10 text-gray-400'}`}
                  onClick={() =>
                  setFormData({
                    ...formData,
                    deliveryType: type
                  })
                  }
                  whileTap={{
                    scale: 0.95
                  }}>
                  
                      {type === 'delivery' ? 'Delivery' : 'Customer Pickup'}
                    </motion.button>
                )}
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-400 mb-2 block">
                  Urgency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                {
                  value: 'normal',
                  label: 'Normal',
                  color: '#10B981'
                },
                {
                  value: 'urgent',
                  label: 'Urgent',
                  color: '#FFB800'
                },
                {
                  value: 'express',
                  label: 'Express',
                  color: '#FF6B00'
                }].
                map((option) =>
                <motion.button
                  key={option.value}
                  className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${formData.urgency === option.value ? `border-[${option.color}]` : 'border-white/10'}`}
                  style={{
                    backgroundColor:
                    formData.urgency === option.value ?
                    `${option.color}20` :
                    '#0A0E1A',
                    color:
                    formData.urgency === option.value ?
                    option.color :
                    '#9CA3AF',
                    borderColor:
                    formData.urgency === option.value ?
                    option.color :
                    'rgba(255,255,255,0.1)'
                  }}
                  onClick={() =>
                  setFormData({
                    ...formData,
                    urgency: option.value
                  })
                  }
                  whileTap={{
                    scale: 0.95
                  }}>
                  
                      {option.label}
                    </motion.button>
                )}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
              whileTap={{
                scale: 0.98
              }}>
              
                <Plus className="w-5 h-5" />
                Create Order
              </motion.button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}