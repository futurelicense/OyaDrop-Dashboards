import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, ShoppingCart, Star } from 'lucide-react';
export interface KioskProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}
interface KioskProductCardProps {
  product: KioskProduct;
  index?: number;
}
export function KioskProductCard({
  product,
  index = 0
}: KioskProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  return <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.1
  }} whileHover={{
    y: -4,
    borderColor: '#00D9C040'
  }}>
      {/* Image */}
      <div className="relative aspect-square overflow-hidden group">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />

        {/* Discount Badge */}
        {product.discount && <div className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 px-3 py-1.5 rounded-xl font-bold text-xs text-white shadow-lg">
            -{product.discount}% OFF
          </div>}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <motion.button className="w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center" onClick={() => setIsWishlisted(!isWishlisted)} whileTap={{
          scale: 0.9
        }}>
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-white'}`} />
          </motion.button>

          <motion.button className="w-9 h-9 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center" whileTap={{
          scale: 0.9
        }}>
            <Eye className="w-4 h-4 text-white" />
          </motion.button>
        </div>

        {/* Stock Status */}
        {!product.inStock && <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white font-bold text-sm">Out of Stock</span>
          </div>}
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-xs text-cyan-400 font-semibold mb-1">
          {product.category}
        </p>
        <h3 className="text-sm font-bold text-white line-clamp-2 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-white">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-xl font-bold text-cyan-400">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && <span className="text-sm text-gray-500 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>}
        </div>

        {/* Add to Cart */}
        <motion.button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" whileHover={{
        scale: product.inStock ? 1.02 : 1
      }} whileTap={{
        scale: product.inStock ? 0.98 : 1
      }} disabled={!product.inStock}>
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>;
}