import React, { useState } from 'react';
import { XIcon } from 'lucide-react';
import { LocationInputCards } from '../transport/LocationInputCards';
import { RideModeSelector } from '../transport/RideModeSelector';
import { RegularPricingPanel } from '../transport/RegularPricingPanel';
import { NegotiatePricingPanel } from '../transport/NegotiatePricingPanel';
import { PaymentMethodSelector } from '../transport/PaymentMethodSelector';
interface ProviderRideRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ProviderRideRequestSheet({
  isOpen,
  onClose
}: ProviderRideRequestSheetProps) {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [rideMode, setRideMode] = useState<'regular' | 'negotiate'>('regular');
  const [selectedVehicle, setSelectedVehicle] = useState('bike');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const handleConfirmRide = () => {
    console.log('Ride confirmed:', {
      pickup,
      destination,
      rideMode,
      selectedVehicle,
      paymentMethod
    });
    onClose();
  };
  if (!isOpen) return null;
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto animate-slide-up">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
          <h2 className="text-xl font-bold text-gray-900">Request Transport</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <XIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Location Inputs */}
          <div className="space-y-3">
            <LocationInputCards pickup={pickup} destination={destination} onPickupChange={setPickup} onDestinationChange={setDestination} />
          </div>

          {/* Ride Mode Selector */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Booking Mode
            </h3>
            <RideModeSelector mode={rideMode} onModeChange={setRideMode} />
          </div>

          {/* Pricing Panel */}
          <div>
            {rideMode === 'regular' ? <RegularPricingPanel selectedVehicle={selectedVehicle} onVehicleChange={setSelectedVehicle} /> : <NegotiatePricingPanel />}
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Payment Method
            </h3>
            <PaymentMethodSelector selectedMethod={paymentMethod} onMethodChange={setPaymentMethod} />
          </div>

          {/* Confirm Button */}
          <button onClick={handleConfirmRide} disabled={!pickup || !destination} className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg">
            Confirm Ride Request
          </button>

          {/* Info Note */}
          <p className="text-xs text-gray-500 text-center">
            A driver will be assigned to your request shortly
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>;
}