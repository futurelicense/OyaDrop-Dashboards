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
  RepeatIcon,
  StarIcon,
  TrendingUpIcon } from
'lucide-react';
import { OyaService } from '../../data/oyaServices';

interface BusinessfrontViewProps {
  service: OyaService;
  linkCopied: boolean;
  onCopyLink: () => void;
  onAction: (message: string) => void;
  onStartRequest: () => void;
}

export function BusinessfrontView({ service, linkCopied, onCopyLink, onAction, onStartRequest }: BusinessfrontViewProps) {
  const { provider } = service;
  const Icon = service.icon;

  return (
    <motion.section
      key={`businessfront-${service.id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#131B2E]">
        <div className="p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: service.accent, color: service.accentText }}>
              <Icon className="h-7 w-7" />
            </div>
            <span className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold" style={{ borderColor: service.accent, backgroundColor: service.accentSoft, color: service.accent }}>
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: service.accent }} />
              Open now
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <h2 className="text-xl font-bold">{provider.business}</h2>
            <BadgeCheckIcon className="h-5 w-5" style={{ color: service.accent }} aria-label="Verified partner" />
          </div>
          <p className="mt-1 text-sm text-gray-400">{provider.tagline}</p>
          <p className="mt-1 text-xs text-gray-500">{provider.operator} · {service.brand} partner</p>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span className="flex items-center gap-1.5">
              <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
              <b>{provider.rating}</b>
              <span className="text-gray-500">({provider.reviews} reviews)</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <MapPinIcon className="h-4 w-4" style={{ color: service.accent }} />
              {provider.zone}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 border-y border-white/10 bg-[#0A0E1A]/40 px-4 py-4">
          <Stat icon={Clock3Icon} label="Response" value={provider.responseTime.replace('Replies in ', '').replace('Accepts in ', '')} accent={service.accent} />
          <Stat icon={TrendingUpIcon} label="Completed" value={provider.completed} accent={service.accent} />
          <Stat icon={RepeatIcon} label="Loyalty" value={provider.repeatRate.split(' ')[0]} accent={service.accent} />
        </div>

        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Public business link</p>
          <button
            onClick={onCopyLink}
            className="mt-2 flex w-full items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-left transition-colors hover:border-white/20">
            
            <span className="truncate text-sm text-gray-300">{provider.handle}</span>
            {linkCopied ? <CheckIcon className="h-4 w-4 flex-shrink-0" style={{ color: service.accent }} /> : <CopyIcon className="h-4 w-4 flex-shrink-0 text-gray-500" />}
          </button>

          <div className="mt-4 grid grid-cols-3 gap-3">
            <SecondaryAction label="Chat" icon={MessageCircleIcon} onClick={() => onAction(`Chat opened with ${provider.business}.`)} />
            <SecondaryAction label="Call" icon={PhoneIcon} onClick={() => onAction(`Calling ${provider.operator}...`)} />
            <SecondaryAction label="Directions" icon={MapPinIcon} onClick={() => onAction(`Directions sent for ${provider.business}.`)} />
          </div>

          <motion.button
            onClick={onStartRequest}
            whileTap={{ scale: 0.98 }}
            className="mt-4 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: service.accent, color: service.accentText }}>
            
            Request {service.label.toLowerCase()}
          </motion.button>
        </div>
      </article>

      <section className="mt-6">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-gray-500">What this partner is known for</h3>
        <div className="mt-3 space-y-2">
          {service.offerings.map((offering, index) =>
          <motion.div
            key={offering.name}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
            
              <div className="min-w-0">
                <p className="text-sm font-bold">{offering.name}</p>
                <p className="mt-1 text-xs text-gray-500">{offering.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-bold" style={{ color: service.accent }}>{offering.price}</p>
                <p className="mt-1 text-[11px] text-gray-500">{offering.duration}</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.section>);

}

function Stat({ icon: Icon, label, value, accent }: {icon: typeof StarIcon;label: string;value: string;accent: string;}) {
  return (
    <div className="text-center">
      <Icon className="mx-auto h-4 w-4" style={{ color: accent }} />
      <p className="mt-2 truncate text-sm font-bold">{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-gray-500">{label}</p>
    </div>);

}

function SecondaryAction({ label, icon: Icon, onClick }: {label: string;icon: typeof PhoneIcon;onClick: () => void;}) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-[#0A0E1A] py-3 text-xs font-semibold text-gray-300 hover:border-white/20">
      
      <Icon className="h-4 w-4" />
      {label}
    </motion.button>);

}