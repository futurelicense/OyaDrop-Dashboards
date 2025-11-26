import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon, MenuIcon, ShoppingCartIcon, UserCircleIcon } from 'lucide-react';
interface MarketplaceHeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  cartItemCount: number;
}
export function MarketplaceHeader({
  onMenuClick,
  onCartClick,
  cartItemCount
}: MarketplaceHeaderProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  return <motion.header className="sticky top-0 z-50 bg-[#0a1a1f]/95 backdrop-blur-xl border-b border-[#00ffcc]/20" initial={{
    y: -20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }}>
      <div className="px-5 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <motion.button className="p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={onMenuClick} whileTap={{
          scale: 0.95
        }}>
            <MenuIcon className="w-6 h-6 text-white" />
          </motion.button>

          <motion.div className="flex items-center gap-2" initial={{
          scale: 0.9,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} transition={{
          delay: 0.1
        }}>
            <div className="w-8 h-8 bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <span className="text-lg font-bold text-white">Market</span>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={onCartClick} whileTap={{
            scale: 0.95
          }}>
              <ShoppingCartIcon className="w-6 h-6 text-[#00ffcc]" />
              {cartItemCount > 0 && <motion.span className="absolute -top-1 -right-1 w-5 h-5 bg-[#00ffcc] text-black text-xs font-bold rounded-full flex items-center justify-center" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: 'spring',
              stiffness: 500
            }}>
                  {cartItemCount}
                </motion.span>}
            </motion.button>

            <motion.button className="w-9 h-9 rounded-full bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] flex items-center justify-center" whileTap={{
            scale: 0.95
          }}>
              <UserCircleIcon className="w-6 h-6 text-black" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <motion.div className={`relative transition-all duration-300 ${searchFocused ? 'ring-2 ring-[#00ffcc]' : ''}`} initial={{
        opacity: 0,
        y: 10
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        delay: 0.2
      }}>
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search products, businesses, categories..." className="w-full bg-[#1a2a2f] text-white pl-12 pr-4 py-3.5 rounded-xl border border-white/10 focus:outline-none focus:border-[#00ffcc]/50 transition-colors placeholder:text-gray-500" onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)} />
        </motion.div>
      </div>
    </motion.header>;
}