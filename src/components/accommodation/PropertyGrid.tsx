import React from 'react';
import { PropertyCard, Property } from './PropertyCard';
const mockProperties: Property[] = [{
  id: '1',
  name: 'Luxury Penthouse Suite',
  type: 'Hotel',
  image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
  rating: 4.9,
  reviews: 234,
  location: 'Lekki Phase 1, Lagos',
  pricePerNight: 45000,
  amenities: ['WiFi', 'AC', 'Kitchen', 'Parking']
}, {
  id: '2',
  name: 'Modern Studio Apartment',
  type: 'Shortlet',
  image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
  rating: 4.8,
  reviews: 156,
  location: 'Ikota, Ajah',
  pricePerNight: 25000,
  pricePerMonth: 450000,
  amenities: ['WiFi', 'AC', 'Kitchen']
}, {
  id: '3',
  name: 'Shared Co-living Space',
  type: 'Shared',
  image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop',
  rating: 4.6,
  reviews: 67,
  location: 'Yaba, Lagos',
  pricePerNight: 8000,
  pricePerMonth: 150000,
  amenities: ['WiFi', 'AC']
}, {
  id: '4',
  name: 'Executive Hotel Room',
  type: 'Hotel',
  image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&h=600&fit=crop',
  rating: 4.7,
  reviews: 189,
  location: 'Victoria Island',
  pricePerNight: 35000,
  amenities: ['WiFi', 'AC', 'Kitchen', 'Parking']
}];
export function PropertyGrid() {
  return <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-white">Available Properties</h2>
        <p className="text-sm text-gray-400">{mockProperties.length} stays</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {mockProperties.map((property, index) => <PropertyCard key={property.id} property={property} index={index} />)}
      </div>
    </div>;
}