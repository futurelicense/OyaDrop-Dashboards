import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LayersIcon, MenuIcon, SearchIcon } from 'lucide-react';
import { oyaServices } from '../data/oyaServices';
import { PartnerServicePicker } from '../components/partner/PartnerServicePicker';
import { BusinessfrontView } from '../components/partner/BusinessfrontView';
import { ServiceView } from '../components/partner/ServiceView';
import { RequestJourneyView, JourneyStage } from '../components/partner/RequestJourneyView';

type PartnerView = 'businessfront' | 'service' | 'request';

const views: {id: PartnerView;label: string;hint: string;}[] = [
{ id: 'businessfront', label: 'Businessfront', hint: 'How the partner appears publicly' },
{ id: 'service', label: 'Service', hint: 'What they offer and at what price' },
{ id: 'request', label: 'Request', hint: 'The full customer journey' }];


interface PartnerBusinessFrontPageProps {
  onMenuClick: () => void;
}

export function PartnerBusinessFrontPage({ onMenuClick }: PartnerBusinessFrontPageProps) {
  const [activeView, setActiveView] = useState<PartnerView>('businessfront');
  const [serviceId, setServiceId] = useState(oyaServices[0].id);
  const [offering, setOffering] = useState(oyaServices[0].offerings[0].name);
  const [stage, setStage] = useState<JourneyStage>('request');
  const [linkCopied, setLinkCopied] = useState(false);
  const [toast, setToast] = useState('');

  const service = oyaServices.find((item) => item.id === serviceId) ?? oyaServices[0];
  const activeHint = views.find((view) => view.id === activeView)?.hint ?? '';

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const handleSelectService = (nextId: string) => {
    const next = oyaServices.find((item) => item.id === nextId);
    if (!next) return;
    setServiceId(nextId);
    setOffering(next.offerings[0].name);
    setStage('request');
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${service.provider.handle}`);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <button aria-label="Open navigation" onClick={onMenuClick} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">
            <MenuIcon className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-sm font-bold leading-tight">Partner Business Front</p>
            <p className="text-[11px] text-gray-500">OyaDrop partner experience</p>
          </div>
          <button aria-label="Search partners" onClick={() => showToast('Partner search is coming to this prototype.')} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">
            <SearchIcon className="h-5 w-5" />
          </button>
        </div>

        <PartnerServicePicker services={oyaServices} selectedId={serviceId} onSelect={handleSelectService} />

        <div className="border-b border-white/10 px-4 py-3">
          <div className="flex gap-2" role="tablist" aria-label="Partner views">
            {views.map((view) => {
              const selected = activeView === view.id;
              return (
                <button
                  key={view.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveView(view.id)}
                  className={`relative flex-1 rounded-xl px-3 py-2.5 text-xs font-bold transition-colors ${selected ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                  style={selected ? { backgroundColor: service.accentSoft } : undefined}>
                  
                  {selected &&
                  <motion.span
                    layoutId="partner-view-indicator"
                    className="absolute inset-x-3 bottom-1 h-0.5 rounded-full"
                    style={{ backgroundColor: service.accent }} />

                  }
                  {view.label}
                </button>);

            })}
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-500">
            <LayersIcon className="h-3.5 w-3.5" style={{ color: service.accent }} />
            {activeHint}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-2xl pb-16">
        <AnimatePresence mode="wait">
          {activeView === 'businessfront' &&
          <BusinessfrontView
            key={`bf-${service.id}`}
            service={service}
            linkCopied={linkCopied}
            onCopyLink={copyLink}
            onAction={showToast}
            onStartRequest={() => {
              setStage('request');
              setActiveView('request');
            }} />

          }

          {activeView === 'service' &&
          <ServiceView
            key={`sv-${service.id}`}
            service={service}
            selectedOffering={offering}
            onSelectOffering={setOffering}
            onContinue={() => {
              setStage('request');
              setActiveView('request');
            }} />

          }

          {activeView === 'request' &&
          <RequestJourneyView
            key={`rq-${service.id}`}
            service={service}
            stage={stage}
            offering={offering}
            onStageChange={setStage}
            onReset={() => {
              setStage('request');
              setActiveView('businessfront');
            }}
            onToast={showToast} />

          }
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {toast &&
        <motion.div
          role="status"
          className="fixed bottom-8 left-4 right-4 z-50 mx-auto max-w-md rounded-xl border border-white/15 bg-[#131B2E] px-4 py-3 text-center text-sm font-semibold text-white shadow-2xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}>
          
            {toast}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}