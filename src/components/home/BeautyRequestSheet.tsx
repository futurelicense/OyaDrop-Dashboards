import React, { useState } from 'react';
import { Sparkles, Calendar, Clock } from 'lucide-react';
import { ServiceRequestSheet } from './ServiceRequestSheet';
import { motion } from 'framer-motion';
interface BeautyRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {service: string;when: string;time: string;}) => void;
}
const beautyServices = [
{
  id: 'haircut',
  name: 'Haircut',
  icon: '✂️',
  category: 'Hair'
},
{
  id: 'braids',
  name: 'Braids',
  icon: '🎀',
  category: 'Hair'
},
{
  id: 'dreadlocks',
  name: 'Dreadlocks',
  icon: '🌀',
  category: 'Hair'
},
{
  id: 'weaving',
  name: 'Weaving',
  icon: '💫',
  category: 'Hair'
},
{
  id: 'coloring',
  name: 'Hair Coloring',
  icon: '🎨',
  category: 'Hair'
},
{
  id: 'styling',
  name: 'Hair Styling',
  icon: '💇',
  category: 'Hair'
},
{
  id: 'manicure',
  name: 'Manicure',
  icon: '💅',
  category: 'Nails'
},
{
  id: 'pedicure',
  name: 'Pedicure',
  icon: '🦶',
  category: 'Nails'
},
{
  id: 'facial',
  name: 'Facial',
  icon: '✨',
  category: 'Skin'
},
{
  id: 'makeup',
  name: 'Makeup',
  icon: '💄',
  category: 'Face'
},
{
  id: 'massage',
  name: 'Massage',
  icon: '💆',
  category: 'Spa'
},
{
  id: 'waxing',
  name: 'Waxing',
  icon: '🌟',
  category: 'Skin'
}];

export function BeautyRequestSheet({
  isOpen,
  onClose,
  onSubmit
}: BeautyRequestSheetProps) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [when, setWhen] = useState('today');
  const [time, setTime] = useState('morning');
  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) =>
    prev.includes(serviceId) ?
    prev.filter((id) => id !== serviceId) :
    [...prev, serviceId]
    );
  };
  const handleSubmit = () => {
    onSubmit({
      service: selectedServices.join(', '),
      when,
      time
    });
  };
  // Group services by category
  const categories = Array.from(new Set(beautyServices.map((s) => s.category)));
  return (
    <ServiceRequestSheet
      isOpen={isOpen}
      onClose={onClose}
      title="Beauty Services"
      subtitle="Hair, nails, spa & more"
      color="#FF6B00"
      icon={<Sparkles className="w-6 h-6 text-orange-400" />}
      onSubmit={handleSubmit}
      submitLabel="Find Beauty Providers">

      <div className="space-y-6">
        {/* Service Selection */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            What services do you need?
          </label>

          {categories.map((category) =>
          <div key={category} className="mb-4">
              <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                {category}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {beautyServices.
              filter((s) => s.category === category).
              map((service) =>
              <motion.button
                key={service.id}
                className={`p-3 rounded-xl border-2 transition-all ${selectedServices.includes(service.id) ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
                onClick={() => toggleService(service.id)}
                whileTap={{
                  scale: 0.98
                }}>

                      <div className="text-xl mb-1">{service.icon}</div>
                      <p
                  className={`text-xs font-semibold ${selectedServices.includes(service.id) ? 'text-white' : 'text-gray-400'}`}>

                        {service.name}
                      </p>
                    </motion.button>
              )}
              </div>
            </div>
          )}
        </div>

        {/* Selected Services Summary */}
        {selectedServices.length > 0 &&
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
            <p className="text-sm font-bold text-orange-400 mb-2">
              Selected Services ({selectedServices.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((serviceId) => {
              const service = beautyServices.find((s) => s.id === serviceId);
              return (
                <span
                  key={serviceId}
                  className="text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-lg">

                    {service?.icon} {service?.name}
                  </span>);

            })}
            </div>
          </div>
        }

        {/* When */}
        <div>
          <label className="text-sm font-semibold text-gray-400 mb-3 block">
            When?
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
              className={`p-3 rounded-xl border-2 transition-all ${when === option.value ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setWhen(option.value)}
              whileTap={{
                scale: 0.98
              }}>

                <Calendar
                className={`w-5 h-5 mx-auto mb-1 ${when === option.value ? 'text-orange-400' : 'text-gray-400'}`} />

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
            Preferred Time
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
              className={`p-3 rounded-xl border-2 transition-all ${time === option.value ? 'bg-orange-500/20 border-orange-500' : 'bg-[#0A0E1A] border-white/10'}`}
              onClick={() => setTime(option.value)}
              whileTap={{
                scale: 0.98
              }}>

                <Clock
                className={`w-5 h-5 mx-auto mb-1 ${time === option.value ? 'text-orange-400' : 'text-gray-400'}`} />

                <p
                className={`text-xs font-semibold ${time === option.value ? 'text-white' : 'text-gray-400'}`}>

                  {option.label}
                </p>
                <p className="text-[10px] text-gray-500">{option.time}</p>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </ServiceRequestSheet>);

}