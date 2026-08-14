import React from 'react';
import { motion } from 'framer-motion';
import type { PartnerServeMode, PartnerServiceLine } from '../../data/oyaPartner';

interface ServeModeViewProps {
  service: PartnerServiceLine;
  selectedId?: string;
  onSelect: (mode: PartnerServeMode) => void;
}

export function ServeModeView({ service, selectedId, onSelect }: ServeModeViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <h2 className="text-lg font-bold">How would you like to be served?</h2>
      <p className="mt-1 text-sm text-gray-500">
        Choose how {service.label.toLowerCase()} should happen under this partner.
      </p>
      <div className="mt-5 grid grid-cols-1 gap-3">
        {service.serveModes.map((mode, index) => {
          const Icon = mode.icon;
          const selected = selectedId === mode.id;
          return (
            <motion.button
              key={mode.id}
              onClick={() => onSelect(mode)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className={`rounded-2xl border-2 p-4 text-left ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
              style={selected ? { borderColor: service.accent, backgroundColor: service.accentSoft } : undefined}>
              
              <Icon className="h-6 w-6" style={{ color: selected ? service.accent : '#94a3b8' }} />
              <p className="mt-3 text-sm font-bold">{mode.label}</p>
              <p className="mt-1 text-xs leading-5 text-gray-400">{mode.description}</p>
            </motion.button>);

        })}
      </div>
    </motion.section>);

}
