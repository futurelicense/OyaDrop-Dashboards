import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}
const mockMenu: MenuItem[] = [{
  id: '1',
  name: 'Jollof Rice Combo',
  description: 'Spicy jollof rice with chicken and plantain',
  price: 2500,
  image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  category: 'Main Course'
}, {
  id: '2',
  name: 'Chicken & Chips',
  description: 'Crispy fried chicken with seasoned fries',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop',
  category: 'Main Course'
}, {
  id: '3',
  name: 'Fried Rice Special',
  description: 'Vegetable fried rice with beef',
  price: 2800,
  image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
  category: 'Main Course'
}];
interface ViewMenuSheetProps {
  isOpen: boolean;
  onClose: () => void;
  restaurantName: string;
}
export function ViewMenuSheet({
  isOpen,
  onClose,
  restaurantName
}: ViewMenuSheetProps) {
  const [cart, setCart] = useState<Record<string, number>>({});
  const addToCart = (itemId: string) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };
  const removeFromCart = (itemId: string) => {
    setCart(prev => {
      const newCart = {
        ...prev
      };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };
  const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = mockMenu.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);
  return <AnimatePresence>
      {isOpen && <>
          {/* Backdrop */}
          <motion.div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} />

          {/* Bottom Sheet */}
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[85vh] flex flex-col" initial={{
        y: '100%'
      }} animate={{
        y: 0
      }} exit={{
        y: '100%'
      }} transition={{
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
                <h2 className="text-xl font-bold text-white">
                  {restaurantName}
                </h2>
                <p className="text-sm text-gray-400">Menu</p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <div className="space-y-4">
                {mockMenu.map((item, index) => <motion.div key={item.id} className="bg-[#0A0E1A] rounded-2xl overflow-hidden border border-white/10" initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: index * 0.1
            }}>
                    <div className="flex gap-4 p-4">
                      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 mb-2">
                          {item.description}
                        </p>
                        <p className="text-lg font-bold text-cyan-400">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Add to Cart */}
                    <div className="px-4 pb-4">
                      {cart[item.id] ? <div className="flex items-center justify-between bg-cyan-500/20 border border-cyan-500/30 rounded-xl p-2">
                          <motion.button className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center" whileTap={{
                    scale: 0.9
                  }} onClick={() => removeFromCart(item.id)}>
                            <Minus className="w-4 h-4 text-white" />
                          </motion.button>
                          <span className="text-white font-bold">
                            {cart[item.id]}
                          </span>
                          <motion.button className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center" whileTap={{
                    scale: 0.9
                  }} onClick={() => addToCart(item.id)}>
                            <Plus className="w-4 h-4 text-white" />
                          </motion.button>
                        </div> : <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2" whileTap={{
                  scale: 0.98
                }} onClick={() => addToCart(item.id)}>
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </motion.button>}
                    </div>
                  </motion.div>)}
              </div>
            </div>

            {/* Cart Footer */}
            {totalItems > 0 && <motion.div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]" initial={{
          y: 100
        }} animate={{
          y: 0
        }}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-400">{totalItems} items</p>
                    <p className="text-xl font-bold text-white">
                      ₦{totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <motion.button className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg flex items-center gap-2" whileTap={{
              scale: 0.98
            }}>
                    <ShoppingCart className="w-5 h-5" />
                    Send Order
                  </motion.button>
                </div>
              </motion.div>}
          </motion.div>
        </>}
    </AnimatePresence>;
}