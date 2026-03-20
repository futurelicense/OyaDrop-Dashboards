import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Search, Filter } from 'lucide-react';
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  available: boolean;
}
const mockProducts: Product[] = [
{
  id: '1',
  name: 'Fresh Tomatoes',
  price: 500,
  stock: 45,
  image:
  'https://images.unsplash.com/photo-1546470427-227e2e1f2a3b?w=200&h=200&fit=crop',
  available: true
},
{
  id: '2',
  name: 'Rice 5kg',
  price: 3500,
  stock: 12,
  image:
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop',
  available: true
},
{
  id: '3',
  name: 'Cooking Oil 1L',
  price: 1200,
  stock: 3,
  image:
  'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
  available: true
},
{
  id: '4',
  name: 'Fresh Bread',
  price: 800,
  stock: 0,
  image:
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
  available: false
}];

export function ProductGrid() {
  const [products, setProducts] = useState(mockProducts);
  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
    prev.map((p) =>
    p.id === id ?
    {
      ...p,
      available: !p.available
    } :
    p
    )
    );
  };
  return (
    <div className="flex flex-col h-full bg-[#0A0E1A]">
      {/* Search & Filter Bar */}
      <div className="p-4 space-y-3 border-b border-white/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-[#131B2E] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
          
        </div>
        <div className="flex gap-2">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-[#131B2E] border border-white/10 rounded-xl text-white text-sm font-semibold"
            whileTap={{
              scale: 0.95
            }}>
            
            <Filter className="w-4 h-4" />
            Filter
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-xl text-cyan-400 text-sm font-semibold"
            whileTap={{
              scale: 0.95
            }}>
            
            Batch Edit
          </motion.button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {products.map((product, index) =>
          <motion.div
            key={product.id}
            className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-2xl overflow-hidden border border-white/10"
            initial={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            transition={{
              delay: index * 0.05
            }}>
            
              {/* Image */}
              <div className="relative aspect-square">
                <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover" />
              
                {!product.available &&
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                      Unavailable
                    </span>
                  </div>
              }
                {product.stock <= 5 && product.stock > 0 &&
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    Low Stock
                  </div>
              }
                {product.stock === 0 &&
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    Out of Stock
                  </div>
              }
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm font-bold text-white mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-cyan-400 mb-2">
                  ₦{product.price.toLocaleString()}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">
                    Stock: {product.stock}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-colors ${product.available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'}`}
                  whileTap={{
                    scale: 0.95
                  }}
                  onClick={() => toggleAvailability(product.id)}>
                  
                    {product.available ? 'Available' : 'Unavailable'}
                  </motion.button>
                  <motion.button
                  className="p-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg"
                  whileTap={{
                    scale: 0.95
                  }}>
                  
                    <Edit2 className="w-4 h-4 text-cyan-400" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>);

}