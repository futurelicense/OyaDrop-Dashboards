import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
interface UpdateStatusSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
const statuses = [
{
  id: 'pickup',
  label: 'Awaiting Pickup',
  color: '#00D9C0',
  icon: '📦'
},
{
  id: 'sorting',
  label: 'Sorting',
  color: '#FFB800',
  icon: '🔍'
},
{
  id: 'washing',
  label: 'Washing',
  color: '#00F0FF',
  icon: '💧'
},
{
  id: 'ironing',
  label: 'Ironing',
  color: '#B026FF',
  icon: '🌬️'
},
{
  id: 'packaging',
  label: 'Packaging',
  color: '#10B981',
  icon: '📦'
},
{
  id: 'delivery',
  label: 'Ready for Delivery',
  color: '#FF6B00',
  icon: '🚚'
}];

export function UpdateStatusSheet({ isOpen, onClose }: UpdateStatusSheetProps) {
  const [selectedStatus, setSelectedStatus] = useState('washing');
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
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[75vh] flex flex-col"
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
                <h2 className="text-xl font-bold text-white">Update Status</h2>
                <p className="text-sm text-gray-400">Order #LND-2846</p>
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

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-3">
              {statuses.map((status, index) =>
            <motion.button
              key={status.id}
              className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedStatus === status.id ? 'border-2' : 'border-white/10'}`}
              style={{
                backgroundColor:
                selectedStatus === status.id ?
                `${status.color}20` :
                '#0A0E1A',
                borderColor:
                selectedStatus === status.id ?
                status.color :
                'rgba(255,255,255,0.1)'
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
              onClick={() => setSelectedStatus(status.id)}>
              
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{status.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-white">
                        {status.label}
                      </p>
                    </div>
                    {selectedStatus === status.id &&
                <Check
                  className="w-5 h-5"
                  style={{
                    color: status.color
                  }} />

                }
                  </div>
                </motion.button>
            )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl shadow-lg"
              whileTap={{
                scale: 0.98
              }}>
              
                Update Status
              </motion.button>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

}