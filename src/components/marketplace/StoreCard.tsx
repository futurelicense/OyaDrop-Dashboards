import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, PackageIcon, CheckCircleIcon } from 'lucide-react';
export interface Store {
  id: string;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  products: number;
  verified: boolean;
  category: string;
}
interface StoreCardProps {
  store: Store;
  index?: number;
}
export function StoreCard({
  store,
  index = 0
}: StoreCardProps) {
  return <motion.button className="flex-shrink-0 w-32 bg-[#1a2a2f] rounded-2xl p-4 border border-white/10 text-center group hover:border-[#00ffcc]/30 transition-colors" initial={{
    opacity: 0,
    scale: 0.9
  }} animate={{
    opacity: 1,
    scale: 1
  }} transition={{
    delay: index * 0.05
  }} whileTap={{
    scale: 0.95
  }}>
      {/* Logo */}
      <div className="relative w-16 h-16 mx-auto mb-3">
        <div className="w-full h-full bg-[#0f1f24] rounded-xl overflow-hidden">
          <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
        </div>
        {store.verified && <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00ffcc] rounded-full flex items-center justify-center border-2 border-[#1a2a2f]">
            <CheckCircleIcon className="w-4 h-4 text-black" />
          </div>}
      </div>

      {/* Name */}
      <h3 className="text-sm font-semibold text-white mb-1 line-clamp-1">
        {store.name}
      </h3>
      <p className="text-xs text-gray-400 mb-2">{store.category}</p>

      {/* Stats */}
      <div className="flex items-center justify-center gap-3 text-xs">
        <div className="flex items-center gap-1">
          <StarIcon className="w-3 h-3 fill-[#ffb800] text-[#ffb800]" />
          <span className="text-white font-medium">{store.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <PackageIcon className="w-3 h-3" />
          <span>{store.products}</span>
        </div>
      </div>
    </motion.button>;
}