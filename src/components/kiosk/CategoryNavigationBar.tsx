import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal } from 'lucide-react';
const categories = [{
  id: 'all',
  label: 'All',
  icon: '🏪'
}, {
  id: 'clothing',
  label: 'Clothing',
  icon: '👕'
}, {
  id: 'electronics',
  label: 'Electronics',
  icon: '📱'
}, {
  id: 'food',
  label: 'Food & Beverages',
  icon: '🍔'
}, {
  id: 'beauty',
  label: 'Beauty',
  icon: '💄'
}, {
  id: 'home',
  label: 'Home Items',
  icon: '🏠'
}, {
  id: 'health',
  label: 'Health',
  icon: '💊'
}, {
  id: 'accessories',
  label: 'Accessories',
  icon: '👜'
}, {
  id: 'wholesale',
  label: 'Wholesale',
  icon: '📦'
}];
interface CategoryNavigationBarProps {
  onFilterClick: () => void;
}
export function CategoryNavigationBar({
  onFilterClick
}: CategoryNavigationBarProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  return <div className="sticky top-0 z-40 bg-[#0A0E1A]/95 backdrop-blur-xl border-b border-cyan-500/20 py-4">
      <div className="px-4">
        {/* Search & Filter */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." className="w-full bg-[#131B2E] text-white pl-10 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500 text-sm" />
          </div>

          <motion.button className="p-3 bg-[#131B2E] rounded-xl border border-white/10 hover:border-cyan-500/50 transition-colors" onClick={onFilterClick} whileTap={{
          scale: 0.95
        }}>
            <SlidersHorizontal className="w-5 h-5 text-gray-400" />
          </motion.button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category, index) => {
          const isActive = activeCategory === category.id;
          return <motion.button key={category.id} className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-[#131B2E] text-gray-400 border border-white/10'}`} onClick={() => setActiveCategory(category.id)} initial={{
            opacity: 0,
            x: -20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: index * 0.05
          }} whileTap={{
            scale: 0.95
          }}>
                <span className="text-base">{category.icon}</span>
                {category.label}
              </motion.button>;
        })}
        </div>
      </div>
    </div>;
}