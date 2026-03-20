import React, { useState } from 'react';
import { Shirt, Calendar, Clock, MapPin } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface LaundryRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    serviceType: string;
    pickupAddress: string;
    when: string;
    time: string;
  }) => void;
}
const serviceTypes = [
{
  id: 'wash',
  name: 'Wash Only',
  icon: '💧',
  price: '₦500/kg'
},
{
  id: 'washiron',
  name: 'Wash & Iron',
  icon: '👔',
  price: '₦800/kg'
},
{
  id: 'dryclean',
  name: 'Dry Clean',
  icon: '✨',
  price: '₦1,500/item'
},
{
  id: 'express',
  name: 'Express',
  icon: '⚡',
  price: '+50%'
}];

export function LaundryRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: LaundryRequestSheetProps) {
  const [serviceType, setServiceType] = useState('washiron');
  const [pickupAddress, setPickupAddress] = useState('');
  const [when, setWhen] = useState('today');
  const [time, setTime] = useState('morning');
  const handleSubmit = () => {
    onSubmit({
      serviceType,
      pickupAddress,
      when,
      time
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Laundry Service"
      subtitle="We pick up, clean & deliver"
      color="#14B8A6"
      icon={<Shirt className="w-6 h-6 text-teal-400" />}
      onSubmit={handleSubmit}
      submitLabel="Schedule Pickup">
      
      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            Service Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {serviceTypes.map((service) =>
            <motion.button
              key={service.id}
              className={`p-4 rounded-xl border-2 transition-all ${serviceType === service.id ? 'bg-teal-500/20 border-teal-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setServiceType(service.id)}
              whileTap={{
                scale: 0.98
              }}>
              
                <div className="text-2xl mb-2">{service.icon}</div>
                <p
                className={`text-sm font-semibold mb-1 ${serviceType === service.id ? 'text-white' : 'text-gray-400'}`}>
                
                  {service.name}
                </p>
                <p className="text-xs text-gray-500">{service.price}</p>
              </motion.button>
            )}
          </div>
        </div>

        {/* Pickup Address */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-2 block">
            Pickup Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-400" />
            <input
              type="text"
              placeholder="Enter pickup address"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full bg-[#0A0E1A] text-white pl-11 pr-4 py-3 rounded-xl border border-white/10 focus:border-teal-500/50 focus:outline-none placeholder:text-gray-500" />
            
          </div>
        </div>

        {/* When */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            Pickup Date
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
            {
              value: 'today',
              label: 'Today'
            },
            {
              value: 'tomorrow',
              label: 'Tomorrow'
            },
            {
              value: 'later',
              label: 'Later'
            }].
            map((option) =>
            <motion.button
              key={option.value}
              className={`p-3 rounded-xl border-2 transition-all ${when === option.value ? 'bg-teal-500/20 border-teal-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setWhen(option.value)}
              whileTap={{
                scale: 0.98
              }}>
              
                <Calendar
                className={`w-5 h-5 mx-auto mb-1 ${when === option.value ? 'text-teal-400' : 'text-gray-400'}`} />
              
                <p
                className={`text-xs font-semibold ${when === option.value ? 'text-white' : 'text-gray-400'}`}>
                
                  {option.label}
                </p>
              </motion.button>
            )}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            Pickup Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
            {
              value: 'morning',
              label: 'Morning',
              time: '8-12'
            },
            {
              value: 'afternoon',
              label: 'Afternoon',
              time: '12-5'
            },
            {
              value: 'evening',
              label: 'Evening',
              time: '5-8'
            }].
            map((option) =>
            <motion.button
              key={option.value}
              className={`p-3 rounded-xl border-2 transition-all ${time === option.value ? 'bg-teal-500/20 border-teal-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setTime(option.value)}
              whileTap={{
                scale: 0.98
              }}>
              
                <Clock
                className={`w-5 h-5 mx-auto mb-1 ${time === option.value ? 'text-teal-400' : 'text-gray-400'}`} />
              
                <p
                className={`text-xs font-semibold ${time === option.value ? 'text-white' : 'text-gray-400'}`}>
                
                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </motion.button>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
          <p className="text-sm text-teal-400">
            💡 We'll call you 30 minutes before pickup
          </p>
        </div>
      </div>
    </ServiceRequestSheet>);

}