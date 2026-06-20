import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LeafletMap } from './LeafletMap';
import { Star, Clock, Car, X, Check, ShieldCheck } from 'lucide-react';
interface DriverOffer {
  id: string;
  driverName: string;
  driverImage: string;
  rating: number;
  trips: number;
  vehicle: string;
  plate: string;
  eta: string;
  price: number;
  isCounter: boolean;
}
interface DriverOffersStepProps {
  pickup: string;
  destination: string;
  stops: string[];
  offerAmount: number;
  onAcceptOffer: (offer: DriverOffer) => void;
  onCancel: () => void;
}
export function DriverOffersStep({
  pickup,
  destination,
  stops,
  offerAmount,
  onAcceptOffer,
  onCancel
}: DriverOffersStepProps) {
  const [offers, setOffers] = useState<DriverOffer[]>([]);
  // Simulate incoming offers
  useEffect(() => {
    const mockOffers: DriverOffer[] = [
    {
      id: 'o1',
      driverName: 'Tunde',
      driverImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 4.8,
      trips: 1240,
      vehicle: 'Toyota Corolla',
      plate: 'LAG-123-XY',
      eta: '4 min',
      price: offerAmount,
      isCounter: false
    },
    {
      id: 'o2',
      driverName: 'Emeka',
      driverImage:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=100&h=100&fit=crop',
      rating: 4.9,
      trips: 342,
      vehicle: 'Honda Camry',
      plate: 'ABJ-456-ZA',
      eta: '2 min',
      price: offerAmount + 300,
      isCounter: true
    },
    {
      id: 'o3',
      driverName: 'Aisha',
      driverImage:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&h=100&fit=crop',
      rating: 5.0,
      trips: 89,
      vehicle: 'Hyundai Elantra',
      plate: 'KAD-789-BC',
      eta: '7 min',
      price: offerAmount + 100,
      isCounter: true
    }];

    // Add offers one by one with a delay
    const timeouts = mockOffers.map((offer, index) => {
      return setTimeout(
        () => {
          setOffers((prev) => [...prev, offer]);
        },
        1500 + index * 2000
      );
    });
    return () => timeouts.forEach(clearTimeout);
  }, [offerAmount]);
  const handleDecline = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };
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
      <div className="h-[30vh] flex-shrink-0 relative">
        <LeafletMap pickup={pickup} dropoff={destination} stops={stops} />

        {/* Top Bar overlay */}
        <div className="absolute top-4 inset-x-4 z-10 flex justify-between items-start">
          <button
            onClick={onCancel}
            className="w-10 h-10 bg-[#0A0E1A]/80 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 text-white">
            
            <X className="w-5 h-5" />
          </button>

          <div className="bg-[#0A0E1A]/80 backdrop-blur-md rounded-2xl border border-purple-500/30 p-3 text-center min-w-[120px]">
            <p className="text-xs text-gray-400 mb-0.5">Your Offer</p>
            <p className="text-xl font-bold text-purple-400">
              ₦{offerAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Sheet Content */}
      <div className="flex-1 bg-[#0A0E1A] rounded-t-3xl -mt-6 relative z-20 flex flex-col overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center pt-3 pb-2 flex-shrink-0">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full" />
        </div>

        <div className="px-4 py-2 flex items-center justify-between flex-shrink-0">
          <h3 className="text-lg font-bold text-white">Driver Offers</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
            <span className="text-sm text-purple-400 font-semibold">
              Searching...
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-6 pt-2 space-y-4">
          <AnimatePresence>
            {offers.length === 0 ?
            <motion.div
              className="flex flex-col items-center justify-center h-48 text-center"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}>
              
                <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin mb-4" />
                <p className="text-gray-400">
                  Sending your offer to nearby drivers...
                </p>
              </motion.div> :

            offers.map((offer) =>
            <motion.div
              key={offer.id}
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                transition: {
                  duration: 0.2
                }
              }}
              className="bg-[#131B2E] rounded-2xl p-4 border border-purple-500/20 shadow-lg shadow-purple-500/5">
              
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                      <div className="relative">
                        <img
                      src={offer.driverImage}
                      alt={offer.driverName}
                      className="w-12 h-12 rounded-full object-cover" />
                    
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-[#131B2E]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <h4 className="font-bold text-white">
                            {offer.driverName}
                          </h4>
                          <ShieldCheck className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-0.5">
                          <span className="flex items-center gap-0.5 text-yellow-400 font-semibold">
                            <Star className="w-3 h-3 fill-yellow-400" />{' '}
                            {offer.rating}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-400">
                            {offer.trips} trips
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                    className={`text-xl font-bold ${offer.isCounter ? 'text-pink-400' : 'text-purple-400'}`}>
                    
                        ₦{offer.price.toLocaleString()}
                      </p>
                      {offer.isCounter &&
                  <p className="text-[10px] text-pink-400/80 font-semibold uppercase tracking-wider">
                          Counter Offer
                        </p>
                  }
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-300 mb-4 bg-[#0A0E1A]/50 p-2.5 rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-gray-400" />
                      <span>{offer.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span>{offer.eta} away</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                  onClick={() => handleDecline(offer.id)}
                  className="flex-1 py-3 rounded-xl font-semibold text-gray-400 bg-white/5 hover:bg-white/10 transition-colors">
                  
                      Decline
                    </button>
                    <button
                  onClick={() => onAcceptOffer(offer)}
                  className="flex-1 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                  
                      Accept
                    </button>
                  </div>
                </motion.div>
            )
            }
          </AnimatePresence>
        </div>
      </div>
    </motion.div>);

}