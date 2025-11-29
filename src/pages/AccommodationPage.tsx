import React, { useState } from 'react';
import { AccommodationHeader } from '../components/accommodation/AccommodationHeader';
import { DestinationSearchHero } from '../components/accommodation/DestinationSearchHero';
import { SmartFilters } from '../components/accommodation/SmartFilters';
import { FeaturedPartners } from '../components/accommodation/FeaturedPartners';
import { PropertyGrid } from '../components/accommodation/PropertyGrid';
import { PartnerBookingFlow } from '../components/accommodation/PartnerBookingFlow';
interface AccommodationPageProps {
  onMenuClick: () => void;
}
interface Partner {
  id: string;
  name: string;
  logo: string;
  type: 'Hotel' | 'Shortlet Agency' | 'Shared Living';
  rating: number;
  properties: number;
  verified: boolean;
}
export function AccommodationPage({
  onMenuClick
}: AccommodationPageProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  if (selectedPartner) {
    return <PartnerBookingFlow partner={selectedPartner} onBack={() => setSelectedPartner(null)} />;
  }
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-8">
      <AccommodationHeader onMenuClick={onMenuClick} />

      <main>
        <DestinationSearchHero />
        <SmartFilters />
        <FeaturedPartners onPartnerSelect={setSelectedPartner} />
        <PropertyGrid />
      </main>
    </div>;
}