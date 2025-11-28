import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid, List, ShoppingBag } from 'lucide-react';
import { KioskProductCard, KioskProduct } from './KioskProductCard';
const mockProducts: KioskProduct[] = [{
  id: '1',
  name: 'Premium Wireless Headphones',
  category: 'Electronics',
  price: 45000,
  originalPrice: 65000,
  discount: 30,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
  rating: 4.8,
  reviews: 234,
  inStock: true
}, {
  id: '2',
  name: 'Designer Cotton T-Shirt',
  category: 'Clothing',
  price: 8500,
  originalPrice: 12000,
  discount: 29,
  image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
  rating: 4.6,
  reviews: 156,
  inStock: true
}, {
  id: '3',
  name: 'Smart Watch Series 7',
  category: 'Electronics',
  price: 125000,
  image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
  rating: 4.9,
  reviews: 412,
  inStock: true
}, {
  id: '4',
  name: 'Luxury Handbag',
  category: 'Accessories',
  price: 35000,
  originalPrice: 50000,
  discount: 30,
  image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=500&fit=crop',
  rating: 4.7,
  reviews: 89,
  inStock: false
}];
export function KioskProductGrid() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [cartCount] = useState(3);
  return <div className="px-4 py-6 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-bold text-white">Products</h2>
          <p className="text-sm text-gray-400">{mockProducts.length} items</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 bg-[#131B2E] rounded-xl p-1 border border-white/10">
          <motion.button className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400'}`} onClick={() => setViewMode('grid')} whileTap={{
          scale: 0.95
        }}>
            <Grid className="w-4 h-4" />
          </motion.button>

          <motion.button className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400'}`} onClick={() => setViewMode('list')} whileTap={{
          scale: 0.95
        }}>
            <List className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'space-y-3'}>
        {mockProducts.map((product, index) => <KioskProductCard key={product.id} product={product} index={index} />)}
      </div>

      {/* Floating Cart Bubble */}
      {cartCount > 0 && <motion.button className="fixed bottom-6 right-4 w-14 h-14 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-full shadow-2xl shadow-cyan-500/50 flex items-center justify-center z-50" whileHover={{
      scale: 1.1
    }} whileTap={{
      scale: 0.9
    }} initial={{
      scale: 0
    }} animate={{
      scale: 1
    }} transition={{
      type: 'spring',
      damping: 15
    }}>
          <ShoppingBag className="w-6 h-6 text-white" />
          <motion.span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full text-white text-xs font-bold flex items-center justify-center" animate={{
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2
      }}>
            {cartCount}
          </motion.span>
        </motion.button>}
    </div>;
}