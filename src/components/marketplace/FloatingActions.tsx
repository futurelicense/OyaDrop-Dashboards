import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpIcon, SlidersHorizontalIcon } from 'lucide-react';
export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
      {/* Filters */}
      <motion.button className="w-14 h-14 bg-[#1a2a2f] border border-[#00ffcc]/30 rounded-full flex items-center justify-center shadow-lg" whileTap={{
      scale: 0.9
    }} whileHover={{
      scale: 1.05,
      borderColor: 'rgba(0, 255, 204, 0.6)'
    }}>
        <SlidersHorizontalIcon className="w-6 h-6 text-[#00ffcc]" />
      </motion.button>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && <motion.button className="w-14 h-14 bg-gradient-to-br from-[#00ffcc] to-[#00d9ff] rounded-full flex items-center justify-center shadow-lg" onClick={scrollToTop} initial={{
        scale: 0,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0,
        opacity: 0
      }} whileTap={{
        scale: 0.9
      }} whileHover={{
        scale: 1.05
      }}>
            <ArrowUpIcon className="w-6 h-6 text-black" />
          </motion.button>}
      </AnimatePresence>
    </div>;
}