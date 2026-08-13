import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDaysIcon, CarIcon, Clock3Icon, MapPinIcon, WrenchIcon } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';

interface RepairOption {
  id: string;
  name: string;
  price: string;
  description: string;
}

const repairOptions: RepairOption[] = [
{ id: 'diagnostics', name: 'Diagnostics', price: 'From ₦8,000', description: 'Fault scan and a written findings report.' },
{ id: 'oil', name: 'Oil & filter service', price: 'From ₦18,000', description: 'Routine service with fluid checks.' },
{ id: 'brakes', name: 'Brake service', price: 'From ₦35,000', description: 'Pad or rotor replacement and road test.' },
{ id: 'ac', name: 'AC repair', price: 'From ₦45,000', description: 'Leak test, compressor check and recharge.' },
{ id: 'battery', name: 'Battery & electricals', price: 'From ₦60,000', description: 'Load test, alternator check and fitting.' },
{ id: 'recovery', name: 'Roadside help', price: 'Custom quote', description: 'Jump start, tyre change or towing.' }];


interface MechanicRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    service: string;
    vehicle: string;
    concern: string;
    mode: string;
    location: string;
    when: string;
    time: string;
  }) => void;
}

export function MechanicRequestSheet({ isOpen, onClose, onSubmit }: MechanicRequestSheetProps) {
  const [service, setService] = useState('diagnostics');
  const [vehicle, setVehicle] = useState('');
  const [concern, setConcern] = useState('');
  const [mode, setMode] = useState('Mobile visit');
  const [location, setLocation] = useState('');
  const [when, setWhen] = useState('today');
  const [time, setTime] = useState('afternoon');

  const handleSubmit = () => {
    onSubmit({ service, vehicle, concern, mode, location, when, time });
  };

  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Request a Mechanic"
      subtitle="Repairs at home or in the workshop"
      color="#F59E0B"
      icon={<WrenchIcon className="w-6 h-6 text-amber-300" />}
      onSubmit={handleSubmit}
      submitLabel="Find mechanics">
      
      <div className="space-y-6">
        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">What do you need fixed?</label>
          <div className="space-y-2">
            {repairOptions.map((option) => {
              const selected = service === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setService(option.id)}
                  whileTap={{ scale: 0.985 }}
                  className={`w-full rounded-xl border-2 p-3 text-left transition-all ${selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-amber-400 bg-amber-400' : 'border-gray-600'}`}>
                      {selected && <span className="h-2 w-2 rounded-full bg-[#2b1a00]" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-3">
                        <p className="text-sm font-bold text-white">{option.name}</p>
                        <span className="whitespace-nowrap text-xs font-semibold text-amber-300">{option.price}</span>
                      </div>
                      <p className="mt-1 text-xs text-gray-400">{option.description}</p>
                    </div>
                  </div>
                </motion.button>);

            })}
          </div>
        </section>

        <section>
          <label className="mb-2 block text-sm font-semibold text-gray-400">Your vehicle</label>
          <div className="relative">
            <CarIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300" />
            <input
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
              placeholder="e.g. Toyota Corolla 2018"
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-amber-400/60" />
            
          </div>
        </section>

        <section>
          <label className="mb-2 block text-sm font-semibold text-gray-400">
            What is happening? <span className="font-normal text-gray-600">(optional)</span>
          </label>
          <textarea
            value={concern}
            onChange={(event) => setConcern(event.target.value)}
            rows={3}
            placeholder="Warning light, noise, leak, or when the problem started..."
            className="w-full resize-none rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-white outline-none placeholder:text-gray-500 focus:border-amber-400/60" />
          
        </section>

        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">Where should the repair happen?</label>
          <div className="grid grid-cols-2 gap-3">
            {['Mobile visit', 'Workshop'].map((option) => {
              const selected = mode === option;
              return (
                <motion.button
                  key={option}
                  onClick={() => setMode(option)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-3 text-center ${selected ? 'border-amber-400 bg-amber-400/10 text-amber-200' : 'border-white/10 bg-[#0A0E1A] text-gray-400'}`}>
                  
                  {option === 'Mobile visit' ? <MapPinIcon className="mx-auto h-5 w-5" /> : <WrenchIcon className="mx-auto h-5 w-5" />}
                  <span className="mt-2 block text-xs font-semibold">{option}</span>
                </motion.button>);

            })}
          </div>
          {mode === 'Mobile visit' &&
          <div className="relative mt-3">
              <MapPinIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-amber-300" />
              <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Where is the car right now?"
              className="w-full rounded-xl border border-white/10 bg-[#0A0E1A] py-3 pl-11 pr-4 text-white outline-none placeholder:text-gray-500 focus:border-amber-400/60" />
            
            </div>
          }
        </section>

        <section>
          <label className="mb-3 block text-sm font-semibold text-gray-400">When do you need it?</label>
          <div className="grid grid-cols-3 gap-3">
            {[
            { id: 'now', label: 'ASAP' },
            { id: 'today', label: 'Today' },
            { id: 'later', label: 'Later' }].
            map((option) => {
              const selected = when === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setWhen(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-3 ${selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <CalendarDaysIcon className={`mx-auto h-5 w-5 ${selected ? 'text-amber-300' : 'text-gray-400'}`} />
                  <p className={`mt-1 text-xs font-semibold ${selected ? 'text-white' : 'text-gray-400'}`}>{option.label}</p>
                </motion.button>);

            })}
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
            { id: 'morning', label: 'Morning', note: '8–12' },
            { id: 'afternoon', label: 'Afternoon', note: '12–5' },
            { id: 'evening', label: 'Evening', note: '5–7' }].
            map((option) => {
              const selected = time === option.id;
              return (
                <motion.button
                  key={option.id}
                  onClick={() => setTime(option.id)}
                  whileTap={{ scale: 0.98 }}
                  className={`rounded-xl border-2 p-3 ${selected ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 bg-[#0A0E1A]'}`}>
                  
                  <Clock3Icon className={`mx-auto h-5 w-5 ${selected ? 'text-amber-300' : 'text-gray-400'}`} />
                  <p className={`mt-1 text-xs font-semibold ${selected ? 'text-white' : 'text-gray-400'}`}>{option.label}</p>
                  <p className="text-[10px] text-gray-500">{option.note}</p>
                </motion.button>);

            })}
          </div>
        </section>

        <div className="rounded-xl border border-amber-400/20 bg-amber-400/10 p-4">
          <p className="text-sm font-semibold text-amber-200">You approve the cost before work starts</p>
          <p className="mt-1 text-xs leading-5 text-gray-400">Verified OyaFix mechanics diagnose first, then send you a quote for approval.</p>
        </div>
      </div>
    </ServiceRequestSheet>);

}