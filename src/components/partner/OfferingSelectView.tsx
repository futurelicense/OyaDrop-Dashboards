import React from 'react';
import { motion } from 'framer-motion';
import { Clock3Icon } from 'lucide-react';
import type { PartnerOffering, PartnerServiceLine } from '../../data/oyaPartner';

interface OfferingSelectViewProps {
  service: PartnerServiceLine;
  selectedId?: string;
  onSelect: (offering: PartnerOffering) => void;
}

export function OfferingSelectView({ service, selectedId, onSelect }: OfferingSelectViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <h2 className="text-lg font-bold">What do you need?</h2>
      <p className="mt-1 text-sm text-gray-500">Pick an offering from {service.label.toLowerCase()}.</p>
      <div className="mt-5 space-y-3">
        {service.offerings.map((offering, index) => {
          const selected = selectedId === offering.id;
          return (
            <motion.button
              key={offering.id}
              onClick={() => onSelect(offering)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full rounded-2xl border-2 p-4 text-left ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
              style={selected ? { borderColor: service.accent, backgroundColor: service.accentSoft } : undefined}>
              
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-bold">{offering.name}</p>
                <span className="whitespace-nowrap text-sm font-bold" style={{ color: service.accent }}>{offering.price}</span>
              </div>
              <p className="mt-1 text-xs text-gray-400">{offering.description}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
                <Clock3Icon className="h-3.5 w-3.5" />
                {offering.duration}
              </p>
            </motion.button>);

        })}
      </div>
    </motion.section>);

}
