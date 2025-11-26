import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
const banners = [{
  id: 1,
  title: 'Gaming Week Sale',
  subtitle: 'Up to 50% OFF on all gaming items',
  gradient: 'from-purple-600 via-pink-600 to-red-600',
  image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=400&fit=crop',
  cta: 'Shop Gaming'
}, {
  id: 2,
  title: 'Flash Sale',
  subtitle: 'Limited time offers - Ends in 2 hours',
  gradient: 'from-orange-500 via-red-600 to-pink-600',
  image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
  cta: 'Grab Deals'
}, {
  id: 3,
  title: 'Free Delivery',
  subtitle: 'On all orders above ₦5,000 today',
  gradient: 'from-cyan-500 via-blue-600 to-purple-600',
  image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800&h=400&fit=crop',
  cta: 'Order Now'
}];
export function HeroBannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);
  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };
  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };
  return <div className="relative h-48 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={currentIndex} className="absolute inset-0" initial={{
        opacity: 0,
        x: 100
      }} animate={{
        opacity: 1,
        x: 0
      }} exit={{
        opacity: 0,
        x: -100
      }} transition={{
        duration: 0.5,
        ease: 'easeInOut'
      }}>
          <div className={`relative h-full bg-gradient-to-br ${banners[currentIndex].gradient} rounded-2xl overflow-hidden`}>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img src={banners[currentIndex].image} alt={banners[currentIndex].title} className="w-full h-full object-cover opacity-30" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-6">
              <motion.h2 className="text-2xl font-bold text-white mb-2" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.2
            }}>
                {banners[currentIndex].title}
              </motion.h2>
              <motion.p className="text-sm text-white/90 mb-4" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.3
            }}>
                {banners[currentIndex].subtitle}
              </motion.p>
              <motion.button className="self-start bg-white text-black px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:scale-105 transition-transform" initial={{
              y: 20,
              opacity: 0
            }} animate={{
              y: 0,
              opacity: 1
            }} transition={{
              delay: 0.4
            }} whileTap={{
              scale: 0.95
            }}>
                {banners[currentIndex].cta}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-3 pointer-events-none">
        <motion.button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto" onClick={handlePrev} whileTap={{
        scale: 0.9
      }}>
          <ChevronLeftIcon className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center pointer-events-auto" onClick={handleNext} whileTap={{
        scale: 0.9
      }}>
          <ChevronRightIcon className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => <motion.button key={index} className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'w-8 bg-white' : 'w-1.5 bg-white/40'}`} onClick={() => {
        setCurrentIndex(index);
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 10000);
      }} whileTap={{
        scale: 0.9
      }} />)}
      </div>
    </div>;
}