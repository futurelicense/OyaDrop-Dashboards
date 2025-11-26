import React, { useState } from 'react';
import { FastFoodHeader } from '../components/fastfood/FastFoodHeader';
import { FastFoodCategoryNav } from '../components/fastfood/FastFoodCategoryNav';
import { FastFoodPromoCarousel } from '../components/fastfood/FastFoodPromoCarousel';
import { SmartRecommendations } from '../components/fastfood/SmartRecommendations';
import { FastFoodCard, FastFoodItem } from '../components/fastfood/FastFoodCard';
import { FastFoodMissions } from '../components/fastfood/FastFoodMissions';
import { FastFoodBadges } from '../components/fastfood/FastFoodBadges';
import { StickyCartFooter } from '../components/fastfood/StickyCartFooter';
interface FastFoodPageProps {
  onMenuClick: () => void;
}
// Mock fast-food data
const fastFoodItems: FastFoodItem[] = [{
  id: '1',
  name: 'Classic Beef Burger with Cheese',
  price: 3500,
  originalPrice: 4200,
  image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=450&fit=crop',
  rating: 4.8,
  reviews: 1234,
  restaurant: "Joe's Burger Joint",
  xpReward: 25,
  deliveryTime: '15 min',
  badges: ['hot', 'bestseller', 'fast'],
  spiceLevel: 1,
  calories: 650,
  collected: true
}, {
  id: '2',
  name: 'Crispy Fried Chicken Bucket (8pc)',
  price: 5800,
  image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&h=450&fit=crop',
  rating: 4.9,
  reviews: 2156,
  restaurant: 'Chicken Republic',
  xpReward: 40,
  deliveryTime: '20 min',
  badges: ['bestseller', 'fast'],
  spiceLevel: 2,
  calories: 1200
}, {
  id: '3',
  name: 'Spicy Shawarma Wrap',
  price: 2800,
  originalPrice: 3200,
  image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&h=450&fit=crop',
  rating: 4.7,
  reviews: 892,
  restaurant: 'Shawarma Express',
  xpReward: 20,
  deliveryTime: '12 min',
  badges: ['hot', 'fast'],
  spiceLevel: 3,
  calories: 480
}, {
  id: '4',
  name: 'Loaded Cheese Fries',
  price: 1500,
  image: 'https://images.unsplash.com/photo-1630431341973-02e1b1d6e5ad?w=600&h=450&fit=crop',
  rating: 4.6,
  reviews: 567,
  restaurant: "Joe's Burger Joint",
  xpReward: 15,
  deliveryTime: '10 min',
  badges: ['new', 'fast'],
  calories: 520
}, {
  id: '5',
  name: 'Double Patty Mega Burger',
  price: 4800,
  image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=450&fit=crop',
  rating: 4.9,
  reviews: 1567,
  restaurant: 'Burger King',
  xpReward: 35,
  deliveryTime: '18 min',
  badges: ['bestseller'],
  spiceLevel: 2,
  calories: 890,
  collected: true
}, {
  id: '6',
  name: 'Grilled Chicken Shawarma',
  price: 3200,
  image: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&h=450&fit=crop',
  rating: 4.8,
  reviews: 1023,
  restaurant: 'Shawarma Express',
  xpReward: 22,
  deliveryTime: '15 min',
  badges: ['hot'],
  spiceLevel: 2,
  calories: 420
}];
export function FastFoodPage({
  onMenuClick
}: FastFoodPageProps) {
  const [cartItems, setCartItems] = useState<string[]>([]);
  const handleAddToCart = (itemId: string) => {
    setCartItems([...cartItems, itemId]);
  };
  const cartItemCount = cartItems.length;
  const subtotal = cartItems.reduce((sum, itemId) => {
    const item = fastFoodItems.find(i => i.id === itemId);
    return sum + (item?.price || 0);
  }, 0);
  const xpToEarn = cartItems.reduce((sum, itemId) => {
    const item = fastFoodItems.find(i => i.id === itemId);
    return sum + (item?.xpReward || 0);
  }, 0);
  const coinsToEarn = Math.floor(subtotal * 0.05);
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-32">
      <FastFoodHeader onMenuClick={onMenuClick} />

      <main>
        <FastFoodCategoryNav />
        <FastFoodPromoCarousel />
        <SmartRecommendations />

        {/* Food Grid */}
        <div className="px-4 py-4">
          <h2 className="text-sm font-bold text-white mb-4">
            Popular Right Now
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {fastFoodItems.map((item, index) => <FastFoodCard key={item.id} item={item} onAddToCart={() => handleAddToCart(item.id)} index={index} />)}
          </div>
        </div>

        <FastFoodMissions />
        <FastFoodBadges />
      </main>

      <StickyCartFooter itemCount={cartItemCount} subtotal={subtotal} xpToEarn={xpToEarn} coinsToEarn={coinsToEarn} onCheckout={() => console.log('Checkout')} />
    </div>;
}