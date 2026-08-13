import React from 'react';
import { motion } from 'framer-motion';
import { OyaService } from '../../data/oyaServices';

interface PartnerServicePickerProps {
  services: OyaService[];
  selectedId: string;
  onSelect: (serviceId: string) => void;
}

export function PartnerServicePicker({ services, selectedId, onSelect }: PartnerServicePickerProps) {
  return (
    <div className="border-b border-white/10 bg-[#0A0E1A]/95 px-4 py-3 backdrop-blur-xl">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-500">Choose an Oya service</p>
      <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Oya services">
        {services.map((service) => {
          const Icon = service.icon;
          const selected = service.id === selectedId;
          return (
            <motion.button
              key={service.id}
              role="tab"
              aria-selected={selected}
              onClick={() => onSelect(service.id)}
              whileTap={{ scale: 0.96 }}
              className={`flex flex-shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-xs font-bold transition-colors ${selected ? 'text-white' : 'border-white/10 bg-[#131B2E] text-gray-400'}`}
              style={selected ? { borderColor: service.accent, backgroundColor: service.accentSoft } : undefined}>
              
              <Icon className="h-4 w-4" style={{ color: selected ? service.accent : undefined }} />
              {service.brand}
            </motion.button>);

        })}
      </div>
    </div>);

}