import React, { useState } from 'react';
import {
  Building2Icon,
  CalendarDaysIcon,
  Clock3Icon,
  HomeIcon,
  MapPinIcon,
  SparklesIcon } from
'lucide-react';
import { motion } from 'framer-motion';
import { ServiceRequestSheet } from './ServiceRequestSheet';
type ServiceOption = {
  id: string;
  name: string;
  price: string;
  description: string;
};
const serviceOptions: ServiceOption[] = [
{
  id: 'standard',
  name: 'Standard clean',
  price: 'From ₦12,000',
  description: 'A dependable reset for everyday spaces.'
},
{
  id: 'deep',
  name: 'Deep clean',
  price: 'From ₦24,000',
  description: 'Detailed kitchens, bathrooms, floors and surfaces.'
},
{
  id: 'move',
  name: 'Move-in / Move-out',
  price: 'From ₦32,000',
  description: 'An empty-home refresh before keys change hands.'
},
{
  id: 'construction',
  name: 'Post-construction',
  price: 'Custom quote',
  description: 'Fine dust and finish cleaning after works.'
}];

interface CleanersRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    service: string;
    propertyType: string;
    bedrooms: number;
    address: string;
    when: string;
    time: string;
    accessNotes: string;
  }) => void;
}
export function CleanersRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: CleanersRequestSheetProps) {
  const [selectedService, setSelectedService] = useState('standard');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bedrooms, setBedrooms] = useState(2);
  const [address, setAddress] = useState('');
  const [when, setWhen] = useState('today');
  const [time, setTime] = useState('afternoon');
  const [accessNotes, setAccessNotes] = useState('');
  const handleSubmit = () => {
    onSubmit({
      service: selectedService,
      propertyType,
      bedrooms,
      address,
      when,
      time,
      accessNotes
    });
  };
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Request a Cleaner"
      subtitle="Home care on your schedule"
      color="#34D399"
      icon={<SparklesIcon className="w-6 h-6 text-emerald-300" />}
      onSubmit={handleSubmit}
      submitLabel="Find cleaners">
      
      <div className="space-y-6">
        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">
            What type of clean do you need?
          </label>
          <div className="space-y-2">
            {serviceOptions.map((service) => {
              const selected = selectedService === service.id;
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  whileTap={{
                    scale: 0.985
                  }}
                  className={`w-full rounded-xl border-2 p-3 text-left transition-all ${selected ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-emerald-400 bg-emerald-400' : 'border-gray-600'}`}>
                      
                      {selected &&
                      <span className="h-2 w-2 rounded-full bg-[#062a25]" />
                      }
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <p className="text-sm font-bold text-white">
                          {service.name}
                        </p>
                        <span className="text-xs font-semibold text-emerald-300">
                          {service.price}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.button>);

            })}
          </div>
        </section>

        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">
            Your property
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
            {
              name: 'Apartment',
              icon: HomeIcon
            },
            {
              name: 'Duplex',
              icon: Building2Icon
            },
            {
              name: 'Office',
              icon: Building2Icon
            }].
            map((option) => {
              const Icon = option.icon;
              const selected = propertyType === option.name;
              return (
                <motion.button
                  key={option.name}
                  onClick={() => setPropertyType(option.name)}
                  whileTap={{
                    scale: 0.97
                  }}
                  className={`rounded-xl border-2 p-3 text-center ${selected ? 'border-emerald-400 bg-emerald-400/10 text-emerald-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                  
                  <Icon className="mx-auto h-5 w-5" />
                  <span className="mt-2 block text-xs font-semibold">
                    {option.name}
                  </span>
                </motion.button>);

            })}
          </div>
          {propertyType !== 'Office' &&
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3">
              <HomeIcon className="h-5 w-5 text-emerald-300" />
              <span className="flex-1 text-sm text-white">
                {bedrooms} bedroom{bedrooms > 1 ? 's' : ''}
              </span>
              <button
              aria-label="Remove bedroom"
              onClick={() => setBedrooms((value) => Math.max(1, value - 1))}
              className="h-8 w-8 rounded-lg bg-white/5 text-white">
              
                −
              </button>
              <button
              aria-label="Add bedroom"
              onClick={() => setBedrooms((value) => Math.min(6, value + 1))}
              className="h-8 w-8 rounded-lg bg-emerald-400 text-[#062a25]">
              
                +
              </button>
            </div>
          }
        </section>

        <section>
          <label className="mb-2 block text-sm font-semibold text-gray-400">
            Service address
          </label>
          <div className="relative">
            <MapPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-300" />
            <input
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Building, street and area"
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-emerald-400/60" />
            
          </div>
        </section>

        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">
            When should we come?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
            {
              id: 'today',
              label: 'Today'
            },
            {
              id: 'tomorrow',
              label: 'Tomorrow'
            },
            {
              id: 'later',
              label: 'Later'
            }].
            map((option) => {
              const selected = when === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setWhen(option.id)}
                  whileTap={{
                    scale: 0.98
                  }}
                  className={`rounded-xl border-2 p-3 ${selected ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <CalendarDaysIcon
                    className={`mx-auto h-5 w-5 ${selected ? 'text-emerald-300' : 'text-gray-400'}`} />
                  
                  <p
                    className={`mt-1 text-xs font-semibold ${selected ? 'text-white' : 'text-gray-400'}`}>
                    
                    {option.label}
                  </p>
                </motion.button>);

            })}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
            {
              id: 'morning',
              label: 'Morning',
              note: '8–12'
            },
            {
              id: 'afternoon',
              label: 'Afternoon',
              note: '12–5'
            },
            {
              id: 'evening',
              label: 'Evening',
              note: '5–7'
            }].
            map((option) => {
              const selected = time === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setTime(option.id)}
                  whileTap={{
                    scale: 0.98
                  }}
                  className={`rounded-xl border-2 p-3 ${selected ? 'border-emerald-400 bg-emerald-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <Clock3Icon
                    className={`mx-auto h-5 w-5 ${selected ? 'text-emerald-300' : 'text-gray-400'}`} />
                  
                  <p
                    className={`mt-1 text-xs font-semibold ${selected ? 'text-white' : 'text-gray-400'}`}>
                    
                    {option.label}
                  </p>
                  <p className="text-[10px] text-gray-500">{option.note}</p>
                </motion.button>);

            })}
          </div>
        </section>

        <section>
          <label className="mb-2 block text-sm font-semibold text-gray-400">
            Access notes{' '}
            <span className="font-normal text-gray-600">(optional)</span>
          </label>
          <textarea
            value={accessNotes}
            onChange={(event) => setAccessNotes(event.target.value)}
            placeholder="Gate instructions, parking, pets, or areas to focus on..."
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-emerald-400/60" />
          
        </section>

        <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-sm font-semibold text-emerald-200">
            Cleaners arrive with their own tools
          </p>
          <p className="mt-1 text-xs leading-5 text-gray-400">
            You will see available Clean & Co. and other verified teams after
            submitting your request.
          </p>
        </div>
      </div>
    </ServiceRequestSheet>);

}