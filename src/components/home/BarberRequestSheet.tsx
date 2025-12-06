import React, { useState } from 'react';
import { Scissors, Calendar, Clock } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface BarberRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    service: string;
    when: string;
    time: string;
  }) => void;
}
const services = [{
  id: 'haircut',
  name: 'Haircut',
  icon: '✂️'
}, {
  id: 'shave',
  name: 'Shave',
  icon: '🪒'
}, {
  id: 'both',
  name: 'Both',
  icon: '💈'
}, {
  id: 'styling',
  name: 'Styling',
  icon: '💇'
}];
export function BarberRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: BarberRequestSheetProps) {
  const [selectedService, setSelectedService] = useState('haircut');
  const [when, setWhen] = useState('today');
  const [time, setTime] = useState('morning');
  const handleSubmit = () => {
    onSubmit({
      service: selectedService,
      when,
      time
    });
  };
  return <ServiceRequestSheet isOpen={isOpen} onClose={onClose} title="Barber Appointment" subtitle="Book grooming service" color="#FF6B00" icon={<Scissors className="w-6 h-6 text-orange-400" />} onSubmit={handleSubmit} submitLabel="Find Barbers">
      <div className="space-y-6">
        {/* Service Type */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            What service do you need?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {services.map(service => <motion.button key={service.id} className={`p-4 rounded-xl border-2 transition-all ${selectedService === service.id ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setSelectedService(service.id)} whileTap={{
            scale: 0.98
          }}>
                <div className="text-2xl mb-2">{service.icon}</div>
                <p className={`text-sm font-semibold ${selectedService === service.id ? 'text-white' : 'text-gray-400'}`}>
                  {service.name}
                </p>
              </motion.button>)}
          </div>
        </div>

        {/* When */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            When?
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[{
            value: 'today',
            label: 'Today'
          }, {
            value: 'tomorrow',
            label: 'Tomorrow'
          }, {
            value: 'later',
            label: 'Later'
          }].map(option => <motion.button key={option.value} className={`p-3 rounded-xl border-2 transition-all ${when === option.value ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setWhen(option.value)} whileTap={{
            scale: 0.98
          }}>
                <Calendar className={`w-5 h-5 mx-auto mb-1 ${when === option.value ? 'text-orange-400' : 'text-gray-400'}`} />
                <p className={`text-xs font-semibold ${when === option.value ? 'text-white' : 'text-gray-400'}`}>
                  {option.label}
                </p>
              </motion.button>)}
          </div>
        </div>

        {/* Time */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            Preferred Time
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[{
            value: 'morning',
            label: 'Morning',
            time: '8-12'
          }, {
            value: 'afternoon',
            label: 'Afternoon',
            time: '12-5'
          }, {
            value: 'evening',
            label: 'Evening',
            time: '5-8'
          }].map(option => <motion.button key={option.value} className={`p-3 rounded-xl border-2 transition-all ${time === option.value ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`} onClick={() => setTime(option.value)} whileTap={{
            scale: 0.98
          }}>
                <Clock className={`w-5 h-5 mx-auto mb-1 ${time === option.value ? 'text-orange-400' : 'text-gray-400'}`} />
                <p className={`text-xs font-semibold ${time === option.value ? 'text-white' : 'text-gray-400'}`}>
                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </motion.button>)}
          </div>
        </div>
      </div>
    </ServiceRequestSheet>;
}