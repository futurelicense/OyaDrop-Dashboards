import React from 'react';
import { AccommodationHeader } from '../components/accommodation/AccommodationHeader';
import { DestinationSearchHero } from '../components/accommodation/DestinationSearchHero';
import { SmartFilters } from '../components/accommodation/SmartFilters';
import { FeaturedPartners } from '../components/accommodation/FeaturedPartners';
import { PropertyGrid } from '../components/accommodation/PropertyGrid';
interface AccommodationPageProps {
  onMenuClick: () => void;
}
export function AccommodationPage({
  onMenuClick
}: AccommodationPageProps) {
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-8">
      <AccommodationHeader onMenuClick={onMenuClick} />

      <main>
        <DestinationSearchHero />
        <SmartFilters />
        <FeaturedPartners />
        <PropertyGrid />
      </main>
    </div>;
}