import React, { useState } from 'react';
import { UniversalProviderNavbar } from '../components/provider/UniversalProviderNavbar';
import { DynamicKPISummary } from '../components/provider/DynamicKPISummary';
import { ProviderGeoHeatmap } from '../components/provider/ProviderGeoHeatmap';
import { JobOrderManagement } from '../components/provider/JobOrderManagement';
import { ProviderRideRequestCard } from '../components/provider/ProviderRideRequestCard';
import { ProviderRideRequestSheet } from '../components/provider/ProviderRideRequestSheet';
type ProviderType =
'transport' |
'delivery' |
'home-service' |
'professional' |
'artisan';
const mockProvider = {
  name: 'John Technician',
  avatar:
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
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
  const [isRideRequestOpen, setIsRideRequestOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-8">
      <UniversalProviderNavbar
        provider={mockProvider}
        earnings={45200}
        notifications={3}
        onMenuClick={onMenuClick} />


      <main>
        <DynamicKPISummary providerType={providerType} />

        {/* Quick Actions Grid */}
        <div className="px-4 py-4">
          <h2 className="text-sm font-bold text-white mb-3">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProviderRideRequestCard
              onRequestRide={() => setIsRideRequestOpen(true)} />

          </div>
        </div>

        <ProviderGeoHeatmap providerType={providerType} />
        <JobOrderManagement />
      </main>

      <ProviderRideRequestSheet
        isOpen={isRideRequestOpen}
        onClose={() => setIsRideRequestOpen(false)} />

    </div>);

}