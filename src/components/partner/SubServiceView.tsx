import React from 'react';
import { motion } from 'framer-motion';
import { Clock3Icon } from 'lucide-react';
import type { PartnerServiceLine } from '../../data/oyaPartner';

interface SubServiceViewProps {
  parent: PartnerServiceLine;
  options: PartnerServiceLine[];
  selectedId?: string;
  onSelect: (service: PartnerServiceLine) => void;
}

export function SubServiceView({ parent, options, selectedId, onSelect }: SubServiceViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <h2 className="text-lg font-bold">What do you need from {parent.brand}?</h2>
      <p className="mt-1 text-sm text-gray-500">Car wash is a sub-service under {parent.brand}.</p>
      <div className="mt-5 grid grid-cols-2 gap-3">
        {options.map((option, index) => {
          const Icon = option.icon;
          const selected = selectedId === option.id;
          const available = option.providers.filter((provider) => provider.available).length;
          return (
            <motion.button
              key={option.id}
              onClick={() => onSelect(option)}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.04 }}
              whileTap={{ scale: 0.97 }}
              className={`rounded-2xl border-2 p-4 text-left ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
              style={selected ? { borderColor: option.accent, backgroundColor: option.accentSoft } : undefined}>
              
              <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: option.accent, color: option.accentText }}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-bold leading-tight">{option.label}</p>
              <p className="mt-1 text-[11px] leading-4 text-gray-400">{option.description}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
                <Clock3Icon className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">From {option.offerings[0]?.price}</span>
              </p>
              <p className="mt-1 text-[10px] text-gray-600">{available} providers</p>
            </motion.button>);

        })}
      </div>
    </motion.section>);

}
