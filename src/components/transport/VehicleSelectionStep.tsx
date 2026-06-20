import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RideModeSelector } from './RideModeSelector';
import { LeafletMap } from './LeafletMap';
import {
  Users,
  Wallet,
  CreditCard,
  Tag,
  Calendar,
  DollarSign,
  Info,
  Car,
  Plane,
  Briefcase,
  Package } from
'lucide-react';
const vehicleCategories = [
{
  id: 'bike',
  name: 'Bike',
  icon: '🏍️',
  fare: '₦800',
  eta: '5 min',
  capacity: 1,
  color: '#FFB800'
},
{
  id: 'mini',
  name: 'Mini',
  icon: '🚗',
  fare: '₦1,200',
  eta: '7 min',
  capacity: 3,
  color: '#00D9C0'
},
{
  id: 'sedan',
  name: 'Sedan',
  icon: '🚙',
  fare: '₦1,800',
  eta: '8 min',
  capacity: 4,
  color: '#00F0FF'
},
{
  id: 'xl',
  name: 'XL',
  icon: '🚐',
  fare: '₦2,500',
  eta: '10 min',
  capacity: 6,
  color: '#B026FF'
},
{
  id: 'luxury',
  name: 'Luxury',
  icon: '🚘',
  fare: '₦4,500',
  eta: '12 min',
  capacity: 4,
  color: '#F43F5E'
}];

interface VehicleSelectionStepProps {
  pickup: string;
  destination: string;
  stops: string[];
  pricingMode: 'regular' | 'negotiate';
  onModeChange: (mode: 'regular' | 'negotiate') => void;
  onBookRegular: (vehicleId: string, paymentMethod: string) => void;
  onSendOffer: (
  offer: number,
  vehicleType: string,
  paymentMethod: string)
  => void;
}
export function VehicleSelectionStep({
  pickup,
  destination,
  stops,
  pricingMode,
  onModeChange,
  onBookRegular,
  onSendOffer
}: VehicleSelectionStepProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('sedan');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [offerAmount, setOfferAmount] = useState<string>('2000');
  const [negotiateVehicle, setNegotiateVehicle] = useState('any');
  return (
    <motion.div
      className="flex flex-col h-[calc(100vh-64px)]"
      initial={{
        opacity: 0,
        x: 20
      }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{
        opacity: 0,
        x: -20
      }}>
      
      {/* Map Section */}
      <div className="h-[35vh] flex-shrink-0 relative">
        <LeafletMap pickup={pickup} dropoff={destination} stops={stops} />

        {/* Floating Mode Selector */}
        <div className="absolute top-4 inset-x-4 z-10">
          <RideModeSelector mode={pricingMode} onModeChange={onModeChange} />
        </div>
      </div>

      {/* Bottom Sheet Content */}
      <div className="flex-1 bg-[#0A0E1A] rounded-t-3xl -mt-6 relative z-20 flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-24">
          <AnimatePresence mode="wait">
            {pricingMode === 'regular' ?
            <motion.div
              key="regular"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-3">
              
                <h3 className="text-lg font-bold text-white mb-2">
                  Choose A Ride
                </h3>
                {vehicleCategories.map((vehicle) => {
                const isSelected = selectedVehicle === vehicle.id;
                return (
                  <motion.button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`w-full flex items-center p-4 rounded-2xl border-2 transition-all text-left ${isSelected ? 'bg-cyan-500/10 border-cyan-500' : 'bg-[#131B2E] border-white/5'}`}
                    whileTap={{
                      scale: 0.98
                    }}>
                    
                      <div className="w-12 h-12 flex items-center justify-center text-3xl mr-4 bg-white/5 rounded-xl">
                        {vehicle.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-white text-base">
                            {vehicle.name}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <Users className="w-3 h-3" /> {vehicle.capacity}
                          </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {vehicle.eta} away
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-white">
                          {vehicle.fare}
                        </p>
                      </div>
                    </motion.button>);

              })}
              </motion.div> :

            <motion.div
              key="negotiate"
              initial={{
                opacity: 0,
                y: 20
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                y: -20
              }}
              className="space-y-6 pt-2">
              
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Set Your Price
                  </h3>
                  <p className="text-sm text-gray-400">
                    Drivers will counter-offer or accept
                  </p>
                </div>

                <div className="bg-[#131B2E] rounded-3xl p-6 border border-purple-500/20">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <button
                    onClick={() =>
                    setOfferAmount(
                      String(
                        Math.max(500, parseInt(offerAmount || '0') - 100)
                      )
                    )
                    }
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl font-light text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                    
                      -
                    </button>
                    <div className="relative flex items-center justify-center min-w-[140px]">
                      <span className="text-2xl font-bold text-gray-400 absolute left-0">
                        ₦
                      </span>
                      <input
                      type="number"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                      className="w-full bg-transparent text-center text-4xl font-bold text-white focus:outline-none"
                      style={{
                        width: `${Math.max(4, offerAmount.length)}ch`
                      }} />
                    
                    </div>
                    <button
                    onClick={() =>
                    setOfferAmount(
                      String(parseInt(offerAmount || '0') + 100)
                    )
                    }
                    className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-2xl font-light text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                    
                      +
                    </button>
                  </div>

                  <div className="flex gap-2 justify-center mb-6">
                    {[100, 200, 500].map((amt) =>
                  <button
                    key={amt}
                    onClick={() =>
                    setOfferAmount(
                      String(parseInt(offerAmount || '0') + amt)
                    )
                    }
                    className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-400 text-sm font-semibold border border-purple-500/20">
                    
                        +₦{amt}
                      </button>
                  )}
                  </div>

                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-3 flex items-start gap-3">
                    <Info className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-purple-400">
                        Recommended: ₦1,900 - ₦2,500
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Fair offers get accepted 3x faster
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-3">
                    Vehicle Preference
                  </h4>
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                    {[
                  {
                    id: 'any',
                    label: 'Any Car',
                    icon: Car
                  },
                  {
                    id: 'comfort',
                    label: 'Comfort',
                    icon: Briefcase
                  },
                  {
                    id: 'xl',
                    label: '6 Seats',
                    icon: Users
                  }].
                  map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setNegotiateVehicle(type.id)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border whitespace-nowrap transition-colors ${negotiateVehicle === type.id ? 'bg-purple-500/20 border-purple-500 text-purple-400' : 'bg-[#131B2E] border-white/10 text-gray-400'}`}>
                        
                          <Icon className="w-4 h-4" />
                          <span className="text-sm font-semibold">
                            {type.label}
                          </span>
                        </button>);

                  })}
                  </div>
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Fixed Bottom Actions */}
        <div className="absolute bottom-0 inset-x-0 bg-[#0A0E1A]/95 backdrop-blur-md border-t border-white/10 p-4 z-30">
          {/* Payment Methods */}
          <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setPaymentMethod('cash')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paymentMethod === 'cash' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
              
              <DollarSign className="w-4 h-4" /> Cash
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paymentMethod === 'wallet' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
              
              <Wallet className="w-4 h-4" /> Wallet
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${paymentMethod === 'card' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5'}`}>
              
              <CreditCard className="w-4 h-4" /> Card
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-gray-400 hover:bg-white/5">
              <Tag className="w-4 h-4" /> Promo
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {pricingMode === 'regular' &&
            <button className="p-4 bg-[#131B2E] border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                <Calendar className="w-6 h-6" />
              </button>
            }
            <motion.button
              onClick={() => {
                if (pricingMode === 'regular') {
                  onBookRegular(selectedVehicle, paymentMethod);
                } else {
                  onSendOffer(
                    parseInt(offerAmount || '0'),
                    negotiateVehicle,
                    paymentMethod
                  );
                }
              }}
              className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg text-white ${pricingMode === 'regular' ? 'bg-gradient-to-r from-cyan-500 to-teal-500 shadow-cyan-500/20' : 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/20'}`}
              whileTap={{
                scale: 0.98
              }}>
              
              {pricingMode === 'regular' ? 'Ride Now' : 'Send Offer to Drivers'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>);

}