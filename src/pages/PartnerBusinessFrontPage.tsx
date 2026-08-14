import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, MenuIcon, Share2Icon } from 'lucide-react';
import { usePartner } from '../context/PartnerContext';
import { childServices, type PartnerOffering, type PartnerServeMode, type PartnerServiceLine, type PartnerStaff } from '../data/oyaPartner';
import { PartnerLandingView } from '../components/partner/PartnerLandingView';
import { SubServiceView } from '../components/partner/SubServiceView';
import { ServeModeView } from '../components/partner/ServeModeView';
import { OfferingSelectView } from '../components/partner/OfferingSelectView';
import { ProviderSelectView } from '../components/partner/ProviderSelectView';
import { RequestJourneyView, type JourneyStage, type PartnerJourneyContext } from '../components/partner/RequestJourneyView';

type FrontStep = 'landing' | 'sub-service' | 'serve-mode' | 'offering' | 'provider' | 'request';

const stepLabel: Record<FrontStep, string> = {
  landing: 'Partner OneLink',
  'sub-service': 'OyaFix services',
  'serve-mode': 'How you are served',
  offering: 'Choose a service',
  provider: 'Choose a provider',
  request: 'Complete request'
};

interface PartnerBusinessFrontPageProps {
  onMenuClick: () => void;
}

export function PartnerBusinessFrontPage({ onMenuClick }: PartnerBusinessFrontPageProps) {
  const { partner } = usePartner();
  const [step, setStep] = useState<FrontStep>('landing');
  const [category, setCategory] = useState<PartnerServiceLine | null>(null);
  const [service, setService] = useState<PartnerServiceLine | null>(null);
  const [serveMode, setServeMode] = useState<PartnerServeMode | null>(null);
  const [offering, setOffering] = useState<PartnerOffering | null>(null);
  const [provider, setProvider] = useState<PartnerStaff | null>(null);
  const [stage, setStage] = useState<JourneyStage>('request');
  const [linkCopied, setLinkCopied] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2600);
  };

  const resetToLanding = () => {
    setStep('landing');
    setCategory(null);
    setService(null);
    setServeMode(null);
    setOffering(null);
    setProvider(null);
    setStage('request');
  };

  const continueFromService = (next: PartnerServiceLine) => {
    setService(next);
    setServeMode(null);
    setOffering(null);
    setProvider(null);
    setStage('request');
    setStep(next.requiresServeMode ? 'serve-mode' : 'offering');
  };

  const handleSelectService = (next: PartnerServiceLine) => {
    const nested = childServices(partner, next.id).filter((child) => child.enabled);
    setCategory(next);
    if (nested.length > 0) {
      setService(null);
      setServeMode(null);
      setOffering(null);
      setProvider(null);
      setStage('request');
      setStep('sub-service');
      return;
    }
    continueFromService(next);
  };

  const subServiceOptions = useMemo(() => {
    if (!category) return [];
    const nested = childServices(partner, category.id).filter((child) => child.enabled);
    const repairLine: PartnerServiceLine = {
      ...category,
      label: 'Auto repair',
      description: 'Diagnostics, repairs and servicing — at the workshop or where you are.'
    };
    return [repairLine, ...nested];
  }, [category, partner]);

  const copyLink = () => {
    navigator.clipboard?.writeText(`https://${partner.handle}`);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2000);
    showToast('Partner OneLink copied.');
  };

  const availableProviders = useMemo(() => {
    if (!service) return [];
    return service.providers.filter((staff) => {
      if (!staff.available) return false;
      if (!serveMode) return true;
      return staff.modes.includes(serveMode.id);
    });
  }, [service, serveMode]);

  const journey: PartnerJourneyContext | null = service && offering && provider ? {
    brand: service.brand,
    accent: service.accent,
    accentSoft: service.accentSoft,
    accentText: service.accentText,
    partnerName: partner.name,
    providerName: provider.name,
    offering: offering.name,
    serveMode: serveMode?.label,
    zone: partner.zone,
    estimate: offering.price.startsWith('₦') ? offering.price : service.estimate,
    requestPrompt: `${offering.name}${serveMode ? ` · ${serveMode.label}` : ''} · ${partner.name}`,
    matchingCopy: `Confirming ${provider.name} for your ${offering.name.toLowerCase()}`,
    trackingSteps: service.trackingSteps,
    chatOpener: service.chatOpener,
    rating: provider.rating,
    responseTime: provider.responseTime
  } : null;

  const goBack = () => {
    if (step === 'request' && stage !== 'request') {
      setStage('request');
      return;
    }
    if (step === 'request') {
      setStep('provider');
      return;
    }
    if (step === 'provider') {
      setStep('offering');
      return;
    }
    if (step === 'offering') {
      setStep(service?.requiresServeMode ? 'serve-mode' : category && childServices(partner, category.id).some((child) => child.enabled) ? 'sub-service' : 'landing');
      return;
    }
    if (step === 'serve-mode') {
      if (category && childServices(partner, category.id).some((child) => child.enabled)) {
        setStep('sub-service');
        return;
      }
      resetToLanding();
      return;
    }
    if (step === 'sub-service') {
      resetToLanding();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0E1A] text-white">
      <header className="sticky top-0 z-30 bg-[#0A0E1A]/95 backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          {step === 'landing' ?
          <button aria-label="Open navigation" onClick={onMenuClick} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">
              <MenuIcon className="h-5 w-5" />
            </button> :

          <button aria-label="Go back" onClick={goBack} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          }
          <div className="text-center">
            <p className="text-sm font-bold leading-tight">{step === 'landing' ? partner.name : stepLabel[step]}</p>
            <p className="text-[11px] text-gray-500">{step === 'landing' ? 'Partner OneLink' : partner.name}</p>
          </div>
          <button aria-label="Share Partner OneLink" onClick={copyLink} className="rounded-xl bg-white/5 p-2 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30">
            <Share2Icon className="h-5 w-5" />
          </button>
        </div>
        {step !== 'landing' && (category || service) &&
        <div className="border-b border-white/10 px-4 py-2 text-[11px] text-gray-500">
            {category?.brand ?? service?.brand}
            {service ? ` · ${service.label}` : ''}
            {serveMode ? ` · ${serveMode.label}` : ''}
            {offering ? ` · ${offering.name}` : ''}
            {provider ? ` · ${provider.name}` : ''}
          </div>
        }
      </header>

      <main className="mx-auto max-w-2xl pb-16">
        <AnimatePresence mode="wait">
          {step === 'landing' &&
          <PartnerLandingView
            key="landing"
            partner={partner}
            linkCopied={linkCopied}
            onCopyLink={copyLink}
            onAction={showToast}
            onSelectService={handleSelectService} />

          }

          {step === 'sub-service' && category &&
          <SubServiceView
            key="sub-service"
            parent={category}
            options={subServiceOptions}
            selectedId={service?.id}
            onSelect={continueFromService} />

          }

          {step === 'serve-mode' && service &&
          <ServeModeView
            key="serve-mode"
            service={service}
            selectedId={serveMode?.id}
            onSelect={(mode) => {
              setServeMode(mode);
              setProvider(null);
              setStep('offering');
            }} />

          }

          {step === 'offering' && service &&
          <OfferingSelectView
            key="offering"
            service={service}
            selectedId={offering?.id}
            onSelect={(next) => {
              setOffering(next);
              setStep('provider');
            }} />

          }

          {step === 'provider' && service &&
          <ProviderSelectView
            key="provider"
            service={service}
            providers={availableProviders}
            selectedId={provider?.id}
            onSelect={(next) => {
              setProvider(next);
              setStage('request');
              setStep('request');
            }} />

          }

          {step === 'request' && journey &&
          <RequestJourneyView
            key="request"
            journey={journey}
            stage={stage}
            onStageChange={setStage}
            onReset={resetToLanding}
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
