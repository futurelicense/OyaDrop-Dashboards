import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheckIcon, Clock3Icon, StarIcon } from 'lucide-react';
import type { PartnerServiceLine, PartnerStaff } from '../../data/oyaPartner';

interface ProviderSelectViewProps {
  service: PartnerServiceLine;
  providers: PartnerStaff[];
  selectedId?: string;
  onSelect: (provider: PartnerStaff) => void;
}

export function ProviderSelectView({ service, providers, selectedId, onSelect }: ProviderSelectViewProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <h2 className="text-lg font-bold">Choose your provider</h2>
      <p className="mt-1 text-sm text-gray-500">
        These {service.label.toLowerCase()} providers work under this partner
        {providers.length === 0 ? '.' : ' and match how you want to be served.'}
      </p>
      <div className="mt-5 space-y-3">
        {providers.length === 0 &&
        <p className="rounded-2xl border border-white/10 bg-[#131B2E] p-6 text-center text-sm text-gray-500">
            No providers are available for this service mode right now.
          </p>
        }
        {providers.map((provider, index) => {
          const selected = selectedId === provider.id;
          return (
            <motion.button
              key={provider.id}
              onClick={() => onSelect(provider)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full rounded-2xl border-2 p-4 text-left ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
              style={selected ? { borderColor: service.accent, backgroundColor: service.accentSoft } : undefined}>
              
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl text-sm font-bold" style={{ backgroundColor: service.accent, color: service.accentText }}>
                  {provider.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-bold">{provider.name}</p>
                    <BadgeCheckIcon className="h-4 w-4 flex-shrink-0" style={{ color: service.accent }} />
                  </div>
                  <p className="mt-0.5 text-xs text-gray-400">{provider.role}</p>
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {provider.rating} ({provider.reviews})
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock3Icon className="h-3.5 w-3.5" />
                      {provider.responseTime}
                    </span>
                    <span>{provider.completed}</span>
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {provider.specialties.map((specialty) =>
                    <span key={specialty} className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] font-semibold text-gray-400">
                        {specialty}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>);

        })}
      </div>
    </motion.section>);

}
