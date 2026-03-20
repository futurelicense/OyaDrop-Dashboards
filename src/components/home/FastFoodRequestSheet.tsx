import React, { useState } from 'react';
import { UtensilsCrossed, Search, MapPin } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface FastFoodRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    cuisine: string;
    restaurant: string;
    deliveryAddress: string;
  }) => void;
}
const cuisines = [
{
  id: 'nigerian',
  name: 'Nigerian',
  icon: '🍲'
},
{
  id: 'chinese',
  name: 'Chinese',
  icon: '🥡'
},
{
  id: 'pizza',
  name: 'Pizza',
  icon: '🍕'
},
{
  id: 'burgers',
  name: 'Burgers',
  icon: '🍔'
},
{
  id: 'chicken',
  name: 'Chicken',
  icon: '🍗'
},
{
  id: 'shawarma',
  name: 'Shawarma',
  icon: '🌯'
}];

export function FastFoodRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: FastFoodRequestSheetProps) {
  const [selectedCuisine, setSelectedCuisine] = useState('nigerian');
  const [restaurant, setRestaurant] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const handleSubmit = () => {
    onSubmit({
      cuisine: selectedCuisine,
      restaurant,
      deliveryAddress
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Order Food"
      subtitle="Delicious meals delivered"
      color="#EF4444"
      icon={<UtensilsCrossed className="w-6 h-6 text-red-400" />}
      onSubmit={handleSubmit}
      submitLabel="Browse Restaurants">
      
      <div className="space-y-6">
        {/* Cuisine Type */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            What are you craving?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {cuisines.map((cuisine) =>
            <motion.button
              key={cuisine.id}
              className={`p-3 rounded-xl border-2 transition-all ${selectedCuisine === cuisine.id ? 'bg-red-500/20 border-red-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setSelectedCuisine(cuisine.id)}
              whileTap={{
                scale: 0.98
              }}>
              
                <div className="text-2xl mb-1">{cuisine.icon}</div>
                <p
                className={`text-xs font-semibold ${selectedCuisine === cuisine.id ? 'text-white' : 'text-gray-400'}`}>
                
                  {cuisine.name}
                </p>
              </motion.button>
            )}
          </div>
        </div>

        {/* Restaurant Search */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Specific Restaurant? (Optional)
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for a restaurant..."
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-red-500/50 focus:outline-none placeholder:text-gray-500" />
            
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Delivery Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
            <input
              type="text"
              placeholder="Enter delivery address"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-red-500/50 focus:outline-none placeholder:text-gray-500" />
            
          </div>
          <div className="mt-2 flex gap-2">
            <motion.button
              className="text-xs text-cyan-400 font-semibold"
              whileTap={{
                scale: 0.95
              }}>
              
              📍 Use current location
            </motion.button>
          </div>
        </div>

        {/* Popular Nearby */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <p className="text-sm font-bold text-red-400 mb-2">
            🔥 Popular Nearby
          </p>
          <div className="space-y-2">
            {['Chicken Republic', 'Dominos Pizza', 'KFC'].map((name) =>
            <button
              key={name}
              className="w-full text-left text-sm text-gray-300 hover:text-white transition-colors"
              onClick={() => setRestaurant(name)}>
              
                • {name}
              </button>
            )}
          </div>
        </div>
      </div>
    </ServiceRequestSheet>);

}