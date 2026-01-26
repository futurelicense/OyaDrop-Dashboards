import React, { useState } from 'react';
import { FastFoodHeader } from '../components/fastfood/FastFoodHeader';
import { FastFoodCategoryNav } from '../components/fastfood/FastFoodCategoryNav';
import { FastFoodPromoCarousel } from '../components/fastfood/FastFoodPromoCarousel';
import { FastFoodMissions } from '../components/fastfood/FastFoodMissions';
import { FastFoodBadges } from '../components/fastfood/FastFoodBadges';
import { SmartRecommendations } from '../components/fastfood/SmartRecommendations';
import { FastFoodCard, FastFoodItem } from '../components/fastfood/FastFoodCard';
import { StickyCartFooter } from '../components/fastfood/StickyCartFooter';
import { FloatingChatIcon } from '../components/messaging/FloatingChatIcon';
import { motion } from 'framer-motion';
interface FastFoodPageProps {
  onMenuClick: () => void;
  onOpenChat?: () => void;
}
const mockFoodItems: FastFoodItem[] = [
{
  id: '1',
  name: 'Jollof Rice Combo',
  price: 2500,
  originalPrice: 3000,
  image:
  'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
  rating: 4.8,
  reviews: 234,
  restaurant: 'B-square Restaurant',
  xpReward: 25,
  deliveryTime: '20-30 min',
  badges: ['hot', 'bestseller'],
  spiceLevel: 2,
  calories: 650
},
{
  id: '2',
  name: 'Chicken & Chips',
  price: 3200,
  image:
  'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400&h=400&fit=crop',
  rating: 4.6,
  reviews: 189,
  restaurant: 'Mama Put',
  xpReward: 20,
  deliveryTime: '15-25 min',
  badges: ['fast'],
  calories: 580
},
{
  id: '3',
  name: 'Suya Platter',
  price: 2800,
  originalPrice: 3500,
  image:
  'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=400&h=400&fit=crop',
  rating: 4.9,
  reviews: 312,
  restaurant: 'Abuja Suya Spot',
  xpReward: 30,
  deliveryTime: '25-35 min',
  badges: ['hot', 'new'],
  spiceLevel: 3,
  calories: 420
},
{
  id: '4',
  name: 'Fried Rice Special',
  price: 2200,
  image:
  'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=400&fit=crop',
  rating: 4.7,
  reviews: 156,
  restaurant: 'Rice & More',
  xpReward: 22,
  deliveryTime: '20-30 min',
  badges: ['bestseller'],
  spiceLevel: 1,
  calories: 590
}];

export function FastFoodPage({ onMenuClick, onOpenChat }: FastFoodPageProps) {
  const [cartItems, setCartItems] = useState<FastFoodItem[]>([]);
  const handleAddToCart = (item: FastFoodItem) => {
    setCartItems((prev) => [...prev, item]);
  };
  const handleCheckout = () => {
    console.log('Checkout with items:', cartItems);
  };
  const totalXP = cartItems.reduce((sum, item) => sum + item.xpReward, 0);
  const totalCoins = Math.floor(
    cartItems.reduce((sum, item) => sum + item.price, 0) / 100
  );
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-32">
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
            {mockFoodItems.map((item, index) =>
            <FastFoodCard
              key={item.id}
              item={item}
              onAddToCart={() => handleAddToCart(item)}
              index={index} />

            )}
          </div>
        </div>
      </main>

      {cartItems.length > 0 &&
      <StickyCartFooter
        itemCount={cartItems.length}
        subtotal={subtotal}
        xpToEarn={totalXP}
        coinsToEarn={totalCoins}
        onCheckout={handleCheckout} />

      }

      {onOpenChat &&
      <FloatingChatIcon unreadCount={3} onOpenChat={onOpenChat} />
      }
    </div>);

}