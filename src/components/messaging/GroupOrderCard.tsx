import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, ShoppingCart, Check } from 'lucide-react';
interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  order?: string;
  price?: number;
  confirmed: boolean;
}
interface GroupOrderCardProps {
  restaurant: string;
  organizer: string;
  deadline?: string;
}
export function GroupOrderCard({
  restaurant,
  organizer,
  deadline
}: GroupOrderCardProps) {
  const [members, setMembers] = useState<GroupMember[]>([{
    id: '1',
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    order: 'Jollof Rice Combo',
    price: 2500,
    confirmed: true
  }, {
    id: '2',
    name: 'Chioma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    order: 'Chicken & Chips',
    price: 3200,
    confirmed: true
  }, {
    id: '3',
    name: 'Tunde',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    confirmed: false
  }]);
  const totalPrice = members.reduce((sum, m) => sum + (m.price || 0), 0);
  const confirmedCount = members.filter(m => m.confirmed).length;
  return <motion.div className="max-w-[85%] bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl rounded-bl-sm p-4 border border-purple-500/30" initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    type: 'spring',
    damping: 20
  }}>
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
        <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
          <Users className="w-5 h-5 text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-white">Group Order</h3>
          <p className="text-xs text-gray-400">{restaurant}</p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Organized by</span>
          <span className="text-white font-semibold">{organizer}</span>
        </div>
        {deadline && <div className="flex justify-between text-xs">
            <span className="text-gray-400">Order deadline</span>
            <span className="text-orange-400 font-semibold">{deadline}</span>
          </div>}
        <div className="flex justify-between text-xs">
          <span className="text-gray-400">Participants</span>
          <span className="text-white font-semibold">
            {confirmedCount}/{members.length} confirmed
          </span>
        </div>
      </div>

      {/* Members */}
      <div className="space-y-2 mb-3">
        {members.map((member, index) => <motion.div key={member.id} className="flex items-center gap-2 p-2 bg-[#0A0E1A]/50 rounded-lg" initial={{
        opacity: 0,
        x: -10
      }} animate={{
        opacity: 1,
        x: 0
      }} transition={{
        delay: index * 0.05
      }}>
            <img src={member.avatar} alt={member.name} className="w-8 h-8 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white">{member.name}</p>
              {member.order ? <p className="text-xs text-gray-400 truncate">
                  {member.order} • ₦{member.price?.toLocaleString()}
                </p> : <p className="text-xs text-gray-500 italic">Not ordered yet</p>}
            </div>
            {member.confirmed && <Check className="w-4 h-4 text-green-400 flex-shrink-0" />}
          </motion.div>)}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-xl mb-3">
        <span className="text-sm font-bold text-white">Total</span>
        <span className="text-lg font-bold text-purple-400">
          ₦{totalPrice.toLocaleString()}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <motion.button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white font-semibold text-sm" whileTap={{
        scale: 0.98
      }}>
          <Plus className="w-4 h-4" />
          Add Item
        </motion.button>
        <motion.button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white font-semibold text-sm shadow-lg" whileTap={{
        scale: 0.98
      }}>
          <ShoppingCart className="w-4 h-4" />
          Place Order
        </motion.button>
      </div>

      <p className="text-xs text-gray-500 text-center mt-2">
        Split payment will be processed automatically
      </p>
    </motion.div>;
}