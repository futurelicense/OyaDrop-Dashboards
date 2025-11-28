import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Heart, Wifi, Wind, Utensils, Car } from 'lucide-react';
export interface Property {
  id: string;
  name: string;
  type: 'Hotel' | 'Shortlet' | 'Shared';
  image: string;
  rating: number;
  reviews: number;
  location: string;
  pricePerNight: number;
  pricePerMonth?: number;
  amenities: string[];
  host?: string;
}
interface PropertyCardProps {
  property: Property;
  index?: number;
}
export function PropertyCard({
  property,
  index = 0
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const amenityIcons: Record<string, any> = {
    WiFi: Wifi,
    AC: Wind,
    Kitchen: Utensils,
    Parking: Car
  };
  const typeColors: Record<string, string> = {
    Hotel: '#00D9C0',
    Shortlet: '#00F0FF',
    Shared: '#B026FF'
  };
  return <motion.div className="bg-gradient-to-br from-[#131B2E] to-[#0F1520] rounded-3xl overflow-hidden border border-white/10" initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    delay: index * 0.1
  }} whileHover={{
    y: -4,
    borderColor: '#00D9C040'
  }}>
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />

        {/* Type Badge */}
        <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl font-bold text-xs backdrop-blur-sm" style={{
        backgroundColor: typeColors[property.type] + '30',
        color: typeColors[property.type],
        border: `1px solid ${typeColors[property.type]}60`
      }}>
          {property.type}
        </div>

        {/* Favorite Button */}
        <motion.button className="absolute top-3 right-3 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center" onClick={() => setIsFavorite(!isFavorite)} whileTap={{
        scale: 0.9
      }}>
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-base font-bold text-white line-clamp-1">
            {property.name}
          </h3>
          <div className="flex items-center gap-1 flex-shrink-0 ml-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-bold text-white">
              {property.rating}
            </span>
            <span className="text-xs text-gray-400">({property.reviews})</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-gray-400 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-2 mb-3">
          {property.amenities.slice(0, 4).map(amenity => {
          const Icon = amenityIcons[amenity] || Wifi;
          return <div key={amenity} className="w-8 h-8 bg-cyan-500/10 rounded-lg flex items-center justify-center" title={amenity}>
                <Icon className="w-4 h-4 text-cyan-400" />
              </div>;
        })}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-cyan-400">
            ₦{property.pricePerNight.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400">/ night</span>
        </div>
        {property.pricePerMonth && <p className="text-xs text-gray-500 mt-1">
            ₦{property.pricePerMonth.toLocaleString()} / month
          </p>}
      </div>
    </motion.div>;
}