import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XIcon, MinusIcon, PlusIcon, TrashIcon, ShoppingBagIcon } from 'lucide-react';
import { CartItem } from '../../hooks/useCart';
interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}
export function CartDrawer({
  isOpen,
  onClose,
  items,
  total,
  onUpdateQuantity,
  onRemoveItem
}: CartDrawerProps) {
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Drawer */}
          <motion.div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#0a1a1f] z-[70] shadow-2xl flex flex-col" initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 25,
        stiffness: 200
      }}>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#00ffcc]/20 rounded-xl flex items-center justify-center">
                  <ShoppingBagIcon className="w-5 h-5 text-[#00ffcc]" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">
                    Shopping Cart
                  </h2>
                  <p className="text-xs text-gray-400">{items.length} items</p>
                </div>
              </div>
              <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <XIcon className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 bg-[#1a2a2f] rounded-full flex items-center justify-center mb-4">
                    <ShoppingBagIcon className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-400 mb-2">Your cart is empty</p>
                  <p className="text-sm text-gray-500">
                    Add items to get started
                  </p>
                </div> : <div className="space-y-4">
                  {items.map(item => <motion.div key={item.id} className="bg-[#1a2a2f] rounded-xl p-4 border border-white/10" layout initial={{
              opacity: 0,
              x: 20
            }} animate={{
              opacity: 1,
              x: 0
            }} exit={{
              opacity: 0,
              x: -20
            }}>
                      <div className="flex gap-4">
                        <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover bg-[#0f1f24]" />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-400 mb-2">
                            {item.storeName}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-base font-bold text-[#00ffcc]">
                              ₦{(item.price * item.quantity).toLocaleString()}
                            </span>
                            <div className="flex items-center gap-2">
                              <motion.button className="w-7 h-7 bg-[#0f1f24] rounded-lg flex items-center justify-center" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} whileTap={{
                        scale: 0.9
                      }}>
                                <MinusIcon className="w-4 h-4 text-white" />
                              </motion.button>
                              <span className="text-sm font-medium text-white w-6 text-center">
                                {item.quantity}
                              </span>
                              <motion.button className="w-7 h-7 bg-[#00ffcc]/20 rounded-lg flex items-center justify-center" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} whileTap={{
                        scale: 0.9
                      }}>
                                <PlusIcon className="w-4 h-4 text-[#00ffcc]" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                        <motion.button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors" onClick={() => onRemoveItem(item.id)} whileTap={{
                  scale: 0.9
                }}>
                          <TrashIcon className="w-5 h-5 text-red-400" />
                        </motion.button>
                      </div>
                    </motion.div>)}
                </div>}
            </div>

            {/* Footer */}
            {items.length > 0 && <div className="border-t border-white/10 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-bold text-white">
                    ₦{total.toLocaleString()}
                  </span>
                </div>
                <motion.button className="w-full bg-gradient-to-r from-[#00ffcc] to-[#00d9ff] text-black font-bold py-4 rounded-xl shadow-lg" whileTap={{
            scale: 0.98
          }}>
                  Proceed to Checkout
                </motion.button>
              </div>}
          </motion.div>
        </>}
    </AnimatePresence>;
}