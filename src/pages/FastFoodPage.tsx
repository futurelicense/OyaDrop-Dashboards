import React, { useState } from 'react';
import { FastFoodHeader } from '../components/fastfood/FastFoodHeader';
import { FastFoodCategoryNav } from '../components/fastfood/FastFoodCategoryNav';
import { FastFoodPromoCarousel } from '../components/fastfood/FastFoodPromoCarousel';
import { FastFoodMissions } from '../components/fastfood/FastFoodMissions';
import { FastFoodBadges } from '../components/fastfood/FastFoodBadges';
import { SmartRecommendations } from '../components/fastfood/SmartRecommendations';
import { FastFoodCard } from '../components/fastfood/FastFoodCard';
import { StickyCartFooter } from '../components/fastfood/StickyCartFooter';
import { ChatButton } from '../components/messaging/ChatButton';
import { FloatingChatIcon } from '../components/messaging/FloatingChatIcon';
import { motion } from 'framer-motion';
interface FastFoodPageProps {
  onMenuClick: () => void;
  onOpenChat?: () => void;
}
export function FastFoodPage({
  onMenuClick,
  onOpenChat
}: FastFoodPageProps) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-32">
      <FastFoodHeader onMenuClick={onMenuClick} />

      <main>
        <FastFoodCategoryNav />
        <FastFoodPromoCarousel />
        <FastFoodMissions />
        <FastFoodBadges />
        <SmartRecommendations />

        {/* Food Items Grid */}
        <div className="px-4 py-6">
          <h2 className="text-lg font-bold text-white mb-4">Popular Items</h2>
          <div className="grid grid-cols-2 gap-4">
            <FastFoodCard name="Jollof Rice Combo" restaurant="B-square Restaurant" price={2500} rating={4.8} image="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop" />
            <FastFoodCard name="Chicken & Chips" restaurant="Mama Put" price={3200} rating={4.6} image="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop" />
          </div>
        </div>

        {/* Order Placed Success State */}
        {orderPlaced && <motion.div className="mx-4 mb-6 bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/50 rounded-2xl p-6" initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        type: 'spring',
        damping: 20
      }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Order Placed!</h3>
                <p className="text-sm text-gray-400">
                  B-square is preparing your food
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 p-3 bg-[#0A0E1A]/50 rounded-xl">
                <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop" alt="B-square Restaurant" className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">
                    B-square Restaurant
                  </p>
                  <p className="text-xs text-gray-400">Preparing your order</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-yellow-400">★ 4.8</span>
                    <span className="text-xs text-gray-500">
                      • Fast delivery
                    </span>
                  </div>
                </div>
              </div>

              <ChatButton contactName="B-square Restaurant" contactType="Restaurant" variant="secondary" size="md" onClick={onOpenChat} />
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-2">
                Delivery Rider will be assigned soon
              </p>
              <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                Estimated time: 25-30 mins
              </div>
            </div>
          </motion.div>}
      </main>

      <StickyCartFooter onPlaceOrder={handlePlaceOrder} />

      {onOpenChat && <FloatingChatIcon unreadCount={3} onOpenChat={onOpenChat} />}
    </div>;
}