import React, { useState } from 'react';
import { Car, MapPin, Clock } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface TransportRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    pickup: string;
    destination: string;
    when: string;
    vehicleType: string;
  }) => void;
}
const vehicleTypes = [
{
  id: 'bike',
  name: 'Bike',
  icon: '🏍️',
  price: '₦500-800'
},
{
  id: 'car',
  name: 'Car',
  icon: '🚗',
  price: '₦1,200-2,000'
},
{
  id: 'suv',
  name: 'SUV',
  icon: '🚙',
  price: '₦2,500-4,000'
},
{
  id: 'van',
  name: 'Van',
  icon: '🚐',
  price: '₦3,500-5,000'
}];

export function TransportRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: TransportRequestSheetProps) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [when, setWhen] = useState('now');
  const [vehicleType, setVehicleType] = useState('car');
  const handleSubmit = () => {
    onSubmit({
      pickup,
      destination,
      when,
      vehicleType
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Book a Ride"
      subtitle="Get where you need to go"
      color="#00D9C0"
      icon={<Car className="w-6 h-6 text-cyan-400" />}
      onSubmit={handleSubmit}
      submitLabel="Find Drivers">
      
      <div className="space-y-6">
        {/* Pickup Location */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Pickup Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-400" />
            <input
              type="text"
              placeholder="Enter pickup address"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
            
          </div>
        </div>

        {/* Destination */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Destination
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-cyan-500/50 focus:outline-none placeholder:text-gray-500" />
            
          </div>
        </div>

        {/* When */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            When do you need it?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
            {
              value: 'now',
              label: 'Now',
              time: '2-5 min'
            },
            {
              value: '15min',
              label: '15 mins',
              time: 'Schedule'
            },
            {
              value: 'later',
              label: 'Later',
              time: 'Pick time'
            }].
            map((option) =>
            <motion.button
              key={option.value}
              className={`p-3 rounded-xl border-2 transition-all ${when === option.value ? 'bg-cyan-500/20 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setWhen(option.value)}
              whileTap={{
                scale: 0.98
              }}>
              
                <Clock
                className={`w-5 h-5 mx-auto mb-1 ${when === option.value ? 'text-cyan-400' : 'text-gray-400'}`} />
              
                <p
                className={`text-xs font-semibold ${when === option.value ? 'text-white' : 'text-gray-400'}`}>
                
                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </motion.button>
            )}
          </div>
        </div>

        {/* Vehicle Type */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            Vehicle Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {vehicleTypes.map((vehicle) =>
            <motion.button
              key={vehicle.id}
              className={`p-4 rounded-xl border-2 transition-all ${vehicleType === vehicle.id ? 'bg-cyan-500/20 border-cyan-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setVehicleType(vehicle.id)}
              whileTap={{
                scale: 0.98
              }}>
              
                <div className="text-2xl mb-2">{vehicle.icon}</div>
                <p
                className={`text-sm font-semibold mb-1 ${vehicleType === vehicle.id ? 'text-white' : 'text-gray-400'}`}>
                
                  {vehicle.name}
                </p>
                <p className="text-xs text-gray-500">{vehicle.price}</p>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </ServiceRequestSheet>);

}