import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Zap, Clock, Plus, Heart } from 'lucide-react';
export interface FastFoodItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  restaurant: string;
  xpReward: number;
  deliveryTime: string;
  badges?: ('new' | 'hot' | 'bestseller' | 'fast')[];
  spiceLevel?: number;
  calories?: number;
  collected?: boolean;
}
interface FastFoodCardProps {
  item: FastFoodItem;
  onAddToCart: () => void;
  index?: number;
}
export function FastFoodCard({
  item,
  onAddToCart,
  index = 0
}: FastFoodCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showXPBurst, setShowXPBurst] = useState(false);
  const handleAddToCart = () => {
    setShowXPBurst(true);
    setTimeout(() => setShowXPBurst(false), 1000);
    onAddToCart();
  };
  const discountPercent = item.originalPrice ? Math.round((item.originalPrice - item.price) / item.originalPrice * 100) : 0;
  return <motion.div className="relative bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.05
  }} whileHover={{
    y: -4,
    borderColor: 'rgba(0, 255, 204, 0.3)'
  }}>
      {/* XP Burst Animation */}
      {showXPBurst && <motion.div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none" initial={{
      scale: 0,
      opacity: 1
    }} animate={{
      scale: 2,
      opacity: 0
    }} transition={{
      duration: 0.6
    }}>
          <div className="text-4xl font-bold text-yellow-400">
            +{item.xpReward} XP
          </div>
        </motion.div>}

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0E1A]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {discountPercent > 0 && <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
              -{discountPercent}%
            </div>}
          {item.badges?.includes('new') && <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
              NEW
            </div>}
          {item.badges?.includes('hot') && <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <Flame className="w-3 h-3" />
              HOT
            </div>}
          {item.badges?.includes('bestseller') && <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-black" />
              BESTSELLER
            </div>}
          {item.badges?.includes('fast') && <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {item.deliveryTime}
            </div>}
        </div>

        {/* Like Button */}
        <motion.button className="absolute top-2 right-2 w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center" onClick={() => setIsLiked(!isLiked)} whileTap={{
        scale: 0.9
      }}>
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </motion.button>

        {/* XP Reward Badge */}
        <div className="absolute bottom-2 left-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1">
          <Zap className="w-3 h-3 fill-black" />+{item.xpReward} XP
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs text-gray-400">{item.restaurant}</p>
          {item.collected && <span className="text-xs text-cyan-400 font-semibold">
              ✓ Collected
            </span>}
        </div>

        <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 leading-tight">
          {item.name}
        </h3>

        {/* Rating & Details */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            <span className="text-xs text-white font-semibold">
              {item.rating}
            </span>
            <span className="text-xs text-gray-500">({item.reviews})</span>
          </div>
          {item.spiceLevel && <div className="flex items-center gap-1">
              {[...Array(3)].map((_, i) => <Flame key={i} className={`w-3 h-3 ${i < item.spiceLevel! ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />)}
            </div>}
          {item.calories && <span className="text-xs text-gray-400">{item.calories} cal</span>}
        </div>

        {/* Price & Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-cyan-400">
              ₦{item.price.toLocaleString()}
            </span>
            {item.originalPrice && <span className="text-sm text-gray-500 line-through ml-2">
                ₦{item.originalPrice.toLocaleString()}
              </span>}
          </div>

          <motion.button className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30" onClick={handleAddToCart} whileHover={{
          scale: 1.1
        }} whileTap={{
          scale: 0.9
        }}>
            <Plus className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>;
}