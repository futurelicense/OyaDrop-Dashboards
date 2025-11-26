import React from 'react';
import { motion } from 'framer-motion';
import { StoreCard, Store } from './StoreCard';
interface VerifiedKiosksProps {
  stores: Store[];
}
export function VerifiedKiosks({
  stores
}: VerifiedKiosksProps) {
  return <div className="px-5 py-6">
      <motion.div className="flex items-center justify-between mb-4" initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }}>
        <h2 className="text-lg font-bold text-white">Verified Kiosks</h2>
        <button className="text-sm text-[#00ffcc] font-medium">View All</button>
      </motion.div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {stores.map((store, index) => <StoreCard key={store.id} store={store} index={index} />)}
      </div>
    </div>;
}