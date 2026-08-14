import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheckIcon,
  BanknoteIcon,
  CheckCircle2Icon,
  CheckIcon,
  CreditCardIcon,
  Loader2Icon,
  MapPinIcon,
  SendIcon,
  StarIcon,
  WalletIcon } from
'lucide-react';

export type JourneyStage = 'request' | 'matching' | 'confirmed' | 'chat' | 'payment' | 'tracking' | 'complete';

export const journeyOrder: JourneyStage[] = ['request', 'matching', 'confirmed', 'chat', 'payment', 'tracking', 'complete'];

const stageLabels: Record<JourneyStage, string> = {
  request: 'Request',
  matching: 'Matching',
  confirmed: 'Confirmed',
  chat: 'Chat',
  payment: 'Payment',
  tracking: 'Tracking',
  complete: 'Done'
};

export interface PartnerJourneyContext {
  brand: string;
  accent: string;
  accentSoft: string;
  accentText: string;
  partnerName: string;
  providerName: string;
  offering: string;
  serveMode?: string;
  zone: string;
  estimate: string;
  requestPrompt: string;
  matchingCopy: string;
  trackingSteps: string[];
  chatOpener: string;
  rating: number;
  responseTime: string;
}

interface ChatMessage {
  id: number;
  from: 'provider' | 'customer';
  text: string;
}

interface RequestJourneyViewProps {
  journey: PartnerJourneyContext;
  stage: JourneyStage;
  onStageChange: (stage: JourneyStage) => void;
  onReset: () => void;
  onToast: (message: string) => void;
}

export function RequestJourneyView({ journey, stage, onStageChange, onReset, onToast }: RequestJourneyViewProps) {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([{ id: 1, from: 'provider', text: journey.chatOpener }]);
  const [trackingStep, setTrackingStep] = useState(0);

  useEffect(() => {
    setMessages([{ id: 1, from: 'provider', text: journey.chatOpener }]);
    setTrackingStep(0);
  }, [journey.chatOpener, journey.providerName]);

  useEffect(() => {
    if (stage !== 'matching') return;
    const timer = window.setTimeout(() => onStageChange('confirmed'), 1800);
    return () => window.clearTimeout(timer);
  }, [stage, onStageChange]);

  useEffect(() => {
    if (stage !== 'tracking') return;
    const timer = window.setInterval(() => {
      setTrackingStep((current) => current < journey.trackingSteps.length - 1 ? current + 1 : current);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [stage, journey.trackingSteps.length]);

  const sendMessage = () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setMessages((current) => [...current, { id: current.length + 1, from: 'customer', text }]);
    setDraft('');
    window.setTimeout(() => {
      setMessages((current) => [...current, { id: current.length + 1, from: 'provider', text: 'Noted — thank you. Everything is set on our side.' }]);
    }, 900);
  };

  const currentIndex = journeyOrder.indexOf(stage);
  const firstName = journey.providerName.split(' ')[0];

  return (
    <motion.section
      key={`request-${journey.providerName}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      className="px-4 py-5">
      
      <ol className="flex items-center gap-1" aria-label="Customer journey progress">
        {journeyOrder.map((step, index) => {
          const done = index < currentIndex;
          const active = index === currentIndex;
          return (
            <li key={step} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex w-full items-center">
                <span
                  className="h-1 flex-1 rounded-full"
                  style={{ backgroundColor: index === 0 ? 'transparent' : done || active ? journey.accent : 'rgba(255,255,255,0.1)' }} />
                
                <span
                  className="mx-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 text-[9px] font-bold"
                  style={{
                    borderColor: done || active ? journey.accent : 'rgba(255,255,255,0.18)',
                    backgroundColor: done ? journey.accent : 'transparent',
                    color: done ? journey.accentText : active ? journey.accent : '#64748b'
                  }}>
                  
                  {done ? <CheckIcon className="h-3 w-3" /> : index + 1}
                </span>
                <span
                  className="h-1 flex-1 rounded-full"
                  style={{ backgroundColor: index === journeyOrder.length - 1 ? 'transparent' : done ? journey.accent : 'rgba(255,255,255,0.1)' }} />
                
              </div>
              <span className={`text-[9px] font-semibold ${active ? 'text-white' : 'text-gray-600'}`}>{stageLabels[step]}</span>
            </li>);

        })}
      </ol>

      <AnimatePresence mode="wait">
        {stage === 'request' &&
        <motion.div key="request" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <h2 className="text-lg font-bold">Review your request</h2>
            <p className="mt-1 text-sm text-gray-500">This is what {journey.partnerName} will send to {firstName}.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              <SummaryRow label="Partner" value={journey.partnerName} />
              <SummaryRow label="Service" value={journey.brand} />
              <SummaryRow label="Selected" value={journey.offering} />
              {journey.serveMode && <SummaryRow label="How served" value={journey.serveMode} />}
              <SummaryRow label="Provider" value={journey.providerName} />
              <SummaryRow label="Details" value={journey.requestPrompt} />
              <SummaryRow label="Area" value={journey.zone} />
              <SummaryRow label="Estimate" value={journey.estimate} accent={journey.accent} />
            </div>
            <motion.button
            onClick={() => onStageChange('matching')}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: journey.accent, color: journey.accentText }}>
            
              Send request to {firstName}
            </motion.button>
          </motion.div>
        }

        {stage === 'matching' &&
        <motion.div key="matching" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-10 flex flex-col items-center text-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
              <Loader2Icon className="h-12 w-12" style={{ color: journey.accent }} />
            </motion.div>
            <h2 className="mt-6 text-lg font-bold">{journey.matchingCopy}</h2>
            <p className="mt-2 max-w-xs text-sm text-gray-500">Usually takes under a minute. We confirm availability with your chosen provider.</p>
            <div className="mt-6 w-full space-y-2">
              {['Checking availability', 'Confirming your window', `Notifying ${firstName}`].map((line, index) =>
            <motion.p
              key={line}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.4 }}
              className="rounded-xl border border-white/10 bg-[#131B2E] px-4 py-3 text-left text-sm text-gray-300">
              
                  {line}
                </motion.p>
            )}
            </div>
          </motion.div>
        }

        {stage === 'confirmed' &&
        <motion.div key="confirmed" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2Icon className="h-5 w-5" style={{ color: journey.accent }} />
              <h2 className="text-lg font-bold">Provider confirmed</h2>
            </div>
            <div className="mt-4 rounded-2xl border p-4" style={{ borderColor: journey.accent, backgroundColor: journey.accentSoft }}>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-sm font-bold" style={{ backgroundColor: journey.accent, color: journey.accentText }}>
                  {journey.providerName.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate font-bold">{journey.providerName}</p>
                    <BadgeCheckIcon className="h-4 w-4 flex-shrink-0" style={{ color: journey.accent }} />
                  </div>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-300">
                    <StarIcon className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    {journey.rating} · {journey.responseTime}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-200">
                {firstName} accepted your {journey.offering.toLowerCase()}
                {journey.serveMode ? ` · ${journey.serveMode.toLowerCase()}` : ''} request under {journey.partnerName}.
              </p>
            </div>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              <SummaryRow label="Reference" value={`OYA-HUB-${Math.random().toString(36).slice(2, 6).toUpperCase()}`} />
              <SummaryRow label="Estimate" value={journey.estimate} accent={journey.accent} />
              <SummaryRow label="Next step" value="Confirm details in chat" />
            </div>
            <motion.button
            onClick={() => onStageChange('chat')}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: journey.accent, color: journey.accentText }}>
            
              Message {firstName}
            </motion.button>
          </motion.div>
        }

        {stage === 'chat' &&
        <motion.div key="chat" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <h2 className="text-lg font-bold">Chat with {journey.providerName}</h2>
            <p className="mt-1 text-sm text-gray-500">Confirm access, timing or special requests before paying.</p>
            <div className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              {messages.map((message) =>
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === 'customer' ? 'ml-auto' : 'bg-[#0A0E1A] text-gray-200'}`}
              style={message.from === 'customer' ? { backgroundColor: journey.accent, color: journey.accentText } : undefined}>
              
                  {message.text}
                </motion.div>
            )}
            </div>
            <div className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor="journey-chat-input">Message</label>
              <input
              id="journey-chat-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') sendMessage();
              }}
              placeholder="Type a message..."
              className="flex-1 rounded-xl border border-white/10 bg-[#0A0E1A] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-white/25" />
            
              <button aria-label="Send message" onClick={sendMessage} className="rounded-xl px-4" style={{ backgroundColor: journey.accent, color: journey.accentText }}>
                <SendIcon className="h-4 w-4" />
              </button>
            </div>
            <motion.button
            onClick={() => onStageChange('payment')}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: journey.accent, color: journey.accentText }}>
            
              Continue to payment
            </motion.button>
          </motion.div>
        }

        {stage === 'payment' &&
        <motion.div key="payment" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <h2 className="text-lg font-bold">Confirm and pay</h2>
            <p className="mt-1 text-sm text-gray-500">Funds are held until the job is marked complete.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              <SummaryRow label={journey.offering} value={journey.estimate} />
              <SummaryRow label="Service fee" value="₦500" />
              <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
                <span className="text-sm font-bold">Total</span>
                <span className="text-lg font-bold" style={{ color: journey.accent }}>{journey.estimate}</span>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              {[
            { id: 'wallet', label: 'OyaWallet', detail: 'Balance ₦86,400', icon: WalletIcon },
            { id: 'card', label: 'Card', detail: 'Visa •••• 4412', icon: CreditCardIcon },
            { id: 'cash', label: 'Cash on completion', detail: 'Pay the partner directly', icon: BanknoteIcon }].
            map((option) => {
              const OptionIcon = option.icon;
              const selected = paymentMethod === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  className={`flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left ${selected ? '' : 'border-white/10 bg-[#131B2E]'}`}
                  style={selected ? { borderColor: journey.accent, backgroundColor: journey.accentSoft } : undefined}>
                  
                    <OptionIcon className="h-5 w-5 flex-shrink-0" style={{ color: selected ? journey.accent : '#94a3b8' }} />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-bold">{option.label}</span>
                      <span className="block text-xs text-gray-500">{option.detail}</span>
                    </span>
                    {selected && <CheckIcon className="h-4 w-4 flex-shrink-0" style={{ color: journey.accent }} />}
                  </button>);

            })}
            </div>
            <motion.button
            onClick={() => {
              onToast('Payment authorised and held securely.');
              onStageChange('tracking');
            }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: journey.accent, color: journey.accentText }}>
            
              Pay {journey.estimate}
            </motion.button>
          </motion.div>
        }

        {stage === 'tracking' &&
        <motion.div key="tracking" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-6">
            <h2 className="text-lg font-bold">Live tracking</h2>
            <p className="mt-1 text-sm text-gray-500">{journey.providerName} is handling your {journey.offering.toLowerCase()}.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              <ol className="space-y-4">
                {journey.trackingSteps.map((step, index) => {
                const done = index < trackingStep;
                const active = index === trackingStep;
                return (
                  <li key={step} className="flex gap-3">
                      <span
                      className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2"
                      style={{
                        borderColor: done || active ? journey.accent : 'rgba(255,255,255,0.18)',
                        backgroundColor: done ? journey.accent : 'transparent'
                      }}>
                      
                        {done && <CheckIcon className="h-3 w-3" style={{ color: journey.accentText }} />}
                        {active && <motion.span className="h-2 w-2 rounded-full" style={{ backgroundColor: journey.accent }} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />}
                      </span>
                      <span className={`text-sm ${done || active ? 'font-semibold text-white' : 'text-gray-500'}`}>{step}</span>
                    </li>);

              })}
              </ol>
            </div>
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#131B2E] p-4">
              <MapPinIcon className="h-5 w-5 flex-shrink-0" style={{ color: journey.accent }} />
              <p className="text-sm text-gray-300">{journey.zone.split(' · ')[0]} · live updates every few minutes</p>
            </div>
            <motion.button
            onClick={() => onStageChange('complete')}
            whileTap={{ scale: 0.98 }}
            className="mt-5 w-full rounded-xl py-3.5 text-sm font-bold"
            style={{ backgroundColor: journey.accent, color: journey.accentText }}>
            
              Mark as received
            </motion.button>
          </motion.div>
        }

        {stage === 'complete' &&
        <motion.div key="complete" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mt-8 flex flex-col items-center text-center">
            <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 14 }}
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: journey.accentSoft }}>
            
              <CheckCircle2Icon className="h-11 w-11" style={{ color: journey.accent }} />
            </motion.div>
            <h2 className="mt-6 text-xl font-bold">Request complete</h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-gray-400">
              Payment released to {journey.partnerName} for {journey.providerName}. A receipt is in your history.
            </p>
            <div className="mt-6 w-full rounded-2xl border border-white/10 bg-[#131B2E] p-4 text-left">
              <p className="text-sm font-bold">Rate this provider</p>
              <div className="mt-3 flex gap-2">
                {[1, 2, 3, 4, 5].map((value) =>
              <button key={value} aria-label={`Rate ${value} stars`} onClick={() => onToast(`Thanks — you rated ${journey.providerName} ${value} stars.`)}>
                    <StarIcon className="h-7 w-7 text-gray-600 transition-colors hover:fill-amber-400 hover:text-amber-400" />
                  </button>
              )}
              </div>
            </div>
            <button onClick={onReset} className="mt-5 w-full rounded-xl border border-white/10 bg-white/5 py-3.5 text-sm font-semibold">
              Book another service
            </button>
          </motion.div>
        }
      </AnimatePresence>
    </motion.section>);

}

function SummaryRow({ label, value, accent }: {label: string;value: string;accent?: string;}) {
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <span className="text-gray-400">{label}</span>
      <span className="text-right font-semibold" style={accent ? { color: accent } : undefined}>{value}</span>
    </div>);

}
