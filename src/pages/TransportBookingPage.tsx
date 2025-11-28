import React, { useState } from 'react';
import { TransportHeader } from '../components/transport/TransportHeader';
import { RideModeSelector } from '../components/transport/RideModeSelector';
import { LiveMapPanel } from '../components/transport/LiveMapPanel';
import { LocationInputCards } from '../components/transport/LocationInputCards';
import { RegularPricingPanel } from '../components/transport/RegularPricingPanel';
import { NegotiatePricingPanel } from '../components/transport/NegotiatePricingPanel';
import { PaymentMethodSelector } from '../components/transport/PaymentMethodSelector';
import { FareSummaryFooter } from '../components/transport/FareSummaryFooter';
interface TransportBookingPageProps {
  onMenuClick: () => void;
}
export function TransportBookingPage({
  onMenuClick
}: TransportBookingPageProps) {
  const [rideMode, setRideMode] = useState<'regular' | 'negotiate'>('regular');
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-32">
      <TransportHeader onMenuClick={onMenuClick} />

      <main>
        <RideModeSelector mode={rideMode} onModeChange={setRideMode} />
        <LiveMapPanel />
        <LocationInputCards />

        {rideMode === 'regular' ? <RegularPricingPanel /> : <NegotiatePricingPanel />}

        <PaymentMethodSelector />
      </main>

      <FareSummaryFooter mode={rideMode} fare={rideMode === 'regular' ? '₦1,200' : '₦2,000'} pickup="Lekki Phase 1" destination="Victoria Island" />
    </div>;
}