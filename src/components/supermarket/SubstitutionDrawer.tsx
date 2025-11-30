import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check } from 'lucide-react';
interface Substitute {
  id: string;
  name: string;
  price: number;
  priceDifference: number;
  stock: number;
  image: string;
}
const mockSubstitutes: Substitute[] = [{
  id: '1',
  name: 'Organic Tomatoes',
  price: 600,
  priceDifference: 100,
  stock: 30,
  image: 'https://images.unsplash.com/photo-1546470427-227e2e1f2a3b?w=200&h=200&fit=crop'
}, {
  id: '2',
  name: 'Cherry Tomatoes',
  price: 550,
  priceDifference: 50,
  stock: 25,
  image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=200&h=200&fit=crop'
}, {
  id: '3',
  name: 'Roma Tomatoes',
  price: 500,
  priceDifference: 0,
  stock: 40,
  image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?w=200&h=200&fit=crop'
}];
interface SubstitutionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  originalItem: {
    name: string;
    price: number;
  };
}
export function SubstitutionDrawer({
  isOpen,
  onClose,
  originalItem
}: SubstitutionDrawerProps) {
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

          {/* Drawer */}
          <motion.div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-[#131B2E] to-[#0A0E1A] rounded-t-3xl z-[90] max-h-[75vh] flex flex-col" initial={{
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
                  Suggest Substitute
                </h2>
                <p className="text-sm text-gray-400">
                  For: {originalItem.name}
                </p>
              </div>
              <motion.button className="p-2 rounded-xl hover:bg-white/5 transition-colors" onClick={onClose} whileTap={{
            scale: 0.95
          }}>
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Substitutes List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {mockSubstitutes.map((substitute, index) => <motion.button key={substitute.id} className="w-full bg-[#0A0E1A] rounded-2xl p-4 border border-white/10 text-left" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.05
          }} whileTap={{
            scale: 0.98
          }}>
                  <div className="flex items-center gap-3">
                    <img src={substitute.image} alt={substitute.name} className="w-20 h-20 rounded-xl object-cover" />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1">
                        {substitute.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg font-bold text-cyan-400">
                          ₦{substitute.price}
                        </span>
                        {substitute.priceDifference !== 0 && <span className={`text-xs font-bold ${substitute.priceDifference > 0 ? 'text-orange-400' : 'text-green-400'}`}>
                            {substitute.priceDifference > 0 ? '+' : ''}₦
                            {substitute.priceDifference}
                          </span>}
                      </div>
                      <span className="text-xs text-gray-400">
                        Stock: {substitute.stock}
                      </span>
                    </div>

                    <motion.div className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl" whileTap={{
                scale: 0.9
              }}>
                      <Check className="w-5 h-5 text-cyan-400" />
                    </motion.div>
                  </div>
                </motion.button>)}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-white/10 bg-[#0A0E1A]">
              <motion.button className="w-full bg-red-500/20 border border-red-500/30 text-red-400 font-bold py-3 rounded-xl" whileTap={{
            scale: 0.98
          }} onClick={onClose}>
                Skip - Mark as Unavailable
              </motion.button>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}