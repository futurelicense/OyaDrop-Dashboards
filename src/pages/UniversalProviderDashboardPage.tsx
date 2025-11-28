import React, { useState } from 'react';
import { UniversalProviderNavbar } from '../components/provider/UniversalProviderNavbar';
import { DynamicKPISummary } from '../components/provider/DynamicKPISummary';
import { ProviderGeoHeatmap } from '../components/provider/ProviderGeoHeatmap';
import { JobOrderManagement } from '../components/provider/JobOrderManagement';
type ProviderType = 'transport' | 'delivery' | 'home-service' | 'professional' | 'artisan';
const mockProvider = {
  name: 'John Technician',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  serviceType: 'Home Services',
  status: 'online' as const
};
interface UniversalProviderDashboardPageProps {
  onMenuClick: () => void;
}
export function UniversalProviderDashboardPage({
  onMenuClick
}: UniversalProviderDashboardPageProps) {
  const [providerType] = useState<ProviderType>('transport');
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-8">
      <UniversalProviderNavbar provider={mockProvider} earnings={45200} notifications={3} onMenuClick={onMenuClick} />

      <main>
        <DynamicKPISummary providerType={providerType} />
        <ProviderGeoHeatmap providerType={providerType} />
        <JobOrderManagement />
      </main>
    </div>;
}