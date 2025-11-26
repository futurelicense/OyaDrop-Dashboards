import React from 'react';
import { motion } from 'framer-motion';
import { SmartphoneIcon, ShirtIcon, CoffeeIcon, BookOpenIcon, HomeIcon, DumbbellIcon, MoreHorizontalIcon } from 'lucide-react';
const categories = [{
  id: 'electronics',
  name: 'Electronics',
  icon: SmartphoneIcon,
  color: '#00d9ff'
}, {
  id: 'clothing',
  name: 'Clothing',
  icon: ShirtIcon,
  color: '#ff00ff'
}, {
  id: 'food',
  name: 'Food & Beverages',
  icon: CoffeeIcon,
  color: '#00ffcc'
}, {
  id: 'books',
  name: 'Books',
  icon: BookOpenIcon,
  color: '#ffb800'
}, {
  id: 'home',
  name: 'Home & Garden',
  icon: HomeIcon,
  color: '#00ff88'
}, {
  id: 'sports',
  name: 'Sports',
  icon: DumbbellIcon,
  color: '#ff6b6b'
}, {
  id: 'others',
  name: 'Others',
  icon: MoreHorizontalIcon,
  color: '#a0a0b0'
}];
export function CategoryNav() {
  return <div className="px-5 py-6">
      <motion.h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        Categories
      </motion.h2>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category, index) => {
        const Icon = category.icon;
        return <motion.button key={category.id} className="flex-shrink-0 flex flex-col items-center gap-2 group" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.05
        }} whileTap={{
          scale: 0.95
        }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{
            backgroundColor: `${category.color}20`,
            border: `1px solid ${category.color}30`
          }}>
                <Icon className="w-7 h-7" style={{
              color: category.color
            }} />
              </div>
              <span className="text-xs text-gray-300 text-center max-w-[70px] leading-tight">
                {category.name}
              </span>
            </motion.button>;
      })}
      </div>
    </div>;
}