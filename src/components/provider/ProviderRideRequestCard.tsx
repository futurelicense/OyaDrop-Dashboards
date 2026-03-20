import React from 'react';
import { TruckIcon } from 'lucide-react';
interface ProviderRideRequestCardProps {
  onRequestRide: () => void;
}
export function ProviderRideRequestCard({
  onRequestRide
}: ProviderRideRequestCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-blue-50 rounded-lg">
          <TruckIcon className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Request Transport
      </h3>

      <p className="text-sm text-gray-600 mb-4">
        Book a ride for deliveries, pickups, or business travel
      </p>

      <button
        onClick={onRequestRide}
        className="w-full bg-blue-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        
        Request Ride
      </button>
    </div>);

}