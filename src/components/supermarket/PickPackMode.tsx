import React, { useState } from 'react';
import { motion, PanInfo } from 'framer-motion';
import { ArrowLeft, Check, X, RefreshCw, MessageCircle } from 'lucide-react';
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  stock: number;
  image: string;
  status: 'pending' | 'found' | 'unavailable' | 'substituted';
}
const mockItems: OrderItem[] = [
{
  id: '1',
  name: 'Fresh Tomatoes',
  quantity: 3,
  stock: 45,
  image:
  'https://images.unsplash.com/photo-1546470427-227e2e1f2a3b?w=200&h=200&fit=crop',
  status: 'pending'
},
{
  id: '2',
  name: 'Rice 5kg',
  quantity: 2,
  stock: 12,
  image:
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
  status: 'pending'
},
{
  id: '3',
  name: 'Cooking Oil 1L',
  quantity: 1,
  stock: 3,
  image:
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
  status: 'pending'
},
{
  id: '4',
  name: 'Fresh Bread',
  quantity: 2,
  stock: 0,
  image:
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
  status: 'pending'
}];

interface PickPackModeProps {
  orderNumber: string;
  onBack: () => void;
  onComplete: () => void;
  onSubstitute: (item: OrderItem) => void;
}
export function PickPackMode({
  orderNumber,
  onBack,
  onComplete,
  onSubstitute
}: PickPackModeProps) {
  const [items, setItems] = useState(mockItems);
  const updateItemStatus = (id: string, status: 'found' | 'unavailable') => {
    setItems((prev) =>
    prev.map((item) =>
    item.id === id ?
    {
      ...item,
      status
    } :
    item
    )
    );
  };
  const handleSwipe = (id: string, direction: 'left' | 'right') => {
    if (direction === 'left') {
      updateItemStatus(id, 'found');
    } else if (direction === 'right') {
      updateItemStatus(id, 'unavailable');
    }
  };
  const foundCount = items.filter((i) => i.status === 'found').length;
  const totalCount = items.length;
  const progress = foundCount / totalCount * 100;
  return (
    <div className="flex flex-col h-screen bg-[#0A0E1A]">
      {/* Header */}
      <div className="p-4 bg-[#131B2E] border-b border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <motion.button
            className="p-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={onBack}
            whileTap={{
              scale: 0.95
            }}>

            <ArrowLeft className="w-6 h-6 text-white" />
          </motion.button>
          <div>
            <h2 className="text-lg font-bold text-white">Pick & Pack</h2>
            <p className="text-sm text-gray-400">{orderNumber}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className="text-white font-bold">
              {foundCount} of {totalCount} items
            </span>
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
                type: 'spring',
                damping: 20
              }} />

          </div>
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {items.map((item, index) =>
        <motion.div
          key={item.id}
          className={`bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border-2 ${item.status === 'found' ? 'border-green-500' : item.status === 'unavailable' ? 'border-red-500' : 'border-white/10'}`}
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
          drag="x"
          dragConstraints={{
            left: 0,
            right: 0
          }}
          dragElastic={0.2}
          onDragEnd={(e, info: PanInfo) => {
            if (info.offset.x < -100) handleSwipe(item.id, 'left');
            if (info.offset.x > 100) handleSwipe(item.id, 'right');
          }}>

            <div className="flex items-center gap-3 p-4">
              {/* Image */}
              <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover" />


              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-white mb-1">
                  {item.name}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>Qty: {item.quantity}</span>
                  <span>Stock: {item.stock}</span>
                </div>
                {item.stock === 0 &&
              <span className="inline-block mt-1 text-xs font-bold text-red-400">
                    Out of Stock
                  </span>
              }
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                className="p-3 bg-green-500/20 border border-green-500/30 rounded-xl"
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => updateItemStatus(item.id, 'found')}>

                  <Check className="w-5 h-5 text-green-400" />
                </motion.button>
                <motion.button
                className="p-3 bg-red-500/20 border border-red-500/30 rounded-xl"
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => updateItemStatus(item.id, 'unavailable')}>

                  <X className="w-5 h-5 text-red-400" />
                </motion.button>
                <motion.button
                className="p-3 bg-cyan-500/20 border border-cyan-500/30 rounded-xl"
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => onSubstitute(item)}>

                  <RefreshCw className="w-5 h-5 text-cyan-400" />
                </motion.button>
              </div>
            </div>

            {/* Status Indicator */}
            {item.status !== 'pending' &&
          <div
            className={`px-4 py-2 text-center text-sm font-bold ${item.status === 'found' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>

                {item.status === 'found' ? '✓ Found' : '✗ Not Available'}
              </div>
          }
          </motion.div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="p-4 bg-[#131B2E] border-t border-white/10 space-y-2">
        <motion.button
          className="w-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
          whileTap={{
            scale: 0.98
          }}>

          <MessageCircle className="w-5 h-5" />
          Chat with Customer
        </motion.button>
        <motion.button
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-4 rounded-xl"
          whileTap={{
            scale: 0.98
          }}
          onClick={onComplete}>

          Complete Picking ({foundCount}/{totalCount})
        </motion.button>
      </div>
    </div>);

}