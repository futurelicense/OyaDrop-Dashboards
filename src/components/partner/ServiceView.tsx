import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2Icon, Clock3Icon, ShieldCheckIcon, UsersIcon, WalletIcon } from 'lucide-react';
import { OyaService } from '../../data/oyaServices';

interface ServiceViewProps {
  service: OyaService;
  selectedOffering: string;
  onSelectOffering: (name: string) => void;
  onContinue: () => void;
}

export function ServiceView({ service, selectedOffering, onSelectOffering, onContinue }: ServiceViewProps) {
  const Icon = service.icon;
  const active = service.offerings.find((offering) => offering.name === selectedOffering) ?? service.offerings[0];

  return (
    <motion.section
      key={`service-${service.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <header className="flex items-start gap-3">
        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl" style={{ backgroundColor: service.accentSoft, color: service.accent }}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold">{service.brand} service menu</h2>
          <p className="mt-1 text-sm text-gray-500">Pick what you need — pricing and duration update instantly.</p>
        </div>
      </header>

      <div className="mt-5 space-y-3">
        {service.offerings.map((offering, index) => {
          const selected = offering.name === active.name;
          return (
            <motion.button
              key={offering.name}
              onClick={() => onSelectOffering(offering.name)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.985 }}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-colors ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
              style={selected ? { borderColor: service.accent, backgroundColor: service.accentSoft } : undefined}>
              
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${selected ? '' : 'border-gray-600'}`}
                  style={selected ? { borderColor: service.accent, backgroundColor: service.accent } : undefined}>
                  
                  {selected && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: service.accentText }} />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold">{offering.name}</p>
                    <span className="whitespace-nowrap text-sm font-bold" style={{ color: service.accent }}>{offering.price}</span>
                  </div>
                  <p className="mt-1 text-xs text-gray-400">{offering.description}</p>
                  <p className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
                    <Clock3Icon className="h-3.5 w-3.5" />
                    {offering.duration}
                  </p>
                </div>
              </div>
            </motion.button>);

        })}
      </div>

      <section className="mt-6 grid grid-cols-2 gap-3">
        {[
        [ShieldCheckIcon, 'Verified partner'] as const,
        [WalletIcon, 'Cost approved upfront'] as const,
        [CheckCircle2Icon, 'Service guarantee'] as const,
        [UsersIcon, 'OyaDrop support'] as const].
        map(([TrustIcon, label]) =>
        <div key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#131B2E] p-3">
            <TrustIcon className="h-5 w-5 flex-shrink-0" style={{ color: service.accent }} />
            <span className="text-sm text-gray-200">{label}</span>
          </div>
        )}
      </section>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500">Selected</p>
            <p className="mt-1 text-sm font-bold">{active.name}</p>
          </div>
          <p className="text-lg font-bold" style={{ color: service.accent }}>{active.price}</p>
        </div>
        <motion.button
          onClick={onContinue}
          whileTap={{ scale: 0.98 }}
          className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold"
          style={{ backgroundColor: service.accent, color: service.accentText }}>
          
          Continue to request
        </motion.button>
      </div>
    </motion.section>);

}