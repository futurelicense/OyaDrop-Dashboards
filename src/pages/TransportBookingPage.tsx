import React, { useState } from 'react';
import { TransportHeader } from '../components/transport/TransportHeader';
import { RideModeSelector } from '../components/transport/RideModeSelector';
import { LocationInputCards } from '../components/transport/LocationInputCards';
import { LiveMapPanel } from '../components/transport/LiveMapPanel';
import { RegularPricingPanel } from '../components/transport/RegularPricingPanel';
import { NegotiatePricingPanel } from '../components/transport/NegotiatePricingPanel';
import { PaymentMethodSelector } from '../components/transport/PaymentMethodSelector';
import { FareSummaryFooter } from '../components/transport/FareSummaryFooter';
import { ChatButton } from '../components/messaging/ChatButton';
import { FloatingChatIcon } from '../components/messaging/FloatingChatIcon';
import { motion } from 'framer-motion';
interface TransportBookingPageProps {
  onMenuClick: () => void;
  onOpenChat?: () => void;
}
export function TransportBookingPage({
  onMenuClick,
  onOpenChat
}: TransportBookingPageProps) {
  const [pricingMode, setPricingMode] = useState<'regular' | 'negotiate'>('regular');
  const [rideBooked, setRideBooked] = useState(false);
  const handleBookRide = () => {
    setRideBooked(true);
  };
  return <div className="min-h-screen bg-gradient-to-b from-[#0A0E1A] via-[#0F1520] to-[#0A0E1A] pb-32">
      <TransportHeader onMenuClick={onMenuClick} />

      <main className="px-4 py-6 space-y-6">
        <RideModeSelector />
        <LocationInputCards />
        <LiveMapPanel />

        {pricingMode === 'regular' ? <RegularPricingPanel onSwitchToNegotiate={() => setPricingMode('negotiate')} /> : <NegotiatePricingPanel onSwitchToRegular={() => setPricingMode('regular')} />}

        <PaymentMethodSelector />

        {/* Ride Booked Success State */}
        {rideBooked && <motion.div className="bg-gradient-to-br from-green-500/20 to-teal-500/20 border-2 border-green-500/50 rounded-2xl p-6" initial={{
        opacity: 0,
        scale: 0.9
      }} animate={{
        opacity: 1,
        scale: 1
      }} transition={{
        type: 'spring',
        damping: 20
      }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ride Booked!</h3>
                <p className="text-sm text-gray-400">Tunde is on the way</p>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4 p-3 bg-[#0A0E1A]/50 rounded-xl">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Tunde" className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Tunde - Rider</p>
                <p className="text-xs text-gray-400">
                  Toyota Camry • ABC 123 XY
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs text-yellow-400">★ 4.8</span>
                  <span className="text-xs text-gray-500">• 234 trips</span>
                </div>
              </div>
            </div>

            <ChatButton contactName="Tunde" contactType="Rider" variant="primary" size="lg" onClick={onOpenChat} />
          </motion.div>}
      </main>

      <FareSummaryFooter onBookRide={handleBookRide} />

      {onOpenChat && <FloatingChatIcon unreadCount={2} onOpenChat={onOpenChat} />}
    </div>;
}