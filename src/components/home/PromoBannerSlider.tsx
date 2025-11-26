import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const banners = [{
  id: 1,
  title: 'Gaming Week Sale',
  subtitle: 'Up to 50% OFF on all gaming items',
  gradient: 'from-purple-600 to-pink-600',
  emoji: '🎮'
}, {
  id: 2,
  title: 'Flash Sale',
  subtitle: 'Limited time offers on electronics',
  gradient: 'from-orange-500 to-red-600',
  emoji: '⚡'
}, {
  id: 3,
  title: 'Free Delivery',
  subtitle: 'On orders above ₦5,000',
  gradient: 'from-cyan-500 to-blue-600',
  emoji: '🚚'
}];
export function PromoBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 4000); // Auto-advance every 4 seconds
    return () => clearInterval(interval);
  }, [isPaused]);
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };
  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 8000); // Resume after 8 seconds
  };
  return <div className="px-5 py-6">
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div key={currentIndex} className={`relative bg-gradient-to-br ${banners[currentIndex].gradient} rounded-2xl p-6 overflow-hidden shadow-xl`} initial={{
          opacity: 0,
          x: 100
        }} animate={{
          opacity: 1,
          x: 0
        }} exit={{
          opacity: 0,
          x: -100
        }} transition={{
          duration: 0.3
        }}>
            <div className="absolute top-0 right-0 text-8xl opacity-20">
              {banners[currentIndex].emoji}
            </div>

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-2">
                {banners[currentIndex].title}
              </h2>
              <p className="text-sm text-white/90 mb-4">
                {banners[currentIndex].subtitle}
              </p>
              <motion.button className="bg-white text-gray-900 px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg" whileHover={{
              scale: 1.05
            }} whileTap={{
              scale: 0.95
            }}>
                Shop Now
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 flex justify-between pointer-events-none">
          <motion.button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto" onClick={handlePrev} whileTap={{
          scale: 0.9
        }}>
            <ChevronLeftIcon className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center pointer-events-auto" onClick={handleNext} whileTap={{
          scale: 0.9
        }}>
            <ChevronRightIcon className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {banners.map((_, index) => <motion.button key={index} className={`h-2 rounded-full transition-all ${index === currentIndex ? 'w-6 bg-[#00ffcc]' : 'w-2 bg-white/30'}`} onClick={() => handleDotClick(index)} whileTap={{
        scale: 0.9
      }} />)}
      </div>
    </div>;
}