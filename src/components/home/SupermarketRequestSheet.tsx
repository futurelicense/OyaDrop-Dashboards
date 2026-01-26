import React, { useState } from 'react';
import { ShoppingCart, Clock } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface SupermarketRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {items: string;urgency: string;}) => void;
}
export function SupermarketRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: SupermarketRequestSheetProps) {
  const [items, setItems] = useState('');
  const [urgency, setUrgency] = useState('normal');
  const handleSubmit = () => {
    onSubmit({
      items,
      urgency
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Supermarket Request"
      subtitle="Grocery shopping"
      color="#10B981"
      icon={<ShoppingCart className="w-6 h-6 text-green-400" />}
      onSubmit={handleSubmit}
      submitLabel="Browse Supermarket">

      <div className="space-y-6">
        {/* Shopping List */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Shopping List
          </label>
          <textarea
            placeholder="e.g., Rice, Tomatoes, Eggs, Bread..."
            value={items}
            onChange={(e) => setItems(e.target.value)}
            rows={6}
            className="w-full bg-[#0A0E1A] text-white px-4 py-3 rounded-xl border border-white/10 focus:border-green-500/50 focus:outline-none placeholder:text-gray-500 resize-none" />

          <p className="text-xs text-gray-500 mt-2">
            List items you need, one per line
          </p>
        </div>

        {/* Delivery Time */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            When do you need it?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
            {
              value: 'normal',
              label: 'Today',
              time: '2-4 hrs'
            },
            {
              value: 'urgent',
              label: 'ASAP',
              time: '< 1 hr'
            },
            {
              value: 'scheduled',
              label: 'Schedule',
              time: 'Pick time'
            }].
            map((option) =>
            <motion.button
              key={option.value}
              className={`p-3 rounded-xl border-2 transition-all ${urgency === option.value ? 'bg-green-500/20 border-green-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setUrgency(option.value)}
              whileTap={{
                scale: 0.98
              }}>

                <Clock
                className={`w-5 h-5 mx-auto mb-1 ${urgency === option.value ? 'text-green-400' : 'text-gray-400'}`} />

                <p
                className={`text-xs font-semibold ${urgency === option.value ? 'text-white' : 'text-gray-400'}`}>

                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </ServiceRequestSheet>);

}