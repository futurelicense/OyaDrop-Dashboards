import React from 'react';
import { motion } from 'framer-motion';
import {
  BadgeCheckIcon,
  CheckIcon,
  Clock3Icon,
  CopyIcon,
  MapPinIcon,
  MessageCircleIcon,
  PhoneIcon,
  StarIcon } from
'lucide-react';
import {
  childServices,
  topLevelServices,
  type OyaPartnerBusiness,
  type PartnerServiceLine } from
'../../data/oyaPartner';

interface PartnerLandingViewProps {
  partner: OyaPartnerBusiness;
  linkCopied: boolean;
  onCopyLink: () => void;
  onAction: (message: string) => void;
  onSelectService: (service: PartnerServiceLine) => void;
}

export function PartnerLandingView({
  partner,
  linkCopied,
  onCopyLink,
  onAction,
  onSelectService
}: PartnerLandingViewProps) {
  const visible = topLevelServices(partner).filter((service) => service.enabled);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#131B2E]">
        <div className="h-28 bg-gradient-to-br from-teal-500/30 via-amber-400/10 to-emerald-400/20" />
        <div className="px-5 pb-5">
          <div className="-mt-8 flex items-end justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-[#131B2E] bg-teal-400 text-[#042f2f] text-lg font-black">
              LS
            </div>
            <span className="mb-1 flex items-center gap-1.5 rounded-full border border-teal-300/25 bg-teal-400/15 px-3 py-1.5 text-xs font-bold text-teal-200">
              <span className="h-2 w-2 rounded-full bg-teal-300" />
              {partner.hours}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <h1 className="text-xl font-bold">{partner.name}</h1>
            <BadgeCheckIcon className="h-5 w-5 text-teal-300" aria-label="Verified partner" />
          </div>
          <p className="mt-1 text-sm text-gray-400">{partner.tagline}</p>
          <p className="mt-1 text-xs text-gray-500">{partner.operator} · OyaDrop partner</p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              <b>{partner.rating}</b>
              <span className="text-gray-500">({partner.reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <MapPinIcon className="h-4 w-4 text-teal-300" />
              {partner.zone}
            </span>
          </div>
        </div>

        <div className="border-t border-white/10 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Partner OneLink</p>
          <button
            onClick={onCopyLink}
            className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-left transition-colors hover:border-white/20">
            
            <span className="truncate text-sm text-gray-300">{partner.handle}</span>
            {linkCopied ? <CheckIcon className="h-4 w-4 flex-shrink-0 text-teal-300" /> : <CopyIcon className="h-4 w-4 flex-shrink-0 text-gray-500" />}
          </button>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <SecondaryAction label="Chat" icon={MessageCircleIcon} onClick={() => onAction(`Chat opened with ${partner.name}.`)} />
            <SecondaryAction label="Call" icon={PhoneIcon} onClick={() => onAction(`Calling ${partner.operator}...`)} />
          </div>
        </div>
      </article>

      <section className="mt-7">
        <h2 className="text-lg font-bold">What do you need?</h2>
        <p className="mt-1 text-sm text-gray-500">Tap a service to continue.</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {visible.map((service, index) => {
            const Icon = service.icon;
            const nested = childServices(partner, service.id).filter((child) => child.enabled);
            const available = service.providers.filter((provider) => provider.available).length +
            nested.reduce((total, child) => total + child.providers.filter((provider) => provider.available).length, 0);
            return (
              <motion.button
                key={service.id}
                onClick={() => onSelectService(service)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl border border-white/10 bg-[#131B2E] p-4 text-left hover:border-white/20">
                
                <div className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: service.accent, color: service.accentText }}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold leading-tight">{service.label}</p>
                <p className="mt-1 text-[11px] font-bold" style={{ color: service.accent }}>{service.brand}</p>
                {nested.length > 0 &&
                <p className="mt-1 text-[10px] font-semibold text-gray-400">
                    Includes {nested.map((child) => child.label.toLowerCase()).join(', ')}
                  </p>
                }
                <p className="mt-2 flex items-center gap-1 text-[11px] text-gray-500">
                  <Clock3Icon className="h-3 w-3 flex-shrink-0" />
                  <span className="truncate">From {service.offerings[0]?.price}</span>
                </p>
                <p className="mt-1 text-[10px] text-gray-600">{available} providers</p>
              </motion.button>);

          })}
        </div>
      </section>
    </motion.section>);

}

function SecondaryAction({ label, icon: Icon, onClick }: {label: string;icon: typeof PhoneIcon;onClick: () => void;}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-[#0A0E1A] py-3 text-xs font-semibold text-gray-300 hover:border-white/20">
      
      <Icon className="h-4 w-4" />
      {label}
    </motion.button>);

}
