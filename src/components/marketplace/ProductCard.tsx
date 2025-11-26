import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, PlusIcon, HeartIcon, ZapIcon, TruckIcon } from 'lucide-react';
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  storeName: string;
  discount?: number;
  stock?: number;
  fastDelivery?: boolean;
  trending?: boolean;
}
interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  index?: number;
}
export function ProductCard({
  product,
  onAddToCart,
  index = 0
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercent = product.originalPrice ? Math.round((product.originalPrice - product.price) / product.originalPrice * 100) : 0;
  const lowStock = product.stock && product.stock <= 5;
  return <motion.div className="bg-[#1a2a2f] rounded-2xl overflow-hidden border border-white/10 group relative" initial={{
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
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0f1f24]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercent > 0 && <motion.div className="bg-[#ff00ff] text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg" initial={{
          scale: 0,
          rotate: -12
        }} animate={{
          scale: 1,
          rotate: 0
        }} transition={{
          delay: 0.2 + index * 0.05,
          type: 'spring'
        }}>
              -{discountPercent}%
            </motion.div>}
          {product.trending && <motion.div className="bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded-lg shadow-lg flex items-center gap-1" initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          delay: 0.3 + index * 0.05,
          type: 'spring'
        }}>
              <ZapIcon className="w-3 h-3" />
              Trending
            </motion.div>}
        </div>

        {/* Wishlist */}
        <motion.button className="absolute top-2 right-2 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center" onClick={e => {
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
      }} whileTap={{
        scale: 0.9
      }}>
          <AnimatePresence mode="wait">
            {isWishlisted ? <motion.div key="filled" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                <HeartIcon className="w-4 h-4 fill-[#ff00ff] text-[#ff00ff]" />
              </motion.div> : <motion.div key="outline" initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} exit={{
            scale: 0
          }}>
                <HeartIcon className="w-4 h-4 text-white" />
              </motion.div>}
          </AnimatePresence>
        </motion.button>

        {/* Add to Cart */}
        <motion.button className="absolute bottom-2 right-2 w-10 h-10 bg-[#00ffcc] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" onClick={onAddToCart} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.1
      }}>
          <PlusIcon className="w-5 h-5 text-black" />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-gray-400">{product.storeName}</p>
          {product.fastDelivery && <div className="flex items-center gap-1 text-[#00ffcc]">
              <TruckIcon className="w-3 h-3" />
              <span className="text-[10px] font-medium">Fast</span>
            </div>}
        </div>

        <h3 className="text-sm font-semibold text-white mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <StarIcon className="w-3.5 h-3.5 fill-[#ffb800] text-[#ffb800]" />
          <span className="text-xs text-white font-medium">
            {product.rating}
          </span>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Stock Warning */}
        {lowStock && <motion.p className="text-xs text-[#ff6b6b] font-medium mb-2" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }}>
            Only {product.stock} left!
          </motion.p>}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-[#00ffcc]">
            ₦{product.price.toLocaleString()}
          </span>
          {product.originalPrice && <span className="text-sm text-gray-500 line-through">
              ₦{product.originalPrice.toLocaleString()}
            </span>}
        </div>
      </div>
    </motion.div>;
}