import React, { useState } from 'react';
import { TransportHeader } from '../components/transport/TransportHeader';
import { LocationStep } from '../components/transport/LocationStep';
import { VehicleSelectionStep } from '../components/transport/VehicleSelectionStep';
import { DriverOffersStep } from '../components/transport/DriverOffersStep';
import { RideConfirmedStep } from '../components/transport/RideConfirmedStep';
import { FloatingChatIcon } from '../components/messaging/FloatingChatIcon';
import { AnimatePresence } from 'framer-motion';
interface TransportBookingPageProps {
  onMenuClick: () => void;
  onOpenChat?: () => void;
}
export function TransportBookingPage({
  onMenuClick,
  onOpenChat
}: TransportBookingPageProps) {
  // Step State Machine: 0=Location, 1=Vehicle/Pricing, 2=Offers(Negotiate), 3=Confirmed
  const [step, setStep] = useState(0);
  // Global Booking State
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [stops, setStops] = useState<string[]>([]);
  const [pricingMode, setPricingMode] = useState<'regular' | 'negotiate'>(
    'regular'
  );
  // Negotiate State
  const [offerAmount, setOfferAmount] = useState(0);
  const [acceptedOffer, setAcceptedOffer] = useState<any>(null);
  // Handlers
  const handleLocationContinue = () => {
    setStep(1);
  };
  const handleBookRegular = (vehicleId: string, paymentMethod: string) => {
    // In a real app, we'd save these details. For now, just proceed to confirmed.
    setStep(3);
  };
  const handleSendOffer = (
  offer: number,
  vehicleType: string,
  paymentMethod: string) =>
  {
    setOfferAmount(offer);
    setStep(2);
  };
  const handleAcceptOffer = (offer: any) => {
    setAcceptedOffer(offer);
    setStep(3);
  };
  const handleCancel = () => {
    setStep(0);
    setAcceptedOffer(null);
  };
  return (
    <div className="min-h-screen bg-[#0A0E1A] flex flex-col">
      <TransportHeader onMenuClick={onMenuClick} />

      <main className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {step === 0 &&
          <LocationStep
            key="step0"
            pickup={pickup}
            destination={destination}
            stops={stops}
            onPickupChange={setPickup}
            onDestinationChange={setDestination}
            onStopsChange={setStops}
            onContinue={handleLocationContinue} />

          }

          {step === 1 &&
          <VehicleSelectionStep
            key="step1"
            pickup={pickup}
            destination={destination}
            stops={stops}
            pricingMode={pricingMode}
            onModeChange={setPricingMode}
            onBookRegular={handleBookRegular}
            onSendOffer={handleSendOffer} />

          }

          {step === 2 &&
          <DriverOffersStep
            key="step2"
            pickup={pickup}
            destination={destination}
            stops={stops}
            offerAmount={offerAmount}
            onAcceptOffer={handleAcceptOffer}
            onCancel={() => setStep(1)} />

          }

          {step === 3 &&
          <RideConfirmedStep
            key="step3"
            pickup={pickup}
            destination={destination}
            stops={stops}
            pricingMode={pricingMode}
            driverDetails={acceptedOffer}
            onOpenChat={onOpenChat}
            onCancel={handleCancel} />

          }
        </AnimatePresence>
      </main>

      {onOpenChat && step === 3 &&
      <FloatingChatIcon unreadCount={2} onOpenChat={onOpenChat} />
      }
    </div>);

}