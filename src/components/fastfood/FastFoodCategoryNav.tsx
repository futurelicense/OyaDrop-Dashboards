import React, { useState } from 'react';
import { motion } from 'framer-motion';
const categories = [{
  id: 'rice',
  name: 'Rice & Stew',
  emoji: '🍚',
  xpBoost: '+25 XP',
  color: '#FF6B00'
}, {
  id: 'chicken',
  name: 'Chicken',
  emoji: '🍗',
  xpBoost: '+20 XP',
  color: '#FFB800'
}, {
  id: 'shawarma',
  name: 'Shawarma',
  emoji: '🌯',
  xpBoost: '+18 XP',
  color: '#00D9C0'
}, {
  id: 'suya',
  name: 'Suya',
  emoji: '🥩',
  xpBoost: '+22 XP',
  color: '#FF4500'
}, {
  id: 'smallchops',
  name: 'Small Chops',
  emoji: '🍢',
  xpBoost: '+15 XP',
  color: '#FFD700'
}, {
  id: 'amala',
  name: 'Amala & Ewedu',
  emoji: '🍲',
  xpBoost: '+28 XP',
  color: '#8B4513'
}, {
  id: 'jollof',
  name: 'Jollof Rice',
  emoji: '🍛',
  xpBoost: '+30 XP',
  color: '#DC143C'
}, {
  id: 'peppersoup',
  name: 'Pepper Soup',
  emoji: '🥘',
  xpBoost: '+20 XP',
  color: '#FF6347'
}, {
  id: 'drinks',
  name: 'Drinks',
  emoji: '🥤',
  xpBoost: '+8 XP',
  color: '#00F0FF'
}, {
  id: 'swallow',
  name: 'Swallow',
  emoji: '🍚',
  xpBoost: '+25 XP',
  color: '#D2691E'
}, {
  id: 'moimoi',
  name: 'Moi Moi',
  emoji: '🫘',
  xpBoost: '+12 XP',
  color: '#CD853F'
}, {
  id: 'asun',
  name: 'Asun',
  emoji: '🐐',
  xpBoost: '+26 XP',
  color: '#B22222'
}];
export function FastFoodCategoryNav() {
  const [activeCategory, setActiveCategory] = useState('rice');
  return <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-bold text-white">Categories</h2>
        <p className="text-xs text-gray-400">Earn XP with every order!</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category, index) => {
        const isActive = activeCategory === category.id;
        return <motion.button key={category.id} className={`relative flex-shrink-0 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-gradient-to-br from-white/10 to-white/5 border-2' : 'bg-[#131B2E] border border-white/10'}`} style={{
          borderColor: isActive ? category.color : undefined,
          boxShadow: isActive ? `0 0 20px ${category.color}40` : undefined
        }} onClick={() => setActiveCategory(category.id)} initial={{
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
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{category.emoji}</span>
                <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                  {category.name}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{
              backgroundColor: `${category.color}20`,
              color: category.color
            }}>
                  {category.xpBoost}
                </span>
              </div>

              {isActive && <motion.div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{
            backgroundColor: category.color
          }} layoutId="activeIndicator" transition={{
            type: 'spring',
            damping: 20,
            stiffness: 300
          }} />}
            </motion.button>;
      })}
      </div>
    </div>;
}